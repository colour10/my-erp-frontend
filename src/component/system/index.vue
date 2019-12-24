<template>
  <div style="width:1100px">
    <el-tabs type="border-card" @tab-click="onTabClick" v-model="currentTab">
      <el-tab-pane :label="_label('jibenziliao')" name="info">
        <myform name="company" ref="company" @submit="onSubmit" :inline="true" authname="company" :isEditable="fture" width="800px">
        </myform>
      </el-tab-pane>
      <el-tab-pane :label="_label('kaipiaoxinxi')" name="companyinvoice">
        <simple-admin-page v-bind="props" ref="page2"></simple-admin-page>
      </el-tab-pane>
      <el-tab-pane label="OMS Setting" name="price">
        <el-form ref="order-form" class="formx2" :model="form" label-width="80px" :inline="true" style="width:100%;" size="mini" :inline-message="false" :show-message="false">
          <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item :label="_label('xiangganggonghuojia')">
                <simple-select v-model="form.hkgcost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="_label('ouzhougonghuojia')">
                <simple-select v-model="form.eurcost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="_label('guoneigonghuojia')">
                <simple-select v-model="form.chncost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="_label('baoshuigonghuojia')">
                <simple-select v-model="form.bdacost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="_label('xiaoshouduankou')">
                <simple-select v-model="form.oms_saleport" source="saleport"></simple-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item :label="_label('xiaoshoucangku')">
                <simple-select v-model="form.oms_warehouseids" source="warehouse" multiple></simple-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24" align="center">
              <asa-button @click="submit">{{_label("baocun")}}</asa-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import globals, { _label,extendExt } from '../globals.js'
import form from '../form.vue'
import { fture } from "../function.js"
import { getProp } from "../prop.js"

const props = getProp('companyinvoice');

export default {
  name: 'sp-system',
  components: {
    "myform": form
  },
  data() {
    return {
      form: {
        hkgcost: '',
        eurcost: '',
        chncost: '',
        bdacost: '',
        oms_saleport: '',
        oms_warehouseids: ''
      },
      currentTab: "info",
      fture,
      props: props
    }
  },
  methods: {
    submit() {
      const self = this
      self._submit("/company/update", self.form).then(function() {})
    },
    onTabClick(tab) {
      var self = this
    },
    onSubmit(form) {
      var self = this
      self._submit("/company/update", form).then(function() {})
    },
    async loadInfo() {
      var self = this;
      let info = await self._fetch("/company/info", {})

      extendExt(self.form, info.data)
      self.$refs['company'].setInfo(info.data)
      props.base.companyid = info.data.id
    }
  },
  async mounted() {
    const self = this
    self.loadInfo()
  }
}
</script>
