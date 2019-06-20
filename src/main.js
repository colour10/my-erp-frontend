const Vue = require('vue')
const VueRouter = require('vue-router') 
const Vuex = require('vuex')

import {getComponentSimple,getComponent} from './component/prop.js'

import mixin from './component/mixin.js'
Vue.mixin(mixin)

if (typeof window !== 'undefined') {
    if(typeof(window.ASAP)=='undefined') {
        window.ASAP = {}
    }
}

import Simple_Admin_Page from './component/Simple_Admin_Page.vue'
//import Multiple_Admin_Page from './component/Multiple_Admin_Page.vue'
import Simple_Admin_TableList from './component/Simple_Admin_TableList.vue'
import Simple_Select from './component/Simple_Select.vue'
//import Select_Currency from './component/Select_Currency.vue'
import Simple_Avatar from './component/Simple_Avatar.vue'
import Simple_Album from './component/Simple_Album.vue'
import globals,{config} from './component/globals.js'
//import Asa_BrandTab from './component/asa/Asa_BrandTab.vue'

import Asa_Select_Product_Dialog from './component/asa/Asa_Select_Product_Dialog.vue'
import Asa_Sales_Dialog from './component/asa/Asa_Sales_Dialog.vue'
import Simple_Display_Input from './component/Simple_Display_Input.vue'
import Simple_Float_Input from './component/Simple_Float_Input.vue'
//import Asa_Order_Confirm_Dialog from './component/asa/Asa_Order_Confirm_Dialog.vue'
//import Asa_Select_Order_Detail_Dialog from './component/asa/Asa_Select_Order_Detail_Dialog.vue'
import Asa_Productstock_Search from './component/asa/Asa_Productstock_Search.vue'
//import Asa_Warehousing_Dialog from './component/asa/Asa_Warehousing_Dialog.vue'
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
import Asa_Color_Select from './component/asa/Asa_Color_Select.vue'
import Asa_Sizecontent_Input from './component/asa/Asa_Sizecontent_Input.vue'
import Asa_Sizecontent_Confirm2 from './component/asa/Asa_Sizecontent_Confirm2.vue'
import Asa_Sizecontent_Confirm3 from './component/asa/Asa_Sizecontent_Confirm3.vue'
import Asa_Sizecontent_Confirm4 from './component/asa/Asa_Sizecontent_Confirm4.vue'

import Asa_Order_Tip from './component/asa/Asa_Order_Tip.vue'
import Asa_Product_Tip from './component/asa/Asa_Product_Tip.vue'
import SelectText from './component/select-text.js'
import Dialog from './component/dialog.vue'
import Asa_PriceSetting_Cell from './component/asa/Asa_PriceSetting_Cell.vue'
import Asa_Product_BL from './component/asa/Asa_Product_BL.vue'
import Asa_Product_LSB from './component/asa/Asa_Product_LSB.vue'
import Toggle_Input from './component/toggle-input.vue'

import ImagePreview from './component/image-preview.vue'
import Creator from './component/develop/index.vue'
import Home from './component/home/index.vue'
import Order from       './component/order/index.vue'
import OrderCreate from './component/order/create.vue'
import Orderbrand from       './component/orderbrand/index.vue'
import OrderbrandCreate from './component/orderbrand/create.vue'
import OrderbrandConfirm from './component/orderbrand/confirm.vue'
import User from './component/user/index.vue'
import Group from './component/group/index.vue'
import Department from './component/department/index.vue'
import Brand from './component/brand/index.vue'
import Brandgroup from './component/brandgroup/index.vue'
import Sizetop from './component/sizetop/index.vue'
import Product from './component/product/index.vue'
import Sales from './component/sales/index.vue'
import Login from './component/login/index.vue'
import ModifyPassword from './component/user/modify-password.vue'
import Shipping from './component/shipping/index.vue'
import ShippingDetail from './component/shipping/detail.vue'
import ShippingWarehousing from './component/shipping/warehousing.vue'
import Requisition from './component/requisition/index.vue'
import RequisitionCreate from './component/requisition/create.vue'
import RequisitionUpdate from './component/requisition/update.vue'
import Productstock from './component/productstock/index.vue'
import System from './component/system/index.vue'
import Supplier from './component/supplier/index.vue'
import Exchangerate from './component/exchangerate/index.vue'
import PriceSetting from './component/pricesetting/index.vue'
import SpProductInfo from './component/asa/sp-product-info.vue'
import ProductSearchForm from './component/asa/product-search-form.vue'
//import SelectTable from './component/select-table.vue'

const components = [
    Simple_Admin_Page,
    Multiple_Admin_Page,
    Simple_Admin_TableList,
    Simple_Select,
    //Select_Currency,
    Simple_Avatar,
    Simple_Album,
    Asa_Color_Select,
    Asa_Sizecontent_Input,
    Asa_Order_Tip,
    Asa_Product_Tip,
    Asa_Select_Product_Dialog,
    Asa_Sales_Dialog,
    Simple_Display_Input,
    Simple_Float_Input,
    Asa_Productstock_Search,
    Asa_Product,
    Asa_Brandgroupchild_Select,
    Asa_Product_BL,
    Asa_Product_LSB,
    Auth,
    SelectText,
    CheckboxGroup,
    Table,
    Checkbox,
    Button,
    Authbutton, 
    RadioGroup,
    ImagePreview,
    Dialog,
    PriceSetting,
    Asa_PriceSetting_Cell,
    Toggle_Input,
    SpProductInfo,
    Asa_Sizecontent_Confirm2,
    Asa_Sizecontent_Confirm3,
    Asa_Sizecontent_Confirm4,
    ProductSearchForm
]

components.forEach(component => {
    Vue.component(component.name, component);
});

