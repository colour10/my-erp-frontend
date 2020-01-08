<template>
    <el-form ref="productForm" :rules="rules" :model="product" label-width="85px" :inline="true" size="mini" :inline-message="false" :show-message="false">
        <el-row class="product">
            <el-col :span="24">
                <el-table :data="product.colors" border style="width:100%;">
                    <el-table-column :label="showLabel('guojima')" align="center">
                        <el-table-column :label="showLabel('kuanshi')" width="140" align="center">
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="'colors.' + scope.$index + '.wordcode_1'"
                                    :rules="{required: true, trigger: 'blur'}"
                                >
                                    <el-input v-model="scope.row.wordcode_1" size="mini"/>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column :label="showLabel('caizhi')" width="140" align="center">
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="'colors.' + scope.$index + '.wordcode_2'"
                                    :rules="{required: true, trigger: 'blur'}"
                                >
                                    <el-input v-model="scope.row.wordcode_2" size="mini"/>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column :label="showLabel('yanse')" width="140" align="center">
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="'colors.' + scope.$index + '.wordcode_3'"
                                    :rules="{required: true, trigger: 'blur'}"
                                >
                                    <el-input v-model="scope.row.wordcode_3" size="mini"/>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column :label="showLabel('fuzhuma')" width="130" align="center">
                            <template v-slot="{ row }">
                                <el-input v-model="row.wordcode_4" size="mini"/>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column :label="showLabel('yansemingcheng')" width="150" align="center">
                        <template v-slot="{ row }">
                            <el-input v-model="row.colorname" size="mini"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="brandcolor" :label="showLabel('sexi') + '/' + showLabel('color')" width="200" align="center">
                        <template slot-scope="scope">
                            <el-form-item
                                    :prop="'colors.' + scope.$index + '.colorId'"
                                    :rules="{required: true, trigger: 'change'}"
                                >
                                <el-cascader
                                    placeholder=""
                                    v-model="scope.row.colorId"
                                    size="mini"
                                    :options="colorSystems"
                                    :props="{ children: 'colors', value: 'id', label: 'title' }"
                                    clearable>
                                </el-cascader>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column prop="brandcolor" :label="showLabel('second_color')" width="140" align="center">
                        <template v-slot="{ row }">
                            <el-cascader
                                placeholder=""
                                v-model="row.secondColorId"
                                size="mini"
                                :show-all-levels="false"
                                :options="colorSystems"
                                :props="{ children: 'colors', value: 'id', label: 'title' }"
                                clearable>
                            </el-cascader>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" align="center" :label="showLabel('zhutu')">
                        <template v-slot="{ row }">
                            <simple-avatar v-model="row.picture" font-size="14px" :size="35"></simple-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column width="80" align="center" :label="showLabel('futu')">
                        <template v-slot="{ row }">
                            <simple-avatar v-model="row.picture2" font-size="14px" :size="35"></simple-avatar>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('caozuo')" align="center">
                        <template v-slot="scope">
                            <as-button type="danger" @click="handleRemoveColor(scope.$index)" v-if="scope.$index>0">{{showLabel("shanchu")}}</as-button>
                            <asa-button :enable="_isAllowed('product')" @click="handleAppendColors" v-if="scope.$index==0">{{showLabel("zhuijia")}}</asa-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div class="order-form" style="width:100%;margin-top:5px;" >
            <el-row :gutter="0">
                <el-col :span="8">
                    <el-form-item :label="showLabel('niandai')" prop="form.ageseason">
                        <el-select v-model="product.form.ageseason" multiple placeholder="">
                            <el-option
                                v-for="item of ageseasons"
                                :key="item.id + item.sessionmark + item.name"
                                :label="item.sessionmark + item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
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
                    <el-form-item :label="showLabel('chimazu')" prop="form.sizetopid">
                        <el-select v-model="product.form.sizetopid" placeholder="" @change="handleChangeSizeTop">
                            <el-option
                                v-for="item of sizes"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="showLabel('chimamingxi')" prop="form.sizecontentids">
                        <el-select v-model="product.form.sizecontentids" placeholder="" multiple>
                            <el-option
                                v-for="item of sizecontents"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                        <as-button @click="onTrimSize" class="trimhalf">{{showLabel("qubanma")}}</as-button>
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
                        <el-select v-model="product.form.countries" placeholder="" multiple>
                            <el-option
                                v-for="item of countries"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
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

                    <el-form-item :label="showLabel('cankaobeilv')">
                        <el-row>
                            <el-col :span="8" style="width:80px">{{rate>0?rate : '-' }}</el-col>
                            <el-col :span="16" style="width:50px">{{showLabel('lingshoubi')}}</el-col>
                            <el-col :span="8" style="width:50px">{{getPriceRate}}</el-col>
                        </el-row>
                    </el-form-item>

                    <el-form-item :label="showLabel('chuchangjia')">
                        <el-input placeholder="" v-model="product.form.factoryprice" class="productcurrency" ref="factoryprice" @focus="onPriceFocus('factoryprice');watcherprice.start()" @blur="watcherprice.stop()">
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
                        <el-input placeholder="" v-model="product.form.wordprice" class="productcurrency" ref="wordprice" @focus="onPriceFocus('wordprice')">
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
                        <el-input placeholder="" v-model="product.form.nationalfactoryprice" class="productcurrency" ref="nationalfactoryprice" @focus="onPriceFocus('nationalfactoryprice')">
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
                        <el-input placeholder="" v-model="product.form.nationalprice" class="productcurrency" ref="nationalprice" @focus="onPriceFocus('nationalprice')">
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
                        <as-button class="trimhalf" @click="onAddSeries">{{showLabel("xinjian")}}</as-button>
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
                        <simple-select v-model="product.form.winterproofingid" source="winterproofing"></simple-select>
                    </el-form-item>

                    <el-form-item :label="showLabel('xingbie')">
                        <sp-radio-group v-model="product.form.gender" source="gender" :span="8" :lang="lang" class="supermini" style="width:270px">
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
                        <el-input v-model="product.form.memo"/>
                    </el-form-item>
                </el-col>
            </el-row>
        </div>

        <el-row :gutter="0">
            <el-col :span="24" style="text-align:center;">
                <as-button auth="product" type="primary" @click="createProduct">{{showLabel("baocun")}}</as-button>
                <as-button type="primary" @click="hideDialogForm">{{showLabel("tuichu")}}</as-button>
            </el-col>
        </el-row>
    </el-form>
