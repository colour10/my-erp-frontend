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
                    <as-button size="mini" type="primary" @click="onSelectMultiple">{{_label("querensuoxuan")}}</as-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24" class="product">
                <el-table ref="table" :data="tabledata" stripe border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
                    <el-table-column type="selection" :width="50"></el-table-column>
                    <el-table-column align="center" width="60">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="_label('guojima')" align="center" width="150">
                        <template v-slot="scope">
                            {{scope.row.product.getGoodsCode()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('bizhong')" width="60" align="center">
                        <template v-slot="{row}">
                            {{row.product.factorypricecurrency_label}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice*row.discountbrand*row.confirm_total}}
                        </template>
                    </el-table-column>-->
                    <el-table-column prop="discountbrand" :label="_label('zhekoulv')" width="70" align="center" class="counter">
                        
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('querenshuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-confirm :columns="row.product.sizecontents" :row="row" :disabled="true" :key="row.product.id" :hideInput="true"></sp-sizecontent-confirm>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="scope">
                            {{scope.row.product.getName()}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import {shippingList} from "../asa/order-detail.js"

export default {
    name: 'sp-shipping-select',
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
            self._fetch("/orderbrand/searchdetail", self.form).then(function(res) {
                //self._log("loadPage", res)
                if (res.data) {
                    self.tabledata = []
                    shippingList(res.data).then(results=>{
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
        },
        onSelectMultiple() {
            let self = this
            self.selected.forEach(item=>{
                //self._log(item)
                self.$emit("select", item)
            })
            self.$refs.table.clearSelection()
            this.$emit("update:visible", false)
        },
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
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 60 + 21+ 150 + 50 + 80
        }
    }
}
</script>
