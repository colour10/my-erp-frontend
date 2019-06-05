<template>
    <el-dialog :title="_label('chanpinguanli')" :visible.sync="dialogVisible" :center="true" width="1200px" :modal="modal">
        <el-row class="product">
            <el-col :span="24">
                <el-table :data="colors" border style="width:100%;">
                    <el-table-column width="80" align="center">
                        <template v-slot="scope">
                            <simple-avatar v-model="scope.row.picture" font-size="14px" :size="35"></simple-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" align="center">
                        <template v-slot="{row}">
                            <simple-avatar v-model="row.picture2" font-size="14px" :size="35" v-if="row.picture2!=''"></simple-avatar>

                            <el-upload class="avatar-uploader" :action="host+'/common/upload?category=product'" :show-file-list="false" :on-success="handleAvatarSuccess" v-if="row.picture2==''" :multiple="true">
                                <i class="el-icon-plus avatar-uploader-icon" style="width:35px;height:35px;line-height:35px;font-size:14px"></i>
                            </el-upload>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="_label('kuanshi')" width="140" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.wordcode_1" size="mini" @focus="onFocus(1)" @blur="onBlur(1)" @keyup.native="onKeyInput(scope.row,'wordcode_1')"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caizhi')" width="140" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.wordcode_2" size="mini" @focus="onFocus(2)" @blur="onBlur(2)" @keyup.native="onKeyInput(scope.row,'wordcode_2')"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('yanse')" width="140" align="center">
                        <template v-slot="scope">
                            <!--<el-input v-model="scope.row.wordcode_3" size="mini" @keyup.native.down="onKeyDown(scope.$index)" @keyup.native.up="onKeyUp(scope.$index)" :ref="'word'+scope.$index"></el-input>-->
                            <el-input v-model="scope.row.wordcode_3" size="mini" @keyup.native="onWord3Change(scope.row)"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('yansemingcheng')" width="150" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.colorname" size="mini"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="brandcolor" :label="_label('sexi')" width="140" align="center">
                        <template v-slot="scope">
                            <colorselect v-model="scope.row.brandcolor" :disabled="scope.row.id>0"></colorselect>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('fuzhuma')" width="130" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.wordcode_4" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    
                    <el-table-column :label="_label('caozuo')" width="159" align="center">
                        <template v-slot="scope">
                            <as-button type="danger" @click="onDeleteColorGroup(scope, scope.row)" v-if="scope.$index>0">{{_label("shanchu")}}</as-button>
                            <au-button auth="product" type="primary" @click="onAppendColor"v-if="scope.$index==0">{{_label("zhuijia")}}</au-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <div class="el-time-panel el-popper" style="width:900px;height:500px;">sdsd</div> -->
            </el-col>
        </el-row>
        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;margin-top:5px;" size="mini" :rules="rules" :inline-message="true">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item :label="_label('niandai')" prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" :multiple="true" @change="loadRate"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinpai')" prop="brandid">
                        <simple-select v-model="form.brandid" source="brand" @change="onBrandChange"></simple-select>
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
                        <simple-select v-model="form.sizecontentids" source="sizecontent" :parentid="form.sizetopid" :multiple="true" :isBatch="true" @option-change="onOptionChange"> </simple-select><as-button @click="onTrimSize" class="trimhalf">{{_label("qubanma")}}</as-button>
                    </el-form-item>
                    
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="_label('caizhi')">
                        <productmaterial v-model="materials" :brandgroupid="form.brandgroupid"></productmaterial>
                    </el-form-item>

                    <el-form-item :label="_label('chandi')" prop="countries">
                        <simple-select v-model="form.countries" source="country"></simple-select>
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
                        <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid"> </simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('xiaoshoushuxing')">
                        <simple-select v-model="form.saletypeid" source="saletype"></simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('shangpinshuxing')">
                        <simple-select v-model="form.producttypeid" source="producttype"></simple-select>
                    </el-form-item>

                    <el-form-item :label="_label('xingbie')">
                        <sp-radio-group v-model="form.gender" source="gender" :span="8" :lang="lang" class="supermini" style="width:270px">
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
import { extract, _label, config,math,empty } from '../globals.js'
import { initObject } from "../array.js"
import { extend } from "../object.js"
import { Rules } from '../rules.js'
import { loadSetting } from '../setting.js'
import DataSource from '../DataSource.js'
import watcher from "../watch.js"
import Material from '../product/material.vue'
import chain from "../chain.js"
import API from "../api.js"
import { host } from '../http.js'
import productMixin from "../mixins/product.js"

