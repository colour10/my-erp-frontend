<template>
    <div>
        <el-form class="order-form" :model="form" label-width="82px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <asa-button @click="saveOrder" :enable="form.status!=2">{{_label("querenwaibudingdan")}}</asa-button>
                <asa-button @click="cancel" :enable="form.status==2">{{_label("quxiaoqueren")}}</asa-button>
                <asa-button @click="$refs.qiancha.show()">{{_label("qiancha")}}</asa-button>
                <asa-button @click="$refs.houcha.show()">{{_label("houcha")}}</asa-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('niandai')" required prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" disabled></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('jijie')">
                        <simple-select v-model="form.seasontype" source="seasontype" disabled></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinpai')">
                        <sp-display-input :value="form.brandid" source="brand"></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="_label('xingbie')">
                        <el-input v-model="genders" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form.supplierid" source="supplier_3" :clearable="true" disabled>
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('fahuoshang')">
                        <simple-select v-model="form.finalsupplierid" source="supplier_3" :clearable="true" disabled>
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('haiwaidingdanhao')">
                        <el-input v-model="form.foreignorderno" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('gongsidingdanhao')">
                        <el-input v-model="form.orderno" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('jine')">
                        <el-input :value="stat.total_discount_price" class="productcurrency" disabled>
                            <simple-select source="currency" :clearable="false" v-model="form.currency" slot="prepend" disabled>
                            </simple-select>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhekoulv')">
                        <el-input v-model="form.discount" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('tuishuilv')">
                        <el-input v-model="form.taxrebate" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('yewuleixing')">
                        <simple-select v-model="form.bussinesstype" source="bussinesstype" disabled></simple-select>
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
                <el-table :data="tabledata" stripe border style="width:100%;" :show-summary="true" :summary-method="getSummary">
                    <el-table-column align="center" width="60">
                        <template v-slot="{row}">
                            <img :src="_fileLink(row.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('guojima')" align="center" width="150">
                        <template v-slot="{row}">
                            <sp-product-tip :product="row.product"></sp-product-tip>
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('bizhong')" width="60" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="productStat[row.productid].currencyid" source="currency" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{f(productStat[row.productid].factoryprice)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zhekoulv')" width="70" align="center" class="counter">
                        <template v-slot="{row}">
                            {{row.discount}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chengjiaojia')" width="70" align="center">
                        <template v-slot="{row}">
                            {{f(row.discount*productStat[row.productid].factoryprice)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="confirm_total_price" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{ f(row.discount*productStat[row.productid].factoryprice*productStat[row.productid].total) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('querenshuliang')" align="center" :width="width">
                        <template v-slot="{row, $index}">
                            <sp-sizecontent-confirm3 :ref="$index" :columns="row.product.sizecontents" :row="row" :key="row.product.id" @change="onChange" :disabled="form.status==2" @up="focus($event, $index-1)" @down="focus($event, $index+1)"></sp-sizecontent-confirm3>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('shuliang')" width="70" align="center" class="counter">
                        <template v-slot="{row}">
                            {{productStat[row.productid].total}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="{row}">
                            {{row.product.getName()}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <sp-order-list ref="qiancha" :orderbrandid="form.id"></sp-order-list>
        <sp-shipping-list ref="houcha" :orderbrandid="form.id"></sp-shipping-list>
    </div>
</template>

<script>
import { extend, copyTo,extract } from "../object.js"
import chain from "../chain.js"
import orderMixin from "../mixins/order.js"
import { Order, ProductDetail, promiseRunner } from "../model.js"
import { statHelper } from "../helper.js";
import Asa_Order_List from '../asa/Asa_Order_List.vue';
import Asa_Shipping_List from '../asa/Asa_Shipping_List.vue';

export default {
    name: 'sp-orderconfirmdetail',
    components: {
        [Asa_Order_List.name]: Asa_Order_List,
        [Asa_Shipping_List.name]: Asa_Shipping_List,
    },
    mixins: [orderMixin],
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
                total: "",
                discountbrand: "",
                bussinesstype: "",
                status:"",
                id: ""
            },
            rules: {
                bussinesstype: { required: true, message: _label("8000") },
                supplierid: { required: true, message: _label("8000") },
                ageseason: { required: true, message: _label("8000") },
                property: { required: true, message: _label("8000") }
            },
            tabledata: [],
            listdata: [],
            details:[],
            orderDetailList:[], //客户订单明细
        }
    },
    methods: {
        onSelect(row) {
            let self = this;
            self.appendRow(row)
        },
        focus(colIndex, rowIndex) {
            let self = this;
            if(self.$refs[rowIndex]) {
                self.$refs[rowIndex].startFocus(colIndex);
            }
        },
        saveOrder() {
            //保存订单
            let self = this

            if(!confirm(self._label('tip-queren'))) {
                return
            }

            let func = _private(self)

            let params = {
                form: extend({}, self.form)
            }

            let list = []
            self.listdata.forEach(item => {
                if(item.number>0) {
                    list.push({
                        id:func.getOrderbrandDetailId(item.productid, item.orderid, item.sizecontentid),
                        number:item.number
                    })
                }
            })
            params.list = list;

            self._log(params)
            self._submit("/orderbrand/confirm", { params: JSON.stringify(params) }).then(function(res) {
                _private(self).loadDetail()
            }).catch(()=>{});
        },
        cancel() {
            //取消确认
            let self = this

            if(!confirm(self._label('tip-quxiaoqueren'))) {
                return
            }

            self._submit("/orderbrand/cancel", { id: self.form.id }).then(function(res) {
                _private(self).loadDetail()
            }).catch(()=>{});
        },
        appendRow(row) {
            const self = this;

            //row.source.confirm_total = 0;
            self._log("append",  row)
            self.tabledata.unshift(row)

            self.form.currency = row.product.factorypricecurrency
        },
        onChange(list) {
            let self = this

            list.forEach(item=>{
                let row = self.listdata.find(detail=>detail.orderid==item.order.id && detail.productid==item.product.id && detail.sizecontentid==item.sizecontentid)
                if(row) {
                    row.number = item.number
                }
                else {
                    self.listdata.push({
                        sizecontentid:item.sizecontentid,
                        productid:item.product.id,
                        orderid:item.order.id,
                        number:item.number,
                        product:item.product,
                        discount:item.discount
                    })
                }
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
                else if(index==6) {
                    sums[index] = self.stat.total_count
                }
                else if(index==9) {
                    sums[index] = self.stat.total_discount_price
                }
            })

            sums[1] = data.length
            return sums
        }
    },
    computed: {
        width() {
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 50 + 191
        },
        total_price() {
            let total = this.tabledata.reduce(function(total, current) {
                return total + current.confirm_total * current.price
            }, 0)
            return this.formatNumber(total)
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
        stat(){
            let self = this
            let result = {
                total_count:0,
                total_discount_price:0,
                group:{}
            }
            self.listdata.forEach(item=>{
                if(item.number>0) {
                    let number = item.number*1;

                    result.total_count += number;
                    result.total_discount_price = self.f(result.total_discount_price + self.productStat[item.productid].factoryprice * item.discount * number);
                    //console.log(item.product.factoryprice , item.discount , number)

                    let row = result.group[item.product.id] || 0
                    result.group[item.product.id] = row + number
                }
            })
            return result
        },
        productStat(){
            let self = this

            let helper = statHelper({
                factoryprice:0,
                wordprice:0,
                currencyid:"",
                total:0
            })

            self.tabledata.forEach(item=>{
                let row = helper.get(item.product.id)

                row.factoryprice = item.product.factoryprice;
                row.currencyid = item.product.factorypricecurrency;
                row.wordprice = item.product.wordprice;
            })

            self.orderDetailList.forEach(item=>{
                if(item.factoryprice>0) {
                    let row = helper.get(item.productid);
                    row.factoryprice = item.factoryprice;
                    row.currencyid = item.currencyid;
                    row.wordprice = item.wordprice;
                }
            })

            self.listdata.forEach(detail=>{
                let row = helper.get(detail.productid)

                if(detail.number>0) {
                    row.total += detail.number*1;
                }
            })

            return helper.result()
        }
    },
    mounted: function() {
        let self = this;

        _private(self).loadDetail()
        self._setTitle(self._label("querenwaibudingdan"))
    }
}

const _private = function(self){
    const _this = {
        loadDetail(){
            let params = self.$route.params;
            self._fetch("/orderbrand/load", { ids: params.id }).then(async function({ data }) {
                if(data.orderbrands && data.orderbrands.length>0) {
                    extend(self.form, data.orderbrands[0]);

                    let func = _private(self);
                    func.importList(data.list);

                    self.orderDetailList = data.details;

                    self._setTitle(self._label("querenwaibudingdan")+':' + self.form.orderno);
                }
            })
        },
        async convert(list) {
            let result = {}
            list.forEach(item => {
                //console.log("SSSSSSSS",item)
                let key = item.productid + '-' + item.orderid
                if (result[key]) {
                    result[key]['form'][item.sizecontentid] = item.number
                    result[key]['confirm_form'][item.sizecontentid] = item.confirm_number
                    result[key].total += item.number
                } else {
                    let form = {}
                    form[item.sizecontentid] = item.number
                    let confirm_form = {}
                    confirm_form[item.sizecontentid] = item.confirm_number
                    result[key] = {
                        key,
                        productid: item.productid,
                        orderid: item.orderid,
                        discount: item.discount,
                        total: item.number * 1,
                        form,
                        confirm_form
                    }
                }
            })

            let promises = []
            chain(result).forEach(item => {
                //console.log(item,"==")
                let runner = promiseRunner(item)

                if (item.orderid > 0) {
                    runner.push(Order.load({ data: item.orderid, depth: 1 }), "order")
                } else {
                    item.order = { id: -1 }
                }

                runner.push(ProductDetail.load({ data: item.productid, depth: 1 }), "product")

                promises.push(runner.all())
            })

            let rows = await Promise.all(promises)
            let hashtable = {}
            rows.forEach(row=>{
                let key = row.productid

                let obj = extract(row, ['order', 'form', 'confirm_form','total'])
                if (hashtable[key]) {
                    hashtable[key].orders.push(obj)
                } else {
                    hashtable[key] = {
                        productid: row.productid,
                        product: row.product,
                        discount:row.discount,
                        orders: [obj]
                    }
                }
            })

            return chain(hashtable).array()
        },
        async importList(list) {
            self.details = list;
            let result = await _this.convert(list)

            self.tabledata = []
            result.forEach(item=>{
                self.tabledata.push(item)
            })

            //初始化listdata
            self.listdata = []
            list.forEach(detail=>{
                let row = self.tabledata.find(item=>item.productid==detail.productid)
                self.listdata.push({
                    number:detail.confirm_number,
                    sizecontentid:detail.sizecontentid,
                    productid:detail.productid,
                    orderid:detail.orderid,
                    product:row.product,
                    discount:detail.discount
                })
            })
        },
        getOrderbrandDetailId(productid, orderid, sizecontentid){
            let row = self.details.find(item => item.productid == productid && item.orderid == orderid && item.sizecontentid == sizecontentid )
            //self._log(row, self.orderlist, productid, orderid, sizecontentid)
            return row ? row.id : 0;
        },
    }
    return _this
}
</script>

<style scoped>
    body {color:red;background:blue;}
</style>