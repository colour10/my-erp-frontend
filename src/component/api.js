import {httpPost,httpGet, host} from './http.js'
import cache from "./cache.js"
import mitt from 'mitt'

const emitter = mitt();
const pendings = {}
function _fetch(path, form) {
    let key = path + "|" +JSON.stringify(form)

    if(!pendings[key]) {
        pendings[key] = 1
        httpPost(path, form).then(result=>{
            emitter.emit(key, result)
        })
    }

    return new Promise(resolve=>{
        emitter.on(key, (result)=>{
            delete pendings[key]
            resolve(result)
        })
    })

}

const context = {};
const CacheContext = cache(context);

const API = {
    //加载汇率
    async getExchange(currency_from, currency_to) {
        //console.log("Api.getExchange")
        if(currency_from==currency_to) {
            return 1
        }

        let key = "getExchange:"+currency_from+"-"+currency_to
        let exchange = CacheContext.get(key)
        if(exchange) {
            //console.log("is cache")
            return exchange
        }

        let params = {
            currency_from,
            currency_to
        }

        let result = await _fetch("/exchangerate/getrate", params);

        CacheContext.set(key, result.data, 5000)
        return result.data;
    },

    //获得商品倍率
    async getBrandRate({brandid, brandgroupid, ageseason}) {
        if(brandid=='' || ageseason=='' || brandgroupid=='') {
            return ""
        }

        let result = await _fetch("/brandrate/getrate", {brandid, brandgroupid, ageseason})

        return result.data;
    },

    //加载品牌的颜色对应的色系和颜色名称
    async getBrandColorSuggest(brandid) {
        if(brandid=='') {
            return []
        }

        let result = await _fetch("/productlastmodify/load", {brandid})

        return result.data;
    },

    //加载商品的价格信息
    async getPriceByProductIds(priceids, productids) {
        let result = await _fetch("/product/getprices", {priceids, productids})

        return result.data;
    },

    // 查询商品
    async getProductList(wordcode, goods_code) {
        let params = {
            wordcode: wordcode.replace(/\s/g, ''),
            goods_code,
            page: 1,
            pageSize: 10,
        };

        try {
            let result = await _fetch("/product/search", params);
            return result.data;
        }
        catch(e) {
            return [];
        }
    },

    // 查询库存
    async getProductstock({productid, sizecontentid, warehouseid}) {
        let params = {
            productid,
            sizecontentid,
            warehouseid,
        };

        try {
            let result = await _fetch("/productstock/searchstock", params);
            return result.data;
        }
        catch(e) {
            return [];
        }
    },

    // 通过商品条码查询信息
    async getProductByCode(code) {
        let params = {
            code,
        };

        try {
            let result = await _fetch("/product/searchcode", params);
            return result.data;
        }
        catch(e) {
            return;
        }
    },

    // 通过商品条码查询信息
    async getProductCode(productid, sizecontentid) {
        let params = {
            productid,
            sizecontentid,
        };

        try {
            let result = await _fetch("/product/getcode", params);
            return result.data;
        }
        catch(e) {
            return '';
        }
    },

    // 获得入库单上费用统计数据。
    async getShippingFeeStat(shippingid) {
        let params = {
            shippingid,
        };

        try {
            let result = await _fetch("/shipping/feesum", params);
            return result.data;
        }
        catch(e) {
            return {};
        }
    },

    async getSetting() {
        try {
            let result = await _fetch("/common/setting", {});
            return result.data;
        }
        catch(e) {
            return {};
        }
    },

    async getOrderListToImport({ageseasonid, orderid, bookingid, brandid}) {
        try {
            let result = await _fetch("/order/import", {ageseasonid, orderid, bookingid, brandid});
            return result.data;
        }
        catch(e) {
            return {
                orders: [],
                details: [],
            };
        }
    },

    async getOrderbrandListToImport({supplierid, ageseason, orderbrandid}) {
        try {
            let result = await _fetch("/orderbrand/searchorder", {supplierid, ageseason, orderbrandid});
            return result.data;
        }
        catch(e) {
            return {
                orderbrands: [],
                orderbranddetails: [],
            };
        }
    },

    async getSupplierInvoiceList(supplierid) {
        let params = {
            supplierid,
        };

        try {
            let result = await _fetch("/supplierinvoice/getlist", params);
            return result.data;
        }
        catch(e) {
            return [];
        }
    },
};

export default API;
