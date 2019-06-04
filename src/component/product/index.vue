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
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" @preview="onPreview">
                    <template v-slot:belv="{row}">
                        <sp-product-bl :product="row"></sp-product-bl>
                    </template>
                    <template v-slot:lingshoubi="{row}">
                        <sp-product-lsb :product="row"></sp-product-lsb>
                    </template>
                </simple-admin-tablelist>
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
import {ProductDetail} from "../model.js"

export default {
    name: 'sp-product',
    components: {
        "product": Asa_Product,
        "productadd":Asa_Product_Add
    },
    data() {
        return {
            props: {
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
                    { name: "ageseason", label: _label("niandai"), type: "select", source: "ageseason", width:120 },

                    { name: "wordcode_1", label: _label("guojima"), width: 150, convert:function(row, rowIndex, column){
                        return [row.wordcode_1, row.wordcode_2, row.wordcode_3].join(' ')
                    }, style:"font-weight:bold" },

                    { name: "producttypeid", label: _label("shangpinshuxing"), width:120, type: "select", source:"producttype" },

                    //{ name: "factorypricecurrency_label", label: _label("chuchangjia"), width: 100 },
                    { name: "factoryprice", label: _label("chuchangjia"), width: 130,convert:function(row){
                        return [row.factorypricecurrency_label, row.factoryprice].join(" ")
                    } },

                    { name: "belv", label: _label("beilv"), width:120},

                    //{ name: "wordpricecurrency_label", label: _label("guojilingshoujia"), width: 100 },
                    { name: "wordprice", label: _label("guojilingshoujia"), width: 130, convert:function(row){
                        return [row.wordpricecurrency_label, row.wordprice].join(" ")
                    } },

                    { name: "zhekoulv", label: _label("lingshoubi"), width:120, convert:function(row){
                        return row.getZKL()
                    }},

                    { name: "nationalprice", label: _label("benguolingshoujia"), width: 130, convert:function(row){
                        return [row.nationalpricecurrency_label, row.nationalprice].join(" ")
                    } },                    
                    
                    { name: "saletypeid", label: _label("xiaoshoushuxing"), width:120, type: "select", source:"saletype" },

                    { name: "lingshoubi", label: _label("lingshoubi"), width:120},
                    { name: "laststoragedate", label: _label("zuihouruku"), width:120 }
                    
                ],
                controller: "product",
                model: ProductDetail,
                authname: "product",
                options:{
                    rowStyle:function({row, rowIndex}){
                        if(row && row.saletype && row.saletype.colortemplate){
                            return {
                                color:row.saletype.colortemplate.row.name_en
                            }
                        }
                    },
                    pagination:{
                        pageSize:15
                    }
                }
            }
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
