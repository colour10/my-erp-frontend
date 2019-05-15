import {isArray} from "./array.js"
import {toArray, extract, extend} from "./object.js"

const ObjectChain = function(target) {
    let self = this

    self.toArray = function(callback){
        return new ArrayChain(toArray(target, callback))
    }

    self.extract = function(keys){
        return new ObjectChain(extract(target, keys))
    }

    self.map = function(callback){
        let result = {}
        toArray(target).forEach(item=>{
            result[item.key] = callback(item.value)
        })
        return new ObjectChain(result)
    }

    self.filter = function(callback) {
        let result = {}
        toArray(target).filter(item=>{
            return callback(item.value, item.key)
        }).forEach(item=>{
            result[item.key] = item.value
        })
        console.log(result)
        return new ObjectChain(result)
    }

    self.forEach = function(callback){
        toArray(target).forEach(item=>{
            callback(item.value, item.key)
        })
    }

    self.object = function() {
        return target
    }

    self.extend = function(object){
        return new ObjectChain(extend({}, target, object))
    }
}

const ArrayChain = function(target) {
    let self = this

    self.map = function(callback){
        return new ArrayChain(target.map(callback))
    }

    self.filter = function(callback){
        return new ArrayChain(target.filter(callback))
    }

    self.toObject = function(callback) {
        let result = {}
        target.map(callback).forEach(item=>{
            result[item[0]] = item[1]
        })

        return new ObjectChain(result)
    }

    self.array = function() {
        return target;
    }
}

export default function(target) {
    if(isArray(target)) {
        return new ArrayChain(target)
    }
    else if(typeof(target)=='object') {
        return new ObjectChain(target)
    }
    else {
        throw "unknow Type"
    }
    
}