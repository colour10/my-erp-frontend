<template>
  <div style="width:100%">
    <as-button type="primary" @click="_showDialog('search')">{{_label("chaxun")}}</as-button>
    <asa-button @click="showFormToModifyPrice()" :enable="_isAllowed('product') && selected.length>0">
      {{_label("xiugaijiage")}}
    </asa-button>
    <asa-button @click="_showDialog('oms-add')" :enable="selected.length==1">{{_label("shangxin")}}</asa-button>
    <div class="product">
      <el-table ref="table" :data="searchresult" border style="width:100%;" :row-style="getRowStyle"
                @row-dblclick="showDetail" @selection-change="onSelectionChange" @row-click="onRowClick"
                :rowClassName="tableRowClassName">
        <el-table-column type="selection" :width="60"></el-table-column>
        <el-table-column :label="_label('zhutu')" align="center" width="60">
          <template v-slot="{row}">
            <sp-product-icon :file="row.product.picture"></sp-product-icon>
          </template>
        </el-table-column>
        <el-table-column :label="_label('chanpinmingcheng')" align="center" sortable width="200">
          <template v-slot="{row}">
            {{row.product.getName()}}
          </template>
        </el-table-column>
        <el-table-column :label="_label('guojima')" align="center" sortable width="200">
          <template v-slot="{row}">
            <sp-product-tip :product="row.product"/>
          </template>
        </el-table-column>
        <el-table-column :label="_label('kucunshuliang')" :width="width" align="left">
          <template v-slot="{row}">
            <sp-productstock-show :columns="row.product.sizecontents" :stocks="row.stocks"
                                  :type="typeSum"></sp-productstock-show>
          </template>
        </el-table-column>
        <el-table-column :label="_label('chuchangjia')" width="110" align="center">
          <template v-slot="{row}">
            {{row.product.factorypricecurrency_label +' '+ row.product.factoryprice}}
          </template>
        </el-table-column>
        <el-table-column :label="_label('guojilingshoujia')" width="110" align="center">
          <template v-slot="{row}">
            {{row.product.wordpricecurrency_label +' '+ row.product.wordprice}}
          </template>
        </el-table-column>
        <el-table-column :label="_label('chengben')" width="140" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.product.costcurrency" source="currency"></sp-select-text>
            {{row.product.cost}}
          </template>
        </el-table-column>
        <el-table-column :label="_label('shuxing')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.property" source="orderproperty"></sp-select-text>
          </template>
        </el-table-column>
        <el-table-column :label="_label('canpin')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.defective_level" source="defectivelevel"></sp-select-text>
          </template>
        </el-table-column>
        <el-table-column :label="_label('xiaoshoushuxing')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.saletypeid" source="saletype"></sp-select-text>
          </template>
        </el-table-column>
        <el-table-column :label="_label('shangpinshuxing')" width="90" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.producttypeid" source="producttype"></sp-select-text>
          </template>
        </el-table-column>
        <el-table-column :label="_label('zuihouruku')" width="100" align="center">
          <template v-slot="{row}">
            {{_left(row.product.laststoragedate,10)}}
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="searchresult.length<pagination.total" @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" :current-page="pagination.current*1"
                     :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize*1"
                     layout="total, sizes, prev, pager, next, jumper" :total="pagination.total*1">
      </el-pagination>
    </div>
    <sp-dialog ref="search" :width="900">

      <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini"
               @submit.native.prevent>
        <el-row :gutter="0">
          <el-col :span="8" style="width:270px">

            <el-form-item :label="_label('cangku')">
              <simple-select v-model="form.warehouseid" source="warehouse"
                             :clearable="true"></simple-select>
            </el-form-item>

            <el-form-item :label="_label('guojima')" prop="ageseason">
              <el-input v-model="form.wordcode" class="width2"/>
            </el-form-item>

            <el-form-item :label="_label('niandai')" prop="ageseason">
              <simple-select v-model="form.ageseason" source="ageseason" :multiple="true"/>
            </el-form-item>

            <el-form-item :label="_label('pinpai')" prop="brandid">
              <simple-select v-model="form.brandid" source="brand" :multiple="true"/>
            </el-form-item>

            <el-form-item :label="_label('pinlei')" prop="brandgroupid">
              <simple-select v-model="form.brandgroupid" source="brandgroup" :multiple="true"/>
            </el-form-item>

            <el-form-item :label="_label('zipinlei')" prop="childbrand">
              <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild"
                             :parentid="form.brandgroupid" :multiple="true"/>
            </el-form-item>

            <el-form-item :label="_label('chandi')" prop="countries">
              <simple-select v-model="form.countries" source="country"/>
            </el-form-item>

            <el-form-item :label="_label('shangpinchicun')">
              <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true"/>
            </el-form-item>

          </el-col>

          <el-col :span="8" style="width:270px">

            <!--
            <el-form-item :label="_label('shangpinmiaoshu')">
              <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true"/>
            </el-form-item>
            -->

            <el-form-item :label="_label('shangpinxilie')">
              <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid"
                             :multiple="true"/>
            </el-form-item>

            <el-form-item :label="_label('xiaoshoushuxing')">
              <simple-select v-model="form.saletypeid" source="saletype" :multiple="true"/>
            </el-form-item>

            <el-form-item :label="_label('shangpinshuxing')">
              <simple-select v-model="form.producttypeid" source="producttype" :multiple="true"/>
            </el-form-item>
            <el-form-item :label="_label('xingbie')">
              <simple-select v-model="form.gender" source="gender" :multiple="true"/>
            </el-form-item>
            <el-form-item :label="_label('jijie')">
              <simple-select v-model="form.season" source="season2" :multiple="true"/>
            </el-form-item>

          </el-col>

          <el-col :span="8" style="width:270px">

            <!--            <el-form-item :label="_label('kucunzhuangtai')">-->
            <!--              <el-checkbox-group v-model="types">-->
            <!--                <el-checkbox label="1">{{_label('daishou')}}</el-checkbox>-->
            <!--                <el-checkbox label="2">{{_label('yushou')}}</el-checkbox>-->
            <!--              </el-checkbox-group>-->
            <!--            </el-form-item>-->

            <el-form-item :label="_label('kucunzhuangtai')">
              <el-checkbox-group v-model="types">
                <el-checkbox label="9">{{_label('daishou')}}</el-checkbox>
                <el-checkbox label="10">{{_label('yushou')}}</el-checkbox>
                <!-- 添加在途状态检索 -->
                <el-checkbox label="11">{{_label('zaitu')}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item :label="_label('shuxing')">
              <el-checkbox-group v-model="properties">
                <el-checkbox label="1">{{_label('zicai')}}</el-checkbox>
                <el-checkbox label="2">{{_label('daixiao')}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <el-form-item :label="_label('zhiliang')">
              <el-checkbox-group v-model="defective_levels">
                <el-checkbox label="1">{{_label('hege')}}</el-checkbox>
                <el-checkbox label="2">{{_label('cancipin')}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col align="center">
            <as-button auth="product" type="primary" @click="onSearch" native-type="submit">{{_label("chaxun")}}
            </as-button>
            <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
          </el-col>
        </el-row>
      </el-form>
    </sp-dialog>

    <sp-dialog ref="product-detail" :width="900">
      <el-table :data="productresult" border style="width:100%;" :row-style="getRowStyle"
                :rowClassName="tableRowClassName">
        <el-table-column :label="_label('cangku')" width="160" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.warehouseid" source="warehouse"></sp-select-text>
          </template>
        </el-table-column>

        <el-table-column :label="_label('guojima')" align="center" sortable width="200">
          <template v-slot="{row}">
            <sp-product-tip :product="product.product"/>
          </template>
        </el-table-column>

        <el-table-column :label="_label('kucunshuliang')" width="498" align="left">
          <template v-slot="{row}">
            <sp-productstock-show :columns="product.product.sizecontents" :stocks="row.stocks"
                                  :type="typeSum"></sp-productstock-show>
          </template>
        </el-table-column>
      </el-table>
    </sp-dialog>

    <sp-dialog ref="oms-add" :width="1040">
      <asa-oms-add :product="selected.length>0?selected[0].product:undefined"></asa-oms-add>
    </sp-dialog>
    <asa-product-modify-price ref="modifyprice"></asa-product-modify-price>
  </div>
</template>

<script>
    import {ProductstockSearch, ProductstockSummary} from "../model.js";
    import Asa_Productstock_Show from '../asa/Asa_Productstock_Show.vue';
    import globals, {extend} from '../globals.js';
    import Asa_Product_Modify_Price from '../asa/Asa_Product_Modify_Price.vue';
    import Asa_OMS_Add from '../asa/Asa_OMS_Add.vue'

    export default {
        name: 'sp-productstock',
        components: {
            [Asa_Productstock_Show.name]: Asa_Productstock_Show,
            [Asa_Product_Modify_Price.name]: Asa_Product_Modify_Price,
            [Asa_OMS_Add.name]: Asa_OMS_Add
        },
        data() {
            return {
                selected: [],
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
                    //商品描述
                    // productmemoids: "",
                    saletypeid: "",
                    producttypeid: "",
                },
                pagination: {
                    pageSizes: globals.pageSizes,
                    pageSize: 10,
                    total: 0,
                    current: 1,
                },
                searchresult: [],
                isLoading: false,
                // 以前是1,2
                // types: ['1', '2'],
                // 更改为1,2,4三个没有加减乘除的对应关系
                types: ['1', '2', '4'],
                properties: ['1', '2', '3'],
                defective_levels: ['1'],
                productresult: [],
                product: '',
            };
        },
        methods: {
            async showDetail(row) {
                console.log(row)
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
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.loadList();
            },
            handleCurrentChange(current) {
                this.pagination.current = current
                this.loadList()
            },
            onSearch() {
                //查询库存商品
                let self = this;
                self.pagination.page = 1;
                self.loadList();
            },
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

                self._fetch("/productstock/search", params).then(function (res) {
                    self._hideDialog("search");
                    self.searchresult = [];
                    console.log(res);
                    res.data.data.forEach(function (item) {
                        ProductstockSummary.get(item, function (result) {
                            self.searchresult.push(result);

                            if (self.searchresult.length == res.data.data.length) {
                                self.isLoading = false;
                                extend(self.pagination, res.data.pagination)
                            }
                        }, 2);
                    });

                    // 没有查询结果
                    if (res.data.data.length == 0) {
                        self.isLoading = false;
                    }
                });
            },
            getRowStyle({row}) {
                let {product} = row;
                if (product && product.saletype && product.saletype.colortemplate) {
                    return {
                        color: product.saletype.colortemplate.row.name_en,
                    };
                }
            },
            onSelectionChange(vals) {
                this.selected = vals;
            },
            onRowClick(row) {
                this.$refs.table.toggleRowSelection(row);
                console.log(this.$refs.table, 'row click')
            },
            showFormToModifyPrice() {
                const self = this;
                let products = self.selected.map(item => item.product.id);
                self.$refs.modifyprice.show(products);
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 === 0) {
                    return 'stripe1';
                }
                return '';
            },
        },
        computed: {
            width() {
                return this.searchresult.reduce((max, {product}) => Math.max(max, product.sizecontents.length), 1) * 55;
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
