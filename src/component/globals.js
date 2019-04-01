import DataSource from './DataSource.js'
import List from './list.js'
const ASA = {}
const $ = $ASA.$
ASA.caches = {}

ASA.get = function(url, callback) {
    if (ASA.caches[url]) {
        if (ASA.caches[url].loaded == false) {
            var func = (function f() {
                console.log("===================", url)
                if (ASA.caches[url] && ASA.caches[url].loaded == true) {
                    callback(ASA.caches[url].data)
                } else {
                    setTimeout(f, 50)
                }
            })

            func();
        } else {
            callback(ASA.caches[url].data)
        }
    } else {
        ASA.caches[url] = {
            loaded: false
        }

        $ASA.get(url, function(res) {
            ASA.caches[url].loaded = true;
            ASA.caches[url].data = res;
            callback(res)
        }, "json")
    }
};

ASA.getLabel = function(name) {
    //console.log(typeof($ASAL), "$ASA")
    if (typeof($ASAL) != 'undefined' && $ASAL[name]) {
        //console.log(typeof($ASA), "$ASAL", $ASAL[name])
        return $ASAL[name]
    } else {
        return "";
    }
}

ASA.extend = function(obj1, obj2) {
    Object.keys(obj2).forEach(function(key) {
        obj1[key] = obj2[key];
    });
    return obj1;
}

ASA.logger = function(name) {
    return function() {
        var arr = Array.prototype.slice.call(arguments)
        arr.unshift("old <" + name + ">")
        console.log.apply(console, arr);
    }
}

const store = {
    list: {},
    temp: {},
    result: {},
    loading: false
};

ASA.getFetcher = function(name) {
    if (!store.list[name]) {
        store.list[name] = {}
        store.temp[name] = {}
        store.result[name] = {}
    }
    let list = store.list[name],
        templist = store.temp[name],
        result = store.result[name]

    return function(id, callback) {
        if (store.result[name][id]) {
            callback(store.result[name][id])
        } else {
            if (store.loading) {
                store.temp[name][id] =1
            } else {
                store.list[name][id]=1
            }

            setTimeout(function func() {
                if (store.result[name][id]) {
                    callback(store.result[name][id])
                } else {
                    if (store.loading) {
                        setTimeout(func, 100)
                    } else {
                        store.loading = true

                        var params = {}
                        Object.keys(store.list).forEach(function(key){
                            params[key] = Object.keys(store.list[key])
                        })
                        $ASA.post("/common/loadname", {
                            params: JSON.stringify(params)
                        }, function(res) {

                            Object.keys(res).forEach(function(key){
                                let value = res[key];
                                store.result[key] = Object.assign(store.result[key], value)
                                //console.log(key, store.temp[key])
                                store.list[key] = store.temp[key];
                                store.temp[key] = {};
                            })

                            store.loading = false
                            //console.log(result,"result")
                            callback(store.result[name][id])
                        }, "json")
                    }
                }
            }, 100)
        }
    }
}

ASA.getLabelFetcher = function(name) {
    let fetcher = ASA.getFetcher(name)

    return function(ids, column, callback) {
        //console.log("ids", ids)
        var all_promise = ids.split(",").map(function(id){
            return new Promise(function(resolve, reject){
                fetcher(id, resolve);
            });
        })
        
        Promise.all(all_promise).then(function(results) {
            self.loading = false;
            //console.log(results)
            callback(results.map(item=>item[column]).join(","))
        });
    }
}

const createModel = function(tablename) {
    return {
        get:function(data, callback, depth) {
            let self = this;
            depth = depth || 0;
            if(typeof(data)=='object') {
                if(depth<=0) {
                    callback(data)
                }
                else {
                    self.init(depth, data, callback)
                }
            }
            else {
                self.fetch(depth, data, callback)
            }
        },
        fetch:function(depth, id, callback) {
            let self = this;
            let fetcher = ASA.getFetcher(tablename)
            fetcher(id, function(info){
                if(depth<=0) {
                    callback(info)
                }
                else {
                    self.init(depth, info, callback)
                }
            })
        },
        init:function(depth, row, callback) {
            let self = this
            callback(row)        
        }
    }
}


const Warehouse = createModel("warehouse")
const Product = $.extend(createModel("product"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        
        const dataSource = DataSource.getDataSource('sizecontent', ASA.getLabel('lang'));      

        arr.push(new Promise(function(resolve){
            dataSource.filter({topid: row.sizetopid}, resolve)
        }))

        Promise.all(arr).then(function(results) {
            //console.log(results)
            row.sizecontents = results[0]
            callback(row)
        });
    }
})

const Goods = createModel("goods")
const Productstock = $.extend(createModel("productstock"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        arr.push(new Promise(function(resolve){
            Product.get(row.productid, resolve, depth-1)
        }))

        arr.push(new Promise(function(resolve){
            Warehouse.get(row.warehouseid,resolve, depth-1)
        }))

        const dataSource = DataSource.getDataSource('sizecontent', ASA.getLabel('lang'));
        arr.push(new Promise(function(resolve){
            dataSource.getRow(row.sizecontentid, data => {
                resolve(data)
            })
        }))

        arr.push(new Promise(function(resolve){
            Goods.get(row.goodsid,resolve, depth-1)
        }))

        Promise.all(arr).then(function(results) {
            //console.log(results)
            //self.row.productname = results[0].row.productname
            row.product = results[0]
            //self.row.warehousename = results[1].row.name
            row.warehouse =  results[1]
            row.sizecontent = results[2]
            row.goods =  results[3]
            callback(row)
        });
    }
})

const OrderDetails = $.extend(createModel("orderdetails"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        arr.push(new Promise(function(resolve){
            Product.get(row.productid, resolve, depth-1)
        }))

        const dataSource = DataSource.getDataSource('sizecontent', ASA.getLabel('lang'));
        arr.push(new Promise(function(resolve){
            dataSource.getRow(row.sizecontentid, data => {
                resolve(data)
            })
        }))

        Promise.all(arr).then(function(results) {
            //console.log(results)
            //self.row.productname = results[0].row.productname
            row.product = results[0]
            //self.row.warehousename = results[1].row.name
            row.sizecontent =  results[1]
            callback(row)
        });
    }
})

const ConfirmorderDetails = $.extend(createModel("confirmorderdetails"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        arr.push(new Promise(function(resolve){            
            OrderDetails.get(row.orderdetailsid, resolve, depth-1)
        }))

        Promise.all(arr).then(function(results) {
            //console.log(results)
            //self.row.productname = results[0].row.productname
            row.orderdetails = results[0]
            callback(row)
        });
    }
})

const ProductCodeList = function(productid, callback){
    $ASA.post("/product/codelist", {id:productid}, function(res){
        callback(res.data)
    },'json');
}
export {ProductCodeList}
export { Productstock,Warehouse,Product,Goods,OrderDetails,ConfirmorderDetails }

export default ASA