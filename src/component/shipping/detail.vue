<template>
    <div>
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="formRules" :inline-message="false" :show-message="false">
            <el-row :gutter="0">
                <asa-button @click="saveOrder(1)" :enable="form.status!='2'">{{_label("baocun")}}</asa-button>
                <asa-button @click="_showDialog('order-dialog')" :enable="form.status!='2'">{{_label("daorudingdan")}}</asa-button>
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
                            <el-form-item :label="_label('daohuocangku')" prop="warehouseid">
                                <simple-select v-model="form.warehouseid" source="warehouse"></simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('haiwaifapiaohao')">
                                <el-input v-model="form.invoiceno"></el-input>
                            </el-form-item>
                            <el-form-item :label="_label('zongjine')">
                                <sp-float-input placeholder="" :select_value="total_price" class="input-with-select">
                                    <simple-select source="currency" :clearable="false" v-model="form.currency"></simple-select>
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
            <el-col :span="24" class="product" style="margin-top:2px;">
                <el-table ref="table" :data="orderbrands" stripe border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
                    <el-table-column type="selection" :width="30" align="center"></el-table-column>
                    <el-table-column prop="orderno" :label="_label('dingdanbianhao')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-order-tip column="orderno" :order="row" trigger="hover"></sp-order-tip>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('gonghuoshang')" width="120" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.supplierid" source="supplier"></sp-select-text>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('dinghuoshuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{orderstat[row.id].totalCount}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('querenshuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{orderstat[row.id].totalConfirmCount}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('shengyushuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{orderstat[row.id].leftCount-currentstat[row.id]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('fahuoshuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{currentstat[row.id]||0}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('niandai')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.ageseason" source="ageseason"></sp-select-text>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('bizhong')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.currency" source="currency"></sp-select-text>
                        </template>
                    </el-table-column>
                    <el-table-column prop="discount" :label="_label('zhekoulv')" width="90" align="center"> </el-table-column>
                    <!-- <el-table-column :label="_label('xingbie')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.genders" source="gender"></sp-select-text>
                        </template>
                    </el-table-column> -->
                    <!-- <el-table-column :label="_label('pinpai')" width="150" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.brandids" source="brand"></sp-select-text>
                        </template>
                    </el-table-column> -->
                    <el-table-column :label="_label('yewuleixing')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.bussinesstype" source="bussinesstype"></sp-select-text>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('dingdanriqi')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.maketime && row.maketime.length>0 ? row.maketime.substr(0,10) : ""}}
                        </template>
                    </el-table-column>
                </el-table>
                <el-row :gutter="0">
                    <!-- <el-button type="warning" round @click="_showDialog('supplier-dialog')" size="mini">{{_label("piliangfenpei")}}</el-button> -->
                    <!--                     <el-button type="warning" round @click="resetDistribute" size="mini">{{_label("piliangchongzhi")}}</el-button>
 --></el-row>
                <el-row :gutter="0" class="product clearpadding" style="margin-top:3px">
                    <el-table ref="tabledetail" :data="orderdetails" stripe border style="width:100%;" @selection-change="onSelectionChange2" :show-summary="true" :summary-method="getSummary">
                        <el-table-column type="selection" :width="30" align="center"></el-table-column>
                        <el-table-column align="center" width="60">
                            <template v-slot="scope">
                                <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;" />
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('dinghuokehu')" align="center" width="150">
                            <el-table-column :label="_label('dinghuokehu')" align="center" width="150">
                                <template v-slot="{row}">
                                    <sp-order-tip column="booking_label" :order="row.order"></sp-order-tip>
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
                        <el-table-column prop="label" :label="_label('chengjiaojia')" width="80" align="center">
                            <template v-slot="{row}">
                                <el-input v-model="row.price" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                            <template v-slot="{row}">
                                {{ f(row.price*(count[row.key]) || 0) }}
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('zhekoulv')" width="80" align="center">
                            <template v-slot="{row}">
                                <el-input v-model="row.discount" size="mini" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                            <template v-slot="{row}">
                                <sp-sizecontent-confirm4 :ref="row.product.id+'-'+row.order.id" :columns="row.product.sizecontents" :head="row.form" :uniq="row.key" :data="getInit(row.key)" :key="row.key" @change="onNumberChange"></sp-sizecontent-confirm4>
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                            <template v-slot="{row}">
                                <el-popover placement="right" width="60" trigger="hover">
                                    <el-button size="mini" type="primary" @click="copyit(row)">{{_label("fuzhi")}}</el-button>
                                    <span slot="reference">{{row.product.getName()}}</span>
                                </el-popover>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-row>
            </el-col>
        </el-row>
        <sp-dialog ref="order-dialog">
            <el-form :model="form" label-width="85px" :inline="false" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-form-item :label="_label('niandai')">
                        <simple-select v-model="formimport.ageseason" source="ageseason"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="formimport.supplierid" source="supplier_3"></simple-select>
                    </el-form-item>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button auth="product" type="primary" @click="onSelect">{{_label("daorudingdan")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('order-dialog')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
    </div>
</template>

<script>
import { StringFunc } from "../globals.js"
import { extend, copyTo, extendu } from "../object.js"
import chain from "../chain.js"
import orderMixin from "../mixins/order.js"
import { Order, ProductDetail, promiseRunner } from "../model.js"
import { debounce } from "../function.js"
import { statHelper } from "../helper.js"

export default {
    name: 'sp-shippingdetail',
    components: {},
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
            formimport: {
                supplierid: "",
                ageseason: ""
            },
            form2: {
                supplierid: "",
                keyword: "",
                keyword1: "",
                suppliercode1: "",
                suppliercode: ""
            },
            tabledata: [],
            orderbrands: [],
            orderbranddetails: [],
            shippingdetails: [],
            listdata: [],
            selected: [],
            selected2: [],

            uniqkey: 1
        }
    },
    methods: {
        saveOrder() {
            //保存订单
            let self = this

            let params = { form: self.form }

            let list = []
            let uniques = {};
            //self.listdata.forEach(({ key, sizecontentid, number }) => {
            for(let { key, sizecontentid, number } of self.listdata) {
                if (number <= 0) {
                    continue;
                }

                let row = self.tabledata.find(item => item.key == key);
                console.log(">>>", row, sizecontentid)
                let orderbranddetail = self.orderbranddetails.find(item => item.orderbrandid == row.orderbrandid && item.sizecontentid == sizecontentid && item.productid == row.product.id && item.orderid == row.order.id);
                if(!orderbranddetail) {
                    // 商品没有在品牌订单上。
                    return ;
                }

                let check_key = [row.price, row.product.id, row.orderbrandid, sizecontentid].join('-')
                if (uniques[check_key]) {
                    return alert(self._label("chongfushezhi") + ":" + row.product.getGoodsCode())
                } else {
                    list.push({
                        orderid: row.order.id,
                        sizecontentid,
                        number: number,
                        productid: row.product.id,
                        discount: row.discount,
                        price: row.price,
                        orderdetailid: orderbranddetail.orderdetailid,
                        orderbrandid: row.orderbrandid,
                        orderbranddetailid: orderbranddetail.id,
                        id: '',
                    });

                    uniques[check_key] = 1
                }
            }
            params.list = list;

            self._log(JSON.stringify(params))
            self.validate().then(async () => {
                self._log(JSON.stringify(params));
                let {data} = await self._submit("/shipping/save", { params: JSON.stringify(params) });

                let path = '/shipping/warehousing/' + data.form.id;
                if(self._path()!==path) {
                    self._redirect(path);
                }
                else {
                    extend(self.form, data.form)
                }
            })
        },
        onNumberChange(list) {
            let self = this
            for(let { number, key, sizecontentid } of list) {
                let target = self.listdata.find(item => item.key == key && item.sizecontentid == sizecontentid);

                if (target) {
                    target.number = number;
                } else {
                    self.listdata.push({
                        key,
                        number,
                        sizecontentid,
                    });
                }
            }
        },
        copyit(row) {
            let self = this
            let newrow = extend({}, row)
            _private(self).appendRow(newrow)

            return newrow;
        },
        getInit(searchkey) {
            let self = this
            let result = []
            self.listdata.forEach(({ sizecontentid, key, number }) => {
                if (key == searchkey) {
                    result.push({ sizecontentid, number })
                }
            })
            return result
        },
        onSelect(row) {
            let self = this
            self._fetch("/orderbrand/searchorder", self.formimport).then(function({ data }) {
                self._log(data)
                let { orderbrands, orderbranddetails } = data;
                if (orderbrands) {
                    let func = _private(self)
                    func.importOrderbrands(orderbrands)
                    func.importList(orderbranddetails)
                }

                self._hideDialog("order-dialog")
            });
        },
        getSummary({ columns, data }) {
            const self = this
            const sums = []

            data = self.orderdetails
            columns.forEach((column, index) => {
                //self._log(column, index)
                if (index == 1) {
                    sums[index] = self._label("heji")
                    return
                } else if (index == 7) {
                    sums[index] = data.reduce((total, row) => {
                        let count = self.count[row.key] || 0
                        return self.f(total + row.price * count)
                    }, 0)
                } else if (index == 9) {
                    sums[index] = data.reduce((total, row) => {
                        let count = self.count[row.key] || 0
                        return total + count
                    }, 0)
                }
            })

            sums[2] = data.length

            return sums
        },
        onSelectionChange(vals) {
            let self = this
            this.selected = vals
        },
        onRowClick(row) {
            this.$refs.table.toggleRowSelection(row)
        },
        onSelectionChange2(vals) {
            this.selected2 = vals
        }
    },
    computed: {
        orderdetails() {
            let self = this
            let selected = {}

            self.selected.forEach(item => {
                selected[item.id] = 1
            })

            let keyword = self.form2.keyword.toUpperCase()
            let suppliercode = self.form2.suppliercode.toUpperCase()
            let isMatch = _private(self).isMatch
            return self.tabledata.filter(item => selected[item.orderbrandid] == 1).filter(item => {
                return isMatch(keyword, item.product.getGoodsCode('')) && isMatch(suppliercode, item.order.booking_label.toUpperCase())
            })
        },
        width() {
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 51 + 75
        },
        count() {
            let self = this;
            let result = {}
            self.listdata.forEach(({ key, number }) => {
                result[key] = result[key] || 0
                result[key] += number * 1;
            })
            return result
        },
        countbyid() {
            let self = this;
            let result = {}
            self.listdata.forEach(({ key, number }) => {
                let row = self.tabledata.find(item => item.key == key);
                key = row.orderbrandid
                result[key] = result[key] || 0
                result[key] += number * 1;
            })
            return result
        },
        total_price() {
            let self = this;
            let total = 0
            self.listdata.forEach(({ key, number }) => {
                let row = self.tabledata.find(item => item.key == key);

                total += row.price * number;
            })
            return total
        },
        orderstat() {
            let self = this;

            let helper = statHelper({
                totalCount: 0,
                totalConfirmCount: 0,
                totoaShippingCount: 0,
                brandCount: 0,
                leftCount: 0,
            });

            self.orderbrands.forEach((item)=>{helper.get(item.id);});

            self.orderbranddetails.forEach(detail => {
                let row = helper.get(detail.orderbrandid);

                row.totalCount += detail.number * 1; //客户定的总件数
                row.totalConfirmCount += detail.confirm_number * 1; //确认的件数
                row.totoaShippingCount += detail.shipping_number * 1; //发货的件数
                row.leftCount = row.totalConfirmCount - row.totoaShippingCount; //剩余未发货的件数
            })

            //如果是修改订单，剩余数量应该把当前订单的数量加上去。
            self.shippingdetails.forEach(detail => {
                let row = helper.get(detail.orderbrandid);
                row.leftCount += detail.number * 1;
            });

            return helper.result();
        },
        currentstat(){
            let self = this

            let result = {}
            self.orderbrands.forEach(item=>{
                result[item.id] = 0
            })

            self.listdata.forEach(({key, sizecontentid, number})=>{
                let row = self.tabledata.find(item => item.key == key);
                result[row.orderbrandid] += number*1
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

            self.orderbranddetails.forEach(detail => {
                let row = helper.get(detail.productid)
                row.factoryprice = detail.factoryprice;
                row.wordprice = detail.wordprice;
                row.currencyid = detail.currencyid;
            })

            return helper.result()
        }
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
        let route = self.$route;
        self._log(route.params)

        self.copyKeywordDebounce = debounce(function() {
            self.form2.keyword = self.form2.keyword1
        }, 1000, false)

        self.copySuppliercodeDebounce = debounce(function() {
            self.form2.suppliercode = self.form2.suppliercode1
        }, 1000, false)


        if (route.params.id > 0) {
            self._fetch("/shipping/load", { id: route.params.id, type: "shipping" }).then(async function({ data }) {
                let { form, orderbrands, orderbranddetails, shippingdetails } = data;
                let func = _private(self)

                copyTo(form, self.form)
                func.importOrderbrands(orderbrands)
                await func.importList(orderbranddetails)
                func.importShippingList(shippingdetails)
                self._setTitle(self._label("fahuodan") + ":" + self.form.orderno)
                self.$refs.table.toggleAllSelection()
            })
        } else {
            self._setTitle(self._label("shengchengfahuodan"))
        }

        self.initRules(Rules => {
            let _label = self._label
            return {
                warehouseid: Rules.id({ required: true, message: _label("8000"), label: _label("daohuocangku") })
            }
        })
    }
}

const _private = function(self) {
    const _this = {
        isMatch(keyword, search) {
            return keyword.length > 0 ? search.toUpperCase().indexOf(keyword) >= 0 : true;
        },
        async convert(list) {
            let result = {};
            for(let item of list) {
                //console.log("SSSSSSSS",item)
                let key = item.productid + '-' + item.orderbrandid;
                if (result[key]) {
                    result[key]['form'][item.sizecontentid] = item.confirm_number - item.shipping_number;
                    result[key].total += item.confirm_number - item.shipping_number;
                } else {
                    let form = {};
                    form[item.sizecontentid] = item.confirm_number - item.shipping_number;

                    result[key] = {
                        key,
                        productid: item.productid,
                        orderid: item.orderid,
                        discount: item.discount,
                        total: item.number * 1,
                        form,
                        orderbrandid: item.orderbrandid,
                        price: '',
                        is_auto: true,
                    };
                }
            }

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

            return await Promise.all(promises)
        },
        appendRow(row) {
            row.key = self.uniqkey
            self.tabledata.push(row)
            self.uniqkey++;
        },
        async importList(list) {
            let newlist = []
            for(let detail of list) {
                let target = self.orderbranddetails.find(item => item.id == detail.id)
                if (!target) {
                    self.orderbranddetails.push(detail)
                    newlist.push(detail)
                }

                // 默认设置币种
                if(self.form.currency=='' && detail.currencyid>0) {
                    self.form.currency = detail.currencyid;
                }
            }

            let result = await _this.convert(newlist)
            for(let item of result) {
                item.price = self.f(self.productStat[item.productid].factoryprice * item.discount)
                _this.appendRow(item)
            }
        },
        importOrderbrands(orderbrands) {
            for(let orderbrand of orderbrands) {
                let row = self.orderbrands.find(item => item.id == orderbrand.id)
                if (!row) {
                    self.orderbrands.push(orderbrand)

                    extendu(self.form, orderbrand, function({ target, key, value }) {
                        //console.log(key, value)
                        return value && target[key] == "" && (key == 'supplierid' || key == 'ageseason' || key == 'seasontype' || key == 'bussinesstype' || key == 'currency')
                    })
                }
            }
        },
        importShippingList(list) {
            let hash = {};
            let table = {};
            list.forEach(item => {
                //不显示入库操作时候，新追加的无订单的商品
                if(item.orderid<=0) {
                    return;
                }
                self.shippingdetails.push(item);

                let row = self.tabledata.find(row => {
                    return row.orderbrandid == item.orderbrandid && row.product.id == item.productid && row.order.id == item.orderid;
                });

                let key = item.productid + "-" + item.orderbrandid + '-' + item.price;
                if (table[key]) {
                    self.listdata.push({
                        key: table[key],
                        sizecontentid: item.sizecontentid,
                        number: item.number,
                    });
                } else {
                    if(hash[item.productid + "-" + item.orderbrandid]) {
                        let newrow = self.copyit(row);
                        newrow.price = item.price;
                        newrow.discount = item.discount;
                        self.listdata.push({
                            key: newrow.key,
                            sizecontentid: item.sizecontentid,
                            number: item.number,
                        });
                        table[key] = newrow.key;
                    }
                    else {
                        row.price = item.price;
                        row.discount = item.discount;
                        self.listdata.push({
                            key: row.key,
                            sizecontentid: item.sizecontentid,
                            number: item.number,
                        });

                        table[key] = row.key;
                        hash[item.productid + "-" + item.orderbrandid] = 1;
                    }
                }
            });
        },
    }

    return _this;
};
</script>
