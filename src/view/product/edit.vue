<template>
  <el-tabs type="border-card" @tab-click="handleTabClick" v-model="currentTab" style="width: 1300px;">
    <!-- 基本资料 start -->
    <el-tab-pane :label="showLabel('jibenziliao')" name="info">
      <info></info>
    </el-tab-pane>
    <!-- 基本资料 end -->

    <!-- 商品尺寸 start -->
    <el-tab-pane :label="showLabel('shangpinchicun')" name="property">
      <property ref="property"></property>
    </el-tab-pane>
    <!-- 商品尺寸 end -->

    <!-- 商品条码 start -->
    <el-tab-pane :label="showLabel('shangpintiaoma')" name="code">
      <barcode ref="barcode"></barcode>
    </el-tab-pane>
    <!-- 商品条码 end -->

    <!-- 同款多色 start -->
    <el-tab-pane :label="showLabel('tongkuanduose')" name="colorgroup">
      <color-group ref="colorGroup"></color-group>
    </el-tab-pane>
    <!-- 同款多色 end -->

    <!-- 商品图片 start -->
    <el-tab-pane :label="showLabel('shangpintupian')" name="album">
      <album ref="album"></album>
    </el-tab-pane>
    <!-- 商品图片 end -->

    <!-- 价格 start -->
    <el-tab-pane :label="showLabel('jiage')" name="price">
      <price ref="price"></price>
    </el-tab-pane>
    <!-- 价格 end -->

    <!-- 库存 start -->
    <el-tab-pane :label="showLabel('kucun')" name="stock">
      <stock ref="stock"></stock>
    </el-tab-pane>
    <!-- 库存 end -->

    <!-- 到货记录 start -->
    <el-tab-pane :label="showLabel('arrive-record')" name="ArriveRecord">
      <arrive-record ref="ArriveRecord"></arrive-record>
    </el-tab-pane>
    <!-- 到货记录 end -->

  </el-tabs>
</template>

<script>
import info from './components/info.vue'
import property from './components/property.vue'
import barcode from './components/barcode.vue'
import colorGroup from './components/colorGroup.vue'
import album from './components/album.vue'
import price from './components/price.vue'
import stock from './components/stock.vue'
import ArriveRecord from "@/view/product/components/ArriveRecord"

export default {
  components: {ArriveRecord, info, property, barcode, colorGroup, album, price, stock},
  data() {
    return {
      currentTab: 'info'
    }
  },
  methods: {
    handleTabClick(tab) {
      let self = this

      switch (tab.name) {
        case 'property':
          self.$refs.property.getProductSizeContents()
          break

        case 'code':
          self.$refs.barcode.getProductSizeContents()
          break

        case 'colorgroup':
          self.$refs.colorGroup.loadColorGroupList()
          break

        case 'album':
          self.$refs.album.loadList()
          break

        case 'price':
          self.$refs.price.load()
          break

        case 'stock':
          self.$refs.stock.load()
          break

        case 'ArriveRecord':
          self.$refs.ArriveRecord.getList()
          break
      }
    }
  },
  async mounted() {
    let res = await this._fetch("/product/title", {id: this.$route.params.id})
    this._setTitle(res.data);
  }
}
</script>
