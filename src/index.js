//import App from './App.vue'
import simple from './component/Simple_Admin_Page.vue'
import multiple from './component/Multiple_Admin_Page.vue'
import multiple_table from './component/Multiple_Admin_TableList.vue'
import simple_table from './component/Simple_Admin_TableList.vue'
import simple_select from './component/Simple_Select.vue'
import select_dialog from './component/Select_Dialog.vue'
import select_dialog_single from './component/Select_Dialog_Single.vue'
import select_currency from './component/Select_Currency.vue'
import avatar from './component/Simple_Avatar.vue'
import album from './component/Simple_Album.vue'
import globals from './component/globals.js'
import Asa_Aliases from './component/asa/Asa_Aliases.vue'
import Asa_BrandTab from './component/asa/Asa_BrandTab.vue'
import Series from './component/asa/Asa_Series.vue'
import Asa_Order_Dialog from './component/asa/Asa_Order_Dialog.vue'
import Asa_Select_Product_Dialog from './component/asa/Asa_Select_Product_Dialog.vue'

const paykeyboard = {
    install(Vue, options) {
        Vue.component(simple.name, simple) // vuePayKeyboard.name 组件的name属性
        Vue.component(multiple.name, multiple) // vuePayKeyboard.name 组件的name属性
        Vue.component(simple_table.name, simple_table) // vuePayKeyboard.name 组件的name属性
        Vue.component(simple_select.name, simple_select) // vuePayKeyboard.name 组件的name属性
        Vue.component(multiple_table.name, multiple_table) // vuePayKeyboard.name 组件的name属性
        Vue.component(select_dialog.name, select_dialog) // vuePayKeyboard.name 组件的name属性
        Vue.component(select_currency.name, select_currency) // vuePayKeyboard.name 组件的name属性
        Vue.component(avatar.name, avatar) // vuePayKeyboard.name 组件的name属性
        Vue.component(select_dialog_single.name, select_dialog_single) // vuePayKeyboard.name 组件的name属性
        Vue.component(album.name, album) // vuePayKeyboard.name 组件的name属性
        Vue.component(Asa_Aliases.name, Asa_Aliases) // vuePayKeyboard.name 组件的name属性
        Vue.component(Asa_BrandTab.name, Asa_BrandTab) // vuePayKeyboard.name 组件的name属性
        Vue.component(Series.name, Series) // vuePayKeyboard.name 组件的name属性
        Vue.component(Asa_Order_Dialog.name, Asa_Order_Dialog) // vuePayKeyboard.name 组件的name属性
        Vue.component(Asa_Select_Product_Dialog.name, Asa_Select_Product_Dialog) // vuePayKeyboard.name 组件的name属性
        
        
        
        Vue.prototype.$asa = globals
        
        // 类似通过 this.$xxx 方式调用插件的 其实只是挂载到原型上而已
        // Vue.prototype.$xxx  // 最终可以在任何地方通过 this.$xxx 调用
        // 虽然没有明确规定用$开头  但是大家都默认遵守这个规定
    }
}
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(paykeyboard);
}
export default paykeyboard // 导出..