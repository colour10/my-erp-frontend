<template>
    <div>
        <el-row>
            <el-col :span="2" :offset="22">
                <auth auth="product">
                    <el-button type="primary" @click="showFormToCreate()">{{globals.getLabel("button-create")}}</el-button>
                </auth>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="product">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <product ref="product" @change="onChange"></product>
    </div>
</template>

<script>
import globals,{ASAP} from '../globals.js'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'
import Product from '../asa/Asa_Product.vue'

const _log = globals.logger("asapage-product");
const _label = globals.getLabel

var props = {
    columns: [
        { name: "picture", label: _label("zhutu"), is_image: true, image_width: 80, image_height: 80, width: 100 },
        { name: "picture2", label: _label("futu"), is_image: true, image_width: 80, image_height: 80, width: 100 },
        { name: "productname", label: _label("shangpinmingcheng"), width: 300 },
        { name: "brandcolor", label: _label("yanse"), type: "select", source: "colortemplate" },
        { name: "brandgroupid", label: _label("pinlei"), type: "select", source: "brandgroup" },
        { name: "brandid", label: _label("pinpai"), type: "select", source: "brand" },
        { name: "countries", label: _label("chandi"), type: "select-dialog", source: "country" }
    ],
    controller: "product"
}

export default {
    name: 'asapage-product',
    components: {
        'simple-admin-tablelist': Simple_Admin_TableList,
        "product": Product
    },
    data() {
        return {
            props: props,
        }
    },
    beforeCreate(){
        console.log("beforeCreate", ASAP)
        ASAP.resources = {}
        ASAP.caches = {}
        console.log("Product","clear cache")
    },
    methods: {
        showFormToEdit(rowIndex, row) {
            this.$refs.product.setInfo(row).then(product => product.edit(true).show())
        },
        showFormToCreate() {
            this.$refs.product.clearInfo().edit(true).show()
        },
        onChange(rowdata, type) {
            let self = this
            let tablelist = self.$refs.tablelist

            self._log(rowdata)
            if (type == 'create') {
                tablelist.appendRow(rowdata)
            } else {
                let index = tablelist.findIndex(item => item.id == rowdata.id)
                if (index < 0) {
                    tablelist.appendRow(rowdata)
                } else {
                    tablelist.updateRow(index, rowdata)
                }
            }
        }
    }
}
</script>
