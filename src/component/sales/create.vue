<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <au-button auth="sales" type="primary" @click="sale(1)">{{_label("yushou")}}</au-button>
                <au-button auth="sales" type="primary" @click="sale(2)">{{_label("xiaoshou")}}</au-button>
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
                        <simple-select v-model="form.warehouseid" source="userwarehouse" :disabled="form.status!=0"></simple-select>
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
        <el-table :data="tablerows" stripe border style="width:100%;" v-if="form.warehouseid>0">
            <el-table-column :label="_label('guojima')" align="left" width="250">
                <template v-slot="{row}">
                    <sp-product-tip :product="row.product" v-if="!row.type"/>
                    <el-autocomplete ref="wordcode" v-model="search.wordcode" :placeholder="_label('guojima')" :fetch-suggestions="searchProduct" @select="onSelect" value-key="wordcode" v-if="row.type=='foot'" size="mini" style="width:100%">
                    </el-autocomplete>
                </template>
            </el-table-column>
            <el-table-column :label="_label('chima')" width="100" align="center">
                <template v-slot="{row}">
                    <sp-select-text :value="row.sizecontentid" source="sizecontent" v-if="!row.type"/>
                    <el-select ref="select" v-model="search.sizecontentid" :placeholder="_label('chima')" style="width:150" v-if="row.type=='foot'" size="mini">
                        <el-option v-for="item in options" :key="item.id+item.name" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shangpintiaoma')" align="center" width="150">
                <template v-slot="{row}">
                    <sp-product-code :productid="row.product.id" :sizecontentid="row.sizecontentid" v-if="!row.type"></sp-product-code>
                    <el-input ref="goods_code" v-model="search.goods_code" :placeholder="_label('shangpintiaoma')" v-if="row.type=='foot'" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shuliang')" width="70" align="left">
                <template v-slot="{row}">
                    <el-input v-model="row.number" size="mini" :disabled="form.status>=2" v-if="!row.type" class="number" @focus="onFocus(row.index)" :ref="row.index"></el-input>

                    <el-input v-model="search.number" :placeholder="_label('shuliang')" v-if="row.type=='foot'" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column :label="_label('chengjiaojia')" width="90" align="center">
                <template v-slot="{row}">
                    <el-input v-model="row.dealprice" size="mini" style="width:100%" v-if="!row.type" class="number"></el-input>
                    <el-button type="primary" style="margin:0px" native-type="submit" @click="onClick" v-if="row.type=='foot'" size="mini">{{_label('zengjia')}}</el-button>
                </template>
            </el-table-column>

            <el-table-column :label="_label('kucunshuliang')" width="90" align="center">
                <template v-slot="{row}">
                    <span v-if="!row.type">{{stocks[row.index]}}</span>
                </template>
            </el-table-column>

            <el-table-column :label="_label('xuanze')" width="70" align="center">
                <template v-slot="{row}">
                    <sp-sales-select v-model="row.warehouselist" :stocks="warehouseStocks[row.index]" :warehouseid="form.warehouseid" :number="row.number" v-if="!row.type" :is-dispatch="dispatches[row.index]==row.number"></sp-sales-select>
                </template>
            </el-table-column>

            <el-table-column :label="pricename" width="100" align="center">
                <template v-slot="{row}">
                    <span v-if="!row.type">{{computeProductPrice[row.product.id]}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="_label('zongjia')" width="100" align="center">
                <template v-slot="{row}">
                    <span v-if="!row.type">{{row.dealprice*row.number}}</span>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shuxing')" width="100" align="center">
                <template v-slot="{row}">
                    <simple-select v-model="row.property" source="orderproperty" v-if="!row.type"></simple-select>
                </template>
            </el-table-column>

            <el-table-column :label="_label('canpin')" width="100" align="center">
                <template v-slot="{row}">
                    <simple-select v-model="row.defective_level" source="defectivelevel" v-if="!row.type"></simple-select>
                </template>
            </el-table-column>

            <el-table-column :label="_label('caozuo')" width="80" align="center" v-if="form.status==0 || form.status==1">
                <template v-slot="{row,$index}">
                    <as-button size="mini" type="danger" @click="deleteRow($index, row)" v-if="!row.type">{{_label('shanchu')}}</as-button>
                </template>
            </el-table-column>
        </el-table>
        </el-form>
    </div>
</template>

<script>
import globals, { _label, empty } from '../globals.js'
import { Productstock, ProductDetail } from "../model.js"
import { extend, copyTo } from "../object.js"
import API from "../api.js";
import cachecomponent from '../mixins/cachecomponent.js';
import Asa_Sales_Select from '../asa/Asa_Sales_Select.vue';
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
                let productid = item.product.id;
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
    }

    return _this;
}

