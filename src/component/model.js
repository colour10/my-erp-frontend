import DataSource from './DataSource.js'
import {clear, getFetcher} from "./fetcher.js"
import {getLabel} from "./globals.js"
import {httpPost} from "./http.js"
import {extend, isPromise} from "./object.js"
import math from "./math.js"
import API from "./api.js"
import mitt from 'mitt'

const ModelBus = mitt();
export {ModelBus}

const getDataSource = function (name) {
  return DataSource.getDataSource(name, getLabel('lang'))
}

const promiseAll = function (data) {
  return {
    promises: [],
    names: [],
    push: function (promise, name) {
      if (isPromise(promise)) {
        this.promises.push(promise)
      } else {
        this.promises.push(new Promise(resolve => {
          resolve(promise)
        }))
      }

      this.names.push(name)
    },
    all: async function () {
      let self = this;
      let results = await Promise.all(self.promises)
      results.forEach((item, index) => {
        let key = self.names[index]
        data[key] = item
      })

      return data;
    }
  }
}
promiseAll.run = promiseAll.all;
export {promiseAll as promiseRunner}

const switchData = function (value) {
  return new Promise((resolve) => {
    resolve(value == 1 || value == '1' ? getLabel('yes') : getLabel("no"))
  })
}

const createModel = function (tablename) {
  return {
    get: function (data, callback, depth = 0) {
      let self = this;

      if (typeof (data) == 'object') {
        if (depth <= 0) {
          callback(data)
        } else {
          self.init(depth, data, callback)
        }
      } else {
        self.fetch(depth, data, callback)
      }
    },
    load: function ({data, depth = 0, isCache = true}) {
      let self = this;

      //清空缓存
      if (!isCache) {
        clear(tablename)
      }

      return new Promise((resolve, reject) => {
        if (typeof (data) == 'object') {
          if (depth <= 0) {
            resolve(data)
          } else {
            self.init(depth, data, resolve)
          }
        } else {
          self.fetch(depth, data, resolve)
        }
      });
    },
    fetch: function (depth, id, callback) {
      let self = this;
      let fetcher = getFetcher(tablename)
      fetcher(id, function (info) {
        if (depth <= 0) {
          callback(info)
        } else {
          self.init(depth, info, callback)
        }
      })
    },
    init: function (depth, row, callback) {
      let self = this
      callback(row)
    }
  }
}


const Warehouse = createModel("warehouse")
const Product = Object.assign(createModel("product"), {
  init: function (depth, row, callback) {
    let self = this
    let arr = []

    const sizecontent = DataSource.getDataSource('sizecontent', getLabel('lang'));
    arr.push(new Promise(function (resolve) {
      sizecontent.getRows(row.sizecontentids, resolve)
    }))

    Promise.all(arr).then(function (results) {
      //console.log(results)
      row.sizecontents = results[0]
      callback(row)
    });
  }
})

const SaleType = Object.assign(createModel("saletype"), {
  init: function (depth, row, callback) {
    let self = this
    //console.log(row, "+_+=")
    if (row) {
      let runner = promiseAll(row)
      runner.push(getDataSource("colortemplate").getRow(row.colortemplateid), 'colortemplate')
      runner.all().then(callback)
    } else {
      callback(row)
    }
  }
})

