<template>
    <div>
        <div class="filter-container">
            <el-form ref="searchForm" :inline="true" :model="listQuery" size="mini">
                <el-form-item :label="showLabel('guojima')">
                    <el-input size="mini" v-model="listQuery.wordcode" style="width: 200px;" @keyup.enter.native="handleFilter" />
                </el-form-item>
                <el-form-item :label="showLabel('niandai')">
                    <el-select v-model="listQuery.ageseason" multiple placeholder="">
                        <el-option
                            v-for="item of ageseasons"
                            :key="item.id + item.sessionmark + item.name"
                            :label="item.sessionmark + item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('pinpai')">
                    <el-select v-model="listQuery.brandid" multiple placeholder="" @change="handleChangeBrand">
                        <el-option
                            v-for="item of brands"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('pinlei')">
                    <el-select v-model="listQuery.brandgroupid" multiple placeholder="" @change="handleChangeBrandGroup">
                        <el-option
                            v-for="item of categories"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('zipinlei')">
                    <el-select v-model="listQuery.childbrand" multiple placeholder="">
                        <el-option
                            v-for="item of childrenBrand"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('shangpinmiaoshu')">
                    <el-select v-model="listQuery.productmemoids" multiple placeholder="">
                        <el-option
                            v-for="item of productMemos"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('shangpinxilie')">
                    <el-select v-model="listQuery.series" multiple placeholder="">
                        <el-option
                            v-for="item of series"
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

        <el-row :gutter="20" class="product">
            <el-col :span="24">
                <el-table v-loading="listLoading" :data="list" border stripe>
                    <el-table-column :label="showLabel('caozuo')" align="center" width="150" class-name="small-padding fixed-width">
                        <template slot-scope="{row}">
                            <router-link :to="'/product/edit/' + row.id">
                                <el-button type="default" size="mini">{{ showLabel('bianji') }}</el-button>
                            </router-link>
                            <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('zhutu')">
                        <template slot-scope="{row}">
                            <img :src="_fileLink(row.picture)" style="max-width: 50px; max-height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('futu')">
                        <template slot-scope="{row}">
                            <img :src="_fileLink(row.picture2)" style="max-width: 50px; max-height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('yanse')">
                        <template slot-scope="{row}">
                            <div class="color-group" v-for="item in row.colors" :key="item.id">
                                <div class="box" style="'width: 20px; height: 20px;">
                                    <img :src="_fileLink(item.picture)" style="max-width: 20px; max-height: 20px;">
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('shangpinmingcheng')" width="250">
                        <template slot-scope="{row}">
                            {{ row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('niandai')">
                        <template slot-scope="{row}">
                            {{ row.season }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('guojima')" width="200">
                        <template slot-scope="{row}">
                            {{ row.worldcode }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('shangpinshuxing')">
                        <template slot-scope="{row}">
                            {{ row.type }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('chuchangjia')" width="100">
                        <template slot-scope="{row}">
                            {{ row.fpCurrencyCode }} {{ row.factoryprice }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('beilv')">
                        <template slot-scope="{row}">
                            {{ row.times }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('guojilingshoujia')" width="100">
                        <template slot-scope="{row}">
                            {{ row.wpCurrencyCode }} {{ row.wordprice }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('zhekoulv')">
                        <template slot-scope="{row}">
                            {{ row.discountRate }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('benguolingshoujia')" width="100">
                        <template slot-scope="{row}">
                            {{ row.npCurrencyCode }} {{ row.nationalprice }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('xiaoshoushuxing')">
                        <template slot-scope="{row}">
                            {{ row.saleType }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('lingshoubi')">
                        0
                    </el-table-column>
                    <el-table-column :label="showLabel('xilie')">
                        <template slot-scope="{row}">
                            {{ row.series }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('zuihouruku')">
                        <template slot-scope="{row}">
                            {{ row.laststoragedate }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-pagination v-if="list.length<pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current*1"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize*1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total*1">
        </el-pagination>

        <el-dialog :title="showLabel('chanpinguanli')" :visible.sync="dialogFormVisible" :center="true" width="1400px" :close-on-click-modal="false" :close-on-press-escape="false">
            <add @hideDialogForm="hideDialogForm"></add>
        </el-dialog>
    </div>
</template>

<script>
import globals, { showLabel } from '../../component/globals.js'
import '../../assets/table.css'
import '../../assets/search-form.css'
import _ from 'lodash'
import add from './add.vue'

export default {
    name: 'product',
    components: { add },
    data() {
        return {
            dialogFormVisible: false,
            listLoading      : true,
            list             : [],
            listQuery : {
                wordcode    : '',
                ageseason   : [],
                brandid     : [],
                brandgroupid: [],
                childbrand  : [],
                series      : []
            },
            childrenBrand: [],
            pagination: {
                pageSizes: globals.pageSizes,
                pageSize : 10,
                total    : 0,
                current  : 1
            }
        }
    },
    created() {
        this.getList()
    },
    methods: {
        handleDelete(row) {
            let self = this
            self._remove("/product/delete", {id: row.id}).then(function() {
                self.reloadList()
            })
        },
        handleResetFilter() {
            this.listQuery = {
                wordcode    : '',
                ageseason   : [],
                brandid     : [],
                brandgroupid: [],
                childbrand  : [],
                series      : []
            }
        },
        handleChangeBrand() {
            let self = this
            self.series = []
            self.listQuery.series = []

            if (self.listQuery.brandid.length > 0) {
                self.brands.forEach(item => {
                    if (self.listQuery.brandid.indexOf(item.id) >= 0) {
                        self.series.push.apply(self.series, item.series)
                    }
                })
            } else {
                self.brands.forEach(item => {
                    self.series.push.apply(self.series, item.series)
                })
            }
        },
        handleChangeBrandGroup() {
            let self = this

            self.listQuery.childbrand = []
            self.childrenBrand = []

            self.categories.forEach(item => {
                if (self.listQuery.brandgroupid.indexOf(item.id) >= 0) {
                    self.childrenBrand.push.apply(self.childrenBrand, item.children)
                }
            })
        },
        handleFilter() {
            this.getList()
        },
        handleCreate() {
            this.showDialogForm()
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize
            this.getList()
        },
        handleCurrentChange(current) {
            this.pagination.current = current
            this.getList()
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
            self._fetch("/product/page", params).then(function(res) {
                self.list = res.data
                self.pagination = res.pagination
                self.listLoading = false
            })
        },
        reloadList() {
            this.getList()
        }
    }
}
</script>