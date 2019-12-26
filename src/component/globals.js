import {client} from "./browser.js"
import math from "./math.js"
import {label} from "./application.js"

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

const setLabel = function(name,value) {
    //console.log("setLabel", name, value)
    return label(name, value)
}

const getLabel = function(name) {
    let text = label(name)
    if(label('lang')=='en') {
        return typeof(text)=='string' ? StringFunc.ucfirst(text) : text
    }
    else {
        return text
    }
}

const showLabel = function(name, suffix='') {
    let text = label(name)
    let textSuffix = ''
    if (suffix != '') {
        textSuffix = '(' + label(suffix) + ')';
    }
    text = text + textSuffix
    if(label('lang')=='en') {
        return typeof(text)=='string' ? StringFunc.ucfirst(text) : text
    }
    else {
        return text
    }
}

const extend = Object.assign;
const extendExt = function(...args) {
    let [target,...lefts] = args;
    let object = {};
    extend(object, ...lefts);

    for(let key of Object.keys(object)) {
        if (typeof(target[key]) != "undefined") {
            target[key] = object[key];
        }
    }
}
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

const pageSizes = [10, 15, 20, 30, 50, 100]

const config = function(){
    return {
        ouyuan: '9', //欧元货币的id
        menus:{
            "index":getLabel("shouye"),
            "user":getLabel("menu-1-1"),
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
            "shipping":getLabel("menu-5-2"),
            "requisition":getLabel("menu-6-1"),
            "productstock":getLabel("menu-6-4"),
            "sales":getLabel("menu-7-1"),
            "orderpayment":getLabel("dingdanjiesuan"),
            "salesreceive":getLabel("xiaoshoujiesuan"),
            "user/modifypassword":getLabel("xiugaimima"),
            "login/logout":getLabel("menu-11-3"),
            "saletype":getLabel('xiaoshoushuxing'),
            "producttype":getLabel('shangpinshuxing'),
            "exchangerate":getLabel('huilvguanli'),
            "property":getLabel("shuxingdingyi"),
            "orderbrand":getLabel("waibudingdan"),
            "language":getLabel("duoguoyuyanguanli"),
            "winterproofing":getLabel("fanghanzhishu"),
            "feename":getLabel("feiyongguanli"),
            "permission": getLabel("quanxianguanli"),
            'bill': getLabel('xiaoshouduizhang'),
            billcreate: getLabel('xinjianduizhangdan'),
            paymentway: getLabel('fukuanfangshi'),
            "user/setting": getLabel("gerenshezhi"),
            "develop":"生成器"
        }
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
        //console.log((','+parent + ',').indexOf(','+id+','), parent,id)
        return (','+parent + ',').indexOf(','+id+',')>=0
    },
    ucfirst(str){
        return str.toLowerCase().replace(/ +/g, ' ').split(' ').map(item=>item.substring(0,1).toUpperCase()+item.substring(1)).join(' ');
    },
    random(length, chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') {
        let result = '';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
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
    showLabel,
    logger,
    extend,
    extendExt,
    extract,
    getAvailableHeight,
    config,
    empty,
    math,
    StringFunc,
    Mix
}
export default {
    getLabel,
    showLabel,
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