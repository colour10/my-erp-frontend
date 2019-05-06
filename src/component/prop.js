import {getLabel, getAvailableHeight} from "./globals.js"
const _label = getLabel

const sort_method_digit = function(a,b){
    return a-b
}
const props = {
    "price":{
        columns: [
            { name: "name", label: _label("mingcheng"), type:"sp-input", listType:'sp-text' },
            { name: "countryid", label: _label("guojiadiqu"), type:"sp-select", source:"country", listType:"sp-select-text"},
            //{ name: "pricetype", label: _label("jiageleixing"), type:"sp-select", source:"pricetype", listType:"sp-select-text"},            
            { name: "currencyid", label: _label("bizhong"), type:"sp-select", source:"currency", listType:"sp-select-text"},
            { name: "displayindex", label: _label("paixu"), type:"sp-input", sortMethod:sort_method_digit }
        ],
        controller: "price",
        auth: "price",
        options:{
            dialogWidth:"400px", 
            autoreload:true
        }
    },
    "saletype":{
        columns: [
            { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus:true},
            { name: "color", label: _label("yanse")},
            { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
        ],
        controller: "saletype",
        auth: "saletype",
        options:{
            dialogWidth:"400px", 
            autoreload:true
        },
        key_column: "name"
    },
    "productprice":{
        columns: [
            { name: "pricename", label: _label("jiage"), type: 'label'},
            { name: "price", label: _label("jine") }
        ],
        controller: "productprice"
    },
    "brandrate":{
        columns: [
            { name: "brandgroupid", label: _label("pinlei"), type:"select", source:"brandgroup", width:120},
            { name: "ageseasonid", label: _label("niandaijijie"), type:"select", source:"ageseason", width:120},
            { name: "rate", label: _label("beilv"), width:120},
            { name: "modifystaff", label: _label("gengxinren"), type:"select", source:"user", is_edit_hide:true},
            { name: "modifytime", label: _label("gengxinshijian"), is_edit_hide:true}
        ],
        controller: "brandrate",
        auth: "brand",
        options:{
            dialogWidth:"400px", 
            autoreload:true,
            autohide:true
        },
        base:{
            brandid:""
        }
    },
    aliases:{
        columns:[
            {name:"name", label:_label('biemingmingcheng'), is_multiple:true, is_focus:true},
            {name:"code", label:_label('biemingbianma')}
        ],
        controller:"aliases",
        key_column:"name",
        base:{
            brandid:""    
        }
    },
    series:{
        columns:[
            {name:"name", label:_label('xiliemingcheng'), is_multiple:true, is_focus:true},
            {name:"code", label:_label('xiliebianma')}
        ],
        controller:"series",
        key_column:"name",
        base:{
            brandid:""    
        }
    },
    property:{
        columns:[
            {name:"name", label:_label('mingcheng'), is_multiple:true, is_focus:true},
            { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
        ],
        controller:"property",
        key_column:"name"
    }
}

const getComponent = function(name) {
    return {
        data: function() {
            return {
                props: props[name]
            }
        },
        template: '<multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>'
    }
}

const getComponentSimple = function(name) {
    return {
        data: function() {
            return {
                props: props[name]
            }
        },
        template: '<sp-page v-bind="props" ref="page"></sp-page>'
    }
}

const getProp = function(name) {
    return props[name]
}

export {getComponentSimple,getComponent, getProp}
export default {getComponentSimple,getComponent}