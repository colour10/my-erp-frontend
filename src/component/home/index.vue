<template>
    <section class="el-container is-vertical" style="height: auto; border: 0px solid rgb(238, 238, 238);">
        <!--<header class="el-header" style="height: 60px; text-align: left; font-size: 24px;">{{_label("system_name")}}</header>-->
        <el-row id="top-menu">
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
                    <el-menu-item index="pricesetting">{{_label("jiageshezhi")}}</el-menu-item>
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
                    <el-menu-item index="saleport">{{_label("xiaoshouduankou")}}</el-menu-item>
                    <el-menu-item index="price">{{_label("jiagedingyi")}}</el-menu-item>
                    <el-menu-item index="saletype">{{_label("xiaoshoushuxing")}}</el-menu-item>
                    <el-menu-item index="exchangerate">{{_label("huilvguanli")}}</el-menu-item>
                    <el-menu-item index="language">{{_label("duoguoyuyanguanli")}}</el-menu-item>
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
                    <el-menu-item index="order">{{_label("dingdanguanli")}}</el-menu-item>
                    <el-menu-item index="orderbrand">{{_label("pinpaidingdan")}}</el-menu-item>
                    <el-menu-item index="confirmorder">{{_label("menu-5-2")}}</el-menu-item>
                    <el-menu-item index="warehousing">{{_label("rukudanguanli")}}</el-menu-item>
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
        </el-row>
        <el-row id="nav">
            <el-tag v-for="(tag,index) in tags" :key="index" :closable="tags.length>1" style="margin-right:5px;cursor:pointer" @close="onCloseTag(tag)" @click="onClickTag(tag)" :type="getType(tag.key)">{{tag.label}}</el-tag>
        </el-row>
        <section class="el-container" style="padding-top:60px">
            <transition name="el-fade-in" mode="out-in">
                <keep-alive :include="includes">
                    <router-view :key="module"></router-view>
                </keep-alive>
            </transition>
        </section>
        <div id="footer">
            <!--<el-footer class="el-footer"></el-footer>-->
        </div>
    </section>
</template>

<script>
import { config } from '../globals.js'

export default {
    name: 'sp-home',
    data() {
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
        onSelect(index, indexPath) {
            //this._log(index, indexPath)
            this.$router.push('/' + index)
        },
        onCloseTag(tag) {
            this.$store.commit("closeTag", {
                tag
            })
        },
        onClickTag(tag) {
            this.$router.push(tag.path)
        },
        getType(key) {
            return key == this.current.key ? 'success' : ''
        }
    },
    watch: {
        '$route' (newValue) {
            var self = this;
            //self._log("$route", this.$route)
            self.checkLogin()
        }
    },
    computed: {
        moduleName() {
            return config().menus[this.$route.path.substr(1)]
        },
        module() {
            return this.$route.path.replace(/\//g, "")
        },
        tags() {
            //this._log(this.$store.getters.getTags)
            //this._log(this.$store.getters.getTags.tags)
            return this.$store.getters.getTags.tags
        },
        current() {
            //this._log(this.$store.getters.getTags)
            return this.$store.getters.getTags.current
        },
        includes() {
            return this.$store.getters.getTags.tags.filter(item => item.name).map(item => "sp-" + item.name).join(',')
        }
    },
    mounted: function() {

    },
    beforeMount: function() {
        this.checkLogin()
    }
}
</script>
