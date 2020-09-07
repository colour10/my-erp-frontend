<template>
  <section class="el-container is-vertical" style="height: auto; border: 0px solid rgb(238, 238, 238);">
    <!--<header class="el-header" style="height: 60px; text-align: left; font-size: 24px;">{{_label("system_name")}}</header>-->
    <el-row id="top-menu">
      <!-- 菜单列表 start -->
      <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
               active-text-color="#ffd04b" @select="onSelect">

        <!-- 组织架构 start -->
        <el-submenu index="1">
          <template #title>{{ _label("menu-1") }}</template>
          <el-menu-item index="user">{{ _label("menu-1-1") }}</el-menu-item>
          <el-menu-item index="group">{{ _label("menu-1-2") }}</el-menu-item>
          <el-menu-item index="department">{{ _label("menu-1-4") }}</el-menu-item>
          <el-menu-item index="system">{{ _label("xitongshezhi") }}</el-menu-item>
        </el-submenu>
        <!-- 组织架构 end -->

        <!-- 基础资料 start -->
        <el-submenu index="2">
          <template #title>{{ _label("menu-2") }}</template>
          <el-menu-item index="brand">{{ _label("menu-2-1-1") }}</el-menu-item>
          <el-menu-item index="brandgroup">{{ _label("menu-2-1-2") }}</el-menu-item>
          <el-menu-item index="ageseason">{{ _label("menu-2-1-3") }}</el-menu-item>
          <el-menu-item index="colortemplate">{{ _label("menu-2-1-4") }}</el-menu-item>
          <el-menu-item index="sizetop">{{ _label("menu-2-1-5") }}</el-menu-item>
          <el-menu-item index="productmemo">{{ _label("shangpinmiaoshu") }}</el-menu-item>
          <el-menu-item index="material">{{ _label("caizhiguanli") }}</el-menu-item>
          <el-menu-item index="materialnote">{{ _label("caizhibeizhu") }}</el-menu-item>
          <el-menu-item index="property">{{ _label("shuxingdingyi") }}</el-menu-item>
          <el-menu-item index="currency">{{ _label("huobiguanli") }}</el-menu-item>
          <el-menu-item index="ulnarinch">{{ _label("menu-2-1-7") }}</el-menu-item>
          <el-menu-item index="warehouse">{{ _label("menu-2-3-1") }}</el-menu-item>
          <el-menu-item index="country">{{ _label("menu-2-3-3") }}</el-menu-item>
          <el-menu-item index="saleport">{{ _label("xiaoshouduankou") }}</el-menu-item>
          <el-menu-item index="price">{{ _label("jiagedingyi") }}</el-menu-item>
          <el-menu-item index="saletype">{{ _label("xiaoshoushuxing") }}</el-menu-item>
          <el-menu-item index="producttype">{{ _label("shangpinshuxing") }}</el-menu-item>
          <el-menu-item index="exchangerate">{{ _label("huilvguanli") }}</el-menu-item>
          <el-menu-item index="language">{{ _label("duoguoyuyanguanli") }}</el-menu-item>
          <el-menu-item index="winterproofing">{{ _label("fanghanzhishu") }}</el-menu-item>
          <el-menu-item index="feename">{{ _label("feiyongguanli") }}</el-menu-item>
          <el-menu-item index="permission" v-if="_isAllowed('permission')">{{ _label("quanxianguanli") }}</el-menu-item>
          <el-menu-item index="paymentway">{{ _label("fukuanfangshi") }}</el-menu-item>
        </el-submenu>
        <!-- 基础资料 end -->

        <!-- 商品信息 start -->
        <el-menu-item index="product">{{ _label("menu-3-1") }}</el-menu-item>
        <!-- 商品信息 end -->

        <!-- 客户管理 start -->
        <el-menu-item index="supplier">{{ _label("menu-4") }}</el-menu-item>
        <!-- 客户管理 end -->

        <!-- 供应链管理 start -->
        <el-submenu index="5" v-if="_isAllowed('order-page,orderbrand-page,shipping-page')">
          <template #title>{{ _label("menu-5") }}</template>
          <el-menu-item index="order" v-if="_isAllowed('order-page')">{{ _label("dingdanguanli") }}</el-menu-item>
          <el-menu-item index="orderbrand" v-if="_isAllowed('orderbrand-page')">{{ _label("waibudingdan") }}
          </el-menu-item>
          <el-menu-item index="shipping" v-if="_isAllowed('shipping-page')">{{ _label("menu-5-2") }}</el-menu-item>
        </el-submenu>
        <!-- 供应链管理 end -->

        <!-- 供应链管理（简化版） start -->
        <el-submenu index="9" v-if="_isAllowed('order-simple-page,shipping-simple-page')">
          <template #title>{{ _label("menu-9") }}</template>
          <el-menu-item index="ordersimple" v-if="_isAllowed('order-simple-page')">{{ _label("simple-order") }}
          </el-menu-item>
          <el-menu-item index="shippingsimple" v-if="_isAllowed('shipping-simple-page')">{{ _label("menu-9-10") }}
          </el-menu-item>
        </el-submenu>
        <!-- 供应链管理（简化版） end -->

        <!-- 库存管理 start -->
        <el-submenu index="6" v-if="_isAllowed('requisition-page,productstock-search,requisition-simple-page')">
          <template #title>{{ _label("menu-6") }}</template>
          <el-menu-item index="requisition" v-if="_isAllowed('requisition-page')">{{ _label("menu-6-1") }}
          </el-menu-item>
          <el-menu-item index="requisitionSimple" v-if="_isAllowed('requisition-simple-page')">{{ _label("menu-6-5") }}
          </el-menu-item>
          <el-menu-item index="productstock" v-if="_isAllowed('productstock-search')">{{ _label("menu-6-4") }}
          </el-menu-item>
        </el-submenu>
        <!-- 库存管理 end -->

        <!-- 销售管理 start -->
        <el-submenu index="7">
          <template #title>{{ _label("menu-7") }}</template>
          <el-menu-item index="sales">{{ _label("menu-7-1") }}</el-menu-item>
          <el-menu-item index="bill">{{ _label("xiaoshouduizhang") }}</el-menu-item>
        </el-submenu>
        <!-- 销售管理 end -->

        <!-- 结算 start -->
        <el-submenu index="8">
          <template #title>{{ _label("menu-8") }}</template>
          <el-menu-item index="orderpayment">{{ _label("dingdanjiesuan") }}</el-menu-item>
          <el-menu-item index="salesreceive">{{ _label("xiaoshoujiesuan") }}</el-menu-item>
        </el-submenu>
        <!-- 结算 end -->

        <!-- 系统 start -->
        <el-submenu index="11">
          <template #title>{{ _label("menu-11") }}</template>
          <el-menu-item index="user/modifypassword">{{ _label("xiugaimima") }}</el-menu-item>
          <el-menu-item index="user/setting">{{ _label("gerenshezhi") }}</el-menu-item>
          <!--<el-menu-item index="develop">生成器</el-menu-item>-->
          <el-menu-item index="login/logout">{{ _label("menu-11-3") }}</el-menu-item>
        </el-submenu>
        <!-- 系统 end -->
      </el-menu>
      <!-- 菜单列表 end -->
      <i class="el-icon-rank" style="position:fixed;top:18px;right:50px;font-size:20px;color:white;cursor:pointer;"
         @click="toggleFullScreen"></i>
    </el-row>

    <!-- tag 列表 start -->
    <el-row id="nav">
      <el-tag v-for="(tag,index) in tags" :key="index" :closable="tags.length>=1"
              style="margin-right:5px;cursor:pointer" @close="onCloseTag(tag)" @click="onClickTag(tag)"
              :type="getType(tag.key)">{{ tag.label }}
      </el-tag>
    </el-row>
    <!-- tag 列表 end -->

    <!-- 主要内容 start -->
    <section class="el-container" id="mainContainer">
      <transition name="el-fade-in" mode="out-in">
        <keep-alive :include="includes">
          <router-view :key="module"></router-view>
        </keep-alive>
      </transition>
    </section>
    <!-- 主要内容 end -->

    <div id="footer">
      <!--<el-footer class="el-footer"></el-footer>-->
    </div>
  </section>
