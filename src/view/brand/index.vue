<template>
  <div>
    <div class="filter-container">
      <el-form :model="listQuery" size="mini" :inline="true">
        <!-- 品牌名称 start -->
        <el-form-item :label="showLabel('pinpaimingcheng')">
          <el-input size="mini" v-model="listQuery.name_en" style="width: 200px;" @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <!-- 品牌名称 end -->

        <!-- 归属国家 start -->
        <el-form-item :label="showLabel('guishuguojia')">
          <el-select v-model="listQuery.countryid" multiple>
            <el-option
              v-for="item of countries"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 归属国家 end -->

        <!-- 清空 start -->
        <el-form-item>
          <el-button class="filter-item" type="default" size="mini" icon="el-icon-refresh-right"
                     @click="handleResetFilter">
            {{ showLabel('qingkong') }}
          </el-button>
        </el-form-item>
        <!-- 清空 end -->

        <!-- 搜索 start -->
        <el-form-item>
          <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
            {{ showLabel('search') }}
          </el-button>
        </el-form-item>
        <!-- 搜索 end -->

        <!-- 新建 start -->
        <el-form-item>
          <el-button class="filter-item" style="margin-left: 10px;" type="success" size="mini" icon="el-icon-edit"
                     @click="handleCreate">
            {{ showLabel('button-create') }}
          </el-button>
        </el-form-item>
        <!-- 新建 end -->
      </el-form>
    </div>

    <!-- 数据列表 start -->
    <el-table v-loading="listLoading" :data="list" @sort-change="handleSort" border stripe>
      <el-table-column :label="showLabel('caozuo')" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <!-- 编辑+删除 按钮 start -->
          <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
          <!-- 编辑+删除 按钮 end -->
        </template>
      </el-table-column>
      <el-table-column label="LOGO">
        <template slot-scope="{row}">
          <img :src="_fileLink(row.filename)" style="max-width: 50px; max-height: 50px;">
        </template>
      </el-table-column>
      <el-table-column :label="showLabel('pinpaimingcheng')" prop="name_en" sortable="custom"
                       width="200"></el-table-column>
      <el-table-column :label="showLabel('guishuguojia')" prop="country" width="200"></el-table-column>
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

    <!-- 编辑对话框 start -->
    <el-dialog
      :title="dialogTitleMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      :center="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false">
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick">
        <!-- 基本资料 start -->
        <el-tab-pane :label="_label('jibenziliao')" name="info">
          <brandform @cancel="hideDialogForm" @reloadList="reloadList" :id="id"></brandform>
        </el-tab-pane>
        <!-- 基本资料 end -->

        <!-- 别名 start -->
        <el-tab-pane :label="_label('bieming')" name="aliases" :disabled="id==0">
          <multiple-admin-page v-bind="aliases"></multiple-admin-page>
        </el-tab-pane>
        <!-- 别名 end -->

        <!-- 系列 start -->
        <el-tab-pane :label="_label('xilie')" name="xilie" :disabled="id==0">
          <multiple-admin-page v-bind="series"></multiple-admin-page>
        </el-tab-pane>
        <!-- 系列 end -->

        <!-- 倍率 start -->
        <el-tab-pane :label="_label('beilv')" name="beilv" :disabled="id==0">
          <!-- 表头数据从 prop.js 中的 brandrate 获取 -->
          <simple-admin-page v-bind="brandrate">
            <template v-slot="scope">
              <el-form class="user-form" :model="scope.form" label-width="100px" :inline="false" size="mini">
                <!-- 品类 start -->
                <el-form-item :label="_label('pinlei')">
                  <simple-select v-show="scope.action=='add'" v-model="scope.form.brandgroupid" source="brandgroup"
                                 :multiple="true" class="width2"></simple-select>
                  <simple-select v-show="scope.action=='edit'" v-model="scope.form.brandgroupid" source="brandgroup"
                                 class="width2"></simple-select>
                </el-form-item>
                <!-- 品类 end -->

                <!-- 年代季节 start -->
                <el-form-item :label="_label('niandaijijie')">
                  <simple-select v-model="scope.form.ageseasonid" source="ageseason" class="width2"></simple-select>
                </el-form-item>
                <!-- 年代季节 end -->

                <!-- 倍率 start -->
                <el-form-item :label="_label('beilv')">
                  <el-input @keyup.enter.native="onSubmit" v-model="scope.form.rate" size="mini"
                            class="width2"></el-input>
                </el-form-item>
                <!-- 倍率 end -->
              </el-form>
            </template>
          </simple-admin-page>
        </el-tab-pane>
        <!-- 倍率 end -->

        <!-- 价格设置 start -->
        <el-tab-pane :label="_label('jiageshezhi')" name="price" :disabled="id==0">
          <sp-pricesetting :brandid="id"></sp-pricesetting>
        </el-tab-pane>
        <!-- 价格设置 end -->

        <!-- 国际码 start -->
        <el-tab-pane :label="_label('guojima')" name="worldcode" :disabled="id==0">
          <worldcode :id="id" @cancel="hideDialogForm" ref="worldcode"></worldcode>
        </el-tab-pane>
        <!-- 国际码 end -->

        <!-- 尺码组 start -->
        <el-tab-pane :label="showLabel('chimazu')" name="size" :disabled="id==0">
          <size :brandid="id"></size>
        </el-tab-pane>
        <!-- 尺码组 end -->
      </el-tabs>
    </el-dialog>
    <!-- 编辑对话框 end -->
  </div>
