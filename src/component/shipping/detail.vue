<template>
    <div>
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="formRules" :inline-message="false" :show-message="false">
            <el-row :gutter="0">
                <au-button auth="confirmorder-submit" type="primary" @click="saveOrder(1)" v-if="form.status!='2'">{{_label("baocun")}}</au-button>
                <as-button type="primary" @click="showAttachment()">{{_label("fujian")}}</as-button>
                <as-button type="primary" @click="_showDialog('order-dialog')" v-if="form.status!='2'">{{_label("daorudingdan")}}</as-button>
                <!--<as-button type="primary" @click="showProduct()">{{_label("xuanzeshangpin")}}</as-button>-->
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

                    <el-table-column :label="_label('fahuoshuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{orderstat[row.id].totoaShippingCount}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('shengyushuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{orderstat[row.id].leftCount}}
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
                    <el-table-column :label="_label('xingbie')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.genders" source="gender"></sp-select-text>
                        </template>
                    </el-table-column>
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
 -->                </el-row>
                <el-table ref="tabledetail" :data="tabledata" stripe border style="width:100%;" @selection-change="onSelectionChange2">
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
                            {{row.product.factorypricecurrency_label}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chengjiaojia')" width="80" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.price" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{ f(row.price*row.total) }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('zhekoulv')" width="80" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.discount" size="mini" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-confirm4 :ref="row.product.id+'-'+row.order.id" :columns="row.product.sizecontents" :head="row.form" :uniq="row.key" :data="[]" :key="row.key" @change="onNumberChange"></sp-sizecontent-confirm4>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="{row}">
                            <el-popover placement="right" width="60" trigger="hover">
                                <el-button size="mini" type="primary">{{_label("fuzhi")}}</el-button>
                                <span slot="reference">{{row.product.getName()}}</span>
                            </el-popover>
                        </template>
                    </el-table-column>
                </el-table>
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

export default {
    name: 'asa-order-confirm-dialog',
    components: {
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
            formimport:{
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
            orderbrands:[],
            orderbranddetails:[],
            shippingdetails:[],
            listdata:[],
            selected:[],
            selected2:[],

            uniqkey:1
        }
    },
    methods: {
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

            self.validate().then(()=>{
                self._log(JSON.stringify(params))
                self._submit("/shipping/save", { params: JSON.stringify(params) }).then(function(res) {
                });
            })            
        },
        showAttachment() {

        },
        onNumberChange(list){
            let self = this
            list.forEach(({ number, key, sizecontentid}) => {
                let target = self.listdata.find(item => item.key == key && item.sizecontentid==sizecontentid)

                if (target) {
                    target.number = number
                } else {
                    self.listdata.push({
                        key,
                        number,
                        sizecontentid
                    });
                }
            })
        },
        onChange({ row, form, total }) {
            let self = this
            row.form = form
            row.confirm_total = total;
        },
        onSelect(row) {
            let self = this
            self._fetch("/orderbrand/searchorder", self.formimport ).then(function({data}) {
                self._log(data)
                let {orderbrands, orderbranddetails} = data;
                if(orderbrands) {
                    let func = _private(self)
                    func.importOrderbrands(orderbrands)
                    func.importList(orderbranddetails)
                }

                self._hideDialog("order-dialog")
            });
        },
        getSummary({columns, data}){
            const self = this
            const sums = []
            /*columns.forEach((column, index) => {
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

            sums[1] = data.length*/

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
            return self.orderbranddetails.filter(item => selected[item.orderid] == 1).filter(item => {
                return isMatch(keyword, item.product.getGoodsCode('')) && isMatch(suppliercode, item.order.booking_label.toUpperCase())
            })
        },
        width() {
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 51 + 75
        },
        total_price() {
            let self = this;
            let total = 0
            self.listdata.forEach(({key, number})=>{
                let row = self.tabledata.find(item=>item.key==key);

                total += row.price * number;
            })
            return total
        },
        tabledata_filter() {
            return this.tabledata.filter(item => item.source.is_hidden == false)
        },
        orderstat() {
            let self = this;
            let result = {};            

            self.orderbranddetails.forEach(detail=>{
                if(!result[detail.orderbrandid]) {
                    result[detail.orderbrandid] = {
                        totalCount:0,
                        totalConfirmCount:0,
                        totoaShippingCount:0,
                        brandCount:0,
                        leftCount:0
                    }
                }

                let row = result[detail.orderbrandid]

                row.totalCount += detail.number*1;//客户定的总件数
                row.totalConfirmCount += detail.confirm_number*1; //确认的件数
                row.totoaShippingCount += detail.shipping_number*1; //发货的件数
                row.leftCount = row.totalConfirmCount-row.totoaShippingCount; //剩余未发货的件数
            })

            //如果是修改订单，剩余数量应该把当前订单的数量加上去。            
            self.shippingdetails.forEach(detail=>{
                let row = result[detail.orderbrandid]
                row.leftCount += detail.number*1;
            })

            console.log(result, '=====')

            return result
        },
    },
    mounted: function() {
        let self = this;
        let route = self.$route;
        self._log(route.params)

        if (route.params.id > 0) {
            self._fetch("/shipping/load", { id: route.params.id, type:"shipping" }).then(function(res) {
                //self._log("加载订单信息", res)

                self._setTitle(self._label("fahuodan") + ":" + self.form.id)
            })
        } else {
            self._setTitle(self._label("shengchengfahuodan"))
        }

        self.initRules(Rules=>{
            let _label = self._label
            return {
                warehouseid: Rules.id({ required: true, message: _label("8000"), label:_label("daohuocangku") })
            }
        })
    }
}

const _private = function(self) {

    const _this = {
        async convert(list) {
            let result = {}
            list.forEach(item => {
                //console.log("SSSSSSSS",item)
                let key = item.productid + '-' + item.orderbrandid
                if (result[key]) {
                    result[key]['form'][item.sizecontentid] = item.confirm_number - item.shipping_number
                    result[key]['confirm_form'][item.sizecontentid] = ""
                    result[key].total += item.confirm_number - item.shipping_number
                } else {
                    let form = {}
                    form[item.sizecontentid] = item.confirm_number - item.shipping_number

                    let confirm_form = {}
                    confirm_form[item.sizecontentid] = ""

                    result[key] = {
                        key,
                        productid: item.productid,
                        orderid: item.orderid,
                        discount: item.discount,
                        total: item.number * 1,
                        form,
                        confirm_form,
                        orderbrandid:item.orderbrandid,
                        price:"",
                        is_auto:true
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

            return await Promise.all(promises)
        }, 
        async importList(list) {
            let newlist = []
            list.forEach(detail=>{
                let target = self.orderbranddetails.find(item=>item.id==detail.id)
                if(!target) {
                    self.orderbranddetails.push(detail)
                    newlist.push(detail)
                }
            })
            let result = await _this.convert(newlist)
            result.forEach(item=>{
                item.key = self.uniqkey
                item.price = self.f(item.product.factoryprice*item.discount)
                self.tabledata.push(item)

                self.uniqkey++;
            })
        },
        importOrderbrands(orderbrands) {
            orderbrands.forEach(orderbrand=>{
                let row = self.orderbrands.find(item=>item.id==orderbrand.id)
                if(!row) {
                    self.orderbrands.push(orderbrand)

                    extendu(self.form, orderbrand, function({target, key, value}){
                        console.log(key, value)
                        return value && target[key]=="" && (key=='supplierid' || key=='ageseason' || key=='seasontype' || key=='bussinesstype' || key=='currency')
                    })
                }
                
            })
        }
    }

    return _this
}
</script>
