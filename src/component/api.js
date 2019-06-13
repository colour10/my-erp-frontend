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

const context = {}
const CacheContext = cache(context)

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
    }
}

export default API