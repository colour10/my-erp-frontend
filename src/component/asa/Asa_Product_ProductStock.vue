<template>
    <div>
        <el-table :data="data" border style="width:100%;">
            <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center" sortable>
            </el-table-column>
            <el-table-column prop="warehouseid" sortable :label="_label('cangku')" width="130" align="center">
                <template v-slot="scope">
                    {{scope.row.warehouse.name}}
                </template>
            </el-table-column>
            <el-table-column prop="property_label" :label="_label('shuxing')" width="120" align="center" sortable> </el-table-column>
            <el-table-column prop="defectivelevel_label" :label="_label('zhiliang')" width="100" align="center" sortable> </el-table-column>
            <el-table-column prop="number" :label="_label('kucunshuliang')" width="120" align="center">
                <template v-slot="scope">
                    {{scope.row.number}}
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="8" :span="8" style="padding:5px">
            <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
        </el-col>
    </div>
</template>

<script>
import { Productstock } from '../model.js'

export default {
    name: 'asa-product-price',
    props: ["productid"],
    data() {
        var self = this;

        return {
            data: [],
            loaded: false,
        };
    },
    methods: {
        onQuit() {
            this.$emit('quit');
        },
        async setProduct() {
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
            let {data} = await self._fetch("/product/getproductstock", { productid: self.productid })
            //self._log(res);

            for(let item of data) {
                Productstock.get(item, function(result) {
                    self.data.push(result)
                }, 2);
            }

            self.loaded = true;
            //self._log(self.data);
            return self;
        }
    },
    mounted: function() {
        this.setProduct();
    },
    watch: {
        productid(newValue) {
            this.setProduct();
        },
    },
};
</script>
