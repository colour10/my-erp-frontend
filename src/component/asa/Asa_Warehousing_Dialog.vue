<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('fahuodanhao')">
                            <el-input v-model="form.orderno" disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('rukuriqi')">
                            <el-date-picker v-model="form.entrydate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('gonghuoshang')">
                            <simple-select v-model="form.supplierid" source="supplier" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('cangku')">
                            <simple-select v-model="form.warehouseid" source="warehouse" :lang="lang"></simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('niandaijijie')">
                            <simple-select v-model="form.ageseasonid" source="ageseason" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaileixing')">
                            <simple-select v-model="form.seasontype" source="seasontype" :lang="lang" :clearable="true"> </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('shuxing')">
                            <simple-select v-model="form.property" source="orderproperty" :lang="lang">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('huilv')">
                            <sp-float-input v-model="form.exchangerate"></sp-float-input>
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
                            <el-button type="primary" @click="saveOrder(0)">{{_label("baocun")}}</el-button>
                            <el-button :type="form.id?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</el-button>
                            <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="bottom">
                                <el-button :type="form.id?'primary':'info'" @click="deleteOrder()">{{_label("shanchu")}}</el-button>
                            </el-tooltip>
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
                        <el-table-column prop="number" :label="_label('dinggoushuliang')" width="200" align="center">
                            <template v-slot="scope">
                                {{scope.row.orderdetails.number-scope.row.orderdetails.actualnumber}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('daohuoshuliang')" width="200" align="center">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.number" :min="0" :disabled="scope.row.is_match==1"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('shuliangxiangfu')" width="200" align="center">
                            <template v-slot="scope">
                                <el-switch v-model="scope.row.is_match" active-value="1" inactive-value="0" @change="onSwitchChange(scope.$index,scope.row)"></el-switch>
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
    name: 'asa-warehousing-dialog',
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
                auditstatus: "", //审核状态: 0-未提交审核；1-待审核；2-审核完成
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
            this.$router.push("/user")
        },
        onSwitchChange(rowIndex, row) {
            let self = this
            self._log(rowIndex, row)
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
        saveOrder(auditstatus) {
            //保存订单
            var self = this
            self.form.auditstatus = auditstatus

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
                            row.is_match = 0

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
