const options = {};

if(typeof($ASAL)=='undefined') {
    $ASAL = {}   
}

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
options["brand"] = {url:'/l/brand',oplabel:'name', opvalue:'id'}

//国家及地区
options["country"] = {url:'/l/country',oplabel:'name', opvalue:'id'}

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
options["childproductgroup"] = {url:'/l/childproductgroup',oplabel:'name', opvalue:'id'}

//材质状态
options["materialstatus"] = {url:'/l/materialstatus',oplabel:'name', opvalue:'id'}

//场合风格
options["occasionsstyle"] = {url:'/l/occasionsstyle',oplabel:'name', opvalue:'id'}

//尺寸
options["ulnarinch"] = {url:'/l/ulnarinch',oplabel:'name', opvalue:'id'}

//年代
options["ageseason"] = {url:'/l/ageseason',oplabel:'fullname', opvalue:'id'}

//别名
options["aliases"] = {url:'/l/aliases',oplabel:'name', opvalue:'id'}

//防寒指数
options["winterproofing"] = {url:'/l/winterproofing',oplabel:'name', opvalue:'id'}

//尺码组
options["sizetop"] = {url:'/l/sizetop',oplabel:'name', opvalue:'id'}

//尺码组明细
options["sizecontent"] = {url:'/l/sizecontent',oplabel:'content', opvalue:'id'}

//成员
options["member"] = {url:'/l/member',oplabel:'name', opvalue:'id'}

//执行标准
options["executioncategory"] = {url:'/l/executioncategory',oplabel:'name', opvalue:'id'}

//安全类别
options["securitycategory"] = {url:'/l/securitycategory',oplabel:'name', opvalue:'id'}

//闭合方式
options["closedway"] = {url:'/l/closedway',oplabel:'name', opvalue:'id'}


//仓库
options["warehouse"] = {url:'/l/warehouse',oplabel:'name', opvalue:'id'}

//供货商 发货单位
options["supplier"] = {url:'/l/supplier',oplabel:'suppliername', opvalue:'id'}
options["saleport"] = {url:'/l/saleport',oplabel:'name', opvalue:'id'}
options["usersaleport"] = {url:'/user/saleportlist',oplabel:'name', opvalue:'id'}
options["userwarehouse"] = {url:'/warehouse/userlist',oplabel:'name', opvalue:'id'}

options["gender"] = {hashtable:$ASAL.list_gender}
options["gender2"] = {hashtable:$ASAL.list_gender2}
options["currency"] = {hashlist:$ASAL.list_currency,oplabel:'name', opvalue:'id'}
options["season"] = {hashtable:$ASAL.list_season}
options["orderproperty"] = {hashtable:$ASAL.list_orderproperty}
options["bussinesstype"] = {hashlist:$ASAL.list_bussinesstype,oplabel:'name', opvalue:'id'}
options["sessionmark"] = {hashtable:{"SS":"SS","FW":"FW","XX":"XX"}}
options["seasontype"] = {hashtable:{"0":"Pre","1":"Main","2":"Fashion"}}


options["formtype"] = {hashtable:$ASAL.list_formtype}
options["languages"] = {hashlist:$ASAL.list_languages,oplabel:'name', opvalue:'code'}

//提货方式
options["pickingtype"] = {hashtable:$ASAL.list_pickingtype}

//快递付款类型
options["expresspaidtype"] =  {hashtable:$ASAL.list_expresspaidtype}

//运输方式
options["transporttype"] =  {hashtable:$ASAL.list_transporttype}

//支付方式
options["paytype"] =  {hashtable:$ASAL.list_paytype}


//销售单状态
options["salestatus"] =  {hashtable:$ASAL.list_salestatus}

//订单状态
options["orderstatus"] =  {hashtable:$ASAL.list_ordertatus}

//发货单状态
options["confirmstatusstatus"] =  {hashtable:$ASAL.list_confirmstatusstatus}

//调拨类型
options["requisitiontype"] =  {hashtable:$ASAL.list_requisitiontype}

//调拨单状态
options["requisitionstatus"] =  {hashtable:$ASAL.list_requisitionstatus}

//仓库角色
options["warehouserole"] =  {hashtable:$ASAL.list_warehouserole}

export default options
