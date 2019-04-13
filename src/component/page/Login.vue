<template>
    <el-form v-if="isShowForm" :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container" native-type="submit">
        <h3 class="title">{{_label("xitongdenglu")}}</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" :placeholder="_label('yonghuming')" @keyup.enter.native="handleSubmit2" :autofocus="true"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" :placeholder="_label('mima')" @keyup.enter.native="handleSubmit2"></el-input>
        </el-form-item>
        <!--<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">{{_label("denglu")}}</el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
import { _label, ASAP } from '../globals.js'

export default {
    name: "asapage-login",
    data() {
        return {
            logining: false,
            ruleForm2: {
                account: 'admin',
                checkPass: '123456'
            },
            rules2: {
                account: [
                    { required: true, message: '', trigger: 'blur' },
                    //{ validator: validaePass }
                ],
                checkPass: [
                    { required: true, message: '', trigger: 'blur' },
                    //{ validator: validaePass2 }
                ]
            },
            checked: true,
            languages: _label("list_languages"),
            isShowForm: false,
            back: ""
        };
    },
    methods: {
        handleSubmit2(ev) {
            let self = this;
            self.$refs.ruleForm2.validate((valid) => {
                if (valid) {
                    //_this.$router.replace('/table');
                    self.logining = true;
                    //NProgress.start();
                    let loginParams = { username: self.ruleForm2.account, password: self.ruleForm2.checkPass };
                    let options = {
                        successTip: "dengluchenggong",
                        isReject:true
                    }
                    self._submit("/login/login", loginParams, options).then(function(res) {
                        //self._log("login success", res)
                        self.logining = false;

                        self.$store.commit({
                            type: "login",
                            auth: res.auth
                        })


                        ASAP.$session_id = res.session_id;
                        //console.log(window.ASAP)

                        self.goToPage()
                    }).catch(() => {
                        self.logining = false
                    })

                }
            })
        },
        doAction(action) {
            var self = this

            self._log("action", action, self.$route)
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
                            })
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
            let url = "/"
            if (self.back && self.back.length > 0) {
                url = self.back
            }
            self.$router.push(url)
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
        var self = this
        self._log("mounted", self.$route.params)
        self.doAction(self.$route.params.action)
    }
}
</script>
