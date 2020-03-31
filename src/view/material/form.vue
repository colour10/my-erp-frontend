<template>
  <el-form class="user-form" ref="form" :model="form" label-width="100px" size="mini" :rules="rules"
           :show-message="false">
    <el-form-item :label="showLabel('name', 'cn')" prop="name_cn" class="width2">
      <el-input v-model="form.name_cn"/>
    </el-form-item>
    <el-form-item :label="showLabel('name', 'en')" prop="name_en" class="width2">
      <el-input v-model="form.name_en"/>
    </el-form-item>
    <el-form-item :label="showLabel('name', 'it')" prop="name_it" class="width2">
      <el-input v-model="form.name_it"/>
    </el-form-item>

    <!-- 添加 code start -->
    <el-form-item :label="showLabel('code')" prop="code" class="width2">
      <el-input v-model="form.code"/>
    </el-form-item>
    <!-- 添加 code end -->

    <el-row>
      <el-col :span="24" style="text-align:center;">
        <el-button type="primary" size="mini" @click="submit">{{ showLabel('baocun') }}</el-button>
        <el-button type="primary" size="mini" @click="cancel">{{ showLabel('quxiao') }}</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
    import {showLabel} from '@/component/globals'

    const defaultForm = {
        'name_cn': '',
        'name_en': '',
        'name_it': '',
        'code': ''
    }

    export default {
        name: 'materialform',
        props: {
            id: {
                type: String
            }
        },
        data() {
            return {
                rules: {
                    name_cn: [{
                        required: true,
                        message: showLabel('name', 'cn') + showLabel('required'),
                        trigger: 'blur'
                    }],
                    name_en: [{
                        required: true,
                        message: showLabel('name', 'en') + showLabel('required'),
                        trigger: 'blur'
                    }],
                    name_it: [{
                        required: true,
                        message: showLabel('name', 'it') + showLabel('required'),
                        trigger: 'blur'
                    }],
                },
                form: Object.assign({}, defaultForm)
            }
        },
        methods: {
            getInfo(id) {
                let self = this
                this._fetch("/material/info", {id: id}).then(function (res) {
                    self.form.name_cn = res.data.name_cn
                    self.form.name_en = res.data.name_en
                    self.form.name_it = res.data.name_it
                    // 添加 code 信息
                    self.form.code = res.data.code
                })
            },
            submit() {
                let self = this
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (self.id > 0) {
                            self.form.id = self.id
                            self._submit("/material/edit", self.form).then(function (res) {
                                self.cancel()
                                self.$emit('reloadList')
                            })
                        } else {
                            self._submit("/material/add", self.form).then(function (res) {
                                self.cancel()
                                self.$emit('reloadList')
                            })
                        }
                    }
                })
            },
            cancel() {
                this.$emit('cancel')
            }
        },
        watch: {
            id(newValue) {
                if (newValue > 0) {
                    this.getInfo(newValue)
                } else {
                    this.form = Object.assign({}, defaultForm)
                }
            }
        },
        mounted() {
            if (this.id) {
                this.getInfo(this.id)
            }
        }
    }
</script>
