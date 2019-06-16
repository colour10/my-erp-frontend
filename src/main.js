const Vue = require('vue')
import {config,label} from "./component/application.js"
config("host", "http://erp.localhost.com")
//console.log(config('host'))

import Simple_Admin_Page from './component/Simple_Admin_Page.vue'
import Simple_Admin_TableList from './component/Simple_Admin_TableList.vue'

import Select from './component/item/select.vue'
import Checkbox from './component/item/checkbox.js'

import Text from './component/label/text.js'
import SelectText from './component/label/select-text.js'
import DateText from './component/label/date.js'
import DateTimeText from './component/label/datetime.js'

import Table from './component/table.js'
import Authbutton from './component/authbutton.js'
import Input from './component/item/input.js'
import Time from './component/item/time.vue'
import DateTime from './component/item/datetime.vue'

import { DataSource, vue, func } from './component/util/'


const components = [
    Simple_Admin_Page,
    Simple_Admin_TableList,
    Select,
    Text,
    DateText,
    DateTimeText,
    SelectText,
    Table,
    Checkbox,
    Authbutton, 
    Input,
    Time,
    DateTime
]

components.forEach(component => {
    Vue.component(component.name, component);
});

DataSource.register("country", {url:'/l/country',labelName:'name_cn', valueName:'id', model:'country'});
DataSource.register("currency", {url:'/l/currency',labelName:'code', valueName:'id'});
//DataSource.register("pricetype", {hashtable:list.pricetype})
label('bianji', "编辑")
label('shanchu', "删除")


const props = {
    columns: [
        { name: "name", label: label("mingcheng"), type:"sp-input", listType:'sp-text' },
        { name: "countryid", label: label("guojiadiqu"), type:"sp-select", source:"country", listType:"sp-select-text"},
        //{ name: "pricetype", label: label("jiageleixing"), type:"sp-select", source:"pricetype", listType:"sp-select-text"},            
        { name: "currencyid", label: label("bizhong"), type:"sp-select", source:"currency", listType:"sp-select-text"},
        { name: "displayindex", label: label("paixu"), type:"sp-input", sortMethod:func.sortDigit },
        { name: "pricetype", label: label("jiageleixing"), type:"sp-time", listType:"sp-text"}
    ],
    buttons:[
        { name:"delall", label:"批量删除",click:function(context){
            console.log(context)
            context.table.loadList()
        }}
    ],
    controller: "price",
    auth: "price",
    options:{
        dialogWidth:"400px", 
        autoreload:true
    },
    isShow:function({action, row}){
        if(action=='search') {
            return false;
        }
        return true
    }
}

const app = new Vue(vue.getComponent(props)).$mount('#app')