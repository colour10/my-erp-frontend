<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
    
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
import globals from '../globals.js'
const _log = globals.logger("asapage-login");

export default {
    name:"asapage-login",
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: 'admin',
          checkPass: '123456'
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            //{ validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            //{ validator: validaePass2 }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var self = this;
        self.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            self.logining = true;
            //NProgress.start();
            var loginParams = { username: self.ruleForm2.account, password: self.ruleForm2.checkPass };
            $ASA.submit.call(self, "/login/login", loginParams, function(res){
                _log("login success", res)
                self.logining = false;

                self.$store.commit({
                    type:"login",
                    auth:res.auth
                })

                self.$router.push("/")
            },function(){self.logining=false})
          }            
        })
      },
      doAction(action) {
          var self = this
          if(action=='logout') {
              $ASA.post("/login/logout", {}, function(res){
                  self.$store.commit("logout")
                  self.$router.push("/login/login")
              }, 'json')
          }
          else {
              if(self.$store.getters.is_login) {
                  self.$router.push("/") 
              }  
              else {
                  $ASA.post("/login/checklogin", {}, function(res){
                      if(res.code==200 && res.auth && res.auth.id && res.auth.id>0) {
                          self.$store.commit({
                              type:"login",
                              auth:res.auth
                          })
                          self.$router.push("/") 
                      }
                      else {
                          self.$router.push("/login/login") 
                      }
                  }, 'json')
              }
          }
      }
    },
    watch:{
        "$route"(newValue, oldValue) {
            var self = this
            _log(newValue, this.$router.params)
            _log(this.$store)
            self.doAction(newValue.params.action)
        }
    },
    mounted:function() {
        var self = this
        _log("mounted", self.$route.params)
        self.doAction(self.$route.params.action)
    }
  }
</script>

<style>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>