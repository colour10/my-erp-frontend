<template>
    <div>
        <el-dialog :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('shenqingren')">
                            {{form.apply_username}}
                        </el-form-item>
                        <el-form-item :label="_label('shenqingriqi')">
                            {{rowdata.apply_date}}
                        </el-form-item>
                        <el-form-item :label="_label('zhuangtai')">
                            {{form.status_name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('chukuqueren')">
                            {{form.turnout_username}}
                        </el-form-item>
                        <el-form-item :label="_label('chukushijian')">
                            {{rowdata.turnout_date}}
                        </el-form-item>
                        <el-form-item :label="_label('diaochucangku')">
                            {{form.out_name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('rukuqueren')">
                            {{form.turnin_username}}
                        </el-form-item>
                        <el-form-item :label="_label('rukushijian')">
                            {{rowdata.turnin_date}}
                        </el-form-item>
                        <el-form-item :label="_label('diaorucangku')">
                            {{form.in_name}}
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <el-button :type="rowdata.status==2?'primary':'info'" @click="saveOrder(1)">{{_label("zuofei")}}</el-button>
                            <el-button :type="rowdata.status==2?'primary':'info'" @click="confirmout()">{{_label("chukuqueren")}}</el-button>
                            <el-button :type="rowdata.status==3?'primary':'info'" @click="confirmin()">{{_label("rukuqueren")}}</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-row>
                <el-col :span="24">
                    <el-table ref="list" :data="tabledata" stripe border style="width:100%;">
                        <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                        </el-table-column>
                        <el-table-column prop="sizecontentname" :label="_label('chima')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.sizecontentname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('diaoboshuliang')" width="200" align="center"></el-table-column>
                        <el-table-column prop="out_number" :label="_label('chukushuliang')" width="200" align="center" v-if="rowdata.status>2" key="1"></el-table-column>
                        <el-table-column prop="in_number" :label="_label('rukushuliang')" width="200" align="center" v-if="rowdata.status==5" key="2"></el-table-column>
                        <el-table-column :label="_label('chukushuliang')" width="250" align="center" v-if="rowdata.status==2" key="3">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.select_number" :min="0" :max="scope.row.number*1"></el-input-number>
                            </template>
                        </el-table-column>

                        <el-table-column :label="_label('rukushuliang')" width="250" align="center" v-if="rowdata.status==3" key="4">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.select_number" :min="0" :max="scope.row.out_number*1"></el-input-number>
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
import {getFetcher} from "../fetcher.js"

const fetcherProduct = getFetcher('product')
const dataSource = DataSource.getDataSource('requisitionstatus', globals.getLabel('lang'));
const fetcherWarehouse = getFetcher('warehouse')
const fetcherUser = getFetcher('user')
const sizecontent = DataSource.getDataSource('sizecontent', globals.getLabel('lang'));

export default {
    name: 'asa-requisition-detail-dialog',
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
                apply_username: "",
                turnout_username: "",
                turnin_username: "",
                out_name: "",
                in_name: "",
                memo: "",
                status_name: ""
            },
            rowdata:{
                status:"",
                apply_date:"",
                turnin_date:"",
                turnout_date:""
            },
            tabledata: [],
            dialogVisible: self.visible,
            lang: globals.getLabel('lang')
        }
    },
    methods: {
        init(row) {
            let self = this,
                form = this.form

            self._log(self.rowdata, row)
            //self.rowdata = row
            $ASA.copyTo(row, self.rowdata)
            if (row.apply_staff) {
                fetcherUser(row.apply_staff, item => form.apply_username = item.login_name)
            }

            if (row.turnin_staff) {
                fetcherUser(row.turnin_staff, item => form.turnin_username = item.login_name)
            }

            if (row.turnout_staff) {
                fetcherUser(row.turnout_staff, item => form.turnout_username = item.login_name)
            }

            if (row.out_id) {
                fetcherWarehouse(row.out_id, item => form.out_name = item.name)
            }

            if (row.in_id) {
                fetcherWarehouse(row.in_id, item => form.in_name = item.name)
            }

            if (row.status) {
                dataSource.getRow(row.status, data => form.status_name = data.getLabel())
            }

            if (row.id) {
                self.tabledata = []
                    //加载数据
                self._fetch("/requisition/load", { requisitionid: row.id }, function(res) {
                    self._log("调拨单列表", res)

                    res.data.forEach(function(row) {
                        row.sizecontentname = ""
                        sizecontent.getRow(row.sizecontentid, data => {
                            row.sizecontentname = data.getLabel()
                        })

                        row.productname = ""
                        fetcherProduct(row.productid, item => row.productname = item.productname)

                        row.number *= 1
                        row.select_number = row.number;

                        self.tabledata.push(row)
                    })
                    self.$refs.list.$forceUpdate()
                })
            }
        },
        doAction(action) {
            //保存订单
            var self = this

            if (!confirm(self._label('order_submit_confirm'))) {
                return
            }

            var params = { id: self.data.id }
            var array = {}
            let total=0,total_number=0
            self.tabledata.forEach(item => {
                array[item.id] = item.select_number;
                total += item.select_number;
                total_number += item.number;
            })

            params.total = "";
            if(total==0) {
                params.total = 'deny';
            }
            else if(total_number==total) {
                params.total = "allow"
            }
            params.list = array;

            self._log(JSON.stringify(params))
            self._submit("/requisition/"+action, { params: JSON.stringify(params) }, function(res) {
                self.$emit("change", res.data)
                self.init(res.data)
            });
        },
        confirmout() {
            this.doAction('confirmout')
        },
        confirmin() {
            this.doAction('confirmin')
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
        },
        data(newValue) {
            this.init(newValue)
        }
    },
    mounted: function() {
        let self = this
        self.init(self.data)
    }
}
</script>
