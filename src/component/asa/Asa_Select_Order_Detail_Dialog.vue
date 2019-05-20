<template>
    <el-dialog :visible.sync="dialogVisible" :center="true" :fullscreen="false" :modal="true" width="1024px">
        <el-form class="user-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <el-col :span="6">
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form.supplierid" source="supplier" :lang="lang">
                        </simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="_label('niandai')">
                        <simple-select v-model="form.ageseason" source="ageseason" :lang="lang"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <as-button size="mini" type="primary" @click="onSearch">{{_label("chaxun")}}</as-button>
                    <as-button size="mini" type="primary" @click="onSelect">{{_label("querensuoxuan")}}</as-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24" class="product">
                <el-table ref="table" :data="tabledata" border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
                    <el-table-column type="selection" :width="60">
                    </el-table-column>
                    <el-table-column :label="_label('dingdanhao')" align="center" width="150">
                        <template v-slot="{row}">
                            <sp-order-tip column="booking_label" :order="row.order"></sp-order-tip>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="scope">
                            {{scope.row.product.getName()}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="center" width="160">
                        <template v-slot="scope">
                            {{scope.row.product.getGoodsCode()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="130" align="center">
                        <template v-slot="{row}">
                            {{row.product.factorypricecurrency_label}} {{row.product.factoryprice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chengjiaojia')" width="130" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice*row.discount}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice*row.discount*row.total}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="discount" :label="_label('zhekoulv')" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-input :columns="row.product.sizecontents" :row="row" :disabled="true" :key="row.product.id"></sp-sizecontent-input>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import globals from '../globals.js'
import { Order, ProductDetail, promiseRunner } from "../model.js"
import detailConvert from "./order-detail.js"
import simple_select from '../Simple_Select.vue'
import DataSource from '../DataSource.js'

export default {
    name: 'asa-select-order-detail-dialog',
    components: {
        'simple-select': simple_select
    },
    props: {
        visible: {
            type: Boolean
        },
    },
    data() {
        var self = this;

        return {
            form: {
                supplierid: "",
                ageseason: ""
            },
            tabledata: [],
            dialogVisible: self.visible,
            title: "",
            lang: "",
            selected: []
        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            //_log(row)
            if (row.number > 0) {
                //_log(row)
                return "success-row"
            }
        },
        loadPage() {
            var self = this;
            self._fetch("/order/searchdetail", self.form).then(function(res) {
                //self._log("loadPage", res)
                if (res.data) {
                    self.tabledata = []
                    detailConvert(res.data).then(results=>{
                        results.forEach(item=>self.tabledata.push(item))
                    })

                    self.tabledata.sort(function(a, b){
                        return a.product.id-b.product.id
                    })
                }
            });
        },
        onSearch() {
            this.loadPage();
        },
        onSelect() {
            let self = this
            self.dialogVisible = false;

            self.selected.forEach(item => {
                self.$emit("select", item)

                let index = self.tabledata.findIndex(row => item == row)
                self.tabledata.splice(index, 1)
            })
        },
        onSelectionChange(vals) {
            this.selected = vals
        },
        getSelectValues() {
            return this.selected.map(item => item.id)
        },
        onRowClick(row) {
            this.$refs.table.toggleRowSelection(row)
        }
    },
    mounted: function() {},
    watch: {
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //console.log("visible", newValue)
            this.dialogVisible = newValue
        }
    },
    computed: {
        width() {
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 60 + 21
        }
    }
}
</script>
