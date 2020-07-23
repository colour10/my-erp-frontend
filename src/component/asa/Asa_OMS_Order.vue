<template>
  <div>
    <!-- 数据列表 start -->
    <el-table :data="list" stripe border style="width:100%;">
      <!-- 订单编号 start -->
      <el-table-column
        prop="orderNo"
        align="center"
        sortable
        :label="_label('dingdanhao')"
        width="100"></el-table-column>
      <!-- 订单编号 end -->

      <!-- 订单时间 start -->
      <el-table-column
        prop="created_at"
        align="center"
        sortable
        :label="_label('dingdanshijian')"
        width="180"></el-table-column>
      <!-- 订单时间 end -->

      <!-- 产品名称 start, 同时商品名称保留跳转功能 -->
      <el-table-column
        prop="productName"
        align="center"
        :label="_label('shangpinmingcheng')"
        width="180">
        <template slot-scope="{row}">
          <el-link type="primary" @click="onClick(row)">{{ row.productName }}</el-link>
        </template>
      </el-table-column>
      <!-- 产品名称 end -->

      <!-- 颜色 start -->
      <el-table-column
        prop="color"
        align="center"
        :label="_label('yansemingcheng')"
        width="100"></el-table-column>
      <!-- 颜色 end -->

      <!-- 尺码 start -->
      <el-table-column
        prop="sizecontent"
        align="center"
        :label="_label('chima')"
        width="100"></el-table-column>
      <!-- 尺码 end -->

      <!-- 收件人信息 start -->
      <el-table-column
        prop="consignee"
        :label="_label('consignee-info')"
        width="180">
        <template slot-scope="scope">
          {{scope.row.consignee}}<br>
          {{scope.row.consignee_telephone}}<br>
          {{scope.row.consignee_address}}
        </template>
      </el-table-column>
      <!-- 收件人信息 end -->

      <!-- 订单金额 start -->
      <el-table-column
        prop="orderTotal"
        align="center"
        sortable
        :label="_label('dingdanjine')"
        width="150"></el-table-column>
      <!-- 订单金额 end -->

      <!-- 订单状态 start -->
      <el-table-column
        prop="orderStatus"
        align="center"
        sortable
        :label="_label('order-status')"
        width="100"></el-table-column>
      <!-- 订单状态 end -->

      <!-- 付款状态 start -->
      <el-table-column
        prop="paymentStatus"
        align="center"
        sortable
        :label="_label('payment-status')"
        width="100"></el-table-column>
      <!-- 付款状态 end -->

      <!-- 发货状态 start -->
      <el-table-column
        prop="shippingStatus"
        align="center"
        :label="_label('ship-status')">
        <template slot-scope="scope">
          <!-- 如果没有处理，这里显示按钮，否则显示处理好的状态 -->
          <as-button type="primary" @click="showShippingDialog(scope.row)" v-if="scope.row.isRefuse == undefined">
            {{_label('caozuo')}}
          </as-button>
          <span v-if="scope.row.isRefuse != undefined">
            {{ scope.row.isRefuseText }}<br>
            {{ scope.row.isNoExpressText }}<br>
            {{ scope.row.note }}<br>
            {{ scope.row.shipmentCopCode }}<br>
            {{ scope.row.trackingNumber }}
          </span>
        </template>
      </el-table-column>
      <!-- 发货状态 end -->
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

    <!-- 发货操作 start，这个对话框要在最上层 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :append-to-body="true"
      center>

      <!-- 表格字段 start -->
      <el-form :model="form">
        <!-- 是否拒绝发货 start，这个为必填 -->
        <el-form-item :label="_label('is-refuse-delivery')">
          <el-select v-model="form.isRefuse" :placeholder="_label('qingxuanze')" value="" size="small">
            <el-option :label="_label('normal-delivery')" value="0"></el-option>
            <el-option :label="_label('refuse-delivery')" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否拒绝发货 end -->

        <!-- 是否无需物流 start, 当 isRefuse 选择为 0 的时候，这个选项卡显示 -->
        <el-form-item :label="_label('is-need-logistics')" v-if="form.isRefuse === '0'">
          <el-select v-model="form.isNoExpress" :placeholder="_label('qingxuanze')" value="" size="small">
            <el-option :label="_label('normal-delivery')" value="0"></el-option>
            <el-option :label="_label('self-delivery')" value="1"></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否无需物流 end -->

        <!-- 快递公司代码 start，当 isNoExpress 选择为 0 的时候，这个选项卡显示 -->
        <el-form-item :label="_label('express-code')" v-if="form.isRefuse === '0' && form.isNoExpress === '0'">
          <el-input v-model="form.shipmentCopCode" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <!-- 快递公司代码 end -->

        <!-- 快递单号 start，当 isNoExpress 选择为 0 的时候，这个选项卡显示 -->
        <el-form-item :label="_label('express-number')" v-if="form.isRefuse === '0' && form.isNoExpress === '0'">
          <el-input v-model="form.trackingNumber" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <!-- 快递单号 end -->

        <!-- 备注 start，当不需要物流的时候，这个显示出来 -->
        <el-form-item :label="_label('note')" v-if="form.isRefuse === '1' || form.isNoExpress === '1'">
          <el-input v-model="form.note" autocomplete="off" size="small"></el-input>
        </el-form-item>
        <!-- 备注 end -->
      </el-form>
      <!-- 表格字段 end -->

      <!-- 按钮 start，当是否拒绝发货不为空的时候，说明已经执行过发货操作了，按钮就不再显示了 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideShippingDialog" size="small">{{ _label("quxiao") }}</el-button>
        <el-button type="primary" @click="handleDeliver" size="small">{{ _label("queding") }}</el-button>
      </span>
      <!-- 按钮 end -->
    </el-dialog>
    <!-- 发货操作 end -->

    <!-- 编辑商品对话框 start, 因为编辑功能也有添加的功能，所以也加上接收添加的逻辑 reloadList -->
    <asa-product ref="product" @reloadList="getOmsOrderList"></asa-product>
    <!-- 编辑商品对话框 end -->
  </div>
