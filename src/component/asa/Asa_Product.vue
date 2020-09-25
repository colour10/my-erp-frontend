<template>
  <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :center="true"
      width="1200px"
      class="product"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false">

    <el-tabs type="border-card" @tab-click="onTabClick" v-model="currentTab">

      <!-- 基本资料 start -->
      <el-tab-pane :label="_label('jibenziliao')" name="product">

        <el-row>
          <!-- 主图 start -->
          <el-col :span="4">
            <simple-avatar v-model="form.picture" :disabled="!$store.getters.allow('product')"></simple-avatar>
          </el-col>
          <!-- 主图 end -->

          <!-- 附图 start -->
          <el-col :span="4">
            <simple-avatar v-model="form.picture2" :disabled="!$store.getters.allow('product')"></simple-avatar>
          </el-col>
          <!-- 附图 end -->

          <el-col :span="16">
            <el-form ref="form" :model="form" label-width="80px" size="mini" :inline="true">

              <!-- 国际码 start -->
              <el-form-item :label="_label('guojima')" prop="wordcode_1">
                <el-input v-model="form.wordcode_1" style="width:110px;" :placeholder="_label('kuanshi')"
                          @keyup.native="onKeyInput(form, 'wordcode_1')"></el-input>
                <el-input v-model="form.wordcode_2" style="width:110px;" :placeholder="_label('caizhi')"
                          @keyup.native="onKeyInput(form, 'wordcode_2')"></el-input>
                <el-input v-model="form.wordcode_3" style="width:110px;" :placeholder="_label('yanse')"
                          @keyup.native="onColorcodeChange(form, 'wordcode_3')"></el-input>
                <el-input v-model="form.colorname" style="width:110px;"
                          :placeholder="_label('yansemingcheng')"></el-input>
                <el-input v-model="form.wordcode_4" style="width:110px;" :placeholder="_label('fuzhuma')"></el-input>
              </el-form-item>
              <!-- 国际码 end -->

              <!-- 色系 start -->
              <el-form-item :label="showLabel('sexi')" label-width="85px" prop="brandcolor">
                <el-select
                    v-model="form.brandcolor"
                    placeholder=""
                    filterable
                    size="mini"
                    style="width: 100px;">
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
              <el-form-item :label="showLabel('yanse')" label-width="40px" prop="colorId">
                <el-select
                    v-model="form.color_id"
                    filterable
                    placeholder=""
                    size="mini"
                    style="width: 100px;">
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
              <el-form-item :label="showLabel('second_color')" label-width="60px" prop="second_color_id">
                <el-cascader
                    placeholder=""
                    v-model="form.second_color_id"
                    size="mini"
                    :show-all-levels="false"
                    :options="colorSystems"
                    :props="{ children: 'colors', value: 'id', label: 'title' }"
                    clearable
                    style="width: 100px;">
                </el-cascader>
              </el-form-item>
              <!-- 副颜色 end -->

              <!-- 商品属性 start -->
              <el-form-item :label="showLabel('shangpinshuxing')" label-width="85px" prop="producttypeid">
                <el-select v-model="form.producttypeid" placeholder="" style="width: 100px;">
                  <el-option
                      v-for="item of productTypes"
                      :key="item.id + item.title"
                      :label="item.title"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 商品属性 end -->
            </el-form>
          </el-col>
        </el-row>

        <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true"
                 style="width:100%; margin-top: 0.8em"
                 size="mini" :rules="formRules" :inline-message="false" :show-message="false">
          <el-row :gutter="0">
            <el-col :span="8">


              <!-- 年代 start -->
              <el-form-item :label="showLabel('niandai')" prop="ageseason">
                <my-ageseason v-model="form.ageseason" :data-list="ageseasons"></my-ageseason>
              </el-form-item>
              <!-- 年代 end -->

              <!-- 品牌 start -->
              <el-form-item :label="showLabel('pinpai')" prop="brandid">
                <el-select v-model="form.brandid" placeholder="" filterable @change="handleChangeBrand">
                  <el-option
                      v-for="item of brands"
                      :key="item.id + item.title"
                      :label="item.title"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 品牌 end -->

              <!-- 品类 start -->
              <el-form-item :label="showLabel('pinlei')" prop="brandgroupid">
                <el-select
                    v-model="form.brandgroupid"
                    placeholder=""
                    size="mini"
                    filterable
                    @change="handleChangeBrandgroupid">
                  <el-option
                      v-for="item in categories"
                      :key="item.id + item.title"
                      :label="item.title"
                      :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <!-- 品类 end -->

              <!-- 子品类 start -->
              <el-form-item :label="showLabel('zipinlei')" prop="childbrand">
                <el-select
                    v-model="form.childbrand"
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
                <sizetop v-model="form.sizetopid"
                         :sizes="filterSizes"
                         :brand_id="form.brandid"
                         :category="form.childbrandIds"
                         :gender="form.gender"
                         @reloadSizetops="reloadSizetops"
                ></sizetop>
              </el-form-item>
              <!-- 尺码组 end -->

              <el-row class="product">
                <el-table :data="materials" border style="width:90%;">
                  <!-- 材质管理 start -->
                  <el-table-column :label="showLabel('caizhiguanli')" align="center">
                    <!-- 材质 start，本来循环的变量应该是  filtedMaterials[scope.$index]，但是因为页面载入的时候，右侧的材质备注用的是 change方法，所以左侧取不到值，所以这里循环变量改用 materials，后期找到了解决办法再修改 -->
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
                                v-for="item in allmaterials"
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
                            :rules="{required: true, trigger: 'blur'}">
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
                <country v-model="form.countries" :data-list="countries"></country>
              </el-form-item>
              <!-- 产地 end -->

              <!-- 产品尺寸 start -->
              <el-form-item :label="showLabel('shangpinchicun')" prop="ulnarinch">
                <ulnarinch v-model="form.ulnarinch" :data-list="ulnarinches"></ulnarinch>
              </el-form-item>
              <!-- 产品尺寸 end -->

              <!-- 产品描述 start -->
              <el-form-item :label="showLabel('shangpinmiaoshu')" prop="productmemoids">
                <el-select v-model="form.productmemoids" placeholder="" multiple>
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
              <el-form-item :label="showLabel('chuchangjia')" prop="factoryprice">
                <el-input placeholder="" v-model="form.factoryprice" class="productcurrency">
                  <el-select v-model="form.wordpricecurrency" placeholder="" slot="prepend">
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
              <el-form-item :label="showLabel('guojilingshoujia')" prop="wordprice">
                <el-input placeholder="" v-model="form.wordprice" class="productcurrency">
                  <el-select v-model="form.wordpricecurrency" placeholder="" slot="prepend">
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
              <el-form-item :label="showLabel('benguochuchangjia')" prop="nationalfactoryprice">
                <el-input placeholder="" v-model="form.nationalfactoryprice" class="productcurrency">
                  <el-select v-model="form.nationalpricecurrency" placeholder="" slot="prepend">
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
              <el-form-item :label="showLabel('benguolingshoujia')" prop="nationalprice">
                <el-input placeholder="" v-model="form.nationalprice" class="productcurrency">
                  <el-select v-model="form.nationalpricecurrency" placeholder="" slot="prepend">
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

            <!-- 商品系列 start -->
            <el-col :span="8">
              <el-form-item :label="_label('shangpinxilie')" prop="series">
                <simple-select v-model="form.series" ref="series" source="series"
                               :parentid="form.brandid"></simple-select>
                <as-button class="trimhalf" @click="onAddSeries">{{ _label("xinjian") }}</as-button>
              </el-form-item>

              <el-form-item :label="_label('xiaoshoushuxing')" prop="saletypeid">
                <simple-select v-model="form.saletypeid" source="saletype" style="color:red"></simple-select>
              </el-form-item>

              <el-form-item :label="_label('fanghanzhishu')" prop="winterproofingid">
                <simple-select v-model="form.winterproofingid" source="winterproofing"></simple-select>
              </el-form-item>

              <el-form-item :label="_label('xingbie')" prop="gender">
                <sp-radio-group v-model="form.gender" source="gender" :span="8" :lang="lang" style="width:270px">
                </sp-radio-group>
              </el-form-item>

              <el-form-item :label="_label('jijie')" prop="spring">
                <div style="width:270px">
                  <el-col :span="8">
                    <sp-checkbox v-model="form.spring">{{ _label("chun") }}</sp-checkbox>
                  </el-col>

                  <el-col :span="8">
                    <sp-checkbox v-model="form.summer">{{ _label("xia") }}</sp-checkbox>
                  </el-col>

                  <el-col :span="8">
                    <sp-checkbox v-model="siji">{{ _label("siji") }}</sp-checkbox>
                  </el-col>

                  <el-col :span="8">
                    <sp-checkbox v-model="form.fall">{{ _label("qiu") }}</sp-checkbox>
                  </el-col>

                  <el-col :span="8">
                    <sp-checkbox v-model="form.winter">{{ _label("dong") }}</sp-checkbox>
                  </el-col>
                </div>
              </el-form-item>

              <el-form-item :label="_label('beizhu')" prop="memo">
                <el-input v-model="form.memo"></el-input>
              </el-form-item>

              <el-form-item :label="_label('zuihouruku')" prop="laststoragedate">
                <el-input v-model="form.laststoragedate"></el-input>
              </el-form-item>

              <el-form-item :label="_label('jiandangren')" prop="makestaff">
                <sp-display-input :value="form.makestaff" source="currentUsers" disabled></sp-display-input>
              </el-form-item>

              <el-form-item :label="_label('jiandangshijian')">
                <el-input :value="form.created_at" disabled></el-input>
              </el-form-item>
            </el-col>
            <!-- 商品系列 end -->
          </el-row>

          <!-- 按钮组 start -->
          <el-row :gutter="0">
            <el-col :span="6" :offset="9">
              <as-button type="primary" @click="handleCreate">{{ _label("button-create") }}</as-button>
              <as-button auth="product" type="primary" @click="onSubmit" v-if="option.isedit">{{ _label("baocun") }}
              </as-button>
              <as-button type="primary" @click="onQuit">{{ _label("tuichu") }}</as-button>
            </el-col>
          </el-row>
          <!-- 按钮组 end -->
        </el-form>
      </el-tab-pane>
      <!-- 基本资料 end -->

      <!-- 商品属性 start -->
      <el-tab-pane :label="_label('shangpinshuxing')" name="property" :disabled="form.id==''">
        <property :productid="form.id" ref="property" @quit="onQuit" :option="option"></property>
      </el-tab-pane>
      <!-- 商品属性 end -->

      <!-- 商品条码 start -->
      <el-tab-pane :label="_label('shangpintiaoma')" name="code" :disabled="form.id==''">
        <el-table :data="sizecontents" border style="width:100%;">
          <el-table-column prop="sizecontent_name" :label="_label('chima')" align="left" width="100">
          </el-table-column>
          <el-table-column prop="goods_code" :label="_label('shangpintiaoma')" width="350" align="left">
            <template v-slot="scope">
              <el-input v-model="scope.row.goods_code" size="mini"></el-input>
            </template>
          </el-table-column>
        </el-table>
        <!-- 提交+退出按钮 start -->
        <el-col :offset="9" :span="6">
          <as-button auth="product" type="primary" @click="onSaveGoodsCode" v-if="option.isedit">{{ _label("baocun") }}
          </as-button>
          <as-button type="primary" @click="onQuit">{{ _label("tuichu") }}</as-button>
        </el-col>
        <!-- 提交+退出按钮 end -->
      </el-tab-pane>
      <!-- 商品条码 end -->

      <!-- 同款多色 start -->
      <el-tab-pane :label="_label('tongkuanduose')" name="colorgroup" :disabled="form.id==''">
        <asa-product-search-panel
            ref="searchpanel"
            @select="onSelectProduct"
            :filter="searchProductFilter"
            :isCreate="false"
            v-if="_isAllowed('product')"></asa-product-search-panel>

        <el-table :data="colors" border style="width:100%;" class="myTable">
          <!-- 主图 start -->
          <el-table-column width="80" align="center">
            <template v-slot="scope">
              <simple-avatar v-model="scope.row.picture" font-size="14px" :size="35"></simple-avatar>
            </template>
          </el-table-column>
          <!-- 主图 end -->

          <!-- 附图 start -->
          <el-table-column width="80" align="center">
            <template v-slot="scope">
              <simple-avatar v-model="scope.row.picture2" font-size="14px" :size="35"></simple-avatar>
            </template>
          </el-table-column>
          <!-- 附图 end -->

          <!-- 款式 start -->
          <el-table-column :label="_label('kuanshi')" width="140" align="center">
            <template v-slot="scope">
              <el-input v-model="scope.row.wordcode_1" size="mini"
                        @keyup.native="onKeyInput(scope.row, 'wordcode_1')"></el-input>
            </template>
          </el-table-column>
          <!-- 款式 end -->

          <!-- 材质 start -->
          <el-table-column :label="_label('caizhi')" width="140" align="center">
            <template v-slot="scope">
              <el-input v-model="scope.row.wordcode_2" size="mini"
                        @keyup.native="onKeyInput(scope.row, 'wordcode_2')"></el-input>
            </template>
          </el-table-column>
          <!-- 材质 end -->

          <!-- 颜色 start -->
          <el-table-column :label="_label('yanse')" width="140" align="center">
            <template v-slot="scope">
              <!--<el-input v-model="scope.row.wordcode_3" size="mini" @keyup.native.down="onKeyDown(scope.$index)" @keyup.native.up="onKeyUp(scope.$index)" :ref="'word'+scope.$index"></el-input>-->
              <el-input v-model="scope.row.wordcode_3" size="mini"
                        @keyup.native="onColorcodeChange(scope.row, 'wordcode_3')"></el-input>
            </template>
          </el-table-column>
          <!-- 颜色 end -->

          <!-- 颜色名称 start -->
          <el-table-column :label="_label('yansemingcheng')" width="150" align="center">
            <template v-slot="scope">
              <el-input v-model="scope.row.colorname" size="mini"></el-input>
            </template>
          </el-table-column>
          <!-- 颜色名称 end -->

          <!-- 色系 start -->
          <el-table-column :label="showLabel('sexi')">
            <template slot-scope="scope">
              <el-select v-model="scope.row.brandcolor" placeholder="" size="mini">
                <el-option
                    v-for="item in colorSystems"
                    :key="item.id + item.title"
                    :label="item.title"
                    :value="item.id + ''">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 色系 end -->

          <!-- 颜色 start -->
          <el-table-column :label="showLabel('yanse')">
            <template slot-scope="scope">
              <el-select v-model="scope.row.color_id" placeholder="" size="mini">
                <el-option
                    v-for="item in filterColorsInSkus(scope.row)"
                    :key="item.id + item.title"
                    :label="item.title"
                    :value="item.id + ''">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <!-- 颜色 end -->

          <!-- 辅助码 start -->
          <el-table-column :label="_label('fuzhuma')" width="120" align="center">
            <template v-slot="scope">
              <el-input v-model="scope.row.wordcode_4" size="mini"></el-input>
            </template>
          </el-table-column>
          <!-- 辅助码 end -->

          <!-- 操作 start -->
          <el-table-column :label="_label('caozuo')" align="center">
            <template v-slot="scope">
              <as-button type="danger" @click="onDeleteColorGroup(scope, scope.row)"
                         v-if="option.isedit && form.id!=scope.row.id">{{ _label("shanchu") }}
              </as-button>
            </template>
          </el-table-column>
          <!-- 操作 end -->
        </el-table>

        <!-- 保存-追加-退出 button start -->
        <el-col :offset="8" :span="8" style="padding-top:5px">
          <asa-button :enable="_isAllowed('product')" @click="onSaveColorGroup" v-if="option.isedit">
            {{ _label("baocun") }}
          </asa-button>

          <asa-button :enable="_isAllowed('product')" @click="onAppendColor" v-if="option.isedit">
            {{ _label("zhuijia") }}
          </asa-button>

          <as-button type="primary" @click="onQuit">{{ _label("tuichu") }}</as-button>
        </el-col>
        <!-- 保存-追加-退出 button end -->

      </el-tab-pane>
      <!-- 同款多色 end -->

      <!-- 产品图片 start -->
      <el-tab-pane :label="_label('shangpintupian')" name="album" :disabled="form.id==''">
        <sp-album :productid="form.id" ref="album" @quit="onQuit"></sp-album>
      </el-tab-pane>
      <!-- 产品图片 end -->

      <!-- 价格 start -->
      <el-tab-pane :label="_label('jiage')" name="pricetab" :disabled="form.id==''">
        <pricetab :productid="form.id" ref="pricetab" @quit="onQuit" :option="option"></pricetab>
      </el-tab-pane>
      <!-- 价格 end -->

      <!-- 库存 start -->
      <el-tab-pane :label="_label('kucun')" name="productstock" :disabled="form.id==''">
        <productstock :productid="form.id" ref="productstock" @quit="onQuit" :option="option"></productstock>
      </el-tab-pane>
      <!-- 库存 end -->

      <!-- 到货记录 start, liuzongyang 2020/4/26 15:25 -->
      <el-tab-pane :label="_label('arrive-record')" name="ArriveRecord" :disabled="form.id==''">
        <arrive-record ref="ArriveRecord"
                       :productid="form.id"
                       @quit="onQuit"
                       :option="option"></arrive-record>
      </el-tab-pane>
      <!-- 到货记录 end -->

      <!-- 新建商品对话框 start -->
      <el-dialog
          :title="showLabel('createProduct')"
          :visible.sync="dialogFormVisible"
          :center="true"
          width="1400px"
          :close-on-click-modal="false"
          :close-on-press-escape="false"
          custom-class="create-product-dialog"
          :append-to-body="true">
        <erp-product-add ref="productForm" @hideDialogForm="hideDialogForm" @reloadList="reloadList"></erp-product-add>
      </el-dialog>
      <!-- 新建商品对话框 end -->

    </el-tabs>
  </el-dialog>
