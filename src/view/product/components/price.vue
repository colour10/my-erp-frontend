<template>
    <div>
        <el-table :data="data" border style="width:100%;">
            <el-table-column :label="_label('mingcheng')" align="center" width="150" prop="name" :sortable="true">
            </el-table-column>
            <el-table-column :label="_label('bizhong')" align="center" width="80" prop="currency">
            </el-table-column>
            <el-table-column :label="_label('jiage')" align="center" width="100" prop="price" :sortable="true">
                <template v-slot="{row}">
                    <span v-if="row.is_special=='0'">{{row.price}}</span>
                    <span v-if="row.is_special=='1'" style="color:#F56C6C">{{row.price}}</span>
                </template>
            </el-table-column>

            <el-table-column :label="_label('huilv')" align="center" width="80" prop="rate" :sortable="true">
            </el-table-column>

            <el-table-column :label="_label('dingjiaxishu')" align="center" width="120" prop="discount" :sortable="true">
            </el-table-column>

            <el-table-column :label="_label('maoli')" align="center" width="80" :sortable="true">
            </el-table-column>

            <el-table-column :label="_label('costplus')" align="right" width="100" :sortable="true" prop="costplus">
                <template v-slot="{row}">
                    {{row.costplus}}%
                </template>
            </el-table-column>

            <el-table-column :label="_label('caozuo')" align="center" width="150">
                <template v-slot="scope">
                    <as-button size="mini" @click="onClickUpdate(scope.row)">{{_label('bianji')}}</as-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="8" :span="8" style="padding:5px">
            <as-button type="primary" @click="onFresh">{{showLabel("shuaxin")}}</as-button>
        </el-col>

        <sp-dialog ref="productprice">
            <el-form :model="form" label-width="85px" :inline="false" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-form-item :label="_label('mingcheng')">
                        <el-input v-model="form.pricename" size="mini" disabled></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="0">
                    <el-form-item :label="_label('bizhong')">
                        <simple-select v-model="form.currencyid" source="currency" disabled></simple-select>
                    </el-form-item>
                </el-row>
                <el-row :gutter="0">
                    <el-form-item :label="_label('jiage')">
                        <el-input v-model="form.price" size="mini"></el-input>
                    </el-form-item>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button auth="product" type="primary" @click="onSubmit">{{_label("queding")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('productprice')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
    </div>
</template>

<script>
import globals, { showLabel } from '@/component/globals.js'
import DataSource from '@/component/DataSource.js';
import { extract, extend } from '@/component/object.js';
import API from "@/component/api.js";

export default {
    name: 'asa-product-price',
    props: ["option"],
    data() {
        var self = this;

        return {
            form: {
                price: '',
                pricename: '',
                priceid: '',
                currencyid: '',
            },
            data: [],
            loaded: false,
        };
    },
    methods: {
        onQuit() {
            this.$emit('quit');
        },
        onFresh() {
            let self = this;
            self.clear();
            self.load();
        },
        async onSubmit() {
            let self = this;
            let params = {
                priceid: self.form.priceid,
                currencyid: self.form.currencyid,
                price: self.form.price,
                productid: self.$route.params.id,
            };
            let result = await self._submit("/product/saveprice", params);
            self.onFresh();
            self._hideDialog('productprice');
        },
        onClickUpdate(row) {
            let self = this;
            console.log(row);
            self.form.price = row.price;
            self.form.pricename = row.name;
            self.form.currencyid = row.currencyid;
            self.form.priceid = row.id;
            self._showDialog('productprice');
        },
        clear() {
            let self = this;
            self.loaded = false;
            self.data = [];

            return self;
        },
        async load() {
            let self = this;
            if (self.loaded) {
                return;
            }

            //加载数据
            let result = await API.getPriceByProductIds("", self.$route.params.id);
            self._log(result);

            let source = DataSource.getDataSource("currency");
            self.data = result.map(item => {
                item.currency = "";
                source.getRow(item.currencyid, row => item.currency = row.row.code);
                return item;
            });
            self.loaded = true;
            self._log(self.data);
            return self;
        },
    }
};
</script>
