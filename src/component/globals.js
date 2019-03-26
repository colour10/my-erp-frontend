const ASA = {}

ASA.caches = {}

ASA.get = function(url, callback) {
    if (ASA.caches[url]) {
        if (ASA.caches[url].loaded == false) {
            var func = (function f() {
                console.log("===================", url)
                if (ASA.caches[url] && ASA.caches[url].loaded == true) {
                    callback(ASA.caches[url].data)
                } else {
                    setTimeout(f, 50)
                }
            })

            func();
        } else {
            callback(ASA.caches[url].data)
        }
    } else {
        ASA.caches[url] = {
            loaded: false
        }

        $ASA.get(url, function(res) {
            ASA.caches[url].loaded = true;
            ASA.caches[url].data = res;
            callback(res)
        }, "json")
    }
};

ASA.getLabel = function(name) {
    //console.log(typeof($ASAL), "$ASA")
    if (typeof($ASAL) != 'undefined' && $ASAL[name]) {
        //console.log(typeof($ASA), "$ASAL", $ASAL[name])
        return $ASAL[name]
    } else {
        return "";
    }
}

ASA.extend = function(obj1, obj2) {
    Object.keys(obj2).forEach(function(key) {
        obj1[key] = obj2[key];
    });
    return obj1;
}

ASA.logger = function(name) {
    return function() {
        var arr = Array.prototype.slice.call(arguments)
        arr.unshift("old <" + name + ">")
        console.log.apply(console, arr);
    }
}

const store = {
    list: {},
    temp: {},
    result: {},
    loading: false
};

ASA.getFetcher = function(name) {
    if (!store.list[name]) {
        store.list[name] = {}
        store.temp[name] = {}
        store.result[name] = {}
    }
    let list = store.list[name],
        templist = store.temp[name],
        result = store.result[name]

    return function(id, callback) {
        if (store.result[name][id]) {
            callback(store.result[name][id])
        } else {
            if (store.loading) {
                store.temp[name][id] =1
            } else {
                store.list[name][id]=1
            }

            setTimeout(function func() {
                if (store.result[name][id]) {
                    callback(store.result[name][id])
                } else {
                    if (store.loading) {
                        setTimeout(func, 100)
                    } else {
                        store.loading = true

                        var params = {}
                        Object.keys(store.list).forEach(function(key){
                            params[key] = Object.keys(store.list[key])
                        })
                        $ASA.post("/common/loadname", {
                            params: JSON.stringify(params),
                        }, function(res) {
                            //console.log("++++++++", res)
                            const mapf = function(value,key) {
                                //console.log("merge", key, store.result[key], value)
                                store.result[key] = R.merge(store.result[key], value)
                                //console.log(key, store.temp[key])
                                store.list[key] = store.temp[key];
                                store.temp[key] = {};
                            }
                            R.forEachObjIndexed(mapf, res)

                            store.loading = false
                            //console.log(result,"result")
                            callback(store.result[name][id])
                        }, "json")
                    }
                }
            }, 100)
        }
    }
}

ASA.getLabelFetcher = function(name) {
    let fetcher = ASA.getFetcher(name)

    return function(ids, column, callback) {
        console.log("ids", ids)
        var all_promise = ids.split(",").map(function(id){
            return new Promise(function(resolve, reject){
                fetcher(id, resolve);
            });
        })
        
        Promise.all(all_promise).then(function(results) {
            self.loading = false;
            console.log(results)
            callback(results.map(item=>item[column]).join(","))
        });
    }
}

export default ASA