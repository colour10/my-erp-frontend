<template>
  <div style="width:100%" class="product">
    <as-button type="primary" @click="_showDialog('search')">{{_label("chaxun")}}</as-button>
    <sp-table :data="searchresult" border style="width:100%;" :row-style="getRowStyle">
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
          <sp-product-tip :product="row.product" />
        </template>
      </el-table-column>
      <el-table-column sortable :label="_label('cangku')" width="100" align="center">
        <template v-slot="{row}">
          {{row.warehouse.name}}
        </template>
      </el-table-column>
      <el-table-column :label="_label('kucunshuliang')" :width="width" align="left">
        <template v-slot="{row}">
          <sp-productstock-show :columns="row.product.sizecontents" :stocks="row.stocks" :type="typeSum"></sp-productstock-show>
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
    </sp-table>
    <el-pagination v-if="searchresult.length<pagination.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current*1" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total*1">
    </el-pagination>
    <sp-dialog ref="search" :width="900">
      <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
        <el-row :gutter="0">
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('cangku')">
              <simple-select v-model="form.warehouseid" source="warehouse" :placeholder="_label('cangku')" :clearable="true"></simple-select>
            </el-form-item>
            <el-form-item :label="_label('guojima')" prop="ageseason">
              <el-input v-model="form.wordcode" class="width2" />
            </el-form-item>
            <el-form-item :label="_label('niandai')" prop="ageseason">
              <simple-select v-model="form.ageseason" source="ageseason" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('pinpai')" prop="brandid">
              <simple-select v-model="form.brandid" source="brand" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('pinlei')" prop="brandgroupid">
              <simple-select v-model="form.brandgroupid" source="brandgroup" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('zipinlei')" prop="childbrand">
              <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :parentid="form.brandgroupid" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('chandi')" prop="countries">
              <simple-select v-model="form.countries" source="country" />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('shangpinchicun')">
              <simple-select v-model="form.ulnarinch" source="ulnarinch" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('shangpinmiaoshu')">
              <simple-select v-model="form.productmemoids" source="productmemo" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('shangpinxilie')">
              <simple-select v-model="form.series" ref="series" source="series" :parentid="form.brandid" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('xiaoshoushuxing')">
              <simple-select v-model="form.saletypeid" source="saletype" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('shangpinshuxing')">
              <simple-select v-model="form.producttypeid" source="producttype" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('xingbie')">
              <simple-select v-model="form.gender" source="gender" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('jijie')">
              <simple-select v-model="form.season" source="season2" :multiple="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('kucunzhuangtai')">
              <el-checkbox-group v-model="types">
                    <el-checkbox label="1">{{_label('daishou')}}</el-checkbox>
                    <el-checkbox label="2">{{_label('yushou')}}</el-checkbox>
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
            <as-button auth="product" type="primary" @click="onSearch" native-type="submit">{{_label("chaxun")}}</as-button>
            <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
          </el-col>
        </el-row>
      </el-form>
    </sp-dialog>
  </div>
</template>

<script>
import { ProductstockSearch } from "../model.js";
import Asa_Productstock_Show from '../asa/Asa_Productstock_Show.vue';
import globals, { extend } from '../globals.js';

export default {
  name: 'sp-productstock',
  components: {
    [Asa_Productstock_Show.name]: Asa_Productstock_Show,
  },
  data() {
    return {
      form: {
        wordcode: "",
        brandid: '',
        brandgroupid: "",
        childbrand: "",
        productsize: "",
        countries: "",
        brandcolor: "",
        productparst: "",
        series: "",
        ulnarinch: "",
        gender: "",
        season: "",
        ageseason: "",
        productmemoids: "", //商品描述
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
      types: ['1'],
      properties: ['1', '2'],
      defective_levels: ['1'],
    };
  },
  methods: {
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
      params.type = self.typeSum;
      params.defective_level = self.defective_levels.join(',');
      params.property = self.properties.join(',');

      self._fetch("/productstock/search", params).then(function(res) {
        self._hideDialog("search");
        self.searchresult = [];
        console.log(res);
        res.data.data.forEach(function(item) {
          ProductstockSearch.get(item, function(result) {
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
    getRowStyle({ row }) {
      let { product } = row;
      if (product && product.saletype && product.saletype.colortemplate) {
        return {
          color: product.saletype.colortemplate.row.name_en,
        };
      }
    },
  },
  computed: {
    width() {
      return this.searchresult.reduce((max, { product }) => Math.max(max, product.sizecontents.length), 1) * 55;
    },
    typeSum() {
      return this.types.reduce((total, item) => {
        return total + item * 1;
      }, 0);
    },
  },
};
</script>
