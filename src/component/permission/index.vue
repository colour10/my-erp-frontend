<template>
  <div style="width:99%">
    <multiple-admin-page v-bind="props" ref="page" class="product"></multiple-admin-page>
    <sp-dialog ref="detail" width="800" :min-height="150">
      <simple-admin-page v-bind="props2"></simple-admin-page>
    </sp-dialog>
  </div>
</template>

<script>
import { _label, getAvailableHeight } from '../globals.js'
import { getProp } from "../prop.js"

export default {
  name: 'sp-permission',
  data() {
    const self = this;
    let _label = this._label;

    return {
      props: {
        columns: [
          { name: "id", label: _label("ID"), is_edit_hide: true, width:60 },
          { name: "memo", label: _label("mingcheng"), is_multiple: true, is_focus: true },
          { name: "pid", label: _label("pid"), width:60 },
          { name: "name", label: _label("bianma") },
          { name: "display_index", label: _label("xuhao") },
          //{ name: "is_only_superadmin", label: _label("pingtaiquanxian"), type: "switch" },
        ],
        controller: "permission",
        key_column: "memo",
        actions: [{
          label: _label('quanxian'),
          handler: function({ row, vm }) {
            self.props2.base.permissionid = row.id;
            self._showDialog('detail');
          }
        }],
        options: {
            action_width: 250,
            isAutoReload:true,
        },
      },
      props2: {
        columns: [
          { name: "controller", label: _label("mingcheng"), is_focus: true },
          { name: "action", label: _label("bianma") },
        ],
        controller: "permissionaction",
        base: {
          permissionid: '',
        },
      },
    };
  },
  methods: {
  },
};
</script>
