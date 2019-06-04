<template>
    <div>
        <el-form ref="order-form" class="formx" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="rules" :inline-message="true">
            <el-row :gutter="0">
                <au-button auth="order-submit" :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</au-button>
                <!-- <au-button auth="order-submit" :type="canSubmitPayment?'primary':'info'" @click="addPayment">{{_label("shengchengfahuodan")}}</au-button> -->
                <au-button auth="order-submit" :type="canSubmitPayment?'primary':'info'" @click="addPayment">{{_label("fujian")}}</au-button>
                <au-button auth="order-submit" :type="canSubmitPayment?'primary':'info'" @click="addPayment">{{_label("feiyong")}}</au-button>
                <as-button v-if="isEditable" :type="buttontype" @click="showProduct()">{{_label("xuanzeshangpin")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="4" style="width:230px">
                    <el-form-item :label="_label('dinghuokehu')" required prop="bookingid">
                        <simple-select v-model="form.bookingid" source="supplier_2" :lang="lang">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('lianxiren')">
                        <simple-select v-model="form.linkmanid" source="supplierlinkman" :parentid="form.bookingid">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form.supplierid" source="supplier_3" :clearable="true">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('fahuoshang')">
                        <simple-select v-model="form.finalsupplierid" source="supplier_3" :clearable="true">
                        </simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:230px">
                    <el-form-item :label="_label('niandai')" required prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" :lang="lang"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('jijie')">
                        <simple-select v-model="form.seasontype" source="seasontype" :lang="lang">
                        </simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('yewuleixing')" required prop="bussinesstype">
                        <simple-select v-model="form.bussinesstype" source="bussinesstype" :lang="lang">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('shuxing')" required prop="property">
                        <simple-select v-model="form.property" source="orderproperty" :lang="lang">
                        </simple-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4" style="width:230px">
                    
                    <el-form-item :label="_label('jine')">
                        <el-input placeholder="" v-model="total_price" class="productcurrency">
                            <select-currency v-model="form.currency" slot="prepend">
                            </select-currency>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhekoulv')">
                        <sp-float-input v-model="form.discount" @change="onDiscountChange"></sp-float-input>
                    </el-form-item>
                    <el-form-item :label="_label('tuishuilv')">
                        <sp-float-input v-model="form.taxrebate"></sp-float-input>
                    </el-form-item>
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:230px">
                    <el-form-item :label="_label('kehudingdanhao')">
                        <el-input v-model="form.bookingorderno"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('gongsidingdanhao')">
                        <el-input v-model="form.orderno" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhidanren')">
                        <sp-display-input :value="form.makestaff" source="user" :placeholder="_label('zidonghuoqu')"></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="_label('dinghuoriqi')">
                        <el-date-picker v-model="form.orderdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="4" style="width:230px">                    
                    <el-form-item :label="_label('xingbie')">
                        <el-input v-model="genders" disabled></el-input>
                    </el-form-item>

                    <el-form-item :label="_label('pinpai')">
                        <el-input v-model="brands" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24" class="product">
                <el-table :data="tabledata" stripe border style="width:100%;" :show-summary="true" :summary-method="getSummary">
                    <el-table-column align="center" width="60">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="_label('guojima')" align="left" width="200">
                        <template v-slot="scope">
                            <sp-product-tip :product="scope.row.product"></sp-product-tip>
                        </template>
                    </el-table-column>

                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-input :columns="row.product.sizecontents" :row="row" :disabled="!isEditable" @change="onChange" :key="row.product.id"></sp-sizecontent-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="label" :label="_label('bizhong')" width="80" align="center">
                        <template v-slot="{row}">
                            {{row.product.factorypricecurrency_label}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjiaheji')" width="100" align="center">
                        <template v-slot="{row}">
                            {{formatNumber(row.getRowFactoryTotal())}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zhekoulv')" width="100" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.discount" size="mini"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="label" :label="_label('chengjiaojia')" width="130" align="center">
                        <template v-slot="{row}">
                            {{formatNumber(row.product.factoryprice*row.discount)}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chengjiaozongjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{formatNumber(row.getRowDealTotal())}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column prop="total" :label="_label('zongshu')" width="100" align="center">
                    </el-table-column>

                    <el-table-column :label="_label('chanpinmingcheng')" align="left" width="300">
                        <template v-slot="scope">
                            {{scope.row.product.getName()}}
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="_label('caozuo')" width="100" align="center" v-if="isEditable">
                        <template v-slot="{row}">
                            <as-button size="mini" type="danger" @click="deleteRow(row)">{{_label('shanchu')}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <!-- <el-row>
            <simple-admin-page v-bind="props" ref="payment" :hide-create="true" :hide-form="true" v-if="form.id>0"></simple-admin-page>
        </el-row> -->
        <asa-select-product-dialog :visible.sync="pro" @select="onSelect"></asa-select-product-dialog>
    </div>
</template>

<script>

import DataSource from '../DataSource.js'
import globals, { _label } from "../globals.js"
import { ProductDetail } from "../model.js"
import chain  from "../chain.js"
import {extend,copyTo}  from "../object.js"
import detailConvert from "./order-detail.js"
import orderMixin from "../mixins/order.js"

const props = {
    columns: [
        { name: "payment_type", label: _label("fukuanleixing"), type: 'select', source: "paymenttype" },
        { name: "currency", label: _label("bizhong"), type: 'select', source: "currency" },
        { name: "amount", label: _label("jine") },
        { name: "paymentdate", label: _label("fukuanriqi"), type: "date" },
        { name: "memo", label: _label("beizhu") },
        { name: "makestaff", label: _label("tijiaoren"), type: 'select', source: "user", is_edit_hide: true },
        { name: "status", label: _label("yiruzhang"), type: "switch", is_edit_hide: true }
    ],
    controller: "orderpayment",
    auth: "order-submit",
    base: {
        orderid: ''
    },
    options: {
        isedit: (item) => item.status == 0,
        isdelete: (item) => item.status == 0,
        autoreload: true
    }
}

export default {
    name: 'sp-orderform',
    components: {
    },
    mixins: [orderMixin],
    data() {
        let self = this;

        return {
            form: {
                bookingid: "",
                orderdate:"",
                linkmanid: "",
                bussinesstype: "",
                supplierid: "",
                finalsupplierid: "",
                ageseason: "",
                seasontype: "",
                bookingorderno: "",
                makedate: "",
                currency: "",
                discount: "",
                taxrebate: "",
                property: "1",
                makestaff: "",
                maketime: "",
                memo: "",
                orderno: "",
                status: "", //状态，1=保存；2=送审；3=审核完成
                id: ""
            },
            rules: {
                bussinesstype: { required: true, message: _label("8000") },
                supplierid: { required: true, message: _label("8000") },
                ageseason: { required: true, message: _label("8000") },
                property: { required: true, message: _label("8000") }
            },
            tabledata: [],
            title: "",
            lang: "",
            pro: false,
            formid: '',
            props,
            discounts:{}
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        addPayment() {
            let self = this;
            if (self.canSubmitPayment()) {
                props.base.orderid = self.form.id
                self.$refs.payment.showFormToCreate();
            }
        },
        showProduct() {
            this.pro = true;
        },
        onSelect(productDetail) {
            let self = this;
            self.appendRow({
                id:"",
                product: productDetail,
                discount: self.form.discount,
                total:0
            })
        },        
        saveOrder(status) {
            //保存订单
            let self = this


            //self.validate(function() {
                let params = {
                    form: extend({}, self.form, { status })
                }
                params.form.genders = self.genders
                params.form.total = self.total_price
                params.form.brands = self.brands

                let list = []
                self.tabledata.forEach(item => {
                    self._log("item", item)
                    if(item.form && item.total>0) {
                        chain(item.form).forEach((row, sizecontentid)=>{
                            list.push( {
                                id:item.id,
                                productid: item.product.id,
                                discount: item.discount,
                                sizecontentid: sizecontentid,
                                number: row.number,
                                id:row.id
                            } );
                        })
                    } 
                })
                params.list = list;

                self._submit("/order/saveorder", { params: JSON.stringify(params) }).then(function(res) {
                    self._log(res)
                    let data = res.data
                    if (data.form.id) {

                        copyTo(data.form, self.form)
                        self.formid = self.form.id
                        props.base.orderid = self.form.id
                    }
                    self.$emit("change", data.form)
                });
            //})

        },
        deleteRow(row) {
            var self = this;
            let index = self.tabledata.findIndex(item=>item==row)
            self.$delete(self.tabledata, index)
        },
        appendRow(row) {
            const self = this;

            let is_exist = self.tabledata.some(rowData => {
                return rowData.product.id == row.product.id
            })

            if (!is_exist) {
                self.tabledata.unshift(row)

                self.form.currency = row.product.factorypricecurrency
            }
        },
        onChange({row, form}) {
            let self = this
            self._log(row)
            row.form = form
            row.total = chain(form).toArray().array().reduce((total, item)=>total*1+item.value.number*1, 0)
            row.total = self.formatNumber(row.total)
            self._log(row.total)
        },
        onDiscountChange(newValue, oldValue){
            let self = this
            self.tabledata.forEach(item=>{
                if(item.discount==oldValue) {
                    item.discount = newValue
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
                else if(index==5) {
                    sums[index] = self.formatNumber(data.reduce((total, row)=>total+row.getRowFactoryTotal(), 0))
                }
                else if(index==8) {
                    sums[index] = self.formatNumber(data.reduce((total, row)=>total+row.getRowDealTotal(), 0))
                }
                else if(index==9) {
                    sums[index] = data.reduce((total, row)=>total+row.total, 0)
                }
            })

            sums[1] = data.length

            return sums
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
            return this.tabledata.reduce((max,{product})=>Math.max(max,product.sizecontents.length),1)*60+21
        },
        canSubmit() {
            var status = this.form.status;
            return status != 2 && status != 3
        },
        canSubmitPayment() {
            return this.form.id > 0
        },
        total_price() {
            let total = this.tabledata.reduce(function(total, current) {
                return total + current.total * current.product.factoryprice * current.discount
            }, 0)
            return this.formatNumber(total)
        },
        brands() {
            let obj = {}
            this.tabledata.forEach(item=>obj[item.product.brand_label]=1);
            return Object.keys(obj).join(",");
        },
        genders() {
            let obj = {}
            this.tabledata.forEach(item=>{
                if(item.product.gender_label.length>0) {
                    obj[item.product.gender_label]=1
                }                
            });
            return Object.keys(obj).join(",");
        }
    },
    mounted: function() {
        var self = this;
        //self._log("mounted Order")
        //copyTo(self.data, this.form)
        let route = self.$route;
        let label // = route.params.id == 0 ? self._label("xinjiandingdan") : "订单信息"
        if (route.params.id == 0) {
            label = self._label("xinjiandingdan")
        } else {
            self.tabledata = []
                //加载数据
            self._fetch("/order/loadorder", { id: route.params.id }).then(function(res) {
                //self._log("加载订单信息", res)

                copyTo(res.data.form, self.form)
                if (res.data.list) {

                    detailConvert(res.data.list).then(results=>{
                        results.forEach(item=>self.appendRow(item))
                    })
                }
                self._setTitle(self._label("dingdan") + self.form.id)
            })
            label = "loading..."
        }
        self._setTitle(label)
    }
}
</script>
