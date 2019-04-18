<template>
    <section class="el-container is-vertical" style="height: auto; border: 0px solid rgb(238, 238, 238);">
        <!--<header class="el-header" style="height: 60px; text-align: left; font-size: 24px;">{{_label("system_name")}}</header>-->
        <div id="top-menu">
            <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="onSelect">
                <el-submenu index="1">
                    <template #title>{{_label("menu-1")}}</template>
                    <el-menu-item index="1-1">
                        <router-link to="/user">{{_label("menu-1-1")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-2">
                        <router-link to="/group">{{_label("menu-1-2")}}</router-link>
                    </el-menu-item>
                    <!--<el-menu-item index="1-3">{{_label("menu-1-3")}}</el-menu-item>-->
                    <el-menu-item index="1-4">
                        <router-link to="/department">{{_label("menu-1-4")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="1-5">
                        <router-link to="/system">{{_label("xitongshezhi")}}</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                    <template #title>{{_label("menu-2")}}</template>
                    <el-menu-item index="2-1">
                        <router-link to="/brand">{{_label("menu-2-1-1")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-2">
                        <router-link to="/brandgroup">{{_label("menu-2-1-2")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-3">
                        <router-link to="/ageseason">{{_label("menu-2-1-3")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-4">
                        <router-link to="/colortemplate">{{_label("menu-2-1-4")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-5">
                        <router-link to="/sizetop">{{_label("menu-2-1-5")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-6">
                        <router-link to="/productmemo">{{_label("shangpinmiaoshu")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-7">
                        <router-link to="/material">{{_label("menu-2-1-6")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-8">
                        <router-link to="/currency">{{_label("huobiguanli")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-9">
                        <router-link to="/ulnarinch">{{_label("menu-2-1-7")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-10">
                        <router-link to="/warehouse">{{_label("menu-2-3-1")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-11">
                        <router-link to="/country">{{_label("menu-2-3-3")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-12">
                        <router-link to="/saleport">{{_label("menu-2-4")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="2-13">
                        <router-link to="/price">{{_label("jiageguanli")}}</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="3-1">
                    <router-link to="/product">{{_label("menu-3-1")}}</router-link>
                </el-menu-item>
                <el-menu-item index="4-1">
                    <router-link to="/supplier">{{_label("menu-4")}}</router-link>
                </el-menu-item>
                <!--<el-submenu index="4">
                <template #title>{{_label("menu-4")}}</template>
                <el-menu-item index="4-1"><router-link to="/supplier">{{_label("menu-4-1")}}</router-link></el-menu-item>
                <el-menu-item index="4-2">{{_label("menu-4-2")}}</el-menu-item>
                <el-menu-item index="4-3">{{_label("menu-4-3")}}</el-menu-item>
              </el-submenu>-->
                <el-submenu index="5">
                    <template #title>{{_label("menu-5")}}</template>
                    <el-menu-item index="5-1">
                        <router-link to="/order">{{_label("menu-5-1-1")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="5-2">
                        <router-link to="/confirmorder">{{_label("menu-5-2")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="5-3">
                        <router-link to="/warehousing">{{_label("menu-5-3-1")}}</router-link>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="6">
                    <template #title>{{_label("menu-6")}}</template>
                    <el-menu-item index="6-1">
                        <router-link to="/requisition">{{_label("menu-6-1")}}</router-link>
                    </el-menu-item>
                    <!--<el-submenu index="6-2">
                        <template #title>{{_label("menu-6-2")}}</template>
                        <el-menu-item index="6-2-1">{{_label("menu-6-2-1")}}</el-menu-item>
                        <el-menu-item index="6-2-2">{{_label("menu-6-2-2")}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="6-3">{{_label("menu-6-3")}}</el-menu-item>-->
                    <el-menu-item index="6-4">
                        <router-link to="/productstock">{{_label("menu-6-4")}}</router-link>
                    </el-menu-item>
                    <!-- <el-menu-item index="6-5">
                        <router-link to="/productstockSnapshot">{{_label("menu-6-5")}}</router-link>
                    </el-menu-item> -->
                </el-submenu>
                <el-submenu index="7">
                    <template #title>{{_label("menu-7")}}</template>
                    <el-menu-item index="7-1">
                        <router-link to="/sales">{{_label("menu-7-1")}}</router-link>
                    </el-menu-item>
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
                    <el-menu-item index="8-1">
                        <router-link to="/orderpayment">{{_label("dingdanjiesuan")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="8-2">
                        <router-link to="/salesreceive">{{_label("xiaoshoujiesuan")}}</router-link>
                    </el-menu-item>
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
                    <el-menu-item index="11-1">{{_label("menu-11-1")}}</el-menu-item>
                    <el-menu-item index="11-2">
                        <router-link to="/user/modifypassword">{{_label("menu-11-2")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="11-3">
                        <router-link to="/login/logout">{{_label("menu-11-3")}}</router-link>
                    </el-menu-item>
                    <el-menu-item index="11-4" data-href="/">首页生成器</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!--
        <el-breadcrumb separator="/" style="padding-top:30px;">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>-->
        <section class="el-container">
            <router-view></router-view>
        </section>
        <div id="footer">
            <!--<el-footer class="el-footer"></el-footer>-->
        </div>
    </section>
</template>

<script>
import globals from '../globals.js'

const menus = {
    "1-1": "/user",
    "1-2": "/group",
    "1-4": "/department",
    "1-5": "/system",
    "2-1": "/brand",
    "2-2": "/brandgroup",
    "2-3": "/ageseason",
    "2-4": "/colortemplate",
    "2-5": "/sizetop",
    "2-6": "/productmemo",
    "2-7": "/material",
    "2-8": "/currency",
    "2-9": "/ulnarinch",
    "2-10": "/warehouse",
    "2-12": "/saleport",
    "2-11": "/country",
    "2-13": "/price",
    "3-1": "/product",
    "3-2": "/picture",
    "4-1": "/supplier",
    "4-1": "/supplier",
    "5-1-1": "/order",
    "5-1": "/order",
    "5-2": "/confirmorder",
    "5-3": "/warehousing",
    "5-3-1": "/warehousing",
    "6-1": "/requisition",
    "6-1-2": "/requisition",
    "6-1-3": "/requisition",
    "6-4": "/productstock",
    "6-5": "/productstockSnapshot",
    "7-1": "/sales",
    "11-2": "/user/modifypassword",
    "11-3": "/login/logout"
}
export default {
    name: 'asapage-home',
    data() {
        var self = this;
        return {}
    },
    methods: {
        checkLogin() {
            const self = this
                //self._log(this.$route.path)
            if (!self.$store.getters.is_login) {
                self.$router.push({ path: "/login/login", query: { back: this.$route.path } })
            }
        },
        onSelect(index) {
            //this._log(this.$router)
            if (menus[index]) {
                this.$router.push(menus[index])
                    /*const {href} = this.$router.resolve({
                    path: menus[index]
                })
              window.open(href, '_blank')*/
            }
        }
    },
    watch: {
        '$route' (newValue) {
            var self = this;
            //self._log("$route", this.$store.getters.is_login)
            self.checkLogin()
        }
    },
    mounted: function() {
        this.checkLogin()
            //this._log("Global Function", this.$store.getters.allow("brand"))
    }
}
</script>
