<template>
    <div>
        <div class="filter-container">
            <el-form ref="searchForm" :inline="true" :model="listQuery" size="mini">
                <el-form-item :label="showLabel('guojima')">
                    <el-input size="mini" v-model="listQuery.wordcode" style="width: 200px;" @keyup.enter.native="handleFilter" />
                </el-form-item>
                <el-form-item :label="showLabel('niandai')">
                    <el-select v-model="listQuery.ageseason" multiple placeholder="">
                        <el-option
                            v-for="item of ageseasons"
                            :key="item.id + item.sessionmark + item.name"
                            :label="item.sessionmark + item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('pinpai')">
                    <el-select v-model="listQuery.brandid" multiple placeholder="" @change="handleChangeBrand">
                        <el-option
                            v-for="item of brands"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('pinlei')">
                    <el-select v-model="listQuery.brandgroupid" multiple placeholder="" @change="handleChangeBrandGroup">
                        <el-option
                            v-for="item of categories"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('zipinlei')">
                    <el-select v-model="listQuery.childbrand" multiple placeholder="">
                        <el-option
                            v-for="item of childrenBrand"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('shangpinmiaoshu')">
                    <el-select v-model="listQuery.productmemoids" multiple placeholder="">
                        <el-option
                            v-for="item of productMemos"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('shangpinxilie')">
                    <el-select v-model="listQuery.productmemoids" multiple placeholder="">
                        <el-option
                            v-for="item of series"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
                        {{ showLabel('search') }}
                    </el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="filter-item" style="margin-left: 10px;" type="primary" size="mini" icon="el-icon-edit" @click="handleCreate">
                        {{ showLabel('button-create') }}
                    </el-button>
                </el-form-item>
            </el-form>



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
                                <el-select v-model="product.form.brandid" placeholder="">
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
                                <simple-select v-model="product.form.countries" source="country"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('shangpinchicun')">
                                <simple-select v-model="product.form.ulnarinch" source="ulnarinch" :multiple="true"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('shangpinmiaoshu')">
                                <simple-select v-model="product.form.productmemoids" source="productmemo" :multiple="true"/>
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
                                    <simple-select source="currency" :clearable="false" v-model="product.form.wordpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getRate}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="showLabel('guojilingshoujia')">
                                <el-input placeholder="" v-model="product.form.wordprice" class="productcurrency" ref="wordprice" @focus="onPriceFocus('wordprice')">
                                    <simple-select source="currency" :clearable="false" v-model="product.form.wordpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getReciprocalRate}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="showLabel('benguochuchangjia')">
                                <el-input placeholder="" v-model="product.form.nationalfactoryprice" class="productcurrency" ref="nationalfactoryprice" @focus="onPriceFocus('nationalfactoryprice')">
                                    <simple-select source="currency" :clearable="false" v-model="product.form.nationalpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getRateNational}}</span>
                                </el-input>
                            </el-form-item>
                            <el-form-item :label="showLabel('benguolingshoujia')">
                                <el-input placeholder="" v-model="product.form.nationalprice" class="productcurrency" ref="nationalprice" @focus="onPriceFocus('nationalprice')">
                                    <simple-select source="currency" :clearable="false" v-model="product.form.nationalpricecurrency" slot="prepend">
                                    </simple-select>
                                    <span slot="append">{{getReciprocalRateNational}}</span>
                                </el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item :label="showLabel('shangpinxilie')">
                                <simple-select v-model="product.form.series" ref="series" source="series" :parentid="product.form.brandid"> </simple-select><as-button class="trimhalf" @click="onAddSeries">{{showLabel("xinjian")}}</as-button>
                            </el-form-item>

                            <el-form-item :label="showLabel('xiaoshoushuxing')">
                                <simple-select v-model="product.form.saletypeid" source="saletype"/>
                            </el-form-item>

                            <el-form-item :label="showLabel('shangpinshuxing')">
                                <simple-select v-model="product.form.producttypeid" source="producttype"/>
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
        </el-dialog>
    </div>
</template>

<script>
import globals, { showLabel } from '../../component/globals.js'
import '../../assets/table.css'
import '../../assets/search-form.css'

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
    name: 'product',
    data() {
        return {
            series           : [],
            productMemos     : [],
            materialnotes    : [],
            materials        : [],
            colorSystems     : [],
            dialogFormVisible: false,
            listLoading      : true,
            list             : [],
            listQuery : {
                wordcode    : '',
                ageseason   : [],
                brandid     : [],
                brandgroupid: [],
                childbrand  : [],
                series      : []
            },
            childrenBrand: [],
            pagination: {
                pageSizes: globals.pageSizes,
                pageSize : 10,
                total    : 0,
                current  : 1
            },
            product     : Object.assign({}, defaultProduct),
            ageseasons  : [],
            brands      : [],
            categories  : [], // 品类 子品类
            sizes       : [],
            sizecontents: [],
            rules: {
                form: {
                    ageseason     : [{ required: true, message: showLabel('niandai') + showLabel('required') }],
                    brandid       : [{ required: true, message: showLabel('pinpai') + showLabel('required'), trigger: 'change' }],
                    childbrand    : [{ required: true, message: showLabel('pinlei') + showLabel('required'), trigger: 'change' }],
                    sizetopid     : [{ required: true, message: showLabel('chimazu') + showLabel('required'), trigger: 'change' }],
                    sizecontentids: [{ required: true, message: showLabel('chimamingxi') + showLabel('required') }]
                }
            },
            materialsDialogVisible: false,
        }
    },
    created() {
        this.getList()
        this.getProductRelatedOptions()
    },
    methods: {
        handleChangeBrand() {
            let self = this
        },
        handleChangeBrandGroup() {
            let self = this

            self.listQuery.childbrand = []
            self.childrenBrand = []

            self.categories.forEach(item => {
                if (self.listQuery.brandgroupid.indexOf(item.id) >= 0) {
                    self.childrenBrand.push.apply(self.childrenBrand, item.children)
                }
            })
        },
        handleFilter() {
            this.getList()
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
        handleAppendColors() {
            this.product.colors.push(Object.assign({}, defaultColor))
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

                self.series = []
                res.data.brands.forEach(item => {
                    self.series.push.apply(self.series, item.series)
                })
                console.log(self.series)
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