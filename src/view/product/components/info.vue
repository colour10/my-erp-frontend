<template>
  <div>
    <!-- 商品编辑的基本资料模块 -->
    <el-form ref="productForm" :model="product" :rules="rules" label-width="85px" :inline="true" size="mini"
             :inline-message="false" :show-message="false">
      <el-row>

        <!-- 主图 start -->
        <el-col :span="4">
          <simple-avatar v-model="product.form.picture" :disabled="!$store.getters.allow('product')"></simple-avatar>
        </el-col>
        <!-- 主图 end -->

        <!-- 附图 start -->
        <el-col :span="4">
          <simple-avatar v-model="product.picture2" :disabled="!$store.getters.allow('product')"></simple-avatar>
        </el-col>
        <!-- 附图 end -->

        <el-col :span="16">
          <!-- 国际码 start -->
          <el-form-item :label="showLabel('guojima')" prop="form.wordcode_1">
            <el-input v-model="product.form.wordcode_1" style="width:110px;"
                      :placeholder="showLabel('kuanshi')"></el-input>
          </el-form-item>

          <el-form-item prop="form.wordcode_2">
            <el-input v-model="product.form.wordcode_2" style="width:110px;"
                      :placeholder="showLabel('caizhi')"></el-input>
          </el-form-item>

          <el-form-item prop="form.wordcode_3">
            <el-input v-model="product.form.wordcode_3" style="width:110px;"
                      :placeholder="showLabel('yanse')"></el-input>
          </el-form-item>
          <!-- 国际码 end -->

          <!-- 颜色名称 start -->
          <el-form-item>
            <el-input v-model="product.form.colorname" style="width:110px;"
                      :placeholder="showLabel('yansemingcheng')"></el-input>
          </el-form-item>
          <!-- 颜色名称 end -->

          <!-- 辅助码 start -->
          <el-form-item>
            <el-input v-model="product.form.wordcode_4" style="width:110px;"
                      :placeholder="showLabel('fuzhuma')"></el-input>
          </el-form-item>
          <!-- 辅助码 end -->

        </el-col>
      </el-row>


      <div class="order-form" style="width:1200px;">
        <el-row :gutter="0">
          <el-col :span="8">
            <!-- 年代 start -->
            <el-form-item :label="showLabel('niandai')" prop="form.ageseason">
              <ageseason v-model="product.form.ageseason" :data-list="ageseasons"></ageseason>
            </el-form-item>
            <!-- 年代 end -->

            <!-- 品牌 start -->
            <el-form-item :label="showLabel('pinpai')" prop="form.brandid">
              <el-select v-model="product.form.brandid" placeholder="" filterable @change="handleChangeBrand">
                <el-option
                  v-for="item of brands"
                  :key="item.id + item.title"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 品牌 end -->

            <!-- 品类 start，因为里面的id是数字类型的，所以要转成字符串 -->
            <el-form-item :label="showLabel('pinlei')" prop="form.brandgroupid">
              <el-select
                v-model="product.form.brandgroupid"
                placeholder=""
                size="mini"
                filterable
                @change="handleChangeBrandgroupid">
                <el-option
                  v-for="item in categories"
                  :key="item.id + item.title"
                  :label="item.title"
                  :value="item.id + ''">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 品类 end -->

            <!-- 子品类 start -->
            <el-form-item :label="showLabel('zipinlei')" prop="form.childbrand">
              <el-select
                v-model="product.form.childbrand"
                placeholder=""
                filterable
                size="mini">
                <el-option
                  v-for="item in childbrandMenus"
                  :key="item.id + item.title"
                  :label="item.title"
                  :value="item.id + ''">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 子品类 end -->

            <!-- 尺码组 start -->
            <el-form-item :label="showLabel('chimazu')" prop="sizetopid">
              <sizetop v-model="product.form.sizetopid"
                       :sizes="filterSizes"
                       :brand_id="product.form.brandid"
                       :category="product.form.childbrandIds"
                       :gender="product.form.gender"
                       @reloadSizetops="reloadSizetops"
              ></sizetop>
            </el-form-item>
            <!-- 尺码组 end -->

            <!-- 色系 start -->
            <el-form-item :label="showLabel('sexi')">
              <el-select
                v-model="product.form.colorSystemId"
                placeholder=""
                filterable
                size="mini">
                <el-option
                  v-for="item in colorSystems"
                  :key="item.id + item.title"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 色系 end -->

            <!-- 颜色 start -->
            <el-form-item :label="showLabel('yanse')">
              <el-select
                v-model="product.form.colorId"
                filterable
                placeholder=""
                size="mini">
                <el-option
                  v-for="item in filterColors"
                  :key="item.id + item.title"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 颜色 end -->

            <!-- 副颜色 start -->
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
            <!-- 副颜色 end -->

            <el-row class="product">
              <el-table :data="product.materials" border style="width:90%;">
                <!-- 材质管理 start -->
                <el-table-column :label="showLabel('caizhiguanli')" align="center">
                  <!-- 材质 start -->
                  <el-table-column :label="showLabel('caizhi')" align="center">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'materials.' + scope.$index + '.materialid'"
                        :rules="{required: true, trigger: 'change'}"
                      >
                        <el-select
                          v-model="scope.row.materialid"
                          filterable
                          size="mini">
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
                  <!-- 材质 end -->

                  <!-- 百分比 start -->
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
                  <!-- 百分比 end -->

                  <!-- 材质备注 start -->
                  <el-table-column :label="showLabel('caizhibeizhu')" align="center">
                    <template slot-scope="scope">
                      <el-select
                        v-model="scope.row.materialnoteid"
                        filterable
                        size="mini">
                        <el-option
                          v-for="item in currentMaterialnotes"
                          :key="item.id + item.title"
                          :label="item.title"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <!-- 材质备注 end -->
                </el-table-column>
                <!-- 材质管理 end -->

                <!-- 材质管理 按钮 start -->
                <el-table-column width="70">
                  <!-- 增加按钮 start -->
                  <template slot="header">
                    <el-button type="success" icon="el-icon-plus" size="mini"
                               @click.stop="handleAppendMaterial"></el-button>
                  </template>
                  <!-- 增加按钮 end -->

                  <!-- 删除按钮 start -->
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" icon="el-icon-delete"
                               @click="handleRemoveMaterial(scope.$index)"></el-button>
                  </template>
                  <!-- 删除按钮 end -->
                </el-table-column>
              </el-table>
            </el-row>
          </el-col>

          <el-col :span="8">
            <!-- 产地 start -->
            <el-form-item :label="showLabel('chandi')" prop="countries">
              <country v-model="product.form.countries" :data-list="countries"></country>
            </el-form-item>
            <!-- 产地 end -->

            <!-- 产品尺寸 start -->
            <el-form-item :label="showLabel('shangpinchicun')">
              <ulnarinch v-model="product.form.ulnarinch" :data-list="ulnarinches"></ulnarinch>
            </el-form-item>
            <!-- 产品尺寸 end -->

            <!-- 产品描述 start -->
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
            <!-- 产品描述 end -->

            <!-- 出厂价 start -->
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
            <!-- 出厂价 end -->

            <!-- 国际零售价 start -->
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
            <!-- 国际零售价 end -->

            <!-- 本国出厂价 start -->
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
            <!-- 本国出厂价 end -->

            <!-- 本国零售价 start -->
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
            <!-- 本国零售价 end -->
          </el-col>

          <el-col :span="8">
            <!-- 商品系列 start -->
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
            <!-- 商品系列 end -->

            <!-- 销售属性 start -->
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
            <!-- 销售属性 end -->

            <!-- 商品属性 start -->
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
            <!-- 商品属性 end -->

            <!-- 防寒指数 start -->
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
            <!-- 防寒指数 end -->

            <!-- 性别 start -->
            <el-form-item :label="showLabel('xingbie')">
              <sp-radio-group v-model="product.form.gender" source="gender" :span="8" :lang="lang" style="width:270px">
              </sp-radio-group>
            </el-form-item>
            <!-- 性别 end -->

            <!-- 季节 start -->
            <el-form-item :label="showLabel('jijie')">
              <div style="width:270px">
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
            <!-- 季节 end -->

            <!-- 备注 start -->
            <el-form-item :label="showLabel('beizhu')">
              <el-input v-model="product.form.memo"></el-input>
            </el-form-item>
            <!-- 备注 end -->

            <!-- 最后入库 start -->
            <el-form-item :label="showLabel('zuihouruku')">
              <el-input v-model="product.form.laststoragedate"></el-input>
            </el-form-item>
            <!-- 最后入库 end -->

            <!-- 建档人 start -->
            <el-form-item :label="showLabel('jiandangren')">
              <sp-display-input :value="product.form.makestaff" source="user" disabled></sp-display-input>
            </el-form-item>
            <!-- 建档人 end -->


            <!-- 建档时间 start -->
            <el-form-item :label="showLabel('jiandangshijian')">
              <el-input :value="product.form.maketime" disabled></el-input>
            </el-form-item>
            <!-- 建档时间 end -->
          </el-col>
        </el-row>

        <el-row :gutter="0">
          <el-col :span="6" :offset="9">
            <!-- 保存按钮 start -->
            <as-button auth="product" type="primary" @click="updateProduct">{{showLabel("baocun")}}</as-button>
            <!-- 保存按钮 end -->

            <!-- 新增创建按钮 start -->
            <el-button type="success" size="mini" @click="createProduct">
              {{ showLabel('button-create') }}
            </el-button>
            <!-- 新增创建按钮 end -->

            <!-- 退出 start -->
            <as-button>{{showLabel("tuichu")}}</as-button>
            <!-- 退出 end -->
          </el-col>
        </el-row>
      </div>
    </el-form>

    <!-- 创建新系列 对话框 start -->
    <el-dialog :title="showLabel('chuangjianxinxilie')"
               :visible.sync="seriesDialogVisible"
               :center="true"
               :append-to-body="true"
               custom-class="dialog-series"
               width="400px">
      <el-form ref="seriesForm"
               :model="newSeries"
               :inline="true"
               :rules="newSeriesRules">
        <el-form-item :label="showLabel('name', 'cn')" prop="name_cn">
          <el-input v-model="newSeries.name_cn" size="mini"></el-input>
        </el-form-item>

        <el-form-item :label="showLabel('name', 'en')" prop="name_en">
          <el-input v-model="newSeries.name_en" size="mini"></el-input>
        </el-form-item>

        <el-form-item :label="showLabel('name', 'it')" prop="name_it">
          <el-input v-model="newSeries.name_it" size="mini"></el-input>
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
    <!-- 创建新系列 对话框 end -->

    <!-- 创建商品 start -->
    <el-dialog
      :title="showLabel('createProduct')"
      :visible.sync="dialogFormVisible"
      :center="true"
      width="1400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="create-product-dialog">
      <add ref="productForm" @hideDialogForm="hideDialogForm"></add>
    </el-dialog>
    <!-- 创建商品 end -->

  </div>