//附带所有关联信息的详情
const ProductDetail = Object.assign(createModel("product"), {
  init: function (depth, row, callback) {
    let self = this

    row.factoryprice = row.factoryprice * 1

    ModelBus.on("product-change", function (productid) {
      console.log("product-change", productid)
      if (productid == row.id) {

        self.fetch(depth + 1, productid, function (newinfo) {
          console.log("product-change", "重新加载", newinfo)
          extend(row, newinfo)
        })
      }
    })

    let runner = promiseAll(row)
    //runner.push(Product.load({data:row.productid}), 'product')
    //runner.push(Warehouse.load({data:row.warehouseid}), 'warehouse')
    //runner.push(Goods.load({data:row.goodsid}), 'goods')

    //尺码排序
    let promise = new Promise(resolve => {
      getDataSource("sizecontent").getRows(row.sizecontentids).then(result => {
        //console.log("result=", result)
        result.sort(function (a, b) {
          return a.row.displayindex - b.row.displayindex
        })
        resolve(result)
      })
    })
    runner.push(promise, 'sizecontents')
    runner.push(getDataSource("brandgroupchild").getRowLabel(row.childbrand), 'childbrand_label')
    runner.push(getDataSource("brandgroup").getRowLabel(row.brandgroupid), 'brandgroup_label')
    runner.push(getDataSource("country").getRowLabel(row.countries), 'countries_label')
    runner.push(getDataSource("colortemplate").getRowLabel(row.brandcolor), 'brandcolor_label')
    runner.push(getDataSource("ageseason").getRowLabel(row.ageseason), 'ageseason_label')
    runner.push(getDataSource("brand").getRowLabel(row.brandid), 'brand_label')
    runner.push(getDataSource("gender").getRowLabel(row.gender), 'gender_label')
    runner.push(getDataSource("currency").getRowLabel(row.wordpricecurrency), 'wordpricecurrency_label')
    runner.push(getDataSource("currency").getRowLabel(row.factorypricecurrency), 'factorypricecurrency_label')
    runner.push(getDataSource("currency").getRowLabel(row.nationalpricecurrency), 'nationalpricecurrency_label')
    runner.push(getDataSource("ulnarinch").getRowLabel(row.ulnarinch), 'ulnarinch_label')
    runner.push(getDataSource("productmemo").getRowLabels(row.productmemoids), 'productmemo_label')
    if (row.saletypeid > 0) {
      runner.push(SaleType.load({data: row.saletypeid, depth: 1}), 'saletype')
    }
    //
    runner.push(async function () {
      return await getDataSource("brandgroup").getRow(row.brandgroupid);
    }, 'getBrandgroup');

    runner.push(async function () {
      return await getDataSource("brandgroupchild").getRow(row.childbrand);
    }, 'getBrandgroupchild')

    //颜色分组
    runner.push(new Promise(function (resolve) {
      if (row.product_group == '') {
        resolve([])
        return
      }

      let product_group = row.product_group || ""
      if (product_group == '') {
        return resolve([])
      }
      let list = product_group.split('|').map(item => item.split(','))

      getDataSource("colortemplate").getData(function (data) {
        let array = list.map(function (item) {
          let row = data.find(function (row) {
            //console.log(row,item[1], "===", row.getValue())
            return item[1] == row.getValue()
          })
          //console.log(row, item, "+++")
          if (row) {
            return {id: item[0], colortemplateid: item[1], colorlabel: row.getLabel(), picture: row.row.picture}
          } else {
            return undefined
          }
        }).filter(item => item)

        resolve(array)
      })
    }), 'colors')


    runner.push(async function () {
      let product_group = row.product_group || "";
      if (product_group == '') {
        return [];
      }

      let list = product_group.split('|').map(item => {
        let [productid] = item.split(',');
        return self.load({data: productid, depth: 1});
      });

      return await Promise.all(list);
    }, 'getProductList');

    runner.push(function () {
      return httpPost("/productmaterial/page", {productid: row.id})
    }, "getMaterialList");

    runner.push(async function () {
      let {data} = await httpPost("/productmaterial/page", {productid: row.id});
      //console.log(ret);
      let promises = data.map(async (item) => {
        let dataSource = DataSource.getDataSource("material", getLabel('lang'))
        //self._log(item,dataSource)
        let name = await dataSource.getRowLabel(item.materialid)
        return name;
      })

      let results = await Promise.all(promises);
      return results.join(',');
    }, "getMaterial");

    runner.push(function () {
      let self = this
      return [self.brand_label, self.gender_label, self.brandcolor_label, self.ulnarinch_label, self.productmemo_label.replace(/,/g, ''), self.childbrand_label].join('')
    }, "getName");

    runner.push(function (char = ' ') {
      let self = this
      return [self.wordcode_1, self.wordcode_2, self.wordcode_3, self.wordcode_4].join(char)
    }, "getGoodsCode");

    //商品倍率
    runner.push(function () {
      return row.wordprice > 0 && row.factoryprice > 0 ? math.round(row.wordprice / row.factoryprice, 2) : "";
    }, "getBL");

    //商品折扣率
    runner.push(function () {
      return row.wordprice > 0 && row.factoryprice > 0 ? math.round(row.factoryprice / row.wordprice, 2) : "";
    }, "getZKL");

    //商品零售比
    runner.push(async function () {
      if (typeof (row.LSB) != 'undefined') {
        return row.LSB;
      }

      if (row.wordprice > 0 && row.nationalprice > 0 && row.nationalpricecurrency > 0 && row.wordpricecurrency > 0) {
        let exchange = await API.getExchange(row.wordpricecurrency, row.nationalpricecurrency);
        if (exchange > 0) {
          row.LSB = math.round(row.nationalprice / exchange / row.wordprice, 2);
          //return row.LSB;
        } else {
          row.LSB = 0;
        }
      } else {
        row.LSB = 0;
      }

      return row.LSB;
    }, "getLSB");

    runner.all().then(callback)
  }
})

