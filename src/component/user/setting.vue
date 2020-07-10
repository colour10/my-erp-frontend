<template>
  <el-tabs type="border-card" activeName="setting">
    <!-- 默认设置 start -->
    <el-tab-pane :label="_label('morenshezhi')" name="setting">
      <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:700px;" size="small">
        <!-- 销售端口 start -->
        <el-form-item :label="_label('xiaoshouduankou')">
          <simple-select v-model="form.saleportid" source="usersaleport"></simple-select>
        </el-form-item>
        <!-- 销售端口 end -->

        <!-- 价格 start -->
        <el-form-item :label="_label('jiage')">
          <simple-select v-model="form.priceid" source="userprice"></simple-select>
        </el-form-item>
        <!-- 价格 end -->

        <!-- 销售仓库 start -->
        <el-form-item :label="_label('xiaoshoucangku')">
          <simple-select v-model="form.warehouseid" source="userwarehouse"></simple-select>
        </el-form-item>
        <!-- 销售仓库 end -->
      </el-form>

      <!-- 保存按钮 start -->
      <as-button type="primary" @click="onSubmit">{{_label('baocun')}}</as-button>
      <!-- 保存按钮 end -->

    </el-tab-pane>
    <!-- 默认设置 end -->
  </el-tabs>
</template>

<script>
    import API from '../api.js';

    export default {
        name: 'sp-usersetting',
        data() {
            return {
                form: {
                    saleportid: '',
                    priceid: '',
                    warehouseid: '',
                },
            };
        },
        methods: {
            onSubmit() {
                let self = this;
                self._submit("/user/setting", self.form).then(() => {
                });
            },
        },
        async mounted() {
            const self = this;
            self._setTitle(self._label('gerenshezhi'));

            let setting = await API.getSetting();
            self.form.saleportid = setting.saleportid;
            self.form.warehouseid = setting.warehouseid;
            self.form.priceid = setting.priceid;
        },
    };
</script>
