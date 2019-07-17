<template>
    <div>
        <el-form ref="order-form" class="order-form" :model="form" :inline="true" size="mini" @submit.native.prevent>
            <el-form-item>
                <el-autocomplete ref="wordcode" v-model="form.wordcode" :placeholder="_label('guojima')" :fetch-suggestions="searchProduct" @select="onSelect" value-key="wordcode"></el-autocomplete>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.goods_code" :placeholder="_label('shangpintiaoma')" @change="searchProduct"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select ref="select" v-model="form.sizecontentid" :placeholder="_label('chima')" style="width:150">
                    <el-option v-for="item in options" :key="item.id+item.name" :value="item.id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="form.number" :placeholder="_label('shuliang')"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="margin:0px" native-type="submit" @click="onClick">{{_label('zengjia')}}</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import API from '../api.js';
import { ProductDetail } from '../model.js';
import { empty } from '../globals.js';

export default {
    name: 'sp-productstock-input',
    data() {
        return {
            form: {
                wordcode: '',
                goods_code: '',
                sizecontentid: '',
                number: '',
            },
            options: [],
            product: '',
        };
    },
    methods:{
        onClick() {
            let self = this;

            if(!self.product || !self.form.number.match(/^\d+$/) || self.form.sizecontentid=='') {
                return;
            }

            self.$emit("input", {
                product: self.product,
                number: self.form.number,
                sizecontentid: self.form.sizecontentid,
            });

            self.product = '';
            self.options = [];
            empty(self.form);

            self.$refs.wordcode.focus();
        },
        async searchProduct(keyword, callback) {
            let self = this;

            if(self.form.wordcode=='') {
                callback([]);
            }
            else {
                let result = await API.getProductList(self.form.wordcode, self.form.goods_code);
                callback(result);
            }
        },
        async onSelect(data) {
            let self = this;

            let product = await ProductDetail.load({data, depth:1});
            self.options = [];
            product.sizecontents.forEach(item=>{
                self.options.push(item);
            });

            self.product = product;
        },
    },
};
</script>
