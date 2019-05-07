const extract = function(object, keys){
    let obj = {}
    keys.forEach(key=>obj[key] = object[key])
    return obj
}

const extend = Object.assign

const isPromise = function(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

const clone = function(target) {
    var obj = {}
    Object.keys(target).forEach(function(key) {
        obj[key] = target[key]

    });
    return obj;
}

const copyTo = function(fromObj, target) {
    Object.keys(target).forEach(function(key) {
        if (typeof(fromObj[key]) != "undefined") {
            target[key] = fromObj[key]
            //console.log("copy property",key, target[key])
        }
    });
}

const empty = function(target) {
    Object.keys(target).forEach(function(key) {
        target[key] = ""
    });

    return target;
}

export {isPromise, extend, extract, clone, copyTo, empty}
export default {
    isPromise, extend, extract, clone, copyTo, empty
}