</template>

<script>
import globals, { showLabel } from '@/component/globals.js'
import _ from 'lodash'

const defaultColor = {
    brandcolor: "",
    wordcode_1: "",
    wordcode_2: "",
    wordcode_3: "",
    wordcode_4: "",
    picture: "",
    picture2: "",
    colorname: ""
}

const defaultProduct = {
    colors: [],
    materials: [],
    form: {
        ageseason            : [],
        brandid              : "",
        brandgroupid         : "",
        childbrand           : "",
        sizetopid            : "",
        sizecontentids       : [],
        countrie             : "",
        ulnarinch            : "",
        productmemoids       : "",
        factoryprice         : "",
        factorypricecurrency : 9,
        wordprice            : "",
        wordpricecurrency    : 9,
        nationalfactoryprice : "",
        nationalprice        : "",
        nationalpricecurrency: 7,
        series               : "",
        saletypeid           : "",
        producttypeid        : "",
        winterproofingid     : "",
        gender               : "",
        spring               : "",
        summer               : "",
        fall                 : "",
        winter               : "",
        memo                 : "",
        countries            : "",
        colorId              : "",
        secondColorId        : ""
    }
}

export default {
    data() {
        return {
            ageseasons   : [],
            brands       : [],
            categories   : [],                                  // 品类 子品类
            sizes        : [],
            sizecontents : [],
            materials    : [],
            materialnotes: [],
            productMemos : [],
            countries    : [],
            ulnarinches  : [],
            series       : [],
            colorSystems : [],
            currencies   : [],
            saletypes    : [],
            productTypes : [],
            product      : Object.assign({}, defaultProduct),
            rules        : {
                form: {
                    ageseason     : [{ required: true, message: showLabel('niandai') + showLabel('required') }],
                    brandid       : [{ required: true, message: showLabel('pinpai') + showLabel('required'), trigger: 'change' }],
                    childbrand    : [{ required: true, message: showLabel('pinlei') + showLabel('required'), trigger: 'change' }],
                    sizetopid     : [{ required: true, message: showLabel('chimazu') + showLabel('required'), trigger: 'change' }],
                    sizecontentids: [{ required: true, message: showLabel('chimamingxi') + showLabel('required') }]
                }
            }
        }
    },
    mounted() {
        this.resetDialogForm()
        this.getProductRelatedOptions()
    },
    methods: {
        handleChangeBrand() {
            let self = this
            self.series = []
            self.product.form.series = ''
            if (self.product.form.brandid) {
                self.brands.forEach(item => {
                    if (self.product.form.brandid == item.id) {
                        console.log(item)
                        self.series = item.series
                    }
                })
            }
        },
        hideDialogForm() {
            this.$emit('hideDialogForm')
        },
        handleChangeSizeTop() {
            let self = this
            self.sizes.forEach(item => {
                if (item.id == self.product.form.sizetopid) {
                    self.product.form.sizecontentids = []
                    self.sizecontents = item.children
                }
            })
        },
        handleRemoveMaterial(index) {
            this.product.materials.splice(index, 1)
        },
        handleAppendMaterial() {
            this.product.materials.push({
                materialid: "",
                percent: 100,
                materialnoteid: ""
            })
        },
        handleRemoveColor(index) {
            this.product.colors.splice(index, 1)
        },
        handleAppendColors() {
            this.product.colors.push(Object.assign({}, defaultColor))
        },
        getColorSystemAndColor() {
            let self = this
            if (self.colorSystems.length == 0) {
                self._fetch("/color/getColorSystemAndColorForCascader", {}).then(function(res) {
                    self.colorSystems = res.data
                })
            }
        },
        getProductRelatedOptions() {
            let self = this
            self._fetch("/product/getProductRelatedOptions", {}).then(function(res) {
                self.ageseasons    = res.data.ageseasons
                self.brands        = res.data.brands
                self.categories    = res.data.categories
                self.sizes         = res.data.sizes
                self.materials     = res.data.materials
                self.materialnotes = res.data.materialnotes
                self.productMemos  = res.data.productMemos
                self.countries     = res.data.countries
                self.ulnarinches   = res.data.ulnarinches
                self.currencies    = res.data.currencies
                self.saletypes     = res.data.saletypes
                self.productTypes  = res.data.productTypes
            })
        },
        resetDialogForm() {
            this.product = {
                colors: [],
                materials: [],
                form: {
                    ageseason            : [],
                    brandid              : "",
                    brandgroupid         : "",
                    childbrand           : "",
                    sizetopid            : "",
                    sizecontentids       : [],
                    countrie             : "",
                    ulnarinch            : "",
                    productmemoids       : "",
                    factoryprice         : "",
                    factorypricecurrency : 9,
                    wordprice            : "",
                    wordpricecurrency    : 9,
                    nationalfactoryprice : "",
                    nationalprice        : "",
                    nationalpricecurrency: 7,
                    series               : "",
                    saletypeid           : "",
                    producttypeid        : "",
                    winterproofingid     : "",
                    gender               : "",
                    spring               : "",
                    summer               : "",
                    fall                 : "",
                    winter               : "",
                    memo                 : "",
                    countries            : "",
                    colorId              : "",
                    secondColorId        : ""
                }
            }
            this.product.colors.push(Object.assign({}, defaultColor))
            this.getColorSystemAndColor()
        },
        createProduct() {
            let self = this

            self.product.form.countries = _.join(self.product.form.countries, ',')
            let params = {}
            params = Object.assign({}, self.product)

            this.$refs['productForm'].validate((valid) => {
                if (valid) {
                    self._submit("/product/add", { params: JSON.stringify(params) }).then(function(res) {
                        self.hideDialogForm()
                        self.reloadList()
                    })
                }
            })
        }
    }
}
</script>