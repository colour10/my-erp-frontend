<template>
    <el-dialog :title="_label('chanpinguanli')" :visible.sync="dialogVisible" :center="true" width="1200px">
        <el-tabs type="border-card" @tab-click="onTabClick" v-model="currentTab">
            <el-tab-pane :label="_label('jibenziliao')" name="product">
                <el-row>
                    <el-col :span="5">
                        <simple-avatar v-model="form.picture" :disabled="!$store.getters.allow('product')"></simple-avatar>
                    </el-col>
                    <el-col :span="5">
                        <simple-avatar v-model="form.picture2" :disabled="!$store.getters.allow('product')"></simple-avatar>
                    </el-col>
                    <el-col :span="14">
                        <el-form ref="form" :model="form" label-width="80px" size="mini">
                            <el-form-item :label="_label('shangpinmingcheng')">
                                <el-input v-model="form.productname"></el-input>
                            </el-form-item>
                            <el-form-item :label="_label('guojima')">
                                <el-input v-model="form.wordcode_1" style="width:110px;"></el-input>
                                <el-input v-model="form.wordcode_2" style="width:110px;"></el-input>
                                <el-input v-model="form.wordcode_3" style="width:110px;"></el-input>
                                <el-input v-model="form.wordcode_4" style="width:110px;"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-col :span="4" v-for="item in colors2" :key="item.colortemplateid">
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
                <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="rules" :inline-message="true">
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item :label="_label('niandai')" prop="ageseason">
                                <select-dialog v-model="form.ageseason" source="ageseason" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('pinpai')" prop="brandid">
                                <simple-select v-model="form.brandid" source="brand" :lang="lang" @change="onBrandChange">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                                <simple-select v-model="form.brandgroupid" source="brandgroup" :lang="lang" @change="onBrandGroupChange">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('zipinlei')" prop="childbrand">
                                <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :lang="lang" :lazy="true">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('chimazu')" prop="sizetopid">
                                <simple-select v-model="form.sizetopid" source="sizetop" :lang="lang" @change="onSizetopidChange">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('chimamingxi')" prop="sizetopid">
                                <selectpanel v-model="form.sizecontentids" ref="sizecontentids"> </selectpanel>
                            </el-form-item>
                            <el-form-item :label="_label('pinpaiseban')" prop="brandcolor">
                                <simple-select v-model="form.brandcolor" source="colortemplate" :lang="lang">
                                    <template v-slot="{row}">
                                        <div class="imgline">
                                            <img :src="_fileLink(row.row.picture)" class="icon"> <span>{{row.getLabel()}}</span>
                                        </div>
                                    </template>
                                </simple-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="_label('shangpinchicun')">
                                <simple-select v-model="form.ulnarinch" source="ulnarinch" style="width:150" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinmiaoshu')">
                                <select-dialog v-model="form.productmemoids" source="productmemo" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinxilie')">
                                <selectpanel v-model="form.series" ref="series" style="width:150" @change="onSeriesChange"> </selectpanel>
                            </el-form-item>
                            <el-form-item :label="_label('chuchangjia')">
                                <el-input placeholder="" v-model="form.factoryprice" class="input-with-select">
                                    <select-currency v-model="form.factorypricecurrency" slot="prepend">
                                    </select-currency>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="_label('guojilingshoujia')">
                                <el-input placeholder="" v-model="form.wordprice" class="input-with-select">
                                    <select-currency v-model="form.wordpricecurrency" slot="prepend">
                                    </select-currency>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="_label('benguolingshoujia')">
                                <el-input placeholder="" v-model="form.nationalprice" class="input-with-select">
                                    <select-currency v-model="form.nationalpricecurrency" slot="prepend">
                                    </select-currency>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="_label('chandi')" prop="countries">
                                <select-dialog v-model="form.countries" source="country" :lang="lang"></select-dialog>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="_label('xingbie')">
                                <sp-radio-group v-model="form.gender" source="gender" :span="8" :lang="lang" class="supermini">
                                </sp-radio-group>
                            </el-form-item>
                            <el-form-item :label="_label('jijie')">
                                <template #label>
                                    <sp-checkbox class="siji" v-model="siji">{{_label("siji")}}</sp-checkbox>
                                </template>
                                <el-col :span="12">
                                    <sp-checkbox v-model="form.spring">{{_label("chun")}}</sp-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <sp-checkbox v-model="form.summer">{{_label("xia")}}</sp-checkbox>
                                </el-col>
                                <el-col :span="12">
                                    <sp-checkbox v-model="form.fall">{{_label("qiu")}}</sp-checkbox>
                                </el-col>
                                <el-col :span="12">
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
                    <el-table-column prop="name" :label="_label('chima')" align="center" width="100">
                    </el-table-column>
                    <el-table-column prop="goods_code" :label="_label('shangpintiaoma')" width="350" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.goods_code"></el-input>
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
                    <searchpanel ref="searchpanel" @select="onSelectProduct" :filter="searchProductFilter"></searchpanel>
                </auth>
                <el-table :data="colors" border style="width:100%;" :header-cell-style="countHeaderStyle">
                    <el-table-column prop="brandcolor" :label="_label('yanse')" width="240" align="center">
                        <template v-slot="scope">
                            <simple-select v-model="scope.row.brandcolor" source="colortemplate" :lang="lang" :disabled="scope.row.id>0">
                            </simple-select>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="center">
                        <el-table-column prop="goods_code" width="130" align="center">
                            <template v-slot="scope">
                                <el-input v-model="scope.row.wordcode_1" :disabled="scope.row.id>0"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_code" width="130" align="center">
                            <template v-slot="scope">
                                <el-input v-model="scope.row.wordcode_2" :disabled="scope.row.id>0"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_code" width="130" align="center">
                            <template v-slot="scope">
                                <el-input v-model="scope.row.wordcode_3" :disabled="scope.row.id>0"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="goods_code" width="130" align="center">
                            <template v-slot="scope">
                                <el-input v-model="scope.row.wordcode_4" :disabled="scope.row.id>0"></el-input>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column prop="goods_code" :label="_label('caozuo')" width="150" align="center">
                        <template v-slot="scope">
                            <auth auth="product">
                                <as-button type="danger" @click="onDeleteColorGroup(scope, scope.row)" v-if="option.isedit && form.id!=scope.row.id">{{_label("shanchu")}}</as-button>
                            </auth>
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
                <sp-album :productid="form.id" ref="album"></sp-album>
            </el-tab-pane>
            <el-tab-pane :label="_label('jiage')" name="pricetab" :disabled="form.id==''">
                <pricetab :productid="form.id" ref="pricetab" @quit="onQuit" :option="option"></pricetab>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import globals, { extract, _label } from '../globals.js'
