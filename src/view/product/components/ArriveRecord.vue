<template>
  <div class="arriveRecord">
    <el-table :data="list" border>

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

    <!-- 分页 start -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagination.current*1"
      :page-sizes="pagination.pageSizes"
      :page-size="pagination.pageSize*1"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total*1">
    </el-pagination>
    <!-- 分页 end -->
  </div>
</template>

<script>
    import globals from '@/component/globals.js';

    export default {
        name: "ArriveRecord",
        // 接收父组件的传值
        props: {
            // 外部 productid
            productid: {
                type: String
            }
        },
        data() {
            return {
                // 数据列表
                list: [],
                // 分页
                pagination: {
                    pageSizes: globals.pageSizes,
                    pageSize: 10,
                    total: 0,
                    current: 1,
                },
                // 滚动条
                listLoading: true,
                // 搜索条件
                listQuery: {},

            }
        },
        // 方法列表
        methods: {
            // 分页跳转
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.getList()
            },
            // 分页跳转
            handleCurrentChange(current) {
                this.pagination.current = current
                this.getList()
            },
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
            getList() {
                let self = this
                self.listLoading = true
                self.listQuery.productid = self.productid
                // 请求参数
                let params = Object.assign({
                    page: self.pagination.current,
                    pageSize: self.pagination.pageSize
                }, self.listQuery)
                // 请求远程入库的结果
                self._fetch("/shipping/list", params).then(function (res) {
                    self.list = res.data
                    self.pagination = res.pagination
                    self.listLoading = false
                })
            }
        },
        // 变量监听
        watch: {
            // 这个有时候没有值，可能是bug，只有当有值的时候才执行
            productid(newVal, oldVal) {
                // 测试是否有值, 第一次进入时 oldVal 为 undefined, 这显然不是我们想要的结果
                console.log('productid = ', newVal, oldVal)
                // 开始请求数据
                if (newVal !== undefined) {
                    this.getList()
                }
            }
        }
    }
</script>

<style scoped>
  .arriveRecord >>> .el-pagination {
    margin-top: 10px;
  }
</style>
