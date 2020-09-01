<template>
  <sp-dialog ref="dialog" width="1200" class="product clearpadding">
    <el-table :data="tabledata" stripe border style="width:100%;">
      <el-table-column :label="_label('gongsidingdanhao')" align="center" width="130">
        <template v-slot="{row}">
          <el-button @click="openit(row.id)">{{row.orderno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="_label('gonghuoshang')" align="center" width="100">
        <template v-slot="{row, $index}">
          <sp-select-text :value="row.supplierid" source="supplier"/>
        </template>
      </el-table-column>
      <el-table-column :label="_label('niandaijijie')" width="100" align="center">
        <template v-slot="{row}">
          <sp-select-text :value="row.ageseason" source="ageseason"/>
        </template>
      </el-table-column>
      <el-table-column :label="_label('yewuleixing')" width="80" align="center">
        <template v-slot="{row}">
          <sp-select-text :value="row.bussinesstype" source="bussinesstype"/>
        </template>
      </el-table-column>
      <el-table-column :label="_label('bizhong')" width="80" align="center">
        <template v-slot="{row}">
          <sp-select-text :value="row.currency" source="currency"/>
        </template>
      </el-table-column>
      <el-table-column :label="_label('zongjine')" width="80" align="center" prop="total_discount_price"/>
      <el-table-column :label="_label('zongjianshu')" width="80" align="center" prop="total_number"/>
      <el-table-column :label="_label('zhekoulv')" width="80" align="center" prop="discount"/>
      <el-table-column :label="_label('tuishuilv')" width="80" align="center" prop="taxrebate"/>
      <el-table-column :label="_label('edu')" width="80" align="center" prop="quantum"/>
      <!-- <el-table-column :label="_label('beizhu')" width="80" align="center" prop="memo" /> -->
      <el-table-column :label="_label('dingdanriqi')" width="100" align="center">
        <template v-slot="{row}">
          {{row.maketime && row.maketime.length>0?row.maketime.substr(0,10):""}}
        </template>
      </el-table-column>
      <el-table-column :label="_label('pinpai')" align="center">
        <template v-slot="{row}">
          <sp-select-text :value="row.brandid" source="brand"/>
        </template>
      </el-table-column>
    </el-table>
  </sp-dialog>
</template>

<script type="text/javascript">
    export default {
        name: 'sp-orderbrand-list',
        props: {
            orderid: {},
            shippingid: {},
        },
        data() {
            return {
                tabledata: [],
            };
        },
        methods: {
            openit(id) {
                this._open('/orderbrand/' + id);
            },
            async show() {
                const self = this;

                if (self.orderid) {
                    let {data} = await self._fetch("/order/orderbrandlist", {id: self.orderid});
                    self.tabledata = [];
                    self.tabledata.push(...data);
                } else {
                    let {data} = await self._fetch("/shipping/orderbrandlist", {id: self.shippingid});
                    self.tabledata = [];
                    self.tabledata.push(...data);
                }
                self._showDialog('dialog');
            },
        },
    };
</script>
