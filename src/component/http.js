import $ from 'jquery'

import {ASAP} from "./util.js"


const host = ASAP.host;

const httpGet = function(url, {enableCache=true}={}) {
    //console.log(window.ASAP)
    if(ASAP.$session_id && ASAP.dev==true) {
        let session_id = ASAP.$session_id
        url = url.indexOf('?')>=0 ? url+'&_session_id='+session_id : url + '?_session_id='+session_id
    }

    //console.log(url, enableCache)
    const caches = ASAP.caches 
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
            $.get(host+url, function(res) {
                caches[url].loaded = true;
                caches[url].data = res;
                resolve(res, false)
            }, "json")
        }
    })    
}

const httpPost = function(url, params, callback) {
    if(ASAP.$session_id && ASAP.dev==true) {
        params._session_id = ASAP.$session_id
    }

    return new Promise((resolve, reject)=>{
        $.post(host+url, params, resolve,"json").error(function(xhr,errorText,errorType){
            reject()
        })
    })
    
}

export { httpGet, httpPost, host}
export default {};