</template>

<script>
import globals, {_label, extract} from '../globals.js';
import {ModelBus, ProductDetail} from "../model.js";
import {initObject} from "../array.js";
import {extend} from "../object.js";
import DataSource from '../DataSource.js';
import Asa_Product_Search_Panel from './Asa_Product_Search_Panel.vue';
import Asa_Product_Property from './Asa_Product_Property.vue';
import Asa_Product_Price from './Asa_Product_Price.vue';
import Asa_Product_ProductStock from './Asa_Product_ProductStock.vue';
import Material from '../product/material.vue';
import API from "../api.js";
import _Product from "./product.js";
import productMixin from "../mixins/product.js";
import ArriveRecord from "@/view/product/components/ArriveRecord"
import {getLabel} from "@/component/globals"
import myAgeseason from '@/view/product/components/ageseason'
import sizetop from '@/view/product/components/sizetop.vue'
import country from '@/view/product/components/country.vue'
import ulnarinch from '@/view/product/components/ulnarinch.vue'
import ErpProductAdd from "@/view/product/add"

// 定义同款多色字段
const color_keys = ['id', 'brandcolor', 'wordcode_1', 'wordcode_2', 'wordcode_3', 'wordcode_4', 'colorname', 'picture', 'picture2', 'color_id']

export default {
  name: 'asa-product',
  mixins: [productMixin],
  components: {
    ErpProductAdd,
    country,
    ulnarinch,
    sizetop,
    myAgeseason,
    ArriveRecord,
    [Asa_Product_Search_Panel.name]: Asa_Product_Search_Panel,
    property: Asa_Product_Property,
    pricetab: Asa_Product_Price,
    productstock: Asa_Product_ProductStock,
    productmaterial: Material
  },
  data() {
    return {
      // 新建商品对话框
      dialogFormVisible: false,
      // 是否显示对话框
      dialogVisible: false,
      lang: _label("lang"),
      search: {
        is_show: false
      },
      // 表单
      form: {},
      // 所有商品的材质列表
      allmaterials: [],
      // 当前的材质列表
      materials: [],
      // 商品条码
      sizecontents: [],
      sizecontents_loaded: false,
      // 同款多色数据
      colors: [],
      colors_loaded: false,
      colors2: [], //仅仅用来显示多色
      datetime: _label("_date"),
      adduser: _label("_currentUsername"),
      option: {
        isedit: false
      },
      currentTab: "product",
      // 倍率暂时用不到了
      // rate: "", //参考倍率
      exchange: {
        currency_to: "",
        currency_from: "",
        rate: ""
      }, //当前的汇率信息；零售比=本国零售价/国际零售价
      siji: "", //控制四季全选
      title: "",
      // product模型，保存最终的数据
      product: {},
      // 色系
      colorSystems: [],
      // 商品属性
      productTypes: [],
      seriesDialogVisible: false,
      // 当前品类的材质备注列表
      currentMaterialnotes: [],
      // 当前品类的材质备注列表id列表
      currentMaterialnotesIds: [],
      // 新增 子品类id列表
      childbrandIds: [],
      // 子品类二级菜单列表
      childbrandMenus: [],
      // 下级子分类
      categories: [],
      // 当前品类的材质列表
      currentMaterials: [],
      // 当前品类的材质id列表
      currentMaterialIds: [],
      // 匹配的材质列表
      filtedMaterials: [],
      ageseasons: [],
      brands: [],
      sizes: [],
      materialnotes: [],
      // 产品描述
      productMemos: [],
      // 系列
      series: [],
      // 国家列表
      countries: [],
      // 币种列表
      currencies: [],
      saletypes: [],
      winterProofings: [],
      // 子品类列表
      brandgroupchild: [],
      // 尺码组
      sizetop: [],
      ulnarinches: [],
      // 保存最原始的数据
      originProduct: {},
    }
  },
  methods: {
    // 同款多色匹配数据
    filterColorsInSkus(row) {
      if (row.brandcolor) {
        let colorSystem = this.colorSystems.find(item => {
          return item.id == row.brandcolor
        })

        if (typeof (colorSystem) != 'undefined') {
          return colorSystem.colors
        }
      }
      return []
    },
    // 新建
    handleCreate() {
      this.showDialogForm()
      if (typeof (this.$refs.productForm) != 'undefined') {
        this.$refs.productForm.resetDialogForm()
      }
    },
    // 显示新建
    showDialogForm() {
      this.dialogFormVisible = true
    },
    // 隐藏新建
    hideDialogForm() {
      this.dialogFormVisible = false
    },
    // 重新请求尺码组
    reloadSizetops() {
      this.getProductRelatedOptions()
    },
    // 添加后的逻辑，再次交给上级处理
    reloadList() {
      this.$emit('reloadList')
    },
    // 品类 select 切换判断
    handleChangeBrandgroupid() {
      // 修改下面的子品类为空
      this.form.childbrand = ''
      this.getChildbrandMenus()
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
          self.newSeries.brandid = self.form.brandid
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

      if (self.form.brandid > 0) {
        this.seriesDialogVisible = true
      } else {
        self._info(self._label("tip-pinpai"))
      }
    },
    // 材质删除
    handleRemoveMaterial(index) {
      this.materials.splice(index, 1)
    },
    // 材质添加
    handleAppendMaterial() {
      this.materials.push({
        materialid: "",
        percent: 100,
        materialnoteid: ""
      })
    },
    handleChangeBrand() {
      let self = this
      self.series = []
      if (self.form.brandid) {
        self.brands.forEach(item => {
          if (self.form.brandid == item.id) {
            self.series = item.series
          }
        })
      }
    },
    // 初始化色系
    getColorSystemAndColor() {
      let self = this
      if (self.colorSystems.length === 0) {
        self._fetch("/color/getColorSystemAndColorForCascader", {}).then(function (res) {
          self.colorSystems = res.data
        })
      }
    },
    onBrandChange() {
      this.loadRate();
      this.getBrandColorSuggest();
    },
    onColorcodeChange(row, columnName) {
      this.onKeyInput(row, columnName);
      console.log(row, columnName)
      //自动匹配色系和颜色
      if (columnName == 'wordcode_3') {
        this.autoMatchSuggest(row)
      }
    },
    validatorGJM() {
      let self = this;
      let form = this.form
      return new Promise((resolve, reject) => {
        if (form.wordcode_1 == "" && form.wordcode_2 == '' && form.wordcode_3 == '') {
          reject({message: self._label("8000"), label: self._label("guojima")})
        } else {
          resolve()
        }
      })
    },
    onAddSeries() {
      _Product(this).addSeries();
    },
    // 关闭对话框
    onQuit() {
      this.dialogVisible = false
      // 因为关闭对话框会出现一个奇怪的bug，那就是商品列表中每一行数据颜色列表，将会被清空，这个问题暂时没有找到解决方法，只有强制关闭时执行一下重新加载列表了
      // this.reloadList()
    },
    onKeyInput(target, columnName) {
      target[columnName] = target[columnName].toUpperCase();
    },
    // 获取商品信息，这个是核心功能，从info.vue复制而来
    getProduct(id) {
      let self = this
      self._fetch("/product/info", {id: id}).then(res => {
        // 测试返回值
        self._log("/product/info请求的结果为：", res)

        // 年代季节
        if (res.data.ageseason && res.data.ageseason.length) {
          let ageseasons = _.split(res.data.ageseason, ',')
          res.data.ageseason = []
          ageseasons.forEach(item => {
            res.data.ageseason.push(parseInt(item))
          })
        }

        // 色系、颜色如果为空，则不强转为数字类型
        res.data.color_id = res.data.color_id ? parseInt(res.data.color_id) : ''
        res.data.brandcolor = res.data.brandcolor ? parseInt(res.data.brandcolor) : ''
        res.data.second_color_id = res.data.second_color_id ? parseInt(res.data.second_color_id) : ''

        // 品类转换
        res.data.brandgroupid = res.data.brandgroupid ? parseInt(res.data.brandgroupid) : ''

        // 需要把 childbrand 和 brandgroupid 合在一起组成 子品类列表，这个给尺码组使用
        const childbrand = res.data.childbrand
        res.data.childbrandIds = []
        res.data.childbrandIds.push(parseInt(res.data.brandgroupid))
        res.data.childbrandIds.push(parseInt(childbrand))

        // 尺码组
        if (res.data.sizecontentids && res.data.sizecontentids.length) {
          let sizecontentids = _.split(res.data.sizecontentids, ',')
          res.data.sizecontentids = []
          sizecontentids.forEach(item => {
            res.data.sizecontentids.push(parseInt(item))
          })
        }

        // 国家和地区
        if (res.data.countries && res.data.countries.length) {
          let countries = _.split(res.data.countries, ',')
          res.data.countries = []
          countries.forEach(item => {
            res.data.countries.push(parseInt(item))
          })
        }

        // 商品尺寸
        if (res.data.ulnarinch && res.data.ulnarinch.length) {
          let ulnarinches = _.split(res.data.ulnarinch, ',')
          res.data.ulnarinch = []
          ulnarinches.forEach(item => {
            res.data.ulnarinch.push(parseInt(item))
          })
        }

        // 商品描述
        if (res.data.productmemoids && res.data.productmemoids.length) {
          let productmemoids = _.split(res.data.productmemoids, ',')
          res.data.productmemoids = []
          productmemoids.forEach(item => {
            res.data.productmemoids.push(parseInt(item))
          })
        }

        res.data.wordpricecurrency = parseInt(res.data.wordpricecurrency)
        res.data.nationalpricecurrency = parseInt(res.data.nationalpricecurrency)
        res.data.saletypeid = parseInt(res.data.saletypeid)
        res.data.saletypeid = (res.data.saletypeid == 0 || isNaN(res.data.saletypeid)) ? '' : res.data.saletypeid
        res.data.producttypeid = parseInt(res.data.producttypeid)
        res.data.producttypeid = (res.data.producttypeid == 0 || isNaN(res.data.producttypeid)) ? '' : res.data.producttypeid
        res.data.winterproofingid = parseInt(res.data.winterproofingid)
        res.data.winterproofingid = (res.data.winterproofingid == 0 || isNaN(res.data.winterproofingid)) ? '' : res.data.winterproofingid

        // 材质列表
        if (res.data.materials && res.data.materials.length) {
          res.data.materials.forEach(material => {
            material.materialid = parseInt(material.materialid)
            material.materialnoteid = parseInt(material.materialnoteid)
          })
        }
        // 表单赋值
        self.form = res.data
        // 材质赋值
        self.materials = res.data.materials

        // 打印 self 变量
        console.log("self=", self)

        self.handleChangeBrand()
      })
    },
    onOptionChange(options) {
      let self = this
      if (options.length == 1) {
        self.form.sizecontentids = options[0].id
      }
    },
    getColorStyle(item) {
      return {
        width: '36px',
        height: '36px',
        background: 'url("' + this._fileLink(item.picture) + '") no-repeat center'
      }

    },
    searchProductFilter(product) {
      return product.product_group.indexOf('|') < 0 && this.colors.findIndex(item => item.id == product.id) < 0
    },
    // 表单提交
    onSubmit() {
      var self = this;

      self.validate(self.validatorGJM).then(function () {
        let params = {
          form: self.form,
          materials: self.materials
        }
        if (self.form.id == "") {
          // 新增
          self._submit("/product/add", {params: JSON.stringify(params)}).then(function (res) {
            self.$emit("change", Object.assign({}, self.form), "create")
            self.setInfo(res.id)
          })
        } else {
          // 修改
          self._submit("/product/edit", {params: JSON.stringify(params)}).then(function () {
            self.$emit("change", Object.assign({}, self.form), "update")
            ModelBus.emit("product-change", self.form.id)
            self.setInfo(self.form.id)
          })
        }
      })
    },
    onTrimSize() {
      let self = this
      let source = DataSource.getDataSource("sizecontent", self._label("lang"))
      source.getRows(self.form.sizecontentids).then(results => {
        self.form.sizecontentids = results.filter(item => item.name.indexOf('.') < 0).map(item => item.id).join(',')
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
    // 提交 - 保存商品条码逻辑
    onSaveGoodsCode() {
      let self = this

      let params = {productid: self.form.id}
      params.list = self.sizecontents.map(function (item) {
        return {sizecontentid: item.sizecontentid, goods_code: item.goods_code}
      })

      // 提交
      self._submit("/product/savecode", {params: JSON.stringify(params)}).then(() => {
      });
    },

    // 提交 - 保存同款多色逻辑
    onSaveColorGroup() {
      //保存同款多色数据
      let self = this;
      let params = {productid: self.form.id}
      params.list = self.colors.map(item => extract(item, color_keys))
      // 记录下这个数值
      console.log('Asa_Product => onSaveColorGroup => params的值是：', params)

      for (let i = 0; i < params.list.length; i++) {
        let row = params.list[i];
        if (row.wordcode_1 == '' && row.wordcode_2 == '' && row.wordcode_3 == '') {
          return self._showErorMessage({message: self._label("8000"), label: self._label("guojima")})
        }
        // brandcolor 是色系，必填项
        if (row.brandcolor == "") {
          return self._showErorMessage({message: self._label("8000"), label: self._label("sexi")})
        }
      }
      // 提交逻辑
      self._submit("/product/savecolorgroup", {params: JSON.stringify(params)}).then(function (res) {
        self.setInfo(self.form.id).then(() => {
          res.data.list.forEach(function (item) {
            self.colors.push(extract(item, color_keys))
            //self._log(item)
          })
          self.colors_loaded = true

          self.$emit("change", Object.assign({}, self.form), "update")
          self.currentTab = "colorgroup"
        })
      });
    },
    // 追加一条同款多色
    onAppendColor() {
      let self = this
      self.colors.push({
        picture: "",
        picture2: "",
        colorname: "",
        brandcolor: "",
        color_id: "",
        wordcode_1: self.form.wordcode_1,
        wordcode_2: self.form.wordcode_2,
        wordcode_3: "",
        wordcode_4: "",
        id: ""
      })
    },
    onDeleteColorGroup({$index, row}, rowIndex) {
      let self = this
      self.$delete(self.colors, $index)
    },
    countHeaderStyle({row, column, rowIndex, columnIndex}) {
      if (rowIndex == 1) {
        return {display: 'none'}
      }
    },
    // tab切换逻辑
    onTabClick(tab) {
      const self = this
      // 如果切换了商品条码
      if (tab.name == 'code') {
        // 以前的方法注释掉，主要的思路是通过商品id去 tb_productcode 表查有没有 productid 的记录
        // let ntlist = new List(self.sizecontents)
        //
        // API.getProductCodeList(self.form.id).then(data => {
        //     data.forEach(function (item) {
        //         let index = ntlist.findIndex('id', item.sizecontentid)
        //         if (index >= 0) {
        //             self.sizecontents[index].goods_code = item.goods_code
        //         }
        //     })
        // });
        // self.sizecontents_loaded = true;

        // 主要逻辑
        // 每次都清空
        self.sizecontents_loaded = false;
        self.sizecontents = []
        self._fetch("/product/codelist", {id: self.form.id}).then(function (res) {
          // 需要向数组中添加对象作为 value, 这个时候用到 map 函数
          const myData = res.data.map(item => {
            return {
              sizecontentid: item.sizecontentid,
              sizecontent_name: item.sizecontent_name,
              goods_code: item.goods_code,
            }
          })
          self.sizecontents = myData
        })
        self.sizecontents_loaded = true;
      } else if (tab.name == 'colorgroup' && self.colors_loaded == false) {
        self.loadColorGroupList();
      } else if (tab.name == 'album') {
        setTimeout(function () {
          self.$refs.album.loadList()
        }, 100)
      } else if (tab.name == 'property') {
        setTimeout(function () {
          self.$refs.property.load()
        }, 50)
      } else if (tab.name == 'pricetab') {
        setTimeout(function () {
          self.$refs.pricetab.load()
        }, 50)
      } else if (tab.name == 'productstock') {
        setTimeout(function () {
          self.$refs.productstock.load()
        }, 50)
      }
    },
    // 获取同款多色的各个产品的产品数据
    loadColorGroupList() {
      let self = this;
      if (self.colors_loaded == true) {
        return;
      }
      self._fetch("/product/getcolorgrouplist", {id: self.form.id}).then(function (res) {
        res.data.forEach(function (item) {
          self.colors.push(extract(item, color_keys))
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
    // 编辑第一个标签
    setInfo(row) {
      var self = this
      self.colors_loaded = false;
      self.colors = []

      return new Promise((resolve, reject) => {
        ProductDetail.load({data: row, depth: 1, isCache: false}).then(function (info) {
          // 打印值，保存原始的row，如果用了info，那么其中的空值会被转换成0，这不是我们想要的
          self._log("原始的row=", row)

          // 打印值，info
          self._log("收到的info=", info)

          // 赋值给 originProduct，保留一份原始的数据，方便对比
          self.originProduct = row

          // 取出当前品类的材质备注列表
          self.getCurrentMaterialnotes(info.brandgroupid)

          // 调用商品的信息
          self.getProduct(info.id)

          // self.loadRate();
          self.loadExchangeRate();
          self.getBrandColorSuggest();

          self._log("开始自动执行")

          // 第一个标签高亮
          self.currentTab = 'product'
          // 标签的标题，如果函数出错，则替换为默认文本
          var myName
          var myGoodsCode
          // 判断 getName 函数和 getGoodsCode 函数是否存在
          try {
            if (typeof (eval(info.getName())) == "function") {
              myName = info.getName()
            }
          } catch (e) {
          }

          try {
            if (typeof (eval(info.getGoodsCode())) == "function") {
              myGoodsCode = info.getGoodsCode()
            }
          } catch (e) {
          }

          // 存在则调用，否则就显示商品详情的默认字样
          if (myName && myGoodsCode) {
            self.title = myName + ' ' + myGoodsCode
          } else {
            self.title = _label('product-description')
          }


          self.product = info
          resolve(self)
        })
      })
    },
    // 获取当前品类的材质备注列表
    getCurrentMaterialnotes(brandgroupid) {
      let self = this
      // 取出当前商品相关的材质备注列表
      // 先清空
      self.currentMaterialnotes = []
      self.currentMaterialnotesIds = []
      self.materialnotes.forEach((item) => {
        if (item.brandgroupids.includes(brandgroupid)) {
          self.currentMaterialnotes.push({
            id: item.id,
            title: item.title
          })
          // ids
          self.currentMaterialnotesIds.push(item.id)
        }
      })
    },
    // 获取商品相关的所有属性
    getProductRelatedOptions() {
      let self = this
      self._fetch("/product/getProductRelatedOptions", {}).then(function (res) {
        // 年代季节列表
        self.ageseasons = res.data.ageseasons
        // 品牌
        self.brands = res.data.brands
        // 品类
        self.categories = res.data.categories
        // 子品类
        self.categories.forEach((item) => {
          // 两者类型不同，先转换再进行比较
          if (String(item.id) === String(self.form.brandgroupid)) {
            self.childbrandMenus = item.children
          }
        })

        self.sizes = res.data.sizes
        // 所有的材质
        self.allmaterials = res.data.materials
        // 所有的材质备注
        self.materialnotes = res.data.materialnotes
        // 国家列表
        self.countries = res.data.countries
        self.ulnarinches = res.data.ulnarinches
        self.currencies = res.data.currencies
        // 销售类型列表
        self.saletypes = res.data.saletypes
        // 商品属性列表
        self.productTypes = res.data.productTypes
        self.winterProofings = res.data.winterProofings
        // 商品描述
        self.productMemos = res.data.productMemos

        self.series = []
        res.data.brands.forEach(item => {
          self.series.push.apply(self.series, item.series)
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
    // 加载汇率信息
    loadExchangeRate() {
      //加载汇率信息
      let self = this;

      globals.empty(self.exchange)
      self._log("加载汇率信息", self.form.wordpricecurrency, self.form.nationalpricecurrency)

      API.getExchange(self.form.wordpricecurrency, self.form.nationalpricecurrency).then(result => {
        self._log("exchange=", result)
        if (result > 0) {
          extend(self.exchange, {
            currency_from: self.form.wordpricecurrency,
            currency_to: self.form.nationalpricecurrency,
            rate: result
          });
        }
      })
    },
    // 当修改材质备注的时候，材质也相应的发生变化
    handleChangeMaterialnote(index) {
      let self = this
      self.materials[index].materialid = ''

      let noteId = self.materials[index].materialnoteid.toString()

      self.filtedMaterials[index] = self.materials.filter(function (item) {
        let materialnoteids = _.isEmpty(item.materialnoteids) ? [] : item.materialnoteids.split(',')
        return (_.indexOf(materialnoteids, noteId) >= 0)
      })
    },
    // 调用下拉二级菜单
    getChildbrandMenus() {
      this.categories.forEach((item) => {
        // 防止类型不同，转换类型之后再进行比较
        if (String(item.id) === String(this.form.brandgroupid)) {
          this.childbrandMenus = item.children
        }
      })
    },
  },
  // 变量监控
  watch: {
    // 四季
    siji: function (newValue) {
      let self = this
      extend(self.form, initObject(['spring', 'summer', 'fall', 'winter'], newValue))
    },
    // 国际零售价
    'form.wordpricecurrency': function () {
      this.loadExchangeRate()
    },
    // 本国零售价
    'form.nationalpricecurrency': function () {
      this.loadExchangeRate()
    },
    // 监控色系，一旦 brandcolor 发生了变动，那么就需要重新选择下面的颜色
    "form.brandcolor"(newValue, oldValue) {
      if (oldValue !== undefined) {
        this.form.colorId = '';
      }
    },
    // 检测品类值的变化，如果发生变化，就重新请求二级子品类
    'form.brandgroupid'(newVal, oldValue) {
      if (newVal) {
        // 重新请求二级子品类
        this.getChildbrandMenus()
        // 材质备注列表也要重新计算
        this.currentMaterialnotes = []
        this.currentMaterialnotesIds = []
        // 请求新的材质备注列表
        this.materialnotes.forEach((item) => {
          // 这里有个大坑，item.brandgroupids 数组中每个元素都是字符串，而 newVal 是数字，所以要先转成字符串
          if (item.brandgroupids.includes(newVal + '')) {
            this.currentMaterialnotes.push({
              id: item.id,
              title: item.title
            })
            // ids
            this.currentMaterialnotesIds.push(item.id)
          }
        })
      }
    },
    // 监控商品属性，这个判断只执行1次
    "form.producttypeid"(newVal, oldVal) {
      // 测试变量，随着调试再打开
      // this._log("newVal=", newVal)
      // this._log("oldVal=", oldVal)
      // this._log("this.form=", this.form)
      // this._log("this.originProduct=", this.originProduct)

      // 如果是第一次进入，oldVal 的值就是 undefined
      if (oldVal === undefined) {
        console.log('第一次进入，不给与提示')
        return
      }

      // 如果用户在切换的同时改变了商品属性 selected，那么就给出提示
      // 一般来说，页面上的 this.form.producttypeid 类型是数字，而 this.originProduct.producttypeid 类型是字符串
      if (String(this.form.producttypeid) === String(this.originProduct.producttypeid)) {
        console.log('用户没有改变 producttypeid 的值，也不会提示')
        return
      }

      // 下面涉及到脏数据的判断，数据库有时候 producttypeid 的值是 null 或者 0，那么这个时候 this.form.producttypeid 的值只能是空字符串
      if (this.form.producttypeid === '') {
        console.log('数据库里保存的 producttypeid 的值是脏数据，不给于提示')
        return
      }

      // 再判断 producttypeid_tootip 的值是不是 undefined, 如果是说明已经还没有询问过用户，否则就是问过了，不需要重复询问
      if (this.form.producttypeid_tootip !== undefined) {
        console.log('已经询问过用户了，不需要再次询问！')
        return
      }

      // 接下来执行询问逻辑
      this.$confirm(getLabel('shuxingtishi'), getLabel('tishi'), {
        confirmButtonText: getLabel('yes'),
        cancelButtonText: getLabel('no'),
        type: 'warning'
      }).then(() => {
        // 如果选择是，则赋值为1
        this.form.producttypeid_tootip = 1
      }).catch(() => {
        // 否则赋值为0
        this.form.producttypeid_tootip = 0
      });
    },
  },
  // 需要计算的属性
  computed: {
    // 筛选尺码组
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
      if (this.form.brandid) {
        let brand = this.brands.find(function (item) {
          return item.id == self.form.brandid
        })

        let sizetopIds = []
        if (typeof (brand) != 'undefined') {
          brand.sizes.forEach(item => {
            if (_.isEmpty(self.form.gender) && _.isEmpty(self.form.childbrand)) {
              sizetopIds.push(item.sizetop_id)
            } else {
              let isMatched = true

              if (self.form.gender) {
                if (item.gender != self.form.gender) {
                  isMatched = false
                }
              }

              if (isMatched && !_.isEmpty(self.form.childbrand)) {
                // 因为子品类已经改成字符串，重写验证逻辑
                let brandgroupchild_id = this.form.childbrand.toString()
                if (brandgroupchild_id !== item.brandgroupchild_id) {
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
    // 匹配色系
    filterColors() {
      let self = this
      if (this.form.brandcolor) {
        let colorSystem = this.colorSystems.find(item => {
          return item.id == self.form.brandcolor
        })

        if (typeof (colorSystem) != 'undefined') {
          return colorSystem.colors
        }
      }

      return []
    },
  },
  mounted() {
    let self = this;
    self.initRules(Rules => {
      let _label = self._label
      return {
        sizetopid: Rules.id({required: true, message: _label("8000"), label: _label("chimazu")}),
        brandgroupid: Rules.id({required: true, message: _label("8000"), label: _label("pinlei")}),
        childbrand: Rules.id({required: true, message: _label("8000"), label: _label("zipinlei")}),
        brandid: Rules.id({required: true, message: _label("8000"), label: _label("pinpai")}),
        brandcolor: Rules.required({message: _label("8000"), label: _label("sexi")}),
        // ageseason: Rules.required({message: _label("8000"), label: _label("niandai")}),
        sizecontentids: Rules.required({message: _label("8000"), label: _label("chimamingxi")})
      }
    })
  },
  // 初始化
  created() {
    // 初始化色系
    this.getColorSystemAndColor()
    // 取出相关信息，这个调用在前面，因为 getProduct 接口后面需要用到其数据
    this.getProductRelatedOptions()
  }
}
</script>

<style scoped>
.myTable >>> .avatar-uploader {
  margin-top: 8px;
}
</style>
