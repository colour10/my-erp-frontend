<template>
    <div>
        <el-row>
            <el-col :span="10">
                <as-button type="primary" @click="_showDialog('search',{width:600})">{{_label("chaxun")}}</as-button>

                <asa-button type="primary" @click="showFormToCreate()" :enable="_isAllowed('product')">{{_label("button-create")}}</asa-button>
                <asa-button type="primary" @click="showFormToModifyPrice()" :enable="_isAllowed('product') && selected.length>0">{{_label("xiugaijiage")}}</asa-button>
                <asa-button type="primary" @click="showFormToModify()" :enable="_isAllowed('product') && selected.length>0">{{_label("piliangxiugai")}}</asa-button>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="product">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" @preview="onPreview" :is-select="true" @selection-change="onSelectionChange" @after-delete="onDelete">
                    <template v-slot:wordcode_2="{row}">
                        <div class="color-group" v-for="item in row.colors" :key="item.id">
                            <div class="box" :style="getColorStyle(item)" @click.stop="showFormToEdit('click', item.id)"></div>
                        </div>
                    </template>
                    <template v-slot:belv="{row}">
                        <sp-product-bl :product="row"></sp-product-bl>
                    </template>
                    <template v-slot:lingshoubi="{row}">
                        <sp-product-lsb :product="row"></sp-product-lsb>
                    </template>
                    <template v-slot:productname="{row}">
                        <el-link type="primary" @click.stop="showFormToEdit(row)">{{row.getName()}}</el-link>
                    </template>
                    <template v-slot:series="{row}">
                        <sp-select-text :value="row.series" source="series" />
                    </template>
                </simple-admin-tablelist>
            </el-col>
        </el-row>
        <asa-product ref="product" @change="search"></asa-product>
        <asa-product-add ref="productadd" @change="search" @editExistProduct="showFormToEdit(arguments)"></asa-product-add>
        <sp-dialog ref="search">
            <sp-product-search-form @search="onSearch" @close="_hideDialog('search')"></sp-product-search-form>
        </sp-dialog>

        <asa-product-modify-price ref="modifyprice"></asa-product-modify-price>
        <asa-product-modify ref="modify" @change="search"></asa-product-modify>
    </div>
</template>

<script>
import globals, { ASAP, _label } from '../globals.js'
import Asa_Product from '../asa/Asa_Product.vue'
import Asa_Product_Add from '../asa/Asa_Product_Add.vue'
import ImagePreview from '../image-preview.js'
import {ProductDetail} from "../model.js"
import Asa_Product_Modify_Price from '../asa/Asa_Product_Modify_Price.vue';
import Asa_Product_Modify from '../asa/Asa_Product_Modify.vue'

export default {
    name: 'sp-product',
    components: {
        [Asa_Product.name]: Asa_Product,
        [Asa_Product_Add.name]: Asa_Product_Add,
        [Asa_Product_Modify_Price.name]: Asa_Product_Modify_Price,
        [Asa_Product_Modify.name]: Asa_Product_Modify
    },
    data() {
        const self = this

        return {
            selected: [],
            form:{},
            props: {
                columns: [
                    { name: "picture", label: _label("zhutu"), is_image: true, image_width: 50, image_height: 50, width: 60, className: 'picture' },
                    { name: "picture2", label: _label("futu"), is_image: true, image_width: 50, image_height: 50, width: 60, className: 'picture' },
                    { name: "wordcode_2", label: _label("futu"), className: 'nopadding', width: self.colorsWidth },
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

                    { name: "belv", label: _label("beilv"), width:120, sortMethod: self.sortMethodBL},

                    //{ name: "wordpricecurrency_label", label: _label("guojilingshoujia"), width: 100 },
                    { name: "wordprice", label: _label("guojilingshoujia"), width: 130, convert:function(row){
                        return [row.wordpricecurrency_label, row.wordprice].join(" ")
                    } },

                    { name: "zhekoulv", label: _label("zhekoulv"), width:120, sortMethod: self.sortMethodZKL, convert:function(row){
                        return row.getZKL()
                    }},

                    { name: "nationalprice", label: _label("benguolingshoujia"), width: 130, convert:function(row){
                        return [row.nationalpricecurrency_label, row.nationalprice].join(" ")
                    } },

                    { name: "saletypeid", label: _label("xiaoshoushuxing"), width:120, type: "select", source:"saletype" },

                    { name: "lingshoubi", label: _label("lingshoubi"), width:120, sortMethod: self.sortMethodLSB },
                    { name: "series", label: _label("xilie"), width:120},
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
        ASAP.resources = {}
        ASAP.caches = {}
    },
    methods: {
        sortMethodBL(a, b) {
            return a.getBL()>=b.getBL() ? 1 : -1
        },
        sortMethodLSB(a, b) {

            return a.LSB-b.LSB>0 ? 1 : -1;
        },
        sortMethodZKL(a, b) {
            return a.getZKL()>=b.getZKL() ? 1 : -1
        },
        getColorStyle(item, row) {
            return {
                width: '20px',
                height: '20px',
                background: 'url("' + this._fileLink(item.picture) + '") no-repeat center',
            };
        },
        onSearch(form) {
            this.form = form;
            this.search();
        },
        search() {
            let self = this;
            self.$refs.tablelist.search(self.form);
            self._hideDialog("search");
        },
        showFormToEdit(row) {
            this.$refs.product.setInfo(row).then(product => product.edit(true).show());
        },
        showFormToCreate() {
            this.$refs.productadd.show();
        },
        onPreview(url) {
            ImagePreview.show({ url });
        },
        showFormToModifyPrice() {
            const self = this;
            let rows = self.$refs.tablelist.getSelectRows();
            console.log(rows);
            let products = rows.map(item=>item.id);
            self.$refs.modifyprice.show(products);
        },
        showFormToModify() {
            const self = this
            let rows = self.$refs.tablelist.getSelectRows()
            console.log(rows)
            let products = rows.map(item=>item.id)
            self.$refs.modify.show(products)
        },
        onSelectionChange(vals) {
            this.selected = vals
        },

        onDelete() {
            this.search()
        },
    },
};
</script>