</template>

<script>
    import {showLabel} from '@/component/globals.js'
    import _ from 'lodash'
    import ageseason from './ageseason.vue'
    import country from './country.vue'
    import ulnarinch from './ulnarinch.vue'
    import size from './size.vue'
    import sizetop from './sizetop.vue'
    import productMemo from './productMemo.vue'
    import Add from "@/view/product/add"

    export default {
        components: {Add, ageseason, country, ulnarinch, size, productMemo, sizetop},
        data() {
            return {
                product: {
                    form: {},
                    materials: []
                },
                ageseasons: [],
                brands: [],
                categories: [],
                sizes: [],
                materials: [],
                materialnotes: [],
                productMemos: [],
                series: [],
                colorSystems: [],
                countries: [],
                ulnarinches: [],
                currencies: [],
                saletypes: [],
                productTypes: [],
                winterProofings: [],
                // 新增 子品类id列表
                childbrandIds: [],
                // 子品类二级菜单列表
                childbrandMenus: [],
                // 当前品类的材质列表
                currentMaterialnotes: [],
                // 当前品类的材质列表id列表
                currentMaterialnotesIds: [],
                rules: {
                    form: {
                        wordcode_1: [{required: true, message: showLabel('kuanshi') + showLabel('required')}],
                        wordcode_2: [{required: true, message: showLabel('caizhi') + showLabel('required')}],
                        wordcode_3: [{required: true, message: showLabel('yanse') + showLabel('required')}],
                        ageseason: [{required: true, message: showLabel('niandai') + showLabel('required')}],
                        brandid: [{
                            required: true,
                            message: showLabel('pinpai') + showLabel('required'),
                            trigger: 'change'
                        }],
                        brandgroupid: [{
                            required: true,
                            message: showLabel('pinlei') + showLabel('required'),
                            trigger: 'change'
                        }],
                        childbrand: [{
                            required: true,
                            message: showLabel('zipinlei') + showLabel('required'),
                            trigger: 'change'
                        }],
                        sizetopid: [{
                            required: true,
                            message: showLabel('chimazu') + showLabel('required'),
                            trigger: 'change'
                        }],
                        sizecontentids: [{required: true, message: showLabel('chimamingxi') + showLabel('required')}]
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
                    name_cn: [{
                        required: true,
                        message: showLabel('name', 'cn') + showLabel('required'),
                        trigger: 'blur'
                    }],
                    name_en: [{
                        required: true,
                        message: showLabel('name', 'en') + showLabel('required'),
                        trigger: 'blur'
                    }],
                    name_it: [{
                        required: true,
                        message: showLabel('name', 'it') + showLabel('required'),
                        trigger: 'blur'
                    }]
                },
                siji: '',
                lang: showLabel("lang"),
                // 创建对话框
                dialogFormVisible: false,
            }
        },
        created() {
            this.getProductRelatedOptions()
            this.getColorSystemAndColor()
        },
        computed: {
            filterColors() {
                let self = this
                if (this.product.form.colorSystemId) {
                    let colorSystem = this.colorSystems.find(item => {
                        return item.id == self.product.form.colorSystemId
                    })

                    if (typeof (colorSystem) != 'undefined') {
                        return colorSystem.colors
                    }
                }

                return []
            },
            filterSizes() {
                let sizes = [
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
                    if (typeof (brand) != 'undefined') {
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
        },
        methods: {
            // 显示创建对话框
            showDialogForm() {
                this.dialogFormVisible = true
            },
            // 隐藏创建对话框
            hideDialogForm() {
                this.dialogFormVisible = false
            },
            reloadSizetops() {
                this.getProductRelatedOptions()
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

                        self._submit("/series/add", params).then(function (res) {
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
            // 获取商品信息
            getProduct(id) {
                let self = this
                self._fetch("/product/info", {id: id}).then(res => {
                    if (res.data.ageseason.length) {
                        let ageseasons = _.split(res.data.ageseason, ',')
                        res.data.ageseason = []
                        ageseasons.forEach(item => {
                            res.data.ageseason.push(parseInt(item))
                        })
                    }
                    // 色系、颜色如果为空，则不强转为数字类型
                    res.data.colorId = res.data.color_id ? parseInt(res.data.color_id) : ''
                    res.data.colorSystemId = res.data.color_system_id ? parseInt(res.data.color_system_id) : ''
                    res.data.secondColorId = res.data.second_color_id ? parseInt(res.data.second_color_id) : ''

                    // 需要把 childbrand 和 brandgroupid 合在一起组成 子品类列表
                    const childbrand = res.data.childbrand
                    res.data.childbrandIds = []
                    res.data.childbrandIds.push(parseInt(res.data.brandgroupid))
                    res.data.childbrandIds.push(parseInt(childbrand))

                    if (res.data.sizecontentids.length) {
                        let sizecontentids = _.split(res.data.sizecontentids, ',')
                        res.data.sizecontentids = []
                        sizecontentids.forEach(item => {
                            res.data.sizecontentids.push(parseInt(item))
                        })
                    }

                    if (res.data.countries.length) {
                        let countries = _.split(res.data.countries, ',')
                        res.data.countries = []
                        countries.forEach(item => {
                            res.data.countries.push(parseInt(item))
                        })
                    } else {
                        res.data.countries = []
                    }

                    if (res.data.ulnarinch.length) {
                        let ulnarinches = _.split(res.data.ulnarinch, ',')
                        res.data.ulnarinch = []
                        ulnarinches.forEach(item => {
                            res.data.ulnarinch.push(parseInt(item))
                        })
                    } else {
                        res.data.ulnarinch = []
                    }

                    if (res.data.productmemoids.length) {
                        let productmemoids = _.split(res.data.productmemoids, ',')
                        res.data.productmemoids = []
                        productmemoids.forEach(item => {
                            res.data.productmemoids.push(parseInt(item))
                        })
                    }

                    res.data.wordpricecurrency = parseInt(res.data.wordpricecurrency)
                    res.data.nationalpricecurrency = parseInt(res.data.nationalpricecurrency)
                    res.data.saletypeid = parseInt(res.data.saletypeid)
                    res.data.saletypeid = (res.data.saletypeid == 0) ? '' : res.data.saletypeid
                    res.data.producttypeid = parseInt(res.data.producttypeid)
                    res.data.producttypeid = (res.data.producttypeid == 0) ? '' : res.data.producttypeid
                    res.data.winterproofingid = parseInt(res.data.winterproofingid)
                    res.data.winterproofingid = (res.data.winterproofingid == 0) ? '' : res.data.winterproofingid

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
                self._fetch("/product/getProductRelatedOptions", {}).then(function (res) {
                    self.ageseasons = res.data.ageseasons
                    self.brands = res.data.brands
                    // 品类
                    self.categories = res.data.categories
                    // 子品类
                    self.categories.forEach((item) => {
                        // 两者类型不同，先转换再进行比较
                        if (String(item.id) === String(self.product.form.brandgroupid)) {
                            self.childbrandMenus = item.children
                        }
                    })

                    self.sizes = res.data.sizes
                    self.materials = res.data.materials
                    // 所有的材质备注
                    self.materialnotes = res.data.materialnotes
                    self.countries = res.data.countries
                    self.ulnarinches = res.data.ulnarinches
                    self.currencies = res.data.currencies
                    self.saletypes = res.data.saletypes
                    self.productTypes = res.data.productTypes
                    self.winterProofings = res.data.winterProofings

                    self.series = []
                    res.data.brands.forEach(item => {
                        self.series.push.apply(self.series, item.series)
                    })

                    // 取出商品的相关信息
                    self.getProduct(self.$route.params.id)
                })
            },
            getColorSystemAndColor() {
                let self = this
                if (self.colorSystems.length === 0) {
                    self._fetch("/color/getColorSystemAndColorForCascader", {}).then(function (res) {
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
                        self._submit("/product/edit", {params: JSON.stringify(params)}, options).then(function (res) {
                        })
                    }
                })
            },
            // 创建商品
            createProduct() {
                // 显示对话框
                this.showDialogForm()
            },
            // 调用下拉二级菜单
            getChildbrandMenus() {
                this.categories.forEach((item) => {
                    // 防止类型不同，转换类型之后再进行比较
                    if (String(item.id) === String(this.product.form.brandgroupid)) {
                        this.childbrandMenus = item.children
                    }
                })
            },
            // select 切换判断
            handleChangeBrandgroupid() {
                // 修改下面的子品类为空
                this.product.form.childbrand = ''
                this.getChildbrandMenus()
            }
        },
        // 监听变量
        watch: {
            // 四季
            siji: function (newValue) {
                this.product.form.spring = newValue
                this.product.form.summer = newValue
                this.product.form.fall = newValue
                this.product.form.winter = newValue
            },
            // 检测品类值的变化，如果发生变化，就重新请求二级子品类
            'product.form.brandgroupid'(newVal) {
                // 重新请求二级子品类
                this.getChildbrandMenus()
                // 材质备注列表也要重新计算
                this.currentMaterialnotes = []
                this.currentMaterialnotesIds = []
                // 请求新的材质备注列表
                this.materialnotes.forEach((item) => {
                    if (item.brandgroupids.includes(newVal)) {
                        this.currentMaterialnotes.push({
                            id: item.id,
                            title: item.title
                        })
                        // ids
                        this.currentMaterialnotesIds.push(item.id)
                    }
                })
                // 新的材质备注列表
                // 然后监控 materials 变量内部是否符合要求
                this.product.materials.forEach((item) => {
                    if (!this.currentMaterialnotesIds.includes(item.materialnoteid)) {
                        item.materialnoteid = ''
                    }
                })
            }
        },
    }
</script>
