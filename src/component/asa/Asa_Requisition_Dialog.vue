<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('diaobocaozuo')">
                            <simple-select v-model="form.requisitiontype" source="requisitiontype" :lang="lang" @change="onTypeChange"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('beizhu')">
                            <el-input v-model="form.memo"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('diaochuku')">
                            <simple-select v-model="form.out_id" source="warehouse" :lang="lang" :disabled="form.requisitiontype=='2'">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('diaoruku')">
                            <simple-select v-model="form.in_id" source="warehouse" :lang="lang" :disabled="form.requisitiontype=='1'">
                            </simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <el-button type="primary" @click="saveOrder(1)">{{_label("shenqing")}}</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-col :span="24">
                    <el-form class="order-form2" :model="form2" label-width="85px" :inline="true" style="width:100%;" size="mini">
                        <el-row :gutter="0">
                            <el-col :span="6">
                                <el-form-item :label="_label('diaobocaozuo')">
                                    <simple-select v-model="form.requisitiontype" source="requisitiontype" :lang="lang" @change="onTypeChange"></simple-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="6">
                                <el-row type="flex" justify="start">
                                    <el-button type="primary" @click="search()">{{_label("chaxun")}}</el-button>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-col>
            </el-row>
            <el-row type="flex" justify="end">
                <el-col :span="24">
                    <el-table :data="searchresult" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
                        <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                            <template v-slot="scope">
                                {{scope.row.productname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.sizecontentname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="warehousename" :label="_label('cangku')" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('kucunshuliang')" width="200" align="center">
                            <template v-slot="scope">
                                {{scope.row.number}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('caozuo')" width="150" align="center">
                            <template v-slot="scope">
                                <el-button size="mini" type="primary" @click="selectRow(scope.row)">{{_label('xuanze')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="tabledata" stripe border style="width:100%;">
                        <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                        </el-table-column>
                        <el-table-column prop="sizecontentname" :label="_label('chima')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.sizecontentname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="warehousename" :label="_label('cangku')" width="100" align="center">
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('kucunshuliang')" width="200" align="center">
                        </el-table-column>
                        <el-table-column prop="select_number" :label="_label('diaoboshuliang')" width="200" align="center">
                            <template v-slot="scope">
                                <simple-select v-if="form.requisitiontype!=2" v-model="scope.row.in_id" source="warehouse" :lang="lang"></simple-select>
                                <simple-select v-if="form.requisitiontype==2" v-model="form.in_id" source="warehouse" :lang="lang" disabled></simple-select>
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
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'
import Asa_Select_Product_Dialog from './Asa_Select_Product_Dialog.vue'
import DataSource from '../DataSource.js'

const fetcherProduct = globals.getFetcher('product')
const dataSource = DataSource.getDataSource('sizecontent', globals.getLabel('lang'));
const fetcherWarehouse = globals.getFetcher('warehouse')

export default {
    name: 'asa-requisition-dialog',
    components: {
        'simple-select': simple_select,
        'asa-select-product-dialog': Asa_Select_Product_Dialog
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
                requisitiontype: "",
                out_id: "",
                in_id: "",
                memo: "",
            },
            form2: {

            },
            tabledata: [],
            searchresult:[],
            dialogVisible: self.visible,
            lang: globals.getLabel('lang')
        }
    },
    methods: {
        search() {
            //查询库存商品
            let self = this
            self._fetch("/productstock/page", {}, function(res) {
                self._log("/productstock/page", res)
                res.data.forEach(item=>{
                    item.productname = ""
                    item.sizecontentname = ""
                    item.warehousename = ''
                    dataSource.getRow(item.sizecontentid, function(data){
                        self._log("data", data)
                        item.sizecontentname = data.getLabel()
                    })
                    fetcherProduct(item.productid, function(product){
                        item.productname = product.productname
                    })

                    fetcherWarehouse(item.warehouseid, function(info) {
                        item.warehousename = info.name
                    })

                    self.searchresult.push(item)
                })                
            })
        },
        onTypeChange() {
            let form = this.form
            if (form.requisitiontype == 1) {
                form.in_id = ""
            } else if (form.requisitiontype == 2) {
                form.out_id = ""
            }
        },
        selectRow(row) {
            var self = this;
            let index = R.findIndex(R.propEq("id", row.id))(self.tabledata)
            if(index<0) {
                row.select_number = 1
                row.number = row.number*1
                row.in_id = ""
                self.tabledata.unshift(JSON.parse(JSON.stringify(row)))
                //self.searchresult = []
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
                if(self.form.requisitiontype==2) {
                    return { out_id: item.warehouseid, productid: item.productid, sizecontentid: item.sizecontentid, number: item.select_number, in_id:self.form.in_id }
                }
                else {
                    return { out_id: item.warehouseid, productid: item.productid, sizecontentid: item.sizecontentid, number: item.select_number, in_id:item.in_id }
                }
                
            })
            self._log(JSON.stringify(params))
            self._submit("/requisition/save", { params: JSON.stringify(params) }, function(res) {                
                self.$emit("change")
            });
        }
    },
    computed: {
    },
    watch: {
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //console.log("visible", newValue)
            this.dialogVisible = newValue
        }
    },
    mounted: function() {
    }
}
</script>
