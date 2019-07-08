<template>
    <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
        <el-row :gutter="0">
            <el-col :span="8" style="width:270px">
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
                <el-form-item :label="_label('shangpinchicun')">
                    <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true"/>
                </el-form-item>
            </el-col>
            <el-col :span="8" style="width:270px">
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
                <as-button auth="product" type="primary" @click="$emit('search', form)" native-type="submit">{{_label("chaxun")}}</as-button>
                <as-button type="primary" @click="$emit('close')">{{_label("tuichu")}}</as-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
export default {
    name: 'sp-product-search-form',
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
            }
        }
    }
}
</script>
