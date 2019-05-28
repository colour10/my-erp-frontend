import {httpPost} from "./http.js"
import {ASAP} from "./globals.js"

const store = ASAP.$store

const clear = function(name, id) {
    //console.log("clear",name,id)
    if(store.result[name]) {
        if(id) {
            store.result[name][id] = undefined
        } 
        else {
            store.result[name] = {}
        }
    }
    
}

const getFetcher = function(name) {
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
                        httpPost("/common/loadname", { params: JSON.stringify(params) }).then(function(res) {

                            Object.keys(res).forEach(function(key){
                                let value = res[key];
                                store.result[key] = Object.assign(store.result[key], value)
                                //console.log(key, store.temp[key])
                                store.list[key] = store.temp[key];
                                store.temp[key] = {};
                            })

                            store.loading = false
                            //console.log(result,"result")
                            callback(store.result[name][id])
                        })
                    }
                }
            }, 100)
        }
    }
}

const getFetcherPromise = function(name) {
    let fetcher = getFetcher(name)
    return function(id){
        return new Promise(resolve=>{
            fetcher(id, resolve)
        })
    }
}

const getFetcherMultiple = function(name) {
    let fetcher = getFetcher(name)

    return function(ids, column, callback) {
        //console.log("ids", ids)
        var all_promise = ids.split(",").map(function(id){
            return new Promise(function(resolve, reject){
                fetcher(id, resolve);
            });
        })
        
        Promise.all(all_promise).then(function(results) {
            self.loading = false;
            //console.log(results)
            callback(results.map(item=>item[column]).join(","))
        });
    }
}
export {getFetcher,getFetcherMultiple,clear,getFetcherPromise}
export default {getFetcher, getFetcherMultiple, clear}