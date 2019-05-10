import {client} from "./browser.js"
import math from "./math.js"

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

const setLabel = function(labels) {
    Object.assign($ASAL,labels)
}

const getLabel = function(name) {
    if (typeof($ASAL) != 'undefined' && $ASAL[name]) {
        if($ASAL['lang']=='en') {
            return typeof($ASAL[name])=='string' ? StringFunc.ucfirst($ASAL[name]) : $ASAL[name]
        }
        else {
            return $ASAL[name]
        }
        
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

const getAvailableHeight = function() {
    return client.height-200;
}

const pageSizes = [10, 20, 30, 50, 100]
const config = {
    ouyuan: '9', //欧元货币的id
    menus:{
        "index":getLabel("shouye"),
        user:getLabel("menu-1-1"),
        "group":getLabel("menu-1-2"),
        "department":getLabel("menu-1-4"),
        "system":getLabel("xitongshezhi"),
        "brand":getLabel("menu-2-1-1"),
        "brandgroup":getLabel("menu-2-1-2"),
        "ageseason":getLabel("menu-2-1-3"),
        "colortemplate":getLabel("menu-2-1-4"),
        "sizetop":getLabel("menu-2-1-5"),
        "productmemo":getLabel("shangpinmiaoshu"),
        "material":getLabel("caizhiguanli"),
        "materialnote":getLabel("caizhibeizhu"),
        "currency":getLabel("huobiguanli"),
        "ulnarinch":getLabel("menu-2-1-7"),
        "warehouse":getLabel("menu-2-3-1"),
        "country":getLabel("menu-2-3-3"),
        "saleport":getLabel("xiaoshouduankou"),
        "price":getLabel("jiagedingyi"),
        "pricesetting":getLabel("jiageshezhi"),
        "product":getLabel("menu-3-1"),
        "supplier":getLabel("menu-4"),
        "order":getLabel("dingdanguanli"),
        "confirmorder":getLabel("menu-5-2"),
        "warehousing":getLabel("rukudanguanli"),
        "requisition":getLabel("menu-6-1"),
        "productstock":getLabel("menu-6-4"),
        "sales":getLabel("menu-7-1"),
        "orderpayment":getLabel("dingdanjiesuan"),
        "salesreceive":getLabel("xiaoshoujiesuan"),
        "user/modifypassword":getLabel("menu-11-2"),
        "login/logout":getLabel("menu-11-3"),
        "saletype":getLabel('xiaoshoushuxing'),
        "exchangerate":getLabel('huilvguanli'),
        "property":getLabel("shuxingdingyi"),
        "language":getLabel("duoguoyuyanguanli"),
        "develop":"生成器"
    }
}

const StringFunc = {
    default(str) {
        if(str==undefined) {
            return ""
        }
        else {
            return str
        }
    },
    include(parent, id){
        return (','+parent + ',').indexOf(','+id+',')>=0
    },
    ucfirst(str){
        return str.toLowerCase().replace(/ +/g, ' ').split(' ').map(item=>item.substring(0,1).toUpperCase()+item.substring(1)).join(' ');
    }
}

const Mix = {
    default(target, name, value) {
        if(typeof(target[name])=='undefined') {
            target[name] = value
        }
    }
}

export {
    ASAP,
    setLabel,
    getLabel,
    getLabel as _label,
    logger,
    extend,
    extract,
    getAvailableHeight,
    config,
    math,
    StringFunc,
    Mix
}
export default {
    getLabel,
    logger,
    extend,
    clone,
    empty,
    deleteObject,
    copyTo,
    extract,
    pageSizes,
    getAvailableHeight,
    math
}