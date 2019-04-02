const caches = {}

const httpGet = function(url, callback) {
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

        $ASA.get(url, function(res) {
            caches[url].loaded = true;
            caches[url].data = res;
            callback(res)
        }, "json")
    }
}

const httpPost = $ASA.post

export { httpGet, httpPost}
export default {};