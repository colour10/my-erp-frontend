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
options["brand"] = {url:'/brand/list',oplabel:'name', opvalue:'id'}

//国家及地区
options["country"] = {url:'/country/list',oplabel:'name', opvalue:'id'}

//颜色模板
options["colortemplate"] = {url:'/colortemplate/list',oplabel:'name', opvalue:'id'}

//品牌分类
options["brandgroup"] = {url:'/brandgroup/list',oplabel:'name', opvalue:'id'}

//用户组
options["group"] = {url:'/group/list',oplabel:'group_name', opvalue:'id'}

//部门列表
options["department.single"] = {url:'/department/single',oplabel:'label', opvalue:'id'}

//品牌子类
options["childproductgroup"] = {url:'/childproductgroup/list',oplabel:'name', opvalue:'id'}

//材质状态
options["materialstatus"] = {url:'/materialstatus/list',oplabel:'name', opvalue:'id'}

//场合风格
options["occasionsstyle"] = {url:'/occasionsstyle/list',oplabel:'name', opvalue:'id'}

//尺寸
options["ulnarinch"] = {url:'/ulnarinch/list',oplabel:'name', opvalue:'id'}

//年代
options["ageseason"] = {url:'/ageseason/list',oplabel:'fullname', opvalue:'id'}

//别名
options["aliases"] = {url:'/aliases/list',oplabel:'name', opvalue:'id'}

//防寒指数
options["winterproofing"] = {url:'/winterproofing/list',oplabel:'name', opvalue:'id'}

//尺码组
options["sizetop"] = {url:'/sizetop/list',oplabel:'name', opvalue:'id'}

options["gender"] = {hashtable:$ASAL.list_gender}
options["currency"] = {hashtable:$ASAL.list_currency}
options["season"] = {hashtable:$ASAL.list_season}
options["sessionmark"] = {hashtable:{"SS":"SS","FW":"FW","XX":"XX"}}
options["languages"] = {hashlist:$ASAL.list_languages,oplabel:'name', opvalue:'code'}
//options["materialstatus"] = 
//options["materialstatus"] = 


export default options
