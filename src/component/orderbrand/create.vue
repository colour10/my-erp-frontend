<template>
    <div>
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" style="width:100%;" size="mini" :inline-message="false" :show-message="false">
            <el-row :gutter="0">
                <el-col :span="24">
                    <asa-button @click="saveOrder(1)" :enable="canSave">{{_label("baocun")}}</asa-button>
                    <asa-button @click="_showDialog('order-dialog')" :enable="$route.params.ids=='0'">{{_label("daorudingdan")}}</asa-button>
                    <asa-button @click="_showDialog('add-supplier');form2.supplierid=''" :enable="$route.params.ids=='0'">{{_label("zengjiagonghuoshang")}}</asa-button>
                    <asa-button @click="$refs.qiancha.show()" :enable="$route.params.ids!='0'">{{_label("qiancha")}}</asa-button>
                    <asa-button @click="$refs.houcha.show()" :enable="$route.params.ids!='0'">{{_label("houcha")}}</asa-button>

                    <el-tag type="warning" v-if="order.ageseason>0">
                        <sp-select-text :value="order.ageseason" source="ageseason"/>
                    </el-tag>
                    <el-tag type="warning" v-if="order.seasontype>0">
                        <sp-select-text :value="order.seasontype" source="seasontype"/>
                    </el-tag>
                    <el-tag type="warning" v-if="order.bussinesstype>0">
                        <sp-select-text :value="order.bussinesstype" source="bussinesstype"/>
                    </el-tag>
                </el-col>
            </el-row>
        </el-form>
        <el-row class="product clearpadding">
            <el-table ref="table" class="" :data="suppliers" stripe border style="width:100%;" :cell-style="cellStyle">
                <el-table-column :label="_label('gonghuoshang')" width="120" align="center" prop="suppliercode"/>
                <el-table-column :label="_label('bizhong')" width="60" align="center">
                    <template v-slot="{row}">
                        <sp-select-text :value="order.currency" source="currency"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('zongjine')" width="90" align="center" prop="total_discount_price">
                    <template v-slot="{row}">
                        {{f(supplierStat[row.supplierid].total_discount_price)}}
                    </template>
                </el-table-column>

                <el-table-column :label="_label('shengyuedu')" width="90" align="center" prop="total_discount_price">
                    <template v-slot="{row}">
                        {{f(row.quantum-supplierStat[row.supplierid].total_discount_price)}}
                    </template>
                </el-table-column>

                <el-table-column :label="_label('zongjianshu')" width="75" align="center">
                    <template v-slot="{row}">
                        {{supplierStat[row.supplierid].total_number}}
                    </template>
                </el-table-column>
                <el-table-column :label="_label('lingshouzongjia')" width="90" align="center" prop="total_price">
                    <template v-slot="{row}">
                        {{f(supplierStat[row.supplierid].total_price)}}
                    </template>
                </el-table-column>
                <el-table-column :label="_label('zhekoulv')" width="75" align="center">
                    <template v-slot="{row}">
                        <el-input v-model="row.discount" size="mini"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('tuishuilv')" width="75" align="center">
                    <template v-slot="{row}">
                        <el-input v-model="row.taxrebate" size="mini"/>
                    </template>
                </el-table-column>

                <el-table-column :label="_label('edu')" width="75" align="center">
                    <template v-slot="{row}">
                        <el-input v-model="row.quantum" size="mini"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('fahuoshang')" width="100" align="center">
                    <template v-slot="{row}">
                        <simple-select v-model="row.finalsupplierid" source="supplier_3" :clearable="true"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('beizhu')" width="100" align="center">
                    <template v-slot="{row}">
                        <el-input v-model="row.memo" size="mini"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('haiwaidingdanhao')" width="100" align="center">
                    <template v-slot="{row}">
                        <el-input v-model="row.foreignorderno" size="mini"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('gongsidingdanhao')" width="80" align="center" prop="orderno"/>

                <el-table-column :label="_label('zhidanren')" width="80" align="center">
                    <template v-slot="{row}">
                        <sp-select-text :value="row.makestaff" source="user"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('zhidanriqi')" width="90" align="center" prop="maketime">
                    <template v-slot="{row}">
                    {{ row.maketime && row.maketime.length>0 ? row.maketime.substr(0,10) :""}}
                    </template>
                </el-table-column>
                <el-table-column :label="_label('pinpai')" width="200" align="left">
                    <template v-slot="{row}">
                        <sp-select-text :value="row.brandid" source="brand"/>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('caozuo')" width="100" align="center">
                    <template v-slot="{row}">
                        <el-button type="danger" round @click.stop="onDeleteSupplier(row.supplierid)" size="mini" v-if="$route.params.ids=='0'">{{_label("shanchu")}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-col :span="24" class="product" style="margin-top:2px;">
                <el-table ref="table" :data="orders" stripe border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
                    <el-table-column type="selection" :width="30" align="center"/>
                    <el-table-column prop="orderno" :label="_label('dingdanbianhao')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-order-tip column="orderno" :order="row" trigger="hover"/>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('dinghuokehu')" width="120" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.bookingid" source="supplier"/>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('dinghuoshuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{orderstat[row.id].totalCount}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('fenpeishuliang')" width="120" align="center">
                        <template v-slot="{row}">
                            {{orderstat[row.id].totalCount-orderstat[row.id].leftCount + ordercurrent[row.id].totalCount}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('gonghuoshang')" width="120" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.supplierid" source="supplier"/>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('niandai')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.ageseason" source="ageseason"/>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('bizhong')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.currency" source="currency"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="total" :label="_label('jine')" width="90" align="center"/>
                    <el-table-column prop="discount" :label="_label('zhekoulv')" width="90" align="center"/>
                    <el-table-column :label="_label('xingbie')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.genders" source="gender"/>
                        </template>
                    </el-table-column>
                    <!-- <el-table-column :label="_label('pinpai')" width="150" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.brandids" source="brand"/>
                        </template>
                    </el-table-column> -->
                    <el-table-column :label="_label('yewuleixing')" width="90" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.bussinesstype" source="bussinesstype"/>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('pinpai')" width="150" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.brandids" source="brand"/>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('dingdanriqi')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.maketime && row.maketime.length>0 ? row.maketime.substr(0,10) : ""}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="110" align="center">
                        <template v-slot="{row}">
                            <el-button type="danger" round @click.stop="onDeleteOrder(row.id)" size="mini" v-if="$route.params.ids=='0'">{{_label("shanchu")}}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-row :gutter="0" v-if="$route.params.ids=='0'">
                    <el-button type="warning" round @click="_showDialog('supplier-dialog')" size="mini">{{_label("piliangfenpei")}}</el-button>
                    <el-button type="warning" round @click="resetDistribute" size="mini">{{_label("piliangchongzhi")}}</el-button>
                </el-row>
                <el-table ref="tabledetail" :data="orderdetails" stripe border style="width:100%;margin-top:2px" @selection-change="onSelectionChange2">
                    <el-table-column type="selection" :width="30" align="center"/>
                    <el-table-column align="center" width="60">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;" AAAA/>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('dinghuokehu')" align="center" width="150">
                        <el-table-column :label="_label('dinghuokehu')" align="center" width="150">
                            <template v-slot="{row}">
                                <sp-order-tip column="booking_label" :order="row.order"/>
                            </template>
                            <template v-slot:header="{row}">
                                <el-input v-model="form2.suppliercode1" size="mini" />
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="center" width="200">
                        <el-table-column :label="_label('guojima')" align="center" width="200">
                            <template v-slot="scope">
                                <sp-product-tip :product="scope.row.product"/>
                            </template>
                            <template v-slot:header="{row}">
                                <el-input v-model="form2.keyword1" size="mini" />
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('bizhong')" width="60" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="stat[row.product.id].currencyid" source="currency" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{ stat[row.product.id].factoryprice }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="discount" :label="_label('zhekoulv')" width="80" align="center"/>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
                        <template v-slot="{row, $index}">
                            <sp-sizecontent-confirm2 :ref="row.product.id+'-'+row.order.id" :columns="row.product.sizecontents" :row="row" :suppliers="suppliers" :initData="getInit(row)" :factoryprice="stat[row.product.id].factoryprice" :key="row.product.id+'-'+row.order.id" @change="onNumberChange" :setMap="setMap($index, row.product.id, row.order.id)" @up="focus($event, 'up', $index-1)" @down="focus($event, 'down', $index+1)"></sp-sizecontent-confirm2>
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
                        <simple-select v-model="form.ageseasonid" source="ageseason"/>
                    </el-form-item>
                    <el-form-item :label="_label('dinghuokehu')">
                        <simple-select v-model="form.bookingid" source="supplier_2" :multiple="true"/>
                    </el-form-item>
                    <el-form-item :label="_label('pinpai')">
                        <simple-select v-model="form.brandid" source="brand"/>
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
                        <simple-select v-model="form2.supplierid" source="supplier_3" :multiple="true"/>
                    </el-form-item>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button auth="product" type="primary" @click="addSupplier">{{_label("queding")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('add-supplier')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
        <sp-dialog ref="supplier-dialog" :title="_label('qingxuanze')">
            <el-row :gutter="0">
                <el-col :span="5" v-for="item in suppliers" :key="item.id">
                    <as-button auth="product" type="primary" @click="distribute(item.supplierid)">{{item.suppliercode}}</as-button>
                </el-col>
            </el-row>
        </sp-dialog>
        <sp-dialog ref="preview"/>

        <sp-order-list ref="qiancha" :orderbrandid="$route.params.ids"></sp-order-list>
        <sp-shipping-list ref="houcha" :orderbrandid="$route.params.ids"></sp-shipping-list>
    </div>
</template>

<script>
import API from '../api.js';
import { extend, copyTo } from "../object.js"
import orderMixin from "../mixins/order.js"
import chain from "../chain.js"
import { Order, ProductDetail, promiseRunner } from "../model.js"
import { debounce } from "../function.js"
import { group } from "../array.js"
import { statHelper } from "../helper.js"
import { removeFilter } from "../array.js"
import cachecomponent from '../mixins/cachecomponent.js';
import Asa_Order_List from '../asa/Asa_Order_List.vue';
import Asa_Shipping_List from '../asa/Asa_Shipping_List.vue';

const result = {
    name: 'sp-orderbrandcreate',
    components: {
        [Asa_Order_List.name]: Asa_Order_List,
        [Asa_Shipping_List.name]: Asa_Shipping_List,
    },
    mixins: [orderMixin, cachecomponent],
    data() {
        var self = this;
        let _label = self._label

        return {
            form: {
                ageseasonid: "",
                bookingid: "",
                brandid: ""
            },
            form2: {
                supplierid: "",
                keyword: "",
                keyword1: "",
                suppliercode1: "",
                suppliercode: ""
            },
            tabledata: [],
            details: [],
            orders: [],
            selected: [],
            selected2: [],
            //供货商
            suppliers: [],
            listdata: [],
            orderlist:[],
            orderbrandDetailList:[],
            refsMap:{}
        }
    },
    methods: {
        onDeleteOrder(orderid){
            let self = this;
            let row = self.orderbrandDetailList.find(item=>item.orderid==orderid);
            if(row) {
                alert(self._label("tip-bunengshanchu"));
                return
            }

            if(confirm(self._label('quedingshanchu'))) {
                removeFilter(self.orderlist, item=>item.orderid===orderid);
                removeFilter(self.tabledata, item=>item.orderid===orderid);
                removeFilter(self.orders, item=>item.id===orderid);
                removeFilter(self.listdata, item=>item.row.orderid===orderid);
            }
        },
        //删除一个发货商
        onDeleteSupplier(supplierid) {
            let self = this;
            if(!self.confirm()) {
                return ;
            }

            removeFilter(self.suppliers, item=>item.supplierid==supplierid);
            removeFilter(self.listdata, item=>item.supplierid==supplierid);
        },
        setMap(rowIndex, productid, orderid){
            this.refsMap[rowIndex] = productid + '-' + orderid;
        },
        focus(colIndex, way, rowIndex) {
            let self = this;
            let key = this.refsMap[rowIndex];
            if(key && self.$refs[key]) {
                self.$refs[key].startFocus(way, colIndex);
            }
        },
        cellStyle() {
            return "padding-left:0px"
        },
        addSupplier() {
            let self = this
            self._dataSource("supplier_3").getRows(self.form2.supplierid).then(rows => {
                let suppliers = rows.map(item => item.row)
                _private(self).importSupplier(suppliers)

                self._hideDialog('add-supplier')
            })
        },
        distribute(supplierid) {
            let self = this

            self.selected2.forEach(row => {
                let key = row.product.id + '-' + row.order.id
                self.$refs[key].distributeTo(supplierid)
            });
            self._hideDialog('supplier-dialog')
        },
        resetDistribute() {
            let self = this

            self.selected2.forEach(row => {
                let key = row.product.id + '-' + row.order.id
                self.$refs[key].reset()
            })
        },
        onSelect() {
            let self = this;
            self.doImport(self.form).then(() => {
                self.form.ageseasonid = '';
                self.form.bookingid = '';
                self.form.brandid = '';
                self._hideDialog('order-dialog');
            });
        },
        async doImport(params) {
            let self = this;
            let result = await API.getOrderListToImport(params);

            //已经导入过的订单不重复导入。
            let table = chain(self.orders).toObject(item => [item.id, 1]).object();

            let func = _private(self);
            await func.importOrders(result.orders.filter(item => !table[item.id]));
            await func.importDetails(result.details.filter(item => !table[item.orderid]));
        },
        getInit(row) {
            let result = [];
            for(let item of this.listdata) {
                if (item.row === row && item.number > 0) {
                    result.push({
                        sizecontentid: item.sizecontentid,
                        supplierid: item.supplierid,
                        number: item.number,
                    });
                }
            }
            return result;
        },
        saveOrder() {
            //保存订单
            let self = this;

            let func = _private(self);
            let list = [];
            for(let item of self.listdata) {
                if (item.number > 0) {
                    let orderdetailid = func.getOrderDetaiId(item.row.productid, item.row.orderid, item.sizecontentid);
                    let id = func.getOrderbrandDetailId(item.row.productid, item.row.orderid, item.sizecontentid, item.supplierid);
                    list.push({
                        productid: item.row.productid,
                        factoryprice:self.stat[item.row.productid].factoryprice,
                        wordprice:self.stat[item.row.productid].wordprice,
                        currencyid:self.stat[item.row.productid].currencyid,
                        orderid: item.row.orderid,
                        sizecontentid: item.sizecontentid,
                        supplierid: item.supplierid,
                        number: item.number,
                        discount: item.discount,
                        orderdetailid,
                        id,
                    });
                }
            }

            let suppliers = self.suppliers.filter(item=>{
                return self.supplierStat[item.supplierid].total_number>0;
            }).map(item=>{
                const stat = self.supplierStat[item.supplierid];
                let result = extend({}, item);
                self._log(stat, result);
                result.total_number = stat.total_number;
                result.total_discount_price = stat.total_discount_price;
                result.total_price = stat.total_price;
                result.brandid = stat.brandid;
                return result;
            });

            let params = {
                list,
                suppliers,
                form:{
                    bussinesstype:self.order.bussinesstype,
                    ageseason:self.order.ageseason,
                    seasontype:self.order.seasontype,
                    currency:self.order.currency,
                },
            };

            //self._log(params)
            self._submit("/orderbrand/add", { params: JSON.stringify(params) }).then(function(res) {
                self._redirect("/orderbrand/"+ res.data.join(','));
            });
        },
        onNumberChange({ row, list }) {
            let self = this
            list.forEach(({ number, sizecontentid, supplierid, discount, price }) => {
                let target = self.listdata.find(item => item.sizecontentid == sizecontentid && item.supplierid == supplierid && row.product.id == item.row.product.id && row.orderid == item.row.orderid)
                if (target) {
                    target.number = number;
                    target.discount = discount;
                    target.price = price;
                    target.priceTotal = self.f(price*number);
                } else {

                    self.listdata.push({
                        row,
                        number,
                        sizecontentid,
                        supplierid,
                        discount,
                        price,
                        priceTotal:self.f(price*number)
                    });
                }
            });

            // 变动listdata，强制刷新computed缓存
            let head = self.listdata.shift();
            if(head) {
                self.listdata.unshift(head);
            }
        },
        onSelectionChange(vals) {
            let self = this
            this.selected = vals

            if (self.suppliers.length == 0) {
                self.$notify.info({
                    title: self._label("tishi"),
                    message: self._label("qxzjghs")
                });
            }
        },
        onRowClick(row) {
            this.$refs.table.toggleRowSelection(row)
        },
        onSelectionChange2(vals) {
            this.selected2 = vals
        },
        isCreate() {
            return this.$route.params.ids=='0';
        },
    },
    computed: {
        // 判断当前编辑的内容是否可以保存，品牌订单只能做新增，不能修改。
        canSave() {
            const self = this;
            if(self.$route.params.ids!='0') {
                return false;
            }

            // 明细列表为空，不能保存
            let length = self.listdata.filter(item=>item.number>0).length;
            if(length==0) {
                return false;
            }

            // 发货商列表为空，不能保存
            length = self.suppliers.filter(item=>self.supplierStat[item.supplierid].total_number>0).length;
            if(length==0) {
                return false;
            }

            return true;
        },
        orderdetails() {
            let self = this
            let selected = {}

            if (self.suppliers.length == 0) {
                return []
            }

            self.selected.forEach(item => {
                selected[item.id] = 1
            })

            let keyword = self.form2.keyword.toUpperCase()
            let suppliercode = self.form2.suppliercode.toUpperCase()
            let isMatch = _private(self).isMatch
            return self.tabledata.filter(item => {
                if(selected[item.orderid]==1) {
                    // 如果当前订单详情不在品牌订单详情中，并且剩余数量为0，则不显示。

                    let target = self.listdata.find(findrow=>findrow.row===item);
                    if(item.total>0 || target) {
                        return isMatch(keyword, item.product.getGoodsCode('')) && isMatch(suppliercode, item.order.booking_label.toUpperCase());
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            })
        },
        width() {
            return this.orderdetails.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 51 + 191 + 70+100
        },
        order() {
            let orders = this.orders
            return orders.length > 0 ? orders[0] : {}
        },
        orderstat() {
            let self = this;
            let result = {};
            self.orders.forEach(item=>{
                result[item.id] = {
                    totalCount:0,
                    brandCount:0,
                    leftCount:0,
                }
            })

            self.orderlist.forEach(detail=>{
                let row = result[detail.orderid]

                row.totalCount += detail.number*1;
                row.brandCount += detail.brand_number*1;
                row.leftCount = row.totalCount-row.brandCount;
            })

            //如果是修改订单，剩余数量应该把当前订单的数量加上去。
            self.orderbrandDetailList.forEach(detail=>{
                let row = result[detail.orderid]
                row.leftCount += detail.number*1;
            })

            return result
        },
        ordercurrent(){
            let self = this;
            let result = {};
            self.orders.forEach(item=>{
                result[item.id] = {
                    totalCount:0
                }
            })

            self.listdata.forEach(detail=>{
                let row = result[detail.row.orderid]

                row.totalCount += detail.number*1;
            })
            return result
        },
        stat(){
            let self = this;

            let helper = statHelper({
                factoryprice: 0,
                wordprice: 0,
                currencyid: "",
                total: 0,
            });

            for(let item of self.tabledata) {
                let row = helper.get(item.product.id)

                row.factoryprice = item.product.factoryprice;
                row.currencyid = item.product.factorypricecurrency;
                row.wordprice = item.product.wordprice;
            }

            for(let item of self.orderlist) {
                let row = helper.get(item.productid);
                if(item.factoryprice>0) {
                    row.factoryprice = item.factoryprice;
                    row.currencyid = item.currencyid;
                }

                if(item.wordprice>0) {
                    row.wordprice = item.wordprice;
                }
            }

            for(let detail of self.listdata) {
                let row = helper.get(detail.row.product.id);

                row.total += detail.number*1;
            }

            return helper.result()
        },
        supplierStat() {
            let self = this;
            //计算几个统计数据
            let brands = group();

            let helper = statHelper({
                total_discount_price: 0,
                total_number: 0,
                total_price: 0,
                brandid: "",
            });

            for(let item of self.listdata) {
                let target = helper.get(item.supplierid);

                if (item.number > 0) {
                    target.total_number += item.number * 1;
                    target.total_price += item.number * self.stat[item.row.productid].wordprice;
                    target.total_discount_price += item.priceTotal;

                    brands.push(item.supplierid, item.row.product.brandid);
                }
            }

            let result = brands.getResult()
            for(let supplier of self.suppliers) {
                let target = helper.get(supplier.supplierid);
                target.brandid = result[supplier.supplierid];
            }

            return helper.result();
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
    async mounted() {
        let self = this;
        self._setTitle(self._label("pinpaidingdanbianji"));

        self.copyKeywordDebounce = debounce(function() {
            self.form2.keyword = self.form2.keyword1
        }, 1000, false)

        self.copySuppliercodeDebounce = debounce(function() {
            self.form2.suppliercode = self.form2.suppliercode1
        }, 1000, false)


        _private(self).loadInfo();
        self._log(self.$route);

        // 自动加载客户订单数据
        if(self.$route.query.id && self.$route.query.id>0) {
            console.log(self.$route.query.id)
            await self.doImport({
                orderid: self.$route.query.id,
            });

            // 选中
            if(self.orders.length>0) {
                self.$refs.table.toggleRowSelection(self.orders[0]);

                // 默认分配所有商品
                if(self.suppliers.length>0) {
                    let {supplierid} = self.suppliers[0];
                    for(let row of self.tabledata) {
                        let key = row.product.id + '-' + row.order.id
                        setTimeout(function() {
                            self.$refs[key].distributeTo(supplierid);
                        }, 5);
                    }
                }
            }
        }
    }
}

const _private = function(self) {
    const _this = {
        loadInfo(){
            let params = self.$route.params;
            //console.log(self.$route)
            if (params.ids != '0') {
                self._fetch("/orderbrand/load", { ids: params.ids }).then(async function({ data }) {

                    _this.importOrders(data.orders);

                    await _this.importDetails(data.details);
                    _this.importSupplier(data.suppliers, data.orderbrands);
                    _this.importList(data.list);
                    self.$refs.table.toggleAllSelection();

                    if(data.orderbrands.length>0) {
                        self._setTitle(self._label("pinpaidingdanbianji")+'：'+data.orderbrands[0].orderno);
                    }
                });
            }
        },

        isMatch(keyword, search) {
            return keyword.length > 0 ? search.toUpperCase().indexOf(keyword) >= 0 : true
        },

        //将发货单明细转化成商品、订单、列表
        async convertListToProductList(list) {
            let result = {};
            for(let item of list) {
                //console.log("SSSSSSSS",item)
                let key = item.productid + '-' + item.orderid;

                // 如果已经确认过了，按照确认后计算，否则按照加入品牌订单中的数量计算
                // let number = item.confirm_number>0 ? item.confirm_number : item.brand_number;
                let number = item.brand_number;
                if (result[key]) {
                    result[key]['form'][item.sizecontentid] = item.number-number;
                    result[key].total += item.number-number;
                } else {
                    let form = {};
                    form[item.sizecontentid] = item.number-number;
                    result[key] = {
                        key,
                        productid: item.productid,
                        orderid: item.orderid,
                        discount: item.discount,
                        total: item.number-number,
                        form
                    }
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
        getOrderDetaiId(productid, orderid, sizecontentid) {
            let row = self.orderlist.find(item => item.productid == productid && item.orderid == orderid && item.sizecontentid == sizecontentid)
            //self._log(row, self.orderlist, productid, orderid, sizecontentid)
            return row ? row.id : 0;
        },
        getOrderbrandDetailId(productid, orderid, sizecontentid, supplierid){
            let orderbrand = self.suppliers.find(item=>item.supplierid==supplierid)
            //console.log("YY", orderbrand)
            if(orderbrand) {
                let row = self.orderbrandDetailList.find(item => item.productid == productid && item.orderid == orderid && item.sizecontentid == sizecontentid  && item.orderbrandid==orderbrand.orderbrandid )
                //self._log(row, self.orderlist, productid, orderid, sizecontentid)
                return row ? row.id : 0;
            }
            else {
                return 0
            }
        },

        //导入订单列表
        async importOrders(orders) {
            for(let item of orders) {
                self.orders.push(item);

                // 如果客户订单中已经设置过供货商，则自动导入该供货商
                if(item.supplierid>0 && self.isCreate()) {
                    let rows = await self._dataSource("supplier_3").getRows(item.supplierid);
                    let suppliers = rows.map(item => item.row);
                    _this.importSupplier(suppliers);
                }
            }
        },

        //导入订单明细列表
        async importDetails(details) {
            //所有的订单详情
            for(let item of details) {
                self.orderlist.push(item);
            }

            let orders = await _this.convertListToProductList(details);

            for(let item of orders) {
                self.tabledata.push(item);
            }
        },
        importSupplier(suppliers, orderbrands = []) {
            for(let supplier of suppliers) {
                if (!self.suppliers.find(item => item.supplierid == supplier.id)) {
                    let clone = {
                        suppliercode: supplier.suppliercode,
                        supplierid: supplier.id,
                        foreignorderno: "",
                        finalsupplierid: "",
                        taxrebate: "",
                        makestaff: "",
                        maketime: "",
                        memo: "",
                        orderno: "",
                        brandid: "",
                        quantum: "",
                    };
                    clone.discount = ""; //折扣率
                    clone.total_discount_price = 0; //总价
                    clone.total_number = 0; //总件数
                    clone.total_price = 0; //零售总价
                    clone.orderbrandid = "";
                    self.suppliers.push(clone);
                }
            }

            for(let orderbrand of orderbrands) {
                let supplier = self.suppliers.find(supplier => supplier.supplierid == orderbrand.supplierid);
                if (supplier) {
                    supplier.discount = orderbrand.discount;
                    supplier.orderbrandid = orderbrand.id;
                    supplier.makestaff = orderbrand.makestaff;
                    supplier.maketime = orderbrand.maketime;
                    supplier.foreignorderno = orderbrand.foreignorderno;
                    supplier.finalsupplierid = orderbrand.finalsupplierid;
                    supplier.taxrebate = orderbrand.taxrebate;
                    supplier.memo = orderbrand.memo;
                    supplier.orderno = orderbrand.orderno;
                    supplier.brandid = orderbrand.brandid;
                    supplier.quantum = orderbrand.quantum;
                }
            }
        },
        importList(list) {
            self.orderbrandDetailList = list
            for(let detail of list) {
                let row = self.tabledata.find(item => item.orderid == detail.orderid && item.productid == detail.productid);
                let supplier = self.suppliers.find(supplier => supplier.orderbrandid == detail.orderbrandid);

                //self._log(row, supplier, 'xxx', detail)
                if (row && supplier) {
                    self.listdata.push({
                        row,
                        number: detail.number,
                        sizecontentid: detail.sizecontentid,
                        supplierid: supplier.supplierid,
                        discount: detail.discount,
                    });
                }

                if (row) {
                    row.form[detail.sizecontentid] += detail.number * 1;
                }
            }
        }
    }

    return _this;
}

export default result;
</script>
