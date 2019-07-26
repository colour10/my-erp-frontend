<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" width="1200px" class="product" :modal="false">
        <el-tabs type="border-card" @tab-click="onTabClick" v-model="currentTab">
            <el-tab-pane :label="_label('jibenziliao')" name="product">
                <el-row>
                    <el-col :span="4">
                        <simple-avatar v-model="form.picture" :disabled="!$store.getters.allow('product')"></simple-avatar>
                    </el-col>
                    <el-col :span="4">
                        <simple-avatar v-model="form.picture2" :disabled="!$store.getters.allow('product')"></simple-avatar>
                    </el-col>
                    <el-col :span="16">
                        <el-form ref="form" :model="form" label-width="80px" size="mini">
                            <!-- <el-form-item :label="_label('shangpinmingcheng')">
                                <el-input v-model="form.productname"></el-input>
                            </el-form-item> -->
                            <el-form-item :label="_label('guojima')">
                                <el-input v-model="form.wordcode_1" style="width:110px;" :placeholder="_label('kuanshi')" @keyup.native="onKeyInput(form, 'wordcode_1')"></el-input>
                                <el-input v-model="form.wordcode_2" style="width:110px;" :placeholder="_label('caizhi')" @keyup.native="onKeyInput(form, 'wordcode_2')"></el-input>
                                <el-input v-model="form.wordcode_3" style="width:110px;" :placeholder="_label('yanse')" @keyup.native="onColorcodeChange(form, 'wordcode_3')"></el-input>
                                <el-input v-model="form.colorname" style="width:110px;" :placeholder="_label('yansemingcheng')"></el-input>
                                <el-input v-model="form.wordcode_4" style="width:110px;" :placeholder="_label('fuzhuma')"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-col :span="3" v-for="item in colors2" :key="item.colortemplateid">
                            <el-tooltip class="item" effect="dark" :content="item.colorlabel" placement="top-start">
                                <div class="color-group" @click="onClickColor(item.id)">
                                    <div class="box" :style="getColorStyle(item)">
                                    </div>
                                </div>
                            </el-tooltip>
                        </el-col>
                        <auth auth="product">
                            <el-col :span="4">
                                <div class="color-group" @click="onClickColorToEdit">
                                    <div class="box" style="width:36px;">
                                        <i class="el-icon-plus color-group-icon"></i>
                                    </div>
                                </div>
                            </el-col>
                        </auth>
                    </el-col>
                </el-row>
                <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="formRules" :inline-message="false" :show-message="false">
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item :label="_label('niandai')" prop="ageseason">
                                <simple-select v-model="form.ageseason" source="ageseason" :multiple="true" @change="loadRate"></simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('pinpai')" prop="brandid">
                                <simple-select v-model="form.brandid" source="brand" @change="onBrandChange">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                                <simple-select v-model="form.brandgroupid" source="brandgroup" @change="loadRate">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('zipinlei')" prop="childbrand">
                                <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :parentid="form.brandgroupid">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('chimazu')" prop="sizetopid">
                                <simple-select v-model="form.sizetopid" source="sizetop">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('chimamingxi')" prop="sizetopid">
                                <simple-select v-model="form.sizecontentids" ref="sizecontentids" source="sizecontent" :parentid="form.sizetopid" :multiple="true" :isBatch="true" @option-change="onOptionChange"> </simple-select><as-button class="trimhalf" @click="onTrimSize">{{_label("qubanma")}}</as-button>
                            </el-form-item>
                            <el-form-item :label="_label('sexi')" prop="brandcolor">
                                <colorselect v-model="form.brandcolor"></colorselect>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="_label('caizhi')">
                                <productmaterial v-model="materials" :brandgroupid="form.brandgroupid"></productmaterial>
                            </el-form-item>

                            <el-form-item :label="_label('chandi')" prop="countries">
                                <simple-select v-model="form.countries" source="country" :multiple="true"></simple-select>
                            </el-form-item>

                            <el-form-item :label="_label('shangpinchicun')">
                                <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true"></simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinmiaoshu')">
                                <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true"></simple-select>
                            </el-form-item>

                            <el-form-item :label="_label('cankaobeilv')">
                                <el-row>
                                    <el-col :span="8" style="width:80px">{{rate>0?rate : '-' }}</el-col>
                                    <el-col :span="16" style="width:50px">{{_label('lingshoubi')}}</el-col>
                                    <el-col :span="8" style="width:50px">{{getPriceRate}}</el-col>
                                </el-row>
                            </el-form-item>

                            <el-form-item :label="_label('chuchangjia')">
                                <el-input placeholder="" v-model="form.factoryprice" class="productcurrency">
                                    <simple-select source="currency" :clearable="false" v-model="form.wordpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getRate}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="_label('guojilingshoujia')">
                                <el-input placeholder="" v-model="form.wordprice" class="productcurrency">
                                    <simple-select source="currency" :clearable="false" v-model="form.wordpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getReciprocalRate}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="_label('benguochuchangjia')">
                                <el-input placeholder="" v-model="form.nationalfactoryprice" class="productcurrency">
                                    <simple-select source="currency" :clearable="false" v-model="form.nationalpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getRateNational}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="_label('benguolingshoujia')">
                                <el-input placeholder="" v-model="form.nationalprice" class="productcurrency">
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
                                <simple-select v-model="form.saletypeid" source="saletype" style="color:red"></simple-select>
                            </el-form-item>

                            <el-form-item :label="_label('shangpinshuxing')">
                                <simple-select v-model="form.producttypeid" source="producttype"></simple-select>
                            </el-form-item>

                            <el-form-item :label="_label('fanghanzhishu')">
                                <simple-select v-model="form.winterproofingid" source="winterproofing"></simple-select>
                            </el-form-item>

                            <el-form-item :label="_label('xingbie')">
                                <sp-radio-group v-model="form.gender" source="gender" :span="8" :lang="lang" style="width:270px">
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
                                <el-input v-model="form.memo"></el-input>
                            </el-form-item>

                            <el-form-item :label="_label('zuihouruku')">
                                <el-input v-model="form.laststoragedate"></el-input>
                            </el-form-item>

                            <el-form-item :label="_label('jiandangren')">
                                <sp-display-input :value="form.makestaff" source="user" disabled></sp-display-input>
                            </el-form-item>
                            <el-form-item :label="_label('jiandangshijian')">
                                <el-input :value="form.maketime" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="0">
                        <el-col :span="6" :offset="9">
                            <as-button auth="product" type="primary" @click="onSubmit" v-if="option.isedit">{{_label("baocun")}}</as-button>
                            <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane :label="_label('shangpinchicun')" name="property" :disabled="form.id==''">
                <property :productid="form.id" ref="property" @quit="onQuit" :option="option"></property>
            </el-tab-pane>
            <el-tab-pane :label="_label('shangpintiaoma')" name="code" :disabled="form.id==''">
                <el-table :data="sizecontents" border style="width:100%;">
                    <el-table-column prop="name" :label="_label('chima')" align="left" width="100">
                    </el-table-column>
                    <el-table-column prop="goods_code" :label="_label('shangpintiaoma')" width="350" align="left">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.goods_code" size="mini"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :offset="9" :span="6">
                    <as-button auth="product" type="primary" @click="onSaveGoodsCode" v-if="option.isedit">{{_label("baocun")}}</as-button>
                    <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-tab-pane>
            <el-tab-pane :label="_label('tongkuanduose')" name="colorgroup" :disabled="form.id==''">
                <auth auth="product">
                    <searchpanel ref="searchpanel" @select="onSelectProduct" :filter="searchProductFilter" :isCreate="false"></searchpanel>
                </auth>

                <el-table :data="colors" border style="width:100%;">
                    <el-table-column width="80" align="center">
                        <template v-slot="scope">
                            <simple-avatar v-model="scope.row.picture" font-size="14px" :size="35"></simple-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" align="center">
                        <template v-slot="scope">
                            <simple-avatar v-model="scope.row.picture2" font-size="14px" :size="35"></simple-avatar>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('kuanshi')" width="140" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.wordcode_1" size="mini" @keyup.native="onKeyInput(scope.row, 'wordcode_1')"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caizhi')" width="140" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.wordcode_2" size="mini" @keyup.native="onKeyInput(scope.row, 'wordcode_2')"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('yanse')" width="140" align="center">
                        <template v-slot="scope">
                            <!--<el-input v-model="scope.row.wordcode_3" size="mini" @keyup.native.down="onKeyDown(scope.$index)" @keyup.native.up="onKeyUp(scope.$index)" :ref="'word'+scope.$index"></el-input>-->
                            <el-input v-model="scope.row.wordcode_3" size="mini" @keyup.native="onColorcodeChange(scope.row, 'wordcode_3')"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('yansemingcheng')" width="150" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.colorname" size="mini"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="brandcolor" :label="_label('sexi')" width="140" align="center">
                        <template v-slot="scope">
                            <colorselect v-model="scope.row.brandcolor"></colorselect>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('fuzhuma')" width="120" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.wordcode_4" size="mini"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('caozuo')" width="130" align="center">
                        <template v-slot="scope">
                            <as-button type="danger" @click="onDeleteColorGroup(scope, scope.row)" v-if="option.isedit && form.id!=scope.row.id">{{_label("shanchu")}}</as-button>
                            <!-- <au-button auth="product" type="primary" @click="onAppendColor"v-if="!(option.isedit && form.id!=scope.row.id)">{{_label("zhuijia")}}</au-button> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :offset="8" :span="8" style="padding-top:5px">
                    <au-button auth="product" type="primary" @click="onSaveColorGroup" v-if="option.isedit">{{_label("baocun")}}</au-button>
                    <au-button auth="product" type="primary" @click="onAppendColor" v-if="option.isedit">{{_label("zhuijia")}}</au-button>
                    <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-tab-pane>
            <el-tab-pane :label="_label('shangpintupian')" name="album" :disabled="form.id==''">
                <sp-album :productid="form.id" ref="album" @quit="onQuit"></sp-album>
            </el-tab-pane>
            <el-tab-pane :label="_label('jiage')" name="pricetab" :disabled="form.id==''">
                <pricetab :productid="form.id" ref="pricetab" @quit="onQuit" :option="option"></pricetab>
            </el-tab-pane>
            <el-tab-pane :label="_label('kucun')" name="productstock" :disabled="form.id==''">
                <productstock :productid="form.id" ref="productstock" @quit="onQuit" :option="option"></productstock>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import globals, { extract, _label, math } from '../globals.js';
