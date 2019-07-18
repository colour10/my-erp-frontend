<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <au-button auth="sales" type="primary" @click="yushou" v-if="form.status=='0' || form.status=='1'">{{_label("yushou")}}</au-button>

                <au-button auth="sales" type="primary" @click="save" v-if="form.status==2">{{_label("baocun")}}</au-button>
                <au-button auth="sales" :type="isChanged===true?'info':'primary'" @click="sale()" v-if="form.status==1">{{_label("xiaoshou")}}</au-button>

                <!--<au-button auth="sales" type="primary" @click="showAttachment()" v-if="form.id>0 && form.status!=3">{{_label("fujian")}}</au-button>-->
                <au-button auth="sales" type="primary" @click="cancel" v-if="form.status=='1'">{{_label("zuofei")}}</au-button>
                <au-button auth="sales" :type="form.id>0 ?'primary':'info'" @click="addReceive" v-if="form.id>0 && form.status!=3">{{_label("tianjiashoukuan")}}</au-button>

                <el-tag type="warning" v-if="form.status>0">
                        <sp-select-text :value="form.status" source="salestatus"/>
                </el-tag>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="4" style="width:300px">
                    <el-form-item :label="_label('xiaoshouduankou')">
                        <simple-select ref="saleportid" v-model="form.saleportid" source="usersaleport"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('jiage')">
                        <simple-select ref="priceid" v-model="form.priceid" source="userprice" @change="onPriceChange" :disabled="form.status!=0"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('xiaoshoucangku')">
                        <simple-select v-model="form.warehouseid" source="userwarehouse" :disabled="form.status!=0" @change="onWarehouseChange"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('xiaoshouriqi')">
                        <el-date-picker v-model="form.salesdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item :label="_label('huiyuan')">
                        <simple-select v-model="form.memberid" source="member"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="4" style="width:300px">
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
                <el-col :span="4" style="width:300px">
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
        <el-row type="flex" justify="end" v-if="form.status==0">
            <el-col :span="24">
                <search :base="base" @select="onSelect"></search>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <el-table :data="tabledata" stripe border style="width:100%;">
                    <el-table-column :label="_label('guojima')" align="left" width="200">
                        <template v-slot="{row}">
                            <sp-product-tip :product="row.productstock.product"/>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chima')" width="100" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.productstock.sizecontentid" source="sizecontent"/>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('cangku')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.productstock.warehouse.name}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('kucunshuliang')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.productstock.number}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="pricename" width="100" align="center">
                        <template v-slot="{row}">
                            {{computeProductPrice[row.productstock.productid]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('zongjia')" width="100" align="center">
                        <template v-slot="{row}">
                            {{row.dealprice*row.number}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('shuliang')" width="100" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.number" size="mini" style="width:100%" :disabled="form.status>=2"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chengjiaojia')" width="130" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.dealprice" size="mini" style="width:100%"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="150" align="center" v-if="form.status==0 || form.status==1">
                        <template v-slot="{row,$index}">
                            <as-button size="mini" type="danger" @click="deleteRow($index, row)">{{_label('shanchu')}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
                <sp-productstock-input @input="onSelect"></sp-productstock-input>
            </el-col>
        </el-row>

        <sp-dialog ref="receive-dialog" :title="_label('qingxuanze')" :width="1050" class="product">
            <simple-admin-page v-bind="props" ref="receive" :hide-create="true" :hide-form="true" v-if="form.id>0"></simple-admin-page>
        </sp-dialog>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js'
import { Productstock } from "../model.js"
import { extend, copyTo } from "../object.js"
import Asa_Productstock_Search from '../asa/Asa_Productstock_Search.vue'
import DataSource from '../DataSource.js'
import API from "../api.js";
import cachecomponent from '../mixins/cachecomponent.js';

const props = {
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
    auth: "sales",
    base: {
        salesid: ''
    },
    options: {
        isedit: (item) => item.status == 0,
        isdelete: (item) => item.status == 0
    }
}

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
                let result = await API.getPriceByProductIds("", productids.join(","));
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
        onSelect(productstock) {
            let target = self.tabledata.find(item=>item.productstock.id===productstock.id);
            if(!target) {
                self.tabledata.push({ productstock: productstock, number: 1, dealprice: "", price: 0 });
                _this.loadPrice();
            }
        }
    }

    return _this;
}

export default {
    name: 'sp-salesdetail',
    mixins: [cachecomponent],
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
                status: '0', //销售单状态：0-预售 1-已售 2-作废
                priceid: "",
                makestaff: "",
                makedate: "",
                id: ""
            },
            tabledata: [],
            base: {
                warehouseid: ""
            },
            props,
            pricename:"",
            productPrices:[],
            isChanged:false
        }
    },
    methods: {
        onPriceChange(priceid, pricename){
            this.pricename = pricename;
            _private(this).loadPrice();
        },
        addReceive() {
            let self = this;
            if (self.form.id > 0) {
                self._showDialog("receive-dialog");
                props.base.salesid = self.form.id
            }
        },
        getDealPrice(row) {
            if (row.is_match == 0) {
                return row.dealprice;
            } else {
                return row.price * row.number * this.form.discount;
            }
        },
        onWarehouseChange(newValue) {
            this.base.warehouseid = newValue;
        },
        showProduct() {
            this.$refs.stocksearch.setVisible(true)
        },
        onSelect(productstock) {
            _private(this).onSelect(productstock);
        },
        saveOrder(status) {
            //保存订单
            let self = this;

            //订单已经作废了。
            if (self.form.status == 3) {
                return;
            }

            let form = extend({}, self.form);
            form.status = status;
            let params = { form };
            params.list = self.tabledata.map(item => {
                return {
                    productstockid: item.productstock.id,
                    id: item.id,
                    dealprice: item.dealprice,
                    number: item.number,
                    price: self.computeProductPrice[item.productstock.productid],
                    priceid: self.form.priceid
                }
            })
            self._log(JSON.stringify(params));
            //return;

            self._submit("/sales/savesale", { params: JSON.stringify(params) }).then(function(res) {
                self.load();

                //通知列表，数据变化了
                self.$emit("change", res.data.form);

                self._redirect("/sales/"+ res.data.form.id);
            });
        },
        save(){
            let self = this;

            let form = extend({}, self.form);
            let params = { form };
            params.list = self.tabledata.map(item => {
                return {
                    id: item.id,
                    dealprice: item.dealprice
                }
            })

            self._submit("/sales/save", { params: JSON.stringify(params) }).then(function(res) {
                self.load();
            });
        },
        sale() {
            let self = this;

            if(!confirm(self._label('querentijiao'))) {
                return false;
            }

            self._submit("/sales/sale", {id:self.form.id}).then(function(res) {
                self.load();

                //通知列表，数据变化了
                self.$emit("change", res.data.form)
            })
        },
        cancel() {
            let self = this;

            if(!confirm(self._label('zuofei_warning'))) {
                return false;
            }

            self._submit("/sales/cancel", {id:self.form.id}).then(function(res) {
                self.load();

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
        yushou() {
            let self = this
            if(self.form.status==0 || self.form.status==1) {
                self.saveOrder(1);
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
                self.saveOrder(2)
            })
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        async appendRow(row) {
            const self = this;
            let result = await Productstock.load({data:row.productstock, depth:1})

            row.productstock = result
            self.tabledata.push(row);
            return row;
        },
        async load() {
            let self = this;
            let route = self.$route;
            let label;
            self._setTitle("loading...");

            if (route.params.id == 0) {
                self._setTitle(self._label("xinjianxiaoshoudan"));
            } else {
                //加载数据
                let result = await self._fetch("/sales/loadsale", { id: route.params.id });

                self.tabledata = [];
                copyTo(result.data.form, self.form);

                if (result.data.list) {
                    let promises = result.data.list.map(item => {
                        //self._log(item)
                        return self.appendRow(item);
                    });

                    let array = await Promise.all(promises);

                    _private(self).loadPrice();
                    self.pricename = await self._dataSource("price").getLabel(self.form.priceid);
                    self.isChanged = false;
                }
                self._setTitle(self._label("xiaoshoudan") +':'+ result.data.form.orderno);
            }
        }
    },
    computed: {
        canTijiao() {
            let form = this.form
            if(form.warehouseid=='' || (form.status!=0 && form.status!=1) ) {
                return false;
            }

            let target = this.tabledata.some(item=>{
                return item.productstock.warehouseid!=form.warehouseid;
            });

            if(target) {
                return false;
            }

            return true;
        },
        computeProductPrice(){
            let self = this;
            let result = Object.create(null)
            self.productPrices.forEach(item=>{
                if(item.priceid==self.form.priceid) {
                    result[item.productid] = item.price;
                }
            })

            return result;
        }
    },
    mounted: function() {
        let self = this;
        self.load();
        console.log("hhhhhhhhhhhhhhhhhh")
    },
    watch:{
        'tabledata':{
            handler: function(newValue, oldValue) {
                this.isChanged = true;
            },
            deep: true
        }
    }
}
</script>
