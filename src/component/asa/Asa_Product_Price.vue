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
            
            <el-table-column :label="_label('xishu')" align="center" width="80" prop="discount" :sortable="true">
            </el-table-column>

            <el-table-column :label="_label('maoli')" align="center" width="80" :sortable="true">
            </el-table-column>

            <el-table-column :label="_label('costplus')" align="right" width="100" :sortable="true" prop="costplus">
                <template v-slot="{row}">
                    {{row.costplus}}%
                </template>
            </el-table-column>
            <el-table-column :label="_label('quzheng')" align="center" width="80">
                <template v-slot="{row}">
                    <sp-select-text :value="row.filter" source="pricefilter"></sp-select-text>
                </template>
            </el-table-column>

            <el-table-column :label="_label('caozuo')" align="center" width="150">
                <template v-slot="scope">
                    <as-button size="mini" @click="onClickUpdate(scope.$index, scope.row)">{{_label('bianji')}}</as-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="8" :span="8" style="padding:5px">
            <as-button type="primary" @click="onFresh">{{_label("shuaxin")}}</as-button>
            <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
        </el-col>
        <simpleform name="productprice" authname="product" ref="productprice" :title="_label('querenfukuan')" @submit="onSubmit" :isEditable="(f)=>true"></simpleform>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js';
import DataSource from '../DataSource.js';
import simpleform from '../Simple_Form.vue';
import { extract, extend } from '../object.js';

export default {
    name: 'asa-product-price',
    components: {
        simpleform
    },
    props: ["option", "productid"],
    data() {
        var self = this;

        return {
            data: [],
            loaded: false
        }
    },
    methods: {
        onQuit() {
            this.$emit('quit')
        },
        onFresh() {
            let self = this
            self.clear()
            self.load()
        },
        async onSubmit(form) {
            let self = this;
            //this._log("确认保存",form)
            let params = extract(form, ['price', 'currencyid'])
            params.productid = self.productid
            params.priceid = form.id
            let result = await self._submit("/product/saveprice", params)
            self.clear().load()
        },
        onClickUpdate(rowIndex, row) {
            let self = this;
            row.pricename = row.name
            self.$refs['productprice'].setInfo(row)._setting({ submitButtonText: _label('baocun') }).show()
        },
        clear() {
            let self = this;
            self.loaded = false
            self.data = [];

            return self
        },
        async load() {
            let self = this
            if (self.loaded) {
                return
            }

            //加载数据
            let res = await self._fetch("/product/getprices", { id: self.productid })
            self._log(res)

            let source = DataSource.getDataSource("currency")
            self.data = res.data.map(item => {
                item.currency = ""
                source.getRow(item.currencyid, row => item.currency = row.row.code)
                return item
            })
            self.loaded = true
            self._log(self.data)
            return self;
        }
    },
    watch: {
        productid(newValue) {
            this.clear()
        }
    }
}
</script>