import { ProductCodeList, ProductDetail,ModelBus } from "../model.js";
import { initObject } from "../array.js";
import { extend } from "../object.js";
import List from '../list.js';
import DataSource from '../DataSource.js';
import Asa_Product_Search_Panel from './Asa_Product_Search_Panel.vue';
import Asa_Product_Property from './Asa_Product_Property.vue';
import Asa_Product_Price from './Asa_Product_Price.vue';
import Asa_Product_ProductStock from './Asa_Product_ProductStock.vue';
import Material from '../product/material.vue';
import API from "../api.js";
import _Product from "./product.js";
import productMixin from "../mixins/product.js";


const color_keys = ['id', 'brandcolor', 'wordcode_1', 'wordcode_2', 'wordcode_3', 'wordcode_4', 'colorname', 'picture', 'picture2']

export default {
    name: 'asa-product',
    mixins:[productMixin],
    components: {
        searchpanel: Asa_Product_Search_Panel,
        property: Asa_Product_Property,
        pricetab: Asa_Product_Price,
        productstock: Asa_Product_ProductStock,
        productmaterial: Material
    },
    data() {
        let self = this

        return {
            dialogVisible: false,
            lang: _label("lang"),
            search: {
                is_show: false
            },
            form: {
                id: '',
                productname: "",
                brandid: '',
                brandgroupid: "",
                childbrand: "",
                productsize: "",
                countries: "",
                brandcolor: "",
                productparst: "",
                picture: "",
                picture2: "",
                laststoragedate: "",
                series: "",
                ulnarinch: "",
                factoryprice: "",
                factorypricecurrency: "",
                wordprice: "",
                wordpricecurrency: "",
                nationalpricecurrency: "",
                nationalprice: "",
                nationalfactorypricecurrency: "",
                nationalfactoryprice: "",
                memo: "",
                wordprice: "",
                wordpricecurrency: "",
                gender: "",
                spring: "",
                summer: "",
                fall: "",
                winter: "",
                ageseason: "",
                sizetopid: "",
                sizecontentids: "",
                productmemoids: "", //商品描述
                wordcode_1: "",
                wordcode_2: "",
                wordcode_3: "",
                wordcode_4: "",
                colorname:"",
                makestaff: "",
                maketime: '',
                saletypeid:"",
                producttypeid:"",
                winterproofingid:""
            },
            materials: [],
            sizecontents: [],
            sizecontents_loaded: false,
            colors: [],
            colors_loaded: false,
            colors2: [], //仅仅用来显示多色
            datetime: _label("_date"),
            adduser: _label("_currentUsername"),
            option: {
                isedit: false
            },
            currentTab: "product",
            rate: "", //参考倍率
            exchange:{
                currency_to:"",
                currency_from:"",
                rate:""
            }, //当前的汇率信息；零售比=本国零售价/国际零售价
            siji: "", //控制四季全选
            title:"",
            product:""
        }
    },
    methods: {
        onBrandChange(){
            this.loadRate();
            this.getBrandColorSuggest();
        },
        onColorcodeChange(row, columnName){
            this.onKeyInput(row, columnName);
            console.log(row, columnName)
            //自动匹配色系和颜色
            if(columnName=='wordcode_3') {
                this.autoMatchSuggest(row)
            }
        },
        validatorGJM(){
            let self = this;
            let form = this.form
            return new Promise((resolve,reject)=>{
                if(form.wordcode_1=="" && form.wordcode_2=='' && form.wordcode_3=='') {
                    reject({message:self._label("8000"), label:self._label("guojima")})
                }
                else {
                    resolve()
                }
            })
        },
        onAddSeries(){
            _Product(this).addSeries();
        },
        onQuit() {
            this.dialogVisible = false
        },
        onKeyInput(target, columnName){
            target[columnName] = target[columnName].toUpperCase();


        },
        onOptionChange(options) {
            let self = this
            if(options.length==1) {
                self.form.sizecontentids = options[0].id
            }
        },
        getColorStyle(item) {
            return {
                width: '36px',
                height: '36px',
                background: 'url("' + this._fileLink(item.picture) + '") no-repeat center'
            }

        },
        searchProductFilter(product) {
            return product.product_group=='' && this.colors.findIndex(item => item.id == product.id) < 0
        },
        onSubmit() {
            var self = this;

            self.validate(self.validatorGJM).then(function() {
                let params = {
                    form: self.form,
                    materials: self.materials
                }
                if (self.form.id == "") {
                    self._submit("/product/add", { params: JSON.stringify(params) }).then(function(res) {
                        self.$emit("change", Object.assign({}, self.form), "create")
                        self.setInfo(res.id)
                    })
                } else {
                    self._submit("/product/edit", { params: JSON.stringify(params) }).then(function() {
                        self.$emit("change", Object.assign({}, self.form), "update")
                        ModelBus.emit("product-change", self.form.id)
                        self.setInfo(self.form.id)
                    })
                }
            })
        },
        onTrimSize() {
            let self = this
            let source = DataSource.getDataSource("sizecontent", self._label("lang"))
            source.getRows(self.form.sizecontentids).then(results=>{
                self.form.sizecontentids = results.filter(item=>item.name.indexOf('.')<0).map(item=>item.id).join(',')
            })
        },
        onSelectProduct(info) {
            let self = this
            if (self.colors.findIndex(item => item.id == info.id) >= 0) {
                self._info("is exist.")
            } else {
                self.colors.push(extract(info, color_keys))
            }
        },
        onSaveGoodsCode() {
            let self = this

            let params = { productid: self.form.id }
            params.list = self.sizecontents.map(function(item) {
                return { sizecontentid: item.id, goods_code: item.goods_code }
            })

            self._submit("/product/savecode", { params: JSON.stringify(params) }).then(() => {});
        },
        onSaveColorGroup() {
            //保存同款多色数据
            let self = this;
            let params = { productid: self.form.id }
            params.list = self.colors.map(item => extract(item, color_keys))

            for(let i=0;i<params.list.length;i++) {
                let row = params.list[i];
                if(row.wordcode_1=='' && row.wordcode_2=='' && row.wordcode_3=='') {
                    return self._showErorMessage({message:self._label("8000"), label:self._label("guojima")})
                }

                if(row.brandcolor=="") {
                    return self._showErorMessage({message:self._label("8000"), label:self._label("sexi")})
                }
            }

            self._submit("/product/savecolorgroup", { params: JSON.stringify(params) }).then(function(res) {
                self.setInfo(self.form.id).then(()=>{
                    res.data.list.forEach(function(item) {
                        self.colors.push(extract(item, color_keys))
                        //self._log(item)
                    })
                    self.colors_loaded = true

                    self.$emit("change", Object.assign({}, self.form), "update")
                    self.currentTab = "colorgroup"
                })
            });
        },
        onAppendColor() {
            let self = this
            self.colors.push({
                picture: "",
                picture2: "",
                colorname: "",
                brandcolor: "",
                wordcode_1: self.form.wordcode_1,
                wordcode_2: self.form.wordcode_2,
                wordcode_3: "",
                wordcode_4: "",
                id: ""
            })
        },
        onDeleteColorGroup({ $index, row }, rowIndex) {
            let self = this
            self.$delete(self.colors, $index)
        },
        countHeaderStyle({ row, column, rowIndex, columnIndex }) {
            if (rowIndex == 1) {
                return { display: 'none' }
            }
        },
        onTabClick(tab) {
            const self = this
            if (tab.name == 'code' && self.sizecontents_loaded == false) {
                let ntlist = new List(self.sizecontents)
                new ProductCodeList(self.form.id, function(data) {
                    //console.log(data)
                    data.forEach(function(item) {
                        let index = ntlist.findIndex('id', item.sizecontentid)
                        if (index >= 0) {
                            self.sizecontents[index].goods_code = item.goods_code
                        }
                    })
                })
                self.sizecontents_loaded = true;
            } else if (tab.name == 'colorgroup' && self.colors_loaded == false) {
                self.loadColorGroupList();
            } else if (tab.name == 'album') {
                setTimeout(function() {
                    self.$refs.album.loadList()
                }, 100)
            } else if (tab.name == 'property') {
                setTimeout(function() {
                    self.$refs.property.load()
                }, 50)
            } else if (tab.name == 'pricetab') {
                setTimeout(function() {
                    self.$refs.pricetab.load()
                }, 50)
            } else if (tab.name == 'productstock') {
                setTimeout(function() {
                    self.$refs.productstock.load()
                }, 50)
            }
        },
        loadColorGroupList() {
            let self = this;
            if (self.colors_loaded == true) {
                return;
            }
            self._fetch("/product/getcolorgrouplist", { id: self.form.id }).then(function(res) {
                //console.log(res)
                res.data.forEach(function(item) {
                    self.colors.push(extract(item, color_keys))
                        ///self._log(item)
                })
                self.colors_loaded = true;
            })
        },
        onClickColorToEdit() {
            let self = this
            self.currentTab = "colorgroup"
            self.loadColorGroupList();
        },
        onClickColor(productid) {
            var self = this
            self.setInfo(productid)
        },
        setInfo(row) {
            var self = this
            self.colors_loaded = false;
            self.colors = []

            return new Promise((resolve, reject) => {
                ProductDetail.load({ data: row, depth: 1, isCache: false }).then(function(info) {
                    //self._log(info)
                        //设置默认值
                    info = globals.extend({ sizecontentids: "" }, info);
                    //console.log(info,'----------')

                    self.colors2 = info.colors
                    self.sizecontents = info.sizecontents.map(item => {
                        return globals.extend({ goods_code: "" }, item)
                    })
                    self.sizecontents_loaded = false;
                    //self._log(self.sizecontents)

                    globals.copyTo(info, self.form)
                    self.form.factoryprice = math.round(self.form.factoryprice, 2)
                    self.form.wordprice = math.round(self.form.wordprice, 2)
                    self.form.nationalprice = math.round(self.form.nationalprice, 2)
                    self.form.nationalfactoryprice = math.round(self.form.nationalfactoryprice, 2)

                    //
                    info.getMaterialList().then((res) => {
                        //self._log("==", res)
                        self.materials = res.data || []
                    })
                    setTimeout(function() {
                        if (self.$refs.searchpanel) {
                            self.$refs.searchpanel.clear()
                        }
                        self.$refs.property.setProduct(info)
                    }, 100)

                    self.clearValidate(50)

                    self.loadRate();
                    self.loadExchangeRate();
                    self.getBrandColorSuggest();
                    self._log("开始自动执行")


                    self.currentTab = 'product'
                    self.title = info.getName() + ' ' +info.getGoodsCode()

                    self.product = info
                    resolve(self)
                })
            })
        },
        edit(isedit) {
            this.option.isedit = isedit
            return this;
        },
        show() {
            var self = this;
            self.dialogVisible = true;
        },
        clearInfo() {
            var self = this;
            globals.empty(self.form)

            self.currentTab = "product"
            self.sizecontents_loaded = false;
            self.sizecontents = []
            self.colors2 = []

            self.clearValidate(50)
            return self
        },
        loadRate() {
            let self = this;

            API.getBrandRate(extract(self.form, ['brandid', 'ageseason', 'brandgroupid'])).then(rate=>{
                self.rate = rate;
            })
        },
        loadExchangeRate() {
            //加载汇率信息
            let self = this;

            globals.empty(self.exchange)
            self._log("加载汇率信息", self.form.wordpricecurrency, self.form.nationalpricecurrency)

            API.getExchange(self.form.wordpricecurrency, self.form.nationalpricecurrency).then(result=>{
                self._log("exchange=",result)
                if(result>0) {
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
        },
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
    mounted(){
        let self = this;
        self.initRules(Rules=>{
            let _label = self._label
            return {
                sizetopid: Rules.id({ required: true, message: _label("8000"), label:_label("chimazu") }),
                brandgroupid: Rules.id({ required: true, message: _label("8000"), label:_label("pinlei") }),
                childbrand: Rules.id({ required: true, message: _label("8000"), label:_label("zipinlei") }),
                brandid: Rules.id({ required: true, message: _label("8000"), label:_label("pinpai") }),
                brandcolor: Rules.required({ message: _label("8000"), label:_label("sexi") }),
                ageseason: Rules.required({ message: _label("8000"), label:_label("niandai") }),
                sizecontentids: Rules.required({ message: _label("8000"), label:_label("chimamingxi") })
            }
        })
    }
}
</script>
