<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false" @close="clearValidate">
            <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="rules" :inline-message="true">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('shuxing')" required prop="property">
                            <simple-select v-model="form.property" source="orderproperty" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('yewuleixing')" required prop="bussinesstype">
                            <simple-select v-model="form.bussinesstype" source="bussinesstype" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('gonghuoshang')" required prop="supplierid">
                            <simple-select v-model="form.supplierid" source="supplier" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('fahuodanwei')">
                            <simple-select v-model="form.finalsupplierid" source="supplier" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaijijie')" required prop="ageseason">
                            <simple-select v-model="form.ageseason" source="ageseason" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaileixing')">
                            <simple-select v-model="form.seasontype" source="seasontype" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('dingdanriqi')">
                            <el-date-picker v-model="form.makedate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('dingdanhao')">
                            <el-input v-model="form.orderno" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('haiwaidingdanhao')">
                            <el-input v-model="form.worldordercode"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('fapiaohao')">
                            <el-input v-model="form.invoiceno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('zongjine')">
                            <el-input placeholder="" :value="total_price" class="input-with-select" disabled>
                                <template slot="prepend">
                                    <select-currency v-model="form.currency">
                                    </select-currency>
                                </template>
                            </el-input>
                        </el-form-item>
                        <el-form-item :label="_label('huilv')">
                            <sp-float-input v-model="form.exchangerate"></sp-float-input>
                        </el-form-item>
                        <el-form-item :label="_label('zhekou')">
                            <sp-float-input v-model="form.discount"></sp-float-input>
                        </el-form-item>
                        <el-form-item :label="_label('nannvkuan')">
                            <simple-select v-model="form.formtype" source="formtype" :lang="lang">
                            </simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('wofanglianxiren')">
                            <simple-select v-model="form.ourcontactor" source="user" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('dinghuokehu')">
                            <simple-select v-model="form.bookingid" source="supplier" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('dinghuokehulianxiren')">
                            <el-input v-model="form.contactor"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('beizhu')">
                            <el-input v-model="form.memo"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('shenheren')">
                            <sp-display-input :value="form.auditstaff" source="user"></sp-display-input>
                        </el-form-item>
                        <el-form-item :label="_label('zhidanren')">
                            <sp-display-input :value="form.makestaff" source="user"></sp-display-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <el-button :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</el-button>
                            <el-button :type="canSubmit?'primary':'info'" @click="saveOrder(2)">{{_label("tijiaoshenhe")}}</el-button>
                            <el-button :type="canDelete?'primary':'info'" @click="deleteOrder()">{{_label("shanchu")}}</el-button>
                        </el-row>
                        <el-row type="flex" justify="start">
                            <el-button :type="canConfirm?'primary':'info'" @click="confirmOrder(1)">{{_label("tuihui")}}</el-button>
                            <el-button :type="canConfirm?'primary':'info'" @click="confirmOrder(3)">{{_label("shenhetongguo")}}</el-button>
                            <el-button :type="canCancel?'primary':'info'" @click="cancelConfirm()">{{_label("quxiaoshenhe")}}</el-button>
                        </el-row>
                        <el-row type="flex" justify="start">
                            <el-button :type="canFinish?'primary':'info'" @click="finishOrder()">{{_label("dingdanwajie")}}</el-button>
                        </el-row>
                        <el-row type="flex" justify="start">
                            <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-col :offset="22" :span="2">
                    <el-button v-if="isEditable" :type="buttontype" @click="showProduct()">{{_label("xuanzeshangpin")}}</el-button>
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
                        <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.sizecontent.getLabel()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="label" :label="_label('chengjiaojia')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.product.retailprice}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="label" :label="_label('zongjia')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.product.retailprice*scope.row.number}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('dinggoushuliang')" width="200" align="center">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.number" :min="1" :max="10" :disabled="!isEditable"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('caozuo')" width="150" align="center" v-if="isEditable">
                            <template v-slot="scope">
                                <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">{{_label('shanchu')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-dialog>
        <asa-select-product-dialog :visible.sync="pro" @select="onSelect"></asa-select-product-dialog>
    </div>
</template>

<script>
import simple_select from '../Simple_Select.vue'
import Asa_Select_Product_Dialog from './Asa_Select_Product_Dialog.vue'
import DataSource from '../DataSource.js'
import globals from "../globals.js"
import { Product } from "../model.js"

const _label = globals.getLabel