const Goods = createModel("goods")
const Productstock = Object.assign(createModel("productstock"), {
  init: function (depth, row, callback) {
    let self = this;

    let runner = promiseAll(row);
    runner.push(ProductDetail.load({data: row.productid, depth: depth}), 'product');
    runner.push(Warehouse.load({data: row.warehouseid, depth: depth - 1}), 'warehouse');
    runner.push(Goods.load({data: row.goodsid, depth: depth - 1}), 'goods');
    runner.push(getDataSource("sizecontent").getRowLabel(row.sizecontentid), 'sizecontent_label');
    runner.push(getDataSource("orderproperty").getRowLabel(row.property), 'property_label');
    runner.push(getDataSource("defectivelevel").getRowLabel(row.defective_level), 'defectivelevel_label');

    //有效库存
    runner.push(function () {
      return row.number - Math.max(row.shipping_number, row.reserve_number);
    }, "getAvailableNumber");

    runner.all().then(callback)
  }
})

const ProductstockSearch = Object.assign(createModel("productstocksearch"), {
  init: function (depth, row, callback) {
    let self = this;

    let runner = promiseAll(row);
    // 库存
    // 添加一个在途状态
    let stocks = row.sizecontent_data.split(';').map(item => {
      let [sizecontentid, number, reserve_number, sales_number, shipping_number] = item.split(',');
      return {
        sizecontentid,
        number,
        reserve_number,
        sales_number,
        shipping_number
      };
    });
    runner.push(stocks, "stocks");

    runner.all().then(callback)
  }
});
export {ProductstockSearch};

const ProductstockSummary = Object.assign(createModel("productstocksummary"), {
  init: function (depth, row, callback) {
    let self = this;

    let runner = promiseAll(row);
    runner.push(ProductDetail.load({data: row.productid, depth: depth}), 'product');
    //runner.push(Warehouse.load({data:row.warehouseid, depth:depth-1}), 'warehouse');
    runner.push(getDataSource("orderproperty").getRowLabel(row.property), 'property_label');
    runner.push(getDataSource("defectivelevel").getRowLabel(row.defective_level), 'defectivelevel_label');

    // 库存
    let stocks = row.sizecontent_data.split(';').map(item => {
      // 添加 shipping_number 在途，liuzongyang 2020/4/26 11:31
      let [sizecontentid, number, reserve_number, sales_number, shipping_number] = item.split(',');
      return {
        sizecontentid,
        number,
        reserve_number,
        sales_number,
        shipping_number,
      };
    });
    runner.push(stocks, "stocks");

    runner.all().then(callback)
  }
});
export {ProductstockSummary};


