<template>
  <el-form v-if="isShowForm" :model="ruleForm2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" native-type="submit">
    <h3 class="title">{{label.title}}</h3>
    <el-form-item prop="username">
      <el-input type="text" v-model="ruleForm2.username" auto-complete="off" :placeholder="label.username" @keyup.enter.native="handleSubmit2" :autofocus="true"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="ruleForm2.password" auto-complete="off" :placeholder="label.password" @keyup.enter.native="handleSubmit2"></el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="ruleForm2.language" @change="onChange">
        <el-option v-for="(item,key) in languages" :key="key" :label="item.name" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
    <el-form-item style="width:100%;">
      <as-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">{{label.login}}</as-button>
      <!--<as-button @click.native.prevent="handleReset2">重置</as-button>-->
    </el-form-item>
  </el-form>
</template>

<script>
import { _label, ASAP, setLabel } from '../globals.js'
import { extend } from "../object.js"

export default {
  name: "asapage-login",
  data() {
    return {
      logining: false,
      ruleForm2: {
        username: 'admin',
        password: '123456',
        language: window.localStorage.language
      },
      checked: true,
      languages: {},
      isShowForm: false,
      back: "",
      label: {
        title: "",
        username: "",
        password: "",
        login: "",
      },
    };
  },
  methods: {
    handleSubmit2(ev) {
      let self = this;
      if (self.logining == true) {
        return;
      }

      self.$refs.ruleForm2.validate((valid) => {
        if (valid) {
          self.logining = true;
          //NProgress.start();
          let loginParams = extend({}, self.ruleForm2);
          let options = {
            successTip: "dengluchenggong",
            isReject: true
          }
          self._submit("/login/login", loginParams, options).then(function(res) {
            self.$store.commit({
              type: "login",
              auth: res.auth
            });

            console.log('Auth', res.auth);

            ASAP.$session_id = res.session_id;
            self.goToPage()
            self.logining = false;
          }).catch(() => {
            self.logining = false
          })

        }
      })
    },
    doAction(action) {
      var self = this

      //self._log("action", action, self.$route)
      if (action == 'logout') {
        self._fetch("/login/logout", {}).then(function(res) {
          self.$store.commit("logout")
          self.$router.push({ path: "/login/login" })
            //self._log("logout")
        })
      } else {
        if (self.$store.getters.is_login) {
          self.$router.push("/")
        } else {
          self.back = self.$route.query.back
          self._fetch("/login/checklogin", {}).then(function(res) {
            if (res.code == 200 && res.auth && res.auth.id && res.auth.id > 0) {
              self.$store.commit({
                type: "login",
                auth: res.auth
              });

              self.goToPage()
            } else {
              //self.$router.push("/login/login")
              self.isShowForm = true;
            }
          })
        }
      }
    },
    goToPage() {
      let self = this
        //登录成功后进入下一页
      let url = "/";
      if (self.back && self.back.length > 0) {
        url = self.back;
      }
      self.$router.push(url);
    },
    onChange() {
      let self = this
      if (localStorage && localStorage.language) {
        localStorage.language = self.ruleForm2.language
      }
      self.loadLanguage()
    },
    loadLanguage(language) {
      let self = this

      const loading = self.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      return new Promise(resolve => {
        self._fetch("/common/systemlanguage", { language: self.ruleForm2.language }).then(res => {
          //self._log(res.data)

          Object.keys(res.data).forEach((key) => {
            //self._log(key,res.data[key])
            setLabel(key, res.data[key])
          })

          //self._log("+++++++++++", self._label("list"))

          self.label.title = self._label("xitongdenglu")
          self.label.username = self._label("yonghuming")
          self.label.password = self._label("mima")
          self.label.login = self._label("denglu")

          self.languages = self._label("languages")

          loading.close()

          resolve()
        })
      })
    }
  },
  computed: {
    isShow() {
      return this.$route.params.action == 'login'
    }
  },
  watch: {
    "$route" (newValue, oldValue) {
      var self = this

      //self._log(this.$store)
      self.doAction(newValue.params.action)
    }
  },
  mounted: function() {
    let self = this

    if (localStorage && localStorage.language) {
      self.ruleForm2.language = localStorage.language
    }
    self.loadLanguage().then(() => {
      self.doAction(self.$route.params.action)
    })
  }
};
</script>
