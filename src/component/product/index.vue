<template>
    <div>
        <el-row>
            <el-col :span="2">
                <as-button type="primary" @click="_showDialog('search',{width:'600px'})">{{_label("chaxun")}}</as-button>
                
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
                    <template v-slot:productname="{row}">
                        <el-link type="primary" @click="showFormToEdit(0, row)">{{row.getName()}}</el-link>
                    </template>
                </simple-admin-tablelist>
            </el-col>
        </el-row>
        <product ref="product" @change="search"></product>
        <productadd ref="productadd" @change="search"></productadd>
        <sp-image-preview></sp-image-preview>

        <sp-dialog ref="search">
            <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
                <el-row :gutter="0">
                <el-col :span="8" style="width:270px">
                    <el-form-item :label="_label('guojima')" prop="ageseason">
                        <el-input v-model="form.wordcode" class="width2"></el-input>
                    </el-form-item>

                    <el-form-item :label="_label('niandai')" prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" :multiple="true"></simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('pinpai')" prop="brandid">
                        <simple-select v-model="form.brandid" source="brand" :multiple="true"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                        <simple-select v-model="form.brandgroupid" source="brandgroup" :multiple="true"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('zipinlei')" prop="childbrand">
                        <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :parentid="form.brandgroupid" :multiple="true"></simple-select>
                    </el-form-item>  

                    <el-form-item :label="_label('chandi')" prop="countries">
                        <simple-select v-model="form.countries" source="country"></simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('shangpinchicun')">
                        <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true"></simple-select>
                    </el-form-item>                  
                </el-col>

                <el-col :span="8" style="width:270px">
                    <el-form-item :label="_label('shangpinmiaoshu')">
                        <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('shangpinxilie')">
                        <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid" :multiple="true"> </simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('xiaoshoushuxing')">
                        <simple-select v-model="form.saletypeid" source="saletype" :multiple="true"></simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('shangpinshuxing')">
                        <simple-select v-model="form.producttypeid" source="producttype" :multiple="true"></simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('xingbie')">
                        <simple-select v-model="form.gender" source="gender" :multiple="true"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('jijie')">
                        <simple-select v-model="form.season" source="season" :multiple="true"></simple-select>
                    </el-form-item>
                </el-col>
                </el-row>

                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button auth="product" type="primary" @click="search" native-type="submit">{{_label("chaxun")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
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
            form:{
                wordcode:"",
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
                saletypeid:"",
                producttypeid:""
            },
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
        search(){
            let self = this
            self.$refs.tablelist.search(self.form)
            self._hideDialog("search")
        },
        showFormToEdit(rowIndex, row) {
            this.$refs.product.setInfo(row).then(product => product.edit(true).show())
        },
        showFormToCreate() {
            this.$refs.productadd.show()
        },
        onPreview(url) {
            ImagePreview.show({ url })
        }
    },
    mounted() {
        this._log("mounted xxx")
    }
}
</script>