</template>

<script>
    import globals, {showLabel} from '../../component/globals.js'
    import {getProp} from "@/component/prop.js"
    import brandform from './form.vue'
    import worldcode from './worldcode.vue'
    import size from './size.vue'

    export default {
        name: 'brand',
        components: {brandform, worldcode, size},
        data() {
            return {
                countries: [],
                dialogStatus: '',
                dialogTitleMap: {
                    create: showLabel('tianjiaxinxi'),
                    update: showLabel('xiugaixinxi')
                },
                brandrate: getProp('brandrate'),
                aliases: getProp('aliases'),
                series: getProp('series'),
                id: 0,
                activeName: "info",
                dialogFormVisible: false,
                listLoading: false,
                list: [],
                pagination: {
                    pageSizes: globals.pageSizes,
                    pageSize: 10,
                    total: 0,
                    current: 1
                },
                listQuery: {
                    name_en: '',
                    countryid: '',
                    sort: '',
                    order: ''
                }
            }
        },
        created() {
            this.getList()
            this.getCountries()
        },
        methods: {
            handleTabClick(tab) {
                let self = this

                switch (tab.name) {
                    case 'worldcode':
                        self.$refs.worldcode.getSetting()
                        break
                }
            },
            handleSort(data) {
                this.listQuery.sort = data.prop
                this.listQuery.order = data.order
                this.getList()
            },
            handleResetFilter() {
                this.listQuery = {
                    name_en: '',
                    countryid: ''
                }
            },
            getCountries() {
                let self = this
                this._fetch("/brand/countries", {}).then(function (res) {
                    self.countries = res.data
                })
            },
            handleFilter() {
                this.getList()
            },
            // 删除品牌
            handleDelete(row) {
                let self = this
                self._remove("/brand/delete/", {id: row.id}).then(function () {
                    self.reloadList()
                })
            },
            // 更新逻辑
            handleUpdate(row) {
                this.id = parseInt(row.id)
                this.brandrate.base.brandid = row.id
                this.aliases.base.brandid = row.id
                this.series.base.brandid = row.id
                this.dialogStatus = 'update'
                this.activeName = 'info'
                this.showDialogForm()
            },
            // 新建
            handleCreate() {
                this.id = 0
                this.dialogStatus = 'create'
                this.activeName = 'info'
                this.showDialogForm()
            },
            // 显示对话框
            showDialogForm() {
                this.dialogFormVisible = true
            },
            // 隐藏对话框
            hideDialogForm() {
                this.dialogFormVisible = false
            },
            // 获取品牌列表
            getList() {
                let self = this
                self.listLoading = true

                let params = Object.assign({
                    page: self.pagination.current,
                    pageSize: self.pagination.pageSize
                }, self.listQuery)
                self._fetch("/brand/page", params).then(function (res) {
                    self.list = res.data
                    self.pagination = res.pagination
                    self.listLoading = false
                })
            },
            // 重新加载品牌列表
            reloadList() {
                this.getList()
            },

            // 下面两个方法是和分页有关的
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.getList()
            },
            handleCurrentChange(current) {
                this.pagination.current = current
                this.getList()
            }
        }
    }
</script>