export default {
    name: 'asa-order-dialog',
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

        var dataSource = DataSource.getDataSource('sizecontent', self._label('lang'));
        return {
            form: {
                bussinesstype: "",
                supplierid: "",
                finalsupplierid: "",
                ageseason: "",
                seasontype: "",
                formtype: "",
                makedate: "",
                ordercode: "",
                worldordercode: "",
                invoiceno: "",
                exchangerate: "",
                currency: "",
                discount: "",
                property: "",
                makestaff: "",
                auditstaff: "",
                ourcontactor: "",
                bookingid: "",
                contactor: "",
                memo: "",
                total: "",
                orderno: "",
                status: "", //状态，1=保存；2=送审；3=审核完成
                id: ""
            },
            rules: {
                bussinesstype: { required: true, message: _label("8000") },
                supplierid: { required: true, message: _label("8000") },
                ageseason: { required: true, message: _label("8000") },
                property: { required: true, message: _label("8000") }
            },
            tabledata: [],
            dialogVisible: self.visible,
            title: "",
            lang: "",
            pro: false,
            dataSource,
            formid: ''
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        showProduct() {
            this.pro = true;
        },
        onSelect(row) {
            var self = this;
            Product.get(row, function(product) {
                self._log(product, "Product")

                product.sizecontents.map(item => {
                    //查询是不是已经添加过
                    let is_exist = self.tabledata.some(rowData => {
                            return rowData.product.id == row.id && rowData.sizecontent.getValue() == item.getValue()
                        })

                    if (!is_exist) {
                        self.tabledata.unshift({
                            product: product,
                            sizecontent: item,
                            number: 0
                        })
                    }
                })
            }, 1)

        },
        deleteOrder() {
            let self = this
            if (!self.canDelete) {
                return
            }

            self._remove("/order/delete?id=" + self.form.id, function() {
                self.dialogVisible = false
                self.form.id = ""

                self.$emit("change", {}, true)
            })
        },
        finishOrder() {

        },
        saveOrder(status) {
            //保存订单
            var self = this


            this.$refs["order-form"].validate(function(valid) {
                if (!valid) {
                    return false;
                }

                if (status == 2) {
                    if (!confirm(self._label('order_submit_confirm'))) {
                        return
                    }
                }

                var params = {
                    form: globals.$.extend({}, self.form, { status })
                }
                var array = []
                params.list = self.tabledata.map(item => {
                    return {
                        productid: item.product.id,
                        id: item.id,
                        sizecontentid: item.sizecontent.getValue(),
                        number: item.number
                    }
                })
                self._log(JSON.stringify(params))
                self._submit("/order/saveorder", {
                    params: JSON.stringify(params)
                }, function(res) {
                    self._log(res)
                    let data = res.data
                    if (data.form.id) {
                        globals.copyTo(data.form, self.form)
                        self.formid = self.form.id

                        self.tabledata = []
                        data.list.forEach(item => {
                            self._log(item)
                            self.appendRow(item)
                        })
                    }
                    self.$emit("change", data.form)
                });
            })

        },
        confirmOrder(status) {
            let self = this
            if (!self.canConfirm) {
                return
            }
            self._confirm(self._label("confirm-order"), function() {
                self._submit("/order/confirm", {
                    id: self.form.id,
                    status: status
                }, function(res) {
                    self._log(res)
                    self.form.status = status
                    self.$emit("change", self.form)
                });
            })
        },
        cancelConfirm() {
            let self = this
            if (!self.canCancel) {
                return
            }
            self._confirm(self._label("confirm-order-cancel"), function() {
                self._submit("/order/cancel", {
                    id: self.form.id
                }, function(res) {
                    self._log(res)
                    self.form.status = 2
                    self.$emit("change", self.form)
                });
            })
        },
        getRowCount(rowIndex, row) {
            this._log(row, "getRowCount")
            return row.sizetoplist.reduce((total, item) => total += item.number, 0)
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        appendRow(row) {
            const self = this;
            self.dataSource.getRow(row.sizecontentid, data => {
                row.sizecontent = data
                self.tabledata.push(row)
            })
        }
    },
    computed: {
        buttontype() {
            var status = this.form.status;
            return status == '1' || status == '' || !status ? 'primary' : 'info'
        },
        isEditable() {
            var status = this.form.status;
            return status == '1' || status == '' || !status
        },
        canDelete() {
            var status = this.form.status;
            return this.form.id > 0 && status == 1
        },
        canConfirm() {
            var status = this.form.status;
            return this.form.id > 0 && status == 2
        },
        canCancel() {
            var status = this.form.status;
            return this.form.id > 0 && status == 3
        },
        canSubmit() {
            var status = this.form.status;
            return status != 2 && status != 3
        },
        canFinish() {
            var status = this.form.status;
            return status == 3
        },
        total_price() {
            return this.tabledata.reduce(function(total, current) {
                return total + current.number * current.product.realprice
            }, 0)
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
        data(newValue) {
            var self = this
            var form = self.form;
            self._log("copy data1", newValue, form)

            //清空当前表单数据，并复制新记录的数据
            globals.empty(form)
            globals.copyTo(newValue, form)
            self._log("copy data2", newValue)

            if (!self.form.id) {
                self.tabledata = []
            }
            
            self.clearValidate(50)

            //如果订单的id变化了，则清空明细，重新加载新订单的明细
            if (form.id != "" && form.id != self.fomrid) {
                self.tabledata = []
                    //加载数据
                self._fetch("/order/loadorder", {id:form.id}, function(res) {
                    self._log("加载订单信息", res)
                    if (res.data.list) {
                        res.data.list.forEach(item => {
                            self._log(item)
                            self.appendRow(item)
                        })
                    }
                })
            }
        }
    },
    mounted: function() {
        var self = this;
        globals.copyTo(self.data, this.form)
    }
}
</script>
