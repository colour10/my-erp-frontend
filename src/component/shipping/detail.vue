<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <au-button auth="confirmorder-submit" :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</au-button>
                <as-button :type="form.id?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</as-button>
                <as-button type="primary" @click="showDialog()">{{_label("daorudingdan")}}</as-button>
                <as-button type="primary" @click="showProduct()">{{_label("xuanzeshangpin")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="8" style="width:600px">
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
                                <sp-float-input placeholder="" :select_value="total_price" class="input-with-select">
                                    <select-currency v-model="form.currency">
                                    </select-currency>
                                </sp-float-input>
                            </el-form-item>
                            <el-form-item :label="_label('huilv')">
                                <sp-float-input v-model="form.exchangerate"></sp-float-input>
                            </el-form-item>
                            <el-form-item :label="_label('zhidanriqi')">
                                <el-input :value="form.maketime" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="0">
                        <el-col :span="4" style="width:600px">
                            <el-form-item :label="_label('beizhu')" class="twocols">
                                <el-input v-model="form.memo" style="width:400px"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                <el-table :data="tabledata_filter" stripe border style="width:100%;" :show-summary="true" :summary-method="getSummary">
                    <el-table-column align="center" width="60">
                        <template v-slot="{row}">
                            <img :src="_fileLink(row.source.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="{row}">
                            {{row.source.product.getName()}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="center" width="150">
                        <template v-slot="{row}">
                            <sp-product-tip :product="row.source.product"></sp-product-tip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('bizhong')" width="60" align="center">
                        <template v-slot="{row}">
                            {{row.source.product.factorypricecurrency_label}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.source.product.factoryprice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row, $index}">
                            <sp-sizecontent-confirm :columns="row.source.product.sizecontents" :row="row.source" :disabled="true" :key="row.key" @change="onChange" mode="shipping"></sp-sizecontent-confirm>
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zhekoulv')" width="70" align="center" class="counter">
                        <template v-slot="{row}">
                            {{row.source.discountbrand}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('danjia')" width="100" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.price" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('heji')" width="70" align="center" class="counter">
                        <template v-slot="{row}">
                            {{row.source.confirm_total}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{getRowTotal(row)}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <sp-shipping-select :visible.sync="visible" @select="onSelect"></sp-shipping-select>

        <asa-select-product-dialog :visible.sync="pro" @select="onSelectProduct"></asa-select-product-dialog>
    </div>
</template>

<script>
import { StringFunc } from "../globals.js"
import { extend, copyTo } from "../object.js"
import { shippingList, shippingConvert, getProduct,createEmptyRow } from "../asa/order-detail.js"
import chain from "../chain.js"
import Select from "./select.vue"
import orderMixin from "../mixins/order.js"

export default {
    name: 'asa-order-confirm-dialog',
    components: {
        "sp-shipping-select": Select
    },
    mixins: [orderMixin],
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
                maketime:"",
                makestaff:"",
                id: ""
            },
            tabledata: [],
            visible: false,
            pro:false,
            getRowTotal(row) {
                return self.formatNumber(row.price*row.source.confirm_total)
            },
            getRowFactoryTotal(row) {
                return self.formatNumber(row.source.product.factoryprice*row.source.confirm_total)
            }
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        showDialog() {
            this.visible = true
        },
        showProduct() {
            this.pro = true;
        },
        onSelectProduct(productDetail) {
            let self = this;

            createEmptyRow({productDetail}).then(row=>{
                self.appendRow({
                    source: row,
                    id: "",
                    price: row.price
                })
            })            
        },       
        saveOrder(status) {
            //保存订单
            var self = this

            var params = { form: self.form }
            var array = []

            let list = []
            let uniques = {};
            let check_result = true;
            self.tabledata.forEach(item => {
                if (check_result && item.source.form) {
                    //检查重复发货的记录
                    let check_key = item.price + '_' + item.source.product.id
                    if (uniques[check_key]) {
                        alert(self._label("chongfushezhi") + ":" + item.source.product.getGoodsCode())
                        check_result = false
                    } else {
                        uniques[check_key] = true;
                    }

                    chain(item.source.form).forEach((values, orderid) => {
                        chain(values).forEach((row, sizecontentid) => {
                            if (row.number > 0) {
                                list.push({
                                    orderid,
                                    sizecontentid,
                                    number: row.number,
                                    productid: item.source.product.id,
                                    discount: item.source.discountbrand,
                                    price: item.price,
                                    orderdetailsid: row.id,
                                    id: row.shippingdetailid
                                })
                            }
                        })
                    })
                }
            })
            params.list = list;

            if (!check_result) {
                return
            }

            self._log(JSON.stringify(params))
            self._submit("/shipping/save", { params: JSON.stringify(params) }).then(function(res) {
                //self._log(res)

                self.convertList(res)

                //copyTo(res.data, self.form)
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

            row.key = StringFunc.random(10)
            self.tabledata.unshift(row)
            self.form.currency = row.source.product.factorypricecurrency
        },
        onChange({ row, form, total }) {
            let self = this
            row.form = form
            row.confirm_total = total;
        },
        onSelect(row) {
            this._log(row)
            this.appendRow({
                source: row,
                id: "",
                price: row.price
            })
        },
        convertList(res) {
            let self = this
            copyTo(res.data.form, self.form)

            if (res.data.list) {
                self.tabledata = []
                shippingConvert(res.data.list).forEach(async line => {
                    let source = await getProduct(res.data.orderdetails_list, line.productid);
                    //self._log("line", line, source)

                    if(source) {
                        //如果有订单详情记录，不是发货单时候单独加入的
                        line.orders.forEach(function({ orderid, confirm_form }) {
                            //self._log(confirm_form, "XXXXX")
                            let index = source.orders.findIndex(item => {
                                return item.order.id == orderid })
                            extend(source.orders[index].confirm_form, confirm_form)
                        })
                    }
                    else {

                    }
                    

                    self.appendRow({
                        source: source,
                        price: line.price
                    })
                })

            }
        },
        getSummary({columns, data}){
            const self = this
            const sums = []
            columns.forEach((column, index) => {
                //self._log(column, index)
                if(index==0) {
                    sums[index] = self._label("heji")
                    return
                }
                else if(index==4) {
                    sums[index] = data.reduce((total, row)=>total+self.getRowFactoryTotal(row), 0)
                }
                else if(index==8) {
                    sums[index] = data.reduce((total, row)=>total+row.source.confirm_total*1, 0)
                }
                else if(index==9) {
                    sums[index] = data.reduce((total, row)=>total+self.getRowTotal(row), 0)
                }
            })

            return sums
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
            return this.tabledata.reduce((max, { source }) => Math.max(max, source.product.sizecontents.length), 1) * 50 + 191
        },
        total_price() {
            let self = this
            let total = self.tabledata.reduce(function(total, current) {
                return total + self.getRowTotal(current)
            }, 0)
            return self.formatNumber(total)
        },
        genders() {
            let obj = {}
            this.tabledata.forEach(item => {
                if (item.source.product.gender_label.length > 0) {
                    obj[item.source.product.gender_label] = 1
                }
            });
            return Object.keys(obj).join(",");
        },
        tabledata_filter() {
            return this.tabledata.filter(item => item.source.is_hidden == false)
        }
    },
    mounted: function() {
        let self = this;
        let route = self.$route;
        let label // = route.params.id == 0 ? self._label("xinjiandingdan") : "订单信息"
        self._log(route.params)

        if (route.params.id > 0) {
            self._fetch("/shipping/load", { id: route.params.id }).then(function(res) {
                //self._log("加载订单信息", res)

                self.convertList(res)
                self._setTitle(self._label("fahuodan") + ":" + self.form.id)
            })
        } else {
            self._setTitle(self._label("shengchengfahuodan"))
        }
    }
}
</script>
