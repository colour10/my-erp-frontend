<template>
  <div style="width:100%">
    <!-- 查询 start -->
    <as-button type="primary" @click="_showDialog('search')">{{_label("chaxun")}}</as-button>
    <!-- 查询 end -->

    <!-- 修改价格 start -->
    <asa-button @click="showFormToModifyPrice()" :enable="_isAllowed('product') && selected.length>0">
      {{_label("xiugaijiage")}}
    </asa-button>
    <!-- 修改价格 end -->

    <!-- 上新 start -->
    <asa-button @click="_showDialog('oms-add')" :enable="selected.length==1">{{_label("shangxin")}}</asa-button>
    <!-- 上新 end -->

    <!-- OMS 订单列表 start -->
    <asa-button @click="_showDialog('oms-order')">{{_label("oms-order")}}</asa-button>
    <!-- OMS 订单列表 end -->

    <!-- 有库存的商品列表 start -->
    <div class="product">
      <el-table
        ref="table"
        :data="searchresult"
        border
        style="width:100%;"
        :row-style="getRowStyle"
        @row-dblclick="showDetail"
        @selection-change="onSelectionChange"
        @row-click="onRowClick"
        :rowClassName="tableRowClassName">

        <!-- checkbox 选项卡 start -->
        <el-table-column
          type="selection"
          align="center"
          :width="40">
        </el-table-column>
        <!-- checkbox 选项卡 end -->

        <!-- 主图 start -->
        <el-table-column
          :label="_label('zhutu')"
          align="center"
          width="60">
          <template v-slot="{row}">
            <sp-product-icon :file="row.product.picture"></sp-product-icon>
          </template>
        </el-table-column>
        <!-- 主图 end -->

        <!-- 产品名称 start -->
        <el-table-column :label="_label('chanpinmingcheng')" align="center" sortable width="200">
          <template v-slot="{row}">
            {{row.product.getName()}}
          </template>
        </el-table-column>
        <!-- 产品名称 end -->

        <!-- 国际码 start -->
        <el-table-column :label="_label('guojima')" align="center" sortable width="200">
          <template v-slot="{row}">
            <sp-product-tip :product="row.product"/>
          </template>
        </el-table-column>
        <!-- 国际码 end -->

        <!-- 库存数量 start，这个 width 通过监控获取最新的尺寸 -->
        <el-table-column :label="_label('kucunshuliang')" :width="width" align="left">
          <template v-slot="{row}">
            <sp-productstock-show
              :columns="row.product.sizecontents"
              :stocks="row.stocks"
              :type="typeSum"></sp-productstock-show>
          </template>
        </el-table-column>
        <!-- 库存数量 end -->

        <!-- 出厂价 start -->
        <el-table-column :label="_label('chuchangjia')" width="110" align="center">
          <template v-slot="{row}">
            {{row.product.factorypricecurrency_label +' '+ row.product.factoryprice}}
          </template>
        </el-table-column>
        <!-- 出厂价 end -->

        <!-- 国际零售价 start -->
        <el-table-column :label="_label('guojilingshoujia')" width="110" align="center">
          <template v-slot="{row}">
            {{row.product.wordpricecurrency_label +' '+ row.product.wordprice}}
          </template>
        </el-table-column>
        <!-- 国际零售价 end -->

        <!-- 成本 start -->
        <el-table-column :label="_label('chengben')" width="140" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.product.costcurrency" source="currency"></sp-select-text>
            {{row.product.cost}}
          </template>
        </el-table-column>
        <!-- 成本 end -->

        <!-- 属性 start -->
        <el-table-column :label="_label('shuxing')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.property" source="orderproperty"></sp-select-text>
          </template>
        </el-table-column>
        <!-- 属性 end -->

        <!-- 残品 start -->
        <el-table-column :label="_label('canpin')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.defective_level" source="defectivelevel"></sp-select-text>
          </template>
        </el-table-column>
        <!-- 残品 end -->

        <!-- 销售属性 start -->
        <el-table-column :label="_label('xiaoshoushuxing')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.saletypeid" source="saletype"></sp-select-text>
          </template>
        </el-table-column>
        <!-- 销售属性 end -->

        <!-- 商品属性 start -->
        <el-table-column :label="_label('shangpinshuxing')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.producttypeid" source="producttype"></sp-select-text>
          </template>
        </el-table-column>
        <!-- 商品属性 end -->

        <!-- 最后入库 start -->
        <el-table-column :label="_label('zuihouruku')" width="100" align="center">
          <template v-slot="{row}">
            {{_left(row.product.laststoragedate,10)}}
          </template>
        </el-table-column>
        <!-- 最后入库 end -->
      </el-table>

      <!-- 分页 start -->
      <el-pagination
        v-if="searchresult.length<pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current*1"
        :page-sizes="pagination.pageSizes"
        :page-size="pagination.pageSize*1"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total*1">
      </el-pagination>
      <!-- 分页 end -->
    </div>
    <!-- 有库存的商品列表 end -->

    <!-- 库存查询条件 start -->
    <sp-dialog ref="search" :width="900">

      <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini"
               @submit.native.prevent>
        <el-row :gutter="0">
          <el-col :span="8" style="width:270px">
            <!-- 仓库 start -->
            <el-form-item :label="_label('cangku')">
              <simple-select
                v-model="form.warehouseid"
                source="warehouses"
                :clearable="true">
              </simple-select>
            </el-form-item>
            <!-- 仓库 end -->

            <!-- 国际码 start -->
            <el-form-item :label="_label('guojima')" prop="ageseason">
              <el-input v-model="form.wordcode" class="width2"/>
            </el-form-item>
            <!-- 国际码 end -->

            <!-- 年代 start -->
            <el-form-item :label="_label('niandai')" prop="ageseason">
              <simple-select v-model="form.ageseason" source="ageseason" :multiple="true"/>
            </el-form-item>
            <!-- 年代 end -->

            <!-- 品牌 start -->
            <el-form-item :label="_label('pinpai')" prop="brandid">
              <simple-select v-model="form.brandid" source="brand" :multiple="true"/>
            </el-form-item>
            <!-- 品牌 end -->

            <!-- 品类 start -->
            <el-form-item :label="_label('pinlei')" prop="brandgroupid">
              <simple-select v-model="form.brandgroupid" source="brandgroup" :multiple="true"/>
            </el-form-item>
            <!-- 品类 end -->

            <!-- 子品类 start -->
            <el-form-item :label="_label('zipinlei')" prop="childbrand">
              <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild"
                             :parentid="form.brandgroupid" :multiple="true"/>
            </el-form-item>
            <!-- 子品类 end -->

            <!-- 产地 start -->
            <el-form-item :label="_label('chandi')" prop="countries">
              <simple-select v-model="form.countries" source="country"/>
            </el-form-item>
            <!-- 产地 end -->

            <!-- 商品尺寸 start -->
            <el-form-item :label="_label('shangpinchicun')">
              <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true"/>
            </el-form-item>
            <!-- 商品尺寸 end -->

          </el-col>

          <el-col :span="8" style="width:270px">

            <!--
            <el-form-item :label="_label('shangpinmiaoshu')">
              <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true"/>
            </el-form-item>
            -->

            <!-- 商品系列 start -->
            <el-form-item :label="_label('shangpinxilie')">
              <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid"
                             :multiple="true"/>
            </el-form-item>
            <!-- 商品系列 end -->

            <!-- 销售属性 start -->
            <el-form-item :label="_label('xiaoshoushuxing')">
              <simple-select v-model="form.saletypeid" source="saletype" :multiple="true"/>
            </el-form-item>
            <!-- 销售属性 end -->

            <!-- 商品属性 start -->
            <el-form-item :label="_label('shangpinshuxing')">
              <simple-select v-model="form.producttypeid" source="producttype" :multiple="true"/>
            </el-form-item>
            <!-- 商品属性 end -->

            <!-- 性别 start -->
            <el-form-item :label="_label('xingbie')">
              <simple-select v-model="form.gender" source="gender" :multiple="true"/>
            </el-form-item>
            <!-- 性别 end -->

            <!-- 季节 start -->
            <el-form-item :label="_label('jijie')">
              <simple-select v-model="form.season" source="season2" :multiple="true"/>
            </el-form-item>
            <!-- 季节 end -->

          </el-col>

          <el-col :span="8" style="width:270px">

            <!--            <el-form-item :label="_label('kucunzhuangtai')">-->
            <!--              <el-checkbox-group v-model="types">-->
            <!--                <el-checkbox label="1">{{_label('daishou')}}</el-checkbox>-->
            <!--                <el-checkbox label="2">{{_label('yushou')}}</el-checkbox>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-form-item>-->

            <!-- 库存状态 start -->
            <el-form-item :label="_label('kucunzhuangtai')">
              <el-checkbox-group v-model="types">
                <el-checkbox label="1">{{_label('daishou')}}</el-checkbox>
                <el-checkbox label="2">{{_label('yushou')}}</el-checkbox>
                <!-- 添加在途状态检索 -->
                <el-checkbox label="4">{{_label('zaitu')}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 库存状态 end -->

            <!-- 属性 start -->
            <el-form-item :label="_label('shuxing')">
              <el-checkbox-group v-model="properties">
                <el-checkbox label="1">{{_label('zicai')}}</el-checkbox>
                <el-checkbox label="2">{{_label('daixiao')}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 属性 end -->

            <!-- 质量 start -->
            <el-form-item :label="_label('zhiliang')">
              <el-checkbox-group v-model="defective_levels">
                <el-checkbox label="1">{{_label('hege')}}</el-checkbox>
                <el-checkbox label="2">{{_label('cancipin')}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <!-- 质量 end -->

            <!-- 最后入库时间 start liuzongyang 2020/4/26 17:27 -->
            <el-form-item :label="_label('zuihouruku')">
              <el-date-picker
                v-model="laststoragedate"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="daterange"
                range-separator="-"
                :start-placeholder="_label('qishishijian')"
                :end-placeholder="_label('jieshushijian')">
              </el-date-picker>
            </el-form-item>
            <!-- 最后入库时间 end -->

            <!-- 库存数量 start liuzongyang 2020/4/26 17:27 -->
            <el-form-item :label="_label('kucunshuliang')" class="kucun_item">
              <el-input v-model="start_number" style="width: 50px;"></el-input>
              -
              <el-input v-model="end_number" style="width: 50px;"></el-input>
            </el-form-item>
            <!-- 库存数量 end -->

          </el-col>
        </el-row>

        <!-- 按钮组 start -->
        <el-row :gutter="0">
          <el-col align="center">
            <as-button auth="product" type="primary" @click="onSearch" native-type="submit">{{_label("chaxun")}}
            </as-button>
            <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
          </el-col>
        </el-row>
        <!-- 按钮组 end -->

      </el-form>
    </sp-dialog>
    <!-- 库存查询条件 end -->

    <!-- 每个仓库的库存明细 start -->
    <sp-dialog ref="product-detail" :width="900">
      <el-table :data="productresult" border style="width:100%;" :row-style="getRowStyle"
                :rowClassName="tableRowClassName">
        <!-- 仓库 start -->
        <el-table-column :label="_label('cangku')" width="160" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.warehouseid" source="warehouses"></sp-select-text>
          </template>
        </el-table-column>
        <!-- 仓库 end -->

        <!-- 国际码 start -->
        <el-table-column :label="_label('guojima')" align="center" sortable width="200">
          <template v-slot="{row}">
            <sp-product-tip :product="product.product"/>
          </template>
        </el-table-column>
        <!-- 国际码 end -->

        <!-- 库存数量 start -->
        <el-table-column :label="_label('kucunshuliang')" width="498" align="left">
          <template v-slot="{row}">
            <sp-productstock-show :columns="product.product.sizecontents" :stocks="row.stocks"
                                  :type="typeSum"></sp-productstock-show>
          </template>
        </el-table-column>
        <!-- 库存数量 end -->
      </el-table>
    </sp-dialog>
    <!-- 每个仓库的库存明细 end -->

    <!-- oms 上新 对话框 start -->
    <sp-dialog ref="oms-add" :width="1040">
      <asa-oms-add :product="selected.length>0?selected[0].product:undefined"></asa-oms-add>
    </sp-dialog>
    <!-- oms 上新 对话框 end -->

    <!-- oms 订单 对话框 start -->
    <sp-dialog ref="oms-order" :width="1400" :title="_label('oms-order')">
      <asa-oms-order></asa-oms-order>
    </sp-dialog>
    <!-- oms 订单 对话框 end -->

    <!-- 修改价格对话框 start -->
    <asa-product-modify-price ref="modifyprice"></asa-product-modify-price>
    <!-- 修改价格对话框 end -->
  </div>
</template>

<script>
    // 调用相关模块
    import {ProductstockSearch, ProductstockSummary} from "../model.js";
    import Asa_Productstock_Show from '../asa/Asa_Productstock_Show.vue';
    import globals, {extend} from '../globals.js';
    import Asa_Product_Modify_Price from '../asa/Asa_Product_Modify_Price.vue';
    import Asa_OMS_Add from '../asa/Asa_OMS_Add.vue'
    import AsaOmsOrder from "@/component/asa/Asa_OMS_Order"

    export default {
        // 名称
        name: 'sp-productstock',
        // 组件
        components: {
            AsaOmsOrder,
            [Asa_Productstock_Show.name]: Asa_Productstock_Show,
            [Asa_Product_Modify_Price.name]: Asa_Product_Modify_Price,
            [Asa_OMS_Add.name]: Asa_OMS_Add,
        },
        // 数据列表
        data() {
            return {
                // 选中的节点集合
                selected: [],
                // 查询的表单
                form: {
                    wordcode: "",
                    brandid: '',
                    brandgroupid: "",
                    childbrand: "",
                    countries: "",
                    brandcolor: "",
                    productparst: "",
                    series: "",
                    ulnarinch: "",
                    gender: "",
                    season: "",
                    ageseason: "",
                    // 商品描述
                    // productmemoids: "",
                    saletypeid: "",
                    producttypeid: "",
                },
                // 分页
                pagination: {
                    pageSizes: globals.pageSizes,
                    pageSize: 10,
                    total: 0,
                    current: 1,
                },
                // 商品列表
                searchresult: [],
                // 是否显示 isLoading 特效
                isLoading: false,
                // 以前是1,2
                // types: ['1', '2'],
                // 更改为1,2,4三个没有加减乘除的对应关系, liuzongyang 2020/4/26 17:32
                // 库存状态：待售，在售，在途
                types: ['1', '2', '4'],
                // 商品属性：自采，代销
                properties: ['1', '2', '3'],
                // 质量：合格，残次品
                defective_levels: ['1'],
                // 每个商品的库存明细
                productresult: [],
                product: '',
                // 最后入库时间
                laststoragedate: "",
                // 库存数量
                start_number: '',
                end_number: '',
            };
        },
        // 方法列表
        methods: {
            // 双击商品逻辑
            async showDetail(row) {
                // 测试变量结果
                this._log("showDetail-row=", row)
                const self = this;
                self.product = row;

                let {data} = await self._fetch("/productstock/searchproduct", {
                    productid: row.productid,
                    defective_level: row.defective_level,
                    property: row.property,
                });

                self.productresult = [];
                for (let row of data) {
                    let result = await ProductstockSearch.load({data: row, depth: 2});
                    self.productresult.push(result);
                }
                self._showDialog('product-detail', {
                    title: row.product.getName(),
                });
            },
            // 分页跳转
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.loadList();
            },
            // 分页跳转
            handleCurrentChange(current) {
                this.pagination.current = current
                this.loadList()
            },
            // 查询逻辑
            onSearch() {
                //查询库存商品
                let self = this;
                self.pagination.page = 1;
                self.loadList();
            },
            // 查询逻辑
            loadList() {
                //查询库存商品
                let self = this;

                if (self.isLoading) {
                    return;
                }
                self.isLoading = true;

                let params = extend({}, self.form);
                params.page = self.pagination.current;
                params.pageSize = self.pagination.pageSize;
                // 库存状态
                params.type = self.typeSum;
                // 残次品等级
                params.defective_level = self.defective_levels.join(',');
                // 属性
                params.property = self.properties.join(',');
                // 添加新检索条件, liuzongyang 2020/4/27 17:00
                // 入库日期
                params.laststoragedate = self.laststoragedate
                // 库存数量
                params.start_number = self.start_number;
                params.end_number = self.end_number;

                // 开始查找
                self._fetch("/productstock/search", params).then(function (res) {
                    self._hideDialog("search");
                    self.searchresult = [];
                    self._log("请求 /productstock/search 后得到的 res = ", res)
                    res.data.data.forEach(function (item) {
                        ProductstockSummary.get(item, function (result) {
                            // 测试 result 的值
                            self._log("result = ", result)
                            self.searchresult.push(result);

                            if (self.searchresult.length == res.data.data.length) {
                                self.isLoading = false;
                                extend(self.pagination, res.data.pagination)
                            }
                        }, 2);
                    });

                    // 测试 searchresult
                    self._log('最后统计得到的 searchresult 的结果是：', self.searchresult)

                    // 没有查询结果
                    if (res.data.data.length == 0) {
                        self.isLoading = false;
                    }
                });
            },
            // 行的 style 的回调方法，文字颜色与该 sku 的 name_en 颜色相同
            getRowStyle({row}) {
                let {product} = row;
                if (product && product.saletype && product.saletype.colortemplate) {
                    return {
                        color: product.saletype.colortemplate.row.name_en,
                    };
                }
            },
            // 	当选择项发生变化时会触发该事件
            onSelectionChange(vals) {
                this.selected = vals;
            },
            // 当某一行被点击时会触发该事件
            onRowClick(row) {
                this.$refs.table.toggleRowSelection(row);
                console.log(this.$refs.table, 'row click')
            },
            // 修改价格
            showFormToModifyPrice() {
                const self = this;
                // 只收集 id 列表
                let products = self.selected.map(item => item.product.id);
                self.$refs.modifyprice.show(products);
            },
            // 设定 table 表格行的颜色
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 === 0) {
                    return 'stripe1';
                }
                return '';
            },
        },
        // 监控变量的值
        computed: {
            width() {
                // 测试变量
                this._log('this.searchresult=', this.searchresult)
                return this.searchresult.reduce(
                    (max, {product}) => Math.max(max, product.sizecontents.length), 1
                ) * 55;
            },
            // type累加
            typeSum() {
                return this.types.reduce((total, item) => {
                    return total + item * 1;
                }, 0);
            },
        },
    };
</script>

<style scoped>
  .order-form >>> .kucun_item .el-input__inner {
    width: 50px;
  }
</style>
