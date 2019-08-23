<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <asa-button @click="save" :enable="_isAllowed('sales-add') && form.status!='3'">{{_label("baocun")}}</asa-button>
                <asa-button @click="sale" :enable="_isAllowed('sales-add') && form.status==1">{{_label("xiaoshou")}}</asa-button>
                <asa-button @click="cancel" :enable="_isAllowed('sales-add') && form.status=='1'">{{_label("zuofei")}}</asa-button>
                <asa-button @click="addReceive" :enable="_isAllowed('sales-add') && form.id>0 && form.status!=3">{{_label("tianjiashoukuan")}}</asa-button>

                <el-tag type="warning" v-if="form.status>0">
                        <sp-select-text :value="form.status" source="salestatus"/>
                </el-tag>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('xiaoshouduankou')">
                        <simple-select ref="saleportid" v-model="form.saleportid" source="usersaleport" :clearable="false"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('jiage')">
                        <simple-select ref="priceid" v-model="form.priceid" source="userprice" @change="onPriceChange" disabled></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('xiaoshoucangku')">
                        <simple-select v-model="form.warehouseid" source="userwarehouse" @change="onWarehouseChange" disabled></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('xiaoshouriqi')" v-if="form.warehouseid>0">
                        <el-date-picker v-model="form.salesdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('huiyuan')" v-if="form.warehouseid>0">
                        <simple-select v-model="form.memberid" source="member"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px" v-if="form.warehouseid>0">
                    <el-form-item :label="_label('xiaoshouren')">
                        <simple-select v-model="form.salesstaff" source="user"></simple-select>
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
                <el-col :span="4" style="width:300px" v-if="form.warehouseid>0">
                    <el-form-item :label="_label('tihuofangshi')">
                        <simple-select v-model="form.pickingtype" source="pickingtype"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('kuaidifukuanfang')">
                        <simple-select v-model="form.expresspaidtype" source="expresspaidtype"></simple-select>
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
        <el-form :model="form" :inline="true" size="mini" @submit.native.prevent>
        <el-table :data="tabledata" stripe border style="width:100%;" v-if="form.warehouseid>0" :show-summary="true" :summary-method="getSummary">
            <el-table-column :label="_label('guojima')" align="left" width="250">
                <template v-slot="{row}">
                    <sp-product-tip :product="row.productstock.product"/>
                </template>
            </el-table-column>
            <el-table-column :label="_label('chima')" width="100" align="center">
                <template v-slot="{row}">
                    <sp-select-text :value="row.productstock.sizecontentid" source="sizecontent"/>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shangpintiaoma')" align="center" width="150">
                <template v-slot="{row}">
                    <sp-product-code :productid="row.productstock.productid" :sizecontentid="row.productstock.sizecontentid"></sp-product-code>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shuliang')" width="70" align="left">
                <template v-slot="{row}">
                    <el-input v-model="row.number" size="mini" style="width:100%" class="number" :disabled="form.status!='1'"></el-input>
                </template>
            </el-table-column>

            <el-table-column :label="_label('chengjiaojia')" width="90" align="center">
                <template v-slot="{row}">
                    <el-input v-model="row.dealprice" size="mini" style="width:100%" class="number"></el-input>
                </template>
            </el-table-column>

            <el-table-column :label="_label('kucunshuliang')" width="90" align="center">
                <template v-slot="{row}">
                    <span>{{row.productstock.number}}</span>
                </template>
            </el-table-column>

            <el-table-column :label="pricename" width="100" align="center">
                <template v-slot="{row}">
                    <span>{{computeProductPrice[row.productstock.productid]}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="_label('zongjia')" width="100" align="center">
                <template v-slot="{row}">
                    <span>{{row.dealprice*row.number}}</span>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shuxing')" width="100" align="center">
                <template v-slot="{row}">
                    <sp-select-text :value="row.productstock.property" source="orderproperty"></sp-select-text>
                </template>
            </el-table-column>

            <el-table-column :label="_label('canpin')" width="100" align="center">
                <template v-slot="{row}">
                    <sp-select-text :value="row.productstock.defective_level" source="defectivelevel"></sp-select-text>
                </template>
            </el-table-column>

            <el-table-column :label="_label('caozuo')" width="80" align="center" v-if="form.status==1">
                <template v-slot="{row,$index}">
                    <as-button size="mini" type="danger" @click="deleteRow($index, row)" v-if="!row.type">{{_label('shanchu')}}</as-button>
                </template>
            </el-table-column>
        </el-table>
        </el-form>

        <sp-dialog ref="receive-dialog" :title="_label('qingxuanze')" :width="1050" class="product">
            <simple-admin-page v-bind="props" ref="receive" :hide-create="true" :hide-form="true" v-if="form.id>0"></simple-admin-page>
        </sp-dialog>
    </div>
</template>

<script>
import globals, { _label, empty } from '../globals.js'
import { Productstock, ProductDetail } from "../model.js"
import { extend, copyTo } from "../object.js"
import API from "../api.js";
import cachecomponent from '../mixins/cachecomponent.js';
import { statHelper } from '../helper.js';

const _private = function(self) {
    let _this = {
        async loadPrice(){
            //console.log("loadPrice", self.form)
            if(self.form.priceid=='') {
                return
            }

            let prices = self.computeProductPrice;
            let productids = [];
            self.tabledata.forEach(item=>{
                let productid = item.productstock.productid;
                if(typeof(prices[productid])==="undefined") {
                    self.productPrices.push({
                        productid,
                        priceid:self.form.priceid,
                        price:""
                    })

                    productids.push(productid);
                }
            })

            if(productids.length>0) {
                let result = await API.getPriceByProductIds('', productids.join(","));
                //console.log(result)
                result.forEach(item=>{
                    self.productPrices.forEach(row=>{
                        if(item.productid==row.productid && item.id==row.priceid) {
                            row.price = item.price;
                        }
                    })
                })
            }
        },
    }

    return _this;
}

export default {
    name: 'sp-salesupdate',
    mixins: [cachecomponent],
    data() {
        let self = this;

        return {
            form: {
                memberid: '',
                salesstaff: '',
                externalno: '',
                warehouseid: '',
                salesdate: '',
                ordercode: '',
                pickingtype: '',
                expresspaidtype: '',
                expressno: '',
                expressfee: '',
                address: '',
                saleportid: '',
                status: '', //销售单状态：1-预售 2-已售 3-作废
                priceid: '',
                makestaff: '',
                makedate: '',
                id: '',
            },
            salesdetail: [], //销售明细的原始记录
            tabledata: [],
            base: {
                warehouseid: '',
            },
            pricename:'',
            productPrices:[],
            props: {
                columns: [
                    { name: "payment_type", label: _label("fukuanleixing"), type: 'select', source: "paymenttype",width:110 },
                    { name: "currency", label: _label("bizhong"), type: 'select', source: "currency",width:90 },
                    { name: "amount", label: _label("jine"),width:110 },
                    { name: "paymentdate", label: _label("fukuanriqi"), type: "date",width:110 },
                    { name: "memo", label: _label("beizhu"),width:150 },
                    { name: "makestaff", label: _label("tijiaoren"), type: 'select', source: "user", is_edit_hide: true,width:130 },
                    { name: "status", label: _label("yiruzhang"), type: "switch", is_edit_hide: true,width:90 }
                ],
                controller: "salesreceive",
                auth: "sales-salesreceive",
                base: {
                    salesid: ''
                },
                options: {
                    isedit: (item) => item.status == 0,
                    isdelete: (item) => item.status == 0
                },
            },
        }
    },
    methods: {
        onPriceChange(priceid, pricename) {
            this.pricename = pricename;
            _private(this).loadPrice();
        },
        addReceive() {
            let self = this;
            if (self.form.id > 0) {
                self._showDialog("receive-dialog");
                self.props.base.salesid = self.form.id;
            }
        },
        onWarehouseChange(newValue) {
            this.base.warehouseid = newValue;
        },
        save(){
            let self = this;

            if(self.confirm()) {
                let form = extend({}, self.form);
                let params = { form };

                // 需要更新的列表
                params.list = self.tabledata.filter(item=>{
                    // 找出修改过成交价的记录
                    let oldrecord = self.salesdetail.find(row=>row.id==item.id);
                    return oldrecord.dealprice!=item.dealprice || oldrecord.number!=item.number;
                }).map(item => {
                    return {
                        id: item.id,
                        dealprice: item.dealprice,
                        number: item.number,
                    };
                });

                // 需要删除的列表
                params.deletelist = self.salesdetail.filter(item=>{
                    return !self.tabledata.find(row=>row.id==item.id);
                }).map(item=>item.id);

                console.log(JSON.stringify(params));

                self._submit("/sales/save", { params: JSON.stringify(params) }).then(function(res) {
                    self.load();
                });
            }
        },
        sale() {
            let self = this;

            if(self.confirm()) {
                self._submit("/sales/sale", {id:self.form.id}).then(function(res) {
                    self.load();
                });
            }
        },
        cancel() {
            let self = this;

            if(self.confirm()) {
                self._submit("/sales/cancel", {id:self.form.id}).then(function(res) {
                    self.load();
                });
            }
        },
        async appendRow(row) {
            const self = this;
            let result = await Productstock.load({data:row.productstock, depth:1});

            row.productstock = result;
            self.tabledata.push(row);
            return row;
        },
        async load() {
            let self = this;
            let route = self.$route;
            self._setTitle("loading...");

            //加载数据
            let result = await self._fetch("/sales/loadsale", { id: route.params.id });

            self.tabledata = [];
            copyTo(result.data.form, self.form);

            if (result.data.list) {
                self.salesdetail = result.data.list;
                let promises = result.data.list.map(item => {
                    //self._log(item)
                    return self.appendRow(extend({},item));
                });

                let array = await Promise.all(promises);

                _private(self).loadPrice();
                self.pricename = await self._dataSource("price").getLabel(self.form.priceid);
            }
            self._setTitle(self._label("xiaoshoudan") +':'+ result.data.form.orderno);
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex);
        },
        getSummary({ columns, data }) {
            const self = this;
            const sums = [];
            columns.forEach((column, index) => {
                //self._log(column, index)
                if (index == 0) {
                    sums[index] = self._label("heji");
                    return;
                }
                else if(index==3) {
                    sums[index] = self.tabledata.reduce((total, row) => total + row.number*1, 0);
                }
                else if(index==7) {
                    sums[index] = self.tabledata.reduce((total, row) => total + row.dealprice*row.number, 0);
                }
            })

            sums[1] = data.length;

            return sums;
        },
    },
    computed: {
        computeProductPrice(){
            let self = this;
            let result = Object.create(null);
            self.productPrices.forEach(item=>{
                if(item.priceid==self.form.priceid) {
                    result[item.productid] = item.price;
                }
            });

            return result;
        },
    },
    mounted: function() {
        this.load();
    },
};
</script>

<style>
.number .el-input__inner {padding: 0px 5px;}
</style>