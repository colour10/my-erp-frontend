<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <au-button auth="confirmorder-submit" type="danger" @click="saveOrder(1)" v-if="form.status=='1'">{{_label("ruku")}}</au-button>
                <!-- <as-button :type="form.id?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</as-button> -->
                <as-button type="primary" @click="showProduct()" v-if="form.status=='1'">{{_label("xuanzeshangpin")}}</as-button>
                <as-button type="danger" @click="cancel()" v-if="form.status=='2'">{{_label("quxiaoruku")}}</as-button>
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
                                    <simple-select source="currency" :clearable="false" v-model="form.currency">
                                    </simple-select>
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
                <el-table :data="tabledata" stripe border style="width:100%;" :show-summary="true" :summary-method="getSummary">
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
                            {{row.source.discount}}
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
import { Order, ProductDetail, promiseRunner } from "../model.js"

const result = {
    name: 'sp-warehousing',
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
                id: "",
                status:""
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
        showProduct() {
            this.pro = true;
        },
        onSelectProduct(productDetail) {
            let self = this;

            createEmptyRow({productDetail}).then(row=>{
                _private(self).appendRow({
                    source: row,
                    id: "",
                    price: row.price
                })
            })            
        },       
        saveOrder(status) {
            //保存订单
            let self = this

            let params = { form: self.form }
            let array = []

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
                            list.push({
                                orderid,
                                sizecontentid,
                                number: row.number,
                                productid: item.source.product.id,
                                discount: item.source.discountbrand,
                                price: item.price,
                                id: row.id
                            })
                        })
                    })
                }
            })
            params.list = list;

            if (!check_result) {
                return
            }

            self._log(JSON.stringify(params))
            self._submit("/shipping/warehousing", { params: JSON.stringify(params) }).then(function(res) {
                _private(self).loadDetail(self.$route.params.id)
            });
        },
        cancel() {
            let self = this;

            if(!confirm(self._label("quxiaorukutishi"))) {
                return 
            }

            self._submit("/shipping/cancel", { id:self.form.id }).then(function(res) {
                _private(self).loadDetail(self.$route.params.id)
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
        onChange({ row, form, total }) {
            let self = this
            row.form = form
            row.confirm_total = total;
        },
        onSelect(row) {
            _private(this).appendRow({
                source: row,
                id: "",
                price: row.price
            })
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

            sums[1] = data.length

            return sums
        }        
    },
    computed: {
        width() {
            return this.tabledata.reduce((max, { source }) => Math.max(max, source.product.sizecontents.length), 1) * 50 + 191
        },
        total_price() {
            let self = this
            let total = self.tabledata.reduce(function(total, current) {
                return total + self.getRowTotal(current)
            }, 0)
            return self.formatNumber(total)
        }
    },
    mounted: function() {
        let self = this;
        _private(self).loadDetail(self.$route.params.id)
    }
}

const _private = function(self){
    const _this = {
        appendRow(row) {
            row.key = StringFunc.random(10)
            //self._log(row, "XXXXX")
            self.tabledata.unshift(row)
            self.form.currency = row.source.product.factorypricecurrency
        },

        //将发货单明细转化成商品、订单、列表
        async convertListToProductList(list) {
            let result = {}
            list.forEach(item => {
                //console.log("SSSSSSSS",item)
                let key = item.price + "-" + item.productid +'-'+ item.orderid
                if (result[key]) {
                    result[key]['form'][item.sizecontentid] = {number:item.number, id:item.id}
                    result[key]['confirm_form'][item.sizecontentid] = {number:item.warehousingnumber, id:item.id}
                } else {
                    let form = {}                    
                    form[item.sizecontentid] = {number:item.number, id:item.id}

                    let confirm_form = {}
                    confirm_form[item.sizecontentid] = {number:item.warehousingnumber, id:item.id}
                    result[key] = {
                        key,
                        productid: item.productid,
                        orderid:item.orderid,
                        price:item.price*1,
                        discount:item.discount,
                        form,
                        confirm_form
                    }
                }
            })

            let promises = []
            chain(result).forEach(item => {
                //console.log(item,"==")
                let runner = promiseRunner(item)

                if(item.orderid>0) {
                    runner.push(Order.load({ data: item.orderid, depth: 1 }), "order")
                }
                else {
                    item.order = {id:-1}
                }
                
                runner.push(ProductDetail.load({ data: item.productid, depth: 1 }), "product")
                
                promises.push(runner.all())
            })

            let rows = await Promise.all(promises)

            let hash = {}
            rows.forEach(item=>{
                let key = item.productid + item.price
                if (!hash[key]) {
                    hash[key] = {
                        product:item.product,
                        orders: [],
                        price:item.price,
                        discount:item.discount
                    }
                }

                item.product.sizecontents.forEach(sizecontent=>{
                    if(!item.form[sizecontent.id]) {
                        item.form[sizecontent.id] = {number:0, id:""}
                        item.confirm_form[sizecontent.id] = {number:0, id:""}
                    }
                })

                hash[key].orders.push({                        
                    confirm_form:item.confirm_form,
                    form:item.form,
                    order:item.order
                })
            })

            return chain(hash).toArray((key,value)=>value).array()
        },
        loadDetail(id) {
            self._setTitle("Loading...")
            self._fetch("/shipping/load", { id }).then(async function(res) {
                //self._log("加载订单信息", res)

                copyTo(res.data.form, self.form)
                if (res.data.list) {
                    let results = await _this.convertListToProductList(res.data.list)

                    self.tabledata = []
                    results.forEach(row=>{
                        row.confirm_total = 0
                        _this.appendRow({
                            source: row,
                            price: row.price
                        })
                    })                    
                }
                self._setTitle(self._label("fahuodanruku") + ":" + self.form.id)
            })
        }
    }

    return _this
}

export default result;
</script>
