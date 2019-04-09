import $ from 'jquery'

const ASAP = window.ASAP || {}
const caches = {}
let host =''
if(window.location.href.indexOf('http://localhost')>=0) {
    host ='http://erp.localhost.com'
}

const httpGet = function(url, callback) {
    //console.log(window.ASAP)
    if(window.ASAP && window.ASAP.$session_id) {
        let session_id = window.ASAP.$session_id
        url = url.indexOf('?')>=0 ? url+'&_session_id='+session_id : url + '?_session_id='+session_id
    }
    if (caches[url]) {
        if (caches[url].loaded == false) {
            var func = (function f() {
                if (caches[url] && caches[url].loaded == true) {
                    callback(caches[url].data)
                } else {
                    setTimeout(f, 50)
                }
            })

            func();
        } else {
            callback(caches[url].data)
        }
    } else {
        caches[url] = {
            loaded: false
        }

        $.get(host+url, function(res) {
            caches[url].loaded = true;
            caches[url].data = res;
            callback(res)
        }, "json")
    }
}

const httpPost = function(url, params, callback) {
    if(window.ASAP && window.ASAP.$session_id) {
        params._session_id = window.ASAP.$session_id
    }

    $.post(host+url, params, callback,"json")
}

export { httpGet, httpPost, host}
export default {};