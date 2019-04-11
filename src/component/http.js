import $ from 'jquery'

const ASAP = window.ASAP || {}
const caches = {}
let host =''
if(window.location.href.indexOf('http://localhost')>=0) {
    host ='http://erp.localhost.com'
    ASAP.dev = true;
}

const httpGet = function(url, {enableCache=true}={}) {
    //console.log(window.ASAP)
    if(window.ASAP && window.ASAP.$session_id && ASAP.dev==true) {
        let session_id = window.ASAP.$session_id
        url = url.indexOf('?')>=0 ? url+'&_session_id='+session_id : url + '?_session_id='+session_id
    }

    console.log(url, enableCache)

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
                resolve(caches[url].data, true)
            }
        } else {
            caches[url] = {
                loaded: false
            }

            $.get(host+url, function(res) {
                caches[url].loaded = true;
                caches[url].data = res;
                resolve(res, false)
            }, "json")
        }
    })    
}

const httpPost = function(url, params, callback) {
    if(window.ASAP && window.ASAP.$session_id && ASAP.dev==true) {
        params._session_id = window.ASAP.$session_id
    }

    return new Promise((resolve, reject)=>{
        $.post(host+url, params, resolve,"json")
    })
    
}

export { httpGet, httpPost, host}
export default {};