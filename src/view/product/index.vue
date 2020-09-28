<template>
  <div>
    <div class="filter-container">

      <!-- 这里是搜索表单，下面是各个检索的条件 -->
      <el-form ref="searchForm" :inline="true" :model="listQuery" size="mini">

        <!-- 国际码 start -->
        <el-form-item :label="showLabel('guojima')">
          <el-input size="mini" v-model="listQuery.wordcode" style="width: 200px;" @keyup.enter.native="handleFilter"/>
        </el-form-item>
        <!-- 国际码 end -->

        <!-- 年代 start -->
        <el-form-item :label="showLabel('niandai')">
          <el-select v-model="listQuery.ageseason" multiple placeholder="">
            <el-option
              v-for="item of ageseasons"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 年代 end -->

        <!-- 品牌 start -->
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
        <!-- 品牌 end -->

        <!-- 品类 start -->
        <el-form-item :label="showLabel('pinlei')">
          <el-select
            v-model="listQuery.brandgroupid"
            filterable
            placeholder=""
            @change="handleChangeBrandGroup">
            <el-option
              v-for="item of categories"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 品类 end -->

        <!-- 子品类 start -->
        <el-form-item :label="showLabel('zipinlei')">
          <el-select
            v-model="listQuery.childbrand"
            filterable
            placeholder="">
            <el-option
              v-for="item of childrenBrand"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 子品类 end -->

        <!-- 商品描述 start -->
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
        <!-- 商品描述 end -->

        <!-- 商品系列 start -->
        <el-form-item :label="showLabel('shangpinxilie')">
          <el-select v-model="listQuery.series" multiple placeholder="">
            <el-option
              v-for="item of series"
              :key="item.id + item.title"
              :label="item.title"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 商品系列 end -->

        <!-- 清空按钮 start -->
        <el-form-item>
          <el-button class="filter-item" type="default" size="mini" icon="el-icon-refresh-right"
                     @click="handleResetFilter">
            {{ showLabel('qingkong') }}
          </el-button>
        </el-form-item>
        <!-- 清空按钮 end -->

        <!-- 搜索按钮 start -->
        <el-form-item>
          <el-button class="filter-item" type="primary" size="mini" icon="el-icon-search" @click="handleFilter">
            {{ showLabel('search') }}
          </el-button>
        </el-form-item>
        <!-- 搜索按钮 end -->

        <!-- 新建按钮 start -->
        <el-form-item>
          <el-button class="filter-item" style="margin-left: 10px;" type="success" size="mini" icon="el-icon-edit"
                     @click="handleCreate">
            {{ showLabel('button-create') }}
          </el-button>
        </el-form-item>
        <!-- 新建按钮 end -->

      </el-form>
    </div>

    <!-- 产品列表 start -->
    <el-row :gutter="20" class="product">
      <el-col :span="24">
        <el-table v-loading="listLoading" :data="list" @sort-change="handleSort" border stripe>
          <el-table-column :label="showLabel('caozuo')" align="center" width="150"
                           class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <!-- 编辑 start，这里不用router-link了，因为要调用对话框 -->
              <!--
              <router-link :to="'/product/edit/' + row.id">
                <el-button type="default" size="mini">{{ showLabel('bianji') }}</el-button>
              </router-link>
              -->

              <el-button type="default" size="mini" @click="onClick(row)">{{ showLabel('bianji') }}</el-button>
              <!-- 编辑 end -->

              <!-- 删除 start -->
              <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
              <!-- 删除 end -->
            </template>
          </el-table-column>

          <!-- 主图 start -->
          <el-table-column :label="showLabel('zhutu')">
            <template slot-scope="{row}">
              <img :src="_fileLink(row.picture_150)" style="max-width: 50px; max-height: 50px;">
            </template>
          </el-table-column>
          <!-- 主图 end -->

          <!-- 副图 start -->
          <el-table-column :label="showLabel('futu')">
            <template slot-scope="{row}">
              <img :src="_fileLink(row.picture2_150)" style="max-width: 50px; max-height: 50px;">
            </template>
          </el-table-column>
          <!-- 副图 end -->

          <!-- 颜色 start -->
          <el-table-column :label="showLabel('yanse')">
            <template slot-scope="{row}">
              <div class="color-group" v-for="item in row.colors" :key="item.id">
                <div class="box" style="'width: 20px; height: 20px;">
                  <img :src="_fileLink(item.picture_40)" style="max-width: 20px; max-height: 20px;" @click="onClick(row)">
                </div>
              </div>
            </template>
          </el-table-column>
          <!-- 颜色 end -->

          <!-- 产品名称 start -->
          <el-table-column :label="showLabel('shangpinmingcheng')" width="250">
            <template slot-scope="{row}">
              {{ row.name }}
            </template>
          </el-table-column>
          <!-- 产品名称 end -->

          <!-- 年代 start -->
          <el-table-column :label="showLabel('niandai')" sortable="customer" prop="ageseason">
            <template slot-scope="{row}">
              {{ row.season }}
            </template>
          </el-table-column>
          <!-- 年代 end -->

          <!-- 国际码 start -->
          <el-table-column :label="showLabel('guojima')" width="200" sortable="customer" prop="wordcode">
            <template slot-scope="{row}">
              {{ row.wordcode }}
            </template>
          </el-table-column>
          <!-- 国际码 end -->

          <!-- 产品属性 start -->
          <el-table-column :label="showLabel('shangpinshuxing')">
            <template slot-scope="{row}">
              {{ row.type }}
            </template>
          </el-table-column>
          <!-- 产品属性 end -->

          <!-- 出厂价 start -->
          <el-table-column :label="showLabel('chuchangjia')" width="100">
            <template slot-scope="{row}">
              {{ row.fpCurrencyCode }} {{ row.factoryprice }}
            </template>
          </el-table-column>
          <!-- 出厂价 end -->

          <!-- 倍率 start -->
          <el-table-column :label="showLabel('beilv')">
            <template slot-scope="{row}">
              {{ row.times }}
            </template>
          </el-table-column>
          <!-- 倍率 end -->

          <!-- 国际零售价 start -->
          <el-table-column :label="showLabel('guojilingshoujia')" width="100">
            <template slot-scope="{row}">
              {{ row.wpCurrencyCode }} {{ row.wordprice }}
            </template>
          </el-table-column>
          <!-- 国际零售价 end -->

          <!-- 折扣率 start -->
          <el-table-column :label="showLabel('zhekoulv')">
            <template slot-scope="{row}">
              {{ row.discountRate }}
            </template>
          </el-table-column>
          <!-- 折扣率 end -->

          <!-- 本国零售价 start -->
          <el-table-column :label="showLabel('benguolingshoujia')" width="100">
            <template slot-scope="{row}">
              {{ row.npCurrencyCode }} {{ row.nationalprice }}
            </template>
          </el-table-column>
          <!-- 本国零售价 end -->

          <!-- 销售属性 start -->
          <el-table-column :label="showLabel('xiaoshoushuxing')">
            <template slot-scope="{row}">
              {{ row.saleType }}
            </template>
          </el-table-column>
          <!-- 销售属性 end -->

          <!-- 零售比 start -->
          <el-table-column :label="showLabel('lingshoubi')">
            0
          </el-table-column>
          <!-- 零售比 end -->

          <!-- 系列 start -->
          <el-table-column :label="showLabel('xilie')">
            <template slot-scope="{row}">
              {{ row.seriesTitle }}
            </template>
          </el-table-column>
          <!-- 系列 end -->

          <!-- 最后入库 start -->
          <el-table-column :label="showLabel('zuihouruku')">
            <template slot-scope="{row}">
              {{ row.laststoragedate }}
            </template>
          </el-table-column>
          <!-- 最后入库 end -->
        </el-table>
      </el-col>
    </el-row>
    <!-- 产品列表 end -->

    <!-- 分页 start -->
    <el-pagination v-if="list.length<pagination.total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagination.current*1"
                   :page-sizes="pagination.pageSizes"
                   :page-size="pagination.pageSize*1"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pagination.total*1">
    </el-pagination>
    <!-- 分页 end -->

    <!-- 新建商品对话框 start -->
    <el-dialog :title="showLabel('createProduct')" :visible.sync="dialogFormVisible" :center="true" width="1400px"
               :close-on-click-modal="false" :close-on-press-escape="false" custom-class="create-product-dialog">
      <add ref="productForm" @hideDialogForm="hideDialogForm" @reloadList="reloadList"></add>
    </el-dialog>
    <!-- 新建商品对话框 end -->

    <!-- 编辑商品对话框 start, 因为编辑功能也有添加的功能，所以也加上接收添加的逻辑 reloadList -->
    <asa-product ref="product" @reloadList="reloadList"></asa-product>
    <!-- 编辑商品对话框 end -->

  </div>
