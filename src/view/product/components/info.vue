<template>
    <el-form ref="productForm" :model="product" :rules="rules" label-width="85px" :inline="true" size="mini" :inline-message="false" :show-message="false">
        <el-row>
            <el-col :span="4">
                <simple-avatar v-model="product.form.picture" :disabled="!$store.getters.allow('product')"></simple-avatar>
            </el-col>
            <el-col :span="4">
                <simple-avatar v-model="product.picture2" :disabled="!$store.getters.allow('product')"></simple-avatar>
            </el-col>
            <el-col :span="16">
                    <el-form-item :label="showLabel('guojima')" prop="form.wordcode_1">
                        <el-input v-model="product.form.wordcode_1" style="width:110px;" :placeholder="showLabel('kuanshi')"></el-input>
                    </el-form-item>
                    <el-form-item prop="form.wordcode_2">
                        <el-input v-model="product.form.wordcode_2" style="width:110px;" :placeholder="showLabel('caizhi')"></el-input>
                    </el-form-item>
                    <el-form-item prop="form.wordcode_3">
                        <el-input v-model="product.form.wordcode_3" style="width:110px;" :placeholder="showLabel('yanse')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="product.form.colorname" style="width:110px;" :placeholder="showLabel('yansemingcheng')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input v-model="product.form.wordcode_4" style="width:110px;" :placeholder="showLabel('fuzhuma')"></el-input>
                    </el-form-item>
            </el-col>
        </el-row>
        <div class="order-form" style="width:1200px;">
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item :label="showLabel('niandai')" prop="form.ageseason">
                        <ageseason v-model="product.form.ageseason" :data-list="ageseasons"></ageseason>
                    </el-form-item>
                    <el-form-item :label="showLabel('pinpai')" prop="form.brandid">
                        <el-select v-model="product.form.brandid" placeholder="" @change="handleChangeBrand">
                            <el-option
                                v-for="item of brands"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="showLabel('pinlei')" prop="form.childbrand">
                        <el-cascader
                            placeholder=""
                            v-model="product.form.childbrand"
                            size="mini"
                            :options="categories"
                            :props="{ value: 'id', label: 'title' }"
                            clearable>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item :label="_label('chimazu')" prop="sizetopid">
                        <el-select v-model="product.form.sizetopid" placeholder="" @change="handleChangeSizeTop">
                            <el-option
                                v-for="item of sizes"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="_label('chimamingxi')" prop="sizetopid">
                        <el-select v-model="product.form.sizecontentids" placeholder="" multiple>
                            <el-option
                                v-for="item of sizecontents"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <as-button class="trimhalf" @click="handleTrimSize">{{showLabel("qubanma")}}</as-button>
                    </el-form-item>
                    <el-form-item :label="showLabel('sexi') + '/' + showLabel('color')" prop="brandcolor">
                        <el-cascader
                            placeholder=""
                            v-model="product.form.colorId"
                            size="mini"
                            :options="colorSystems"
                            :props="{ children: 'colors', value: 'id', label: 'title' }"
                            clearable>
                        </el-cascader>
                    </el-form-item>
                    <el-form-item :label="showLabel('second_color')">
                        <el-cascader
                            placeholder=""
                            v-model="product.form.secondColorId"
                            size="mini"
                            :show-all-levels="false"
                            :options="colorSystems"
                            :props="{ children: 'colors', value: 'id', label: 'title' }"
                            clearable>
                        </el-cascader>
                    </el-form-item>
                    <el-row class="product">
                        <el-table :data="product.materials" border style="width:90%;">
                            <el-table-column :label="showLabel('caizhiguanli')" align="center">
                                <el-table-column :label="showLabel('caizhi')" align="center">
                                    <template slot-scope="scope">
                                        <el-form-item
                                            :prop="'materials.' + scope.$index + '.materialid'"
                                            :rules="{required: true, trigger: 'change'}"
                                        >
                                            <el-select v-model="scope.row.materialid" size="mini">
                                                <el-option
                                                    v-for="item in materials"
                                                    :key="item.id + item.title"
                                                    :label="item.title"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="showLabel('baifenbi')" align="center" width="90">
                                    <template slot-scope="scope">
                                        <el-form-item
                                            :prop="'materials.' + scope.$index + '.percent'"
                                            :rules="{required: true, trigger: 'blur'}"
                                        >
                                            <el-input v-model="scope.row.percent" size="mini"></el-input>
                                        </el-form-item>
                                    </template>
                                </el-table-column>
                                <el-table-column :label="showLabel('caizhibeizhu')" align="center">
                                    <template slot-scope="scope">
                                        <el-select v-model="scope.row.materialnoteid" size="mini">
                                            <el-option
                                                v-for="item in materialnotes"
                                                :key="item.id + item.title"
                                                :label="item.title"
                                                :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </template>
                                </el-table-column>
                            </el-table-column>
                            <el-table-column width="70">
                                <template slot="header">
                                    <el-button type="success" icon="el-icon-plus" size="mini" @click.stop="handleAppendMaterial"></el-button>
                                </template>
                                <template slot-scope="scope">
                                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="handleRemoveMaterial(scope.$index)"></el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-row>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="showLabel('chandi')" prop="countries">
                        <country v-model="product.form.countries" :data-list="countries"></country>
                    </el-form-item>

                    <el-form-item :label="showLabel('shangpinchicun')">
                        <el-select v-model="product.form.ulnarinch" placeholder="" multiple>
                            <el-option
                                v-for="item of ulnarinches"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="showLabel('shangpinmiaoshu')">
                        <el-select v-model="product.form.productmemoids" placeholder="" multiple>
                            <el-option
                                v-for="item of productMemos"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="_label('cankaobeilv')">
                        <el-row>
                            <el-col :span="8" style="width:80px">{{rate>0?rate : '-' }}</el-col>
                            <el-col :span="16" style="width:50px">{{_label('lingshoubi')}}</el-col>
                            <el-col :span="8" style="width:50px">{{getPriceRate}}</el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item :label="showLabel('chuchangjia')">
                        <el-input placeholder="" v-model="product.form.factoryprice" class="productcurrency">
                            <el-select v-model="product.form.wordpricecurrency" placeholder="" slot="prepend">
                                <el-option
                                    v-for="item of currencies"
                                    :key="item.id + item.code"
                                    :label="item.code"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <span slot="append">{{getRate}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="showLabel('guojilingshoujia')">
                        <el-input placeholder="" v-model="product.form.wordprice" class="productcurrency">
                            <el-select v-model="product.form.wordpricecurrency" placeholder="" slot="prepend">
                                <el-option
                                    v-for="item of currencies"
                                    :key="item.id + item.code"
                                    :label="item.code"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <span slot="append">{{getReciprocalRate}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="showLabel('benguochuchangjia')">
                        <el-input placeholder="" v-model="product.form.nationalfactoryprice" class="productcurrency">
                            <el-select v-model="product.form.nationalpricecurrency" placeholder="" slot="prepend">
                                <el-option
                                    v-for="item of currencies"
                                    :key="item.id + item.code"
                                    :label="item.code"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <span slot="append">{{getRateNational}}</span>
                        </el-input>
                    </el-form-item>
                    <el-form-item :label="showLabel('benguolingshoujia')">
                        <el-input placeholder="" v-model="product.form.nationalprice" class="productcurrency">
                            <el-select v-model="product.form.nationalpricecurrency" placeholder="" slot="prepend">
                                <el-option
                                    v-for="item of currencies"
                                    :key="item.id + item.code"
                                    :label="item.code"
                                    :value="item.id">
                                </el-option>
                            </el-select>
                            <span slot="append">{{getReciprocalRateNational}}</span>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item :label="showLabel('shangpinxilie')">
                        <el-select v-model="product.form.series" placeholder="">
                            <el-option
                                v-for="item of series"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="showLabel('xiaoshoushuxing')">
                        <el-select v-model="product.form.saletypeid" placeholder="">
                            <el-option
                                v-for="item of saletypes"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="showLabel('shangpinshuxing')">
                        <el-select v-model="product.form.producttypeid" placeholder="">
                            <el-option
                                v-for="item of productTypes"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="showLabel('fanghanzhishu')">
                        <el-select v-model="product.form.winterproofingid" placeholder="">
                            <el-option
                                v-for="item of winterProofings"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item :label="showLabel('xingbie')">
                        <sp-radio-group v-model="product.form.gender" source="gender" :span="8" :lang="lang" style="width:270px">
                        </sp-radio-group>
                    </el-form-item>
                    <el-form-item :label="showLabel('jijie')">
                        <div  style="width:270px">
                        <el-col :span="8">
                            <sp-checkbox v-model="product.form.spring">{{showLabel("chun")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="product.form.summer">{{showLabel("xia")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="siji">{{showLabel("siji")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="product.form.fall">{{showLabel("qiu")}}</sp-checkbox>
                        </el-col>
                        <el-col :span="8">
                            <sp-checkbox v-model="product.form.winter">{{showLabel("dong")}}</sp-checkbox>
                        </el-col>
                    </div>
                    </el-form-item>

                    <el-form-item :label="showLabel('beizhu')">
                        <el-input v-model="product.form.memo"></el-input>
                    </el-form-item>

                    <el-form-item :label="showLabel('zuihouruku')">
                        <el-input v-model="product.form.laststoragedate"></el-input>
                    </el-form-item>

                    <el-form-item :label="showLabel('jiandangren')">
                        <sp-display-input :value="product.form.makestaff" source="user" disabled></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="showLabel('jiandangshijian')">
                        <el-input :value="product.form.maketime" disabled></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="6" :offset="9">
                    <as-button auth="product" type="primary" @click="updateProduct">{{showLabel("baocun")}}</as-button>
                    <as-button>{{showLabel("tuichu")}}</as-button>
                </el-col>
            </el-row>
        </div>
    </el-form>
</template>

<script>
import { showLabel } from '@/component/globals.js'
import _ from 'lodash'
import ageseason from './ageseason.vue'
import country from './country.vue'

export default {
    components: { ageseason, country },
    data() {
        return {
            product: {
                form: {},
                materials: []
            },
            ageseasons     : [],
            brands         : [],
            categories     : [],
            sizes          : [],
            materials      : [],
            materialnotes  : [],
            productMemos   : [],
            series         : [],
            colorSystems   : [],
            countries      : [],
            ulnarinches    : [],
            sizecontents   : [],
            currencies     : [],
            saletypes      : [],
            productTypes   : [],
            winterProofings: [],
            rules          : {
                form: {
                    wordcode_1    : [{ required: true, message: showLabel('kuanshi') + showLabel('required') }],
                    wordcode_2    : [{ required: true, message: showLabel('caizhi') + showLabel('required') }],
                    wordcode_3    : [{ required: true, message: showLabel('yanse') + showLabel('required') }],
                    ageseason     : [{ required: true, message: showLabel('niandai') + showLabel('required') }],
                    brandid       : [{ required: true, message: showLabel('pinpai') + showLabel('required'), trigger: 'change' }],
                    childbrand    : [{ required: true, message: showLabel('pinlei') + showLabel('required'), trigger: 'change' }],
                    sizetopid     : [{ required: true, message: showLabel('chimazu') + showLabel('required'), trigger: 'change' }],
                    sizecontentids: [{ required: true, message: showLabel('chimamingxi') + showLabel('required') }]
                }
            }
        }
    },
    created() {
        this.getProductRelatedOptions()
        this.getColorSystemAndColor()
    },
    methods: {
        handleChangeSizeTop() {
            let self = this
            self.sizes.forEach(item => {
                if (item.id == self.product.form.sizetopid) {
                    self.product.form.sizecontentids = []
                    self.sizecontents = item.children
                }
            })
        },
        handleTrimSize() {
            let self = this
            let sizecontentids = []
            self.product.form.sizecontentids.forEach(item => {
                self.sizecontents.forEach(size => {
                    if (size.id == item) {
                        if (size.title.indexOf('.') < 0) {
                            sizecontentids.push(item)
                        }
                    }
                })
            })
            self.product.form.sizecontentids = sizecontentids
        },
        handleRemoveMaterial(index) {
            this.product.materials.splice(index, 1)
        },
        handleAppendMaterial() {
            this.product.materials.push({
                materialid    : "",
                percent       : 100,
                materialnoteid: ""
            })
        },
        handleChangeBrand() {
            let self = this
            self.series = []
            if (self.product.form.brandid) {
                self.brands.forEach(item => {
                    if (self.product.form.brandid == item.id) {
                        self.series = item.series
                    }
                })
            }
        },
        getProduct(id) {
            let self = this
            self._fetch("/product/info", {id: id}).then(res=>{
                if (res.data.ageseason.length) {
                    let ageseasons = _.split(res.data.ageseason, ',')
                    res.data.ageseason = []
                    ageseasons.forEach(item => {
                        res.data.ageseason.push(parseInt(item))
                    })
                }

                res.data.colorId = []
                res.data.colorId.push(parseInt(res.data.color_system_id))
                res.data.colorId.push(parseInt(res.data.color_id))

                res.data.secondColorId = parseInt(res.data.second_color_id)
                res.data.brandid = parseInt(res.data.brandid)

                const childbrand = res.data.childbrand
                res.data.childbrand = []
                res.data.childbrand.push(parseInt(res.data.brandgroupid))
                res.data.childbrand.push(parseInt(childbrand))

                res.data.sizetopid = parseInt(res.data.sizetopid)
                self.sizes.forEach(item => {
                    if (item.id == res.data.sizetopid) {
                        self.sizecontents = item.children
                    }
                })

                if (res.data.sizecontentids.length) {
                    let sizecontentids = _.split(res.data.sizecontentids, ',')
                    res.data.sizecontentids = []
                    sizecontentids.forEach(item => {
                        res.data.sizecontentids.push(parseInt(item))
                    })
                }

                let countries = _.split(res.data.countries, ',')
                res.data.countries = []
                countries.forEach(item => {
                    res.data.countries.push(parseInt(item))
                })

                if (res.data.ulnarinch.length) {
                    let ulnarinches = _.split(res.data.ulnarinch, ',')
                    res.data.ulnarinch = []
                    ulnarinches.forEach(item => {
                        res.data.ulnarinch.push(parseInt(item))
                    })
                }

                if (res.data.productmemoids.length) {
                    let productmemoids = _.split(res.data.productmemoids, ',')
                    res.data.productmemoids = []
                    productmemoids.forEach(item => {
                        res.data.productmemoids.push(parseInt(item))
                    })
                }

                res.data.wordpricecurrency     = parseInt(res.data.wordpricecurrency)
                res.data.nationalpricecurrency = parseInt(res.data.nationalpricecurrency)
                res.data.saletypeid            = parseInt(res.data.saletypeid)
                res.data.saletypeid            = (res.data.saletypeid == 0) ? '' : res.data.saletypeid
                res.data.producttypeid         = parseInt(res.data.producttypeid)
                res.data.producttypeid         = (res.data.producttypeid == 0) ? '' : res.data.producttypeid
                res.data.winterproofingid      = parseInt(res.data.winterproofingid)
                res.data.winterproofingid      = (res.data.winterproofingid == 0) ? '' : res.data.winterproofingid
                
                if (res.data.materials.length) {
                    res.data.materials.forEach(material => {
                        material.materialid = parseInt(material.materialid)
                        material.materialnoteid = parseInt(material.materialnoteid)
                    })
                }

                self.product.form = res.data
                self.product.materials = res.data.materials
                self.handleChangeBrand()
            })
        },
        getProductRelatedOptions() {
            let self = this
            self._fetch("/product/getProductRelatedOptions", {}).then(function(res) {
                self.ageseasons      = res.data.ageseasons
                self.brands          = res.data.brands
                self.categories      = res.data.categories
                self.sizes           = res.data.sizes
                self.materials       = res.data.materials
                self.materialnotes   = res.data.materialnotes
                self.productMemos    = res.data.productMemos
                self.countries       = res.data.countries
                self.ulnarinches     = res.data.ulnarinches
                self.currencies      = res.data.currencies
                self.saletypes       = res.data.saletypes
                self.productTypes    = res.data.productTypes
                self.winterProofings = res.data.winterProofings

                self.series = []
                res.data.brands.forEach(item => {
                    self.series.push.apply(self.series, item.series)
                })

                self.getProduct(self.$route.params.id)
            })
        },
        getColorSystemAndColor() {
            let self = this
            if (self.colorSystems.length == 0) {
                self._fetch("/color/getColorSystemAndColorForCascader", {}).then(function(res) {
                    self.colorSystems = res.data
                })
            }
        },
        updateProduct() {
            let self = this

            let params = {}
            params = Object.assign({}, self.product)

            this.$refs['productForm'].validate((valid) => {
                if (valid) {
                    let options = {
                        successTip: "success",
                        isReject: true
                    }
                    self._submit("/product/edit", { params: JSON.stringify(params) }, options).then(function(res) {
                    })
                }
            })
        }
    }
}
</script>