export default {
    name: 'sp-salescreate',
    mixins: [cachecomponent],
    components: {
        [Asa_Sales_Select.name]: Asa_Sales_Select,
    },
    data() {
        return {
            search: {
                wordcode: '',
                sizecontentid: '',
                goods_code: '',
                number: '1',
            },
            product: '',
            options: [],
            productstocks: [],
            index: 1,
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
                id: '',
            },
            tabledata: [],
            pricename: '',
            productPrices: [],
        };
    },
    methods: {
        onFocus(refname) {
            this.$refs[refname].select();
        },
        async onClick() {
            let self = this;
            let focusTarget = 'wordcode'; // 自动聚焦的对象

            if(!self.product && self.search.goods_code.length>0) {
                let result = await API.getProductByCode(self.search.goods_code);
                if(result) {
                    let product = await ProductDetail.load({data:result.productid, depth:1});
                    self.search.sizecontentid = result.sizecontentid;
                    self.product = product;
                }

                focusTarget = 'goods_code';
            }

            if(!self.product || !self.search.number.match(/^\d+$/) || self.search.sizecontentid=='') {
                return;
            }

            let result = await API.getProductstock({
                productid: self.product.id,
                sizecontentid: self.search.sizecontentid,
            });

            //self._log(result);
            result.forEach(item=>{
                self.productstocks.push(item);
            });

            self.tabledata.push({
                index: self.index,
                product: self.product,
                number: self.search.number,
                sizecontentid: self.search.sizecontentid,
                property: 1,
                defective_level: 1,
                dealprice: '', // 成交价
                warehouselist: [], // 选择从哪些仓库发货
            });

            self.index += 1;


            self.product = '';
            self.options = [];
            empty(self.search);
            self.search.number = '1';

            await _private(self).loadPrice();

            setTimeout(function() {
                self.$refs[focusTarget].focus();
            }, 100);
        },
        async searchProduct(keyword, callback) {
            let self = this;

            if(self.search.wordcode!='') {
                let result = await API.getProductList(self.search.wordcode);
                callback(result);
            }
            else {
                callback([]);
            }
        },
        onPriceChange(priceid, pricename){
            this.pricename = pricename;
            _private(this).loadPrice();
        },
        async onSelect(data) {
            let self = this;

            let product = await ProductDetail.load({data, depth:1});
            self.options = [];
            product.sizecontents.forEach(item=>{
                self.options.push(item);
            });

            self.product = product;
        },
        sale(status) {
            //保存订单
            let self = this;

            let form = extend({}, self.form);
            form.status = status;
            let params = { form };

            // 销售单明细数据
            params.list = self.tabledata.map(item => {
                return {
                    productid: item.product.id,
                    sizecontentid: item.sizecontentid,
                    defective_level: item.defective_level,
                    property: item.property,
                    dealprice: item.dealprice,
                    number: item.number,
                    price: self.computeProductPrice[item.product.id],
                    priceid: self.form.priceid,
                };
            });

            // 需要生成调拨单的数据列表
            params.requisitions = [];
            // self.tabledata.forEach(item => {
            //     item.warehouselist.forEach(warehouse => {
            //         if(self.form.warehouseid!=warehouse.warehouseid) {
            //             params.requisitions.push({
            //                 productid: item.product.id,
            //                 sizecontentid: item.sizecontentid,
            //                 defective_level: item.defective_level,
            //                 property: item.property,
            //                 warehouseid: warehouse.warehouseid,
            //                 number: warehouse.number,
            //             });
            //         }
            //     });
            // });

            // 生成调拨单数据
            for(let item of self.tabledata) {
                // 检查数量分配是否正确
                if(self.dispatches[item.index]!=item.number) {
                    return alert("kucunbuzu");
                }

                for(let warehouse of item.warehouselist) {
                    if(self.form.warehouseid!=warehouse.warehouseid) {
                        params.requisitions.push({
                            productid: item.product.id,
                            sizecontentid: item.sizecontentid,
                            defective_level: item.defective_level,
                            property: item.property,
                            warehouseid: warehouse.warehouseid,
                            number: warehouse.number,
                        });
                    }
                }
            }

            self._log(JSON.stringify(params));
            // 验证数量是否合法


            if(!self.confirm()) {
                return ;
            }
            return ;

            self._submit("/sales/savesale", { params: JSON.stringify(params) }).then(function(res) {
                //通知列表，数据变化了
                self.$emit("change", res.data.form);

                self._redirect("/sales/"+ res.data.form.id);
            });
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
    },
    computed: {
        tablerows() {
            let self = this;
            let result = [];
            self.tabledata.forEach(row=>{
                result.push(row);
            });

            result.push({type: 'foot'});

            return result;
        },
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
        stockStat() {
            let self = this;
            let result = {};

            self.productstocks.forEach(item=>{
                let key = [item.productid, item.sizecontentid, item.property, item.defective_level, item.warehouseid].join('-');
                result[key] = item.number-item.reserve_number;
            });

            return result;
        },
        stocks() {
            let self = this;
            let result = {};
            let stat = self.stockStat;

            self.tabledata.forEach(item=>{
                let key = [item.product.id, item.sizecontentid, item.property, item.defective_level, self.form.warehouseid].join('-');
                result[item.index] = stat[key] || 0;
            });

            return result;
        },
        warehouseStocks() {
            let self = this;
            let result = {};

            let stat = statHelper([]);

            self.productstocks.forEach(item=>{
                let key = [item.productid, item.sizecontentid, item.property, item.defective_level].join('-');
                let target = stat.get(key);
                target.push({
                    warehouseid: item.warehouseid,
                    stock_number: item.number-item.reserve_number,
                });
            });


            self.tabledata.forEach(item=>{
                let key = [item.product.id, item.sizecontentid, item.property, item.defective_level].join('-');
                result[item.index] = stat.get(key);
            });

            return result;
        },
        dispatches() {
            let self = this;
            let result = self._newbox();

            self.tabledata.forEach(item=>{
                let total = 0;
                item.warehouselist.forEach(row=>{
                    if(row.number<=row.stock_number) {
                        total += row.number*1;
                    }
                });
                result[item.index] = total;
            });

            return result;
        },
    },
    mounted: function() {
        let self = this;
        self._setTitle(self._label("xinjianxiaoshoudan"));
    },
};
</script>

<style>
.number .el-input__inner {padding: 0px 5px;}
</style>