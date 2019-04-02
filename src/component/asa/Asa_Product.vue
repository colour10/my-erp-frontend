<template>
    <el-dialog :title="_label('chanpinguanli')" :visible.sync="dialogVisible" :center="true" width="1000px">
        <el-tabs type="border-card" @tab-click="onTabClick" v-model="currentTab">
            <el-tab-pane :label="_label('user-setting')" name="product">
                <el-row>
                    <el-col :span="5">
                        <simple-avatar v-model="form.picture"></simple-avatar>
                    </el-col>
                    <el-col :span="5">
                        <simple-avatar v-model="form.picture2"></simple-avatar>
                    </el-col>
                    <el-col :span="14">
                        <el-form ref="form" :model="form" label-width="80px" size="mini">
                            <el-form-item :label="_label('shangpinmingcheng')">
                                <el-input v-model="form.productname"></el-input>
                            </el-form-item>
                            <el-form-item :label="_label('guojima')">
                                <el-input v-model="form.wordcode_1" style="width:100px;"></el-input>
                                <el-input v-model="form.wordcode_2" style="width:100px;"></el-input>
                                <el-input v-model="form.wordcode_3" style="width:100px;"></el-input>
                                <el-input v-model="form.wordcode_4" style="width:100px;"></el-input>
                            </el-form-item>
                        </el-form>
                    </el-col>
                </el-row>

                <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini" :rules="rules" :inline-message="true">
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item :label="_label('pinpai')" prop="brandid">
                                <simple-select v-model="form.brandid" source="brand" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                                <simple-select v-model="form.brandgroupid" source="brandgroup" :lang="lang" @change="onBrandGroupChange">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('zipinlei')" prop="childbrand">
                                <simple-select ref="childbrand" v-model="form.childbrand" source="childproductgroup" :lang="lang" :lazy="true">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('chandi')" prop="countries">
                                <select-dialog v-model="form.countries" source="country" :lang="lang"></select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('pinpaiseban')" prop="brandcolor">
                                <select-dialog v-model="form.brandcolor" source="colortemplate" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('caizhizhuangtai')" prop="materialstatus">
                                <select-dialog v-model="form.materialstatus" source="materialstatus" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('changhefengge')">
                                <select-dialog v-model="form.occasion" source="occasionsstyle" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinchicun')">
                                <simple-select v-model="form.ulnarinch" source="ulnarinch" style="width:150" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinmiaoshu')">
                                <select-dialog v-model="form.occasion" source="occasionsstyle" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('bihefangshi')" prop="closedway">
                                <select-dialog v-model="form.closedway" source="closedway" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="_label('niandai')" prop="ageseason">
                                <select-dialog v-model="form.ageseason" source="ageseason" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinbieming')">
                                <select-dialog v-model="form.aliases" source="aliases" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinxilie')">
                                <select-dialog v-model="form.series_id" source="aliases" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('shangpinzixilie')">
                                <select-dialog v-model="form.series_id2" source="aliases" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('fanghanzhishu')">
                                <simple-select v-model="form.winterproofing" source="winterproofing" style="width:150" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('chengjiaojiage')">
                                <el-input placeholder="" v-model="form.realprice" class="input-with-select">
                                    <select-currency v-model="form.retailpricecurrency" slot="prepend">
                                    </select-currency>
                                </el-input>
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
                            <el-form-item :label="_label('guoneilingshoujia')">
                                <el-input v-model="form.nationalprice"></el-input>
                            </el-form-item>
                            <el-form-item :label="_label('chicunbeizhu')">
                                <el-input v-model="form.ulnarinch_memo"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="_label('xingbie')">
                                <select-dialog v-model="form.gender" source="gender" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('jijie')">
                                <select-dialog v-model="form.season" source="season" style="width:150" :lang="lang">
                                </select-dialog>
                            </el-form-item>
                            <el-form-item :label="_label('chima')" prop="sizetopid">
                                <simple-select v-model="form.sizetopid" source="sizetop" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('chimaguige')">
                                <simple-select v-model="form.ulnarinch" source="ulnarinch" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('zhixingbiaozhun')">
                                <simple-select v-model="form.executioncategory" source="executioncategory" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('anquanleibie')">
                                <simple-select v-model="form.securitycategory" source="securitycategory" :lang="lang">
                                </simple-select>
                            </el-form-item>
                            <el-form-item :label="_label('guigexinghao')">
                                <el-input v-model="form.guigexinghao"></el-input>
                            </el-form-item>
                            <el-form-item :label="_label('zuihouruku')">
                                <el-input v-model="form.password"></el-input>
                            </el-form-item>
                            <el-form-item :label="_label('jiandangshijian')">
                                <el-input v-model="datetime" disabled></el-input>
                            </el-form-item>
                            <el-form-item :label="_label('jiandangren')">
                                <el-input v-model="adduser" disabled></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="0">
                        <el-col :span="2" :offset="11">
                            <el-button type="primary" @click="onSubmit" v-if="option.isedit">{{_label("tijiao")}}</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </el-tab-pane>
            <el-tab-pane :label="_label('shangpintupian')" name="album">
                <sp-album :productid="form.id"></sp-album>
            </el-tab-pane>
            <el-tab-pane :label="_label('shangpinhuohao')" name="code">
                <el-table :data="sizecontents" border style="width:100%;" v-loading.fullscreen.lock="loading" :row-class-name="tableRowClassName">
                    <el-table-column prop="name" :label="_label('chima')" align="center">
                    </el-table-column>
                    <el-table-column prop="goods_code" :label="_label('shangpinhuohao')" width="350" align="center">
                        <template v-slot="scope">
                            <el-input v-model="scope.row.goods_code"></el-input>
                        </template>
                    </el-table-column>
                </el-table>
                <el-col :offset="11" :span="2">
                    <el-button type="primary" @click="onSaveGoodsCode" v-if="option.isedit">{{_label("baocun")}}</el-button>
                </el-col>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import globals from '../globals.js'
