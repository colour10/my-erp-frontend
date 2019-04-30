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
//import Multiple_Admin_Page from './component/Multiple_Admin_Page.vue'
import Simple_Admin_TableList from './component/Simple_Admin_TableList.vue'
import Simple_Select from './component/Simple_Select.vue'
import Select_Currency from './component/Select_Currency.vue'
import Simple_Avatar from './component/Simple_Avatar.vue'
import Simple_Album from './component/Simple_Album.vue'
import globals from './component/globals.js'
//import Asa_BrandTab from './component/asa/Asa_BrandTab.vue'
import Asa_Order_Dialog from './component/asa/Asa_Order_Dialog.vue'
import Asa_Select_Product_Dialog from './component/asa/Asa_Select_Product_Dialog.vue'
import Asa_Sales_Dialog from './component/asa/Asa_Sales_Dialog.vue'
import Simple_Display_Input from './component/Simple_Display_Input.vue'
import Simple_Float_Input from './component/Simple_Float_Input.vue'
import Asa_Order_Confirm_Dialog from './component/asa/Asa_Order_Confirm_Dialog.vue'
import Asa_Select_Order_Detail_Dialog from './component/asa/Asa_Select_Order_Detail_Dialog.vue'
import Asa_Warehousing_Dialog from './component/asa/Asa_Warehousing_Dialog.vue'
import Asa_Product from './component/asa/Asa_Product.vue'
import Asa_Brandgroupchild_Select from './component/asa/Asa_Brandgroupchild_Select.vue'
import CheckboxGroup from './component/CheckboxGroup.vue'
import Auth from './component/Auth.vue'
import Orderpayment from './component/orderpayment/index.vue'
import Salesreceive from './component/salesreceive/index.vue'
import Table from './component/table.js'
import Checkbox from './component/checkbox.js'
import Authbutton from './component/authbutton.js'
import Button from './component/button.js'
import RadioGroup from './component/radio-group.vue'
import Multiple_Admin_Page from './component/multiple_admin_page.js'

import ImagePreview from './component/image-preview.vue'
import Creator from './component/develop/index.vue'
import Home from './component/home/index.vue'
import Order from './component/order/index.vue'
import User from './component/user/index.vue'
import Group from './component/group/index.vue'
import Department from './component/department/index.vue'
import Brand from './component/brand/index.vue'
import Brandgroup from './component/brandgroup/index.vue'
import Sizetop from './component/sizetop/index.vue'
import Product from './component/product/index.vue'
import Sales from './component/sales/index.vue'
import Login from './component/login/index.vue'
import Confirmorder from './component/confirmorder/index.vue'
import ModifyPassword from './component/user/modify-password.vue'
import Warehousing from './component/warehousing/index.vue'
import Requisition from './component/requisition/index.vue'
import Productstock from './component/productstock/index.vue'
import System from './component/system/index.vue'
import Supplier from './component/supplier/index.vue'
import Exchangerate from './component/exchangerate/index.vue'

const components = [
    Simple_Admin_Page,
    Multiple_Admin_Page,
    Simple_Admin_TableList,
    Simple_Select,
    Select_Currency,
    Simple_Avatar,
    Simple_Album,
    //Asa_BrandTab,
    Asa_Order_Dialog,
    Asa_Select_Product_Dialog,
    Asa_Sales_Dialog,
    Simple_Display_Input,
    Simple_Float_Input,
    Asa_Order_Confirm_Dialog,
    Asa_Select_Order_Detail_Dialog,
    Asa_Warehousing_Dialog,
    Asa_Product,
    Asa_Brandgroupchild_Select,
    Auth,
    CheckboxGroup,
    Table,
    Checkbox,
    Button,
    Authbutton, 
    RadioGroup,
    ImagePreview
]

components.forEach(component => {
    Vue.component(component.name, component);
});

const routes = [
    {
        path: '/', component: Home,
        children:[
            {path: '/order', component: Order},
            {path: '/confirmorder', component: Confirmorder},
            {path:'/warehousing', component:Warehousing},
            {path: '/sales', component: Sales},
            {path: '/user', component: User},
            {path: '/group', component: Group},
            {path: '/department', component: Department},
            {path: '/productstock', component: Productstock},
            {path: '/brand', component: Brand},
            {path: '/brandgroup', component: Brandgroup},
            {path: '/sizetop', component: Sizetop},
            {path: '/product', component: Product},   
            {path: '/requisition', component: Requisition},     
            {path: '/user/modifypassword', component: ModifyPassword},    
            {path: '/orderpayment', component: Orderpayment},    
            {path: '/salesreceive', component: Salesreceive},   
            {path: '/system', component: System}, 
            {path: '/develop', component: Creator}, 

            {path:'/ageseason', component:getComponentSimple("ageseason")},
            {path:'/ulnarinch', component:getComponent("ulnarinch")},
            {path:'/currency', component:getComponent("currency")},
            {path:'/pricesetting', component:getComponentSimple("pricesetting")},
            {path:'/price', component:getComponentSimple("price")},
            {path:'/warehouse', component:getComponentSimple("warehouse")},
            {path:'/country', component:getComponent("country")},
            {path:'/materialnote', component:getComponent("materialnote")},
            {path:'/materialstatus', component:getComponent("materialstatus")},
            {path:'/material', component:getComponent("material")},           
            {path:'/member', component:getComponentSimple("member")},
            {path:'/colortemplate', component:getComponent("colortemplate")},
            {path:'/supplier', component:Supplier},
            {path:'/saleport', component:getComponentSimple("saleport")},
            {path:'/productmemo', component:getComponent("productmemo")},
            {path:'/saletype', component:getComponent("saletype")},
            {path:'/exchangerate', component:Exchangerate},
            {path:'/materialnote', component:getComponent("materialnote")}
        ]
    },
    {path: '/login/:action', component: Login},
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