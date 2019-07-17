<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <as-button type="primary" @click="saveOrder">{{_label("shenqing")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('diaochucangku')">
                        <simple-select v-model="form.out_id" source="warehouse" @change="onOutChange"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('diaorucangku')">
                        <simple-select v-model="form.in_id" source="warehouse" @change="onInChange"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24">
                <el-table :data="tabledata" stripe border style="width:100%;">
                    <el-table-column :label="_label('guojima')" align="center" width="150">
                    <template v-slot="{row}">
                        <sp-product-tip :product="row.product"></sp-product-tip>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('chanpinmingcheng')" align="center" width="200">
                    <template v-slot="{row}">
                        {{row.product.getName()}}
                    </template>
                </el-table-column>
                    <el-table-column :label="_label('chima')" width="100" align="center">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.sizecontentid" source="sizecontent"/>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('diaochucangku')" width="180" align="center">
                        <template v-slot="{row}">
                            <simple-select v-model="row.out_id" source="warehouse" @change="onWarehouseChange($event, row)" :disabled="form.out_id>0" :filterMethod="filterMethods[row.index]"></simple-select>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('shuxing')" width="100" align="center">
                        <template v-slot="{row}">
                            <simple-select v-model="row.property" source="orderproperty"></simple-select>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('canpin')" width="100" align="center">
                        <template v-slot="{row}">
                            <simple-select v-model="row.defective_level" source="defectivelevel"></simple-select>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('kucunshuliang')" width="100" align="center">
                        <template v-slot="{row}">
                            {{stocks[row.index]}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('diaorucangku')" width="180" align="center">
                        <template v-slot="{row}">
                            <simple-select v-model="row.in_id" source="warehouse" :disabled="form.in_id>0"></simple-select>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('diaoboshuliang')" width="100" align="center">
                        <template v-slot="{row}">
                            <el-input v-model="row.number" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="150" align="center">
                        <template v-slot="scope">
                            <as-button size="mini" type="danger" @click="deleteRow(scope)">{{_label('shanchu')}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
                <sp-productstock-input @input="onSelect"></sp-productstock-input>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { extend } from '../object.js';
import API from '../api.js';

export default {
    name: 'sp-requisitioncreate',
    data() {
        let self = this;

        return {
            form: {
                out_id: "",
                in_id: "",
                memo: "",
            },
            index: 1,
            tabledata: [],
            productstocks: [],
        }
    },
    methods: {
        onOutChange() {
            const self = this;

            if(self.form.out_id>0) {
                self.tabledata.forEach(item=>{
                    item.out_id = self.form.out_id;
                });
            }

            let item = self.tabledata.pop();
            if(item) {
                self.tabledata.push(item);
            }
        },
        onInChange() {
            const self = this;

            if(self.form.in_id>0) {
                self.tabledata.forEach(item=>{
                    item.in_id = self.form.in_id;
                });
            }
        },
        async onWarehouseChange(warehouseid, {product,sizecontentid}) {
            let self = this;
            let result = await API.getProductstock({
                productid: product.id,
                sizecontentid,
            });
            // self._log(result);
        },
        async onSelect({product, number, sizecontentid}) {
            let self = this;

            let result = await API.getProductstock({
                productid: product.id,
                sizecontentid,
            });
            //self._log(result);
            result.forEach(item=>{
                self.productstocks.push(item);
            });

            self.tabledata.push({
                index: self.index,
                product,
                number,
                sizecontentid,
                property: 1,
                defective_level: 1,
                stock_number: '', // 库存数量
                in_id: self.form.in_id,
                out_id: self.form.out_id,
            });

            self.index += 1;
        },
        saveOrder() {
            //保存订单
            let self = this;

            if (!confirm(self._label('order_submit_confirm'))) {
                return;
            }

            let params = { memo: self.form.memo };
            params.list = self.tabledata.map(({product, sizecontentid, out_id, in_id, property, defective_level, number})=>{
                return {
                    productid: product.id,
                    sizecontentid,
                    out_id, in_id,
                    property,
                    defective_level,
                    number,
                };
            });
            //self._log(JSON.stringify(params))
            self._submit("/requisition/save", { params: JSON.stringify(params) }).then(function(res) {
                extend(self.form, {
                    out_id: "",
                    in_id: "",
                    memo: "",
                });
                self.tabledata = [];
                self.productstocks = [];
            });
        },
        deleteRow({$index}) {
            this.tabledata.splice($index,1);
        },
    },
    mounted() {
        let self = this;
        self._setTitle(self._label("xinjiandiaobodan"));
    },
    computed: {
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
                let key = [item.product.id, item.sizecontentid, item.property, item.defective_level, item.out_id].join('-');
                result[item.index] = stat[key] || 0;
            });

            return result;
        },
        filterMethods() {
            let self = this;
            let result = {};
            let stat = self.stockStat;
            //console.log("filterMethods change", new Date());
            self.tabledata.forEach(item=>{
                result[item.index] = function(keyword, option) {
                    //console.log(item, option, self.form.out_id==option.id);
                    let key = [item.product.id, item.sizecontentid, item.property, item.defective_level, option.id].join('-');
                    return self.form.out_id==option.id || item.out_id==option.id || (stat[key] && stat[key]>0);
                };
            });

            return result;
        },
    },
};
</script>
