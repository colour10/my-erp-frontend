<template>
  <div>
    <el-select v-model="selected" filterable placeholder="" @change="handleChange">
      <el-option-group
        v-for="group in sizes"
        :key="group.label"
        :label="group.label">
        <el-option
          v-for="item of group.options"
          :key="item.id + item.title"
          :label="item.title"
          :value="item.id">
        </el-option>
      </el-option-group>
    </el-select>
    <el-button @click="handleCreate" class="trimhalf" style="margin: 0;">{{showLabel("xinjian")}}</el-button>

    <el-dialog :title="showLabel('create-sizetop')" :visible.sync="dialogFormVisible" :center="true" :modal="false"
               width="510px">
      <!-- 品牌 start -->
      <el-form ref="form" :model="form" label-width="80px" size="mini" :rules="rules" :show-message="false">
        <el-form-item :label="showLabel('pinpai')" prop="brand_id">
          <el-select v-model="form.brand_id" filterable placeholder="">
            <el-option
              v-for="item of brands"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 品牌 end -->

        <!-- 品类 start -->
        <el-form-item :label="showLabel('pinlei')" prop="brandgroup_id">
          <el-select v-model="form.brandgroup_id" filterable placeholder="">
            <el-option
              v-for="item of brandgroups"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 品类 end -->

        <!-- 子品类 start -->
        <el-form-item :label="showLabel('zipinlei')" prop="brandgroupchild_id">
          <el-select v-model="form.brandgroupchild_id" filterable placeholder="">
            <el-option
              v-for="item of filtedBrandgroupchildren"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 子品类 end -->

        <!-- 性别 start -->
        <el-form-item :label="showLabel('xingbie')" prop="gender">
          <el-select v-model="form.gender" filterable placeholder="">
            <el-option
              v-for="item of genders"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 性别 end -->

        <hr>

        <!-- 尺码组 start -->
        <el-form-item :label="showLabel('chimazu')" prop="name_en">
          <el-input v-model="form.name_en"></el-input>
          <el-button type="success" class="trimhalf" style="margin: 0;" @click="appendSizeContent">
            {{_label("add-content")}}
          </el-button>
        </el-form-item>
        <!-- 尺码组 end -->

        <!-- 尺码 start -->
        <el-form-item :label="showLabel('chima')"
                      v-for="(sizecontent, index) in form.sizes"
                      :key="index"
                      :prop="'sizes.' + index + '.name'"
                      :rules="{required: true}">
          <el-input v-model="sizecontent.name"></el-input>
          <el-button type="danger" class="trimhalf" style="margin: 0;" @click="removeSizeContent(index)">
            {{_label("button-delete")}}
          </el-button>
        </el-form-item>
        <!-- 尺码 end -->

        <!-- 按钮 start -->
        <el-row>
          <el-col :span="24" style="text-align:center;">
            <el-button type="primary" size="mini" @click="submit">{{ showLabel('baocun') }}</el-button>
            <el-button type="primary" size="mini" @click="cancel">{{ showLabel('quxiao') }}</el-button>
          </el-col>
        </el-row>
        <!-- 按钮 end -->

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    import {showLabel} from '@/component/globals'

    const defaultForm = {
        brand_id: '',
        brandgroup_id: '',
        brandgroupchild_id: '',
        gender: '',
        name_en: '',
        sizes: []
    }

    export default {
        data() {
            return {
                selected: '',
                rules: {
                    'brand_id': [{required: true, message: showLabel('pinpai') + showLabel('required')}],
                    'brandgroup_id': [{required: true, message: showLabel('pinlei') + showLabel('required')}],
                    'brandgroupchild_id': [{required: true, message: showLabel('zipinlei') + showLabel('required')}],
                    'gender': [{required: true, message: showLabel('xingbie') + showLabel('required')}],
                    'name_en': [{required: true, message: showLabel('chimazu') + showLabel('required')}]
                },
                brands: [],
                sizetops: [],
                genders: [],
                brandgroupchildren: [],
                brandgroups: [],
                form: Object.assign({}, defaultForm),
                dialogFormVisible: false
            }
        },
        computed: {
            filtedBrandgroupchildren() {
                if (this.id == 0) {
                    this.form.brandgroupchild_id = ''
                }
                let self = this
                if (this.form.brandgroup_id) {
                    return this.brandgroupchildren.filter(function (item) {
                        return item.brandgroup_id == self.form.brandgroup_id
                    })
                } else {
                    return this.brandgroupchildren
                }
            }
        },
        props: {
            brand_id: {
                type: String
            },
            category: {
                type: Array
            },
            gender: {
                type: String
            },
            sizetopid: {
                type: String
            },
            sizes: {
                type: Array
            }
        },
        model: {
            prop: 'sizetopid',
            event: 'change'
        },
        methods: {
            showDialogForm() {
                this.dialogFormVisible = true
                this.form.brand_id = this.brand_id
                if (!_.isEmpty(this.category)) {
                    this.form.brandgroup_id = this.category[0].toString()
                    this.form.brandgroupchild_id = this.category[1].toString()
                }
                if (!_.isEmpty(this.gender)) {
                    this.form.gender = parseInt(this.gender)
                }
            },
            hideDialogForm() {
                this.dialogFormVisible = false
            },
            submit() {
                let self = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        self._submit("/product/addSize", self.form).then(function (res) {
                            self.hideDialogForm()
                            self.$emit('reloadSizetops')
                        })
                    }
                })
            },
            cancel() {
                this.hideDialogForm()
            },
            handleChange() {
                this.$emit('change', this.selected)
            },
            handleCreate() {
                this.appendSizeContent()
                this.showDialogForm()
            },
            appendSizeContent() {
                this.form.sizes.push({
                    name: ''
                })
            },
            removeSizeContent(index) {
                this.form.sizes.splice(index, 1)
            },
            getBrands() {
                let self = this
                this._fetch("/l/brand", {}).then(function (res) {
                    res.data.forEach(item => {
                        let title = item.name_en

                        self.brands.push({
                            id: item.id,
                            title: title
                        })
                    })
                })
            },
            getBrandgroups() {
                let self = this
                this._fetch("/l/brandgroup", {}).then(function (res) {
                    let language = showLabel('lang')
                    let name = 'name_' + language

                    res.data.forEach(item => {
                        let title = item[name]

                        self.brandgroups.push({
                            id: item.id,
                            title: title
                        })
                    })
                })
            },
            getBrandgroupchildren() {
                let self = this
                this._fetch("/l/brandgroupchild", {}).then(function (res) {
                    let language = showLabel('lang')
                    let name = 'name_' + language

                    res.data.forEach(item => {
                        let title = item[name]

                        self.brandgroupchildren.push({
                            id: item.id,
                            title: title,
                            brandgroup_id: item.brandgroupid
                        })
                    })
                })
            },
            getGenders() {
                this.genders = []
                let self = this
                this._fetch("/common/genders", {}).then(function (res) {
                    for (let index = 1; index < 7; index++) {
                        self.genders.push({
                            id: index,
                            title: res.data[index]
                        })
                    }
                })
            }
        },
        watch: {
            sizetopid(newValue) {
                this.selected = newValue
            },
            // 品类
            'form.brandgroup_id'(newValue, oldValue) {
                // 如果品类变化，则子品类清空，重新选择
                // 第一次进入的时候 oldValue 为空，这个时候数据正常，所以需要排除掉第一次
                if (oldValue !== '') {
                    this.form.brandgroupchild_id = ''
                }

            }
        },
        mounted() {
            this.selected = this.sizetopid
            this.getBrands()
            this.getBrandgroups()
            this.getBrandgroupchildren()
            this.getGenders()
        }
    }
</script>

<style scoped>
  .el-input {
    width: 200px;
  }
</style>
