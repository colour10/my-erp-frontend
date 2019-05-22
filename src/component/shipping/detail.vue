<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <au-button auth="confirmorder-submit" :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</au-button>
                <as-button :type="form.id?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</as-button>
                <as-button :type="canDelete?'primary':'info'" @click="deleteOrder()">{{_label("shanchu")}}</as-button>
                <as-button type="primary" @click="showDialog()">{{_label("daorudingdan")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('fahuodanhao')">
                        <el-input v-model="form.orderno" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form.supplierid" source="supplier_3"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('gonghuodanwei')">
                        <simple-select v-model="form.finalsupplierid" source="supplier_3"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('niandaijijie')">
                        <simple-select v-model="form.ageseason" source="ageseason"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('niandaileixing')">
                        <simple-select v-model="form.seasontype" source="seasontype">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('yewuleixing')">
                        <simple-select v-model="form.bussinesstype" source="bussinesstype">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('zhidanren')">
                        <sp-display-input :value="form.makestaff" source="user"></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('fahuogang')">
                        <el-input v-model="form.dispatchport"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('daohuogang')">
                        <el-input v-model="form.deliveryport"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('daohuocangku')">
                        <simple-select v-model="form.warehouseid" source="warehouse"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('haiwaifapiaohao')">
                        <el-input v-model="form.invoiceno"></el-input>
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
                    <!-- <el-form-item :label="_label('hetongmaifang')">
                        <simple-select v-model="form.buyerid" source="supplier"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('hetongmaifang2')">
                        <simple-select v-model="form.sellerid" source="supplier"></simple-select>
                    </el-form-item> -->
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('fukuanshijian')">
                        <el-date-picker v-model="form.paydate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('zhifufangshi')">
                        <simple-select v-model="form.paytype" source="paytype"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('anpaitihuoshijian')" class="mini font12">
                        <el-date-picker v-model="form.apickingdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('daokushijian')">
                        <el-date-picker v-model="form.aarrivaldate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('xiangshu')">
                        <el-input v-model="form.box_number"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhongliang')">
                        <el-input v-model="form.weight"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('tiji')">
                        <el-input v-model="form.volume"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('jifeizhongliang')">
                        <el-input v-model="form.chargedweight"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('kongyunshang')">
                        <simple-select v-model="form.transcompany" source="supplier"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('yunshufangshi')">
                        <simple-select v-model="form.transporttype" source="transporttype"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('hangbanhao')">
                        <el-input v-model="form.flightno"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('hangbanriqi')">
                        <el-date-picker v-model="form.flightdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('yujidaodariqi')">
                        <el-date-picker v-model="form.estimatedate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('zhudanhao')">
                        <el-input v-model="form.mblno"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zidanhao')">
                        <el-input v-model="form.hblno"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24" class="product">
                <el-table :data="tabledata_filter" stripe border style="width:100%;">
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
                    
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-confirm :columns="row.product.sizecontents" :row="row" :disabled="true" :key="row.product.id" @change="onChange" @hidden="onHide" mode="shipping"></sp-sizecontent-confirm>
                        </template>
                    </el-table-column>

                    <el-table-column prop="label" :label="_label('danjia')" width="100" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.price" size="mini"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="confirm_total" :label="_label('heji')" width="70" align="center" class="counter">
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
                </el-table>
            </el-col>
        </el-row>

        <sp-shipping-select :visible.sync="visible" @select="onSelect"></sp-shipping-select>
    </div>
</template>

<script>
import { extend, copyTo } from "../object.js"
import { shippingList } from "../asa/order-detail.js"
import chain from "../chain.js"
import Select from "./select.vue"

export default {
    name: 'asa-order-confirm-dialog',
    components:{
        "sp-shipping-select":Select
    },
    data() {
        let self = this;

        return {
            form: {
                supplierid: "",
                finalsupplierid: "",
                ageseason: "",
                seasontype: "",
                property: "",
                currency: "",
                bussinesstype: "",
                warehouseid: "",
                total: "",
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
                estimatedate: "",
                id: ""
            },
            tabledata: [],
            formid: "",
            title: "",
            visible:false
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        showDialog(){
            this.visible = true
        },
        saveOrder(status) {
            //保存订单
            var self = this

            var params = { form: self.form }
            var array = []

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
                                    discount: item.discountbrand,
                                    price:item.price
                                })
                            }
                        })
                    })
                }
            })
            params.list = list;

            self._log(JSON.stringify(params))
            self._submit("/shipping/add", { params: JSON.stringify(params) }).then(function(res) {
                self._log(res)
                if (res.data.form.id) {
                    self.form.id = res.data.form.id
                    self.formid = res.data.form.id
                }

                copyTo(res.data.form, self.form)
                self.$emit("change", res.data.form)
            });
        },
        showAttachment() {

        },
        deleteOrder() {
            const self = this
            if (!self.form.id) {
                return
            }
            self._remove("/confirmorder/delete", { id: self.form.id }).then(function(res) {
                self.$emit("change", self.form, "delete")
            });
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
        },
        onHide(row) {
            row.is_hidden = true
        },
        onSelect(row){
            this.appendRow(row)
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
        },
        width() {
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 50 + 191
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
        },
        tabledata_filter() {
            return this.tabledata.filter(item => item.is_hidden == false)
        }
    },
    mounted: function() {
        let self = this;
        let route = self.$route;
        let label // = route.params.id == 0 ? self._label("xinjiandingdan") : "订单信息"
        self._log(route.params)

        if(route.params.id>0) {
            self._fetch("/shipping/load", { id: route.params.id }).then(function(res) {
                //self._log("加载订单信息", res)

                copyTo(res.data.form, self.form)

                if (res.data.list) {
                    shippingList(res.data.list).then(results => {
                        self._log(results)

                        self.tabledata = []
                        results.forEach(item => self.appendRow(item))

                        self.onDiscountChange(self.form.discountbrand)
                    })

                }
                self._setTitle(self._label("fahuodan") + ":" + self.form.id)
            })
        }
        else {
            self._setTitle( self._label("shengchengfahuodan") )
        }        
    }
}
</script>
