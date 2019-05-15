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

const toArray = function(obj, callback=key=>{return {key, value:obj[key]}}) {
    return Object.keys(obj).map(callback)
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