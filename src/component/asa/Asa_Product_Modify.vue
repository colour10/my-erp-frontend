<template>
    <el-dialog :title="_label('piliangxiugai')" :visible.sync="dialogVisible" :center="true" width="1200px" :modal="true">
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;margin-top:5px;" :rules="formRules" size="mini" :inline-message="false" :show-message="false">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item :label="_label('niandai')" prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" :multiple="true" @change="loadRate"/>
                    </el-form-item>
                    <el-form-item :label="_label('pinpai')" prop="brandid">
                        <simple-select v-model="form.brandid" source="brand" @change="onBrandChange"/>
                    </el-form-item>
                    <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                        <simple-select v-model="form.brandgroupid" source="brandgroup" @change="loadRate"/>
                    </el-form-item>
                    <el-form-item :label="_label('zipinlei')" prop="childbrand">
                        <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :parentid="form.brandgroupid"/>
                    </el-form-item>
                    <el-form-item :label="_label('chimazu')" prop="sizetopid">
                        <simple-select v-model="form.sizetopid" source="sizetop"/>
                    </el-form-item>
                    <el-form-item :label="_label('chimamingxi')" prop="sizecontentids">
                        <simple-select v-model="form.sizecontentids" source="sizecontent" :parentid="form.sizetopid" :multiple="true" :isBatch="true" @option-change="onOptionChange"> </simple-select><as-button @click="onTrimSize" class="trimhalf">{{_label("qubanma")}}</as-button>
                    </el-form-item>

                </el-col>
                <el-col :span="8">
                    <el-form-item :label="_label('caizhi')">
                        <product-material v-model="materials" :brandgroupid="form.brandgroupid"></product-material>
                    </el-form-item>

                    <el-form-item :label="_label('chandi')" prop="countries">
                        <simple-select v-model="form.countries" source="country"/>
                    </el-form-item>

                    <el-form-item :label="_label('shangpinchicun')">
                        <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true"/>
                    </el-form-item>

                    <el-form-item :label="_label('shangpinmiaoshu')">
                        <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true"/>
                    </el-form-item>

                    <el-form-item :label="_label('cankaobeilv')">
                        <el-row>
                            <el-col :span="8" style="width:80px">{{rate>0?rate : '-' }}</el-col>
                            <el-col :span="16" style="width:50px">{{_label('lingshoubi')}}</el-col>
                            <el-col :span="8" style="width:50px">{{getPriceRate}}</el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item :label="_label('chuchangjia')">
                        <el-input placeholder="" v-model="form.factoryprice" class="productcurrency" ref="factoryprice" @focus="onPriceFocus('factoryprice');watcherprice.start()" @blur="watcherprice.stop()">
                            <simple-select source="currency" :clearable="false" v-model="form.wordpricecurrency" slot="prepend">
                            </simple-select>
                            <span slot="append">{{getRate}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('guojilingshoujia')">
                        <el-input placeholder="" v-model="form.wordprice" class="productcurrency" ref="wordprice" @focus="onPriceFocus('wordprice')">
                            <simple-select source="currency" :clearable="false" v-model="form.wordpricecurrency" slot="prepend">
                            </simple-select>
                            <span slot="append">{{getReciprocalRate}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('benguochuchangjia')">
                        <el-input placeholder="" v-model="form.nationalfactoryprice" class="productcurrency" ref="nationalfactoryprice" @focus="onPriceFocus('nationalfactoryprice')">
                            <simple-select source="currency" :clearable="false" v-model="form.nationalpricecurrency" slot="prepend">
                            </simple-select>
                            <span slot="append">{{getRateNational}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('benguolingshoujia')">
                        <el-input placeholder="" v-model="form.nationalprice" class="productcurrency" ref="nationalprice" @focus="onPriceFocus('nationalprice')">
                            <simple-select source="currency" :clearable="false" v-model="form.nationalpricecurrency" slot="prepend">
                            </simple-select>
                            <span slot="append">{{getReciprocalRateNational}}</span>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="_label('shangpinxilie')">
                        <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid"> </simple-select><as-button class="trimhalf" @click="onAddSeries">{{_label("xinjian")}}</as-button>
                    </el-form-item>

                    <el-form-item :label="_label('xiaoshoushuxing')">
                        <simple-select v-model="form.saletypeid" source="saletype"/>
                    </el-form-item>

                    <el-form-item :label="_label('shangpinshuxing')">
                        <simple-select v-model="form.producttypeid" source="producttype"/>
                    </el-form-item>

                    <el-form-item :label="_label('fanghanzhishu')">
                        <simple-select v-model="form.winterproofingid" source="winterproofing"></simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('xingbie')">
                        <sp-radio-group v-model="form.gender" source="gender" :span="8" :lang="_label('lang')" class="supermini" style="width:270px">
                        </sp-radio-group>
                    </el-form-item>
                    <el-form-item :label="_label('jijie')">
                        <div  style="width:270px">
                        <el-col :span="8">
                            <sp-checkbox v-model="form.spring">{{_label("chun")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="form.summer">{{_label("xia")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="siji">{{_label("siji")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="form.fall">{{_label("qiu")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="form.winter">{{_label("dong")}}</sp-checkbox>
                        </el-col>
                    </div>
                    </el-form-item>

                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="24" style="text-align:center;">
                    <as-button auth="product" type="primary" @click="onSubmit">{{_label("baocun")}}</as-button>
                    <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-row>
        </el-form>

        <sp-dialog ref="selet-product" width="600">
            <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
                <el-row :gutter="0">
                    <el-col :span="8" style="width:270px">
                        <el-form-item :label="_label('dingdanhao')">
                            <el-input v-model="form.orderno" class="width2"/>
                        </el-form-item>
                        <el-form-item :label="_label('gonghuoshang')">
                            <simple-select v-model="form.supplierid" source="supplier_3" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('niandai')">
                            <simple-select v-model="form.ageseason" source="ageseason" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('daohuocangku')">
                            <simple-select v-model="form.warehouseid" source="warehouse" :multiple="true"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button type="primary" @click="onSearch(form)" native-type="submit">{{_label("zengjia")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('selet-product')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
    </el-dialog>
</template>

<script>
import { extract, _label, math,empty } from '../globals.js'
import { initObject } from "../array.js"
import { extend } from "../object.js"
import watcher from "../watch.js"
import Material from '../product/material.vue'
import API from "../api.js"
import productMixin from "../mixins/product.js"
import _Product from "./product.js"
import { roundFormat } from "../math.js"

export default {
    name: 'asa-product-modify',
    components: {
        [Material.name]: Material
    },
    mixins:[productMixin],
    data() {
        let self = this;

        return {
            products: [],
            dialogVisible: false,
            form: {
                brandid: '',
                brandgroupid: "",
                childbrand: "",
                countries: "",
                material: "",
                laststoragedate: "",
                series: "",
                ulnarinch: "",
                factoryprice: "",
                factorypricecurrency: '',
                nationalpricecurrency: '',
                nationalprice: "",
                nationalfactorypricecurrency: "",
                nationalfactoryprice: "",
                memo: "",
                wordprice: "",
                wordpricecurrency: '',
                gender: "",
                spring: "",
                summer: "",
                fall: "",
                winter: "",
                ageseason: "",
                sizetopid: "",
                sizecontentids: "",
                saletypeid:"",
                producttypeid:"",
                winterproofingid:"",
                productmemoids: "" //商品描述
            },
            materials: [],
            rate: "", //参考倍率
            exchange:{
                currency_to:"",
                currency_from:"",
                rate:""
            }, //当前的汇率信息；零售比=本国零售价/国际零售价
            siji: "", //控制四季全选
        };
    },
    methods: {
        onPriceFocus(name){
            this.$refs[name].select()
        },
        onAddSeries(){
            _Product(this).addSeries();
        },
        onBrandChange(){
            this.loadRate();
            this.getBrandColorSuggest();
        },
        onQuit() {
            this.dialogVisible = false
        },
        onOptionChange(options) {
            let self = this;
            if(options.length==1) {
                self.form.sizecontentids = options[0].id;
            }
        },
        onPriceChange(newvalue, oldvalue) {
            let self = this;

            if(self.rate=='') {
                return;
            }

            let oldprice = roundFormat(oldvalue*self.rate)
            if (self.form.wordprice == '' || self.form.wordprice == oldprice) {
                self.form.wordprice = roundFormat(newvalue*self.rate);
            }
        },
        onTrimSize() {
            let self = this;
            let source = self._dataSource("sizecontent");
            source.getRows(self.form.sizecontentids).then(results=>{
                self.form.sizecontentids = results.filter(item=>item.name.indexOf('.')<0).map(item=>item.id).join(',')
            })
        },
        onSubmit() {
            let self = this;

            self.validate().then(() => {
                let params = {};
                params.form = extend({}, self.form)
                params.materials = self.materials
                params.products = self.products;

                console.log(JSON.stringify(params))
                self._submit("/product/modify", { params: JSON.stringify(params) }).then(function(res) {
                    //self.$emit("change", Object.assign({}, self.form), "create")
                    //self._log(res)
                    self.$emit("change", res.data)
                });
            })
        },
        setForm(info){
            let self = this
            extend(self.form, info)
            self._log(self.form, info)
            return self
        },
        show(products) {
            let self = this;
            self.products = products;

            for(let key of Object.keys(self.form)) {
                self.form[key] = '';
            }

            for(let key of Object.keys(self.exchange)) {
                self.exchange[key] = '';
            }

            self.materials = [];
            self.siji = '';
            self.rate = '';
            self.dialogVisible = true;
        },
        hide(){
            this.dialogVisible = false;
        },
        loadRate() {
            let self = this;

            if(self.form.brandid=='' || self.form.ageseason=='' || self.form.brandgroupid=='') {
                return
            }

            self._fetch("/brandrate/getrate", extract(self.form, ['brandid', 'ageseason', 'brandgroupid'])).then(res=>{
                self.rate = res.data;
            })
        },
        loadExchangeRate() {
            //加载汇率信息
            let self = this;

            empty(self.exchange)
            API.getExchange(self.form.wordpricecurrency, self.form.nationalpricecurrency).then(result=>{
                if(result>0) {
                    self._log("exchange=",result)
                    extend(self.exchange, {
                        currency_from:self.form.wordpricecurrency,
                        currency_to:self.form.nationalpricecurrency,
                        rate:result
                    });
                }
            })
        }
    },
    watch: {
        siji: function(newValue) {
            let self = this
            extend(self.form, initObject(['spring', 'summer', 'fall', 'winter'], newValue))
        },
        'form.wordpricecurrency':function(){
            //this._log("wordpricecurrency change")
            this.loadExchangeRate()
        },
        'form.nationalpricecurrency':function(){
            //this._log("wordpricecurrency change")
            this.loadExchangeRate()
        }
    },
    computed: {
        getPriceRate(){
            let form = this.form
            //this._log(form.wordprice, form.nationalprice, this.exchange, this.exchange.rate)
            return form.wordprice > 0 && form.nationalprice > 0 && this.exchange && this.exchange.rate ? math.round(form.nationalprice/this.exchange.rate / form.wordprice, 2) : "";
        },
        getRate() {
           let form = this.form
            return form.wordprice > 0 && form.factoryprice > 0 ? math.round(form.wordprice / form.factoryprice, 2) : "";
        },
        getReciprocalRate() {
            let form = this.form
            return form.wordprice > 0 && form.factoryprice > 0 ? math.round(form.factoryprice / form.wordprice, 2) : "";
        },
        getRateNational() {
            let form = this.form
            return form.nationalprice > 0 && form.nationalfactoryprice > 0 ? math.round(form.nationalprice / form.nationalfactoryprice, 2) : "";
        },
        getReciprocalRateNational() {
            let form = this.form
            return form.nationalprice > 0 && form.nationalfactoryprice > 0 ? math.round(form.nationalfactoryprice / form.nationalprice, 2) : "";
        }
    },
    mounted: function() {
        let self = this;

        self.watcherprice = watcher(self.form, "factoryprice", self.onPriceChange)
    }
};
</script>
