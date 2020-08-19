<template>
  <el-form class="user-form" ref="form" :model="form" label-width="100px" size="mini" :rules="rules"
           :show-message="false">
    <!-- 文件名 start -->
    <el-form-item label="LOGO" class="width2">
      <simple-avatar v-model="form.filename" font-size="14px" :size="35"></simple-avatar>
    </el-form-item>
    <!-- 文件名 end -->

    <!-- 品牌名称 start -->
    <el-form-item :label="showLabel('pinpaimingcheng')" prop="name_en" class="width2">
      <el-input v-model="form.name_en"></el-input>
    </el-form-item>
    <!-- 品牌名称 end -->

    <!-- 归属国家 start -->
    <el-form-item :label="showLabel('guishuguojia')" class="width2">
      <el-select v-model="form.countryid" placeholder="">
        <el-option
          v-for="item of countries"
          :key="item.id + item.title"
          :label="item.title"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- 归属国家 end -->

    <!-- 备注 start -->
    <el-form-item :label="showLabel('memo')" class="width2">
      <el-input type="textarea" v-model="form.memo"></el-input>
    </el-form-item>
    <!-- 备注 end -->

    <!-- 官网地址 start -->
    <el-form-item :label="showLabel('guanwangdizhi')" class="width2">
      <el-input v-model="form.officialwebsite"></el-input>
    </el-form-item>
    <!-- 官网地址 end -->

    <!-- 按钮组 start -->
    <el-row>
      <el-col :span="24" style="text-align:center;">
        <el-button type="primary" size="mini" @click="submit">{{ showLabel('baocun') }}</el-button>
        <el-button type="primary" size="mini" @click="cancel">{{ showLabel('quxiao') }}</el-button>
      </el-col>
    </el-row>
    <!-- 按钮组 end -->
  </el-form>
</template>

<script>
    import {showLabel} from '../../component/globals'

    const defaultForm = {
        filename: '',
        name_en: '',
        countryid: '',
        memo: '',
        officialwebsite: ''
    }

    export default {
        name: 'brandform',
        props: {
            id: {
                type: Number
            }
        },
        data() {
            return {
                rules: {
                    'name_en': [{
                        required: true,
                        message: showLabel('pinpaimingcheng') + showLabel('required'),
                        trigger: 'blur'
                    }]
                },
                countries: [],
                form: Object.assign({}, defaultForm)
            }
        },
        // 方法列表
        methods: {
            // 取消
            cancel() {
                this.$emit('cancel')
            },
            // 提交
            submit() {
                let self = this
                this.$refs['form'].validate((valid) => {
                    if (valid) {
                        if (self.id > 0) {
                            self.form.id = self.id
                            self._submit("/brand/edit", self.form).then(function (res) {
                                self.cancel()
                                self.$emit('reloadList')
                            })
                        } else {
                            self._submit("/brand/add", self.form).then(function (res) {
                                self.cancel()
                                self.$emit('reloadList')
                            })
                        }
                    }
                })
            },
            getInfo(id) {
                let self = this
                this._fetch("/brand/info", {id: id}).then(function (res) {
                    self.form.filename = res.data.filename
                    self.form.name_en = res.data.name_en
                    self.form.memo = res.data.memo
                    self.form.officialwebsite = res.data.officialwebsite

                    self.form.countryid = parseInt(res.data.countryid)
                    self.form.countryid = self.form.countryid > 0 ? self.form.countryid : ''
                })
            },
            getCountries() {
                let self = this
                this._fetch("/country/list", {}).then(function (res) {
                    self.countries = res.data
                })
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
            this.getCountries()
            if (this.id) {
                this.getInfo(this.id)
            }
        }
    }
</script>
