import {getLabel, getAvailableHeight} from "./globals.js"
const _label = getLabel

const props = {
    "ageseason": {
        columns: [{
            name: "sessionmark",
            label: _label("fabuji"),
            is_hide: true,
            type: 'select',
            source: "sessionmark"
        }, {
            name: "name",
            label: _label("nianfen"),
            is_focus: true,
            convert: function(row, rowIndex, column) {
                return row.sessionmark + row.name
            }
        }],
        controller: "ageseason"
    },

    "ulnarinch": {
        columns: [{
            name: "name",
            label: _label("chima"),
            is_multiple: true,
            is_focus: true
        }],
        controller: "ulnarinch",
        key_column: "name"
    },

    "productparts": {
        columns: [{
            name: "name",
            label: _label("peijianmingcheng"),
            is_multiple: true,
            is_focus: true
        }, {
            name: "partscode",
            label: _label("peijiandaima")
        }, {
            name: "packflag",
            label: _label("shifoubaozhuang"),
            type: "switch"
        }],
        controller: "productparts",
        key_column: "name"
    },

    "productinnards": {
        columns: [{
            name: "name",
            label: _label("jiegoumingcheng"),
            is_multiple: true,
            is_focus: true
        }],
        controller: "productinnards",
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
            name: "name_en",
            label: _label("guojiamingcheng")+'['+_label("en")+"]",
            is_edit_hide:true
        },{
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
        columns: [{
            name: "code",
            label: _label("caizhidaima"),
            is_focus: true
        }, {
            name: "name",
            label: _label("caizhimingcheng"),
            is_multiple: true,
            is_focus: true
        }],
        controller: "material",
        key_column: "name"
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
                type: "upload",
                multiple: false,
                limit: 1,
                is_image: true,
                image_width: 60,
                image_height: 60
            }
        ],
        controller: "colortemplate",
        key_column: "name"
    },

    "productmemo": {
        columns: [{
                name: "name",
                label: _label("mingcheng"),
                is_multiple: true,
                is_focus: true
            }
        ],
        controller: "productmemo",
        key_column: "name"
    },

    "supplier": {
        columns: [{
            name: "nickname",
            label: _label("nicheng"),
            class: "width2"
        },
        {
            name: "suppliercode",
            label: _label("bianma"),
            class: "width2"
        }, {
            name: "suppliertype",
            label: _label("leixing"),
            class: "width2",
            type:"select",
            source:"suppliertype"
        }, {
            name: "countrycity",
            label: _label("guojiachengshi"),
            class: "width2",
            type: "select",
            source: "country"
        }, {
            name: "suppliername",
            label: _label("mingcheng"),
            class: "width1"
        }, {
            name: "address",
            label: _label("dizhi"),
            class: "width1",
            is_hide: true
        }, {
            name: "englishname",
            label: _label("yingwenmingcheng"),
            class: "width1",
            is_hide: true
        }, {
            name: "website",
            label: _label("wangzhi"),
            class: "width2",
            is_hide: true
        }, {
            name: "fax",
            label: _label("chuanzhen"),
            class: "width2",
            is_hide: true
        }, {
            name: "legal",
            label: _label("faren"),
            class: "width2",
            is_hide: true
        }, {
            name: "registeredcapital",
            label: _label("zhuceziben"),
            class: "width2",
            is_hide: true
        }, {
            name: "businesslicense",
            label: _label("yingyezhizhaohao"),
            class: "width2",
            is_hide: true
        }, {
            name: "heading",
            label: _label("shuihao"),
            class: "width2",
            is_hide: true
        }, {
            name: "qq",
            label: _label("qq"),
            class: "width2",
            is_hide: true
        }, {
            name: "weixin",
            label: _label("weixin"),
            class: "width2",
            is_hide: true
        }, {
            name: "alipay",
            label: _label("alipay"),
            class: "width2",
            is_hide: true
        }, {
            name: "phone",
            label: _label("dianhua"),
            class: "width2"
        }, {
            name: "memo",
            label: _label("beizhu"),
            class: "width1",
            is_hide: true,
            type: "textarea"
        }],
        options: {
            dialogWidth: '700px',
            formSize: 'small',
            inline: true
        },
        controller: "supplier"
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
    "supplierinvoice":{
        columns: [
            { name: "name", label: _label("mingcheng"), class: "width1"},
            { name: "telephone", label: _label("dianhua"), class: "width1"},
            { name: "address", label: _label("dizhi"), class: "width1", is_hide: true }, 
            { name: "bank", label: _label("kaihuhang"), class: "width1" }, 
            { name: "bank_account", label: _label("yinhangzhanghao"), class: "width1" }
        ],
        controller: "supplierinvoice",
        auth: "supplier",
        base:{
          supplierid:''
        },
        options:{
            dialogWidth:'800px'
        }
    },
    "supplierbank":{
        columns: [
            { name: "name", label: _label("mingcheng"), class: "width2"},
            { name: "currency", label: _label("bizhong"), class: "width2", type:"select", source:"currency"},
            { name: "address", label: _label("dizhi"), class: "width1", is_hide: true }, 
            { name: "bank_name", label: _label("yinhangmingcheng"), class: "width1" }, 
            { name: "bank_depart", label: _label("fenhangmingcheng"), class: "width1", is_hide: true },
            { name: "bank_address", label: _label("yinhangdizhi"), class: "width1", is_hide: true }, 
            { name: "account", label: _label("yinhangzhanghao"), class: "width2"},
            { name: "bank_code", label: _label("guojima"), class: "width2"},
        ],
        controller: "supplierbank",
        auth: "supplier",
        base:{
          supplierid:''
        },
        options:{
            dialogWidth:'800px',
            inline:true
        }
    },
    "pricesetting":{
        columns: [
            { name: "priceid", label: _label("jiagemingcheng"), type:"select", source:"price"},
            { name: "brandid", label: _label("pinpai"), type:"select", source:"brand"},
            { name: "brandgroupid", label: _label("pinlei"), type:"select", source:"brandgroup", trigger:"brandgroupchildid"},
            { name: "brandgroupchildid", label: _label("zipinlei"), type:"select", source:"brandgroupchild"},
            { name: "ageseasonid", label: _label("niandai"), type:"select", source:"ageseason"},
            { name: "seriesid", label: _label("xilie"), type:"select", source:"series"},
            { name: "discount", label: _label("xishu") }
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
            { name: "countryid", label: _label("guojiadiqu"), type:"select", source:"country"},
            { name: "pricetype", label: _label("jiageleixing"), type:"select", source:"pricetype"},            
            { name: "currencyid", label: _label("bizhong"), type:"select", source:"currency"}
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
            { name: "color", label: _label("yanse")}
        ],
        controller: "saletype",
        auth: "saletype",
        options:{
            dialogWidth:"400px", 
            autoreload:true
        },
        key_column: "name"
    },
    "exchangerate":{
        columns: [
            { name: "currency_from", label: _label("huichuhuobi"), type:"select", source:"currency"},
            { name: "currency_to", label: _label("huiruhuobi"), type:"select", source:"currency"},
            { name: "rate", label: _label("huilv")}
        ],
        controller: "exchangerate",
        auth: "exchangerate",
        options:{
            dialogWidth:"400px", 
            autoreload:true
        }
    },
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
        template: '<simple-admin-page v-bind="props" ref="page"></simple-admin-page>'
    }
}

const getProp = function(name) {
    return props[name]
}

export {getComponentSimple,getComponent, getProp}
export default {getComponentSimple,getComponent}