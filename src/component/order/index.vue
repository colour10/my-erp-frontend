<template>
  <div>
    <el-row>
      <el-col :span="24">
        <as-button type="primary" @click="_showDialog('search')" size="mini" icon="el-icon-search">{{_label("chaxun")}}</as-button>
        <asa-button type="primary" @click="toPage(0)" :enable="_isAllowed('order-add')">{{_label('xinjian')}}</asa-button>
      </el-col>
    </el-row>
    <simple-admin-tablelist ref="tablelist" v-bind="props" :isedit="false" :isdelete="false">
      <template v-slot:orderno="{row}">
        <sp-order-tip column="orderno" :order="row"></sp-order-tip>
      </template>
      <template v-slot:genders="{row}">
        <sp-select-text :value="row.genders" source="gender"></sp-select-text>
      </template>
      <template v-slot:brandids="{row}">
        <sp-select-text :value="row.brandids" source="brand"></sp-select-text>
      </template>
    </simple-admin-tablelist>
    <sp-dialog ref="search" width="600">
      <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
        <el-row :gutter="0">
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('dingdanhao')">
              <el-input v-model="form.keyword" class="width2" />
            </el-form-item>
            <el-form-item :label="_label('dinghuokehu')">
              <simple-select v-model="form.bookingid" source="supplier_2" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('niandai')">
              <simple-select v-model="form.ageseason" source="ageseason" :multiple="true" />
            </el-form-item>
            <el-form-item :label="_label('pinpai')">
              <simple-select v-model="form.brandids" source="brand" :multiple="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('gonghuoshang')">
              <simple-select v-model="form.supplierid" source="supplier_3" :clearable="true" />
            </el-form-item>
            <el-form-item :label="_label('jijie')">
              <simple-select v-model="form.seasontype" source="seasontype" />
            </el-form-item>
            <el-form-item :label="_label('yewuleixing')" prop="bussinesstype">
              <simple-select v-model="form.bussinesstype" source="bussinesstype" />
            </el-form-item>
            <el-form-item :label="_label('shuxing')" prop="property">
              <simple-select v-model="form.property" source="orderproperty" />
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
  name: 'sp-order',
  data() {
    let self = this;
    let _label = self._label;

    return {
      form: {
        keyword: "",
        bookingid: "",
        ageseason: "",
        brandids: "",
        supplierid: "",
        seasontype: "",
        bussinesstype: "",
        property: "",
      },
      props: {
        columns: [
          { name: "orderno", label: _label('dingdanbianhao'), width: 120 },
          { name: "bookingid", label: _label('dinghuokehu'), type: 'select', source: "supplier" },
          { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier" },
          { name: "ageseason", label: _label('niandai'), type: 'select', source: "ageseason", width: 100 },
          { name: "currency", label: _label('bizhong'), type: 'select', source: "currency", width: 80 },
          { name: "total", label: _label('jine'), width: 100, sortMethod:self.sortMethodAmount},
          { name: "discount", label: _label('zhekoulv'), width: 100 },
          { name: "genders", label: _label('xingbie') },
          { name: "brandids", label: _label('pinpai') },
          { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype", width: 120 },
          { name: "status", label: _label('zhuangtai'), type: 'select', source: "orderstatus", width: 90 }, {
            name: "orderdate",
            label: _label('dingdanriqi'),
            width: 120,
            convert: function(row) {
              if (row.maketime && row.maketime.length > 0) {
                return row.maketime.substr(0, 10);
              }
            },
          },
        ],
        controller: "order",
        actions: [
          { label: _label("xiangqing"), handler: self.toEdit, type: '' }, {
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
          rowStyle({ row, rowIndex }) {
            return {
              color: row.status == '2' ? config.color.success : config.color.font,
            };
          },
        },
      },
    };
  },
  methods: {
    sortMethodAmount(a, b) {
      return a.total-b.total>=0?1:-1;
    },
    onSearch(form) {
      let self = this;
      self.$refs.tablelist.search(form);
      self._hideDialog("search");
    },
    toPage(id) {
      this._open('/order/' + id);
    },
    toEdit({ row, vm }) {
      this.toPage(row.id);
    },
  },
  mounted() {
    console.log(this._isAllowed('order-delete'))
  },
};
</script>