</template>

<script>
import {config} from '../globals.js'
import bus from '../bus.js';

export default {
  name: 'sp-home',
  data() {
    return {
      fullscreen: false,
    };
  },
  provide() {
    return {
      bus,
    };
  },
  methods: {
    checkLogin() {
      const self = this;
      if (!self.$store.getters.is_login) {
        self.$router.push({path: "/login/login", query: {back: this.$route.path}});
      }
    },
    onSelect(index, indexPath) {
      //this._log(index, indexPath)
      this.$router.push('/' + index);
    },
    onCloseTag(tag) {
      bus.$emit('close', tag.path);
      this.$store.commit("closeTag", {
        tag
      });
    },
    onClickTag(tag) {
      this.$router.push(tag.path);
    },
    getType(key) {
      return key == this.current.key ? 'success' : '';
    },
    fullScreen() {
      var el = document.documentElement;
      var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
      if (typeof rfs != "undefined" && rfs) {
        rfs.call(el);
      }
      ;
      return;
    },
    //退出全屏
    exitScreen() {
      const doc = document;
      if (doc.exitFullscreen) {
        doc.exitFullscreen();
      } else if (doc.mozCancelFullScreen) {
        doc.mozCancelFullScreen();
      } else if (doc.webkitCancelFullScreen) {
        doc.webkitCancelFullScreen();
      } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
      }
      if (typeof cfs != "undefined" && cfs) {
        cfs.call(el);
      }
    },
    toggleFullScreen() {
      const self = this;
      if (self.fullscreen) {
        self.exitScreen();
      } else {
        self.fullScreen();
      }
      self.fullscreen = !self.fullscreen;
    },
  },
  watch: {
    '$route'(newValue) {
      var self = this;
      //self._log("$route", this.$route)
      self.checkLogin();
    },
    // 检测 tags 的变化，以便随时调整 与内容之间的间隙padding
    'tags.length'(newVal, oldVal) {
      // 记录变化值
      console.log('tags.length发生变更 => ', newVal, oldVal)
      this.$nextTick(() => {
        // 获取当前节点的实时高度
        let height = Number(document.getElementById('nav').offsetHeight) + Number(10)
        // 测试这个值
        console.log('当前高度值是：', height)
        // 然后设置 paddingTop 的值
        document.getElementById('mainContainer').style.paddingTop = height + 'px'
      })
    }
  },
  computed: {
    moduleName() {
      return config().menus[this.$route.path.substr(1)];
    },
    module() {
      return this.$route.path.replace(/\//g, "");
    },
    tags() {
      //this._log(this.$store.getters.getTags)
      //this._log(this.$store.getters.getTags.tags)
      return this.$store.getters.getTags.tags;
    },
    current() {
      //this._log(this.$store.getters.getTags)
      return this.$store.getters.getTags.current;
    },
    includes() {
      return this.$store.getters.getTags.tags.filter(item => item.name).map(item => "sp-" + item.name).join(',');
    },
  },
  beforeMount: function () {
    this.checkLogin();
  },
};
</script>
