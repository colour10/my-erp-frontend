<template>
    <div>
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :inline-message="false" :show-message="false">
            <el-row :gutter="0">
                <au-button auth="order-submit" type="primary" @click="saveOrder(1)">{{_label("baocun")}}</au-button>
                <as-button type="primary" @click="_showDialog('order-dialog')">{{_label("daorudingdan")}}</as-button>
                <as-button type="primary" @click="_showDialog('add-supplier');form2.supplierid=''">{{_label("zengjiagonghuoshang")}}</as-button>
            </el-row>
        </el-form>
        <el-row>
            <el-table ref="table" :data="suppliers" stripe border style="width:100%;">
                <el-table-column :label="_label('gonghuoshang')" width="120" align="center" prop="suppliercode"></el-table-column>
                <el-table-column :label="_label('zongjine')" width="90" align="center">
                    <template v-slot="{row}">
                        {{getSupplierTotal(row.id)}}
                    </template>
                </el-table-column>
                <el-table-column :label="_label('leibiezhanbi')" width="200" align="center">
                    <template v-slot="{row}">
                        <chart :height="100" :chart-data="getChartData(row.id)"></chart>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="product">
                <br />
                <el-table ref="table" :data="orders" stripe border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
                    <el-table-column type="selection" :width="30"></el-table-column>
                    <el-table-column prop="orderno" :label="_label('dingdanbianhao')" width="90" align="center"> </el-table-column>
                    <el-table-column :label="_label('dinghuokehu')" width="120" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.bookingid" source="supplier"></sp-select-text>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('gonghuoshang')" width="120" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.supplierid" source="supplier"></sp-select-text>
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
                    <el-table-column prop="total" :label="_label('jine')" width="90" align="center"> </el-table-column>
                    <el-table-column prop="discount" :label="_label('zhekoulv')" width="90" align="center"> </el-table-column>
                    <el-table-column :label="_label('xingbie')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.genders" source="gender"></sp-select-text>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('pinpai')" width="150" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.brandids" source="brand"></sp-select-text>
                        </template>
                    </el-table-column>
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
                <br />
                <el-row :gutter="0">
                    <el-button type="warning" round @click="_showDialog('supplier-dialog')" size="mini">{{_label("piliangfenpei")}}</el-button>
                    <el-button type="warning" round @click="resetDistribute" size="mini">{{_label("piliangchongzhi")}}</el-button>
                </el-row>
                <el-table ref="tabledetail" :data="orderdetails" stripe border style="width:100%;" :show-summary="true" :summary-method="getSummary" @selection-change="onSelectionChange2">
                    <el-table-column type="selection" :width="30"></el-table-column>
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
                            <sp-product-tip :product="scope.row.product"></sp-product-tip>
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
                            {{ formatNumber(row.product.factoryprice*row.discount) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('zongjia')" width="80" align="center">
                        <template v-slot="{row}">
                            {{ formatNumber(row.product.factoryprice*row.discount*row.total) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="discount" :label="_label('zhekoulv')" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row}">
                            <sp-sizecontent-confirm2 :ref="row.product.id+'-'+row.order.id" :columns="row.product.sizecontents" :row="row" :suppliers="suppliers" :initData="getInit(row)" :key="row.product.id+'-'+row.order.id" @change="onNumberChange"></sp-sizecontent-confirm2>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                        <template v-slot="scope">
                            {{scope.row.product.getName()}}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <sp-dialog ref="order-dialog">
            <el-form :model="form" label-width="85px" :inline="false" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-form-item :label="_label('niandai')">
                        <simple-select v-model="form.ageseasonid" source="ageseason"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form.supplierid" source="supplier"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinpai')">
                        <simple-select v-model="form.brandid" source="brand"></simple-select>
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

        <sp-dialog ref="add-supplier">
            <el-form :model="form2" label-width="85px" :inline="false" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form2.supplierid" source="supplier_3" :multiple="true"></simple-select>
                    </el-form-item>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button auth="product" type="primary" @click="addSupplier">{{_label("zengjia")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('add-supplier')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>

        <sp-dialog ref="supplier-dialog">
            <el-form :model="form2" label-width="85px" :inline="false" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-form-item :label="_label('gonghuoshang')">
                        <el-select v-model="form2.supplierid2">
                            <el-option v-for="item in suppliers" :key="item.id" :label="item.suppliercode" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button auth="product" type="primary" @click="distribute">{{_label("fenpei")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('supplier-dialog')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
    </div>
</template>

<script>
import { extend, copyTo } from "../object.js"
import detailConvert from "../asa/order-detail.js"
import orderMixin from "../mixins/order.js"
import chain from "../chain.js"
import { Order, ProductDetail, promiseRunner } from "../model.js"
import CommitChart from "../CommitChart.js"

const result = {
    name: 'sp-orderbrandcreate',
    components: {
        chart: CommitChart
    },
    mixins: [orderMixin],
    data() {
        var self = this;
        let _label = self._label

        return {
            form: {
                ageseasonid: "",
                supplierid: "",
                brandid: ""
            },
            form2: {
                supplierid: "",
                supplierid2:""
            },
            tabledata: [],
            details: [],
            orders: [],
            selected: [],
            selected2: [],
            //供货商
            suppliers: [],
            listdata: []
        }
    },
    methods: {
        addSupplier() {
            let self = this
            self._dataSource("supplier_3").getRows(self.form2.supplierid).then(rows => {
                rows.forEach(row => {
                    if(!self.suppliers.find(item=>item==row.row)) {
                        self.suppliers.push(row.row)
                    }                    
                })

                self._hideDialog('add-supplier')
            })
        },
        distribute() {
            let self = this

            if(self.form2.supplierid2>0) {
                self.selected2.forEach(row=>{
                    let key = row.product.id+'-'+row.order.id
                    self.$refs[key].distributeTo(self.form2.supplierid2)
                })
            }
            self._hideDialog('supplier-dialog')
        },
        resetDistribute(){
            let self = this

            self.selected2.forEach(row=>{
                let key = row.product.id+'-'+row.order.id
                self.$refs[key].reset()
            })
        },
        onSelect() {
            let self = this;
            self._fetch("/order/import", self.form).then(result => {
                self.orders = []
                self.details = []
                result.data.orders.forEach(item => {
                    self.orders.push(item)
                })

                _private(self).convertListToProductList(result.data.details).then(orders => {
                    orders.forEach(item => {
                        self.details.push(item)
                    })
                })

                self._hideDialog('order-dialog')
            })
        },
        getInit(row){
            let result = []
            this.listdata.forEach(item=>{
                if(item.row===row && item.number>0) {
                    result.push({
                        sizecontentid:item.sizecontentid,
                        supplierid:item.supplierid,
                        number:item.number
                    })
                }
            })
            return result
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
                row.getRowFactoryTotal = function() {
                    return row.product.factoryprice * row.total
                }

                //计算成交总价
                row.getRowDealTotal = function() {
                    return row.product.factoryprice * row.discount * row.total
                }

                self.tabledata.unshift(row)

                self.form.currency = row.product.factorypricecurrency
            }
        },
        getSummary({ columns, data }) {
            const self = this
            const sums = []
            columns.forEach((column, index) => {
                //self._log(column, index)
                if (index == 0) {
                    sums[index] = self._label("heji")
                    return
                } else if (index == 6) {
                    //sums[index] = self.formatNumber(data.reduce((total, row) => total + row.getRowFactoryTotal(), 0))
                }
            })

            sums[1] = data.length

            return sums
        },
        onNumberChange({ row, list }) {
            let self = this
            list.forEach(({ number, sizecontentid, supplierid }) => {
                let target = self.listdata.find(item => item.sizecontentid == sizecontentid && item.supplierid == supplierid && row.product.id == item.row.product.id && row.orderid == item.row.orderid)

                if (target) {
                    target.number = number
                } else {
                    self.listdata.push({
                        row,
                        number,
                        sizecontentid,
                        supplierid
                    });
                }
            })
        },
        getSupplierTotal(supplierid) {
            let self = this;
            let total = 0;
            self.listdata.forEach(item => {
                if (supplierid == item.supplierid && item.number > 0) {
                    total += item.number * item.row.discount * item.row.product.factoryprice
                }
            })

            return self.formatNumber(total)
        },
        onSelectionChange(vals) {
            this.selected = vals
        },
        onRowClick(row) {

            this.$refs.table.toggleRowSelection(row)
        },
        onSelectionChange2(vals) {
            this.selected2 = vals
        },
        getRowTotal(row) {
            const self = this
            return 0
            return self.formatNumber(row.price * row.source.confirm_total)
        },
        getRowFactoryTotal(row) {
            const self = this
            return 0
            return self.formatNumber(row.source.product.factoryprice * row.source.confirm_total)
        },
        getChartData(supplierid) {
            let self = this
            let groupTotal = {}
            self.listdata.forEach(item => {
                if (supplierid == item.supplierid && item.number > 0) {
                    let key = item.row.product.brandgroup_label
                    groupTotal[key] = groupTotal[key] || 0
                    groupTotal[key] += item.number * item.row.discount * item.row.product.factoryprice
                }
            })

            let labels = []
            let data = []
            chain(groupTotal).forEach((total, name)=>{
                labels.push(name)
                data.push(Math.round(total))
            })

            return {
                labels,
                datasets: [{
                    backgroundColor: [
                        '#41B883',
                        '#E46651',
                        '#00D8FF',
                        '#DD1B16'
                    ],
                    data
                }]
            }
        }
    },
    computed: {
        orderdetails() {
            let self = this
            let selected = {}
            self.selected.forEach(item => {
                selected[item.id] = 1
            })
            return self.details.filter(item => selected[item.orderid] == 1)
        },
        width() {
            return this.orderdetails.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 50 + 191
        },
        total_price() {
            let total = this.tabledata.reduce(function(total, current) {
                return total + current.total * current.product.factoryprice * current.discount
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
        }
    },
    mounted: function() {
        let self = this;
        self._setTitle(self._label("shengchengwaibudingdan"))
        self._log("mounted")
    }
}

const _private = function(self) {
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
                let key = item.productid + '-' + item.orderid
                if (result[key]) {
                    result[key]['form'][item.sizecontentid] = item.number - item.brand_number
                    result[key].total += item.number - item.brand_number
                } else {
                    let form = {}
                    form[item.sizecontentid] = item.number - item.brand_number
                    result[key] = {
                        key,
                        productid: item.productid,
                        orderid: item.orderid,
                        discount: item.discount,
                        total: item.number * 1,
                        form
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
        loadDetail(id) {
            self._setTitle("Loading...")
            self._fetch("/shipping/load", { id }).then(async function(res) {
                //self._log("加载订单信息", res)

                copyTo(res.data.form, self.form)
                if (res.data.list) {
                    let results = await _this.convertListToProductList(res.data.list)

                    self.tabledata = []
                    results.forEach(row => {
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
