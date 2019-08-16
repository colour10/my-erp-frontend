<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <asa-button @click="saveInfo()" :enable="form.status>0">{{_label("baocunxinxi")}}</asa-button>
                <asa-button @click="confirmShipping()" :enable="form.status=='1'">{{_label("querenruku")}}</asa-button>
                <asa-button @click="pro=true" :enable="form.status=='1'">{{_label("xuanzeshangpin")}}</asa-button>
                <asa-button @click="cancelConfirm()" :enable="form.status=='2'">{{_label("quxiaoqueren")}}</asa-button>
                <asa-button @click="warehousing()" :enable="form.status=='2'">{{_label("feiyongshuqi")}}</asa-button>
                <asa-button @click="cancelWarehousing()" :enable="form.status=='3'">{{_label("quxiao")}}</asa-button>
                <asa-button @click="showPayment()" :enable="form.status>0">{{_label("feiyong")}}</asa-button>
                <asa-button @click="$refs.qiancha.show()" :enable="form.id>0">{{_label("qiancha")}}</asa-button>
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
                                <sp-float-input placeholder="" :select_value="total_price" class="input-with-select" disabled>
                                    <simple-select source="currency" :clearable="false" v-model="form.currency" disabled>
                                    </simple-select>
                                </sp-float-input>
                            </el-form-item>
                            <el-form-item :label="_label('huilv')">
                                <sp-float-input v-model="form.exchangerate" :disabled="form.status=='3'"></sp-float-input>
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
                <el-table :data="orderdetails" stripe border style="width:100%;" :show-summary="true" :summary-method="getSummary">
                    <el-table-column align="center" width="60">
                        <template v-slot="{row}">
                            <img :src="_fileLink(row.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('dinghuokehu')" align="center" width="150">
                        <el-table-column :label="_label('dinghuokehu')" align="center" width="150">
                            <template v-slot="{row}">
                                <sp-order-tip column="booking_label" :order="row.order" v-if="row.order"></sp-order-tip>
                            </template>
                            <template v-slot:header="{row}">
                                <el-input v-model="form2.suppliercode1" size="mini" />
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="center" width="200">
                        <el-table-column :label="_label('guojima')" align="center" width="200">
                            <template v-slot="scope">
                                <sp-product-tip :product="scope.row.product"></sp-product-tip>
                            </template>
                            <template v-slot:header="{row}">
                                <el-input v-model="form2.keyword1" size="mini" />
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('bizhong')" width="60" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="productStat[row.productid].currencyid" source="currency" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{productStat[row.product.id].factoryprice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row, $index}">
                            <sp-sizecontent-confirm4 :columns="row.product.sizecontents" :head="row.form" :uniq="row.key" :data="getInit(row.key)" :key="row.key" @change="onNumberChange" :disabled="isDisabled"></sp-sizecontent-confirm4>
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zhekoulv')" width="70" align="center" class="counter">
                        <template v-slot="{row}">
                            {{row.discount}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chengjiaojia')" width="100" align="center" prop="price">
                        <template v-slot="{row}">
                            <el-input v-model="row.price" size="mini" v-if="!row.order"  :disabled="isDisabled"/>
                            <span v-if="row.order">{{row.price}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chengben')" width="100" align="center" prop="price">
                        <template v-slot="{row}">
                            <span v-if="row.order">{{costPrice[row.product.id]}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('rukuheji')" width="90" align="center" class="counter">
                        <template v-slot="{row}">
                            {{count[row.key]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('rukuzongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{f(count[row.key]*row.price)}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('fahuoheji')" width="90" align="center" class="counter">
                        <template v-slot="{row}">
                            {{shippingCount[row.key]}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('fahuozongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{f(shippingCount[row.key]*row.price)}}
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
        <asa-select-product-dialog ref="products" :visible.sync="pro" @select="onSelectProduct"></asa-select-product-dialog>
        <sp-dialog ref="search">
            <sp-product-search-form @search="search" @close="_hideDialog('search')"></sp-product-search-form>
        </sp-dialog>

        <sp-dialog ref="orderpayment" :width="900">
            <simple-admin-page v-bind="orderpayment" @after-update="loadDetail" @after-delete="loadDetail">
                <template v-slot="{form}">
                    <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="true" size="mini">
                        <el-form-item :label="_label('feiyongmingcheng')">
                            <simple-select v-model="form.feenameid" source="feename" class="width2"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('bizhong')">
                            <simple-select v-model="form.currencyid" source="currency" class="width2" @change="loadExchangerate(form, $event)"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('jine')">
                            <el-input v-model="form.amount" size="mini" class="width2"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('huilv')">
                            <el-input v-model="form.exchangerate" size="mini" class="width2"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('beizhu')">
                            <el-input v-model="form.memo" size="mini" class="width2"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
            </simple-admin-page>
        </sp-dialog>

        <sp-orderbrand-list ref="qiancha" :shippingid="form.id"></sp-orderbrand-list>
    </div>
</template>

<script>
import API from '../api.js';
import { StringFunc } from "../globals.js";
import { extend, copyTo } from "../object.js";
import chain from "../chain.js";
import orderMixin from "../mixins/order.js";
import { Order, ProductDetail, promiseRunner } from "../model.js";
import { debounce } from "../function.js";
import { statHelper } from "../helper.js";
import Asa_Orderbrand_List from '../asa/Asa_Orderbrand_List.vue';

const result = {
    name: 'sp-warehousing',
    components: {
        [Asa_Orderbrand_List.name]: Asa_Orderbrand_List,
    },
    mixins: [orderMixin],
    data() {
        let self = this;
        let _label = self._label;

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
                maketime: "",
                makestaff: "",
                id: "",
                status: ""
            },
            form2: {
                supplierid: "",
                keyword: "",
                keyword1: "",
                suppliercode1: "",
                suppliercode: ""
            },
            tabledata: [],
            shippingdetails: [],
            orderbranddetails:[],
            listdata: [],
            costs: [], //成本数据
            uniqkey: 1,
            visible: false,
            pro: false,
            orderpayment:{
                columns: [
                    { name: "feenameid", label: _label("feiyongmingcheng"), type: 'select', source: "feename", width:110 },
                    { name: "currencyid", label: _label("bizhong"), type: 'select', source: "currency", width:90 },
                    { name: "amount", label: _label("jine"), width:110 },
                    { name: "exchangerate", label: _label("huilv"), width:110 },
                    { name: "memo", label: _label("beizhu"), width:110 },
                    { name: "makestaff", label: _label("tijiaoren"), type: 'select', source: "user", is_edit_hide:true, width:110 }
                ],
                controller: "shippingfee",
                auth: "shippingfee",
                base:{
                    shippingid:''
                },
                options:{
                    isedit: (item)=>self.form.status>0 && self.form.status!='3',
                    isdelete: (item)=>self.form.status>0 && self.form.status!='3',
                    isAdd: ()=>self.form.status>0 && self.form.status!='3',
                    isSearch: false,
                    isAutoReload: true,
                }
            }
        }
    },
    methods: {
        loadDetail() {
            const self = this;
            _private(self).loadDetail(self.$route.params.id);
        },
        async loadExchangerate(form, event) {
            const self = this;
            console.log(form, event)
            form.exchangerate = '';
            let exchangerate = await API.getExchange(form.currencyid, self.form.currency);

            if(form.exchangerate=='') {
                form.exchangerate = exchangerate;
            }
        },
        showPayment(){
            let self = this;
            self.orderpayment.base.shippingid = self.form.id;
            self._showDialog("orderpayment");
        },
        onSelectProduct(productDetail) {
            let self = this;

            _private(self).appendRow({
                productid: productDetail.id,
                product: productDetail,
                discount: 1,
                price: "",
                form: {},
            });
        },
        onNumberChange(list) {
            let self = this;
            list.forEach(({ number, key, sizecontentid }) => {
                let target = self.listdata.find(item => item.key == key && item.sizecontentid == sizecontentid);

                if(target) {
                    target.number = number;
                } else {
                    self.listdata.push({
                        key,
                        number,
                        sizecontentid,
                    });
                }
            })
        },
        search(form) {
            let self = this
            self.pro = true
            self.$refs.products.search(form)
        },
        saveInfo() {
            // 保存信息
            const self = this;

            self._submit("/shipping/saveinfo", self.form).then(function(res) {
                _private(self).loadDetail(self.$route.params.id);
            });
        },
        confirmShipping(status) {
            //保存订单
            let self = this;

            if(!confirm(self._label("confirm-ruku"))) {
                return
            }

            let params = { form: self.form }

            let check_result = true;
            let list = []
            self.listdata.forEach(({ key, sizecontentid, number }) => {
                if(number <= 0) {
                    return
                }

                let row = self.tabledata.find(item => item.key == key);
                let detail = self.shippingdetails.find(item => item.productid == row.product.id && item.orderid == row.orderid && item.sizecontentid == sizecontentid && item.orderbrandid == row.orderbrandid)

                if(row.price<=0) {
                    alert(self._label("tip-jiagebunengweikong"))
                    check_result = false;
                }

                list.push({
                    sizecontentid,
                    number: number,
                    productid: row.product.id,
                    discount: row.discount,
                    price: row.price,
                    id: detail ? detail.id : 0
                });
            })
            params.list = list;

            self._log(JSON.stringify(params))
            self._submit("/shipping/confirm", { params: JSON.stringify(params) }).then(function(res) {
                _private(self).loadDetail(self.$route.params.id)
            });
        },
        warehousing(){
            let self = this;

            if (!confirm(self._label("quxiaorukutishi"))) {
                return
            }

            self._submit("/shipping/warehousing", self.form).then(function(res) {
                _private(self).loadDetail(self.$route.params.id)
            });
        },
        cancelWarehousing() {
            let self = this;

            if (!confirm(self._label("quxiaorukutishi"))) {
                return
            }

            self._submit("/shipping/cancel", { id: self.form.id }).then(function(res) {
                _private(self).loadDetail(self.$route.params.id)
            });
        },
        cancelConfirm() {
            let self = this;

            if (!confirm(self._label("quxiaorukutishi"))) {
                return
            }

            self._submit("/shipping/cancelconfirm", { id: self.form.id }).then(function(res) {
                _private(self).loadDetail(self.$route.params.id)
            });
        },
        getInit(searchkey) {
            let result = []
            this.listdata.forEach(({ sizecontentid, number, key }) => {
                if (searchkey == key) {
                    result.push({ sizecontentid, number })
                }
            })
            return result
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
        getSummary({ columns, data }) {
            const self = this
            const sums = []
            columns.forEach((column, index) => {
                //self._log(column, index)
                if (index == 0) {
                    sums[index] = self._label("heji")
                    return
                } else if (index == 5 || index == 9) {
                    sums[index] = data.reduce((total, row) => total + self.count[row.key], 0)
                }
                else if (index == 10) {
                    sums[index] = self.total_price;
                }
                else if (index == 11) {
                    sums[index] = self.shippingdetails.reduce((total, row) => total + row.number*1, 0)
                }
                else if (index == 12) {
                    sums[index] = self.shippingdetails.reduce((total, row) => total + row.number*row.price, 0);
                    sums[index] = self.f(sums[index]);
                }
            })

            sums[2] = data.length;

            return sums
        }
    },
    computed: {
        isAddFee() {
            return this.form.status!='3';
        },
        orderdetails() {
            let self = this

            let keyword = self.form2.keyword.toUpperCase()
            let suppliercode = self.form2.suppliercode.toUpperCase()
            let isMatch = _private(self).isMatch
            return self.tabledata.filter(item => {
                self._log(item, keyword, suppliercode)
                return isMatch(keyword, item.product.getGoodsCode('')) && ((item.order && isMatch(suppliercode, item.order.booking_label.toUpperCase())) || (!item.order && !suppliercode))
            })
        },
        width() {
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 51 + 75
        },
        count() {
            let self = this;
            let result = {};
            self.tabledata.forEach(item => result[item.key] = 0);
            self.listdata.forEach(({ key, number }) => {
                result[key] += number * 1;
            })
            return result
        },
        // 统计各个商品的发货总数量
        shippingCount() {
            let self = this;
            let result = self._newbox();
            for(let item of self.tabledata) {
                result[item.key] = 0;
                for(let key of Object.keys(item.form)) {
                    result[item.key] += item.form[key]*1;
                }
            }

            return result;
        },
        total_price() {
            let self = this;
            let total = 0
            self.listdata.forEach(({ key, number }) => {
                let row = self.tabledata.find(item => item.key == key);

                total += row.price * number;
            })
            return self.f(total);
        },
        productStat(){
            let self = this

            let helper = statHelper({
                factoryprice:0,
                wordprice:0,
                currencyid:"",
                total:0
            })

            self.tabledata.forEach(({product})=>{
                let row = helper.get(product.id)
                row.factoryprice = product.factoryprice;
                row.wordprice = product.wordprice;
                row.currencyid = product.factorypricecurrency;
            })

            self.orderbranddetails.forEach(detail => {
                let row = helper.get(detail.productid)
                row.factoryprice = detail.factoryprice;
                row.wordprice = detail.wordprice;
                row.currencyid = detail.currencyid;
            })

            return helper.result()
        },
        isDisabled(){
            return  this.form.status!='1'
        },
        costPrice() {
            let self = this;
            let result = {};

            self.tabledata.forEach(item=>{
                result[item.product.id] = item.price;
            });

            self.costs.forEach(item=>{
                result[item.productid] = self.f(item.amount/item.number);
            });
            return result;
        },
    },
    watch: {
        'form2.keyword1': function(newvalue) {
            //console.log(newvalue)
            this.copyKeywordDebounce()
        },

        'form2.suppliercode1': function(newvalue) {
            //console.log(newvalue)
            this.copySuppliercodeDebounce()
        }
    },
    mounted: function() {
        let self = this;

        self.copyKeywordDebounce = debounce(function() {
            self.form2.keyword = self.form2.keyword1
        }, 1000, false);

        self.copySuppliercodeDebounce = debounce(function() {
            self.form2.suppliercode = self.form2.suppliercode1
        }, 1000, false);

        _private(self).loadDetail(self.$route.params.id);
    }
}

const _private = function(self) {
    const _this = {
        isMatch(keyword, search) {
            return keyword.length > 0 ? search.toUpperCase().indexOf(keyword) >= 0 : true
        },
        appendRow(row) {
            row.key = StringFunc.random(10)
                //self._log(row, "XXXXX")
            self.tabledata.unshift(row)
            self.form.currency = self.productStat[row.product.id].currencyid;
        },

        //将发货单明细转化成商品、订单、列表
        async convert(list) {
            let result = {}
            list.forEach(item => {
                //console.log("SSSSSSSS",item)
                let key = item.price + "-" + item.productid + '-' + item.orderid
                if (result[key]) {
                    result[key]['form'][item.sizecontentid] = item.number;
                    result[key].total += item.number
                } else {
                    let form = {}
                    form[item.sizecontentid] = item.number

                    result[key] = {
                        key,
                        productid: item.productid,
                        orderbrandid: item.orderbrandid,
                        orderid: item.orderid,
                        discount: item.discount,
                        total: item.number * 1,
                        form,
                        price: item.price
                    }
                }
            })

            let promises = []
            chain(result).forEach(item => {
                //console.log(item,"==")
                let runner = promiseRunner(item)

                if (item.orderid > 0) {
                    runner.push(Order.load({ data: item.orderid, depth: 1 }), "order")
                }

                runner.push(ProductDetail.load({ data: item.productid, depth: 1 }), "product")

                promises.push(runner.all())
            })

            return await Promise.all(promises)
        },
        appendRow(row) {
            row.key = self.uniqkey
            self.tabledata.push(row)
            self.uniqkey++;
        },
        async importList(list) {
            self.shippingdetails = [];
            self.tabledata = [];
            self.listdata = [];

            self.shippingdetails.push(...list);

            let result = await _this.convert(list)
            for(let item of result) {
                _this.appendRow(item);
            }

            for(let detail of list) {
                let row = self.tabledata.find(item => item.productid == detail.productid && item.price == detail.price && item.orderid == detail.orderid);
                self.listdata.push({
                    key: row.key,
                    sizecontentid: detail.sizecontentid,
                    number: detail.warehousingnumber,
                });
            }
        },
        loadDetail(id) {
            self._setTitle("Loading...");
            self._fetch("/shipping/load", { id }).then(async function({ data }) {
                //self._log("加载订单信息", res)

                let { form, orderbrands, orderbranddetails, shippingdetails, costs } = data;
                copyTo(form, self.form);

                _this.importList(shippingdetails);
                self.orderbranddetails = orderbranddetails;

                // 成本数据
                if(costs) {
                    self.costs = [];
                    chain(costs).forEach(item=>{
                        self.costs.push(item);
                    });
                }

                self._setTitle(self._label('fahuodanruku') + ':' + self.form.orderno);
            });
        },
    };

    return _this;
}

export default result;
</script>
