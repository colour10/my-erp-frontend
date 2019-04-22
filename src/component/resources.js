import {getLabel} from "./globals.js"
const _label = getLabel
const list = _label("list")
const options = {};

options["test.hashtable"] = {
    hashtable:{"SS":"春夏","FW":"秋冬","XX":"经典"}       
}

options["test.hashlist"] = {
    hashlist:{"SS":{tname:"春夏",tvalue:"SS"}, "FW":{tname:"秋冬",tvalue:"FW"}, "XX":{tname:"经典",tvalue:"XX"}},
    oplabel:"tname",
    opvalue:"tvalue" 
}

options["test.datalist"] = {
    datalist:[{tname:"春夏",tvalue:"SS"}, {tname:"秋冬",tvalue:"FW"}, {tname:"经典",tvalue:"XX"}],
    oplabel:"tname",
    opvalue:"tvalue" 
}
//币种
//options["currency"] = {url:'http://erp.localhost.com/common/currency',oplabel:'name', opvalue:'code'}

//品牌
options["brand"] = {url:'/l/brand',oplabel:'name_en', opvalue:'id'}

//国家及地区
options["country"] = {url:'/l/country',oplabel:'name', opvalue:'id', model:'country'}

//颜色模板
options["colortemplate"] = {url:'/l/colortemplate',oplabel:'name', opvalue:'id'}

//品牌分类
options["brandgroup"] = {url:'/l/brandgroup',oplabel:'name', opvalue:'id'}

//用户组
options["group"] = {url:'/l/group',oplabel:'group_name', opvalue:'id'}

//用户
options["user"] = {url:'/l/user',oplabel:'login_name', opvalue:'id'}

//部门列表
options["department.single"] = {url:'/department/single',oplabel:'label', opvalue:'id'}

//品牌子类
options["brandgroupchild"] = {url:'/l/brandgroupchild',oplabel:'name', opvalue:'id', parent:'brandgroupid'}

//尺寸
options["ulnarinch"] = {url:'/l/ulnarinch',oplabel:'name', opvalue:'id'}

//年代
options["ageseason"] = {url:'/l/ageseason',oplabel:'fullname', opvalue:'id'}

//别名
options["aliases"] = {url:'/l/aliases',oplabel:'name', opvalue:'id'}

//尺码组
options["sizetop"] = {url:'/l/sizetop',oplabel:'name', opvalue:'id'}

//尺码组明细
options["sizecontent"] = {url:'/l/sizecontent',oplabel:'name', opvalue:'id'}

//商品描述
options["productmemo"] = {url:'/l/productmemo',oplabel:'name', opvalue:'id'}

//商品系列
options["series"] = {url:'/l/series',oplabel:'name', opvalue:'id'}

//商品子系列
options["series2"] = {url:'/l/series2',oplabel:'name', opvalue:'id'}
//成员
options["member"] = {url:'/l/member',oplabel:'name', opvalue:'id'}

//价格定义
options["price"] = {url:'/l/price',oplabel:'name', opvalue:'id'}

//仓库
options["warehouse"] = {url:'/l/warehouse',oplabel:'name', opvalue:'id'}

//供货商 发货单位
options["supplier"] = {url:'/l/supplier',oplabel:'suppliername', opvalue:'id'}
options["saleport"] = {url:'/l/saleport',oplabel:'name', opvalue:'id'}
options["usersaleport"] = {url:'/user/saleportlist',oplabel:'name', opvalue:'id'}
options["userwarehouse"] = {url:'/warehouse/userlist',oplabel:'name', opvalue:'id'}

options["gender"] = {hashtable:list.gender}
options["gender2"] = {hashtable:list.gender2}
options["currency"] = {url:'/l/currency',oplabel:'code', opvalue:'id'}
options["season"] = {hashtable:list.season}
options["orderproperty"] = {hashtable:list.orderproperty}
options["bussinesstype"] = {hashlist:list.bussinesstype,oplabel:'name', opvalue:'id'}
options["sessionmark"] = {hashtable:{"SS":"SS","FW":"FW","XX":"XX"}}
options["seasontype"] = {hashtable:{"0":"Pre","1":"Main","2":"Fashion"}}


options["formtype"] = {hashtable:list.formtype}
options["languages"] = {hashlist:_label('languages'),oplabel:'name', opvalue:'code'}

//提货方式
options["pickingtype"] = {hashtable:list.pickingtype}

//快递付款类型
options["expresspaidtype"] =  {hashtable:list.expresspaidtype}

//运输方式
options["transporttype"] =  {hashtable:list.transporttype}

//支付方式
options["paytype"] =  {hashtable:list.paytype}


//销售单状态
options["salestatus"] =  {hashtable:list.salestatus}

//订单状态
options["orderstatus"] =  {hashtable:list.ordertatus}

//发货单状态
options["confirmstatusstatus"] =  {hashtable:list.confirmstatusstatus}

//调拨类型
options["requisitiontype"] =  {hashtable:list.requisitiontype}

//调拨单状态
options["requisitionstatus"] =  {hashtable:list.requisitionstatus}

//仓库角色
options["warehouserole"] =  {hashtable:list.warehouserole}

//客户类型
options["suppliertype"] =  {hashtable:list.suppliertype}

//付款类型
options["paymenttype"] =  {hashtable:list.paymenttype}

//价格类型
options["pricetype"] =  {hashtable:list.pricetype}

//价格取整规则
options["pricefilter"] =  {hashtable:list.pricefilter}


export default options
