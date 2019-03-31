<template>
    <div style="width:100%">
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <el-col :span="6">
                    <el-form-item :label="_label('cangku')">
                        <simple-select v-model="form.warehouseid" source="warehouse" :lang="lang"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-row type="flex" justify="start">
                        <el-button type="primary" @click="search()">{{_label("chaxun")}}</el-button>
                    </el-row>
                </el-col>
            </el-row>
        </el-form>
        <el-table :data="searchresult" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
            <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center" sortable>
                <template v-slot="scope">
                    <el-button type="text" @click="selectRow(scope.row)">{{scope.row.product.productname}}</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                <template v-slot="scope">
                    {{scope.row.sizecontent.getLabel()}}
                </template>
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
        </el-table>

        <product ref="product"></product>
    </div>
</template>

<script>
import globals,{Productstock} from '../globals.js'
import Product from '../asa/Asa_Product.vue'

export default {
    name: 'asapage-productstock',
    components: {
        "product":Product
    },
    props: {},
    data() {
        var self = this;

        return {
            form: {
                warehouseid: ""
            },
            searchresult: [],
            lang: globals.getLabel('lang')
        }
    },
    methods: {
        search() {
            //查询库存商品
            let self = this

            self._fetch("/productstock/search", self.form, function(res) {
                //self._log("/productstock/page", res)
                self.searchresult = []
                res.data.forEach(function(item) {
                    Productstock.get(item, function(result) {
                        self.searchresult.push(result)
                    }, 2)
                })
            })
        },
        selectRow(row) {
            this.$refs.product.setInfo(row.product).show()
            //this.$emit("select", row)
        }
    },
    computed: {
    },
    watch: {
    },
    mounted: function() {
        //this.$refs.product.show();
    }
}
</script>
