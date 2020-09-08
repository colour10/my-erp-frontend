<template>
  <div>
    <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
      <el-row :gutter="0">
        <as-button type="primary" @click="saveOrder">{{_label("shenqing")}}</as-button>
      </el-row>
      <el-row :gutter="0">
        <!-- 调拨方式 start -->
        <el-col :span="6" style="width:300px">
          <el-form-item :label="_label('diaobofangshi')">
            <simple-select v-model="form.requisitiontype" source="requisitiontype"
                           :disabled="counter>0"></simple-select>
          </el-form-item>
        </el-col>
        <!-- 调拨方式 end -->

        <!-- 调出仓库 start -->
        <el-col :span="6" style="width:300px" v-if="form.requisitiontype=='1'">
          <el-form-item :label="_label('diaochucangku')">
            <simple-select v-model="form.out_id" source="warehouses"></simple-select>
          </el-form-item>
        </el-col>
        <!-- 调出仓库 end -->

        <!-- 调入仓库 start -->
        <el-col :span="6" style="width:300px" v-if="form.requisitiontype=='2'">
          <el-form-item :label="_label('diaorucangku')">
            <simple-select v-model="form.in_id" source="warehouses" :disabled="counter>0"></simple-select>
          </el-form-item>
        </el-col>
        <!-- 调入仓库 end -->

        <!-- 备注 start -->
        <el-col :span="6" style="width:300px" v-if="form.requisitiontype>0">
          <el-form-item :label="_label('beizhu')">
            <el-input v-model="form.memo"></el-input>
          </el-form-item>
        </el-col>
        <!-- 备注 end -->
      </el-row>
    </el-form>

    <!-- 调出 start -->
    <el-row v-if="form.requisitiontype=='1' && form.out_id>0">
      <el-col :span="24" class="product">
        <sp-requisition-out ref="requisition" :out_id="form.out_id"></sp-requisition-out>

      </el-col>
    </el-row>
    <!-- 调出 end -->

    <!-- 调入 start -->
    <el-row v-if="form.requisitiontype=='2' && form.in_id>0">
      <el-col :span="24" class="product">
        <sp-requisition-in ref="requisition" :in_id="form.in_id" @change="onChange"></sp-requisition-in>
      </el-col>
    </el-row>
    <!-- 调入 end -->

  </div>
</template>

<script>
    import {extend} from '../object.js';
    import Asa_Requisition_Out from '../asa/Asa_Requisition_Out.vue';
    import Asa_Requisition_In from '../asa/Asa_Requisition_In.vue';

    export default {
        name: 'sp-requisitioncreate',
        components: {
            [Asa_Requisition_Out.name]: Asa_Requisition_Out,
            [Asa_Requisition_In.name]: Asa_Requisition_In,
        },
        data() {
            return {
                form: {
                    requisitiontype: '',
                    out_id: "",
                    in_id: "",
                    memo: "",
                },
                counter: 0,
            };
        },
        methods: {
            //统一调入的商品条数
            onChange(length) {
                this.counter = length;
            },
            saveOrder() {
                //保存订单
                let self = this;

                let params = {memo: self.form.memo};

                // 判断如果是 undefined，则退出
                if (self.$refs.requisition === undefined) {
                    self.$message.error(self._label('operate_fail'))
                    return false
                }

                params.list = self.$refs.requisition.getList();
                for (let i = 0; i < params.list.length; i++) {
                    let row = params.list[i];
                    if (row.out_id > 0 && row.in_id > 0) {
                        if (row.stock_number >= row.number) {
                            continue;
                        } else {
                            // 库存不足
                            alert(self._label('kucunbuzu'));
                            return;
                        }
                    } else {
                        // 请选择仓库
                        alert(self._label('qingxuanzecangku'));
                        return;
                    }
                }

                // 验证调拨单明细列表不能为空
                if (params.list.length == 0) {
                    return alert(self._label('error-1000'));
                }

                if (!confirm(self._label('order_submit_confirm'))) {
                    return;
                }
                // self._log(JSON.stringify(params))
                self._submit("/requisition/save", {params: JSON.stringify(params)}).then(function (res) {
                    extend(self.form, {
                        out_id: "",
                        in_id: "",
                        memo: "",
                    });
                });
            },
        },
        mounted() {
            let self = this;
            self._setTitle(self._label("xinjiandiaobodan"));
        },
    };
</script>
