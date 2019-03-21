<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="showFormToCreate()">{{globals.getLabel("button-create")}}</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <el-dialog :title="labels[action_type][0]" :visible.sync="dialogVisible" :center="true" width="1000px">
            <el-tabs type="border-card" @tab-click="onTabClick">
                <el-tab-pane :label="_label('user-setting')">
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
                                <el-form-item :label="_label('huohao')">
                                    <el-input v-model="form.productno"></el-input>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-row>
                    <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                        <el-row :gutter="0">
                            <el-col :span="8">
                                <el-form-item :label="_label('pinpai')">
                                    <simple-select v-model="form.brandid" source="brand" :lang="lang">
                                    </simple-select>
                                </el-form-item>
                                <el-form-item :label="_label('pinlei')">
                                    <simple-select v-model="form.brandgroupid" source="brandgroup" :lang="lang">
                                    </simple-select>
                                </el-form-item>
                                <el-form-item :label="_label('zipinlei')">
                                    <simple-select v-model="form.childbrand" source="childproductgroup" :lang="lang">
                                    </simple-select>
                                </el-form-item>
                                <el-form-item :label="_label('chandi')">
                                    <select-dialog v-model="form.countries" source="country" :lang="lang"></select-dialog>
                                </el-form-item>
                                <el-form-item :label="_label('pinpaiseban')">
                                    <select-dialog v-model="form.brandcolor" source="colortemplate" :lang="lang">
                                    </select-dialog>
                                </el-form-item>
                                <el-form-item :label="_label('caizhizhuangtai')">
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
                                <el-form-item :label="_label('bihefangshi')">
                                    <select-dialog v-model="form.closeway" source="occasionsstyle" style="width:150" :lang="lang">
                                    </select-dialog>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8">
                                <el-form-item :label="_label('niandai')">
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
                                <el-form-item :label="_label('chima')">
                                    <simple-select v-model="form.sizetopid" source="sizetop" :lang="lang">
                                    </simple-select>
                                </el-form-item>
                                <el-form-item :label="_label('chimaguige')">
                                    <simple-select v-model="form.ulnarinch" source="sizetop" :lang="lang">
                                    </simple-select>
                                </el-form-item>
                                <el-form-item :label="_label('zhixingbiaozhun')">
                                    <simple-select v-model="form.ulnarinch" source="sizetop" :lang="lang">
                                    </simple-select>
                                </el-form-item>
                                <el-form-item :label="_label('anquanleibie')">
                                    <simple-select v-model="form.ulnarinch" source="sizetop" :lang="lang">
                                    </simple-select>
                                </el-form-item>
                                <el-form-item :label="_label('guigexinghao')">
                                    <el-input v-model="form.password"></el-input>
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
                                <el-button type="primary" @click="onSubmit">{{labels[action_type][1]}}</el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="_label('shangpintupian')">
                    <sp-album :productid="form.id"></sp-album>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import Multiple_Admin_Page from '../Multiple_Admin_Page.vue'

const _log = globals.logger("asapage-product");

var props = {
    columns: [
        { name: "picture", label: $ASAL.zhutu, is_image: true, image_width: 80, image_height: 80 },
        { name: "picture2", label: $ASAL.futu, is_image: true, image_width: 80, image_height: 80 },
        { name: "productname", label: $ASAL.shangpinmingcheng },
        { name: "brandgroupid", label: $ASAL.shangpinmingcheng, type: "select", source: "brandgroup" },
        { name: "brandid", label: $ASAL.shangpinmingcheng, type: "select", source: "brand" },
        { name: "countries", label: $ASAL.chandi, type: "select-dialog", source: "country" }
    ],
    controller: "product"
}

export default {
    name: 'asapage-product',
    components: {
        'multiple-admin-page': Multiple_Admin_Page
    },
    data() {
        return {
            dialogVisible: false,
            lang: $ASAL.lang,
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
                security: "",
                execution: "",
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
                productno: ""
            },
            props: props,
            action_type: "create",
            labels: {
                create: [globals.getLabel('xinjianyonghu'), globals.getLabel('button-save')],
                update: [globals.getLabel('yuangongxinxi'), globals.getLabel('button-save')]
            },
            datetime: $ASAL._date,
            adduser: $ASAL._currentUsername,
            globals
        }
    },
    methods: {
        onSubmit() {
            var self = this;
            if (self.form.id == "") {
                self._submit("/" + props.controller + "/add", self.form, function() {
                    self.$refs.tablelist.appendRow($ASA.clone(self.form))
                        //self.dialogVisible = false
                })
            } else {
                self._submit("/" + props.controller + "/edit", self.form, function() {
                    $ASA.copyTo(self.form, self.row)
                        //self.dialogVisible = false
                })
            }
        },
        onTabClick(tab) {
            _log(tab)
        },
        showFormToEdit(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;
            self.row = row;
            $ASA.copyTo(row, this.form)
            self.form.factoryprice = $ASA.round(self.form.factoryprice, 2)
            self.form.realprice = $ASA.round(self.form.realprice, 2)
            self.form.wordprice = $ASA.round(self.form.wordprice, 2)
            self.form.nationalprice = $ASA.round(self.form.nationalprice, 2)

            this.formTitle = $ASAL.xiugaixinxi;
            self.showDialog();
        },
        showDialog() {
            var self = this;
            self.dialogVisible = true;
        },
        showFormToCreate() {
            var self = this;
            $ASA.empty(self.form)

            self.formTitle = $ASAL.tianjiaxinxi;
            self.activeName = "info"
            self.showDialog();
        },
        handleDelete(rowIndex, row) {
            var self = this;

            self._remove("/user/delete?id=" + row.id, function(res) {
                self.$delete(self.tableData, rowIndex)
            })
        }
    }
}
</script>
