import DataSource from './DataSource.js'
import List from './list.js'
import {getFetcher,clear} from "./fetcher.js"
import {getLabel} from "./globals.js"
import {httpPost} from "./http.js"

const createModel = function(tablename) {
    return {
        get:function(data, callback, depth=0) {
            let self = this;

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
        load:function({data, depth=0, isCache=true}){
            let self = this;

            //清空缓存
            if(!isCache) {
                clear(tablename)
            }
            
            return new Promise((resolve, reject)=>{
                if(typeof(data)=='object') {
                    if(depth<=0) {
                        resolve(data)
                    }
                    else {
                        self.init(depth, data, resolve)
                    }
                }
                else {
                    self.fetch(depth, data, resolve)
                }
            });
        },
        fetch:function(depth, id, callback) {
            let self = this;
            let fetcher = getFetcher(tablename)
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
const Product = Object.assign(createModel("product"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        
        const sizecontent = DataSource.getDataSource('sizecontent', getLabel('lang'));
        arr.push(new Promise(function(resolve){
            sizecontent.getRows(row.sizecontentids, resolve)
        }))

        Promise.all(arr).then(function(results) {
            //console.log(results)
            row.sizecontents = results[0]
            callback(row)
        });
    }
})

//附带所有关联信息的详情
const ProductDetail = Object.assign(createModel("product"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        
        //尺码组
        const dataSource = DataSource.getDataSource('sizecontent', getLabel('lang'));      
        arr.push(new Promise(function(resolve){
            dataSource.getRows(row.sizecontentids, resolve)
        }))

        const brandgroupchild = DataSource.getDataSource('brandgroupchild', getLabel('lang'));      
        arr.push(new Promise(function(resolve){
            brandgroupchild.getRowLabel(row.childbrand, resolve)
        }))

        const brandgroup = DataSource.getDataSource('brandgroup', getLabel('lang'));      
        arr.push(new Promise(function(resolve){
            brandgroup.getRowLabel(row.brandgroupid, resolve)
        }))

        const country = DataSource.getDataSource('country', getLabel('lang'));      
        arr.push(new Promise(function(resolve){
            country.getRowLabels(row.countries, resolve)
        }))

        const brandcolor = DataSource.getDataSource('colortemplate', getLabel('lang'));      
        arr.push(new Promise(function(resolve){
            brandcolor.getRowLabels(row.brandcolor, resolve)
        }))

        const season = DataSource.getDataSource('season', getLabel('lang'));      
        arr.push(new Promise(function(resolve){
            season.getRowLabels(row.season, resolve)
        }))

        const ageseason = DataSource.getDataSource('ageseason', getLabel('lang'));      
        arr.push(new Promise(function(resolve){
            ageseason.getRowLabels(row.ageseason, resolve)
        }))

        //颜色分组
        arr.push(new Promise(function(resolve){
            if(row.product_group=='') {
                resolve([])
                return 
            }

            let list = row.product_group.split('|').map(item=>item.split(','))

            brandcolor.getData(function(data){
                let array = list.map(function(item){
                    let row = data.find(function(row){
                        //console.log(row,item[1], "===", row.getValue())
                        return item[1]==row.getValue()
                    })
                    //console.log(row, item, "+++")
                    return {id:item[0], colortemplateid:item[1], colorlabel:row.getLabel(),colorcode:row.row.code}
                })

                resolve(array)
            })
        }))

        Promise.all(arr).then(function(results) {
            //console.log(results)
            row.sizecontents = results[0]
            row.childbrand_label = results[1]
            row.brandgroup_label = results[2]
            row.countries_label = results[3]
            row.brandcolor_label = results[4]
            row.season_label = results[5]
            row.ageseason_label = results[6]
            row.colors = results[7]
            callback(row)
        });
    }
})

const Goods = createModel("goods")
const Productstock = Object.assign(createModel("productstock"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        arr.push(new Promise(function(resolve){
            Product.get(row.productid, resolve, depth-1)
        }))

        arr.push(new Promise(function(resolve){
            Warehouse.get(row.warehouseid,resolve, depth-1)
        }))

        const dataSource = DataSource.getDataSource('sizecontent', getLabel('lang'));
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

const OrderDetails = Object.assign(createModel("orderdetails"),{
    init:function(depth, row, callback) {
        let self = this
        let arr = []
        arr.push(new Promise(function(resolve){
            Product.get(row.productid, resolve, depth-1)
        }))

        const dataSource = DataSource.getDataSource('sizecontent', getLabel('lang'));
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

const ConfirmorderDetails = Object.assign(createModel("confirmorderdetails"),{
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
    httpPost("/product/codelist", {id:productid}).then(function(res){
        callback(res.data)
    });
}
export {ProductCodeList,ProductDetail}
export { Productstock,Warehouse,Product,Goods,OrderDetails,ConfirmorderDetails }
export default {}