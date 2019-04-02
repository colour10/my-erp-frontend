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
        <product ref="product" @change="onChange"></product>
    </div>
</template>

<script>
import globals from '../globals.js'
import Multiple_Admin_Page from '../Multiple_Admin_Page.vue'
import Product from '../asa/Asa_Product.vue'

const _log = globals.logger("asapage-product");
const _label = globals.getLabel

var props = {
    columns: [
        { name: "picture", label: _label("zhutu"), is_image: true, image_width: 80, image_height: 80 },
        { name: "picture2", label: _label("futu"), is_image: true, image_width: 80, image_height: 80 },
        { name: "productname", label: _label("shangpinmingcheng"),width:300},
        { name: "brandgroupid", label: _label("pinlei"), type: "select", source: "brandgroup" },
        { name: "brandid", label: _label("zipinlei"), type: "select", source: "brand" },
        { name: "countries", label: _label("chandi"), type: "select-dialog", source: "country" }
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
        },
        onChange(rowdata, type) {
            let self = this
            let tablelist = self.$refs.tablelist

            self._log(rowdata)
            if(type=='create') {
                tablelist.appendRow(rowdata)
            }
            else {
                let index = tablelist.findIndex(item=>item.id==rowdata.id)
                if(index<0) {
                    tablelist.appendRow(rowdata)
                }
                else {
                    tablelist.updateRow(index, rowdata)
                }
            }
        }
    }
}
</script>