const OrderDetails = Object.assign(createModel("orderdetails"), {
  init: function (depth, row, callback) {
    let self = this

    let runner = promiseAll(row)
    runner.push(ProductDetail.load({data: row.productid, depth: 1}), 'product')

    runner.all().then(callback)
  }
})

const ConfirmorderDetails = Object.assign(createModel("confirmorderdetails"), {
  init: function (depth, row, callback) {
    let self = this
    let arr = []
    arr.push(new Promise(function (resolve) {
      OrderDetails.get(row.orderdetailsid, resolve, depth - 1)
    }))

    Promise.all(arr).then(function (results) {
      //console.log(results)
      //self.row.productname = results[0].row.productname
      row.orderdetails = results[0]
      callback(row)
    });
  }
})

export {ProductDetail}

const Order = Object.assign(createModel("order"), {
  init: function (depth, row, callback) {
    let self = this

    let runner = promiseAll(row)
    runner.push(getDataSource("supplier").getRowLabel(row.bookingid), 'booking_label')
    runner.push(getDataSource("ageseason").getRowLabel(row.ageseason), 'ageseason_label')

    runner.all().then(callback)
  }
})
const Orderpayment = Object.assign(createModel("orderpayment"), {
  init: function (depth, row, callback) {
    let self = this

    let runner = promiseAll(row)
    runner.push(Order.load({data: row.orderid}), 'order')
    runner.push(getDataSource("paymenttype").getRowLabel(row.payment_type), 'payment_type_label')
    runner.push(getDataSource("currency").getRowLabel(row.currency), 'currency_label')
    runner.push(switchData(row.status), "status_label")
    runner.push(getDataSource("user").getRowLabel(row.makestaff), "makestaff_name")
    runner.push(getDataSource("user").getRowLabel(row.confirmstaff), "confirmstaff_name")

    runner.all().then(callback)
  }
})
export {Order, Orderpayment}

const Sales = createModel("sales")
const Salesreceive = Object.assign(createModel("orderpayment"), {
  init: function (depth, row, callback) {
    let self = this

    let runner = promiseAll(row)
    runner.push(Sales.load({data: row.salesid}), 'sales')
    runner.push(getDataSource("paymenttype").getRowLabel(row.payment_type), 'payment_type_label')
    runner.push(getDataSource("currency").getRowLabel(row.currency), 'currency_label')
    runner.push(switchData(row.status), "status_label")
    runner.push(getDataSource("user").getRowLabel(row.makestaff), "makestaff_name")
    runner.push(getDataSource("user").getRowLabel(row.confirmstaff), "confirmstaff_name")

    runner.all().then(callback)
  }
})
export {Sales, Salesreceive}

const User = createModel("user")
const Requisition = Object.assign(createModel("requisition"), {
  init: function (depth, row, callback) {
    let self = this
    console.log(row)
    let runner = promiseAll(row)
    if (row.apply_staff) {
      runner.push(User.load({data: row.apply_staff}), 'applyStuff')
    }

    if (row.turnin_staff) {
      runner.push(User.load({data: row.turnin_staff}), 'turninStuff')
    }

    if (row.turnout_staff) {
      runner.push(User.load({data: row.turnout_staff}), 'turnoutStuff')
    }

    if (row.out_id) {
      runner.push(Warehouse.load({data: row.out_id}), 'outWarehouse')
    }

    if (row.in_id) {
      runner.push(Warehouse.load({data: row.in_id}), 'inWarehouse')
    }

    runner.push(getDataSource("requisitionstatus").getRowLabel(row.status), 'status_label')

    runner.all().then(callback)
  }
})

export {Productstock, Warehouse, Product, Goods, OrderDetails, ConfirmorderDetails, Requisition}
export default {
  ProductDetail
}
