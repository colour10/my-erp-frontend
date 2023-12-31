<template>
  <div>
    <!-- 搜索+新建 start -->
    <div class="filter-container">
      <el-input size="mini" v-model="listQuery.keyword" style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleFilter"/>
      <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
        {{ showLabel('search') }}
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-edit"
                 @click="handleCreate">
        {{ showLabel('button-create') }}
      </el-button>
    </div>
    <!-- 搜索+新建 end -->

    <!-- 数据列表 start -->
    <el-table v-loading="listLoading" :data="list" @sort-change="handleSort" border stripe>
      <el-table-column :label="showLabel('caozuo')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('name', 'cn')" align="center" width="110" sortable="custom" prop="name_cn">
        <template slot-scope="{row}">
          <span>{{ row.name_cn }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('name', 'en')" align="center" width="180" sortable="custom" prop="name_en">
        <template slot-scope="{row}">
          <span>{{ row.name_en }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('name', 'it')" align="center" width="210" sortable="custom" prop="name_it">
        <template slot-scope="{row}">
          <span>{{ row.name_it }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('xuhao')" align="center" sortable="custom" prop="displayindex">
        <template slot-scope="{row}">
          <span>{{ row.displayindex }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('zipinlei')" align="center">
        <template slot-scope="{row}">
          <el-link type="primary" @click.stop="handleBrand(row)">{{ showLabel('zipinlei') }}</el-link>
        </template>
      </el-table-column>
    </el-table>
    <!-- 数据列表 start -->

    <!-- 分页 start -->
    <el-pagination v-if="list.length<pagination.total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagination.current*1"
                   :page-sizes="pagination.pageSizes"
                   :page-size="pagination.pageSize*1"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pagination.total*1">
    </el-pagination>
    <!-- 分页 end -->

    <!-- 新建 start -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="400px">
      <el-form ref="dataForm" :rules="rules" :model="postForm" label-position="left" label-width="80px"
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
        <el-form-item :label="showLabel('xuhao')" prop="displayindex">
          <el-input type="number" v-model="postForm.displayindex"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ showLabel('quxiao') }}
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          {{ showLabel('baocun') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 新建 end -->

    <!-- 子品类关联 start -->
    <el-dialog :title="brandDialogTitle" :visible.sync="dialogBrandVisible" width="700px">
      <el-transfer ref="brandTransfer"
                   filterable
                   v-model="productmemoBrands"
                   :data="brands"
                   :props="{key: 'id', label: 'name_cn'}"
                   :titles="['未关联', '已关联']"
      ></el-transfer>

      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialogBrand">
          {{ showLabel('quxiao') }}
        </el-button>
        <el-button type="primary" @click="saveProductmemoBrand()">
          {{ showLabel('baocun') }}
        </el-button>
      </div>
    </el-dialog>
    <!-- 子品类关联 end -->
  </div>
</template>

<script>
    import globals, {showLabel} from '../globals.js'
    import '../../assets/table.css'

    const defaultForm = {
        id: undefined,
        name_cn: '',
        name_en: '',
        name_it: '',
        displayindex: ''
    }

    export default {
        name: 'productmemo',
        data() {
            return {
                list: [],
                listQuery: {
                    keyword: undefined,
                    sort: undefined,
                    order: undefined
                },
                pagination: {
                    pageSizes: globals.pageSizes,
                    pageSize: 10,
                    total: 0,
                    current: 1
                },
                listLoading: true,
                dialogStatus: '',
                dialogFormVisible: false,
                textMap: {
                    update: showLabel('xiugaixinxi'),
                    create: showLabel('tianjiaxinxi')
                },
                postForm: Object.assign({}, defaultForm),
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
                    displayindex: [{
                        required: true,
                        message: showLabel('xuhao') + showLabel('required'),
                        trigger: 'blur'
                    }]
                },
                brandDialogTitle: '',
                dialogBrandVisible: false,
                productmemoBrands: [],  // 已选中的子品类id
                brands: [],
                productmemo_id: 0
            }
        },
        created() {
            this.getList()
            this.getBrands()
        },
        methods: {
            // 子品类关联保存逻辑
            saveProductmemoBrand() {
                let self = this
                if (this.productmemoBrands.length > 0) {
                    let params = {
                        productmemo_id: self.productmemo_id,
                        brands: self.productmemoBrands
                    }
                    self._submit("/productmemo/saveProductmemoBrand", params).then(function () {
                        self.hideDialogBrand()
                    })
                } else {
                    this.hideDialogBrand()
                }
            },
            // 获取商品描述 id 对应的子品类 id 列表
            getProductmemoBrand() {
                let self = this
                let params = {productmemo_id: self.productmemo_id}
                self._fetch("/productmemo/getProductmemoBrandgroupchild", params).then(function (res) {
                    self.productmemoBrands = []
                    res.data.forEach(item => {
                        self.productmemoBrands.push(item.brandgroupchild_id)
                    })
                })
            },
            // 获取子品类列表
            getBrands() {
                let self = this
                self._fetch("/l/brandgroupchild", {}).then(function (res) {
                    self.brands = res.data
                })
            },
            // 打开子品类对话框
            handleBrand(row) {
                this.productmemo_id = row.id

                let language = showLabel('lang')
                let name = 'name_' + language
                this.brandDialogTitle = row[name] + ' - ' + showLabel('zipinlei')

                this.showDialogBrand()
                this.getProductmemoBrand()

                // $children 有可能是 undefined，这里要先做个判断
                if (this.$refs.brandTransfer !== undefined) {
                    this.$refs.brandTransfer.$children["0"]._data.query = ''
                    this.$refs.brandTransfer.$children["3"]._data.query = ''
                }
            },
            // 创建逻辑
            handleCreate() {
                this.dialogStatus = 'create'
                this.resetDialogForm()
                this.showDialogForm()
            },
            // 更新逻辑
            handleUpdate(row) {
                Object.assign(this.postForm, row)
                this.dialogStatus = 'update'
                this.showDialogForm()
            },
            // 删除逻辑
            handleDelete(row) {
                this.deleteData(row.id)
            },
            // 修改排序规则
            handleSort(data) {
                this.listQuery.sort = data.prop
                this.listQuery.order = data.order
                this.getList()
            },
            // 搜索逻辑
            handleFilter() {
                this.pagination.current = 1
                this.getList()
            },
            // 切换每页显示条数
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.getList()
            },
            // 切换页码
            handleCurrentChange(current) {
                this.pagination.current = current
                this.getList()
            },
            // 获取数据列表
            getList() {
                let self = this
                self.listLoading = true

                let params = Object.assign({
                    page: self.pagination.current,
                    pageSize: self.pagination.pageSize
                }, self.listQuery)
                self._fetch("/productmemo/page", params).then(function (res) {
                    self.list = res.data
                    self.pagination = res.pagination
                    self.listLoading = false
                })
            },
            // 重新获取数据列表
            reloadList() {
                this.getList()
            },
            // 创建逻辑
            createData() {
                let self = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        self._submit("/productmemo/add", self.postForm).then(function () {
                            self.hideDialogForm()
                            self.reloadList()
                        })
                    }
                })
            },
            // 更新逻辑
            updateData() {
                let self = this
                this.$refs['dataForm'].validate((valid) => {
                    if (valid) {
                        self._submit("/productmemo/edit", self.postForm).then(function () {
                            self.hideDialogForm()
                            self.reloadList()
                        })
                    }
                })
            },
            // 删除逻辑
            deleteData(id) {
                let self = this
                self._remove("/productmemo/delete", {id: id}).then(function () {
                    self.reloadList()
                })
            },
            // 表单重置
            resetDialogForm() {
                this.postForm = Object.assign({}, defaultForm)
            },
            // 显示表单
            showDialogForm() {
                this.dialogFormVisible = true
            },
            // 隐藏子品类关联表单
            hideDialogForm() {
                this.dialogFormVisible = false
            },
            // 显示子品类关联表单
            showDialogBrand() {
                this.dialogBrandVisible = true
            },
            // 取消操作逻辑
            hideDialogBrand() {
                this.dialogBrandVisible = false
                this.productmemoBrands = []
            }
        }
    }
</script>

