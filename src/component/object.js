const extract = function(object, keys){
    let obj = {}
    keys.forEach(key=>obj[key] = object[key])
    return obj
}
export {extract}

const extend = Object.assign
export {extend}

export default {
    extract,
    extend
}