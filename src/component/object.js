const extract = function(object, keys){
    let obj = {}
    keys.forEach(key=>{
        if(typeof(object[key])!='undefined') {
            obj[key] = object[key]
        }        
    })
    return obj
}
export {extract}

const extend = Object.assign
export {extend}

const isPromise = function(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

const default_callback = (key,value)=>{return {key, value}}
const toArray = function(obj, callback=default_callback) {
    return Object.keys(obj).map(key=>{
        return callback(key, obj[key])
    })
}

const copyTo = function(fromObj, target) {
    Object.keys(target).forEach(function(key) {
        if (typeof(fromObj[key]) != "undefined") {
            target[key] = fromObj[key]
            //console.log("copy property",key, target[key])
        }
    });
}

export {isPromise,toArray,copyTo}

export default {
    extract,
    extend,
    toArray,
    copyTo
}