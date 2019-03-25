<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('gonghuoshang')">
                            <simple-select v-model="form.supplierid" source="supplier" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('gonghuodanwei')">
                            <simple-select v-model="form.finalsupplierid" source="supplier" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaijijie')">
                            <simple-select v-model="form.ageseasonid" source="ageseason" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaileixing')">
                            <simple-select v-model="form.seasontype" source="seasontype" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('daohuocangku')">
                            <simple-select v-model="form.warehouseid" source="warehouse" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('shuxing')">
                            <simple-select v-model="form.property" source="orderproperty" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('zongjine')">
                            <sp-float-input placeholder="" v-model="form.total" class="input-with-select">
                                <select-currency v-model="form.currency">
                                </select-currency>
                            </sp-float-input>
                        </el-form-item>
                        <el-form-item :label="_label('huilv')">
                            <sp-float-input v-model="form.exchangerate"></sp-float-input>
                        </el-form-item>
                        <el-form-item :label="_label('zhidanriqi')">
                            <el-input :value="form.makedate" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('zhidanren')">
                            <sp-display-input :value="form.makestaff" source="user"></sp-display-input>
                        </el-form-item>
                        <el-form-item :label="_label('shenheren')">
                            <sp-display-input :value="form.auditstaff" source="user"></sp-display-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('fahuodanhao')">
                            <el-input v-model="form.orderno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('fukuanshijian')">
                            <el-date-picker v-model="form.paydate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('daidiandanwei')">
                            <simple-select v-model="form.dd_company" source="supplier" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('anpaitihuoshijian')" class="mini" class="font12">
                            <el-date-picker v-model="form.apickingdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('hangbanhao')">
                            <el-input v-model="form.flightno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('hangbanriqi')">
                            <el-date-picker v-model="form.flightdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('zhudanhao')">
                            <el-input v-model="form.mblno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('zidanhao')">
                            <el-input v-model="form.hblno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('fahuogang')">
                            <el-input v-model="form.dispatchport"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('daohuogang')">
                            <el-input v-model="form.deliveryport"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('xiangshu')">
                            <el-input v-model="form.box_number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('zhongliang')">
                            <el-input v-model="form.weight"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('tiji')">
                            <el-input v-model="form.volume"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('jifeizhongliang')">
                            <el-input v-model="form.chargedweight"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('kongyunshang')">
                            <simple-select v-model="form.transcompany" source="supplier" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('haiwaifapiaohao')">
                            <el-input v-model="form.invoiceno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('daokushijian')">
                            <el-date-picker v-model="form.aarrivaldate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <!--<el-form-item :label="_label('hangbanriqi')">
                            <el-date-picker v-model="form.flightdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>-->
                        <el-form-item :label="_label('hetongmaifang')">
                            <simple-select v-model="form.buyerid" source="supplier" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('hetongmaifang2')">
                            <simple-select v-model="form.sellerid" source="supplier" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('yunshufangshi')">
                            <simple-select v-model="form.transporttype" source="transporttype" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('zhifufangshi')">
                            <simple-select v-model="form.paytype" source="paytype" :lang="lang"></simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <el-button :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</el-button>
                            <el-button :type="canSubmit?'primary':'info'" @click="saveOrder(2)">{{_label("tijiaoshenhe")}}</el-button>
                            <el-button :type="form.id?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</el-button>
                            <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="bottom">
                                <el-button :type="canDelete?'primary':'info'" @click="deleteOrder()">{{_label("shanchu")}}</el-button>
                            </el-tooltip>
                        </el-row>
                        <el-row type="flex" justify="start">
                            <el-button :type="canConfirm?'primary':'info'" @click="confirmOrder(1)">{{_label("tuihui")}}</el-button>
                            <el-button :type="canConfirm?'primary':'info'" @click="confirmOrder(3)">{{_label("shenhetongguo")}}</el-button>
                            <el-button :type="canCancel?'primary':'info'" @click="cancelConfirm()">{{_label("quxiaoshenhe")}}</el-button>
                        </el-row>
                        <el-row type="flex" justify="start">
                            <el-button :type="canCancel?'primary':'info'" @click="createWarehousing()">{{_label("shengchengrukudan")}}</el-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-col :offset="22" :span="2">
                    <el-button type="primary" @click="showProduct()">{{_label("xuanzeshangpin")}}</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="tabledata" border style="width:100%;" v-loading.fullscreen.lock="loading" :row-class-name="tableRowClassName">
                        <el-table-column prop="productname" :label="_label('shangpinmingcheng')" align="center">
                            <template v-slot="scope">
                                {{scope.row.product.productname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.sizecontent.getLabel()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('shengyushuliang')" width="200" align="center">
                            <template v-slot="scope">
                                {{scope.row.orderdetails.number-scope.row.orderdetails.actualnumber}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('dinggoushuliang')" width="200" align="center">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.number" :min="0" :max="scope.row.orderdetails.number-scope.row.orderdetails.actualnumber"></el-input-number>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-dialog>
        <asa-select-order-detail-dialog :visible.sync="pro" @select="onSelect"></asa-select-order-detail-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'
import Asa_Select_Order_Detail_Dialog from './Asa_Select_Order_Detail_Dialog.vue'
import DataSource from '../DataSource.js'


export default {
    name: 'asa-order-confirm-dialog',
    components: {
        'simple-select': simple_select,
        'asa-select-order-detail-dialog': Asa_Select_Order_Detail_Dialog
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

        var dataSource = DataSource.getDataSource('sizecontent', globals.getLabel('lang'));
        return {
            form: {
                supplierid: "",
                finalsupplierid: "",
                ageseasonid: "",
                seasontype: "",
                warehouseid: "",
                property: "",
                total: "",
                currency: "",
                exchangerate: "",
                orderno: "",
                paydate: "",
                dd_company: "",
                apickingdate: "",
                flightno: "",
                flightdate: "",
                mblno: "",
                hblno: "",
                dispatchport: "",
                deliveryport: "",
                box_number: "",
                weight: "",
                volume: "",
                chargedweight: "",
                transcompany: "",
                invoiceno: "",
                aarrivaldate: "",
                buyerid: "",
                sellerid: "",
                transporttype: "",
                paytype: "",
                status: "", //状态:1-未提交审核；2-待审核；3-审核完成,4-作废
                id: ""
            },
            tabledata: [],
            formid: "",
            dialogVisible: self.visible,
            title: "",
            lang: "",
            pro: false,
            globals,
            dataSource
        }
    },
    methods: {
        createWarehousing() {
            this._log("跳转")
            this.$emit("warehousing")
        },
        showProduct() {
            this.pro = true;
        },
        onSelect(rows) {
            var self = this;
            self._log("onSelect", rows)
            rows.forEach(item => {
                //console.log(subDataSource, "sub")
                //console.log(subDataSource.constructor==DataSource)
                //item.orderdetailsid = item.id
                //delete item.id
                self.tabledata.unshift({
                    product: item.product,
                    sizecontent: item.sizecontent,
                    orderdetails: item,
                    productid: item.productid,
                    sizecontentid: item.sizecontentid,
                    number: item.select_number,
                    orderdetailsid: item.id
                })
            })
        },
        saveOrder(status) {
            //保存订单
            var self = this            

            if (status == 2) {
                if (!confirm(self._label('order_submit_confirm'))) {
                    return
                }
            }
            self.form.status = status

            var params = { form: self.form }
            var array = []
            params.list = self.tabledata.map(item => {
                return { id: item.id, productid: item.productid, sizecontentid: item.sizecontentid, number: item.number, orderdetailsid: item.orderdetailsid }
            })
            self._log(JSON.stringify(params))
            self._submit("/confirmorder/saveorder", { params: JSON.stringify(params) }, function(res) {
                self._log(res)
                if (res.id) {
                    self.form.id = res.id
                    self.formid = res.id
                }
                self.$emit("change", res.data.form)
            });
        },
        confirmOrder(status) {
            let self = this
            if (!self.canConfirm) {
                return
            }
            self._confirm(self._label("confirm-order"), function() {
                self._submit("/confirmorder/confirm", {
                    id: self.form.id,
                    status: status
                }, function(res) {
                    self._log(res)
                    self.form.status = status
                    self.$emit("change", self.form)
                });
            })
        },
        cancelConfirm(){
            let self = this
            if (!self.canCancel) {
                return
            }
            self._confirm(self._label("confirm-order-cancel"), function() {
                self._submit("/confirmorder/cancel", {
                    id: self.form.id
                }, function(res) {
                    self._log(res)
                    self.form.status = 2
                    self.$emit("change", self.form)
                });
            })
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        showAttachment() {

        },
        deleteOrder() {
            const self = this
            if (!self.form.id) {
                return
            }
            self._remove("/confirmorder/delete?id=" + self.form.id, function(res) {

            });
        }
    },
    computed: {
        canDelete() {
            var form = this.form;
            return form.id > 0 && form.status == 1
        },
        canConfirm() {
            var form = this.form;
            return form.id > 0 && form.status == 2
        },
        canCancel() {
            var form = this.form;
            return form.id > 0 && form.status == 3
        },
        canSubmit() {
            var status = this.form.status;
            return status != 2 && status != 3
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
            $ASA.empty(form)
            $ASA.copyTo(newValue, form)
            self._log("copy data2", newValue)

            if (!self.form.id) {
                self.tabledata = []
            }

            //如果订单的id变化了，则清空明细，重新加载新订单的明细
            if (form.id != "" && form.id != self.fomrid) {
                self.tabledata = []
                    //加载数据
                self._fetch("/confirmorder/loadorder?id=" + form.id, function(res) {
                    self._log("加载订单信息", res)

                    res.data.list.forEach(function(row) {
                        self.dataSource.getRow(row.sizecontentid, data => {
                            row.sizecontent = data

                            row.product = R.find(R.propEq('id', row.productid))(res.data.productlist)
                            self.tabledata.push(row)
                        })
                    })
                })
            }
        }
    }
}
</script>
