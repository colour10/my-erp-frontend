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
import Select from './component/item/Select.vue'

import Text from './component/label/text.js'
import SelectText from './component/label/select-text.js'

import globals from './component/globals.js'
import Auth from './component/Auth.vue'
import Table from './component/table.js'
import Checkbox from './component/checkbox.js'
import Authbutton from './component/authbutton.js'
import Button from './component/button.js'
import Multiple_Admin_Page from './component/multiple_admin_page.js'

import Input from './component/item/input.js'

import Home from './component/home/index.vue'

import DataSource from './component/DataSource.js'

const components = [
    Simple_Admin_Page,
    Multiple_Admin_Page,
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


const routes = [
    {
        path: '/', component: Home,
        children:[
            {path:'/price', component:getComponentSimple("price")}
        ]
    }
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
    //store,
    mounted:function(){
      //console.log(this.$options.components)
    }
}).$mount('#app')