</template>

<script type="text/javascript">
    // 引入相关模块
    import AsaButton from "@/component/button"
    import {_label} from "@/component/globals"
    import AsaProduct from "@/component/asa/Asa_Product"
    import SpProductTip from "@/component/asa/Asa_Product_Tip"

    export default {
        // 名称
        name: 'asa-oms-order',
        // 组件列表
        components: {
            SpProductTip,
            AsaProduct,
            AsaButton
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
                listQuery: {},
                // 对话框
                dialogVisible: false,
                // 标题
                dialogTitle: '',
                // 发货对话框的表单
                form: {},
            };
        },
        // 方法列表
        methods: {
            // 根据 productid 获取商品详情
            async getProductInfo(productid) {
                let self = this
                let productInfo = await self._fetch("/product/info", {id: productid}, {
                    showMessage: true
                })
                // 返回
                return productInfo.data
            },
            // 编辑商品对话框，需要根据这里的 row 把商品模型取出来
            onClick(row) {
                let self = this;
                // 判断 productid 是否为 null，如果为 null 直接报错
                if (row.productid == undefined) {
                    return self.$message.error(_label('dingdanhao') + ' : ' + row.orderNo + ', ' + _label('product-doesnot-exist'));
                }
                // 然后取出这个订单的商品详细信息
                let productInfo = self.getProductInfo(row.productid)
                // 测试
                self._log("最新的productInfo=", productInfo)
                // 并显示出来
                self.$refs.product.edit(true).setInfo(productInfo).then(product => product.show(false));
            },
            // 分页相关
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.getOmsOrderList()
            },
            // 分页相关
            handleCurrentChange(current) {
                this.pagination.current = current
                this.getOmsOrderList()
            },
            // 显示发货状态对话框
            showShippingDialog(row) {
                // 显示
                this.dialogVisible = true
                // 设置标题，暂时用订单号
                this.dialogTitle = row.orderNo
                // 表单信息也传过去
                this.form = row
            },
            // 关闭发货对话框
            hideShippingDialog() {
                // 隐藏
                this.dialogVisible = false
                // 退出时把数据还原
                this.getOmsOrderList()
            },
            // 发货逻辑
            handleDeliver() {
                // 逻辑
                // 因为只能执行一次，而且不可逆，所以使用询问框的形式提示用户
                let self = this;
                let params = {}
                params = Object.assign({}, self.form)
                self._confirm(_label("tip-queren"), async () => {
                    self._submit("/oms/delivery", {params: JSON.stringify(params)}).then(function (res) {
                        self.hideShippingDialog()
                        self.getOmsOrderList()
                    })
                })

                // 下面是不用询问框的，暂时保留，防止随时被替换
                // let self = this
                // let params = {}
                // params = Object.assign({}, self.form)
                // self._submit("/oms/delivery", {params: JSON.stringify(params)}).then(function (res) {
                //     self.hideShippingDialog()
                //     self.getOmsOrderList()
                // })
            },
            // 获取 oms 所有订单
            getOmsOrderList() {
                let self = this
                // 构建分页
                let params = Object.assign({
                    page: self.pagination.current,
                    pageSize: self.pagination.pageSize
                }, self.listQuery)
                // 请求列表
                self._fetch("/omsorder/page", params).then(function (res) {
                    self.list = res.data
                    self.pagination = res.pagination
                })
            },
        },
        // 渲染前调用
        created() {
            // 获取订单列表
            this.getOmsOrderList()
        },
    }
</script>
