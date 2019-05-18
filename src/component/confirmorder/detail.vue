<template>
    <div>
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('gonghuoshang')">
                            <simple-select v-model="form.supplierid" source="supplier"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('gonghuodanwei')">
                            <simple-select v-model="form.finalsupplierid" source="supplier"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaijijie')">
                            <simple-select v-model="form.ageseasonid" source="ageseason"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('niandaileixing')">
                            <simple-select v-model="form.seasontype" source="seasontype">
                            </simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('daohuocangku')">
                            <simple-select v-model="form.warehouseid" source="warehouse"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('shuxing')">
                            <simple-select v-model="form.property" source="orderproperty">
                            </simple-select>
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
                        <el-form-item :label="_label('zhidanren')">
                            <sp-display-input :value="form.makestaff" source="user"></sp-display-input>
                        </el-form-item>
                        <el-form-item :label="_label('shenheren')">
                            <sp-display-input :value="form.auditstaff" source="user"></sp-display-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('fahuodanhao')">
                            <el-input v-model="form.orderno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('fukuanshijian')">
                            <el-date-picker v-model="form.paydate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('daidiandanwei')">
                            <simple-select v-model="form.dd_company" source="supplier"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('anpaitihuoshijian')" class="mini font12">
                            <el-date-picker v-model="form.apickingdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('hangbanhao')">
                            <el-input v-model="form.flightno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('hangbanriqi')">
                            <el-date-picker v-model="form.flightdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('zhudanhao')">
                            <el-input v-model="form.mblno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('zidanhao')">
                            <el-input v-model="form.hblno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('fahuogang')">
                            <el-input v-model="form.dispatchport"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('daohuogang')">
                            <el-input v-model="form.deliveryport"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('xiangshu')">
                            <el-input v-model="form.box_number"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('zhongliang')">
                            <el-input v-model="form.weight"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('tiji')">
                            <el-input v-model="form.volume"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('jifeizhongliang')">
                            <el-input v-model="form.chargedweight"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('kongyunshang')">
                            <simple-select v-model="form.transcompany" source="supplier"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('haiwaifapiaohao')">
                            <el-input v-model="form.invoiceno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('daokushijian')">
                            <el-date-picker v-model="form.aarrivaldate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <!--<el-form-item :label="_label('hangbanriqi')">
                            <el-date-picker v-model="form.flightdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>-->
                        <el-form-item :label="_label('hetongmaifang')">
                            <simple-select v-model="form.buyerid" source="supplier"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('hetongmaifang2')">
                            <simple-select v-model="form.sellerid" source="supplier"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('yunshufangshi')">
                            <simple-select v-model="form.transporttype" source="transporttype"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('zhifufangshi')">
                            <simple-select v-model="form.paytype" source="paytype"></simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <au-button auth="confirmorder-submit" :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</au-button>
                            <auth auth="confirmorder-submit">                                
                                <as-button :type="canSubmit?'primary':'info'" @click="saveOrder(2)">{{_label("tijiaoshenhe")}}</as-button>
                            </auth>
                            <as-button :type="form.id?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</as-button>
                            <auth auth="confirmorder-submit">
                                <as-button :type="canDelete?'primary':'info'" @click="deleteOrder()">{{_label("shanchu")}}</as-button>
                            </auth>
                        </el-row>
                        <auth auth="warehousing">
                            <el-row type="flex" justify="start">
                                <as-button type="primary" @click="createWarehousing()">{{_label("shengchengrukudan")}}</as-button>
                            </el-row>
                        </auth>
                        <el-row type="flex" justify="start">
                            <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <auth auth="confirmorder-submit">
                <el-row type="flex" justify="end" v-if="canSubmit">
                    <el-col :offset="22" :span="2">
                        <as-button type="primary" @click="showProduct()">{{_label("xuanzeshangpin")}}</as-button>
                    </el-col>
                </el-row>
            </auth>
            <el-row>
                <el-col :span="24">
                    <el-table :data="tabledata" stripe border style="width:100%;">
                    <el-table-column align="center" width="60">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="350">
                        <template v-slot="scope">
                            {{scope.row.product.getName()}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="center" width="200">
                        <template v-slot="scope">
                            {{scope.row.product.getGoodsCode()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="130" align="center">
                        <template v-slot="{row}">
                            {{row.product.factorypricecurrency_label}} {{row.product.factoryprice}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chengjiaojia')" width="130" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice*row.discount}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{row.product.factoryprice*row.discount*row.total}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="discount" :label="_label('zhekoulv')" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-confirm :columns="row.product.sizecontents" :orders="row.orders" :disabled="true" :key="row.product.id"></sp-sizecontent-confirm>
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

export default {
    name: 'sp-orderbranddetail',
    components: {},
    props: {},
    data() {
        var self = this;
        let _label = self._label

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
                status: "", //状态:1-未提交审核；2-待审核；3-审核完成,4-作废
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
            pro: false,
            formid: ''
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        showProduct() {
            this.pro = true;
        },
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
        saveOrder(status) {
            //保存订单
            let self = this


            //self.validate(function() {
            let params = {
                form: extend({}, self.form, { status })
            }

            let list = []
            self.tabledata.forEach(item => {
                list.push({ productid: item.product.id, orderid: item.order.id })
            })
            params.list = list;

            self._submit("/orderbrand/save", { params: JSON.stringify(params) }).then(function(res) {
                self._log(res)
                let data = res.data
                if (data.id) {
                    copyTo(data, self.form)
                    self.formid = self.form.id
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
            return this.tabledata.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 60 + 21
        },
        canSubmit() {
            var status = this.form.status;
            return status != 2 && status != 3
        },
        total_price() {
            return this.tabledata.reduce(function(total, current) {
                return total + current.total * current.product.factoryprice * current.discount
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
    mounted:function(){
        let self = this;
        let route = self.$route;
        let label // = route.params.id == 0 ? self._label("xinjiandingdan") : "订单信息"
        self._log(route.params)
        if (route.params.action == 'create') {
            self._fetch("/orderbrand/loadorder", { id: route.params.id }).then(function(res) {
                //self._log("加载订单信息", res)

                //copyTo(res.data.form, self.form)
                if (res.data.list) {
                    confirmList(res.data.list).then(results => {
                        self._log(results)

                        self.tabledata = []
                        results.forEach(item => self.appendRow(item))
                    })
                }
                self._setTitle(self._label("shengchengquerendan"))
            })
            label = "loading..."
        } else {
            
                //加载数据
            self._fetch("/orderbrand/loadorder", { id: route.params.id }).then(function(res) {
                //self._log("加载订单信息", res)

                //copyTo(res.data.form, self.form)
                if (res.data.list) {
                    confirmList(res.data.list).then(results => {
                        self._log(results)

                        self.tabledata = []
                        results.forEach(item => self.appendRow(item))
                    })
                }
                self._setTitle(self._label("querendan") + self.form.id)
            })
            label = "loading..."
        }
        //self._setTitle(label)
    }
}
</script>

