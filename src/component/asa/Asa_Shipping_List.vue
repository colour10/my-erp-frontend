<template>
  <sp-dialog ref="dialog" width="1000" class="product clearpadding">
    <el-table :data="tabledata" stripe border style="width:100%;">
      <el-table-column :label="_label('rukudanhao')" align="center" width="130">
        <template v-slot="{row}">
          <el-button @click="openit(row.id)">{{row.orderno}}</el-button>
        </template>
      </el-table-column>
      <el-table-column :label="_label('daohuocangku')" align="center" width="100">
        <template v-slot="{row, $index}">
          <sp-select-text :value="row.warehouseid" source="warehouse"/>
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
          <sp-select-text :value="row.status" source="shippingstatus"/>
        </template>
      </el-table-column>
      <el-table-column :label="_label('fahuoriqi')" width="100" align="center">
        <template v-slot="{row}">
          {{row.maketime && row.maketime.length>0?row.maketime.substr(0,10):""}}
        </template>
      </el-table-column>

      <el-table-column :label="_label('rukuriqi')" width="100" align="center">
        <template v-slot="{row}">
          {{row.warehousingtime && row.warehousingtime.length>0?row.warehousingtime.substr(0,10):""}}
        </template>
      </el-table-column>
    </el-table>
  </sp-dialog>
</template>

<script type="text/javascript">
    export default {
        name: 'sp-shipping-list',
        props: {
            orderbrandid: {},
        },
        data() {
            return {
                tabledata: [],
            };
        },
        methods: {
            openit(id) {
                this._open('/shipping/warehousing/' + id);
            },
            // 查看发货单列表
            async show() {
                const self = this;

                let {data} = await self._fetch("/orderbrand/shippinglist", {id: self.orderbrandid});
                self.tabledata = [];
                self.tabledata.push(...data);
                self._showDialog('dialog');
            },
        },
    };
</script>
