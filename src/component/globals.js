const getLabel = function(name) {
    if (typeof($ASAL) != 'undefined' && $ASAL[name]) {
        return $ASAL[name]
    } else {
        return "";
    }
}

const extend = Object.assign;

const logger = function(name) {
    return function() {
        var arr = Array.prototype.slice.call(arguments)
        arr.unshift("old <" + name + ">")
        console.log.apply(console, arr);
    }
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

const round = function(num, length) {
    if (num > 0) {
        var l = Math.pow(10, length)
        return Math.round(num * l) / l
    } else {
        return '';
    }
}

const deleteObject = function(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) {
            arr.splice(i, 1)
            break;
        }
    }
    return arr
}

const extract = function(object, keys){
    let obj = {}
    keys.forEach(key=>obj[key] = object[key])
    return obj
}

export {
    getLabel,
    getLabel as _label,
    logger,
    extend,
    extract
}
export default {
    getLabel,
    logger,
    extend,
    clone,
    empty,
    round,
    deleteObject,
    copyTo,
    extract
}