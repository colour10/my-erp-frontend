import { object, math, array, func, watch, browser, DataSource, vue, fetcher, rule, model } from './component/util/'
import {config,label} from "./component/application.js"

import Simple_Admin_Page from './component/Simple_Admin_Page.vue'
import Simple_Admin_TableList from './component/Simple_Admin_TableList.vue'
import Select from './component/item/Select.vue'
import Input from './component/item/input.js'
import Text from './component/label/text.js'
import SelectText from './component/label/select-text.js'
import Authbutton from './component/authbutton.js'
import Table from './component/table.js'

const components = [
    DataSource,
    Simple_Admin_Page,
    Simple_Admin_TableList,
    Input,
    Select,
    Text,
    SelectText,
    Authbutton,
    Table
]

const init = function(callback, options={}) {
    [
        ['xinjian', '新建'],
        ['shanchu', '删除'],
        ['bianji', '修改'],
        ['chaxun', '查询'],
        ['caozuo', '操作'],
        ['tuichu', '退出'],
        ['baocun', '保存']
    ].forEach(([name,value])=>label(name,value))
        
    return callback({config, label, register:DataSource.register})
}

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
    Vue.SimplePage = {
        config, label, init, object, math, array, func, watch, browser, DataSource, vue, fetcher, rule, model
    }
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
    install,
    DataSource,
    Simple_Admin_Page,
    Simple_Admin_TableList,
    Input,
    Select,
    Text,
    SelectText
}