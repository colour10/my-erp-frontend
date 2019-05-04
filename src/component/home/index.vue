<template>
    <section class="el-container is-vertical" style="height: auto; border: 0px solid rgb(238, 238, 238);">
        <!--<header class="el-header" style="height: 60px; text-align: left; font-size: 24px;">{{_label("system_name")}}</header>-->
        <div id="top-menu">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="onSelect">
                <el-submenu index="1">
                    <template #title>{{_label("menu-1")}}</template>
                    <el-menu-item index="user">{{_label("menu-1-1")}}</el-menu-item>
                    <el-menu-item index="group">{{_label("menu-1-2")}}</el-menu-item>
                    <!--<el-menu-item index="1-3">{{_label("menu-1-3")}}</el-menu-item>-->
                    <el-menu-item index="department">{{_label("menu-1-4")}}</el-menu-item>
                    <el-menu-item index="system">{{_label("xitongshezhi")}}</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template #title>{{_label("menu-2")}}</template>
                    <el-menu-item index="brand">{{_label("menu-2-1-1")}}</el-menu-item>
                    <el-menu-item index="brandgroup">{{_label("menu-2-1-2")}}</el-menu-item>
                    <el-menu-item index="ageseason">{{_label("menu-2-1-3")}}</el-menu-item>
                    <el-menu-item index="colortemplate">{{_label("menu-2-1-4")}}</el-menu-item>
                    <el-menu-item index="sizetop">{{_label("menu-2-1-5")}}</el-menu-item>
                    <el-menu-item index="productmemo">{{_label("shangpinmiaoshu")}}</el-menu-item>
                    <el-menu-item index="material">{{_label("caizhiguanli")}}</el-menu-item>
                    <el-menu-item index="materialnote">{{_label("caizhibeizhu")}}</el-menu-item>
                    <el-menu-item index="property">{{_label("shuxingdingyi")}}</el-menu-item>
                    <el-menu-item index="currency">{{_label("huobiguanli")}}</el-menu-item>
                    <el-menu-item index="ulnarinch">{{_label("menu-2-1-7")}}</el-menu-item>
                    <el-menu-item index="warehouse">{{_label("menu-2-3-1")}}</el-menu-item>
                    <el-menu-item index="country">{{_label("menu-2-3-3")}}</el-menu-item>
                    <el-menu-item index="saleport">{{_label("menu-2-4")}}</el-menu-item>
                    <el-menu-item index="price">{{_label("jiagedingyi")}}</el-menu-item>
                    <el-menu-item index="pricesetting">{{_label("jiageshezhi")}}</el-menu-item>
                    <el-menu-item index="saletype">{{_label("xiaoshoushuxing")}}</el-menu-item>
                    <el-menu-item index="exchangerate">{{_label("huilvguanli")}}</el-menu-item>
                </el-submenu>
                <el-menu-item index="product">{{_label("menu-3-1")}}</el-menu-item>
                <el-menu-item index="supplier">{{_label("menu-4")}}</el-menu-item>
                <!--<el-submenu index="4">
                <template #title>{{_label("menu-4")}}</template>
                <el-menu-item index="4-1"><router-link to="/supplier">{{_label("menu-4-1")}}</router-link></el-menu-item>
                <el-menu-item index="4-2">{{_label("menu-4-2")}}</el-menu-item>
                <el-menu-item index="4-3">{{_label("menu-4-3")}}</el-menu-item>
              </el-submenu>-->
                <el-submenu index="5">
                    <template #title>{{_label("menu-5")}}</template>
                    <el-menu-item index="order">{{_label("menu-5-1-1")}}</el-menu-item>
                    <el-menu-item index="confirmorder">{{_label("menu-5-2")}}</el-menu-item>
                    <el-menu-item index="warehousing">{{_label("menu-5-3-1")}}</el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template #title>{{_label("menu-6")}}</template>
                    <el-menu-item index="requisition">{{_label("menu-6-1")}}</el-menu-item>
                    <!--<el-submenu index="6-2">
                        <template #title>{{_label("menu-6-2")}}</template>
                        <el-menu-item index="6-2-1">{{_label("menu-6-2-1")}}</el-menu-item>
                        <el-menu-item index="6-2-2">{{_label("menu-6-2-2")}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="6-3">{{_label("menu-6-3")}}</el-menu-item>-->
                    <el-menu-item index="productstock">{{_label("menu-6-4")}}</el-menu-item>
                    <!-- <el-menu-item index="6-5">
                        <router-link to="/productstockSnapshot">{{_label("menu-6-5")}}</router-link>
                    </el-menu-item> -->
                </el-submenu>
                <el-submenu index="7">
                    <template #title>{{_label("menu-7")}}</template>
                    <el-menu-item index="sales">{{_label("menu-7-1")}}</el-menu-item>
                    <!--<el-menu-item index="7-2">{{_label("menu-7-2")}}</el-menu-item>
                    <el-submenu index="7-4">
                        <template #title>{{_label("menu-7-4")}}</template>
                        <el-menu-item index="7-4-1">{{_label("menu-7-4-1")}}</el-menu-item>
                        <el-menu-item index="7-4-2">{{_label("menu-7-4-2")}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="7-5">{{_label("menu-7-5")}}</el-menu-item>-->
                </el-submenu>
                <el-submenu index="8">
                    <template #title>{{_label("menu-8")}}</template>
                    <el-menu-item index="orderpayment">{{_label("dingdanjiesuan")}}</el-menu-item>
                    <el-menu-item index="salesreceive">{{_label("xiaoshoujiesuan")}}</el-menu-item>
                    <!--<el-menu-item index="7-2">{{_label("menu-7-2")}}</el-menu-item>
                    <el-submenu index="7-4">
                        <template #title>{{_label("menu-7-4")}}</template>
                        <el-menu-item index="7-4-1">{{_label("menu-7-4-1")}}</el-menu-item>
                        <el-menu-item index="7-4-2">{{_label("menu-7-4-2")}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="7-5">{{_label("menu-7-5")}}</el-menu-item>-->
                </el-submenu>
                <!--<el-submenu index="9">
                <template #title>{{_label("menu-9")}}</template>
                <el-menu-item index="9-1">{{_label("menu-9-1")}}</el-menu-item>
                <el-menu-item index="9-2">{{_label("menu-9-2")}}</el-menu-item>
                <el-menu-item index="9-3">{{_label("menu-9-3")}}</el-menu-item>
                <el-menu-item index="9-3">{{_label("menu-9-3")}}</el-menu-item>
              </el-submenu>
              
              <el-submenu index="10">
                <template #title>{{_label("menu-10")}}</template>
                <el-menu-item index="10-1">{{_label("menu-10-1")}}</el-menu-item>
              </el-submenu>-->
                <el-submenu index="11">
                    <template #title>{{_label("menu-11")}}</template>
                    <el-menu-item index="user/modifypassword">{{_label("menu-11-2")}}</el-menu-item>
                    <el-menu-item index="develop">生成器</el-menu-item>
                    <el-menu-item index="login/logout">{{_label("menu-11-3")}}</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <el-breadcrumb separator="/" style="padding-top:55px;">
            <el-breadcrumb-item :to="{ path: '/' }">{{_label("shouye")}}</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">{{moduleName}}</a></el-breadcrumb-item>
        </el-breadcrumb>
        <section class="el-container">
            <router-view></router-view>
        </section>
        <div id="footer">
            <!--<el-footer class="el-footer"></el-footer>-->
        </div>
    </section>
</template>

<script>
import {_label} from '../globals.js'

const menus = {
    "user":_label("menu-1-1"),
    "group":_label("menu-1-2"),
    "department":_label("menu-1-4"),
    "system":_label("xitongshezhi"),
    "brand":_label("menu-2-1-1"),
    "brandgroup":_label("menu-2-1-2"),
    "ageseason":_label("menu-2-1-3"),
    "colortemplate":_label("menu-2-1-4"),
    "sizetop":_label("menu-2-1-5"),
    "productmemo":_label("shangpinmiaoshu"),
    "material":_label("caizhiguanli"),
    "materialnote":_label("caizhibeizhu"),
    "currency":_label("huobiguanli"),
    "ulnarinch":_label("menu-2-1-7"),
    "warehouse":_label("menu-2-3-1"),
    "country":_label("menu-2-3-3"),
    "saleport":_label("menu-2-4"),
    "price":_label("jiagedingyi"),
    "pricesetting":_label("jiageshezhi"),
    "product":_label("menu-3-1"),
    "supplier":_label("menu-4"),
    "order":_label("menu-5-1-1"),
    "confirmorder":_label("menu-5-2"),
    "warehousing":_label("menu-5-3-1"),
    "requisition":_label("menu-6-1"),
    "productstock":_label("menu-6-4"),
    "sales":_label("menu-7-1"),
    "orderpayment":_label("dingdanjiesuan"),
    "salesreceive":_label("xiaoshoujiesuan"),
    "user/modifypassword":_label("menu-11-2"),
    "login/logout":_label("menu-11-3"),
    "saletype":_label('xiaoshoushuxing'),
    "exchangerate":_label('huilvguanli'),
    "property":_label("shuxingdingyi"),
    "develop":"生成器"
}
export default {
    name: 'asapage-home',
    data() {
        return {
        }
    },
    methods: {
        checkLogin() {
            const self = this
        },
        onSelect(index, indexPath) {
            //this._log(index, indexPath)
            this.$router.push('/'+index)
        }
    },
    watch: {
        '$route' (newValue) {
            var self = this;
            //self._log("$route", this.$route)
            self.checkLogin()
        }
    },
    computed:{
        moduleName() {
            return menus[this.$route.path.substr(1)]
        }
    },
    mounted: function() {
        this.checkLogin()        
    }
}
</script>
