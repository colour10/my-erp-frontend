const Vue = require('vue')
const VueRouter = require('vue-router') 
const Vuex = require('vuex')

import {getComponentSimple,getComponent} from './component/prop.js'

import mixin from './component/mixin.js'
Vue.mixin(mixin)

if (typeof window !== 'undefined') {
    //console.log("hello")
    if(typeof(window.ASAP)=='undefined') {
        window.ASAP = {}
    }
}

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
import Asa_Product from './component/asa/Asa_Product.vue'
import CheckboxGroup from './component/CheckboxGroup.vue'
import Auth from './component/Auth.vue'
import Orderpayment from './component/orderpayment/index.vue'
import Salesreceive from './component/salesreceive/index.vue'
import Table from './component/table.js'
import Authbutton from './component/authbutton.js'


import Page_Home from './component/page/Home.vue'
import Page_Order from './component/page/Order.vue'
import Page_Producttemplate from './component/page/Producttemplate.vue'
import Page_User from './component/page/User.vue'
import Page_Group from './component/page/Group.vue'
import Page_Department from './component/page/Department.vue'
import Page_Brand from './component/page/Brand.vue'
import Brandgroup from './component/brandgroup/index.vue'
import Sizetop from './component/sizetop/index.vue'
import Product from './component/product/index.vue'
import Page_Sales from './component/page/Sales.vue'
import Page_Login from './component/page/Login.vue'
import Page_Confirmorder from './component/page/Confirmorder.vue'
import Page_UserModifyPassword from './component/page/UserModifyPassword.vue'
import Page_Warehousing from './component/page/Warehousing.vue'
import Page_Requisition from './component/page/Requisition.vue'
import Productstock from './component/productstock/index.vue'
import System from './component/system/index.vue'
import Supplier from './component/supplier/index.vue'

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
    Asa_Product,
    Auth,
    CheckboxGroup,
    Table,
    Authbutton/*,
    Page_Home,
    Page_Order,
    Page_Producttemplate,
    Page_User,
    Page_Group,
    Page_Department,
    Page_Brand,
    Page_Brandgroup,
    Page_Sales,
    Page_Login,
    Page_Confirmorder,
    Page_UserModifyPassword,
    Page_Warehousing*/
]

components.forEach(component => {
    Vue.component(component.name, component);
});

const routes = [
    {
        path: '/', component: Page_Home,
        children:[
            {path: '/order', component: Page_Order},
            {path: '/confirmorder', component: Page_Confirmorder},
            {path:'/warehousing', component:Page_Warehousing},
            {path: '/sales', component: Page_Sales},
            {path: '/user', component: Page_User},
            {path: '/group', component: Page_Group},
            {path: '/department', component: Page_Department},
            {path: '/productstock', component: Productstock},
            {path: '/brand', component: Page_Brand},
            {path: '/brandgroup', component: Brandgroup},
            {path: '/sizetop', component: Sizetop},
            {path: '/product', component: Product},   
            {path: '/requisition', component: Page_Requisition},     
            {path: '/user/modifypassword', component: Page_UserModifyPassword},    
            {path: '/orderpayment', component: Orderpayment},    
            {path: '/salesreceive', component: Salesreceive},   
            {path: '/system', component: System}, 

            {path:'/ageseason', component:getComponentSimple("ageseason")},
            {path:'/ulnarinch', component:getComponent("ulnarinch")},
            {path:'/winterproofing', component:getComponent("winterproofing")},
            {path:'/washinginstructions', component:getComponent("washinginstructions")},
            {path:'/currency', component:getComponent("currency")},
            {path:'/executioncategory', component:getComponent("executioncategory")},
            {path:'/price', component:getComponentSimple("price")},
            {path:'/occasionsstyle', component:getComponent("occasionsstyle")},
            {path:'/productparts', component:getComponent("productparts")},
            {path:'/productinnards', component:getComponent("productinnards")},
            {path:'/warehouse', component:getComponentSimple("warehouse")},
            {path:'/country', component:getComponent("country")},
            {path:'/materialnote', component:getComponent("materialnote")},
            {path:'/materialstatus', component:getComponent("materialstatus")},
            {path:'/material', component:getComponent("material")},
            {path:'/producttemplate', component:Page_Producttemplate},
            {path:'/member', component:getComponentSimple("member")},
            {path:'/colortemplate', component:getComponent("colortemplate")},
            {path:'/supplier', component:Supplier},
            {path:'/saleport', component:getComponentSimple("saleport")},
            {path:'/productmemo', component:getComponent("productmemo")}
        ]
    },
    {path: '/login/:action', component: Page_Login},
    {path: '/login', redirect: { path: '/login/login' }}
]

const router = new VueRouter({
  mode:'history',//default-->hash
    routes // (缩写) 相当于 routes: routes
})

const store = new Vuex.Store({
  state: {
      auth:{}
  },
  getters: {
      is_login(state) {
          var auth = state.auth
          if( auth['id'] && auth['id']>0) {
              return true;
          }
          else {
              return false;
          }
      },
      allow(state) {
          return permission=>{
              return true;
              //return state.auth && state.auth.permissions && state.auth.permissions.findIndex(item=>item.name==permission)>=0
          }
      }
  },
  mutations:{
      login(state,payload) {
          state.auth = payload.auth;
      },
      logout(state,payload) {
          state.auth = {}
      }
  }
})

//console.log(VueRouter)
//console.log("+++++++++++++", VueRouter, router, router.resolve)
const app = new Vue({
    router,
    store,
    mounted:function(){
      //console.log(this.$options.components)
    }
}).$mount('#app')