const routes = [
    {
        path: '/', name:"index", component: Home,
        children:[
            {path: '/order', name:"order", component: Order},
            {path: '/shipping', name:"shipping", component:Shipping},
            {path: '/shipping/:id', name:"shippingdetail", component:ShippingDetail},
            {path: '/shipping/warehousing/:id', name:"shippingwarehousing", component:ShippingWarehousing},
            {path: '/sales', name:"sales", component: Sales},
            {path: '/sales/:id', name:"salesdetail", component: Asa_Sales_Dialog},
            {path: '/user', name:"user", component: User},
            {path: '/group', name:"group", component: Group},
            {path: '/department', name:"department", component: Department},
            {path: '/productstock', name:"productstock", component: Productstock},
            {path: '/brand', name:"brand", component: Brand},
            {path: '/brandgroup', name:"brandgroup", component: Brandgroup},
            {path: '/sizetop', name:"sizetop", component: Sizetop},
            {path: '/product', name:"product", component: Product},   
            {path: '/requisition', name:"requisition", component: Requisition},
            {path: '/requisition/create', name:"requisitioncreate", component: RequisitionCreate},
            {path: '/requisition/edit/:id', name:"requisitionedit", component: RequisitionUpdate},
            {path: '/user/modifypassword', name:"modifypassword", component: ModifyPassword},    
            {path: '/orderpayment', name:"orderpayment", component: Orderpayment},    
            {path: '/salesreceive', name:"salesreceive", component: Salesreceive},   
            {path: '/system', name:"system", component: System}, 
            {path: '/develop', name:"develop", component: Creator}, 
            {path: '/supplier', name:"supplier", component:Supplier},
            {path:'/exchangerate', name:"exchangerate", component:Exchangerate},
            {path: '/order/:id', name:"orderform", component: OrderCreate},
            {path: '/orderbrand', name:"orderbrand", component: Orderbrand},
            {path: '/orderbrand/:ids', name:"orderbrandcreate", component: OrderbrandCreate},
            {path: '/orderbrand/confirm/:id', name:"orderbrandconfirm", component: OrderbrandConfirm},

            {path:'/ageseason', name:"ageseason", component:getComponentSimple("ageseason")},
            {path:'/ulnarinch', name:"ulnarinch", component:getComponent("ulnarinch")},
            {path:'/currency', name:"currency", component:getComponent("currency")},
            //{path:'/pricesetting2', name:"currency", component:getComponentSimple("pricesetting")},
            //{path:'/pricesetting', name:"pricesetting", component:PriceSetting},
            {path:'/price', name:"price", component:getComponentSimple("price")},
            {path:'/warehouse', name:"warehouse", component:getComponentSimple("warehouse")},
            {path:'/country', name:"country", component:getComponent("country")},
            {path:'/materialnote', name:"materialnote", component:getComponent("materialnote")},
            {path:'/materialstatus', name:"materialstatus", component:getComponent("materialstatus")},
            {path:'/material', name:"material", component:getComponent("material")},   
            {path:'/property', name:"property", component:getComponent("property")},           
            {path:'/member', name:"member", component:getComponentSimple("member")},
            {path:'/colortemplate', name:"colortemplate", component:getComponent("colortemplate")},
            
            {path:'/saleport', name:"saleport", component:getComponentSimple("saleport")},
            {path:'/productmemo', name:"productmemo", component:getComponent("productmemo")},
            {path:'/saletype', name:"saletype", component:getComponent("saletype")},
            {path:'/producttype', name:"producttype", component:getComponent("producttype")},
            
            {path:'/language', name:"language", component:getComponent("language")}
        ]
    },
    {path: '/login/:action', name:"login", component: Login},
    {path: '/login', redirect: { path: '/login/login' }}
]

const router = new VueRouter({
  mode:'history',//default-->hash
    routes // (缩写) 相当于 routes: routes
})

router.beforeEach((to, from, next) => {
    //console.log(to, from, next)
    //console.log(store)

    if(to.name=='login') {
        store.commit("clearTags", {})
        //console.log("=====clear")
    }
    else {
        store.commit("addTag", {
            path:to.path,
            label:config().menus[to.name],
            key:to.path,
            name:to.name
      })
    }
    
    next()
})

const store = new Vuex.Store({
  state: {
      auth:{},
      tags:[],
      currentTag:""
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
      },
      getTags(state) {
          return {tags:state.tags, current:state.currentTag}
      }
  },
  mutations:{
      login(state,payload) {
          state.auth = payload.auth;
      },
      logout(state,payload) {
          state.auth = {}
      },
      addTag(state, payload) {
          let tag = state.tags.find(item=>item.key==payload.key)
          if(tag) {
              state.currentTag = tag
          }
          else { 
              state.currentTag = {
                  key:payload.key,
                  label:payload.label,
                  path:payload.path,
                  name:payload.name
              }
              state.tags.push(state.currentTag)
          }            
      },
      clearTags(state, payload){
          state.tags = []
          state.currentTag = undefined
      },
      setTagLabel(state, payload){
          let tag = state.currentTag
          if(tag && tag.path==payload.path) {
              tag.label = payload.label
          }
      },
      closeTag(state, payload) {
          let tags = state.tags;
          let index = tags.indexOf(payload.tag)
          let length = tags.length;
          
          //最后一个窗口不允许关闭
          if(length==1) {
              return 
          }
          //console.log(index)

          tags.splice(index, 1)
          if(index>0) {
              router.push(tags[index-1].path)
          }
          else if(index<length-1) {
              router.push(tags[index].path)
          }  
      }
  }
})

//console.log(VueRouter)
//console.log("+++++++++++++", VueRouter, router, router.resolve)
setTimeout(function(){
    const app = new Vue({
        router,
        store,
        mounted:function(){
        }
    }).$mount('#app')
}, 1000)
