import {getLabel, getAvailableHeight} from "./globals.js"
const _label = getLabel

const sort_method_digit = function(a,b){
    return a-b
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
            controller: "ageseason"
        },

        "ulnarinch": {
            columns: [
                //{ name: "brandgroupchildid", label: _label("zipinlei"), type: "brandgroupchild", source:"brandgroupchild" },
                { name: "name", label: _label("mingcheng"), is_multiple: true, is_focus: true },
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
            ],
            controller: "ulnarinch",
            key_column: "name"
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
            controller: "warehouse"
        },

        "country": {
            columns: [{
                name: "name",
                label: _label("guojiamingcheng"),
                is_multiple: true,
                is_focus: true
            }, {
                name: "code",
                label: _label("guojiadaima3")
            },
            {
                name: "code_short",
                label: _label("guojiadaima2")
            }, {
                name: "localcurrency",
                label: _label("bizhong"),
                type: 'select',
                source: "currency"
            }],
            controller: "country",
            key_column: "name"/*,
            options:{
                tableHeight:getAvailableHeight()
            }*/
        },

        "currency": {
            columns: [
                { name: "code", label: _label("bianma") },
                { name: "name", label: _label("mingcheng"), is_multiple: true,  is_focus: true }
                
            ],
            controller: "currency",
            key_column: "name"/*,
            options:{
                tableHeight:getAvailableHeight()
            }*/
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
            }
        },

        "colortemplate": {
            columns: [{
                    name: "name",
                    label: _label("mingcheng"),
                    is_multiple: true,
                    is_focus: true
                },
                //{name:"color_name", label:_label("mingcheng")},
                {
                    name: "code",
                    label: _label("asabianhao")
                },
                //{name:"colortype", label:_label("yansefenlei")},
                {
                    name: "picture",
                    label: _label("yanseseban"),
                    type: "avatar",
                    image_width: 60,
                    image_height: 60
                }
            ],
            controller: "colortemplate",
            key_column: "name"
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
            controller: "saleport"
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
            auth: "company"
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
            }
        },
        
        "pricesetting":{
            columns: [
                { name: "priceid", label: _label("jiagemingcheng"), type:"select", source:"price", class:'width2'},
                { name: "brandid", label: _label("pinpai"), type:"select", source:"brand", trigger:['seriesid'], class:'width2'},
                { name: "brandgroupid", label: _label("pinlei"), type:"select", source:"brandgroup", trigger:["brandgroupchildid"], class:'width2'},
                { name: "brandgroupchildid", label: _label("zipinlei"), type:"select", source:"brandgroupchild", class:'width2'},
                { name: "ageseasonid", label: _label("niandai"), type:"select", source:"ageseason", class:'width2'},
                { name: "seriesid", label: _label("xilie"), type:"select", source:"series", class:'width2'},
                { name: "discount", label: _label("xishu"), class:'width2'},
                { name: "filter", label: _label("quzheng"), type:"select", source:"pricefilter", class:'width2'},
            ],
            controller: "pricesetting",
            auth: "pricesetting",
            options:{
                dialogWidth:"400px", 
                autoreload:true
            }
        },
        "price":{
            columns: [
                { name: "name", label: _label("mingcheng") },
                { name: "countryid", label: _label("guojiadiqu"), type:"select", source:"country"},
                { name: "pricetype", label: _label("jiageleixing"), type:"select", source:"pricetype"},            
                { name: "currencyid", label: _label("bizhong"), type:"select", source:"currency"},
                { name: "displayindex", label: _label("paixu"), sortMethod:sort_method_digit }
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
                { name: "colortemplateid", label: _label("yanse"), type:"colorselect", source:"colortemplate"},
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
}

const getComponent = function(name) {
    return {
        data: function() {
            return {
                props: props()[name]
            }
        },
        template: '<multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>'
    }
}

const getComponentSimple = function(name) {
    return {
        data: function() {
            return {
                props: props()[name]
            }
        },
        template: '<simple-admin-page v-bind="props" ref="page"></simple-admin-page>'
    }
}

const getProp = function(name) {
    return props()[name]
}

export {getComponentSimple,getComponent, getProp}
export default {getComponentSimple,getComponent}