//import App from './App.vue'
import Simple_Admin_Page from './component/Simple_Admin_Page.vue'
import Multiple_Admin_Page from './component/Multiple_Admin_Page.vue'
import Multiple_Admin_TableList from './component/Multiple_Admin_TableList.vue'
import Simple_Admin_TableList from './component/Simple_Admin_TableList.vue'
import Simple_Select from './component/Simple_Select.vue'
import Select_Dialog from './component/Select_Dialog.vue'
import Select_Dialog_Single from './component/Select_Dialog_Single.vue'
import Select_Currency from './component/Select_Currency.vue'
import Simple_Avatar from './component/Simple_Avatar.vue'
import Simple_Album from './component/Simple_Album.vue'
import globals from './component/globals.js'
import mixin from './component/mixin.js'
import Asa_Aliases from './component/asa/Asa_Aliases.vue'
import Asa_BrandTab from './component/asa/Asa_BrandTab.vue'
import Asa_Series from './component/asa/Asa_Series.vue'
import Asa_Order_Dialog from './component/asa/Asa_Order_Dialog.vue'
import Asa_Select_Product_Dialog from './component/asa/Asa_Select_Product_Dialog.vue'
import Asa_Sales_Dialog from './component/asa/Asa_Sales_Dialog.vue'
import Simple_Display_Input from './component/Simple_Display_Input.vue'
import Simple_Float_Input from './component/Simple_Float_Input.vue'
import Asa_Order_Confirm_Dialog from './component/asa/Asa_Order_Confirm_Dialog.vue'
import Asa_Select_Order_Detail_Dialog from './component/asa/Asa_Select_Order_Detail_Dialog.vue'
import Asa_Warehousing_Dialog from './component/asa/Asa_Warehousing_Dialog.vue'

import Page_Home from './component/page/Home.vue'
import Page_Order from './component/page/Order.vue'
import Page_Producttemplate from './component/page/Producttemplate.vue'
import Page_User from './component/page/User.vue'
import Page_Group from './component/page/Group.vue'
import Page_Department from './component/page/Department.vue'
import Page_Brand from './component/page/Brand.vue'
import Page_Brandgroup from './component/page/Brandgroup.vue'
import Page_Sizetop from './component/page/Sizetop.vue'
import Page_Product from './component/page/Product.vue'
import Page_Sales from './component/page/Sales.vue'
import Page_Login from './component/page/Login.vue'
import Page_Confirmorder from './component/page/Confirmorder.vue'
import Page_UserModifyPassword from './component/page/UserModifyPassword.vue'
import Page_Warehousing from './component/page/Warehousing.vue'
import Page_Requisition from './component/page/Requisition.vue'

const components = [
    Simple_Admin_Page,
    Multiple_Admin_Page,
    Multiple_Admin_TableList,
    Simple_Admin_TableList,
    Simple_Select,
    Select_Dialog,
    Select_Dialog_Single,
    Select_Currency,
    Simple_Avatar,
    Simple_Album,
    Asa_Aliases,
    Asa_BrandTab,
    Asa_Series,
    Asa_Order_Dialog,
    Asa_Select_Product_Dialog,
    Asa_Sales_Dialog,
    Simple_Display_Input,
    Simple_Float_Input,
    Asa_Order_Confirm_Dialog,
    Asa_Select_Order_Detail_Dialog,
    Asa_Warehousing_Dialog,
    Page_Home,
    Page_Order,
    Page_Producttemplate,
    Page_User,
    Page_Group,
    Page_Department,
    Page_Brand,
    Page_Brandgroup,
    Page_Sizetop,
    Page_Product,
    Page_Sales,
    Page_Login,
    Page_Confirmorder,
    Page_UserModifyPassword,
    Page_Warehousing,
    Page_Requisition
]

const paykeyboard = {
    install(Vue, options) {
        components.forEach(component => {
            Vue.component(component.name, component);
        });

        Vue.mixin(mixin)


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