<template>
  <sp-dialog ref="dialog" width="600">
    <el-table ref="tabledetail" :data="prices" stripe border style="width:100%;">
      <el-table-column :label="_label('mingcheng')" align="center" width="200">
        <template v-slot="{row}">
          {{row.name}}
        </template>
      </el-table-column>
      <el-table-column prop="label" :label="_label('jiage')" width="100" align="center">
        <template v-slot="{row, $index}">
          <el-input :ref="'1-'+$index" size="mini" v-model="row.price" @keyup.native="onKeyUp($event, 1, $index)" />
        </template>
      </el-table-column>
      <el-table-column prop="label" :label="_label('lingshoujiaxishu')" width="100" align="center">
        <template v-slot="{row, $index}">
          <el-input :ref="'2-'+$index" size="mini" v-model="row.discount" @keyup.native="onKeyUp($event, 2, $index)" />
        </template>
      </el-table-column>
      <el-table-column prop="label" :label="_label('chengbenxishu')" width="100" align="center">
        <template v-slot="{row, $index}">
          <el-input :ref="'3-'+$index" size="mini" v-model="row.discountCost" @keyup.native="onKeyUp($event, 3, $index)" />
        </template>
      </el-table-column>
    </el-table>
    <el-row :gutter="0">
      <el-col align="center">
        <as-button auth="product" type="primary" @click="save">{{_label("baocun")}}</as-button>
        <as-button type="primary" @click="_hideDialog('dialog')">{{_label("tuichu")}}</as-button>
      </el-col>
    </el-row>
  </sp-dialog>
</template>

<script type="text/javascript">
import API from '../api.js';

export default {
  name: 'asa-product-modify-price',
  props: {},
  data() {
    return {
      products: [],
      prices: [],
    };
  },
  methods: {
    async show(products) {
      const self = this;

      if (products.length == 0) {
        return;
      }

      self.products = [];
      self.products.push(...products);
      self._showDialog('dialog');

      if (self.prices.length == 0) {
        let prices = await self._dataSource('price').getList();
        //console.log('prices', prices);
        for (let item of prices) {
          self.prices.push({
            id: item.id,
            name: item.name,
            price: '', //固定价格数值
            discount: '', //零售价系数
            discountCost: '', //出厂价系数
          });
        }
      }
    },
    save() {
      const self = this;

      const params = {
        products: self.products.join(','),
        prices: self.prices.filter(item => item.price > 0 || item.discount > 0 || item.discountCost > 0),
      };

      console.log(JSON.stringify(params));
      //return ;
      self._submit('/product/modifyprices', { params: JSON.stringify(params) });
    },
    onKeyUp(event, columnIndex, rowIndex) {
      let self = this;
      //console.log(event)
      if (event.key === 'ArrowRight') {
        self.focus(columnIndex+1, rowIndex)
      } else if (event.key === 'ArrowLeft') {
        self.focus(columnIndex-1, rowIndex)
      } else if (event.key === 'ArrowUp') {
        self.focus(columnIndex, rowIndex-1)
      } else if (event.key === 'ArrowDown') {
        self.focus(columnIndex, rowIndex+1);
      }
    },
    focus(columnIndex, rowIndex) {
      let self = this;
      //console.log(columnIndex, rowIndex)
      if(columnIndex>3 || columnIndex<=0 || rowIndex<0 || rowIndex>=self.prices.length) {
        return ;
      }
      let name = columnIndex+ '-' + rowIndex;

      if (self.$refs[name]) {
        self.$refs[name].focus();
        self.$refs[name].select();
      }
    },
  },
  computed: {},
  mounted() {},
};
</script>
