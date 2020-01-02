<template>
    <div>
        <div class="filter-container">
            <el-input size="mini" v-model="listQuery.keyword" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
            <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
                {{ showLabel('search') }}
            </el-button>
            <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-edit" @click="handleCreate">
                {{ showLabel('button-create') }}
            </el-button>
        </div>

        <el-row :gutter="20" class="product">
            <el-col :span="24">
                <el-table v-loading="listLoading" :data="list" border stripe>
                    <el-table-column :label="showLabel('caozuo')" align="center" width="150" class-name="small-padding fixed-width">
                        <template slot-scope="{row}">
                            <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('zhutu')">
                        <template slot-scope="{row}">
                            <img :src="_fileLink(row.picture)" style="max-width: 50px; max-height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('futu')">
                        <template slot-scope="{row}">
                            <img :src="_fileLink(row.picture2)" style="max-width: 50px; max-height: 50px;">
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('shangpinmingcheng')" width="250">
                        <template slot-scope="{row}">
                            {{ row.name }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('niandai')">
                        <template slot-scope="{row}">
                            {{ row.season }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('guojima')" width="200">
                        <template slot-scope="{row}">
                            {{ row.worldcode }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('shangpinshuxing')">
                        <template slot-scope="{row}">
                            {{ row.type }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('chuchangjia')" width="100">
                        <template slot-scope="{row}">
                            {{ row.fpCurrencyCode }} {{ row.factoryprice }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('beilv')">
                        <template slot-scope="{row}">
                            {{ row.times }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('guojilingshoujia')" width="100">
                        <template slot-scope="{row}">
                            {{ row.wpCurrencyCode }} {{ row.wordprice }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('zhekoulv')">
                        <template slot-scope="{row}">
                            {{ row.discountRate }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('benguolingshoujia')" width="100">
                        <template slot-scope="{row}">
                            {{ row.npCurrencyCode }} {{ row.nationalprice }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('xiaoshoushuxing')">
                        <template slot-scope="{row}">
                            {{ row.saleType }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('lingshoubi')">
                        0
                    </el-table-column>
                    <el-table-column :label="showLabel('xilie')">
                        <template slot-scope="{row}">
                            {{ row.series }}
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('zuihouruku')">
                        <template slot-scope="{row}">
                            {{ row.laststoragedate }}
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <el-pagination v-if="list.length<pagination.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.current*1"
            :page-sizes="pagination.pageSizes"
            :page-size="pagination.pageSize*1"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pagination.total*1">
        </el-pagination>

        <el-dialog :title="showLabel('chanpinguanli')" :visible.sync="dialogFormVisible" :center="true" width="1400px" :close-on-click-modal="false" :close-on-press-escape="false">
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
                                    <as-button type="danger" @click="onDeleteColorGroup(scope, scope.row)" v-if="scope.$index>0">{{showLabel("shanchu")}}</as-button>
                                    <asa-button :enable="_isAllowed('product')" @click="handleAppendColors" v-if="scope.$index==0">{{showLabel("zhuijia")}}</asa-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <div class="order-form" style="width:100%;margin-top:5px;" >
                    <el-row :gutter="0">
                        <el-col :span="8">
                            <el-form-item :label="showLabel('niandai')" prop="ageseason">
                                <el-select v-model="product.ageseason" multiple placeholder="">
                                    <el-option
                                        v-for="item of ageseasons"
                                        :key="item.id + item.sessionmark + item.name"
                                        :label="item.sessionmark + item.name"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="showLabel('pinpai')" prop="brandid">
                                <el-select v-model="product.brandid" placeholder="">
                                    <el-option
                                        v-for="item of brands"
                                        :key="item.id + item.title"
                                        :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="showLabel('pinlei')" prop="childbrand">
                                <el-cascader
                                    placeholder=""
                                    v-model="product.childbrand"
                                    size="mini"
                                    :options="categories"
                                    :props="{ value: 'id', label: 'title' }"
                                    clearable>
                                </el-cascader>
                            </el-form-item>
                            <el-form-item :label="showLabel('chimazu')" prop="sizetopid">
                                <el-select v-model="product.sizetopid" placeholder="" @change="handleChangeSizeTop">
                                    <el-option
                                        v-for="item of sizes"
                                        :key="item.id + item.title"
                                        :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item :label="showLabel('chimamingxi')" prop="sizecontentids">
                                <el-select v-model="product.sizecontentids" placeholder="" multiple>
                                    <el-option
                                        v-for="item of sizecontents"
                                        :key="item.id + item.title"
                                        :label="item.title"
                                        :value="item.id">
                                    </el-option>
                                </el-select>
                                <as-button @click="onTrimSize" class="trimhalf">{{showLabel("qubanma")}}</as-button>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="showLabel('caizhi')">
                                <product-material v-model="materials" :brandgroupid="product.brandgroupid"></product-material>
                            </el-form-item>

                            <el-form-item :label="showLabel('chandi')" prop="countries">
                                <simple-select v-model="product.countries" source="country"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('shangpinchicun')">
                                <simple-select v-model="product.ulnarinch" source="ulnarinch" :multiple="true"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('shangpinmiaoshu')">
                                <simple-select v-model="product.productmemoids" source="productmemo" :multiple="true"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('cankaobeilv')">
                                <el-row>
                                    <el-col :span="8" style="width:80px">{{rate>0?rate : '-' }}</el-col>
                                    <el-col :span="16" style="width:50px">{{showLabel('lingshoubi')}}</el-col>
                                    <el-col :span="8" style="width:50px">{{getPriceRate}}</el-col>
                                </el-row>
                            </el-form-item>

                            <el-form-item :label="showLabel('chuchangjia')">
                                <el-input placeholder="" v-model="product.factoryprice" class="productcurrency" ref="factoryprice" @focus="onPriceFocus('factoryprice');watcherprice.start()" @blur="watcherprice.stop()">
                                    <simple-select source="currency" :clearable="false" v-model="product.wordpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getRate}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="showLabel('guojilingshoujia')">
                                <el-input placeholder="" v-model="product.wordprice" class="productcurrency" ref="wordprice" @focus="onPriceFocus('wordprice')">
                                    <simple-select source="currency" :clearable="false" v-model="product.wordpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getReciprocalRate}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="showLabel('benguochuchangjia')">
                                <el-input placeholder="" v-model="product.nationalfactoryprice" class="productcurrency" ref="nationalfactoryprice" @focus="onPriceFocus('nationalfactoryprice')">
                                    <simple-select source="currency" :clearable="false" v-model="product.nationalpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getRateNational}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="showLabel('benguolingshoujia')">
                                <el-input placeholder="" v-model="product.nationalprice" class="productcurrency" ref="nationalprice" @focus="onPriceFocus('nationalprice')">
                                    <simple-select source="currency" :clearable="false" v-model="product.nationalpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getReciprocalRateNational}}</span>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="showLabel('shangpinxilie')">
                                <simple-select v-model="product.series" ref="series" source="series" :parentid="product.brandid"> </simple-select><as-button class="trimhalf" @click="onAddSeries">{{showLabel("xinjian")}}</as-button>
                            </el-form-item>

                            <el-form-item :label="showLabel('xiaoshoushuxing')">
                                <simple-select v-model="product.saletypeid" source="saletype"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('shangpinshuxing')">
                                <simple-select v-model="product.producttypeid" source="producttype"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('fanghanzhishu')">
                                <simple-select v-model="product.winterproofingid" source="winterproofing"></simple-select>
                            </el-form-item>

                            <el-form-item :label="showLabel('xingbie')">
                                <sp-radio-group v-model="product.gender" source="gender" :span="8" :lang="lang" class="supermini" style="width:270px">
                                </sp-radio-group>
                            </el-form-item>
                            <el-form-item :label="showLabel('jijie')">
                                <div  style="width:270px">
                                <el-col :span="8">
                                    <sp-checkbox v-model="product.spring">{{showLabel("chun")}}</sp-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <sp-checkbox v-model="product.summer">{{showLabel("xia")}}</sp-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <sp-checkbox v-model="siji">{{showLabel("siji")}}</sp-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <sp-checkbox v-model="product.fall">{{showLabel("qiu")}}</sp-checkbox>
                                </el-col>
                                <el-col :span="8">
                                    <sp-checkbox v-model="product.winter">{{showLabel("dong")}}</sp-checkbox>
                                </el-col>
                            </div>
                            </el-form-item>

                            <el-form-item :label="showLabel('beizhu')">
                                <el-input v-model="product.memo"/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="0">
                        <el-col :span="24" style="text-align:center;">
                            <as-button auth="product" type="primary" @click="createProduct">{{showLabel("baocun")}}</as-button>
                            <as-button type="primary" @click="hideDialogForm">{{showLabel("tuichu")}}</as-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form>
        </el-dialog>

    </div>
</template>

<script>
import globals, { showLabel } from '../../component/globals.js'
import '../../assets/table.css'
import Material from '../../component/product/material.vue'

const defaultColor = {
    brandcolor: "1",
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
    ageseason: [],
    brandid: "",
    brandgroupid: "",
    childbrand: "",
    sizetopid: "",
    sizecontentids: [],
    countrie: "",
    ulnarinch: "",
    productmemoids: "",
    factoryprice: "",
    wordprice: "",
    wordpricecurrency: "",
    nationalfactoryprice: "",
    nationalprice: "",
    nationalpricecurrency: "",
    series: "",
    saletypeid: "",
    producttypeid: "",
    winterproofingid: "",
    gender: "",
    spring: "",
    summer: "",
    fall: "",
    winter: "",
    memo: "",
    countries: "",
    colorId: "",
    secondColorId: ""
}

export default {
    name: 'product',
    components: {
        [Material.name]: Material
    },
    data() {
        return {
            materials: [],
            product: {},
            // colors: [],
            colorSystems: [],
            dialogFormVisible: false,
            listLoading: true,
            list: [],
            listQuery: {},
            pagination: {
                pageSizes: globals.pageSizes,
                pageSize : 10,
                total    : 0,
                current  : 1
            },
            product: Object.assign({}, defaultProduct),
            ageseasons: [],
            brands: [],
            categories: [], // 品类 子品类
            sizes: [],
            sizecontents: [],
            rules: {
                ageseason: [{ required: true, message: showLabel('niandai') + showLabel('required') }],
                brandid: [{ required: true, message: showLabel('pinpai') + showLabel('required'), trigger: 'change' }],
                childbrand: [{ required: true, message: showLabel('pinlei') + showLabel('required'), trigger: 'change' }],
                sizetopid: [{ required: true, message: showLabel('chimazu') + showLabel('required'), trigger: 'change' }],
                sizecontentids: [{ required: true, message: showLabel('chimamingxi') + showLabel('required') }]
            }
        }
    },
    created() {
        this.getList()
        this.getProductRelatedOptions()

    },
    methods: {
        handleAppendColors() {
            this.product.colors.push(Object.assign({}, defaultColor))
        },
        handleChangeSizeTop() {
            let self = this
            self.sizes.forEach(item => {
                if (item.id == self.product.sizetopid) {
                    self.product.sizecontentids = []
                    self.sizecontents = item.children
                }
            })
        },
        handleCreate() {
            this.resetDialogForm()
            this.showDialogForm()
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize
            this.getList()
        },
        handleCurrentChange(current) {
            this.pagination.current = current
            this.getList()
        },
        showDialogForm() {
            this.dialogFormVisible = true
        },
        hideDialogForm() {
            this.dialogFormVisible = false
        },
        resetDialogForm() {
            // this.initColors()
            this.product = Object.assign({}, defaultProduct)
            this.product.colors.push(Object.assign({}, defaultColor))
            this.getColorSystemAndColor()
        },
        // initColors() {
        //     this.product.colors = []
        //     this.product.colors.push(Object.assign({}, defaultColor))
        //     console.log(this.product.colors.length)
        //     this.getColorSystemAndColor()
        //     // this.getProductRelatedOptions()
        // },
        getProductRelatedOptions() {
            let self = this
            self._fetch("/product/getProductRelatedOptions", {}).then(function(res) {
                self.ageseasons = res.data.ageseasons
                self.brands = res.data.brands
                self.categories = res.data.categories
                self.sizes = res.data.sizes
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
        getList() {
            let self = this
            self.listLoading = true

            let params = Object.assign({
                page: self.pagination.current,
                pageSize: self.pagination.pageSize
            }, self.listQuery)
            self._fetch("/product/page", params).then(function(res) {
                self.list = res.data
                self.pagination = res.pagination
                self.listLoading = false
            })
        },
        reloadList() {
            this.getList()
        },
        createProduct() {
            let self = this

            let params = {}
            // params.form = Object.assign({}, self.product)
            // params.colors = self.colors
            // params.materials = self.materials

            // this.$refs['colorsForm'].validate((validC) => {
            //     if (validC) {
                    this.$refs['productForm'].validate((valid) => {
                        if (valid) {
                            self._submit("/product/add", { params: JSON.stringify(params) }).then(function(res) {
                                self.hideDialogForm()
                                self.reloadList()
                            })
                        }
                    })
            //     }
            // })
            
        }
    }
}
</script>