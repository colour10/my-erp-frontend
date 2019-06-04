import {getLabel, getAvailableHeight} from "./globals.js"
import DataSource from './DataSource.js'

const _label = getLabel

const sort_method_digit = function(a,b){
    return a-b
}

const clearCache = function(name){
    DataSource.getDataSource(name, _label("lang")).clear()
}

const props = function(){
    return {
        "ageseason": {
            columns: [
                { name: "sessionmark", label: _label("fabuji"), is_hide: true, type: 'select', source: "sessionmark" }, 
                { name: "name", label: _label("nianfen"), is_focus: true, convert: function(row, rowIndex, column) {
                        return row.sessionmark + row.name
                    }
                }
            ],
            controller: "ageseason",
            on:{
                "after-update":function(){
                    clearCache("ageseason")
                }
            }
        },

        "ulnarinch": {
            columns: [
                //{ name: "brandgroupchildid", label: _label("zipinlei"), type: "brandgroupchild", source:"brandgroupchild" },
                { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus: true },
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller: "ulnarinch",
            key_column: "name",
            on:{
                "after-update":function(){
                    clearCache("ulnarinch")
                }
            }
        },

        "language": {
            columns: [
                //{ name: "brandgroupchildid", label: _label("zipinlei"), type: "brandgroupchild", source:"brandgroupchild" },
                { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus: true }
            ],
            controller: "language",
            key_column: "name"
        },

        "warehouse": {
            columns: [{
                    name: "name",
                    label: _label("cangkumingcheng")
                }, {
                    name: "countryid",
                    label: _label("guojiadiqu"),
                    is_hide: true,
                    type: 'select',
                    source: "country"
                }, {
                    name: "city",
                    label: _label("chengshi")
                }, {
                    name: "address",
                    label: _label("dizhi")
                }, {
                    name: "zipcode",
                    label: _label("youbian"),
                    is_hide: true
                },

                {
                    name: "contact",
                    label: _label("lianxiren")
                }, {
                    name: "mobile",
                    label: _label("yidongdianhua"),
                    is_hide: true
                }, {
                    name: "fax",
                    label: _label("chuanzhen"),
                    is_hide: true
                }, {
                    name: "code",
                    label: _label("bianhao"),
                    is_hide: true
                }, {
                    name: "othercontact",
                    label: _label("qitalianxifangshi"),
                    is_hide: true
                }, {
                    name: "is_real",
                    label: _label("shifoukeyong"),
                    type: "switch"
                }
            ],
            controller: "warehouse",
            on:{
                "after-update":function(){
                    clearCache("warehouse")
                }
            }
        },

        "country": {
            columns: [
                { name: "name", label: _label("guojiamingcheng"), is_multiple: true, is_focus: true }, 
                { name: "code", label: _label("guojiadaima3") },
                { name: "code_short", label: _label("guojiadaima2") }, 
                { name: "localcurrency", label: _label("bizhong"), type: 'select', source: "currency" },
                { name: "area_code", label: _label("guojiquhao") }, 
            ],
            controller: "country",
            key_column: "name",
            on:{
                "after-update":function(){
                    clearCache("country")
                }
            }
        },

        "currency": {
            columns: [
                { name: "code", label: _label("bianma") },
                { name: "name", label: _label("mingcheng"), is_multiple: true,  is_focus: true }
                
            ],
            controller: "currency",
            key_column: "name",
            on:{
                "after-update":function(){
                    clearCache("currency")
                }
            }
        },

        "material": {
            columns: [
                { name: "name", label: _label("caizhimingcheng"), is_multiple: true, is_focus: true }
            ],
            controller: "material",
            key_column: "name",
            options:{
                dialogWidth:"400px",
                isAutoReload:false
            },
            on:{
                "after-update":function(){
                    clearCache("material")
                }
            }
        },

        "materialnote": {
            columns: [
                { name: "brandgroupids", label: _label("pinlei"), type: "select", source:"brandgroup", multiple:true },
                { name: "content", label: _label("mingcheng"), is_focus: true, is_multiple: true}, 
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller: "materialnote",
            key_column: "content",
            options:{
                dialogWidth:"400px"
            },
            on:{
                "after-update":function(){
                    clearCache("materialnote")
                }
            }
        },

        "colortemplate": {
            columns: [
                { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus: true },
                { name: "code", label: _label("asabianhao") },
                { name: "picture", label: _label("yanseseban"), type: "avatar", image_width: 60, image_height: 60 }
            ],
            controller: "colortemplate",
            key_column: "name",
            on:{
                "after-update":function(){
                    clearCache("colortemplate")
                }
            }
        },

        "productmemo": {
            columns: [
                //{ name: "brandgroupchildid", label: _label("zipinlei"), type: "brandgroupchild", source:"brandgroupchild" },
                { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus: true },
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller: "productmemo",
            key_column: "name",
            options:{
                dialogWidth:"400px"
            },
            on:{
                "after-update":function(){
                    clearCache("productmemo")
                }
            }
        },

        "saleport": {
            columns: [{
                name: "name",
                label: _label("xiaoshouduankou"),
                is_focus: true
            }, {
                name: "discount",
                label: _label("zhekou"),
                is_focus: true
            }],
            controller: "saleport",
            on:{
                "after-update":function(){
                    clearCache("saleport")
                }
            }
        },
        "orderpayment":{
            columns: [
                { name: "orderno", label: _label("dingdanhao"), type: 'label'},
                { name: "payment_type", label: _label("fukuanleixing"), type: 'select', source: "paymenttype" },
                { name: "currency", label: _label("bizhong"), type: 'select', source: "currency" },
                { name: "amount", label: _label("jine") },
                { name: "paymentdate", label: _label("fukuanriqi"), type:"date" },
                { name: "memo", label: _label("beizhu") },
                { name: "makestaff", label: _label("tijiaoren"),  type: 'select', source: "user", is_edit_hide:true },
                { name: "status", label: _label("yiruzhang"), type:"switch", is_edit_hide:true }
            ],
            controller: "orderpayment",
            auth: "order-submit",    
            base:{
              orderid:''
            },
            options:{
                isedit:(item)=>item.status==0,
                isdelete:(item)=>item.status==0,
                autoreload:true
            },
            on:{
                "after-update":function(){
                    clearCache("orderpayment")
                }
            }
        },
        "salesreceive":{
            columns: [
                { name: "orderno", label: _label("dingdanhao"), type: 'label'},
                { name: "payment_type", label: _label("fukuanleixing"), type: 'select', source: "paymenttype" },
                { name: "currency", label: _label("bizhong"), type: 'select', source: "currency" },
                { name: "amount", label: _label("jine") },
                { name: "paymentdate", label: _label("fukuanriqi"), type:"date" },
                { name: "memo", label: _label("beizhu") },
                { name: "makestaff", label: _label("tijiaoren"),  type: 'select', source: "user", is_edit_hide:true },
                { name: "status", label: _label("yiruzhang"), type:"switch", is_edit_hide:true }
            ],
            controller: "salesreceive",
            auth: "order-submit",    
            base:{
              orderid:''
            },
            options:{
                isedit:(item)=>item.status==0,
                isdelete:(item)=>item.status==0,
                autoreload:true
            },
            on:{
                "after-update":function(){
                    clearCache("salesreceive")
                }
            }
        },

        "company":{
            columns: [
                { name: "name", label: _label("mingcheng"), class: "width2"},
                { name: "countryid", label: _label("guojiadiqu"), type: 'select', source: "country", class: "width2" },
                { name: "language", label: _label("morenyuyan"), type: 'select', source: "languages", class: "width2" },
                { name: "currencyid", label: _label("benguohuobi"), type: 'select', source: "currency", class: "width2" },
                { name: "address", label: _label("dizhi"), class: "width1", is_hide: true }, 
                { name: "englishname", label: _label("yingwenmingcheng"), class: "width1", is_hide: true }, 
                { name: "website", label: _label("wangzhi"), class: "width2", is_hide: true }, 
                { name: "fax", label: _label("chuanzhen"), class: "width2", is_hide: true }, 
                { name: "legal", label: _label("faren"), class: "width2", is_hide: true }, 
                { name: "registeredcapital", label: _label("zhuceziben"), class: "width2", is_hide: true }, 
                { name: "businesslicense", label: _label("yingyezhizhaohao"), class: "width2", is_hide: true }, 
                { name: "heading", label: _label("shuihao"), class: "width2", is_hide: true }
            ],
            controller: "company",
            auth: "company",
            on:{
                "after-update":function(){
                    clearCache("company")
                }
            }
        },
        "companyinvoice":{
            columns: [
                { name: "name", label: _label("mingcheng"), class: "width1"},
                { name: "telephone", label: _label("dianhua"), class: "width1"},
                { name: "address", label: _label("dizhi"), class: "width1", is_hide: true }, 
                { name: "bank", label: _label("kaihuhang"), class: "width1" }, 
                { name: "bank_account", label: _label("yinhangzhanghao"), class: "width1" }
            ],
            controller: "companyinvoice",
            auth: "company",
            base:{
              companyid:''
            },
            on:{
                "after-update":function(){
                    clearCache("companyinvoice")
                }
            }
        },
        
        "pricesetting":{
            columns: [
                { name: "priceid", label: _label("jiagemingcheng"), type:"select", source:"price", class:'width2'},
                { name: "brandid", label: _label("pinpai"), type:"select", source:"brand", trigger:['seriesid'], class:'width2'},
                { name: "brandgroupid", label: _label("pinlei"), type:"select", source:"brandgroup", trigger:["brandgroupchildid"], class:'width2', multiple:true},
                { name: "brandgroupchildid", label: _label("zipinlei"), type:"select", source:"brandgroupchild", class:'width2', multiple:true},
                { name: "ageseasonid", label: _label("niandai"), type:"select", source:"ageseason", class:'width2'},
                { name: "seriesid", label: _label("xilie"), type:"select", source:"series", class:'width2'},
                { name: "discount", label: _label("xishu"), class:'width2'}
            ],
            controller: "pricesetting",
            auth: "pricesetting",
            options:{
                dialogWidth:"400px", 
                autoreload:true
            },
            on:{
                "after-update":function(){
                    clearCache("pricesetting")
                }
            }
        },
        "price":{
            columns: [
                { name: "name", label: _label("mingcheng") },
                { name: "countryid", label: _label("guojiadiqu"), type:"select", source:"country"},
                { name: "pricetype", label: _label("jiageleixing"), type:"select", source:"pricetype"},            
                { name: "currencyid", label: _label("bizhong"), type:"select", source:"currency"},
                { name: "filter", label: _label("quzheng"), type:"select", source:"pricefilter", class:'width2'},
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller: "price",
            auth: "price",
            options:{
                dialogWidth:"400px", 
                autoreload:true
            },
            on:{
                "after-update":function(){
                    clearCache("price")
                }
            }
        },
        "saletype":{
            columns: [
                { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus:true},
                { name: "colortemplateid", label: _label("yanse"), type:"colorselect", source:"colortemplate"},
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller: "saletype",
            auth: "saletype",
            options:{
                dialogWidth:"400px", 
                autoreload:true
            },
            key_column: "name",
            on:{
                "after-update":function(){
                    clearCache("saletype")
                }
            }
        },
        "productprice":{
            columns: [
                { name: "pricename", label: _label("jiage"), type: 'label'},
                { name: "price", label: _label("jine") }
            ],
            controller: "productprice",
            on:{
                "after-update":function(){
                    clearCache("productprice")
                }
            }
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
            },
            on:{
                "after-update":function(){
                    clearCache("brandrate")
                }
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
            },
            on:{
                "after-update":function(){
                    clearCache("aliases")
                }
            }
        },
        series:{
            columns:[
                { name:"name", label:_label('xiliemingcheng'), is_multiple:true, is_focus:true },
                { name:"code", label:_label('xiliebianma') },
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller:"series",
            key_column:"name",
            base:{
                brandid:""    
            },
            on:{
                "after-update":function(){
                    clearCache("series")
                }
            }
        },
        property:{
            columns:[
                {name:"name", label:_label('mingcheng'), is_multiple:true, is_focus:true},
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller:"property",
            key_column:"name",
            on:{
                "after-update":function(){
                    clearCache("property")
                }
            }
        },
        "producttype":{
            columns: [
                { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus:true},
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller: "producttype",
            auth: "producttype",
            options:{
                dialogWidth:"400px", 
                autoreload:true
            },
            key_column: "name",
            on:{
                "after-update":function(){
                    clearCache("producttype")
                }
            }
        },
    }
}

const getComponent = function(name) {    
    return {
        name:"sp-" +name,
        data: function() {
            return {
                prop: props()[name]
            }
        },
        render(h) {
            return h("multiple-admin-page", {
                props:this.prop,
                on:this.prop.on || {},
                ref:"page"
            })
        }
    }
}

const getComponentSimple = function(name) {
    return {
        name:"sp-" +name,
        data: function() {
            return {
                prop: props()[name]
            }
        },
        render(h) {
            return h("simple-admin-page", {
                props:this.prop,
                on:this.prop.on || {},
                ref:"page"
            })
        }
    }
}

const getProp = function(name) {
    return props()[name]
}

export {getComponentSimple,getComponent, getProp}
export default {getComponentSimple,getComponent}