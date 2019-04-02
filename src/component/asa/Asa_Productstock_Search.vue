<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <el-col :span="6">
                    <el-form-item :label="_label('cangku')">
                        <simple-select v-model="form.warehouseid" source="warehouse" :lang="lang" :disabled="warehouseIsDisabled"></simple-select>
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
            <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                <template v-slot="scope">
                    {{scope.row.product.productname}}
                </template>
            </el-table-column>
            <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                <template v-slot="scope">
                    {{scope.row.sizecontent.getLabel()}}
                </template>
            </el-table-column>
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
                    <el-button size="mini" type="primary" @click="selectRow(scope.row)">{{_label('xuanze')}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import globals from '../globals.js'
import { Productstock } from "../model.js"
import simple_select from '../Simple_Select.vue'
import DataSource from '../DataSource.js'

export default {
    name: 'asa-requisition-dialog',
    components: {
        'simple-select': simple_select,
    },
    props: ["base"],
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

            if(self.warehouseIsDisabled==true && self.form.warehouseid=="") {
                alert(self._label("choice_warehouse"));
                return 
            }

            self._fetch("/productstock/page", self.form, function(res) {
                //self._log("/productstock/page", res)
                self.searchresult = []
                res.data.forEach(function(item) {
                    Productstock.get(item, function(result) {
                        self.searchresult.push(result)
                    }, 1)
                })
            })
        },
        selectRow(row) {
            this._log(row)
            this.$emit("select", $ASA.extend(true, {}, row))
        }
    },
    computed: {
        warehouseIsDisabled() {
            var base = this.base;
            return base && typeof(base.warehouseid) != 'undefined'
        }
    },
    watch: {
        base: {
            handler: function(newValue, oldValue) {
                var self = this;
                var base = this.base;
                if (base.warehouseid) {
                    self.form.warehouseid = base.warehouseid;
                }
            },
            deep: true
        }
    },
    mounted: function() {
        var base = this.base;
        if (base && base.warehouseid) {
            self.warehouseid = base.warehouseid;
        }
    }
}
</script>
