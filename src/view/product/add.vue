<template>
    <div>
        <el-form ref="productForm" :rules="rules" :model="product" label-width="85px" :inline="true" size="mini" :inline-message="false" :show-message="false">
            <el-row class="product" style="margin-bottom: 20px;">
                <el-col :span="24">
                    <el-form-item :label="showLabel('pinpai')" prop="form.brandid">
                        <el-select v-model="product.form.brandid" placeholder="" @change="handleChangeBrand" filterable size="small">
                            <el-option
                                v-for="item of brands"
                                :key="item.id + item.title"
                                :label="item.title"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item :label="showLabel('niandai')" prop="form.ageseason">
                        <ageseason v-model="product.form.ageseason" :data-list="ageseasons" size="small"></ageseason>
                    </el-form-item>
                    <el-form-item :label="showLabel('xingbie')">
                        <sp-radio-group v-model="product.form.gender" source="gender" :span="8" :lang="lang" class="supermini" style="width:270px">
                        </sp-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row class="product">
                <el-col :span="24">
                    <el-table :data="product.colors" border style="width:100%;">
                        <el-table-column :label="showLabel('guojima')" align="center">
                            <el-table-column :label="showLabel('kuanshi')" width="140" align="center" v-if="!worldcode.one.disabled">
                                <template slot-scope="scope">
                                    <el-form-item
                                        :prop="'colors.' + scope.$index + '.wordcode_1'"
                                        :rules="[{required: true, trigger: 'blur'}, {min: worldcode.one.minlength, max: worldcode.one.maxlength, triggger: 'blur'}]"
                                    >
                                        <el-input v-model="scope.row.wordcode_1" size="mini"
                                            @keyup.native="handleKeyInput(scope.row, 'wordcode_1')"/>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column :label="showLabel('caizhi')" width="140" align="center" v-if="!worldcode.two.disabled">
                                <template slot-scope="scope">
                                    <el-form-item
                                        :prop="'colors.' + scope.$index + '.wordcode_2'"
                                        :rules="[{required: true, trigger: 'blur'}, {min: worldcode.two.minlength, max: worldcode.two.maxlength, triggger: 'blur'}]"
                                    >
                                        <el-autocomplete
                                            :maxlength="worldcode.one.maxlength"
                                            @keyup.native="handleKeyInput(scope.row, 'wordcode_2')"
                                            v-model="scope.row.wordcode_2"
                                            :fetch-suggestions="querySearchWordCode(scope.row)"
                                            @select="handleSelect($event, scope.row)"
                                            popper-class="wordcode-autocomplete"
                                            :trigger-on-focus="false"
                                        > 
                                            <template slot-scope="props">
                                                <div class="wordcode">{{ props.item.worldcode }}</div>
                                                <div class="name">{{ props.item.name }}</div>
                                            </template>
                                        </el-autocomplete>
                                    </el-form-item>
                                </template>
                            </el-table-column>
                            <el-table-column :label="showLabel('yanse')" width="140" align="center" v-if="!worldcode.three.disabled">
                                <template slot-scope="scope">
                                    <el-form-item
                                        :prop="'colors.' + scope.$index + '.wordcode_3'"
                                        :rules="[{required: true, trigger: 'blur'}, {min: worldcode.three.minlength, max: worldcode.three.maxlength, triggger: 'blur'}]"
                                    >
                                        <el-input v-model="scope.row.wordcode_3" size="mini"
                                            @keyup.native="handleKeyInput(scope.row, 'wordcode_3')"/>
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
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.colorname" size="mini"
                                    @keyup.native="handleKeyInput(scope.row, 'colorname')"/>
                            </template>
                        </el-table-column>
                        <el-table-column :label="showLabel('sexi')">
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="'colors.' + scope.$index + '.colorSystemId'"
                                    :rules="{required: true, trigger: 'blur'}"
                                >
                                    <el-select v-model="scope.row.colorSystemId" placeholder="" size="mini">
                                        <el-option
                                            v-for="item in colorSystems"
                                            :key="item.id + item.title"
                                            :label="item.title"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </template>
                        </el-table-column>
                        <el-table-column :label="showLabel('yanse')">
                            <template slot-scope="scope">
                                <el-form-item
                                    :prop="'colors.' + scope.$index + '.colorId'"
                                    :rules="{required: true, trigger: 'blur'}"
                                >
                                    <el-select v-model="scope.row.colorId" placeholder="" size="mini">
                                        <el-option
                                            v-for="item in filterColors(scope.row)"
                                            :key="item.id + item.title"
                                            :label="item.title"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
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
                                <as-button type="danger" @click="handleRemoveColor(scope.$index, scope.row)" v-if="scope.$index>0">{{showLabel("shanchu")}}</as-button>
                                <asa-button :enable="_isAllowed('product')" @click="handleAppendColors" v-if="scope.$index==0">{{showLabel("zhuijia")}}</asa-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
            <div class="order-form" style="width:100%;margin-top:5px;" >
                <el-row :gutter="0">
                    <el-col :span="8">
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
                            <sizetop v-model="product.form.sizetopid"
                                :sizes="filterSizes"
                                :brand_id="product.form.brandid"
                                :category="product.form.childbrand"
                                :gender="product.form.gender"
                                @reloadSizetops="reloadSizetops"
                            ></sizetop>
                        </el-form-item>
                        <el-row class="product">
                            <el-table :data="product.materials" border style="width:90%;">
                                <el-table-column :label="showLabel('caizhiguanli')" align="center">
                                    <el-table-column :label="showLabel('caizhibeizhu')" align="center">
                                        <template slot-scope="scope">
                                            <el-select v-model="scope.row.materialnoteid" size="mini" @change="handleChangeMaterialnote(scope.$index)">
                                                <el-option
                                                    v-for="item in filtedMaterialnotes"
                                                    :key="item.id + item.title"
                                                    :label="item.title"
                                                    :value="item.id">
                                                </el-option>
                                            </el-select>
                                        </template>
                                    </el-table-column>
                                    <el-table-column :label="showLabel('caizhi')" align="center">
                                        <template slot-scope="scope">
                                            <el-form-item
                                                :prop="'materials.' + scope.$index + '.materialid'"
                                                :rules="{required: true, trigger: 'change'}"
                                            >
                                                <el-select v-model="scope.row.materialid" size="mini">
                                                    <el-option
                                                        v-for="item in filtedMaterials[scope.$index]"
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
                            <ulnarinch v-model="product.form.ulnarinch" :data-list="ulnarinches"></ulnarinch>
                        </el-form-item>

                        <el-form-item :label="showLabel('shangpinmiaoshu')">
                            <product-memo v-model="product.form.productmemoids" :data-list="filtedProductMemos"></product-memo>
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
                            <as-button class="trimhalf" @click="handleAddSeries">{{showLabel("xinjian")}}</as-button>
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

        <el-dialog :title="showLabel('chuangjianxinxilie')"
            :visible.sync="seriesDialogVisible"
            :center="true" :append-to-body="true"
            width="400px"
        >
            <el-form ref="seriesForm" :model="newSeries" :inline="true" :rules="newSeriesRules">
              <el-form-item :label="showLabel('name', 'cn')" prop="name_cn">
                  <el-input v-model="newSeries.name_cn"></el-input>
              </el-form-item>
              <el-form-item :label="showLabel('name', 'en')" prop="name_en">
                  <el-input v-model="newSeries.name_en"></el-input>
              </el-form-item>
              <el-form-item :label="showLabel('name', 'it')" prop="name_it">
                  <el-input v-model="newSeries.name_it"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="cancleAddSeries">
                    {{ showLabel('quxiao') }}
                </el-button>
                <el-button type="primary" @click="saveSeries">
                    {{ showLabel('baocun') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import globals, { showLabel } from '@/component/globals.js'
import _ from 'lodash'
import ageseason from './components/ageseason.vue'
import country from './components/country.vue'
import ulnarinch from './components/ulnarinch.vue'
import size from './components/size.vue'
import sizetop from './components/sizetop.vue'
import productMemo from './components/productMemo.vue'

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
    id: 0,
    colors: [],
    materials: [],
    form: {
        ageseason            : [],
        brandid              : "",
        brandgroupid         : "",
        childbrand           : [],
        sizetopid            : "",
        sizecontentids       : [],
        countries            : "",
        ulnarinch            : [],
        productmemoids       : [],
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
        countries            : [],
        colorSystemId        : "",
        colorId              : "",
        secondColorId        : ""
    }
}

export default {
    components: { ageseason, country, ulnarinch, size, productMemo, sizetop },
    data() {
        return {
            filtedMaterials: [],
            ageseasons     : [],
            brands         : [],
            categories     : [],                                  // 品类 子品类
            sizes          : [],
            sizecontents   : [],
            materials      : [],
            materialnotes  : [],
            productMemos   : [],
            countries      : [],
            ulnarinches    : [],
            series         : [],
            colorSystems   : [],
            currencies     : [],
            saletypes      : [],
            productTypes   : [],
            winterProofings: [],
            product        : Object.assign({}, defaultProduct),
            rules          : {
                form: {
                    ageseason     : [{ required: true, message: showLabel('niandai') + showLabel('required'), trigger: 'blur' }],
                    brandid       : [{ required: true, message: showLabel('pinpai') + showLabel('required'), trigger: 'blur' }],
                    childbrand    : [{ required: true, message: showLabel('pinlei') + showLabel('required'), trigger: 'blur' }],
                    sizetopid     : [{ required: true, message: showLabel('chimazu') + showLabel('required'), trigger: 'blur' }],
                    sizecontentids: [{ required: true, message: showLabel('chimamingxi') + showLabel('required'), trigger: 'blur' }]
                }
            },
            seriesDialogVisible: false,
            newSeries: {
                brandid: '',
                name_cn: '',
                name_en: '',
                name_it: ''
            },
            newSeriesRules: {
                name_cn: [{ required: true, message: showLabel('name', 'cn') + showLabel('required'), trigger: 'blur' }],
                name_en: [{ required: true, message: showLabel('name', 'en') + showLabel('required'), trigger: 'blur' }],
                name_it: [{ required: true, message: showLabel('name', 'it') + showLabel('required'), trigger: 'blur' }]
            },
            timeout: undefined,
            siji: '',
            lang: showLabel("lang")
        }
    },
    mounted() {
        this.resetDialogForm()
        this.getProductRelatedOptions()
    },
    watch: {
        siji: function(newValue) {
            this.product.form.spring = newValue
            this.product.form.summer = newValue
            this.product.form.fall   = newValue
            this.product.form.winter = newValue
        },
    },
    computed: {
        filterSizes() {
            let sizes  = [
                {
                    label: 'recomend',
                    options: []
                },
                {
                    label: 'others',
                    options: []
                }
            ]

            sizes[1].options = this.sizes

            let self = this
            if (this.product.form.brandid) {
                let brand = this.brands.find(function (item) {
                    return item.id == self.product.form.brandid
                })

                let sizetopIds = []
                if (typeof(brand) != 'undefined') {
                    brand.sizes.forEach(item => {
                        if (_.isEmpty(self.product.form.gender) && _.isEmpty(self.product.form.childbrand)) {
                            sizetopIds.push(item.sizetop_id)
                        } else {
                            let isMatched = true

                            if (self.product.form.gender) {
                                if (item.gender != self.product.form.gender) {
                                    isMatched = false
                                }
                            }

                            if (isMatched && !_.isEmpty(self.product.form.childbrand)) {
                                let brandgroupchild_id = this.product.form.childbrand[1].toString()

                                if (brandgroupchild_id != item.brandgroupchild_id) {
                                    isMatched = false
                                }
                            }

                            if (isMatched) {
                                sizetopIds.push(item.sizetop_id)
                            }
                        }
                    })
                }

                sizes[0].options = this.sizes.filter(item => {
                    let sizeId = item.id.toString()
                    return (_.indexOf(sizetopIds, sizeId) >= 0)
                })

                sizes[1].options = this.sizes.filter(item => {
                    let sizeId = item.id.toString()
                    return (_.indexOf(sizetopIds, sizeId) < 0)
                })
            }

            return sizes
        },
        filtedProductMemos() {
            if (!_.isEmpty(this.product.form.childbrand)) {
                let childbrandId = this.product.form.childbrand[1].toString()
                return this.productMemos.filter(function (item) {
                    return (_.indexOf(item.productMemoIds, childbrandId) === 0)
                })
            } else {
                return this.productMemos
            }
        },
        filtedMaterialnotes() {
            this.product.materials.forEach(item => {
                item.materialnoteid = ''
            })

            if (this.product.form.childbrand) {
                let childbrandId = this.product.form.childbrand[0].toString()
                return this.materialnotes.filter(function (item) {
                    return (_.indexOf(item.brandgroupids, childbrandId) === 0)
                })
            } else {
                return this.materialnotes
            }
        },
        worldcode() {
            let worldcode = {
                one: {
                    maxlength: 99,
                    minlength: 0,
                    disabled: false
                },
                two: {
                    maxlength: 99,
                    minlength: 0,
                    disabled: false
                },
                three: {
                    maxlength: 99,
                    minlength: 0,
                    disabled: false
                }
            }

            let self = this
            if (this.product.form.brandid) {
                let brand = this.brands.find(function (item) {
                    return item.id == self.product.form.brandid
                })

                if (brand.worldcode1 != null) {
                    if (_.startsWith(brand.worldcode1, 'disabled')) {
                        worldcode.one.disabled = true
                    } else {
                        let worldcode1 = brand.worldcode1.split(',')
                        switch (worldcode1[0]) {
                            case '<=':
                                worldcode.one.maxlength = parseInt(worldcode1[1])
                                break

                            case '>=':
                                worldcode.one.minlength = parseInt(worldcode1[1])
                                break
                        
                            case '=':
                                worldcode.one.maxlength = parseInt(worldcode1[1])
                                worldcode.one.minlength = parseInt(worldcode1[1])
                                break;
                        }
                    }
                }
                if (brand.worldcode2 != null) {
                    if (_.startsWith(brand.worldcode2, 'disabled')) {
                        worldcode.two.disabled = true
                    } else {
                        let worldcode2 = brand.worldcode2.split(',')
                        switch (worldcode2[0]) {
                            case '<=':
                                worldcode.two.maxlength = parseInt(worldcode2[1])
                                break

                            case '>=':
                                worldcode.two.minlength = parseInt(worldcode2[1])
                                break
                        
                            case '=':
                                worldcode.two.maxlength = parseInt(worldcode2[1])
                                worldcode.two.minlength = parseInt(worldcode2[1])
                                break;
                        }
                    }
                }
                if (brand.worldcode3 != null) {
                    if (_.startsWith(brand.worldcode3, 'disabled')) {
                        worldcode.three.disabled = true
                    } else {
                        let worldcode3 = brand.worldcode3.split(',')
                        switch (worldcode3[0]) {
                            case '<=':
                                worldcode.three.maxlength = parseInt(worldcode3[1])
                                break

                            case '>=':
                                worldcode.three.minlength = parseInt(worldcode3[1])
                                break
                        
                            case '=':
                                worldcode.three.maxlength = parseInt(worldcode3[1])
                                worldcode.three.minlength = parseInt(worldcode3[1])
                                break;
                        }
                    }
                }
            }

            return worldcode
        }
    },
    methods: {
        filterColors(row) {
            if (row.colorSystemId) {
                let colorSystem = this.colorSystems.find(item => {
                    return item.id == row.colorSystemId
                })

                if (typeof(colorSystem) != 'undefined') {
                    return colorSystem.colors
                }
            }
            return []
        },
        reloadSizetops() {
            this.getProductRelatedOptions()
        },
        handleChangeMaterialnote(index) {
            this.product.materials[index].materialid = ''

            let noteId = this.product.materials[index].materialnoteid.toString()
            this.filtedMaterials[index] = this.materials.filter(function(item) {
                let materialnoteids = _.isEmpty(item.materialnoteids) ? [] : item.materialnoteids.split(',')
                return (_.indexOf(materialnoteids, noteId) >= 0)
            })
        },
        querySearchWordCode(row) {
            let self = this
            return function(queryString, cb) {
                let results = []
                if (queryString.length > 3) {
                    let wordcode = row.wordcode_1 + queryString
                    let params = {
                        page: 1,
                        pageSize: 20,
                        wordcode: wordcode
                    }
                    self._fetch("/product/page", params).then(function(res) {
                        results = res.data
                    })

                    clearTimeout(this.timeout)
                    this.timeout = setTimeout(() => {
                        cb(results)
                    }, 3000 * Math.random())
                }
            }
            
        },
        handleSelect(select, row) {
            let self = this

            self._fetch("/product/getcolorgrouplist", { id: select.id }).then(function(res) {
                self.product.colors = []
                res.data.forEach(function(row, index) {
                    if (_.isEmpty(row.color_system_id) || _.isEmpty(row.color_id)) {
                        row.colorId = ''
                    } else {
                        row.colorId = []
                        row.colorId.push(parseInt(row.color_system_id))
                        row.colorId.push(parseInt(row.color_id))
                    }

                    row.secondColorId = parseInt(row.second_color_id)

                    self.product.colors.push(row)
                })
            })

            if (select.ageseason.length) {
                let ageseasons = _.split(select.ageseason, ',')
                self.product.form.ageseason = []
                ageseasons.forEach(item => {
                    self.product.form.ageseason.push(parseInt(item))
                })
            }

            self.product.id = select.id
            self.product.form.brandid = select.brandid

            const childbrand = select.childbrand
            self.product.form.childbrand = []
            self.product.form.childbrand.push(parseInt(select.brandgroupid))
            self.product.form.childbrand.push(parseInt(childbrand))
            self.product.form.sizetopid = select.sizetopid
            self.handleChangeSizeTop()
            if (select.sizecontentids.length) {
                let sizecontentids = _.split(select.sizecontentids, ',')
                self.product.form.sizecontentids = []
                sizecontentids.forEach(item => {
                    self.product.form.sizecontentids.push(parseInt(item))
                })
            }

            if (select.countries.length) {
                let countries = _.split(select.countries, ',')
                select.countries = []
                countries.forEach(item => {
                    self.product.form.countries.push(parseInt(item))
                })
            }

            if (select.ulnarinch.length) {
                let ulnarinches = _.split(select.ulnarinch, ',')
                select.ulnarinch = []
                ulnarinches.forEach(item => {
                    self.product.form.ulnarinch.push(parseInt(item))
                })
            }

            if (select.productmemoids.length) {
                let productmemoids = _.split(select.productmemoids, ',')
                select.productmemoids = []
                productmemoids.forEach(item => {
                    self.product.form.productmemoids.push(parseInt(item))
                })
            }

            self.product.form.wordpricecurrency     = parseInt(select.wordpricecurrency)
            self.product.form.nationalpricecurrency = parseInt(select.nationalpricecurrency)
            self.product.form.saletypeid            = parseInt(select.saletypeid)
            self.product.form.saletypeid            = (self.product.form.saletypeid == 0) ? '' : self.product.form.saletypeid
            self.product.form.producttypeid         = parseInt(select.producttypeid)
            self.product.form.producttypeid         = (self.product.form.producttypeid == 0) ? '' : self.product.form.producttypeid
            self.product.form.winterproofingid      = parseInt(select.winterproofingid)
            self.product.form.winterproofingid      = (self.product.form.winterproofingid == 0) ? '' : self.product.form.winterproofingid
            self.product.form.gender                = select.gender
            self.product.form.spring                = select.spring
            self.product.form.summer                = select.summer
            self.product.form.fall                  = select.fall
            self.product.form.winter                = select.winter
            self.product.form.memo                  = select.memo
        },
        cancleAddSeries() {
            this.seriesDialogVisible = false
            this.newSeries = {
                brandid: '',
                name_cn: '',
                name_en: '',
                name_it: ''
            }
        },
        saveSeries() {
            let self = this

            this.$refs['seriesForm'].validate((valid) => {
                if (valid) {
                    let params = {}
                    self.newSeries.brandid = self.product.form.brandid
                    params = Object.assign({}, self.newSeries)

                    self._submit("/series/add", params).then(function(res) {
                        self.getProductRelatedOptions()
                        self.seriesDialogVisible = false
                    })
                }
            })
        },
        handleAddSeries() {
            let self = this

            if (self.product.form.brandid > 0) {
                this.seriesDialogVisible = true
            } else {
                self._info(self._label("tip-pinpai"))
            }
        },
        handleKeyInput(target, columnName){
            target[columnName] = target[columnName].toUpperCase();
            if (columnName == 'wordcode_3') {
                let colors = this.suggestColorNames.filter(item => {
                    return (item.wordcode_3 == target[columnName])
                })

                if (colors.length) {
                    target.colorname = colors[0].colorname
                }
            }
        },
        handleChangeBrand() {
            let self = this
            self.series = []
            self.product.form.series = ''
            if (self.product.form.brandid) {
                self.brands.forEach(item => {
                    if (self.product.form.brandid == item.id) {
                        self.series = item.series
                    }
                })
            }

            this.getSuggestColorName()
        },
        getSuggestColorName() {
            let self = this
            this._fetch("/brand/getSuggestColorName", {brandid: this.product.form.brandid}).then(function(res) {
                self.suggestColorNames = res.data
            })
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
            this.filtedMaterials.splice(index, 1)
        },
        handleAppendMaterial() {
            this.product.materials.push({
                materialid    : "",
                percent       : 100,
                materialnoteid: ""
            })
            this.filtedMaterials.push(this.materials)
        },
        handleRemoveColor(index, row) {
            let self = this
            if (!_.isEmpty(row.wordcode_1) || !_.isEmpty(row.wordcode_2) || !_.isEmpty(row.wordcode_3) ) {
                self.$confirm(showLabel('quedingshanchu'), showLabel('tip'), {
                    confirmButtonText: showLabel('queding'),
                    cancelButtonText: showLabel('quxiao'),
                    type: 'warning'
                }).then(() => {
                    self.product.colors.splice(index, 1)
                }).catch(() => {});
            } else {
                self.product.colors.splice(index, 1)
            }
        },
        handleAppendColors() {
            let wordcode_1 = this.product.colors[0].wordcode_1
            let wordcode_2 = this.product.colors[0].wordcode_2
            let color = {
                brandcolor: "",
                wordcode_1: wordcode_1,
                wordcode_2: wordcode_2,
                wordcode_3: "",
                wordcode_4: "",
                picture: "",
                picture2: "",
                colorname: ""
            }
            this.product.colors.push(color)
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

                self.handleChangeBrand()
            })
        },
        resetDialogForm() {
            let ageseason = this.product.form.ageseason
            let brandid   = this.product.form.brandid
            let gender    = this.product.form.gender
            let spring    = this.product.form.spring
            let summer    = this.product.form.summer
            let fall      = this.product.form.fall
            let winter    = this.product.form.winter
            let countries = this.product.form.countries

            this.product = {
                id: 0,
                colors: [],
                materials: [],
                form: {
                    ageseason            : ageseason,
                    brandid              : brandid,
                    brandgroupid         : "",
                    childbrand           : [],
                    sizetopid            : "",
                    sizecontentids       : [],
                    countries            : "",
                    ulnarinch            : [],
                    productmemoids       : [],
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
                    gender               : gender,
                    spring               : spring,
                    summer               : summer,
                    fall                 : fall,
                    winter               : winter,
                    memo                 : "",
                    countries            : countries,
                    colorSystemId        : "",
                    colorId              : "",
                    secondColorId        : ""
                }
            }
            this.product.colors.push(Object.assign({}, defaultColor))
            this.getColorSystemAndColor()
            this.filtedMaterials = []
        },
        createProduct() {
            let self = this

            this.$refs['productForm'].validate((valid) => {
                if (valid) {
                    let params = {}
                    params = Object.assign({}, self.product)

                    self._submit("/product/add", { params: JSON.stringify(params) }).then(function(res) {
                        self.hideDialogForm()
                        self.$emit('reloadList')
                    })
                }
            })
        }
    }
}
</script>


<style>
.wordcode-autocomplete {
    width: 500px !important;
}
.wordcode-autocomplete li{
    line-height: normal;
    padding: 7px;
}

.wordcode {
    text-overflow: ellipsis;
    overflow: hidden;
}
.name {
    font-size: 12px;
    color: #b4b4b4;
}

.highlighted .name {
    color: #ddd;
}

.el-cascader-menu__wrap {
    height: 380px;
}
</style>
