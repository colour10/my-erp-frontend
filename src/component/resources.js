import {_label, StringFunc} from "./globals.js"

function getOption(name) {
    let list = _label("list")
    let options = {};

    options["test.hashtable"] = {
        hashtable: {"SS": "春夏", "FW": "秋冬", "XX": "经典"}
    }

    options["test.hashlist"] = {
        hashlist: {
            "SS": {tname: "春夏", tvalue: "SS"},
            "FW": {tname: "秋冬", tvalue: "FW"},
            "XX": {tname: "经典", tvalue: "XX"}
        },
        oplabel: "tname",
        opvalue: "tvalue"
    }

    options["test.datalist"] = {
        datalist: [{tname: "春夏", tvalue: "SS"}, {tname: "秋冬", tvalue: "FW"}, {tname: "经典", tvalue: "XX"}],
        oplabel: "tname",
        opvalue: "tvalue"
    }

    //品牌
    options["brand"] = {url: '/l/brand', oplabel: 'name_en', opvalue: 'id'}

    //国家及地区
    options["country"] = {
        url: '/l/country', oplabel: 'name', opvalue: 'id', model: 'country', optionName: function () {
            return this.name + ' ' + StringFunc.default(this.row.name_en)
        }
    }

    //颜色模板
    options["colortemplate"] = {url: '/l/colortemplate', oplabel: 'name', opvalue: 'id'}

    //品牌分类
    options["brandgroup"] = {url: '/l/brandgroup', oplabel: 'name', opvalue: 'id'}

    //用户组
    options["group"] = {url: '/group/currentlist', oplabel: 'group_name', opvalue: 'id'}

    //用户
    options["user"] = {url: '/l/user', oplabel: 'login_name', opvalue: 'id'}

    //当前公司下的所有用户
    options["currentUsers"] = {
        url: '/company/users',
        oplabel: 'login_name',
        opvalue: 'id'
    }

    //部门列表
    options["department.single"] = {url: '/department/single', oplabel: 'label', opvalue: 'id'}

    //品牌子类
    options["brandgroupchild"] = {url: '/l/brandgroupchild', oplabel: 'name', opvalue: 'id', parent: 'brandgroupid'}

    //尺寸
    options["ulnarinch"] = {
        url: '/l/ulnarinch', oplabel: 'name', opvalue: 'id', parent: 'brandgroupchildid', optionName: function () {
            //console.log(this, typeof(this.row.name_en), this.row.name_en)
            return this.name + ' ' + StringFunc.default(this.row.name_en)
        }
    };

    //年代
    options["ageseason"] = {url: '/l/ageseason', oplabel: 'fullname', opvalue: 'id'}

    //别名
    options["aliases"] = {url: '/l/aliases', oplabel: 'name', opvalue: 'id'}

    //材质
    options["material"] = {
        url: '/l/material', oplabel: 'name', opvalue: 'id', optionName: function () {
            //console.log(this, typeof(this.row.name_en), this.row.name_en)
            return this.name + ' ' + StringFunc.default(this.row.name_en)
        }
    }

    //材质备注
    options["materialnote"] = {url: '/l/materialnote', oplabel: 'content', opvalue: 'id', parent: 'brandgroupid'}

    //尺码组
    options["sizetop"] = {url: '/l/sizetop', oplabel: 'name', opvalue: 'id'}

    //尺码组明细
    options["sizecontent"] = {url: '/l/sizecontent', oplabel: 'name', opvalue: 'id', parent: 'topid'}

    //商品描述
    options["productmemo"] = {
        url: '/l/productmemo', oplabel: 'name', opvalue: 'id', parent: 'brandgroupchildid', optionName: function () {
            //console.log(this, typeof(this.row.name_en), this.row.name_en)
            return this.name + ' ' + StringFunc.default(this.row.name_en)
        }
    }

    //商品系列
    options["series"] = {url: '/l/series', oplabel: 'name_en', opvalue: 'id', parent: 'brandid'}

    //商品子系列
    options["series2"] = {url: '/l/series2', oplabel: 'name', opvalue: 'id'}

    //销售属性
    options["saletype"] = {url: '/l/saletype', oplabel: 'name', opvalue: 'id'}

    //商品属性
    options["producttype"] = {url: '/l/producttype', oplabel: 'name', opvalue: 'id'}

    //成员
    options["member"] = {url: '/l/member', oplabel: 'name', opvalue: 'id'}

    //价格定义
    options["price"] = {url: '/l/price', oplabel: 'name', opvalue: 'id'}

    //属性定义
    options["property"] = {url: '/l/property', oplabel: 'name', opvalue: 'id'}

    //所有仓库
    options["warehouse"] = {url: '/l/warehouse', oplabel: 'name', opvalue: 'id'}

    //当前公司的所有仓库列表
    options["warehouses"] = {
        url: '/company/warehouses',
        oplabel: 'name',
        opvalue: 'id'
    }

    //当前公司的所有销售端口列表
    options["saleports"] = {
        url: '/company/saleports',
        oplabel: 'name',
        opvalue: 'id'
    }

    //用户价格
    options["userprice"] = {url: '/l/userprice', oplabel: 'name', opvalue: 'priceid'}

    //供货商 发货单位
    options["supplier"] = {url: '/l/supplier', oplabel: 'suppliercode', opvalue: 'id'}
    options["saleport"] = {url: '/l/saleport', oplabel: 'name', opvalue: 'id'}
    options["usersaleport"] = {url: '/user/saleportlist', oplabel: 'name', opvalue: 'id'}
    options["userwarehouse"] = {url: '/warehouse/userlist', oplabel: 'name', opvalue: 'id'}
    options["supplierlinkman"] = {url: '/l/supplierlinkman', oplabel: 'name', opvalue: 'id', parent: "supplierid"}
    options["winterproofing"] = {url: '/l/winterproofing', oplabel: 'name', opvalue: 'id'}
    options["feename"] = {url: '/l/feename', oplabel: 'name', opvalue: 'id'}
    options["paymentway"] = {url: '/l/paymentway', oplabel: 'name', opvalue: 'id'}
    options["customsunit"] = {url: '/l/customsunit', oplabel: 'name', opvalue: 'id'}
    options["customswrap"] = {url: '/l/customswrap', oplabel: 'name', opvalue: 'id'}

    options["gender"] = {hashtable: list.gender}
    options["gender2"] = {hashtable: list.gender2}
    options["currency"] = {url: '/l/currency', oplabel: 'code', opvalue: 'id'}
    options["season"] = {hashtable: list.season}
    options["orderproperty"] = {hashtable: list.orderproperty}
    options["bussinesstype"] = {hashtable: list.bussinesstype}
    options["sessionmark"] = {hashtable: {"SS": "SS", "FW": "FW", "XX": "XX"}}
    options["seasontype"] = {hashtable: {"3": "Pre", "1": "Main", "2": "Fashion"}}


    options["formtype"] = {hashtable: list.formtype}
    options["languages"] = {hashlist: _label('languages'), oplabel: 'name', opvalue: 'code'}

    //提货方式
    options["pickingtype"] = {hashtable: list.pickingtype}

    //快递付款类型
    options["expresspaidtype"] = {hashtable: list.expresspaidtype}

    //运输方式
    options["transporttype"] = {hashtable: list.transporttype}

    //支付方式
    options["paytype"] = {hashtable: list.paytype}


    //销售单状态
    options["salestatus"] = {hashtable: list.salestatus}

    //订单状态
    options["orderstatus"] = {hashtable: list.ordertatus}

    //品牌状态
    options["orderbrandstatus"] = {hashtable: list.orderbrandstatus}

    //调拨类型
    options["requisitiontype"] = {hashtable: list.requisitiontype}

    //调拨单状态
    options["requisitionstatus"] = {hashtable: list.requisitionstatus}

    //仓库角色
    options["warehouserole"] = {hashtable: list.warehouserole}

    //客户类型
    options["suppliertype"] = {hashtable: list.suppliertype}

    //付款类型
    options["paymenttype"] = {hashtable: list.paymenttype}

    //价格类型
    options["pricetype"] = {hashtable: list.pricetype}

    //价格取整规则
    options["pricefilter"] = {hashtable: list.pricefilter}

    //残次品等级
    options["defectivelevel"] = {hashtable: list.defectivelevel}

    //客户类型
    options["customtype"] = {hashtable: list.customtype}

    //发货单状态
    options["shippingstatus"] = {hashtable: list.shippingstatus}

    //费用摊销方式
    options["amortizetype"] = {hashtable: list.amortizetype}

    //销售单状态
    options["salestatus"] = {hashtable: list.salestatus}

    //对账单的收/付费
    options["billtype"] = {hashtable: list.billtype}

    //对账单的回款状态
    options["billstatus"] = {hashtable: list.billstatus}

    //OMS上新，
    options["publishtype"] = {hashtable: list.publishtype}

    //OMS上新，贸易类型
    options["tradetype"] = {hashtable: list.tradetype}

    //OMS上新，上传类别
    options["uploadtype"] = {hashtable: list.uploadtype}

    //客户列表
    options["supplier_2"] = {
        callback: function (DataSource) {
            return DataSource.getDataSource("supplier", _label('lang')).filter(item => {
                return StringFunc.include(item.row.suppliertype, '2') || StringFunc.include(item.row.suppliertype, '5')
            })
        },
        dependencies: ['supplier']
    }

    //当前公司下的所有客户列表
    options["current_customer_2"] = {
      url: '/company/customers',
      oplabel: 'suppliercode',
      opvalue: 'id'
    }

    //当前公司下的所有供应商列表
    options["current_supplier_2"] = {
      url: '/company/suppliers',
      oplabel: 'suppliercode',
      opvalue: 'id'
    }

    //当前公司下的所有承运商列表
    options["current_shipper_2"] = {
      url: '/company/shippers',
      oplabel: 'suppliercode',
      opvalue: 'id'
    }

    //供货商
    options["supplier_3"] = {
        callback: function (DataSource) {
            return DataSource.getDataSource("supplier", _label('lang')).filter(item => {
                return StringFunc.include(item.row.suppliertype, '4') || StringFunc.include(item.row.suppliertype, '5')
            })
        },
        dependencies: ['supplier']
    }

    //供货商
    options["season2"] = {
        callback: function (DataSource) {
            return DataSource.getDataSource("season", _label('lang')).filter(item => {
                return item.id < 5
            })
        },
        dependencies: ['supplier']
    }


    return options[name]
}


export default getOption
