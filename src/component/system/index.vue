<template>
  <div style="width:1100px">
    <el-tabs type="border-card" @tab-click="onTabClick" v-model="currentTab">
      <!-- 基本资料 start -->
      <el-tab-pane :label="_label('jibenziliao')" name="info">
        <myform name="company" ref="company" @submit="onSubmit" :inline="true" authname="company" :isEditable="fture"
                width="800px">
        </myform>
      </el-tab-pane>
      <!-- 基本资料 end -->

      <!-- 开票信息 start -->
      <el-tab-pane :label="_label('kaipiaoxinxi')" name="companyinvoice">
        <simple-admin-page v-bind="props" ref="page2"></simple-admin-page>
      </el-tab-pane>
      <!-- 开票信息 end -->

      <!-- OMS 设置 start -->
      <el-tab-pane label="OMS Setting" name="price">
        <el-form ref="order-form" class="formx2" :model="form" label-width="90px" :inline="true" style="width:100%;"
                 size="mini" :inline-message="false" :show-message="false">
          <el-row :gutter="0">
            <!-- 香港供货价 start -->
            <el-col :span="6">
              <el-form-item :label="_label('xiangganggonghuojia')">
                <simple-select v-model="form.hkgcost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <!-- 香港供货价 end -->

            <!-- 欧洲供货价 start -->
            <el-col :span="6">
              <el-form-item :label="_label('ouzhougonghuojia')">
                <simple-select v-model="form.eurcost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <!-- 欧洲供货价 end -->

            <!-- 国内供货价 start -->
            <el-col :span="6">
              <el-form-item :label="_label('guoneigonghuojia')">
                <simple-select v-model="form.chncost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <!-- 国内供货价 end -->

            <!-- 保税供货价 start -->
            <el-col :span="6">
              <el-form-item :label="_label('baoshuigonghuojia')">
                <simple-select v-model="form.bdacost" source="price"></simple-select>
              </el-form-item>
            </el-col>
            <!-- 保税供货价 end -->

            <!-- 销售端口 start -->
            <el-col :span="6">
              <el-form-item :label="_label('xiaoshouduankou')">
                <simple-select v-model="form.oms_saleport" source="saleports"></simple-select>
              </el-form-item>
            </el-col>
            <!-- 销售端口 end -->

            <!-- 销售仓库 start -->
            <el-col :span="6">
              <el-form-item :label="_label('xiaoshoucangku')">
                <simple-select v-model="form.oms_warehouseids" source="warehouses" multiple></simple-select>
              </el-form-item>
            </el-col>
            <!-- 销售仓库 end -->
          </el-row>
          <el-row :gutter="0">
            <el-col :span="24" align="center">
              <asa-button @click="submit">{{_label("baocun")}}</asa-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <!-- OMS 设置 end -->
    </el-tabs>
  </div>
</template>

<script>
    import {extendExt} from '../globals.js'
    import form from '../form.vue'
    import {fture} from "../function.js"
    import {getProp} from "../prop.js"

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
                self._submit("/company/update", self.form).then(function () {
                })
            },
            onTabClick(tab) {
                var self = this
            },
            onSubmit(form) {
                var self = this
                self._submit("/company/update", form).then(function () {
                })
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
            self._log("props = ", props)
        }
    }
</script>

<style scoped>
  .user-form .width1 .el-input__inner {
    width: inherit;
  }
</style>
