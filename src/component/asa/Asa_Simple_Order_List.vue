<template>
  <sp-dialog ref="dialog" width="1200" class="product clearpadding">
    <el-table :data="tabledata" stripe border style="width:100%; margin-top:10px;">
      <el-table-column :label="_label('dingdanbianhao')" align="center" width="130">
        <template v-slot="{row}">
          <el-button @click="openit(row.id)">{{row.orderno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="_label('gonghuoshang')" align="center" width="100">
        <template v-slot="{row, $index}">
          <sp-select-text :value="row.bookingid" source="supplier"/>
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
      <el-table-column :label="_label('jine')" width="80" align="center" prop="total"/>
      <el-table-column :label="_label('zhekoulv')" width="80" align="center" prop="discount"/>
      <el-table-column :label="_label('dingdanriqi')" width="100" align="center">
        <template v-slot="{row}">
          {{row.maketime && row.maketime.length>0?row.maketime.substr(0,10):""}}
        </template>
      </el-table-column>
      <el-table-column :label="_label('xingbie')" width="150" align="center">
        <template v-slot="{row}">
          <sp-select-text :value="row.genders" source="gender"/>
        </template>
      </el-table-column>
      <el-table-column :label="_label('pinpai')" align="center">
        <template v-slot="{row}">
          <sp-select-text :value="row.brandids" source="brand"/>
        </template>
      </el-table-column>
    </el-table>
  </sp-dialog>
</template>

<script type="text/javascript">
    export default {
        name: 'sp-simple-order-list',
        props: {
            shippingid: {},
        },
        data() {
            return {
                tabledata: [],
            };
        },
        methods: {
            openit(id) {
                // 打开 ordersimple
                this._open('/ordersimple/' + id);
            },
            // 查看供货单订单的列表
            async show() {
                const self = this;

                let {data} = await self._fetch("/shippingsimple/orderlist", {id: self.shippingid});
                self.tabledata = [];
                self.tabledata.push(...data);
                self._showDialog('dialog');
            },
        },
    };
</script>
