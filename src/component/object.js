const extract = function(object, keys){
    let obj = {}
    keys.forEach(key=>obj[key] = object[key])
    return obj
}
export {extract}

const extend = Object.assign
export {extend}

const isPromise = function(obj) {
    return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
export {isPromise}

export default {
    extract,
    extend
}