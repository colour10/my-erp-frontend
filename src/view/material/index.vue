<template>
    <div>
        <div class="filter-container">
            <el-form :model="listQuery" size="mini" :inline="true">
                <el-form-item>
                    <el-input size="mini" v-model="listQuery.keyword" style="width: 200px;" @keyup.enter.native="handleFilter" />
                </el-form-item>

                <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
                    {{ showLabel('search') }}
                </el-button>

                <el-button class="filter-item" style="margin-left: 10px;" type="success" size="mini" icon="el-icon-edit" @click="handleCreate">
                    {{ showLabel('button-create') }}
                </el-button>
            </el-form>
        </div>
        <el-table v-loading="listLoading" :data="list" border stripe @sort-change="handleSort">
            <el-table-column :label="showLabel('caozuo')" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
                    <el-button type="primary" size="mini" @click="handlMaterialnote(row)">{{ showLabel('caizhibeizhu') }}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="showLabel('name', 'cn')" align="center" width="110" sortable="custom" prop="name_cn"></el-table-column>
            <el-table-column :label="showLabel('name', 'en')" align="center" width="180" sortable="custom" prop="name_en"></el-table-column>
            <el-table-column :label="showLabel('name', 'it')" align="center" width="210" sortable="custom" prop="name_it"></el-table-column>
            <el-table-column :label="showLabel('caizhibeizhu')" prop="materialnotes"></el-table-column>
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

        <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible" :center="true" width="400px" :modal="false">
            <materialform @cancel="hideDialogForm" @reloadList="reloadList" :id="id"></materialform>
        </el-dialog>

        <el-dialog :title="dialogMaterialnoteTitle" :visible.sync="dialogMaterialnoteVisible" width="700px">
            <el-transfer ref="transfer"
                filterable
                v-model="materialnoteids"
                :data="materialnotes"
                :titles="['未关联', '已关联']"
            ></el-transfer>

            <div slot="footer" class="dialog-footer">
                <el-button @click="hideDialogMaterialnote">
                    {{ showLabel('quxiao') }}
                </el-button>
                <el-button type="primary" @click="saveMaterialnoteids">
                    {{ showLabel('baocun') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import globals, { showLabel } from '@/component/globals.js'
import _ from 'lodash'
import materialform from './form.vue'

export default {
    name: 'material',
    components: { materialform },
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
        saveMaterialnoteids() {
            let self = this
            let params = {
                id: this.id,
                materialnoteids: this.materialnoteids
            }
            this._submit("/material/saveMaterialnoteids", params).then(function() {
                self.hideDialogMaterialnote()
            })
        },
        getMaterialnotes() {
            if (this.materialnotes.length == 0) {
                let self = this
                this._fetch("/l/materialnote", {}).then(function(res) {
                    let language = showLabel('lang')
                    let content = 'content_' + language
                    res.data.forEach(function(item) {
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
        handlMaterialnote(row) {
            this.id = row.id
            let language = showLabel('lang')
            let name = 'name_' + language
            this.dialogMaterialnoteTitle = row[name] + ' - ' + showLabel('caizhibeizhu')

            this.showDialogMaterialnote()
            this.getMaterialnotes()
            console.log(row.materialnoteids)
            this.materialnoteids = _.isEmpty(row.materialnoteids) ? [] : row.materialnoteids.split(',')
            console.log(this.materialnoteids)

            this.$refs.transfer.$children["0"]._data.query = ''
            this.$refs.transfer.$children["3"]._data.query = ''
        },
        showDialogMaterialnote() {
            this.dialogMaterialnoteVisible = true
        },
        hideDialogMaterialnote() {
            this.dialogMaterialnoteVisible = false
        },
        handleDelete(row) {
            let self = this
            self._remove("/material/delete/", {id: row.id}).then(function() {
                self.reloadList()
            })
        },
        handleFilter() {
            this.getList()
        },
        handleUpdate(row) {
            this.id = row.id
            this.dialogStatus = 'update'
            this.showDialogForm()
        },
        hideDialogForm() {
            this.dialogFormVisible = false
        },
        showDialogForm() {
            this.dialogFormVisible = true
        },
        handleCreate() {
            this.id = 0
            this.dialogStatus = 'create'
            this.showDialogForm()
        },
        handleSort(data) {
            this.listQuery.sort = data.prop
            this.listQuery.order = data.order
            this.getList()
        },
        getList() {
            this.listLoading = true

            let self = this
            let params = Object.assign({
                page: self.pagination.current,
                pageSize: self.pagination.pageSize
            }, self.listQuery)
            self._fetch("/material/page", params).then(function(res) {
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