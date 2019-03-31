<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="showFormToCreate()">{{globals.getLabel("button-create")}}</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <product ref="product"></product>
    </div>
</template>

<script>
import globals from '../globals.js'
import Multiple_Admin_Page from '../Multiple_Admin_Page.vue'
import Product from '../asa/Asa_Product.vue'

const _log = globals.logger("asapage-product");

var props = {
    columns: [
        { name: "picture", label: $ASAL.zhutu, is_image: true, image_width: 80, image_height: 80 },
        { name: "picture2", label: $ASAL.futu, is_image: true, image_width: 80, image_height: 80 },
        { name: "productname", label: $ASAL.shangpinmingcheng },
        { name: "brandgroupid", label: $ASAL.shangpinmingcheng, type: "select", source: "brandgroup" },
        { name: "brandid", label: $ASAL.shangpinmingcheng, type: "select", source: "brand" },
        { name: "countries", label: $ASAL.chandi, type: "select-dialog", source: "country" }
    ],
    controller: "product"
}

export default {
    name: 'asapage-product',
    components: {
        'multiple-admin-page': Multiple_Admin_Page,
        "product":Product
    },
    data() {
        return {            
            props: props,
        }
    },
    methods: {
        showFormToEdit(rowIndex, row) {
            this.$refs.product.setInfo(row).edit(true).show()            
        },
        showFormToCreate() {
            this.$refs.product.clearInfo().edit(true).show()
        }
    }
}
</script>