import { ProductCodeList } from "../model.js"
import List from '../list.js'
import {Rules} from '../rules.js'
import DataSource from '../DataSource.js'
const _log = globals.logger("asa-product");
const _label = globals.getLabel

export default {
    name: 'asa-product',
    components: {},
    data() {
        return {
            dialogVisible: false,
            lang: _label("lang"),
            form: {
                id: '',
                productname: "",
                decade: "",
                brandid: '',
                brandgroupid: "",
                childbrand: "",
                productsize: "",
                countries: "",
                brandcolor: "",
                securitycategory: "",
                executioncategory: "",
                material: "",
                productparst: "",
                occasion: "",
                producttemplate: "",
                materialstatus: "",
                spring: "",
                picture: "",
                picture2: "",
                summer: "",
                autumn: "",
                winter: "",
                oldasacode: "",
                officialwebsite: "",
                oldbarcode: "",
                laststoragedate: "",
                aliases_1: "",
                aliases_2: "",
                aliases: "",
                series_id: "",
                series2_id: "",
                ulnarinch: "",
                vat: "",
                tariff: "",
                basecurrency: "",
                baseprice: "",
                entrymonth: "",
                factoryprice: "",
                factorypricecurrency: "",
                realprice: "",
                retailpricecurrency: "",
                dutyparagraph: "",
                orderprice: "",
                orderpricecurrency: "",
                retailprice: "",
                groupid: "",
                iskj: "",
                bxzs: "",
                hbzs: "",
                rrzs: "",
                tlzs: "",
                salemethodid: "",
                nationalprice: "",
                taxrate: "",
                isjh: "",
                inlenth: "",
                jdname: "",
                winterproofing: "",
                isfj: "",
                discount: "",
                ulnarinch_memo: "",
                wordprice: "",
                wordpricecurrency: "",
                gender: "",
                season: "",
                ageseason: "",
                sizetopid: "",
                wordcode_1: "",
                wordcode_2: "",
                wordcode_3: "",
                wordcode_4: "",
                productno: "",
                closedway:''
            },
            rules: {
                sizetopid: Rules.id({ required: true, message: _label("8000") }),
                brandgroupid: Rules.id({ message: _label("8000") }),
                childbrand: Rules.id({ message: _label("8000") }),
                brandid: Rules.id({ message: _label("8000") }),
                countries: Rules.required({ message: _label("8000") }),
                brandcolor: Rules.required({ message: _label("8000") }),
                ageseason: Rules.required({ message: _label("8000") }),
                closedway: Rules.required({ message: _label("8000") }),
            },
            sizecontents: [],
            sizecontents_loaded: false,
            datetime: _label("_date"),
            adduser: _label("_currentUsername"),
            option: {
                isedit: false
            },
            currentTab: "product"
        }
    },
    methods: {
        onSubmit() {
            var self = this;

            this.$refs["order-form"].validate(function(valid) {
                if (!valid) {
                    return false;
                }

                if (self.form.id == "") {
                    self._submit("/product/add", self.form, function() {
                        //self.$refs.tablelist.appendRow($ASA.clone(self.form))
                        self.$emit("change", Object.assign({}, self.form), "create")
                    })
                } else {
                    self._submit("/product/edit", self.form, function() {
                        //$ASA.copyTo(self.form, self.row)
                        self.$emit("change", Object.assign({}, self.form), "update")
                    })
                }
            })


        },
        onSaveGoodsCode() {
            let self = this
            console.log("savecode")
            let params = { productid: self.form.id }
            params.list = self.sizecontents.map(function(item) {
                return { sizecontentid: item.id, goods_code: item.goods_code }
            })

            self._submit("/product/savecode", {
                params: JSON.stringify(params)
            }, function(res) {});
        },
        onTabClick(tab) {
            const self = this
            if (tab.name == 'code' && self.sizecontents_loaded == false) {
                let source = DataSource.getDataSource("sizecontent", self.lang)
                source.filter({ topid: self.form.sizetopid }, function(list) {
                    list.forEach(item => {
                        let o = $ASA.extend({ goods_code: "" }, item.getObject())
                        self.sizecontents.push(o)
                    })

                    let ntlist = new List(self.sizecontents)
                    new ProductCodeList(self.form.id, function(data) {
                        console.log(data)
                        data.forEach(function(item) {
                            let index = ntlist.findIndex('id', item.sizecontentid)
                            if (index >= 0) {
                                self.sizecontents[index].goods_code = item.goods_code
                            }
                        })
                    })



                })
                self.sizecontents_loaded = true;


            }
        },
        setInfo(row) {
            var self = this
            self.row = row;
            $ASA.copyTo(row, this.form)
            self.form.factoryprice = $ASA.round(self.form.factoryprice, 2)
            self.form.realprice = $ASA.round(self.form.realprice, 2)
            self.form.wordprice = $ASA.round(self.form.wordprice, 2)
            self.form.nationalprice = $ASA.round(self.form.nationalprice, 2)

            setTimeout(function() {
                self.$refs.childbrand.load(item => item.row.brandgroupid == self.form.brandgroupid)
            }, 100)

            self.clearValidate(50)

            self.sizecontents_loaded = false;
            self.sizecontents = []
            self.currentTab = 'product'

            return self;
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
            $ASA.empty(self.form)

            self.activeName = "info"
            self.sizecontents_loaded = false;
            self.sizecontents = []

            self.clearValidate(50)
            return self
        },
        onBrandGroupChange(value) {
            let self = this

            self._log(value)
            self.$refs.childbrand.load(item => item.row.brandgroupid == value)
        }
    }
}
</script>
