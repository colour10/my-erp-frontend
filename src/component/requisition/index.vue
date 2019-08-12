<template>
  <div>
    <el-row>
      <el-col :span="6">
        <as-button type="primary" @click="_showDialog('search')">{{_label('chaxun')}}</as-button>
        <auth auth="requisition">
          <as-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</as-button>
        </auth>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="24">
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
      </el-col>
    </el-row>
    <sp-dialog ref="search" width="300" :min-height="150">
      <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
        <el-row :gutter="0">
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('diaochuku')">
              <simple-select v-model="form.out_id" source="warehouse" />
            </el-form-item>
            <el-form-item :label="_label('diaoruku')">
              <simple-select v-model="form.in_id" source="warehouse" />
            </el-form-item>
            <el-form-item :label="_label('zhuangtai')">
              <simple-select v-model="form.status" source="requisitionstatus" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col align="center">
            <as-button auth="product" type="primary" @click="onSearch(form)" native-type="submit">{{_label("chaxun")}}</as-button>
            <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
          </el-col>
        </el-row>
      </el-form>
    </sp-dialog>
  </div>
</template>

<script>
export default {
  name: "sp-requisition",
  data() {
    const _label = this._label;
    return {
      form: {
        out_id: '',
        in_id: '',
        status: '',
      },
      props: {
        columns: [
          { name: "out_id", label: _label('diaochuku'), type: 'select', source: "warehouse" },
          { name: "in_id", label: _label('diaoruku'), type: 'select', source: "warehouse" },
          { name: "apply_staff", label: _label('shenqingren'), type: 'select', source: "user" },
          { name: "status", label: _label("zhuangtai"), type: "select", source: "requisitionstatus" },
        ],
        controller: "requisition",
        options: {
          action_width: 90,
        },
      },
    };
  },
  methods: {
    showFormToCreate() {
      this._open('/requisition/create');
    },
    showFormToEdit(rowIndex, row) {
      this._open('/requisition/edit/' + row.id);
    },
    onSearch() {
      const self = this;
      self.$refs.tablelist.search(self.form);
      self._hideDialog('search');
    },
  },
};
</script>
