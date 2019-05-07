import {getFetcher,clear} from "./fetcher.js"
import {label} from "../application.js"
import {isPromise} from "./object.js"

const promiseAll = function(data) {
    return {
        promises:[],
        names:[],
        push:function(promise, name){
            if(isPromise(promise)) {
                this.promises.push(promise)
            }
            else {
                this.promises.push(new Promise(resolve=>{
                    resolve(promise)
                }))
            }
            
            this.names.push(name)
        },
        all:async function(){
            let self = this;
            let results = await Promise.all(self.promises)
            results.forEach((item,index)=>{
                let key = self.names[index]
                data[key] = item
            })

            return data;
        }
    }
}

const switchData = function(value) {
    return new Promise((resolve)=>{
        resolve(value==1 || value=='1' ? label('yes') : label("no"))
    })
}

const createModel = function(tablename) {
    return {
        get:function(data, callback, depth=0) {
            let self = this;

            if(typeof(data)=='object') {
                if(depth<=0) {
                    callback(data)
                }
                else {
                    self.init(depth, data, callback)
                }
            }
            else {
                self.fetch(depth, data, callback)
            }
        },
        load:function({data, depth=0, isCache=true}){
            let self = this;

            //清空缓存
            if(!isCache) {
                clear(tablename)
            }
            
            return new Promise((resolve, reject)=>{
                if(typeof(data)=='object') {
                    if(depth<=0) {
                        resolve(data)
                    }
                    else {
                        self.init(depth, data, resolve)
                    }
                }
                else {
                    self.fetch(depth, data, resolve)
                }
            });
        },
        fetch:function(depth, id, callback) {
            let self = this;
            let fetcher = getFetcher(tablename)
            fetcher(id, function(info){
                if(depth<=0) {
                    callback(info)
                }
                else {
                    self.init(depth, info, callback)
                }
            })
        },
        init:function(depth, row, callback) {
            let self = this
            callback(row)        
        }
    }
}

export {createModel, promiseAll}
export default {
    createModel,
    promiseAll
}