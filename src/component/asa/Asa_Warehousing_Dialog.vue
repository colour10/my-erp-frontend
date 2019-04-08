<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('rukuriqi')">
                            <el-date-picker v-model="form.entrydate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('fahuodanhao')">
                            <el-input v-model="confirmorder.orderno" disabled></el-input>
                        </el-form-item>
                        
                        <el-form-item :label="_label('gonghuoshang')">
                            <simple-select v-model="confirmorder.supplierid" source="supplier" :lang="lang" disabled></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('cangku')">
                            <simple-select v-model="confirmorder.warehouseid" source="warehouse" :lang="lang" disabled></simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('niandaijijie')">
                            <simple-select v-model="confirmorder.ageseasonid" source="ageseason" :lang="lang" disabled></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaileixing')">
                            <simple-select v-model="confirmorder.seasontype" source="seasontype" :lang="lang" :clearable="true" disabled> </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('shuxing')">
                            <simple-select v-model="confirmorder.property" source="orderproperty" :lang="lang" disabled>
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('huilv')">
                            <el-input v-model="confirmorder.exchangerate" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('zhidanriqi')">
                            <el-input :value="form.makedate" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('zhidanren')">
                            <sp-display-input :value="form.makestaff" source="user"></sp-display-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <el-button :type="form.id>0?'info' :'primary'" @click="saveOrder()">{{_label("baocun")}}</el-button>
                            <el-button type="primary" @click="showAttachment()">{{_label("fujian")}}</el-button>
                        </el-row>
                        <el-row type="flex" justify="start">
                            <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-col :offset="22" :span="2">
                    <!--<el-button type="primary" @click="showProduct()">{{_label("xuanzeshangpin")}}</el-button>-->
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="tabledata" border style="width:100%;">
                        <el-table-column prop="productname" :label="_label('shangpinmingcheng')" align="center">
                            <template v-slot="scope">
                                {{scope.row.orderdetails.product.productname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.orderdetails.sizecontent.getLabel()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('fahuoshuliang')" width="200" align="center">
                            <template v-slot="scope">
                                {{scope.row.confirmdetails.number}}
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('danjia')" width="200" align="center">
                            <template v-slot="scope">
                                {{scope.row.confirmdetails.price}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('daohuoshuliang')" width="200" align="center">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.number" :min="0" :disabled="scope.row.is_match==1 || !isEditable"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('shuliangxiangfu')" width="200" align="center" v-if="isEditable">
                            <template v-slot="scope">
                                <el-switch v-model="scope.row.is_match" active-value="1" inactive-value="0" @change="onSwitchChange(scope.$index,scope.row)"></el-switch>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-dialog>
        <!--<asa-select-order-detail-dialog :visible.sync="pro" @select="onSelect"></asa-select-order-detail-dialog>-->
    </div>
</template>

<script>
import globals from '../globals.js'
import { ConfirmorderDetails } from "../model.js"

import simple_select from '../Simple_Select.vue'
import Asa_Select_Order_Detail_Dialog from './Asa_Select_Order_Detail_Dialog.vue'
import DataSource from '../DataSource.js'
import {getFetcher} from "../fetcher.js"

const fetchNumber = getFetcher("warehousingdetails")
export default {
    name: 'asa-warehousing-dialog',
    components: {
        'simple-select': simple_select,
        'asa-select-order-detail-dialog': Asa_Select_Order_Detail_Dialog
    },
    props: ['visible', 'confirmorderid'],
    data() {
        var self = this;

        return {
            form: {
                orderno: "",
                entrydate: "",
                makestaff: "",
                makedate: "",
                id: ""
            },
            confirmorder: {
                id: "",
                orderno: "",
                supplierid: "",
                warehouseid: "",
                ageseasonid: "",
                seasontype: "",
                property: "",
                exchangerate: ""
            },
            tabledata: [],
            formid: "",
            dialogVisible: self.visible,
            title: "",
            lang: "",
            pro: false
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        onSwitchChange(rowIndex, row) {
            let self = this
            self._log(rowIndex, row)
            if (row.is_match == 1) {
                row.number = row.confirmdetails.number
            }
        },
        showProduct() {
            this.pro = true;
        },
        saveOrder() {
            //保存订单
            var self = this

            if (self.form.id > 0) {
                return;
            }

            var params = { form: globals.extend({confirmorderid:self.confirmorder.id},self.form) }
            var array = []
            params.list = self.tabledata.map(item => {
                return { confirmorderdetailsid: item.confirmdetails.id, number:item.number, orderdetailsid:item.orderdetails.id }
            })
            self._log(JSON.stringify(params))
            self._submit("/warehousing/create", { params: JSON.stringify(params) }, function(res) {
                self._log(res)
                if (res.id) {
                    self.form.id = res.id
                    self.formid = res.id
                }
                self.$emit("change", res.form)
            });
        },
        showAttachment() {

        }
    },
    computed: {
        isEditable() {
            return this.form.id == ""
        }
    },
    watch: {
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //console.log("visible", newValue)
            this.dialogVisible = newValue
        },
        confirmorderid(newValue) {
            var self = this
            var form = self.form;
            self.tabledata = []

            self._log("loading...", { confirmorderid: form.confirmorderid }, self.confirmorderid)
                //加载数据
            self._fetch("/warehousing/load", { confirmorderid: self.confirmorderid }, function(res) {
                self._log("加载订单信息", res)

                let response_data = res.data
                if (response_data.form) {
                    //已经生成过入库单
                    globals.copyTo(response_data.form, form)
                }
                if(response_data.confirmorder){
                    //新建入库单
                    let confirmorder = response_data.confirmorder
                    globals.copyTo(confirmorder, self.confirmorder)
                }

                res.data.list.forEach(function(row) {
                    ConfirmorderDetails.get(row, function(detail) {
                        //console.log(detail)
                        let obj = { confirmdetails: detail, orderdetails: detail.orderdetails, number: 0, is_match: 0 }
                        self.tabledata.push(obj)
                        fetchNumber(row.id, function(item){
                            self._log(item)
                            if(item) {
                                obj.number = item.number;
                            }
                        })
                    }, 2)
                })
            })
        },
        '$store.state.warehousing' (newValue) {
            this._log("state changed", newValue)
        }
    }
}
</script>
