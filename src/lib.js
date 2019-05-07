import DataSource from './component/DataSource.js'
import Simple_Admin_Page from './component/Simple_Admin_Page.vue'
import Simple_Admin_TableList from './component/Simple_Admin_TableList.vue'
import Select from './component/item/Select.vue'
import Input from './component/item/input.js'
import Text from './component/label/text.js'
import SelectText from './component/label/select-text.js'

const components = [
    DataSource,
    Simple_Admin_Page,
    Simple_Admin_TableList,
    Input,
    Select,
    Text,
    SelectText
]

const install = function(Vue, opts = {}) {
    components.forEach(component => {
        Vue.component(component.name, component);
    });
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