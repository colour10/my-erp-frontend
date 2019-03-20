<template>
<section class="el-container is-vertical" style="height: auto; border: 1px solid rgb(238, 238, 238);">
        <header class="el-header" style="height: 60px; text-align: left; font-size: 24px;">{{globals.getLabel("system_name")}}</header>
        <div id="top-menu">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="onSelect">
              <el-submenu index="1">
                <template #title>{{globals.getLabel("menu-1")}}</template>
                <el-menu-item index="1-1"><router-link to="/user">{{globals.getLabel("menu-1-1")}}</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link to="/group">{{globals.getLabel("menu-1-2")}}</router-link></el-menu-item>
                <!--<el-menu-item index="1-3">{{globals.getLabel("menu-1-3")}}</el-menu-item>-->
                <el-menu-item index="1-4"><router-link to="/department">{{globals.getLabel("menu-1-4")}}</router-link></el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template #title>{{globals.getLabel("menu-2")}}</template>
                <el-submenu index="2-1">
                  <template #title>{{globals.getLabel("menu-2-1")}}</template>
                  <el-menu-item index="2-1-1"><router-link to="/brand">{{globals.getLabel("menu-2-1-1")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-2"><router-link to="/brandgroup">{{globals.getLabel("menu-2-1-2")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-3"><router-link to="/ageseason">{{globals.getLabel("menu-2-1-3")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-4"><router-link to="/colortemplate">{{globals.getLabel("menu-2-1-4")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-5"><router-link to="/sizetop">{{globals.getLabel("menu-2-1-5")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-19"><router-link to="/producttemplate">{{globals.getLabel("menu-2-1-19")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-6"><router-link to="/material">{{globals.getLabel("menu-2-1-6")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-17"><router-link to="/materialstatus">{{globals.getLabel("menu-2-1-17")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-18"><router-link to="/materialnote">{{globals.getLabel("menu-2-1-18")}}</router-link></el-menu-item>
                  
                  <el-menu-item index="2-1-7"><router-link to="/ulnarinch">{{globals.getLabel("menu-2-1-7")}}</router-link></el-menu-item>
                  <!--<el-menu-item index="2-1-8"><router-link to="/aliases">{{globals.getLabel("menu-2-1-8")}}</router-link></el-menu-item>-->
                  <el-menu-item index="2-1-9"><router-link to="/productinnards">{{globals.getLabel("menu-2-1-9")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-10"><router-link to="/productparts">{{globals.getLabel("menu-2-1-10")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-11"><router-link to="/occasionsstyle">{{globals.getLabel("menu-2-1-11")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-12"><router-link to="/closedway">{{globals.getLabel("menu-2-1-12")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-13"><router-link to="/executioncategory">{{globals.getLabel("menu-2-1-13")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-14"><router-link to="/securitycategory">{{globals.getLabel("menu-2-1-14")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-15"><router-link to="/washinginstructions">{{globals.getLabel("menu-2-1-15")}}</router-link></el-menu-item>
                  <el-menu-item index="2-1-16"><router-link to="/winterproofing">{{globals.getLabel("menu-2-1-16")}}</router-link></el-menu-item>
                </el-submenu>
                
                <el-submenu index="2-2">
                  <template #title>{{globals.getLabel("menu-2-2")}}</template>
                  <el-menu-item index="2-2-1"><router-link to="/productprice">{{globals.getLabel("menu-2-2-1")}}</router-link></el-menu-item>
                  <el-menu-item index="2-2-2"><router-link to="/costformula">{{globals.getLabel("menu-2-2-2")}}</router-link></el-menu-item>
                </el-submenu>
                
                <el-submenu index="2-3">
                  <template #title>{{globals.getLabel("menu-2-3")}}</template>
                  <el-menu-item index="2-3-1"><router-link to="/warehouse">{{globals.getLabel("menu-2-3-1")}}</router-link></el-menu-item>
                  <el-menu-item index="2-3-2"><router-link to="/salesport">{{globals.getLabel("menu-2-3-2")}}</router-link></el-menu-item>
                  <el-menu-item index="2-3-3"><router-link to="/country">{{globals.getLabel("menu-2-3-3")}}</router-link></el-menu-item>
                  <el-menu-item index="2-3-4"><router-link to="/feenames">{{globals.getLabel("menu-2-3-4")}}</router-link></el-menu-item>
                  <el-menu-item index="2-3-5"><router-link to="/shippingtype">{{globals.getLabel("menu-2-3-5")}}</router-link></el-menu-item>
                  <el-menu-item index="2-3-6"><router-link to="/salesmethods">{{globals.getLabel("menu-2-3-6")}}</router-link></el-menu-item>
                  <el-menu-item index="2-3-7"><router-link to="/businesstype">{{globals.getLabel("menu-2-3-7")}}</router-link></el-menu-item>
                  <!--<el-menu-item index="2-3-9"><router-link to="/reportstyle">{{globals.getLabel("menu-2-3-9")}}</router-link></el-menu-item>-->
                  <el-menu-item index="2-3-10"><router-link to="/imagetool">{{globals.getLabel("menu-2-3-10")}}</router-link></el-menu-item>
                  <!--<el-menu-item index="2-3-11"><router-link to="/pricesource">{{globals.getLabel("menu-2-3-11")}}</router-link></el-menu-item>
                  <el-menu-item index="2-3-12">{{globals.getLabel("menu-2-3-12")}}</el-menu-item>
                  <el-menu-item index="2-3-13">{{globals.getLabel("menu-2-3-13")}}</el-menu-item>-->
                </el-submenu>                
              </el-submenu>
              
              <el-submenu index="3">
                <template #title>{{globals.getLabel("menu-3")}}</template>
                <el-menu-item index="3-1"><router-link to="/product">{{globals.getLabel("menu-3-1")}}</router-link></el-menu-item>
                <el-menu-item index="3-2"><router-link to="/picture">{{globals.getLabel("menu-3-2")}}</router-link></el-menu-item>
                <el-menu-item index="3-3">{{globals.getLabel("menu-3-3")}}</el-menu-item>
              </el-submenu>
              
              <el-menu-item index="4-1"><router-link to="/supplier">{{globals.getLabel("menu-4")}}</router-link></el-menu-item>
              <!--<el-submenu index="4">
                <template #title>{{globals.getLabel("menu-4")}}</template>
                <el-menu-item index="4-1"><router-link to="/supplier">{{globals.getLabel("menu-4-1")}}</router-link></el-menu-item>
                <el-menu-item index="4-2">{{globals.getLabel("menu-4-2")}}</el-menu-item>
                <el-menu-item index="4-3">{{globals.getLabel("menu-4-3")}}</el-menu-item>
              </el-submenu>-->
              
              <el-submenu index="5">
                <template #title>{{globals.getLabel("menu-5")}}</template>
                <el-submenu index="5-1">
                  <template #title>{{globals.getLabel("menu-5-1")}}</template>
                  <el-menu-item index="5-1-1"><router-link to="/order">{{globals.getLabel("menu-5-1-1")}}</router-link></el-menu-item>
                  <el-menu-item index="5-1-2">{{globals.getLabel("menu-5-1-2")}}</el-menu-item>
                  <el-menu-item index="5-1-3">{{globals.getLabel("menu-5-1-3")}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="5-2"><router-link to="/confirmorder">{{globals.getLabel("menu-5-2")}}</router-link></el-menu-item>
                
                <el-submenu index="5-3">
                  <template #title>{{globals.getLabel("menu-5-3")}}</template>
                  <el-menu-item index="5-3-1"><router-link to="/warehousing">{{globals.getLabel("menu-5-3-1")}}</router-link></el-menu-item>
                  <el-menu-item index="5-3-2"><router-link to="/warehousing">{{globals.getLabel("menu-5-3-2")}}</router-link></el-menu-item>
                </el-submenu>
              </el-submenu>
              
              <el-submenu index="6">
                <template #title>{{globals.getLabel("menu-6")}}</template>
                <el-submenu index="6-1">
                  <template #title>{{globals.getLabel("menu-6-1")}}</template>
                  <el-menu-item index="6-1-1"><router-link to="/requisition">{{globals.getLabel("menu-6-1-1")}}</router-link></el-menu-item>
                  <el-menu-item index="6-1-2"><router-link to="/requisition">{{globals.getLabel("menu-6-1-2")}}</router-link></el-menu-item>
                  <el-menu-item index="6-1-3"><router-link to="/requisition">{{globals.getLabel("menu-6-1-3")}}</router-link></el-menu-item>
                </el-submenu>
                <el-submenu index="6-2">
                  <template #title>{{globals.getLabel("menu-6-2")}}</template>
                  <el-menu-item index="6-2-1">{{globals.getLabel("menu-6-2-1")}}</el-menu-item>
                  <el-menu-item index="6-2-2">{{globals.getLabel("menu-6-2-2")}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="6-3">{{globals.getLabel("menu-6-3")}}</el-menu-item>
                <el-menu-item index="6-4"><router-link to="/productstock">{{globals.getLabel("menu-6-4")}}</router-link></el-menu-item>
                <el-menu-item index="6-5"><router-link to="/productstockSnapshot">{{globals.getLabel("menu-6-5")}}</router-link></el-menu-item>
              </el-submenu>
              
              <el-submenu index="7">
                <template #title>{{globals.getLabel("menu-7")}}</template>
                <el-menu-item index="7-1"><router-link to="/sales">{{globals.getLabel("menu-7-1")}}</router-link></el-menu-item>
                <!--<el-menu-item index="7-2">{{globals.getLabel("menu-7-2")}}</el-menu-item>-->
                <el-submenu index="7-4">
                  <template #title>{{globals.getLabel("menu-7-4")}}</template>
                  <el-menu-item index="7-4-1">{{globals.getLabel("menu-7-4-1")}}</el-menu-item>
                  <el-menu-item index="7-4-2">{{globals.getLabel("menu-7-4-2")}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="7-5">{{globals.getLabel("menu-7-5")}}</el-menu-item>
              </el-submenu>
              
              <el-menu-item index="8-1"><router-link to="/member">{{globals.getLabel("menu-8-1")}}</router-link></el-menu-item>
              
              <!--<el-submenu index="9">
                <template #title>{{globals.getLabel("menu-9")}}</template>
                <el-menu-item index="9-1">{{globals.getLabel("menu-9-1")}}</el-menu-item>
                <el-menu-item index="9-2">{{globals.getLabel("menu-9-2")}}</el-menu-item>
                <el-menu-item index="9-3">{{globals.getLabel("menu-9-3")}}</el-menu-item>
                <el-menu-item index="9-3">{{globals.getLabel("menu-9-3")}}</el-menu-item>
              </el-submenu>
              
              <el-submenu index="10">
                <template #title>{{globals.getLabel("menu-10")}}</template>
                <el-menu-item index="10-1">{{globals.getLabel("menu-10-1")}}</el-menu-item>
              </el-submenu>-->              
              
              <el-submenu index="11">
                <template #title>{{globals.getLabel("menu-11")}}</template>
                <el-menu-item index="11-1">{{globals.getLabel("menu-11-1")}}</el-menu-item>
                <el-menu-item index="11-2"><router-link to="/user/modifypassword">{{globals.getLabel("menu-11-2")}}</router-link></el-menu-item>
                <el-menu-item index="11-3"><router-link to="/login/logout">{{globals.getLabel("menu-11-3")}}</router-link></el-menu-item>   
                <el-menu-item index="11-4" data-href="/">首页生成器</el-menu-item>                
              </el-submenu>
            </el-menu>
        </div>
        <section class="el-container">
          <router-view></router-view>
        </section>
        
        <div id="footer">
          <el-footer class="el-footer"></el-footer>
        </div>
    </section>
    </template>
<script>
import globals from '../globals.js'

const _log = globals.logger("asapage-home");
const menus = {
    "1-1":"/user",
    "1-2":"/group",
    "1-4":"/department",
    "2-1-1":"/brand",
    "2-1-2":"/brandgroup",
    "2-1-3":"/ageseason",
    "2-1-4":"/colortemplate",
    "2-1-5":"/sizetop",
    "2-1-19":"/producttemplate",
    "2-1-6":"/material",
    "2-1-17":"/materialstatus",
    "2-1-18":"/materialnote",
    "2-1-7":"/ulnarinch",
    "2-1-8":"/aliases",
    "2-1-9":"/productinnards",
    "2-1-10":"/productparts",
    "2-1-11":"/occasionsstyle",
    "2-1-12":"/closedway",
    "2-1-13":"/executioncategory",
    "2-1-14":"/securitycategory",
    "2-1-15":"/washinginstructions",
    "2-1-16":"/winterproofing",
    "2-2-1":"/productprice",
    "2-2-2":"/costformula",
    "2-3-1":"/warehouse",
    "2-3-2":"/salesport",
    "2-3-3":"/country",
    "2-3-4":"/feenames",
    "2-3-5":"/shippingtype",
    "2-3-6":"/salesmethods",
    "2-3-7":"/businesstype",
    "2-3-9":"/reportstyle",
    "2-3-10":"/imagetool",
    "2-3-11":"/pricesource",
    "3-1":"/product",
    "3-2":"/picture",
    "4-1":"/supplier",
    "4-1":"/supplier",
    "5-1-1":"/order",
    "5-2":"/confirmorder",
    "5-3-1":"/warehousing",
    "5-3-2":"/warehousing",
    "6-1-1":"/requisition",
    "6-1-2":"/requisition",
    "6-1-3":"/requisition",
    "6-4":"/productstock",
    "6-5":"/productstockSnapshot",
    "7-1":"/sales",
    "8-1":"/member",
    "11-2":"/user/modifypassword",
    "11-3":"/login/logout"
}
export default {
    name: 'asapage-home',
    components:{
    },
    props: {
    },
    data() {
        var self = this;        
        return {
          globals
        }
    },
    methods:{
        checkLogin() {
            const self = this
            if(!self.$store.getters.is_login) {
                self.$router.push("/login/login")
            }
        },
        onSelect(index) {
            _log(index)
            if(menus[index]) {
                this.$router.push(menus[index])
            }
        }
    },
    computed:{
    },
    watch:{
        '$route'(newValue) {
            var self = this;
            _log("$route", this.$store.getters.is_login)  
            self.checkLogin()
        }
    },
    mounted:function(){
      _log("mounted", this.$store.getters.is_login, this.$store)
      this.checkLogin()
    }
}
</script>

<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-footer{
    clear: both;
    display: block;
    text-align: center;    
    margin: 0px auto;
    bottom: 100px;
  }

  .el-aside {
    color: #333;
  }  
  
</style>