<template>
    <el-dialog :title="_label('chanpinguanli')" :visible.sync="dialogVisible" :center="true" width="1200px">
        <el-row class="product">
            <el-col :span="20">
                <el-table :data="colors" border style="width:100%;" :header-cell-style="countHeaderStyle">
                    <el-table-column width="60" align="center">
                        <template v-slot="scope">
                            <simple-avatar v-model="scope.row.picture" font-size="14px" :size="35"></simple-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column width="60" align="center">
                        <template v-slot="scope">
                            <simple-avatar v-model="scope.row.picture2" font-size="14px" :size="35"></simple-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column prop="brandcolor" :label="_label('sexi')" width="130" align="center">
                        <template v-slot="scope">
                            <colorselect v-model="scope.row.brandcolor" :disabled="scope.row.id>0"></colorselect>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="center">
                        <el-table-column prop="goods_code" width="110" align="center">
                            <template v-slot="scope">
                                <el-input v-model="scope.row.wordcode_1" size="mini" @focus="onFocus(1)" @blur="onBlur(1)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_code" width="110" align="center">
                            <template v-slot="scope">
                                <el-input v-model="scope.row.wordcode_2" size="mini" @focus="onFocus(2)" @blur="onBlur(2)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_code" width="110" align="center">
                            <template v-slot="scope">
                                <!--<el-input v-model="scope.row.wordcode_3" size="mini" @keyup.native.down="onKeyDown(scope.$index)" @keyup.native.up="onKeyUp(scope.$index)" :ref="'word'+scope.$index"></el-input>-->
                                <el-input v-model="scope.row.wordcode_3" size="mini"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_code" width="110" align="center">
                            <template v-slot="scope">
                                <el-input v-model="scope.row.wordcode_4" size="mini"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="goods_code" :label="_label('yansemingcheng')" width="150" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.colorname" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_code" :label="_label('caozuo')" width="125" align="center">
                        <template v-slot="scope">
                            <as-button type="danger" @click="onDeleteColorGroup(scope, scope.row)" v-if="scope.$index>0">{{_label("shanchu")}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!--<div class="el-time-panel el-popper" style="width:900px;height:500px;">sdsd</div>-->
            </el-col>
            <el-col :span="4">
                <au-button auth="product" type="primary" @click="onAppendColor">{{_label("zhuijia")}}</au-button>
            </el-col>
        </el-row>
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;margin-top:5px;" size="mini" :rules="rules" :inline-message="true">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item :label="_label('niandai')" prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" :multiple="true" @change="loadRate"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinpai')" prop="brandid">
                        <simple-select v-model="form.brandid" source="brand" @change="loadRate"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                        <simple-select v-model="form.brandgroupid" source="brandgroup" @change="loadRate"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('zipinlei')" prop="childbrand">
                        <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :parentid="form.brandgroupid"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('chimazu')" prop="sizetopid">
                        <simple-select v-model="form.sizetopid" source="sizetop"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('chimamingxi')" prop="sizecontentids">
                        <simple-select v-model="form.sizecontentids" source="sizecontent" :parentid="form.sizetopid" :multiple="true"> </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('caizhi')">
                        <productmaterial v-model="materials"></productmaterial>
                    </el-form-item>
                    <el-form-item :label="_label('shangpinchicun')">
                        <simple-select v-model="form.ulnarinch" source="ulnarinch"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="_label('shangpinmiaoshu')">
                        <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('shangpinxilie')">
                        <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid"> </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('chuchangjia')">
                        <el-input placeholder="" v-model="form.factoryprice" class="productcurrency" @focus="watcherprice.start()" @blur="watcherprice.stop()">
                            <select-currency v-model="form.wordpricecurrency" slot="prepend">
                            </select-currency>
                            <span slot="append">{{getRate}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('guojilingshoujia')">
                        <el-input placeholder="" v-model="form.wordprice" class="productcurrency">
                            <select-currency v-model="form.wordpricecurrency" slot="prepend">
                            </select-currency>
                            <span slot="append">{{getReciprocalRate}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('benguochuchangjia')">
                        <el-input placeholder="" v-model="form.nationalfactoryprice" class="productcurrency">
                            <select-currency v-model="form.nationalpricecurrency" slot="prepend">
                            </select-currency>
                            <span slot="append">{{getRateNational}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('benguolingshoujia')">
                        <el-input placeholder="" v-model="form.nationalprice" class="productcurrency">
                            <select-currency v-model="form.nationalpricecurrency" slot="prepend">
                            </select-currency>
                            <span slot="append">{{getReciprocalRateNational}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="_label('chandi')" prop="countries">
                        <simple-select v-model="form.countries" source="country"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('xiaoshoushuxing')">
                        <simple-select v-model="form.saletypeid" source="saletype"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="_label('xingbie')">
                        <sp-radio-group v-model="form.gender" source="gender" :span="8" :lang="lang" class="supermini">
                        </sp-radio-group>
                    </el-form-item>
                    <el-form-item :label="_label('jijie')">
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
                    </el-form-item>
                    <el-form-item :label="_label('zuihouruku')">
                        <el-input v-model="form.password"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('jiandangren')">
                        <el-input :disabled="true" :placeholder="_label('xitongmoren')"></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('jiandangshijian')">
                        <el-input :disabled="true" :placeholder="_label('dangqianshijian')"></el-input>
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
    </el-dialog>
</template>

<script>
import { extract, _label, config,math } from '../globals.js'
import { initObject } from "../array.js"
import { extend } from "../object.js"
import { Rules } from '../rules.js'
import DataSource from '../DataSource.js'
import watcher from "../watch.js"
import Material from '../product/material.vue'
import Asa_Color_Select from './Asa_Color_Select.vue'

export default {
    name: 'asa-product-add',
    components: {
        colorselect: Asa_Color_Select,
        productmaterial: Material
    },
    data() {
        return {
            dialogVisible: false,
            lang: _label("lang"),
            form: {
                brandid: '',
                brandgroupid: "",
                childbrand: "",
                productsize: "",
                countries: "",
                material: "",
                productparst: "",
                producttemplate: "",
                laststoragedate: "",
                series: "",
                ulnarinch: "",
                factoryprice: "",
                factorypricecurrency: config.ouyuan,
                nationalpricecurrency: _label("_currencyid"),
                nationalprice: "",
                nationalfactorypricecurrency: _label("_currencyid"),
                nationalfactoryprice: "",
                memo: "",
                wordprice: "",
                wordpricecurrency: config.ouyuan,
                gender: "",
                spring: "",
                summer: "",
                fall: "",
                winter: "",
                ageseason: "",
                sizetopid: "",
                sizecontentids: "",
                productmemoids: "" //商品描述
            },
            rules: {
                sizetopid: Rules.id({ required: true, message: _label("8000") }),
                brandgroupid: Rules.id({ required: true, message: _label("8000") }),
                childbrand: Rules.id({ required: true, message: _label("8000") }),
                brandid: Rules.id({ required: true, message: _label("8000") }),
                brandcolor: Rules.required({ message: _label("8000") }),
                ageseason: Rules.required({ message: _label("8000") }),
                sizecontentids: Rules.required({ message: _label("8000") })
            },
            materials: [],
            colors: [],
            colors_loaded: false,
            rate: "", //倍率
            siji: "" //控制四季全选
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        onKeyDown(index) {
            //this._log(refname,index,this.$refs[refname])
            let target = this.$refs['word' + (index + 1)]
            if (target) {
                target.focus()
            }
        },
        onKeyUp(index) {
            //this._log(refname,index,this.$refs[refname])
            let target = this.$refs['word' + (index - 1)]
            if (target) {
                target.focus()
            }
        },
        onFocus(index) {
            if (index == 1) {
                this.watcher1.start()
            } else {
                this.watcher2.start()
            }
        },
        onBlur(index) {
            if (index == 1) {
                this.watcher1.stop()
            } else {
                this.watcher2.stop()
            }
        },
        onWord1Change(newvalue, oldvalue) {
            let self = this

            self.colors.forEach(item => {
                if (item.wordcode_1 == '' || item.wordcode_1 == oldvalue) {
                    item.wordcode_1 = newvalue
                }
            })
        },
        onWord2Change(newvalue, oldvalue) {
            let self = this

            self.colors.forEach(item => {
                if (item.wordcode_2 == '' || item.wordcode_2 == oldvalue) {
                    item.wordcode_2 = newvalue
                }
            })
        },
        onPriceChange(newvalue, oldvalue) {
            let self = this

            if(self.rate=='') {
                return
            }

            let oldprice = math.round(oldvalue*self.rate,2)
            if (self.form.wordprice == '' || self.form.wordprice == oldprice) {
                self.form.wordprice = math.round(newvalue*self.rate,2)
            }
        },
        onSubmit() {
            var self = this;

            self.validate().then(() => {
                let params = {};
                params.form = extend({}, self.form)
                params.colors = self.colors
                params.materials = self.materials

                self._submit("/product/add", { params: JSON.stringify(params) }).then(function(res) {
                    //self.$emit("change", Object.assign({}, self.form), "create")
                    self._log(res)
                        //self.colors = []
                    self.initColorList()
                    self.$emit("change")
                })
            })
        },
        onAppendColor() {
            let self = this
            let wordcode1_default = ""
            let wordcode2_default = ""
            if (self.colors.length > 0) {
                wordcode1_default = self.colors[0].wordcode_1
                wordcode2_default = self.colors[0].wordcode_2
            }
            self.colors.push({
                brandcolor: "",
                wordcode_1: wordcode1_default,
                wordcode_2: wordcode2_default,
                wordcode_3: "",
                wordcode_4: "",
                picture: "",
                picture2: "",
                colorname: ""
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
        show() {
            var self = this;
            self.dialogVisible = true;
        },
        initColorList() {
            let self = this
            let length = self.colors.length;
            length = length > 0 ? length : 1;

            self.colors = []
            for (let i = 0; i < length; i++) {
                self.onAppendColor()
            }

            self.watcher1 = watcher(self.colors[0], "wordcode_1", self.onWord1Change)
            self.watcher2 = watcher(self.colors[0], "wordcode_2", self.onWord2Change)
        },
        loadRate() {
            let self = this;

            if(self.form.brandid=='' || self.form.ageseason=='' || self.form.brandgroupid=='') {
                return 
            }

            self._fetch("/brandrate/getrate", extract(self.form, ['brandid', 'ageseason', 'brandgroupid'])).then(res=>{
                self.rate = res.data;
            })
        }
    },
    watch: {
        siji: function(newValue) {
            let self = this
            extend(self.form, initObject(['spring', 'summer', 'fall', 'winter'], newValue))
        }
    },
    computed: {
        getRate() {
            return this.rate
        },
        getReciprocalRate() {
            return this.rate > 0 ? math.round(1 / this.rate, 2) : ""
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
        self.initColorList()

        self.watcherprice = watcher(self.form, "factoryprice", self.onPriceChange)
        self.clearValidate(1000)
    }
}
</script>