</template>

<script>
import globals from '../../component/globals.js'
import '../../assets/table.css'
import '../../assets/search-form.css'
import add from './add.vue'
import AsaProduct from "@/component/asa/Asa_Product"

export default {
  name: 'product',
  components: {
    AsaProduct,
    add
  },
  data() {
    return {
      dialogFormVisible: false,
      listLoading: true,
      list: [],
      listQuery: {
        wordcode: '',
        ageseason: [],
        brandid: [],
        brandgroupid: [],
        childbrand: [],
        series: []
      },
      childrenBrand: [],
      pagination: {
        pageSizes: globals.pageSizes,
        pageSize: 10,
        total: 0,
        current: 1
      },
      ageseasons: [],
      brands: [],
      categories: [],
      productMemos: [],
      series: []
    }
  },
  created() {
    this.getList()
    this.getProductRelatedOptions()
  },
  methods: {
    // 编辑商品对话框
    onClick(row) {
      let self = this;
      self.$refs.product.edit(true).setInfo(row).then(product => product.show(false));
    },
    getProductRelatedOptions() {
      let self = this
      self._fetch("/product/getProductRelatedOptions", {}).then(function (res) {
        self.ageseasons = res.data.ageseasons
        self.brands = res.data.brands
        self.categories = res.data.categories
        self.productMemos = res.data.productMemos
      })
    },
    handleSort(data) {
      this.listQuery.sort = data.prop
      this.listQuery.order = data.order
      this.getList()
    },
    handleDelete(row) {
      let self = this
      self._remove("/product/delete", {id: row.id}).then(function () {
        self.reloadList()
      })
    },
    handleResetFilter() {
      this.listQuery = {
        sort: undefined,
        order: undefined,
        wordcode: '',
        ageseason: [],
        brandid: [],
        brandgroupid: [],
        childbrand: [],
        series: []
      }
    },
    handleChangeBrand() {
      let self = this
      self.series = []
      self.listQuery.series = []

      if (self.listQuery.brandid.length > 0) {
        self.brands.forEach(item => {
          if (self.listQuery.brandid.indexOf(item.id) >= 0) {
            self.series.push.apply(self.series, item.series)
          }
        })
      } else {
        self.brands.forEach(item => {
          self.series.push.apply(self.series, item.series)
        })
      }
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
    handleCreate() {
      this.showDialogForm()
      if (typeof (this.$refs.productForm) != 'undefined') {
        this.$refs.productForm.resetDialogForm()
      }
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
    getList() {
      let self = this
      self.listLoading = true

      let params = Object.assign({
        page: self.pagination.current,
        pageSize: self.pagination.pageSize
      }, self.listQuery)
      self._fetch("/product/page", params).then(function (res) {
        self.list = res.data
        self.pagination = res.pagination
        self.listLoading = false
      })
    },
    // 重新加载列表
    reloadList() {
      this.getList()
    }
  }
}
</script>

<style>
.create-product-dialog .el-dialog__header {
  border-bottom: 1px solid #d3d3d3
}
</style>
