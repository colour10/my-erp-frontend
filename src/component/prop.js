import {label} from "./application.js"

const sort_method_digit = function(a,b){
    return a-b
}
const props = {
    "price":{
        columns: [
            { name: "name", label: label("mingcheng"), type:"sp-input", listType:'sp-text' },
            { name: "countryid", label: label("guojiadiqu"), type:"sp-select", source:"country", listType:"sp-select-text"},
            //{ name: "pricetype", label: label("jiageleixing"), type:"sp-select", source:"pricetype", listType:"sp-select-text"},            
            { name: "currencyid", label: label("bizhong"), type:"sp-select", source:"currency", listType:"sp-select-text"},
            { name: "displayindex", label: label("paixu"), type:"sp-input", sortMethod:sort_method_digit }
        ],
        controller: "price",
        auth: "price",
        options:{
            dialogWidth:"400px", 
            autoreload:true
        }
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