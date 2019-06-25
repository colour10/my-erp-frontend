<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <au-button auth="sales" :type="canYushou?'primary':'info'" @click="yushou()">{{_label("yushou")}}</au-button>
                <au-button auth="sales" :type="canTijiao?'primary':'info'" @click="tijiao()">{{_label("tijiao")}}</au-button>
                <au-button auth="sales" :type="form.id>0 && form.status!=2 ?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</au-button>
                <au-button auth="sales" :type="canZuofei?'primary':'info'" @click="zuofei()">{{_label("zuofei")}}</au-button>
                <au-button auth="sales" :type="form.id>0 ?'primary':'info'" @click="addReceive">{{_label("tianjiashoukuan")}}</au-button>
                <as-button type="primary" @click="showProduct()">{{_label("xuanzeshangpin")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('xiaoshouduankou')">
                        <simple-select ref="saleportid" v-model="form.saleportid" source="usersaleport" :lang="lang" @change="onChange" :disabled="form.status!=0"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('zhekou')">
                        <el-input v-model="form.discount" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('xiaoshoucangku')">
                        <simple-select v-model="form.warehouseid" source="userwarehouse" :lang="lang" :disabled="form.status!=0" @change="onWarehouseChange"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('xiaoshouriqi')">
                        <el-date-picker v-model="form.salesdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('huiyuan')">
                        <simple-select v-model="form.memberid" source="member" :lang="lang"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('xiaoshouren')">
                        <simple-select v-model="form.salesstaff" source="user" :lang="lang"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('waitudingdanhao')">
                        <el-input v-model="form.externalno"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('duizhangdanhao')">
                        <el-input v-model="form.ordercode"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhidanriqi')">
                        <el-input :value="form.makedate" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhidanren')">
                        <sp-display-input :value="form.makestaff" source="user"></sp-display-input>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('tihuofangshi')">
                        <simple-select v-model="form.pickingtype" source="pickingtype" :lang="lang"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('kuaidifukuanfang')">
                        <simple-select v-model="form.expresspaidtype" source="expresspaidtype" :lang="lang"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('kuaididanhao')">
                        <el-input v-model="form.expressno"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('kuaidifeiyong')">
                        <el-input v-model="form.expressfee"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('shouhuodizhi')">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row type="flex" justify="end" v-if="form.status==0">
            <el-col :span="24">
                <search :base="base" @select="onSelect"></search>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tabledata" stripe border style="width:100%;" v-if="form.status==0">
                    <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                        <template v-slot="scope">
                            {{scope.row.productstock.product.productname}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="warehousename" :label="_label('cangku')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.productstock.warehouse.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="warehouse_number" :label="_label('kucunshuliang')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.productstock.number}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="_label('danjia')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.productstock.goods.price}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="_label('zongjia')" width="100" align="center">
                        <template v-slot="scope">
                            {{form.discount*scope.row.productstock.goods.price*scope.row.number}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('shuliang')" width="200" align="center">
                        <template v-slot="scope">
                            <el-input-number v-model="scope.row.number" :min="1" :max="scope.row.productstock.warehouse.number*1"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('chengjiaojia')" width="200" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.dealprice" v-if="!scope.row.is_match"></el-input>
                            <el-input :value="form.discount*scope.row.productstock.goods.price*scope.row.number" v-if="scope.row.is_match" disabled></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('jiagepipei')" width="150" align="center">
                        <template v-slot="scope">
                            <el-switch v-model="scope.row.is_match"></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="150" align="center">
                        <template v-slot="scope">
                            <as-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">{{_label('shanchu')}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-table :data="tabledata" stripe border style="width:100%;" v-if="form.status!=0">
                    <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                    </el-table-column>
                    <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="warehousename" :label="_label('cangku')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.productstock.warehouse.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="price" :label="_label('danjia')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.price}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('xiaoshoushuliang')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.number}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="discount" :label="_label('zongjia')" width="100" align="center">
                        <template v-slot="scope">
                            {{form.discount*scope.row.price*scope.row.number}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="dealprice" :label="_label('chengjiaozongjia')" width="200" align="center">
                        <template v-slot="scope">
                            {{getDealPrice(scope.row)}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row><!-- 
        <el-row>
            <simple-admin-page v-bind="props" ref="receive" :hide-create="true" :hide-form="true" v-if="form.id>0"></simple-admin-page>
        </el-row> -->
        <sp-productstock-search ref="stocksearch" @select="onSelect"></sp-productstock-search>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js'
import { Productstock } from "../model.js"
import { extend, copyTo } from "../object.js"
import Asa_Productstock_Search from '../asa/Asa_Productstock_Search.vue'
import DataSource from '../DataSource.js'

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
    controller: "salesreceive",
    auth: "sales",
    base: {
        salesid: ''
    },
    options: {
        isedit: (item) => item.status == 0,
        isdelete: (item) => item.status == 0
    }
}

export default {
    name: 'sp-salesdetail',
    components: {
        'search': Asa_Productstock_Search
    },
    props: {
        visible: {
            type: Boolean
        },
        data: {
            type: Object
        }
    },
    data() {
        var self = this;

        return {
            form: {
                memberid: "",
                salesstaff: "",
                externalno: "",
                warehouseid: "",
                salesdate: "",
                ordercode: "",
                pickingtype: "",
                expresspaidtype: "",
                expressno: "",
                expressfee: "",
                address: "",
                saleportid: "",
                status: 0, //销售单状态：0-预售 1-已售 2-作废
                discount: "",
                makestaff: "",
                makedate: "",
                id: ""
            },
            tabledata: [],
            title: "",
            lang: "",
            formid: "",
            base: {
                warehouseid: ""
            },
            props
        }
    },
    methods: {
        addReceive() {
            let self = this;
            if (self.form.id > 0) {
                props.base.salesid = self.form.id
                self.$refs.receive.showFormToCreate();
            }
        },
        getDealPrice(row) {
            if (row.is_match == 0) {
                return row.dealprice;
            } else {
                return row.price * row.number * this.form.discount;
            }
        },
        onChange(newValue, data) {
            this.form.discount = data.discount
        },
        onWarehouseChange(newValue) {
            this.base.warehouseid = newValue;
        },
        showProduct() {
            this.$refs.stocksearch.setVisible(true)
        },
        onSelect(productstock) {
            var self = this;
            self.tabledata.push({ productstock: productstock, number: 1, is_match: true, dealprice: 0, price: 0 })
        },
        saveOrder(status) {
            //保存订单
            var self = this

            //订单已经作废了。
            if (self.form.status == 2) {
                return
            }

            self.form.status = status
            var params = { form: self.form }
            var array = []
            params.list = self.tabledata.map(item => {
                    return { productstockid: item.productstock.id, id: item.id, dealprice: item.dealprice, number: item.number, price: item.productstock.goods.price, is_match: item.is_match }
                })
                //self._log(JSON.stringify(params))
            self._submit("/sales/savesale", { params: JSON.stringify(params) }).then(function(res) {
                let data = res.data
                if (data.form.id) {
                    globals.copyTo(data.form, self.form)
                    self.formid = self.form.id
                    props.base.salesid = self.form.id

                    self.tabledata = []
                    data.list.forEach(item => {
                        self._log(item)
                        self.appendRow(item)
                    })
                }

                //通知列表，数据变化了
                self.$emit("change", res.data.form)
            });
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        showAttachment() {
            let self = this
            if (self.form.id > 0 && self.form.status != 2) {
                //done
            }
        },
        zuofei() {
            const self = this
            if (!self.canZuofei) {
                return;
            }

            self.$confirm(self._label('zuofei_warning'), self._label('tip'), {
                confirmButtonText: self._label('ok'),
                cancelButtonText: self._label('cancel'),
                type: 'warning'
            }).then(() => {
                self.saveOrder(2)
            })
        },
        yushou() {
            let self = this
            if (self.canYushou) {
                this.saveOrder(0)
            }
        },
        tijiao() {
            const self = this
            if (!self.canTijiao) {
                return
            }

            self.$confirm(self._label('tijiao_warning'), self._label('tip'), {
                confirmButtonText: self._label('ok'),
                cancelButtonText: self._label('cancel'),
                type: 'warning'
            }).then(() => {
                self.saveOrder(1)
            })
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        appendRow(row) {
            const self = this;

            Productstock.get(row.productstock, function(result) {
                self._log("Productstock", result)
                row.productstock = result

                row.is_match = parseInt(row.is_match) == 1
                self.tabledata.push(row)
            }, 1)
        }
    },
    computed: {
        isEditable() {
            var status = this.form.status;
            return status == 0 || status == '' || !status
        },
        canZuofei() {
            return this.form.id > 0 && this.form.status == 0
        },
        canTijiao() {
            let form = this.form
            return form.id == '' || form.status != 2
        },
        canYushou() {
            let form = this.form
            return form.id == "" || form.status == 0
        }
    },
    mounted: function() {
        var self = this;
        //self._log("mounted Order")
        //copyTo(self.data, this.form)
        let route = self.$route;
        let label // = route.params.id == 0 ? self._label("xinjiandingdan") : "订单信息"
        if (route.params.id == 0) {
            label = self._label("xinjianxiaoshoudan")
        } else {
            self.tabledata = []
                //加载数据
            self._fetch("/sales/loadsale", { id: route.params.id }).then(function(res) {
                //self._log("加载订单信息", res)

                copyTo(res.data.form, self.form)
                if (res.data.list) {
                    res.data.list.forEach(item => {
                        //self._log(item)
                        self.appendRow(item)
                    })
                }
                self._setTitle(self._label("xiaoshoudan") + self.form.id)
            })
            label = "loading..."
        }
        self._setTitle(label)
    }
}
</script>
