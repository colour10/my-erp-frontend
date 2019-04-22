<template>
    <div>
        <el-table :data="data" border style="width:100%;">
            <el-table-column :label="_label('mingcheng')" align="center" width="150" prop="name">
            </el-table-column>
            <el-table-column :label="_label('bizhong')" align="center" width="150" prop="currency">
            </el-table-column>
            <el-table-column :label="_label('jiage')" align="center" width="150" prop="price">
            </el-table-column>
            <el-table-column :label="_label('caozuo')" align="center" width="150">
                <template v-slot="scope">
                    <as-button size="mini" @click="onClickUpdate(scope.$index, scope.row)">{{_label('bianji')}}</as-button>                    
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="8" :span="8" style="padding:5px">
            <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
        </el-col>

        <simpleform name="productprice" authname="product" ref="productprice" :title="_label('querenfukuan')" @submit="onSubmit" :isEditable="(f)=>true"></simpleform>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js'
import DataSource from '../DataSource.js'
import simpleform from '../Simple_Form.vue'
import { extract, extend } from '../object.js'

export default {
    name: 'asa-product-price',
    components: {
        simpleform
    },
    props: ["option"],
    data() {
        var self = this;

        return {
            product: {},
            data: [],
            loaded:false
        }
    },
    methods: {
        onQuit(){
            this.$emit('quit')
        },
        async onSubmit(form) {
            let self = this;
            //this._log("确认保存",form)
            let params = extract(form, ['price','currencyid'])
            params.productid = self.product.id
            params.priceid = form.id
            let result = await self._submit("/product/saveprice", params)
            self.load()
        },        
        onClickUpdate(rowIndex, row) {
            let self = this;
            row.pricename = row.name
            self.$refs['productprice'].setInfo(row)._setting({ submitButtonText: _label('baocun') }).show()
        },
        async setProduct(product) {
            let self = this;
            self.product = product
            self.loaded = false
            self.data = [];

            return self
        },
        async load() {
            let self = this
            if(self.loaded) {
                return
            }

            //加载数据
            let res = await self._fetch("/product/getprices", {id:self.product.id})
            self._log(res)

            let source = DataSource.getDataSource("currency")
            self.data = res.data.map(item=>{
                item.currency = ""
                source.getRow(item.currencyid, row=>item.currency=row.row.code)
                return item
            })
            self.loaded = true
            self._log(self.data)
            return self;
        }
    },
    computed: {},
    watch: {}
}
</script>
