const Vue = require('vue')
import {config} from "./component/application.js"
config("host", "http://erp.localhost.com")
console.log(config('host'))

import {getComponentSimple} from './component/prop.js'
import Simple_Admin_Page from './component/Simple_Admin_Page.vue'
import Simple_Admin_TableList from './component/Simple_Admin_TableList.vue'

import Select from './component/item/Select.vue'
import Checkbox from './component/item/checkbox.js'

import Text from './component/label/text.js'
import SelectText from './component/label/select-text.js'

import Auth from './component/Auth.vue'
import Table from './component/table.js'
import Authbutton from './component/authbutton.js'
import Button from './component/button.js'
import Input from './component/item/input.js'
import DataSource from './component/util/DataSource.js'

const components = [
    Simple_Admin_Page,
    Simple_Admin_TableList,
    Select,
    Text,
    SelectText,
    Auth,
    Table,
    Checkbox,
    Button,
    Authbutton, 
    Input
]

components.forEach(component => {
    Vue.component(component.name, component);
});

DataSource.register("country", {url:'/l/country',oplabel:'name', opvalue:'id', model:'country'});
DataSource.register("currency", {url:'/l/currency',oplabel:'code', opvalue:'id'});
//DataSource.register("pricetype", {hashtable:list.pricetype})



const app = new Vue(getComponentSimple("price")).$mount('#app')