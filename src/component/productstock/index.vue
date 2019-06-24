<template>
    <div style="width:100%">
        <el-form :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-form-item>
                <simple-select v-model="form.warehouseid" source="warehouse" :placeholder="_label('cangku')" :clearable="true"></simple-select>
                <as-button type="primary" @click="search()">{{_label("chaxun")}}</as-button>
            </el-form-item>
        </el-form>
        <sp-table :data="searchresult" border style="width:100%;">
            <el-table-column :label="_label('chanpinmingcheng')" align="center" sortable width="200">
                <template v-slot="{row}">
                    {{row.product.getName()}}
                </template>
            </el-table-column>
            <el-table-column :label="_label('guojima')" align="center" sortable width="200">
                <template v-slot="{row}">
                    <sp-product-tip :product="row.product"/>
                </template>
            </el-table-column>
            <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center" sortable>
            </el-table-column>
            <el-table-column sortable :label="_label('cangku')" width="100" align="center">
                <template v-slot="{row}">
                    {{row.warehouse.name}}
                </template>
            </el-table-column>
            <el-table-column :label="_label('kucunshuliang')" width="110" align="center">
                <template v-slot="{row}">
                    {{row.number}}
                </template>
            </el-table-column>

        </sp-table>
    </div>
</template>

<script>
import { Productstock } from "../model.js"

export default {
    name: 'sp-productstock',
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
        }
    }
}
</script>