import { ProductCodeList, ProductDetail } from "../model.js"
import { initObject } from "../array.js"
import { extend } from "../object.js"
import List from '../list.js'
import { Rules } from '../rules.js'
import DataSource from '../DataSource.js'
import Asa_Product_Search_Panel from './Asa_Product_Search_Panel.vue'
import Asa_Product_Property from './Asa_Product_Property.vue'
import Select_Dialog_Common from '../Select_Dialog_Common.vue'
import Asa_Product_Price from './Asa_Product_Price.vue'

const color_keys = ['id', 'brandcolor', 'wordcode_1', 'wordcode_2', 'wordcode_3', 'wordcode_4']

export default {
    name: 'asa-product',
    components: {
        searchpanel: Asa_Product_Search_Panel,
        property: Asa_Product_Property,
        pricetab:Asa_Product_Price,
        selectpanel: Select_Dialog_Common
    },
    data() {
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
                material: "",
                productparst: "",
                producttemplate: "",
                picture: "",
                picture2: "",
                laststoragedate: "",
                series: "",
                ulnarinch: "",
                factoryprice: "",
                factorypricecurrency: "",
                orderprice: "",
                orderpricecurrency: "",
                nationalpricecurrency:"",
                nationalprice: "",
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
                makestaff: "",
                maketime: ''
            },
            rules: {
                sizetopid: Rules.id({ required: true, message: _label("8000") }),
                brandgroupid: Rules.id({ required: true, message: _label("8000") }),
                childbrand: Rules.id({ required: true, message: _label("8000") }),
                brandid: Rules.id({ required: true, message: _label("8000") }),
                brandcolor: Rules.required({ message: _label("8000") }),
                ageseason: Rules.required({ message: _label("8000") })
            },
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
            siji: "" //控制四季全选
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        getColorStyle(item) {
            return {
                width: '36px',
                height: '36px',
                background: 'url("' + this._fileLink(item.picture) + '") no-repeat center'
            }

        },
        searchProductFilter(product) {
            return this.colors.findIndex(item => item.id == product.id) < 0
        },
        onSubmit() {
            var self = this;

            this.$refs["order-form"].validate(function(valid) {
                if (!valid) {
                    return false;
                }

                if (self.form.id == "") {
                    self._submit("/product/add", self.form).then(function(res) {
                        self.$emit("change", Object.assign({}, self.form), "create")
                        self.setInfo(res.id)
                    })
                } else {
                    self._submit("/product/edit", self.form).then(function() {
                        self.$emit("change", Object.assign({}, self.form), "update")
                        self.setInfo(self.form.id)
                    })
                }
            })
        },
        onSizetopidChange(newvalue) {
            let self = this
                //self._log(newvalue)
            let source = DataSource.getDataSource("sizecontent", self.lang)
            source.filter({ topid: self.form.sizetopid }, function(list) {
                let data = list.map(item => item.getObject())
                self.$refs['sizecontentids'].setData(data)
                if (data.length == 1) {
                    self.form.sizecontentids = data[0].id
                }
            })
        },
        onBrandChange(newvalue) {
            let self = this
                //self._log(newvalue)
            let source = DataSource.getDataSource("aliases", self.lang)
            source.filter({ brandid: self.form.brandid }, function(list) {
                let data = list.map(item => item.getObject())
                self.$refs['aliases'].setData(data)
            })

            let series = DataSource.getDataSource("series", self.lang)
            series.filter({ brandid: self.form.brandid }, function(list) {
                let data = list.map(item => item.getObject())
                self.$refs['series'].setData(data)
            })
        },
        onSeriesChange(newvalue) {
            let self = this
                //self._log(newvalue)
            let source = DataSource.getDataSource("series2", self.lang)
            source.filter({ seriesid: self.form.series }, function(list) {
                let data = list.map(item => item.getObject())
                self.$refs['series2'].setData(data)
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
                //self._log(params)
            self._submit("/product/savecolorgroup", { params: JSON.stringify(params) }).then(function(res) {
                self.setInfo(self.form.id)
                res.data.list.forEach(function(item) {
                    self.colors.push(extract(item, color_keys))
                    self._log(item)
                })
                self.colors_loaded = true

                self.$emit("change", Object.assign({}, self.form), "update")
                self.currentTab = "colorgroup"
            });
        },
        onAppendColor() {
            let self = this
            self.colors.push({
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
            }
            else if(tab.name=='property') {
                setTimeout(function() {
                    self.$refs.property.load()
                }, 50)
            }
            else if(tab.name=='pricetab') {
                setTimeout(function() {
                    self.$refs.pricetab.load()
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
                    self.colors.push(extract(item, ['brandcolor', 'id', 'wordcode_1', 'wordcode_2', 'wordcode_3', 'wordcode_4']))
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
                        return globals.extend({ goods_code: "" }, item.getObject())
                    })
                    self.sizecontents_loaded = false;
                    //self._log(self.sizecontents)

                    globals.copyTo(info, self.form)
                    self.form.factoryprice = globals.round(self.form.factoryprice, 2)
                    self.form.wordprice = globals.round(self.form.wordprice, 2)
                    self.form.nationalprice = globals.round(self.form.nationalprice, 2)

                    setTimeout(function() {
                        self.$refs.childbrand.load(item => item.row.brandgroupid == self.form.brandgroupid)
                        if (self.$refs.searchpanel) {
                            self.$refs.searchpanel.clear()
                        }
                        self.$refs.property.setProduct(info)
                        self.$refs.pricetab.setProduct(info)
                        self.onSizetopidChange()
                    }, 100)

                    self.clearValidate(50)


                    self.currentTab = 'product'

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
        onBrandGroupChange(value) {
            let self = this

            //self._log(value)
            self.$refs.childbrand.load(value)
        }
    },
    watch: {
        siji: function(newValue) {
            let self = this
            extend(self.form, initObject(['spring', 'summer', 'fall', 'winter'], newValue))
        }
    }
}
</script>