export default {
    name: 'asa-product-add',
    components: {
        productmaterial: Material
    },
    mixins:[productMixin],
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
                laststoragedate: "",
                series: "",
                ulnarinch: "",
                factoryprice: "",
                factorypricecurrency: config().ouyuan,
                nationalpricecurrency: '',
                nationalprice: "",
                nationalfactorypricecurrency: "",
                nationalfactoryprice: "",
                memo: "",
                wordprice: "",
                wordpricecurrency: config().ouyuan,
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
            rate: "", //参考倍率
            exchange:{
                currency_to:"",
                currency_from:"",
                rate:""
            }, //当前的汇率信息；零售比=本国零售价/国际零售价
            siji: "", //控制四季全选
            modal:true,
            host
        }
    },
    methods: {
        onPriceFocus(name){
            this.$refs[name].select()
        },
        handleAvatarSuccess(response, file, fileList) {
            let self = this
            let picture2 = response["files"][file.name]
            this._log(file)

            if(self.colors[0].picture2=="") {
                self.colors[0].picture2 = picture2
            }
            else {
                self.onAppendColor({picture2})
            }
            
        },
        onBrandChange(){
            this.loadRate();
            this.getBrandColorSuggest();
        },
        onWord3Change(row) {
            this.onKeyInput(row,'wordcode_3')
            this.autoMatchSuggest(row)
        },
        onQuit() {
            this.dialogVisible = false
        },
        onKeyInput(target, columnName){
            target[columnName] = target[columnName].toUpperCase()
        },
        onOptionChange(options) {
            let self = this
            if(options.length==1) {
                self.form.sizecontentids = options[0].id
            }
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
        onTrimSize() {
            let self = this
            let source = DataSource.getDataSource("sizecontent", self._label("lang"))
            source.getRows(self.form.sizecontentids).then(results=>{
                self.form.sizecontentids = results.filter(item=>item.name.indexOf('.')<0).map(item=>item.id).join(',')
            })
        },
        onSubmit() {
            let self = this;

            self.validate().then(() => {
                let params = {};
                params.form = extend({}, self.form)
                params.colors = self.colors
                params.materials = self.materials

                self._submit("/product/add", { params: JSON.stringify(params) }).then(function(res) {
                    //self.$emit("change", Object.assign({}, self.form), "create")
                    //self._log(res)
                        //self.colors = []
                    self.initColorList()
                    self.$emit("change", res.data)
                })
            })
        },
        onAppendColor({picture2}={}) {
            let self = this
            let wordcode1_default = ""
            let wordcode2_default = ""
            let picture_default =""
            if (self.colors.length > 0) {
                wordcode1_default = self.colors[0].wordcode_1
                wordcode2_default = self.colors[0].wordcode_2
                picture_default = self.colors[0].picture
            }
            self.colors.push({
                brandcolor: "",
                wordcode_1: wordcode1_default,
                wordcode_2: wordcode2_default,
                wordcode_3: "",
                wordcode_4: "",
                picture: picture_default,
                picture2: picture2 || "",
                colorname: ""
            })
        },
        onDeleteColorGroup({ $index, row }, rowIndex) {
            let self = this
            self.$delete(self.colors, $index)
        },
        setForm(info){
            let self = this
            extend(self.form, info)
            extend(self.colors[0], chain(info).extract(['wordcode_1', 'wordcode_2', 'wordcode_3', 'wordcode_4']).map(item=>item.toUpperCase()).object())
            self._log(self.form, info)
            return self
        },
        show(modal=true) {
            let self = this;
            self.modal = modal
            self.dialogVisible = true;
        },
        hide(){
            this.dialogVisible = false;
        },
        initColorList() {
            let self = this
            let length = self.colors.length;
            //length = length > 0 ? length : 1;
            length = 1;

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
        self.initColorList()

        self.watcherprice = watcher(self.form, "factoryprice", self.onPriceChange)
        self.clearValidate(1000)

        loadSetting().then(config=>{
            //self._log(config)
            self.form.nationalpricecurrency = config._currencyid
            self.form.nationalfactorypricecurrency = config._currencyid
            self.loadExchangeRate()
        })

        //关闭页面的时候提示
        window.onbeforeunload = function (e) {
            if(self.dialogVisible==true) {
                e = e || window.event;

                // 兼容IE8和Firefox 4之前的版本
                if (e) {
                    e.returnValue = self._label("guanbitishi")
                }

                // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
                return self._label("guanbitishi")
            }
            
        }   
    }
}
</script>
