import $ from 'jquery'
import {config} from "../application.js"
const caches = {}

const httpGet = function(url, {enableCache=true}={}) {
    return new Promise((resolve, reject)=>{
        if (caches[url]) {
            if (caches[url].loaded == false) {
                var func = (function f() {
                    if (caches[url] && caches[url].loaded == true) {
                        //50毫秒的差别，忽略不计，不认为是缓存数据
                        resolve(caches[url].data, false)
                    } else {
                        setTimeout(f, 50)
                    }
                })

                func();
            } else {
                //console.log("httpGet", "from cache", url);
                resolve(caches[url].data, true)
            }
        } else {
            caches[url] = {
                loaded: false
            }

            //console.log("httpGet", url);
            $.get(config("host")+url, function(res) {
                caches[url].loaded = true;
                caches[url].data = res;
                resolve(res, false)
            }, "json")
        }
    })    
}

const httpPost = function(url, params, callback) {
    return new Promise((resolve, reject)=>{
        $.post(config("host")+url, params, resolve,"json").error(function(xhr,errorText,errorType){
            reject()
        })
    })
    
}

export { httpGet, httpPost}
export default {};