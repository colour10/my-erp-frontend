<template>
  <div>
    <!-- 创建按钮 start -->
    <el-button type="primary" size="mini" @click="handleCreate">{{ showLabel('button-create') }}</el-button>
    <!-- 创建按钮 end -->

    <!-- 数据列表 start -->
    <el-table v-loading="listLoading" :data="list" border stripe>
      <!-- 操作按钮 start -->
      <el-table-column :label="showLabel('caozuo')" align="center" class-name="small-padding fixed-width" width="160">
        <template slot-scope="{row}">
          <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
        </template>
      </el-table-column>
      <!-- 操作按钮 end -->

      <!-- 品类 start -->
      <el-table-column :label="showLabel('pinlei')" prop="brandgroup" width="100"></el-table-column>
      <!-- 品类 end -->

      <!-- 子品类 start -->
      <el-table-column :label="showLabel('zipinlei')" prop="brandgroupchild" width="100"></el-table-column>
      <!-- 子品类 end -->

      <!-- 性别 start -->
      <el-table-column :label="showLabel('xingbie')" prop="gender" width="100"></el-table-column>
      <!-- 性别 end -->

      <!-- 尺码组 start -->
      <el-table-column :label="showLabel('chimazu')" prop="sizetop"></el-table-column>
      <!-- 尺码组 end -->
    </el-table>
    <!-- 数据列表 end -->

    <!-- 对话框 start -->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :center="true"
      :modal="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="400px">
      <el-form ref="form" :model="form" label-width="80px" size="mini" :rules="rules" :show-message="false">
        <!-- 品类 start -->
        <el-form-item :label="showLabel('pinlei')" prop="brandgroup_id">
          <el-select v-model="form.brandgroup_id" placeholder="">
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
          <el-select v-model="form.brandgroupchild_id" placeholder="">
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
          <el-select v-model="form.gender" placeholder="">
            <el-option
              v-for="item of genders"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 性别 end -->

        <!-- 尺码组 start -->
        <el-form-item :label="showLabel('chimazu')" prop="sizetop_id">
          <el-select v-model="form.sizetop_id" placeholder="">
            <el-option
              v-for="item of sizetops"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 尺码组 end -->

        <!-- 保存+取消 按钮 start -->
        <el-row>
          <el-col :span="24" style="text-align:center;">
            <el-button type="primary" size="mini" @click="submit">{{ showLabel('baocun') }}</el-button>
            <el-button type="primary" size="mini" @click="cancel">{{ showLabel('quxiao') }}</el-button>
          </el-col>
        </el-row>
        <!-- 保存+取消 按钮 end -->
      </el-form>
    </el-dialog>
    <!-- 对话框 end -->
  </div>
</template>

<script>
    import {showLabel} from '@/component/globals'

    const defaultForm = {
        brand_id: '',
        brandgroup_id: '',
        brandgroupchild_id: '',
        gender: '',
        sizetop_id: ''
    }

    export default {
        name: 'size',
        props: {
            brandid: {
                type: Number
            }
        },
        data() {
            return {
                id: 0,
                list: [],
                listLoading: false,
                rules: {
                    'brandgroup_id': [{required: true, message: showLabel('pinlei') + showLabel('required')}],
                    'brandgroupchild_id': [{required: true, message: showLabel('zipinlei') + showLabel('required')}],
                    'gender': [{required: true, message: showLabel('xingbie') + showLabel('required')}],
                    'sizetop_id': [{required: true, message: showLabel('chimazu') + showLabel('required')}]
                },
                sizetops: [],
                genders: [],
                brandgroupchildren: [],
                brandgroups: [],
                form: Object.assign({}, defaultForm),
                dialogTitleMap: {
                    create: showLabel('xinjian') + showLabel('chimazu'),
                    update: showLabel('bianji') + showLabel('chimazu'),
                },
                dialogStatus: '',
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
        methods: {
            // 获取当前选中行的信息
            getInfo() {
                let self = this
                this._fetch("/brand/sizeInfo", {id: this.id}).then(function (res) {
                    self.form.brandgroup_id = res.data.brandgroup_id
                    self.form.brandgroupchild_id = res.data.brandgroupchild_id
                    self.form.gender = parseInt(res.data.gender)
                    self.form.sizetop_id = res.data.sizetop_id
                })
            },
            // 更新逻辑
            handleUpdate(row) {
                this.id = row.id
                this.dialogStatus = 'update'
                this.getInfo()
                this.showDialogForm()
            },
            // 重新获取列表
            getList() {
                this.list = []
                let self = this
                this.listLoading = true
                this._fetch("/brand/sizes", {brand_id: this.brandid}).then(function (res) {
                    self.list = res.data
                    self.listLoading = false
                })
            },
            // 重新载入列表
            reloadList() {
                this.getList()
            },
            // 提交
            submit() {
                let self = this
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        self.form.brand_id = self.brandid
                        self._submit("/brand/addSize", self.form).then(function (res) {
                            self.hideDialogForm()
                            self.reloadList()
                        })
                    }
                })
            },
            // 取消操作
            cancel() {
                this.hideDialogForm()
            },
            // 重置 form 表单
            resetDialogForm() {
                let self = this
                self.form.brandgroup_id = ""
                self.form.brandgroupchild_id = ""
                self.form.gender = ""
                self.form.sizetop_id = ""
            },
            // 新建对话框，点击这个按钮的时候所有的数据清空，全部让用户重新选择
            handleCreate() {
                this.resetDialogForm()
                this.id = 0
                this.dialogStatus = 'create'
                this.showDialogForm()
            },
            // 显示对话框
            showDialogForm() {
                this.dialogFormVisible = true
            },
            // 隐藏对话框，这里执行一个额外的逻辑，那就是表单内容清空
            hideDialogForm() {
                this.dialogFormVisible = false
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
            },
            getSizetops() {
                let self = this
                this.sizetops = []
                this._fetch("/l/sizetop", {}).then(function (res) {

                    res.data.forEach(item => {
                        self.sizetops.push({
                            id: item.id,
                            title: item.name_cn
                        })
                    })
                })
            }
        },
        watch: {
            brandid(newValue) {
                if (newValue > 0) {
                    this.getList()
                }
            }
        },
        mounted() {
            this.getList()
            this.getBrandgroups()
            this.getBrandgroupchildren()
            this.getGenders()
            this.getSizetops()
        }
    }
</script>
