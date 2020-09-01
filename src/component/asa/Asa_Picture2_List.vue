<template>
  <div>
    <!-- 数据列表 start -->
    <el-table :data="list" stripe border style="width:100%;">
      <!-- 序号 start -->
      <el-table-column
          prop="id"
          align="center"
          sortable
          :label="_label('bianhao')"
          width="100"></el-table-column>
      <!-- 序号 end -->

      <!-- 图片start -->
      <el-table-column
          align="center"
          :label="_label('zhutu')"
          width="100">
        <template slot-scope="{row}">
          <img :src="_fileLink(row.picture)"
               style="max-width: 50px; max-height: 50px; display: block; margin:0 auto; padding: 5px;">
        </template>
      </el-table-column>
      <!-- 图片end -->

      <!-- 操作按钮 start -->
      <el-table-column :label="showLabel('caozuo')" align="center" width="150"
                       class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <!-- 下载 start -->
          <el-button type="default" size="mini" @click="handleDownload(row)">{{ showLabel('download') }}</el-button>
          <!-- 下载 end -->
        </template>
      </el-table-column>
      <!-- 操作按钮 end -->
    </el-table>
    <!-- 数据列表 end -->

    <!-- 分页 start -->
    <el-pagination style="margin-top:16px;" v-if="list.length<pagination.total"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pagination.current*1"
                   :page-sizes="[5, 10, 20, 30, 50, 100]"
                   :page-size="pagination.pageSize*1"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pagination.total*1">
    </el-pagination>
    <!-- 分页 end -->
  </div>
</template>

<script type="text/javascript">
export default {
  // 名称
  name: 'sp-picture-list',
  // 来自父组件的传值
  props: {
    wordcode: {
      type: String,
      default: '',
    }
  },
  // 相关变量
  data() {
    return {
      // OMS 订单列表
      list: [],
      // 分页选项
      pagination: {
        // 每页显示条数
        pageSize: 5,
        // 总记录数
        total: 0,
        // 当前页码
        current: 1
      },
      // 参数列表
      listQuery: {
        wordcode: this.wordcode
      },
      // 对话框
      dialogVisible: false,
      // 标题
      dialogTitle: '',
    };
  },
  // 方法列表
  methods: {
    // 分页相关
    handleSizeChange(pageSize) {
      this.pagination.pageSize = pageSize
      this.getList()
    },
    // 分页相关
    handleCurrentChange(current) {
      this.pagination.current = current
      this.getList()
    },
    // 获取 oms 所有订单
    getList() {
      let self = this
      // 构建分页
      let params = Object.assign({
        page: self.pagination.current,
        pageSize: self.pagination.pageSize
      }, self.listQuery)
      // 请求列表
      self._fetch("/product/wordcodepage", params).then(function (res) {
        self.list = res.data
        self.pagination = res.pagination
      })
    },
    // 下载
    handleDownload(row) {
      // 图片为空，无需下载
      if (!row.picture) {
        this.$message.error('图片地址为空，无需下载！')
        return false
      }
      // 然后通过服务器下载图片
    }
  },
  // 渲染前调用
  created() {
    // 获取订单列表
    this.getList()
  },
}
</script>
