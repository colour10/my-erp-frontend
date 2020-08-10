<template>
  <div>
    <el-button type="primary" size="mini" @click="handleColorSystemCreate">{{_label('button-create')}}</el-button>

    <!-- 色系列表 start -->
    <el-table
      :data="colorsystems"
      stripe
      border
      style="width: 100%">
      <el-table-column :label="showLabel('caozuo')" align="center" width="230"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="default" size="mini" @click="handleColorSystemUpdate(row)">{{ showLabel('bianji')
            }}
          </el-button>
          <el-button type="danger" size="mini" @click="handleColorSystemDelete(row)">{{ showLabel('shanchu')
            }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('name', 'cn')" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('son-colors')" width="110px" align="center">
        <template slot-scope="{row}">
          <el-link style="font-size: 12px;" type="primary" :underline="false" @click="handleColorsView(row)">
            {{_label('chakanziji')}}
          </el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 色系列表 end -->

    <!-- 编辑色系对话框 start -->
    <el-dialog :title="textMap[dialogColorSystemStatus]" :visible.sync="dialogColorSystemFormVisible" width="400px">
      <el-form ref="dataForm" :rules="rules.colorSystemPostForm" :model="colorSystemPostForm" label-position="left"
               label-width="80px"
               style="width: 300px; margin-left:10px;">
        <el-form-item :label="showLabel('biaoti')" prop="title">
          <el-input v-model="colorSystemPostForm.title"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogColorSystemFormVisible = false">
          {{ showLabel('quxiao') }}
        </el-button>
        <el-button type="primary"
                   @click="dialogColorSystemStatus==='createColorsystem'?createColorSystemData():updateColorSystemData()">
          {{ showLabel('baocun') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 编辑色系对话框 start -->

    <!-- 查看子集对话框 start -->
    <el-dialog :title="dialogColorsTitle" :visible.sync="dialogColorsVisible" :center="true">
      <!-- 搜索 start -->
      <el-row>
        <el-col :span="24">
          <slot name="form">
            <el-form class="searchform" ref="search-form" label-width="80px" size="mini" :inline="true">
              <el-form-item class="searchitem">
                {{_label("search")}}：
                <el-input v-model="searchKeyword" width="250" style="width:250px;"></el-input>
                <asa-button @click="handleCreate()">
                  {{_label("xinjian")}}
                </asa-button>
              </el-form-item>
            </el-form>
          </slot>
        </el-col>
      </el-row>
      <!-- 搜索 end -->

      <el-table
        :data="colors.filter(
          data => !searchKeyword ||
          data.name_cn.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          data.name_en.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          data.code.toLowerCase().includes(searchKeyword.toLowerCase())
        )"
        border
        max-height="500">
        <el-table-column :label="showLabel('caozuo')" align="center">
          <template slot-scope="{row}">
            <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="showLabel('name', 'cn')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name_cn }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="showLabel('name', 'en')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name_en }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="showLabel('name', 'it')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.name_it }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="showLabel('asabianhao')" align="center">
          <template slot-scope="{row}">
            <span>{{ row.code }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 查看子集对话框 end -->

    <!-- 编辑子颜色对话框 start -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="dataForm" :rules="rules.postForm" :model="postForm" label-position="left" label-width="80px"
               style="width: 300px; margin-left:10px;">
        <el-form-item :label="showLabel('name', 'cn')" prop="name_cn">
          <el-input v-model="postForm.name_cn"/>
        </el-form-item>
        <el-form-item :label="showLabel('name', 'en')" prop="name_en">
          <el-input v-model="postForm.name_en"/>
        </el-form-item>
        <el-form-item :label="showLabel('name', 'it')" prop="name_it">
          <el-input v-model="postForm.name_it"/>
        </el-form-item>
        <el-form-item :label="showLabel('asabianhao')" prop="code">
          <el-input v-model="postForm.code"/>
        </el-form-item>
        <el-form-item :label="showLabel('sexi')" prop="brandcolor">
          <el-select v-model="postForm.brandcolor" class="filter-item">
            <el-option v-for="item in colorsystems" :key="item.id" :label="item.title" :value="item.id+''"/>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ showLabel('quxiao') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='createColor'?createData():updateData()">
          {{ showLabel('baocun') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 编辑子颜色对话框 start -->

  </div>
</template>

<script>
    import {showLabel} from '../globals.js'

    // 修改颜色属性字段
    const defaultForm = {
        id: undefined,
        name_cn: '',
        name_en: '',
        name_it: '',
        picture: '',
        code: '',
        brandcolor: ''
    }

    // 修改色系字段
    const defaultColorSystemForm = {
        id: undefined,
        title: '',
    }
    export default {
        name: 'colortemplate',
        data() {
            return {
                activeTab: 'color-1',
                colorsystems: [],
                dialogFormVisible: false,
                // 色系对话框
                dialogColorSystemFormVisible: false,
                // 查看颜色系子集对话框
                dialogColorsVisible: false,
                textMap: {
                    create: showLabel('tianjiaxinxi'),
                    update: showLabel('xiugaixinxi'),
                    createColor: showLabel('create-color'),
                    updateColor: showLabel('edit-color'),
                    createColorsystem: showLabel('create-colorsystem'),
                    updateColorsystem: showLabel('edit-colorsystem')
                },
                postForm: Object.assign({}, defaultForm),

                // 色系
                colorSystemPostForm: Object.assign({}, defaultColorSystemForm),
                // 查看子集名称
                dialogColorsTitle: '',
                // 当前操作的色系
                currentColorSystem: {},
                dialogStatus: '',
                // 色系状态
                dialogColorSystemStatus: '',
                // 待搜索的字符串
                searchKeyword: '',
                rules: {
                    postForm: {
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
                        code: [{
                            required: true,
                            message: showLabel('asabianhao') + showLabel('required'),
                            trigger: 'blur'
                        }],
                        brandcolor: [{
                            required: true,
                            message: showLabel('sexi') + showLabel('required'),
                            trigger: 'change'
                        }],
                    },
                    colorSystemPostForm: {
                        title: [
                            {
                                required: true,
                                message: showLabel('biaoti') + showLabel('required'),
                                trigger: 'blur'
                            }
                        ]
                    }
                },
                //子集数据绑定
                colors: [],
            }
        },
        methods: {
            init() {
                this.getColorSystemAndColor()
            },
            // 获取色系和所有的颜色列表
            getColorSystemAndColor() {
                let self = this
                self._fetch("/color/getColorSystemAndColor", {}).then(function (res) {
                    self.colorsystems = Object.values(res.data)
                })
            },
            // 创建颜色
            handleCreate() {
                this.dialogStatus = 'createColor'
                this.resetDialogForm()
                // 把 brandcolor 拿过来并赋值给当前窗口
                this.postForm.brandcolor = this.currentColorSystem.id + ''
                this.showDialogForm()
            },
            // 更新颜色
            handleUpdate(row) {
                Object.assign(this.postForm, row)
                this.dialogStatus = 'updateColor'
                this.showDialogForm()
            },
            // 添加色系
            handleColorSystemCreate() {
                this.dialogColorSystemStatus = 'createColorsystem'
                this.resetColorSystemDialogForm()
                this.showColorSystemDialogForm()
            },
            // 编辑色系
            handleColorSystemUpdate(row) {
                Object.assign(this.colorSystemPostForm, row)
                this.dialogColorSystemStatus = 'updateColorsystem'
                this.showColorSystemDialogForm()
            },
            // 显示编辑色系对话框
            showColorSystemDialogForm() {
                this.dialogColorSystemFormVisible = true
            },
            // 隐藏编辑色系对话框
            hideColorSystemDialogForm() {
                this.dialogColorSystemFormVisible = false
            },
            // 删除色系
            handleColorSystemDelete(row) {
                this.deleteColorSystemData(row.id)
            },
            // 删除颜色
            handleDelete(row) {
                this.deleteData(row.id)
            },
            // 显示查看色系对话框
            showColorsDialogForm() {
                this.dialogColorsVisible = true
            },
            // 隐藏查看色系对话框
            hideColorsDialogForm() {
                this.dialogColorsVisible = false
            },
            showDialogForm() {
                this.dialogFormVisible = true
            },
            hideDialogForm() {
                this.dialogFormVisible = false
            },
            reloadList() {
                this.getColorSystemAndColor()
            },
            resetDialogForm() {
                this.postForm = Object.assign({}, defaultForm)
            },
            // 重启色系数据
            resetColorSystemDialogForm() {
                this.colorSystemPostForm = Object.assign({}, defaultColorSystemForm)
            },
            // 新增颜色
            createData() {
                let self = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        self._submit("/color/createColor", self.postForm).then(function () {
                            // 刷新接口
                            self.reloadList()
                            // 隐藏对话框
                            self.hideDialogForm()
                        })
                    }
                })
            },
            // 更新颜色
            updateData() {
                let self = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        self._submit("/color/updateColor/" + self.postForm.id, self.postForm).then(function () {
                            self.hideDialogForm()
                            self.reloadList()
                        })
                    }
                })
            },
            // 删除颜色
            deleteData(id) {
                let self = this
                self._remove("/color/deleteColor/" + id, {}).then(function () {
                    self.reloadList()
                })
            },
            // 新增色系，名称不能重复
            createColorSystemData() {
                let self = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        self._submit("/colorsystem/add", self.colorSystemPostForm).then(function () {
                            self.hideColorSystemDialogForm()
                            // 更新色系列表
                            self.reloadList()
                        })
                    }
                })
            },
            // 更新色系
            updateColorSystemData() {
                let self = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        self._submit("/colorsystem/edit", self.colorSystemPostForm).then(function () {
                            self.hideColorSystemDialogForm()
                            // 更新色系列表
                            self.reloadList()
                        })
                    }
                })
            },
            // 删除色系, 只能删除未使用的
            deleteColorSystemData(id) {
                let self = this
                self._remove("/colorsystem/delete", {id: id}).then(function () {
                    self.hideColorSystemDialogForm()
                    // 更新色系列表
                    self.reloadList()
                })
            },
            // 查看颜色子集
            handleColorsView(row) {
                let self = this
                // 标题
                self.dialogColorsTitle = row.title
                // 请求当前色系的子集，直接从接口中
                self.colorsystems.forEach((item) => {
                    if (String(row.id) === String(item.id)) {
                        // 子集列表
                        self.colors = item.colors
                    }
                })
                // 当前色系信息也记录一下
                self.currentColorSystem = row
                // 打开查看子集对话框
                this.showColorsDialogForm()
            },
        },
        mounted() {
            this.init()
        },
        watch: {
            // 如果 colorsystems 发生了变化，那么就重新生成 colors
            colorsystems(newVal) {
                let self = this
                newVal.forEach((item) => {
                    if (String(this.currentColorSystem.id) === String(item.id)) {
                        // 子集列表
                        self.colors = item.colors
                    }
                })
            },
            // 如果查看子集对话框关闭了，则搜索框清空
            dialogColorsVisible(newVal) {
                if (newVal === false) {
                    this.searchKeyword = ''
                }
            }
        }
    }
</script>
