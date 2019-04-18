<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('tongyidiaoru')">
                            <el-switch v-model="form.allin" active-value="1" inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item :label="_label('diaoruku')">
                            <simple-select v-model="form.in_id" source="warehouse" :lang="lang" :disabled="form.allin==0">
                            </simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('beizhu')">
                            <el-input v-model="form.memo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <auth auth="requisition">
                                <el-button type="primary" @click="saveOrder(1)">{{_label("shenqing")}}</el-button>
                            </auth>
                            <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-col :span="24">
                    <search @select="onSelect"></search>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="tabledata" stripe border style="width:100%;">
                        <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                            <template v-slot="scope">
                                {{scope.row.product.productname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="warehousename" :label="_label('cangku')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.warehouse.name}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('kucunshuliang')" width="200" align="center">
                        </el-table-column>
                        <el-table-column prop="select_number" :label="_label('diaorucangku')" width="200" align="center">
                            <template v-slot="scope">
                                <simple-select v-if="form.allin!=1" v-model="scope.row.in_id" source="warehouse" :lang="lang"></simple-select>
                                <simple-select v-if="form.allin==1" v-model="form.in_id" source="warehouse" :lang="lang" disabled></simple-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="select_number" :label="_label('diaoboshuliang')" width="200" align="center">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.select_number" :min="1" :max="scope.row.number*1"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('caozuo')" width="150" align="center">
                            <template v-slot="scope">
                                <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">{{_label('shanchu')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import globals,{_label} from '../globals.js'
import simple_select from '../Simple_Select.vue'
import Asa_Select_Product_Dialog from './Asa_Select_Product_Dialog.vue'
import Asa_Productstock_Search from './Asa_Productstock_Search.vue'
import DataSource from '../DataSource.js'
import { getFetcher } from "../fetcher.js"

const fetcherProduct = getFetcher('product')
const fetcherWarehouse = getFetcher('warehouse')

export default {
    name: 'asa-requisition-dialog',
    components: {
        'simple-select': simple_select,
        'asa-select-product-dialog': Asa_Select_Product_Dialog,
        'search': Asa_Productstock_Search
    },
    props: {
        visible: {
            type: Boolean
        },
        data: {
            type: Object
        }
    },
    data() {
        var self = this;

        return {
            form: {
                allin: 0,
                out_id: "",
                in_id: "",
                memo: "",
            },
            tabledata: [],
            dialogVisible: self.visible,
            lang: _label('lang')
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        onSelect(row) {
            var self = this;
            let index = self.tabledata.findIndex(item => item.id == row.id)
            if (index < 0) {
                row.select_number = 1
                row.number = row.number * 1
                row.in_id = ""
                self.tabledata.unshift(row)
            }
        },
        saveOrder(status) {
            //保存订单
            var self = this

            if (!confirm(self._label('order_submit_confirm'))) {
                return
            }

            var params = { form: self.form }
            var array = []
            params.list = self.tabledata.map(item => {
                if (self.form.allin == 1) {
                    return { out_id: item.warehouseid, productstockid: item.id, number: item.select_number, in_id: self.form.in_id }
                } else {
                    return { out_id: item.warehouseid, productstockid: item.id, number: item.select_number, in_id: item.in_id }
                }

            })
            self._log(JSON.stringify(params))
            self._submit("/requisition/save", { params: JSON.stringify(params) }).then(function(res) {
                self.$emit("change")
            });
        }
    },
    computed: {},
    watch: {
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //console.log("visible", newValue)
            this.dialogVisible = newValue
        }
    },
    mounted: function() {}
}
</script>
