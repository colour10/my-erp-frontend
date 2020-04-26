<template>
  <div>
    <el-table :data="data" border>

      <el-table-column :label="_label('rukushijian')" prop="warehousingtime" align="center" sortable
                       :formatter="dataTimeFormat">
      </el-table-column>

      <el-table-column :label="_label('rukudanhao')" prop="orderno" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('nianfenjijie')" prop="ageseason_name" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('daohuocangku')" prop="warehouse_name" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('chima')" prop="shippingDetail.sizecontentid_names" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('shuliang')" prop="shippingDetail.sum" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('bizhong')" prop="currency_code" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('chengjiaojia')" prop="shippingDetail.sum_price" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('huilv')" prop="exchangerate" align="center" sortable>
      </el-table-column>

      <el-table-column :label="_label('zuizhongbenweibi')" prop="shippingDetail.sum_current_price" align="center"
                       sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "ArriveRecord",
        data() {
            return {
                data: [],
            }
        },
        methods: {
            // 时间格式化，格式化为2008-08-08的格式
            dataTimeFormat: function (row, column) {
                var t = new Date(row.warehousingtime);//row 表示一行数据, updateTime 表示要格式化的字段名称
                var year = t.getFullYear(),
                    month = t.getMonth() + 1,
                    day = t.getDate()
                var newTime = year + '-' +
                    (month < 10 ? '0' + month : month) + '-' +
                    (day < 10 ? '0' + day : day)
                return newTime;
            },
            // 取出列表
            async getList() {
                // 请求远程入库的结果
                let result = await this._fetch("/shipping/list", {productid: this.$route.params.id})
                // 赋值
                this.data = result.data
            }
        },
        // 渲染前取出数据
        created() {
            this.getList()
        }
    }
</script>

<style scoped>

</style>
