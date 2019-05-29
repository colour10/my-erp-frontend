<template>
    <div style="width:100%">
        <el-form :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-form-item>
                <simple-select v-model="form.warehouseid" source="warehouse" :placeholder="_label('cangku')" :clearable="true"></simple-select>
                <as-button type="primary" @click="search()">{{_label("chaxun")}}</as-button>
            </el-form-item>
        </el-form>
        <sp-table :data="searchresult" border style="width:100%;">
            <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center" sortable width="200">
                <template v-slot="scope">
                    <as-button type="text" @click="selectRow(scope.row)">{{scope.row.product.getName()}}</as-button>
                </template>
            </el-table-column>
            <el-table-column prop="productname" :label="_label('guojima')" align="center" sortable width="120">
                <template v-slot="scope">
                    {{scope.row.product.getGoodsCode()}}
                </template>
            </el-table-column>
            <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center" sortable>
            </el-table-column>
            <el-table-column prop="warehouseid" sortable :label="_label('cangku')" width="100" align="center">
                <template v-slot="scope">
                    {{scope.row.warehouse.name}}
                </template>
            </el-table-column>
            <el-table-column prop="number" :label="_label('kucunshuliang')" width="200" align="center">
                <template v-slot="scope">
                    {{scope.row.number}}
                </template>
            </el-table-column>
        </sp-table>
        <product ref="product"></product>
    </div>
</template>

<script>
import { Productstock } from "../model.js"
import Product from '../asa/Asa_Product.vue'

export default {
    name: 'sp-productstock',
    components: {
        "product": Product
    },
    data() {
        return {
            form: {
                warehouseid: ""
            },
            searchresult: []
        }
    },
    methods: {
        search() {
            //查询库存商品
            let self = this

            self._fetch("/productstock/search", self.form).then(function(res) {
                self.searchresult = []
                res.data.forEach(function(item) {
                    Productstock.get(item, function(result) {
                        self.searchresult.push(result)
                    }, 2)
                })
            })
        },
        selectRow(row) {
            this.$refs.product.setInfo(row.product).then(product => product.show())
        }
    }
}
</script>
