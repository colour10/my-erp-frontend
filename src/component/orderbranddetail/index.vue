<template>
    <div>
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="rules" :inline-message="true">
            <el-row :gutter="0">
                <au-button auth="order-submit" :type="canSubmit?'primary':'info'" @click="saveOrder(1)">{{_label("baocun")}}</au-button>
                <au-button auth="order-submit" :type="canDelete?'primary':'info'" @click="deleteOrder()">{{_label("shanchu")}}</au-button>
                <as-button v-if="isEditable" :type="buttontype" @click="showProduct()">{{_label("xuanzeshangpin")}}</as-button>
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
                        <sp-float-input v-model="form.discountbrand"></sp-float-input>
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
            <el-col :span="24" class="product">
                <el-table :data="tabledata" stripe border style="width:100%;">
                    <el-table-column align="center" width="60">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('dinghuokehu')" align="center" width="150">
                        <template v-slot="{row}">
                            <sp-order-tip column="booking_label" :order="row.order"></sp-order-tip>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="_label('guojima')" align="center" width="200">
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
                    <el-table-column prop="label" :label="_label('chengjiaojia')" width="80" align="center">
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
                            <sp-sizecontent-input :columns="row.product.sizecontents" :row="row" :disabled="true" :key="row.product.id"></sp-sizecontent-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="scope">
                            {{scope.row.product.getName()}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="150" align="center" v-if="isEditable">
                        <template v-slot="scope">
                            <as-button size="mini" type="danger" @click="deleteRow(scope.row)">{{_label('shanchu')}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <asa-select-order-detail-dialog :visible.sync="pro" @select="onSelect"></asa-select-order-detail-dialog>
    </div>
</template>

<script>
import { extend, copyTo } from "../object.js"
import detailConvert from "../asa/order-detail.js"

export default {
    name: 'sp-orderbranddetail',
    components: {},
    props: {},
    data() {
        var self = this;
        let _label = self._label

        return {
            form: {
                foreignorderno: "",
                bussinesstype: "",
                supplierid: "",
                finalsupplierid: "",
                ageseason: "",
                seasontype: "",
                discountbrand: "",
                taxrebate: "",
                makestaff: "",
                maketime: "",
                memo: "",
                orderno: "",
                brandid: "",
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
                list.push({ 
                    productid: item.product.id, 
                    orderid: item.order.id 
                })
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

            let is_exist = self.tabledata.some(rowData => {
                return rowData.key == row.key
            })

            if (!is_exist) {
                self.tabledata.unshift(row)

                self.form.currency = row.product.factorypricecurrency
            }
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
    mounted: function() {
        let self = this;
        //self._log("mounted Order")
        //copyTo(self.data, this.form)
        let route = self.$route;
        let label // = route.params.id == 0 ? self._label("xinjiandingdan") : "订单信息"
        self._log(route.params)
        if (route.params.id == '0') {
            label = self._label("shengchengwaibudingdan")
        } else {
            self.tabledata = []
                //加载数据
            self._fetch("/orderbrand/loadorder", { id: route.params.id }).then(function(res) {
                //self._log("加载订单信息", res)

                copyTo(res.data.form, self.form)
                if (res.data.list) {
                    detailConvert(res.data.list).then(results => {
                        results.forEach(item => self.appendRow(item))
                    })
                }
                self._setTitle(self._label("waibudingdan") + self.form.id)
            })
            label = "loading..."
        }
        self._setTitle(label)
    }
}
</script>
