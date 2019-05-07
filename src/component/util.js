import {client} from "./browser.js"
import math from "./math.js"
import ObjectFamily from "./util/object.js"

const ASAP = window.ASAP || {
    caches:{}, //httpGet的缓存对象
    $store: {  //fetcher的缓存对象
        list: {},
        temp: {},
        result: {},
        loading: false
    },
    resources:{}  //DataSource缓存对象
}

if(window.location.href.indexOf('http://localhost')>=0) {
    //npm run dev 调试模式
    ASAP.dev = true;
    ASAP.host = 'http://erp.localhost.com'
}
else {
    ASAP.host = ''
}

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

const deleteObject = function(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == obj) {
            arr.splice(i, 1)
            break;
        }
    }
    return arr
}

const getAvailableHeight = function() {
    return client.height-200;
}

const pageSizes = [10, 20, 30, 50, 100]
const config = {
    ouyuan: '9' //欧元货币的id
}

const StringFunc = {
    default:function(str) {
        if(str==undefined) {
            return ""
        }
        else {
            return str
        }
    }
}

export {
    ASAP,
    logger,
    getAvailableHeight,
    config,
    math,
    StringFamily,
    ObjectFamily
}
export default {
    logger,
    deleteObject,
    pageSizes,
    getAvailableHeight,
    math
}