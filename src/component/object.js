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

const extendu = function(target, source, callback){
    Object.keys(source).forEach(function(key) {
        if(callback({target, key, value:source[key]})){
            target[key] = source[key]
        }
    })
}

function* entries(obj) {
  for (let key of Object.keys(obj)) {
    yield [obj[key], key];
  }
}

export { isPromise, toArray, copyTo, extendu, entries }

export default {
    extract,
    extend,
    toArray,
    copyTo,
    extendu,
    entries
}