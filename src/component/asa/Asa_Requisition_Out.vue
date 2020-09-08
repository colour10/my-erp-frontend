<template>
    <div class="product clearpadding">
        <el-form :model="form" :inline="true" size="mini" @submit.native.prevent>
        <el-table :data="tablerows" stripe border style="width:100%;">
            <el-table-column :label="_label('guojima')" align="center" width="250">
                <template v-slot="{row}">
                    <sp-product-tip :product="row.data.product" v-if="row.type=='body'"></sp-product-tip>
                    <el-autocomplete ref="wordcode" v-model="form.wordcode" :placeholder="_label('guojima')" :fetch-suggestions="searchProduct" @select="onSelect" value-key="wordcode" v-if="row.type=='foot'" size="mini" style="width:100%"></el-autocomplete>
                </template>
            </el-table-column>

            <el-table-column :label="_label('chima')" width="130" align="center">
                <template v-slot="{row}">
                    <sp-select-text :value="row.data.sizecontentid" source="sizecontent" v-if="row.type=='body'"/>
                    <el-select ref="select" v-model="form.sizecontentid" :placeholder="_label('chima')" style="width:150" v-if="row.type=='foot'" size="mini">
                        <el-option v-for="item in options" :key="item.id+item.name" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shangpintiaoma')" align="center" width="150">
                <template v-slot="{row}">
                    <sp-product-code :productid="row.data.product.id" :sizecontentid="row.data.sizecontentid" v-if="row.type=='body'"></sp-product-code>
                    <el-input ref="goods_code" v-model="form.goods_code" :placeholder="_label('shangpintiaoma')" v-if="row.type=='foot'" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column :label="_label('diaoboshuliang')" width="100" align="center">
                <template v-slot="{row}">
                    <el-input v-model="row.data.number" size="mini" v-if="row.type=='body'"></el-input>
                    <el-input v-model="form.number" :placeholder="_label('shuliang')" v-if="row.type=='foot'" size="mini"></el-input>
                </template>
            </el-table-column>

            <el-table-column :label="_label('chanpinmingcheng')" align="left" width="200">
                <template v-slot="{row}">
                    <span v-if="row.type=='body'">{{row.data.product.getName()}}</span>
                    <el-button type="primary" style="margin:0px" native-type="submit" @click="onClick" v-if="row.type=='foot'" size="mini">{{_label('zengjia')}}</el-button>
                </template>
            </el-table-column>

            <el-table-column :label="_label('shuxing')" width="100" align="center">
                <template v-slot="{row}">
                    <simple-select v-model="row.data.property" source="orderproperty" v-if="row.type=='body'"></simple-select>
                </template>
            </el-table-column>

            <el-table-column :label="_label('canpin')" width="100" align="center">
                <template v-slot="{row}">
                    <simple-select v-model="row.data.defective_level" source="defectivelevel" v-if="row.type=='body'"></simple-select>
                </template>
            </el-table-column>

            <el-table-column :label="_label('kucunshuliang')" width="100" align="center">
                <template v-slot="{row}">
                    <span v-if="row.type=='body'">{{stocks[row.data.index]}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="_label('diaorucangku')" width="180" align="center">
                <template v-slot="{row}">
                    <simple-select v-model="row.data.in_id" source="warehouses" :disabled="form.in_id>0" v-if="row.type=='body'"></simple-select>
                </template>
            </el-table-column>

            <el-table-column :label="_label('caozuo')" width="150" align="center">
                <template v-slot="{row,$index}">
                    <as-button size="mini" type="danger" @click="deleteRow($index)" v-if="row.type=='body'">{{_label('shanchu')}}</as-button>
                </template>
            </el-table-column>
        </el-table>
        </el-form>
    </div>
</template>

<script>
import API from '../api.js';
import { ProductDetail } from '../model.js';
import { empty } from '../globals.js';

export default {
    name: 'sp-requisition-out',
    props: {
        out_id: {
            require: true,
        },
    },
    data() {
        return {
            form: {
                wordcode: '',
                goods_code: '',
                sizecontentid: '',
                number: '1',
            },
            index: 1,
            tabledata: [],
            productstocks: [],
            options: [],
            product: '',
        };
    },
    methods:{
        getList() {
            let self = this;
            let stocks = self.stocks;

            return self.tabledata.map(({product, sizecontentid, in_id, property, defective_level, number, index})=>{
                return {
                    productid: product.id,
                    sizecontentid,
                    out_id: self.out_id,
                    in_id,
                    property,
                    defective_level,
                    number,
                    stock_number: stocks[index],
                };
            }).filter(item=>item.number>0);
        },
        async onClick() {
            let self = this;

            let focusTarget = 'wordcode'; // 自动聚焦的对象

            if(!self.product && self.form.goods_code.length>0) {
                let result = await API.getProductByCode(self.form.goods_code);
                if(result) {
                    let product = await ProductDetail.load({data:result.productid, depth:1});
                    self.form.sizecontentid = result.sizecontentid;
                    self.product = product;
                }

                focusTarget = 'goods_code';
            }

            if(!self.product || !self.form.number.match(/^\d+$/) || self.form.sizecontentid=='') {
                return;
            }

            let result = await API.getProductstock({
                productid: self.product.id,
                sizecontentid: self.form.sizecontentid,
            });

            //self._log(result);
            result.forEach(item=>{
                self.productstocks.push(item);
            });

            self.tabledata.push({
                index: self.index,
                product: self.product,
                number: self.form.number,
                sizecontentid: self.form.sizecontentid,
                property: 1,
                defective_level: 1,
                stock_number: '', // 库存数量
                in_id: '',
            });

            self.index += 1;


            self.product = '';
            self.options = [];
            empty(self.form);
            self.form.number = '1';

            setTimeout(function() {
                self.$refs[focusTarget].focus();
            }, 100);
        },
        async searchProduct(keyword, callback) {
            let self = this;

            if(self.form.wordcode!='') {
                let result = await API.getProductList(self.form.wordcode);
                callback(result);
            }
            else {
                callback([]);
            }
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
        deleteRow(index) {
            this.tabledata.splice(index, 1);
        },
    },
    computed: {
        tablerows() {
            let self = this;
            let result = [];
            self.tabledata.forEach(row=>{
                result.push({
                    type: 'body',
                    data: row,
                });
            });

            result.push({
                type: 'foot',
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
                let key = [item.product.id, item.sizecontentid, item.property, item.defective_level, self.out_id].join('-');
                result[item.index] = stat[key] || 0;
            });

            return result;
        },
    },
    watch: {
        out_id(newvalue) {
            this.tabledata.forEach(item=>{
                item.out_id = newvalue;
            });
        },
        'form.wordcode': function() {
            let self = this;
            self.product = '';
            self.options = [];
        },
    },
};
</script>
