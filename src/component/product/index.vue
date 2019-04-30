<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth auth="product">
                    <as-button type="primary" @click="showFormToCreate()">{{_label("button-create")}}</as-button>
                </auth>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="product">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" @preview="onPreview"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <product ref="product" @change="onChange"></product>
        <productadd ref="productadd" @change="onChange"></productadd>
        <sp-image-preview></sp-image-preview>
    </div>
</template>

<script>
import globals, { ASAP, _label } from '../globals.js'
import Asa_Product from '../asa/Asa_Product.vue'
import Asa_Product_Add from '../asa/Asa_Product_Add.vue'
import ImagePreview from '../image-preview.js'

var props = {
    columns: [
        { name: "picture", label: _label("zhutu"), is_image: true, image_width: 50, image_height: 50, width: 60, className: 'picture' },
        { name: "picture2", label: _label("futu"), is_image: true, image_width: 50, image_height: 50, width: 60, className: 'picture' }, 
        {
            name: "productname",
            label: _label("shangpinmingcheng"),
            width: 300,
            convert: function(row, rowIndex, column) {
                return row.getName()
            }
        },
        { name: "ageseason", label: _label("niandai"), type: "select", source: "ageseason" },

        { name: "nationalpricecurrency_label", label: _label("benguolingshoujia"), width: 100 },
        { name: "nationalprice", label: _label("benguolingshoujia"), width: 100 },

        { name: "factorypricecurrency_label", label: _label("chuchangjia"), width: 100 },
        { name: "factoryprice", label: _label("chuchangjia"), width: 100 },

        { name: "wordpricecurrency_label", label: _label("guojilingshoujia"), width: 100 },
        { name: "wordprice", label: _label("guojilingshoujia"), width: 100 },
    ],
    controller: "product",
    tableModel: 'ProductDetail',
    authname: "product"
}

export default {
    name: 'asapage-product',
    components: {
        "product": Asa_Product,
        "productadd":Asa_Product_Add
    },
    data() {
        return {
            props: props,
        }
    },
    beforeCreate() {
        //console.log("beforeCreate", ASAP)
        ASAP.resources = {}
        ASAP.caches = {}
            //console.log("Product","clear cache")
    },
    methods: {
        showFormToEdit(rowIndex, row) {
            this.$refs.product.setInfo(row).then(product => product.edit(true).show())
        },
        showFormToCreate() {
            this.$refs.productadd.show()
        },
        onPreview(url) {
            ImagePreview.show({ url })
        },
        onChange(rowdata, type) {
            let self = this
            let tablelist = self.$refs.tablelist
            tablelist.loadList()
/*
            //self._log(rowdata)
            if (type == 'create') {
                tablelist.appendRow(rowdata)
            } else {
                let index = tablelist.findIndex(item => item.id == rowdata.id)
                if (index < 0) {
                    tablelist.appendRow(rowdata)
                } else {
                    tablelist.updateRow(index, rowdata)
                }
            }*/
        }
    }
}
</script>
