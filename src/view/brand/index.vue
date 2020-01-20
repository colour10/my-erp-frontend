<template>
    <div>
        <div class="filter-container">
            <el-form :model="listQuery" size="mini" :inline="true">
                <el-form-item :label="showLabel('pinpaimingcheng')">
                    <el-input size="mini" v-model="listQuery.name_en" style="width: 200px;" @keyup.enter.native="handleFilter" />
                </el-form-item>

                <el-form-item :label="showLabel('guishuguojia')">
                    <el-select v-model="listQuery.countryid" multiple >
                        <el-option
                            v-for="item of countries"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-button class="filter-item" type="default" size="mini" icon="el-icon-refresh-right" @click="handleResetFilter">
                        {{ showLabel('qingkong') }}
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
                        {{ showLabel('search') }}
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" style="margin-left: 10px;" type="success" size="mini" icon="el-icon-edit" @click="handleCreate">
                        {{ showLabel('button-create') }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-loading="listLoading" :data="list" @sort-change="handleSort" border stripe>
            <el-table-column :label="showLabel('caozuo')" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="LOGO">
                        <template slot-scope="{row}">
                            <img :src="_fileLink(row.filename)" style="max-width: 50px; max-height: 50px;">
                        </template>
            </el-table-column>
            <el-table-column :label="showLabel('pinpaimingcheng')" prop="name_en" sortable="customer" width="200"></el-table-column>
            <el-table-column :label="showLabel('guishuguojia')" prop="country" width="200"></el-table-column>
        </el-table>

        <el-pagination v-if="list.length<pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current*1"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize*1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total*1">
        </el-pagination>

        <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible" :center="true" width="500" :modal="false">
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleTabClick">
                <el-tab-pane :label="_label('jibenziliao')" name="info">
                    <brandform @cancel="hideDialogForm" @reloadList="reloadList" :id="id"></brandform>
                </el-tab-pane>
                <el-tab-pane :label="_label('bieming')" name="aliases" :disabled="id==0">
                    <multiple-admin-page v-bind="aliases"></multiple-admin-page>
                </el-tab-pane>
                <el-tab-pane :label="_label('xilie')" name="xilie" :disabled="id==0">
                    <multiple-admin-page v-bind="series"></multiple-admin-page>
                </el-tab-pane>
                <el-tab-pane :label="_label('beilv')" name="beilv" :disabled="id==0">
                    <simple-admin-page v-bind="brandrate">
                        <template v-slot="scope">
                            <el-form class="user-form" :model="scope.form" label-width="100px" :inline="false" size="mini">
                                <el-form-item :label="_label('pinlei')">
                                    <simple-select v-show="scope.action=='add'" v-model="scope.form.brandgroupid" source="brandgroup" :multiple="true" class="width2"></simple-select>
                                    <simple-select v-show="scope.action=='edit'" v-model="scope.form.brandgroupid" source="brandgroup" class="width2"></simple-select>
                                </el-form-item>

                                <el-form-item :label="_label('niandaijijie')">
                                    <simple-select v-model="scope.form.ageseasonid" source="ageseason" class="width2"></simple-select>
                                </el-form-item>

                                <el-form-item :label="_label('beilv')">
                                    <el-input @keyup.enter.native="onSubmit" v-model="scope.form.rate" size="mini" class="width2"></el-input>
                                </el-form-item>
                            </el-form>
                        </template>
                    </simple-admin-page>
                </el-tab-pane>
                <el-tab-pane :label="_label('jiageshezhi')" name="price" :disabled="id==0">
                    <sp-pricesetting :brandid="id"></sp-pricesetting>
                </el-tab-pane>
                <el-tab-pane :label="_label('guojima')" name="worldcode" :disabled="id==0">
                    <worldcode :id="id" @cancel="hideDialogForm" ref="worldcode"></worldcode>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import globals, { showLabel } from '../../component/globals.js'
import { getProp } from "@/component/prop.js"
import brandform from './form.vue'
import worldcode from './worldcode.vue'

export default {
    name: 'brand',
    components: { brandform, worldcode },
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
            this._fetch("/brand/countries", {}).then(function(res) {
                self.countries = res.data
            })
        },
        handleFilter() {
            this.getList()
        },
        handleDelete() {
            let self = this
            self._remove("/brand/delete/", {id: self.id}).then(function() {
                self.reloadList()
            })
        },
        handleUpdate(row) {
            this.id = row.id
            this.brandrate.base.brandid = row.id
            this.aliases.base.brandid = row.id
            this.series.base.brandid = row.id
            this.dialogStatus = 'update'
            this.activeName = 'info'
            this.showDialogForm()
        },
        handleCreate() {
            this.id = 0
            this.dialogStatus = 'create'
            this.activeName = 'info'
            this.showDialogForm()
        },
        showDialogForm() {
            this.dialogFormVisible = true
        },
        hideDialogForm() {
            this.dialogFormVisible = false
        },
        getList() {
            let self = this
            self.listLoading = true

            let params = Object.assign({
                page: self.pagination.current,
                pageSize: self.pagination.pageSize
            }, self.listQuery)
            self._fetch("/brand/page", params).then(function(res) {
                self.list = res.data
                self.pagination = res.pagination
                self.listLoading = false
            })
        },
        reloadList() {
            this.getList()
        },
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