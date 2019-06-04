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
            resolve(result)
        })
    })
    
}

const context = {}
const CacheContext = cache(context)

const API = {
    async getExchange(currency_from, currency_to) {
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
    }
}

export default API