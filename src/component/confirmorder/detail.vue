<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <au-button auth="confirmorder-submit" :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</au-button>
                <as-button :type="form.id?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</as-button>
                <auth auth="confirmorder-submit">
                    <as-button :type="canDelete?'primary':'info'" @click="deleteOrder()">{{_label("shanchu")}}</as-button>
                </auth>
                <as-button type="primary" @click="createWarehousing()">{{_label("shengchengrukudan")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="6">
                    <el-form-item :label="_label('niandai')" required prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('jijie')">
                        <simple-select v-model="form.seasontype" source="seasontype">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinpai')">
                        <simple-select v-model="form.brandid" source="brand">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('xingbie')">
                        <el-input v-model="genders" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form.supplierid" source="supplier_3" :clearable="true">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('fahuoshang')">
                        <simple-select v-model="form.finalsupplierid" source="supplier_3" :clearable="true">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('haiwaidingdanhao')">
                        <el-input v-model="form.foreignorderno"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('gongsidingdanhao')">
                        <el-input v-model="form.orderno" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="_label('jine')">
                        <el-input placeholder="" v-model="total_price" class="productcurrency">
                            <select-currency v-model="form.currency" slot="prepend">
                            </select-currency>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhekoulv')">
                        <sp-float-input v-model="form.discountbrand" @change="onDiscountChange"></sp-float-input>
                    </el-form-item>
                    <el-form-item :label="_label('tuishuilv')">
                        <sp-float-input v-model="form.taxrebate"></sp-float-input>
                    </el-form-item>
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="_label('yewuleixing')" required prop="bussinesstype">
                        <simple-select v-model="form.bussinesstype" source="bussinesstype">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('zhidanren')">
                        <sp-display-input :value="form.makestaff" source="user" :placeholder="_label('zidonghuoqu')"></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhidanriqi')">
                        <el-input v-model="form.maketime" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24" class="inputtable product">
                <el-table :data="tabledata" stripe border style="width:100%;">
                    <el-table-column align="center" width="60">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="scope">
                            {{scope.row.product.getName()}}
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
                    <el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice*row.discountbrand*row.confirm_total}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zhekoulv')" width="70" align="center" class="counter">
                        <template v-slot="{row}">
                            <el-input v-model="row.discountbrand" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-confirm :columns="row.product.sizecontents" :row="row" :disabled="true" :key="row.product.id" @change="onChange"></sp-sizecontent-confirm>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { extend, copyTo } from "../object.js"
import { confirmList } from "../asa/order-detail.js"
import chain from "../chain.js"

export default {
    name: 'sp-orderconfirmdetail',
    components: {},
    props: {},
    data() {
        let self = this;
        let _label = self._label

        return {
            form: {
                foreignorderno: "",
                bussinesstype: "",
                supplierid: "",
                finalsupplierid: "",
                ageseason: "",
                seasontype: "",
                discount: "",
                taxrebate: "",
                makestaff: "",
                maketime: "",
                memo: "",
                orderno: "",
                brandid: "",
                total:"",
                discountbrand:"",
                bussinesstype:"",
                id: ""
            },
            rules: {
                bussinesstype: { required: true, message: _label("8000") },
                supplierid: { required: true, message: _label("8000") },
                ageseason: { required: true, message: _label("8000") },
                property: { required: true, message: _label("8000") }
            },
            tabledata: [],
            title: ""        
        }
    },
    methods: {
        onSelect(row) {
            let self = this;
            self.appendRow(row)
        },
        deleteOrder() {
            let self = this
            if (!self.canDelete) {
                return
            }

            self._remove("/order/delete", { id: self.form.id }).then(function() {
                self.form.id = ""

                self.$emit("change", {}, true)
            })
        },
        saveOrder() {
            //保存订单
            let self = this

            //self.validate(function() {
            let params = {
                form: extend({}, self.form)
            }

            let list = []
            self.tabledata.forEach(item => {
                if (item.form) {
                    chain(item.form).forEach((values, orderid) => {
                        chain(values).forEach((number, sizecontentid) => {
                            if (number > 0) {
                                list.push({
                                    orderid,
                                    sizecontentid,
                                    number,
                                    productid: item.product.id,
                                    discountbrand:item.discountbrand
                                })
                            }
                        })
                    })
                }
            })
            params.list = list;

            self._log(params)
            self._submit("/orderbrand/confirm", { params: JSON.stringify(params) }).then(function(res) {
                self._log(res)
                let data = res.data
                if (data.id) {
                    copyTo(data, self.form)
                }
            });
            //})

        },
        deleteRow(row) {
            var self = this;
            let index = self.tabledata.findIndex(item => item == row)
            self.$delete(self.tabledata, index)
        },
        appendRow(row) {
            const self = this;

            self.tabledata.unshift(row)

            self.form.currency = row.product.factorypricecurrency
        },
        onChange({ row, form, total }) {
            let self = this
            row.form = form
            row.confirm_total = total;
        },
        onDiscountChange(newValue, oldValue) {
            let self = this
            self.tabledata.forEach(item => {
                //self._log(newValue, oldValue, item.discountbrand)
                if (item.discountbrand == oldValue || item.discountbrand == '') {
                    item.discountbrand = newValue
                }
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
        width() {
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 50 + 21 + 150 + 50 + 80
        },
        canSubmit() {
            var status = this.form.status;
            return status != 2 && status != 3
        },
        total_price() {
            return this.tabledata.reduce(function(total, current) {
                return total + current.confirm_total * current.product.factoryprice * current.discountbrand
            }, 0)
        },
        genders() {
            let obj = {}
            this.tabledata.forEach(item => {
                if (item.product.gender_label.length > 0) {
                    obj[item.product.gender_label] = 1
                }
            });
            return Object.keys(obj).join(",");
        }
    },
    mounted: function() {
        let self = this;
        let route = self.$route;
        let label // = route.params.id == 0 ? self._label("xinjiandingdan") : "订单信息"
        self._log(route.params)
        self._fetch("/orderbrand/loadorder", { id: route.params.id }).then(function(res) {
            //self._log("加载订单信息", res)

            copyTo(res.data.form, self.form)

            if (res.data.list) {
                confirmList(res.data.list).then(results => {
                    self._log(results)

                    self.tabledata = []
                    results.forEach(item => self.appendRow(item))

                    self.onDiscountChange(self.form.discountbrand)
                })

            }
            self._setTitle(self._label("querenwaibudingdan")+":"+self.form.id)
        })
    }
}
</script>
