import {getLabel} from "./globals.js"
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
            name: "code",
            label: _label("guojiadaima")
        }, {
            name: "localcurrency",
            label: _label("bizhong"),
            type: 'select',
            source: "currency"
        }],
        controller: "country",
        key_column: "name"
    },

    "materialnote": {
        columns: [{
            name: "content",
            label: _label("caizhibeizhu"),
            is_multiple: true,
            is_focus: true
        }],
        controller: "materialnote",
        key_column: "content"
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
        }, {
            name: "englishname",
            label: _label("yingwenmingcheng")
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
        template: '<simple-admin-page v-bind="props" ref="page"></simple-admin-page>'
    }
}

const getProp = function(name) {
    return props[name]
}

export {getComponentSimple,getComponent, getProp}
export default {getComponentSimple,getComponent}