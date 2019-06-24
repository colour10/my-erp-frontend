<template>
    <div>
        <el-dialog :visible.sync="visible" :center="true" :fullscreen="false" :modal="true" width="1024px">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('cangku')">
                            <simple-select v-model="form.warehouseid" source="warehouse"></simple-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-row type="flex" justify="start">
                            <as-button type="primary" @click="search()">{{_label("chaxun")}}</as-button>
                        </el-row>
                    </el-col>
                </el-row>
            </el-form>
            <el-table :data="searchresult" stripe border style="width:100%;">
                <el-table-column :label="_label('guojima')" align="center">
                    <template v-slot="{row}">
                        <sp-product-tip :product="row.product"></sp-product-tip>
                    </template>
                </el-table-column>
                <el-table-column :label="_label('chanpinmingcheng')" align="center">
                    <template v-slot="{row}">
                        {{row.product.getName()}}
                    </template>
                </el-table-column>
                <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center"></el-table-column>
                <el-table-column prop="warehousename" :label="_label('cangku')" width="100" align="center">
                    <template v-slot="scope">
                        {{scope.row.warehouse.name}}
                    </template>
                </el-table-column>
                <el-table-column prop="number" :label="_label('kucunshuliang')" width="200" align="center">
                    <template v-slot="scope">
                        {{scope.row.number}}
                    </template>
                </el-table-column>
                <el-table-column :label="_label('caozuo')" width="150" align="center">
                    <template v-slot="scope">
                        <as-button size="mini" type="primary" @click="selectRow(scope.row)">{{_label('xuanze')}}</as-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import { Productstock } from "../model.js"
import _ from 'lodash'

export default {
    name: 'sp-productstock-search',
    data() {
        let self = this;

        return {
            form: {
                warehouseid: ""
            },
            searchresult: [],
            visible:false
        }
    },
    methods: {
        search() {
            //查询库存商品
            let self = this

            if (self.warehouseIsDisabled == true && self.form.warehouseid == "") {
                alert(self._label("choice_warehouse"));
                return
            }

            self._fetch("/productstock/search", self.form).then(function(res) {
                self.searchresult = []
                res.data.forEach(function(item) {
                    Productstock.get(item, function(result) {
                        self.searchresult.push(result)
                    }, 1)
                })
            })
        },
        selectRow(row) {
            let self = this
            self.$emit("select", _.cloneDeep(row))
            self.setVisible(false)
        },
        setVisible(isVisible) {
            this.visible = isVisible;
        }
    }
}
</script>
