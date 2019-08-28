<template>
  <div>
    <el-row>
      <el-col :span="24">
        <as-button type="primary" @click="_showDialog('search')" size="mini" icon="el-icon-search">{{_label("chaxun")}}</as-button>
        <asa-button @click="_open('/bill/create')" :enable="_isAllowed('bill-add')">{{_label('xinjian')}}</asa-button>
      </el-col>
    </el-row>
    <simple-admin-tablelist ref="tablelist" v-bind="props" :isedit="true" :isdelete="false" :onclickupdate="onclickupdate">
    </simple-admin-tablelist>

    <sp-dialog ref="search" width="400">
      <el-form class="order-form" :model="form" label-width="90px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
        <el-row :gutter="0">
          <el-col :span="8" style="width:300px">
            <el-form-item :label="_label('riqi')">
              <el-date-picker v-model="form.date" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <el-form-item :label="_label('zhuangtai')">
              <simple-select v-model="form.status" source="billstatus" />
            </el-form-item>
            <el-form-item :label="_label('shoufufeidanwei')">
              <simple-select v-model="form.supplierid" source="supplier" :multiple="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col align="center">
            <as-button type="primary" @click="onSearch(form)" native-type="submit">{{_label("chaxun")}}</as-button>
            <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
          </el-col>
        </el-row>
      </el-form>
    </sp-dialog>
  </div>
</template>

<script>
import config from '../config.js';

export default {
  name: 'sp-bill',
  data() {
    let self = this;
    let _label = self._label;

    return {
      form: {
        date: [self._label('_date'), self._label('_date')],
        supplierid: '',
        status: '',
      },
      props: {
        columns: [
          {
            name: "orderdate",
            label: _label('riqi'),
            width: 120,
            convert: function(row) {
              if (row.createtime && row.createtime.length > 0) {
                return row.createtime.substr(0, 10);
              }
            },
          },
          { name: "billno", label: _label('bianhao'), width: 120 },
          { name: "out_billno", label: _label('waibuduizhangdanhao'), type: 'select', source: "supplier" },
          { name: "supplierid", label: _label('shoufufeidanwei'), type: 'select', source: "supplier" },
          { name: "status", label: _label('huikuanqingkuang'), type: 'select', source: "billstatus", width: 120 },
          { name: "currencyid", label: _label('bizhong'), type: 'select', source: "currency", width: 80 },
          { name: "amount", label: _label('jine'), width: 100 },
        ],
        controller: "bill",
        actions: [
          {
            label: _label("shanchu"),
            type: "danger",
            handler: function({ row }) {
              self._remove("/order/delete", { id: row.id }).then(function(result) {
                if (result) {
                  self.$refs.tablelist.search(self.searchform)
                }
              })
            }
          },
        ],
        options: {
        },
      },
    };
  },
  methods: {
    onSearch(form) {
      let self = this;
      self.$refs.tablelist.search(form);
      self._hideDialog("search");
    },
    onclickupdate(rowIndex, row) {
      this._open('/bill/' + row.id);
    },
  },
  mounted() {
  },
};
</script>
