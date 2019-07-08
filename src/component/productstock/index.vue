<template>
    <div style="width:100%">
        <as-button type="primary" @click="_showDialog('search')">{{_label("chaxun")}}</as-button>
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

            <el-table-column :label="_label('zaitushuliang')" width="110" align="center">
                <template v-slot="{row}">
                    {{row.shipping_number}}
                </template>
            </el-table-column>

            <el-table-column :label="_label('suodingshuliang')" width="110" align="center">
                <template v-slot="{row}">
                    {{row.reserve_number}}
                </template>
            </el-table-column>

        </sp-table>

        <sp-dialog ref="search" :width="600">
            <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
                <el-row :gutter="0">
                    <el-col :span="8" style="width:270px">
                        <el-form-item :label="_label('cangku')">
                            <simple-select v-model="form.warehouseid" source="warehouse" :placeholder="_label('cangku')" :clearable="true"></simple-select>

                        </el-form-item>
                        <el-form-item :label="_label('guojima')" prop="ageseason">
                            <el-input v-model="form.wordcode" class="width2"/>
                        </el-form-item>
                        <el-form-item :label="_label('niandai')" prop="ageseason">
                            <simple-select v-model="form.ageseason" source="ageseason" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('pinpai')" prop="brandid">
                            <simple-select v-model="form.brandid" source="brand" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                            <simple-select v-model="form.brandgroupid" source="brandgroup" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('zipinlei')" prop="childbrand">
                            <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :parentid="form.brandgroupid" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('chandi')" prop="countries">
                            <simple-select v-model="form.countries" source="country"/>
                        </el-form-item>

                    </el-col>
                    <el-col :span="8" style="width:270px">
                        <el-form-item :label="_label('shangpinchicun')">
                            <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('shangpinmiaoshu')">
                            <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('shangpinxilie')">
                            <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('xiaoshoushuxing')">
                            <simple-select v-model="form.saletypeid" source="saletype" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('shangpinshuxing')">
                            <simple-select v-model="form.producttypeid" source="producttype" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('xingbie')">
                            <simple-select v-model="form.gender" source="gender" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('jijie')">
                            <simple-select v-model="form.season" source="season2" :multiple="true"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button auth="product" type="primary" @click="onSearch" native-type="submit">{{_label("chaxun")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
    </div>
</template>

<script>
import { Productstock } from "../model.js"

export default {
    name: 'sp-productstock',
    data() {
        return {
            form: {
                wordcode: "",
                brandid: '',
                brandgroupid: "",
                childbrand: "",
                productsize: "",
                countries: "",
                brandcolor: "",
                productparst: "",
                series: "",
                ulnarinch: "",
                gender: "",
                season: "",
                ageseason: "",
                productmemoids: "", //商品描述
                saletypeid: "",
                producttypeid: ""
            },
            searchresult: []
        }
    },
    methods: {
        onSearch() {
            //查询库存商品
            let self = this

            self._fetch("/productstock/search", self.form).then(function(res) {
                self._hideDialog("search")
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
