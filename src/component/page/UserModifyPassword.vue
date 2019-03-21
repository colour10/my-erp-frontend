<template>
<el-form status-icon label-width="100px">
  <el-form-item label="旧密码" prop="pass">
    <el-input type="password" v-model="form.old_password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="新密码" prop="pass">
    <el-input type="password" v-model="form.new_password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="form.confirm_password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm()">提交</el-button>
    <el-button @click="resetForm()">重置</el-button>
  </el-form-item>
</el-form>    
</template>

<script>
export default {
    name: 'asapage-usermodifypassword',
    components:{
    },
    data() {
        return {
            form: {
                old_password: '',
                new_password:'',
                confirm_password:''
            }
        }
    },
    methods: {
        resetForm() {
            let form = this.form
            form.old_password = '';
            form.new_password = '';
            form.confirm_password = '';
        },
        submitForm() {
            let self = this
            self._submit("/user/modifypassword", self.form)
        }
    }
}
</script>