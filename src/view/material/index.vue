<template>
  <div>
    <!-- 搜索+新建 start -->
    <div class="filter-container">
      <el-form :model="listQuery" size="mini" :inline="true">
        <el-form-item>
          <el-input size="mini" v-model="listQuery.keyword" style="width: 200px;" @keyup.enter.native="handleFilter"/>
        </el-form-item>

        <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
          {{ showLabel('search') }}
        </el-button>

        <el-button class="filter-item" style="margin-left: 10px;" type="success" size="mini" icon="el-icon-edit"
                   @click="handleCreate">
          {{ showLabel('button-create') }}
        </el-button>
      </el-form>
    </div>
    <!-- 搜索+新建 end -->

    <!-- 数据列表 start -->
    <el-table v-loading="listLoading" :data="list" border stripe @sort-change="handleSort">
      <el-table-column :label="showLabel('caozuo')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
          <!-- 下面的暂时注释，因为放在了最后一个字段上 -->
          <!--          <el-button type="primary" size="mini" @click="handlMaterialnote(row)">{{ showLabel('caizhibeizhu') }}-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('name', 'cn')" align="center" width="110" sortable="custom"
                       prop="name_cn"></el-table-column>
      <el-table-column :label="showLabel('name', 'en')" align="center" width="180" sortable="custom"
                       prop="name_en"></el-table-column>
      <el-table-column :label="showLabel('name', 'it')" align="center" width="210" sortable="custom"
                       prop="name_it"></el-table-column>

      <!-- 添加 code start -->
      <el-table-column :label="showLabel('code')" align="center" width="210" sortable="custom" prop="code">
      </el-table-column>
      <!-- 添加 code end -->

      <!-- 材质备注 start -->
      <el-table-column :label="showLabel('caizhibeizhu')" prop="materialnotes">
        <template slot-scope="{row}">
          <el-link style="font-size: 12px;" type="primary" :underline="false" @click="handlMaterialnote(row)">
            {{_label('caizhibeizhu')}}
          </el-link>
        </template>
      </el-table-column>
      <!-- 材质备注 end -->
    </el-table>
    <!-- 数据列表 end -->

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

    <!-- 新建+编辑对话框 start -->
    <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible" :center="true" width="400px"
               :modal="false">
      <materialform @cancel="hideDialogForm" @reloadList="reloadList" :id="id"></materialform>
    </el-dialog>
    <!-- 新建+编辑对话框 end -->

    <!-- 材质备注对话框 start -->
    <el-dialog :title="dialogMaterialnoteTitle" :visible.sync="dialogMaterialnoteVisible" width="700px">
      <el-transfer ref="transfer"
                   filterable
                   v-model="materialnoteids"
                   :data="materialnotes"
                   :titles="['未关联', '已关联']"
      ></el-transfer>

      <!-- footer 底部 start -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="hideDialogMaterialnote">
          {{ showLabel('quxiao') }}
        </el-button>
        <el-button type="primary" @click="saveMaterialnoteids">
          {{ showLabel('baocun') }}
        </el-button>
      </div>
      <!-- footer 底部 end -->
    </el-dialog>
    <!-- 材质备注对话框 end -->
  </div>
</template>

<script>
    import globals, {showLabel} from '@/component/globals.js'
    import _ from 'lodash'
    import materialform from './form.vue'

    export default {
        name: 'material',
        components: {materialform},
        data() {
            return {
                materialnoteids: [], // 已选中的材质备注id
                materialnotes: [],
                dialogMaterialnoteTitle: '',
                dialogMaterialnoteVisible: false,
                dialogFormVisible: false,
                id: 0,
                dialogStatus: '',
                dialogTitleMap: {
                    create: showLabel('tianjiaxinxi'),
                    update: showLabel('xiugaixinxi')
                },
                pagination: {
                    pageSizes: globals.pageSizes,
                    pageSize: 20,
                    total: 0,
                    current: 1
                },
                listQuery: {
                    keyword: '',
                    sort: '',
                    order: ''
                },
                list: [],
                listLoading: false
            }
        },
        created() {
            this.getList()
        },
        methods: {
            // 保存材质备注关联
            saveMaterialnoteids() {
                let self = this
                let params = {
                    id: this.id,
                    materialnoteids: this.materialnoteids
                }
                this._submit("/material/saveMaterialnoteids", params).then(function () {
                    self.hideDialogMaterialnote()
                    self.reloadList()
                })
            },
            // 获取材质备注列表
            getMaterialnotes() {
                if (this.materialnotes.length === 0) {
                    let self = this
                    this._fetch("/l/materialnote", {}).then(function (res) {
                        let language = showLabel('lang')
                        let content = 'content_' + language
                        res.data.forEach(function (item) {
                            let key = item.id
                            let label = item[content]
                            self.materialnotes.push({
                                key: key,
                                label: label
                            })
                        })
                    })
                }
            },
            // 点击材质备注逻辑
            handlMaterialnote(row) {
                this.id = row.id
                let language = showLabel('lang')
                let name = 'name_' + language
                this.dialogMaterialnoteTitle = row[name] + ' - ' + showLabel('caizhibeizhu')

                this.showDialogMaterialnote()
                this.getMaterialnotes()
                this.materialnoteids = _.isEmpty(row.materialnoteids) ? [] : row.materialnoteids.split(',')

                // $children 有可能是 undefined，这里要先做个判断
                if (this.$refs.transfer !== undefined) {
                    this.$refs.transfer.$children["0"]._data.query = ''
                    this.$refs.transfer.$children["3"]._data.query = ''
                }
            },
            // 显示材质备注对话框
            showDialogMaterialnote() {
                this.dialogMaterialnoteVisible = true
            },
            // 取消 - 隐藏材质备注对话框
            hideDialogMaterialnote() {
                this.dialogMaterialnoteVisible = false
            },
            // 删除逻辑
            handleDelete(row) {
                let self = this
                self._remove("/material/delete/", {id: row.id}).then(function () {
                    self.reloadList()
                })
            },
            // 点击搜索
            handleFilter() {
                this.getList()
            },
            // 更新逻辑
            handleUpdate(row) {
                this.id = row.id
                this.dialogStatus = 'update'
                this.showDialogForm()
            },
            // 隐藏-新建+编辑对话框
            hideDialogForm() {
                this.dialogFormVisible = false
            },
            // 显示-新建+编辑对话框
            showDialogForm() {
                this.dialogFormVisible = true
            },
            // 新建逻辑
            handleCreate() {
                this.id = 0
                this.dialogStatus = 'create'
                this.showDialogForm()
            },
            // 排序逻辑
            handleSort(data) {
                this.listQuery.sort = data.prop
                this.listQuery.order = data.order
                this.getList()
            },
            // 获取数据列表
            getList() {
                this.listLoading = true

                let self = this
                let params = Object.assign({
                    page: self.pagination.current,
                    pageSize: self.pagination.pageSize
                }, self.listQuery)
                self._fetch("/material/page", params).then(function (res) {
                    self.list = res.data
                    self.pagination = res.pagination
                    self.listLoading = false
                })
            },
            // 重新获取数据列表
            reloadList() {
                this.getList()
            },
            // 分页相关，切换每页显示条数
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.getList()
            },
            // 分页相关，切换当前页码
            handleCurrentChange(current) {
                this.pagination.current = current
                this.getList()
            }
        }
    }
</script>
