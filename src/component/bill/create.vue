<template>
  <div>
    <el-form ref="order-form" class="formx" :model="form" label-width="100px" :inline="true" style="width:100%;"
             size="mini" :rules="formRules" :inline-message="false" :show-message="false">
      <!-- 保存+选择明细 start -->
      <el-row :gutter="0">
        <asa-button auth="order-submit" :enable="form.status!='2'" @click="saveOrder(1)">{{_label("baocun")}}
        </asa-button>
        <asa-button @click="_showDialog('select-dialog')">{{_label("xuanzemingxi")}}</asa-button>
      </el-row>
      <!-- 保存+选择明细 end -->

      <el-row :gutter="0">
        <el-col :span="4" style="width:250px">
          <!-- 对账单号 start -->
          <el-form-item :label="_label('duizhangdanhao')">
            <el-input disabled/>
          </el-form-item>
          <!-- 对账单号 end -->

          <!-- 收付费 start -->
          <el-form-item :label="_label('shoufufei')">
            <simple-select v-model="form.billtype" source="billtype"/>
          </el-form-item>
          <!-- 收付费 end -->

          <!-- 币种 start -->
          <el-form-item :label="_label('bizhong')">
            <simple-select v-model="form.currencyid" source="currency"/>
          </el-form-item>
          <!-- 币种 end -->
        </el-col>

        <el-col :span="4" style="width:250px">
          <!-- 原始金额 start -->
          <el-form-item :label="_label('yuanshijine')">
            <el-input :value="totalAmount" disabled/>
          </el-form-item>
          <!-- 原始金额 end -->

          <!-- 调整金额 start -->
          <el-form-item :label="_label('tiaozhengjine')">
            <el-input :value="form.amount-totalAmount" disabled/>
          </el-form-item>
          <!-- 调整金额 end -->

          <!-- 对账金额 start -->
          <el-form-item :label="_label('duizhangjine')">
            <el-input v-model="form.amount"/>
          </el-form-item>
          <!-- 对账金额 end -->
        </el-col>

        <el-col :span="8" style="width:500px">
          <el-row>
            <el-col :span="4" style="width:250px">
              <!-- 外部对账单号 start -->
              <el-form-item :label="_label('waibuduizhangdanhao')">
                <el-input v-model="form.out_billno"/>
              </el-form-item>
              <!-- 外部对账单号 end -->

              <!-- 收付费单位 start -->
              <el-form-item :label="_label('shoufufeidanwei')">
                <simple-select v-model="form.supplierid" source="supplier" @change="onSupplierChange"/>
              </el-form-item>
              <!-- 收付费单位 end -->
            </el-col>
            <el-col :span="4" style="width:250px">
              <!-- 制单人 start -->
              <el-form-item :label="_label('zhidanren')">
                <el-input :placeholder="_label('zidonghuoqu')" disabled/>
              </el-form-item>
              <!-- 制单人 end -->

              <!-- 制单日期 start -->
              <el-form-item :label="_label('zhidanriqi')">
                <el-input :placeholder="_label('zidonghuoqu')" disabled/>
              </el-form-item>
              <!-- 制单日期 end -->
            </el-col>
          </el-row>
          <el-row>
            <!-- 发票抬头 start -->
            <el-form-item :label="_label('fapiaotaitou')" class="twocol">
              <el-select v-model="form.invoiceid">
                <el-option v-for="item in invoices" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <!-- 发票抬头 end -->
          </el-row>
        </el-col>
        <el-col :span="12" class="b-col">
          <!-- 备注 start -->
          <el-form-item :label="_label('beizhu')" class="b-item">
            <el-input v-model="form.memo" type="textarea"/>
          </el-form-item>
          <!-- 备注 end -->
        </el-col>
      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24">
        <el-table :data="tabledata" stripe border style="width:100%;" :show-summary="true" :summary-method="getSummary">
          <!-- 销售端口 start -->
          <el-table-column :label="_label('xiaoshouduankou')" align="center" width="110">
            <template v-slot="{row, $index}">
              <sp-select-text :value="row.sales.saleportid" source="saleport"/>
            </template>
          </el-table-column>
          <!-- 销售端口 end -->

          <!-- 总数 start -->
          <el-table-column :label="_label('zongshu')" width="100" align="center">
            <template v-slot="{row}">
              <sp-fetch-text table="member" :pid="row.sales.memberid" column="name"/>
            </template>
          </el-table-column>
          <!-- 总数 end -->

          <!-- 币种 start -->
          <el-table-column :label="_label('bizhong')" width="80" align="center">
            <template v-slot="{row}">
              <sp-select-text :value="row.currency" source="currency"/>
            </template>
          </el-table-column>
          <!-- 币种 end -->

          <!-- 付款方式 start -->
          <el-table-column :label="_label('fukuanfangshi')" width="100" align="center">
            <template v-slot="{row}">
              <sp-select-text :value="row.paymentwayid" source="paymentway"/>
            </template>
          </el-table-column>
          <!-- 付款方式 end -->

          <!-- 金额 start -->
          <el-table-column :label="_label('jine')" width="100" align="center">
            <template v-slot="{row}">
              {{row.amount}}
            </template>
          </el-table-column>
          <!-- 金额 end -->

          <!-- 销售人 start -->
          <el-table-column :label="_label('xiaoshouren')" width="100" align="center">
            <template v-slot="{row}">
              <sp-select-text :value="row.sales.salesstaff" source="user"/>
            </template>
          </el-table-column>
          <!-- 销售人 end -->

          <!-- 销售单号 start -->
          <el-table-column :label="_label('xiaoshoudanhao')" width="130" align="center">
            <template v-slot="{row}">
              {{row.sales.orderno}}
            </template>
          </el-table-column>
          <!-- 销售单号 end -->

          <!-- 外部订单号 start -->
          <el-table-column :label="_label('waibudingdanhao')" width="130" align="center">
            <template v-slot="{row}">
              {{row.sales.expressno}}
            </template>
          </el-table-column>
          <!-- 外部订单号 end -->

          <!-- 付款日期 start -->
          <el-table-column :label="_label('fukuanriqi')" width="130" align="center">
            <template v-slot="{row}">
              {{row.paymentdate}}
            </template>
          </el-table-column>
          <!-- 付款日期 end -->

          <!-- 删除 start -->
          <el-table-column width="130" align="center">
            <template v-slot="{$index}">
              <el-button type="danger" size="mini" @click="removeRow($index)">{{_label('shanchu')}}</el-button>
            </template>
          </el-table-column>
          <!-- 删除 end -->
        </el-table>
      </el-col>
    </el-row>

    <!-- 选择明细对话框 start -->
    <sp-dialog ref="select-dialog" :min-height="50" :width="1100">
      <el-form :model="searchform" class="formx" label-width="85px" :inline="false" style="width:100%;" size="mini">
        <el-row :gutter="0">
          <el-col :span="8" style="width:300px">
            <!-- 销售日期 start -->
            <el-form-item :label="_label('xiaoshouriqi')">
              <el-date-picker v-model="searchform.date" type="daterange" range-separator="~" start-placeholder="开始日期"
                              end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
            </el-form-item>
            <!-- 销售日期 end -->

            <!-- 会员 start -->
            <el-form-item :label="_label('huiyuan')">
              <simple-select v-model="searchform.memberids" source="member" :multiple="true"></simple-select>
            </el-form-item>
            <!-- 会员 end -->
          </el-col>

          <el-col :span="8" style="width:300px">
            <!-- 外部订单号 start -->
            <el-form-item :label="_label('waibudingdanhao')">
              <el-input v-model="searchform.externalno"/>
            </el-form-item>
            <!-- 外部订单号 end -->

            <!-- 销售仓库 start -->
            <el-form-item :label="_label('xiaoshoucangku')">
              <simple-select v-model="searchform.warehouseid" source="warehouse"></simple-select>
            </el-form-item>
            <!-- 销售仓库 end -->
          </el-col>

          <el-col :span="8" style="width:300px">
            <!-- 外部订单号 start -->
            <el-form-item :label="_label('fukuanfangshi')">
              <simple-select v-model="searchform.paymentwayid" source="paymentway"></simple-select>
            </el-form-item>
            <!-- 外部订单号 end -->

            <!-- 外部订单号 start -->
            <el-form-item :label="_label('xiaoshouduankou')">
              <simple-select v-model="searchform.saleportid" source="saleport"></simple-select>
            </el-form-item>
            <!-- 外部订单号 end -->
          </el-col>
        </el-row>

        <!-- 查询+选择+退出 start -->
        <el-row :gutter="0">
          <el-col align="center">
            <as-button type="primary" @click="search">{{_label("chaxun")}}</as-button>
            <as-button type="primary" @click="select">{{_label("xuanze")}}</as-button>
            <as-button type="primary" @click="_hideDialog('select-dialog')">{{_label("tuichu")}}</as-button>
          </el-col>
        </el-row>
        <!-- 查询+选择+退出 end -->
      </el-form>

      <el-table ref="selectTable" :data="receives" stripe border style="width:100%;" max-height="400"
                @selection-change="onSelectionChange" @row-click="onRowClick">
        <!-- checkbox start -->
        <el-table-column type="selection" :width="30" align="center"/>
        <!-- checkbox end -->

        <!-- 销售端口 start -->
        <el-table-column :label="_label('xiaoshouduankou')" align="center" width="110">
          <template v-slot="{row, $index}">
            <sp-select-text :value="row.sales.saleportid" source="saleport"/>
          </template>
        </el-table-column>
        <!-- 销售端口 end -->

        <!-- 总数 start -->
        <el-table-column :label="_label('zongshu')" width="100" align="center">
          <template v-slot="{row}">
            <sp-fetch-text table="member" :pid="row.sales.memberid" column="name"/>
          </template>
        </el-table-column>
        <!-- 总数 end -->

        <!-- 币种 start -->
        <el-table-column :label="_label('bizhong')" width="80" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.currency" source="currency"/>
          </template>
        </el-table-column>
        <!-- 币种 end -->

        <!-- 付款方式 start -->
        <el-table-column :label="_label('fukuanfangshi')" width="100" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.paymentwayid" source="paymentway"/>
          </template>
        </el-table-column>
        <!-- 付款方式 end -->

        <!-- 金额 start -->
        <el-table-column :label="_label('jine')" width="100" align="center">
          <template v-slot="{row}">
            {{row.amount}}
          </template>
        </el-table-column>
        <!-- 金额 end -->

        <!-- 销售人 start -->
        <el-table-column :label="_label('xiaoshouren')" width="100" align="center">
          <template v-slot="{row}">
            <sp-select-text :value="row.sales.salesstaff" source="user"/>
          </template>
        </el-table-column>
        <!-- 销售人 end -->

        <!-- 销售单号 start -->
        <el-table-column :label="_label('xiaoshoudanhao')" width="130" align="center">
          <template v-slot="{row}">
            {{row.sales.orderno}}
          </template>
        </el-table-column>
        <!-- 销售单号 end -->

        <!-- 外部订单号 start -->
        <el-table-column :label="_label('waibudingdanhao')" width="130" align="center">
          <template v-slot="{row}">
            {{row.sales.expressno}}
          </template>
        </el-table-column>
        <!-- 外部订单号 end -->

        <!-- 付款日期 start -->
        <el-table-column :label="_label('fukuanriqi')" width="130" align="center">
          <template v-slot="{row}">
            {{row.paymentdate}}
          </template>
        </el-table-column>
      </el-table>
      <!-- 付款日期 end -->
    </sp-dialog>
    <!-- 选择明细对话框 end -->
  </div>
</template>

<script>
    import API from '../api.js';
    import {extend} from "../object.js";
    import orderMixin from "../mixins/order.js";

    export default {
        name: 'sp-billcreate',
        components: {},
        mixins: [orderMixin],
        data() {
            let self = this;

            return {
                form: {
                    amount: 0,
                    billtype: '1',
                    out_billno: '',
                    supplierid: '',
                    invoiceid: '',
                    currencyid: '',
                    memo: '',
                },
                searchform: {
                    date: [self._label('_date'), self._label('_date')],
                    externalno: '',
                    memberids: '',
                    warehouseid: '',
                    saleportid: '',
                    paymentwayid: '',
                },
                tabledata: [],
                receives: [],
                selected: [],
                invoices: [],
            };
        },
        methods: {
            removeRow(index) {
                const self = this;
                self.$delete(self.tabledata, index);
            },
            onRowClick(row) {
                this.$refs.selectTable.toggleRowSelection(row);
            },
            async onSupplierChange(supplierid) {
                const self = this;

                self.form.invoiceid = '';
                let list = await API.getSupplierInvoiceList(supplierid);
                self.invoices = [];
                self.invoices.push(...list);
            },
            select() {
                const self = this;
                console.log(self.selected)
                for (let item of self.selected) {
                    let target = self.tabledata.find(row => row.id == item.id);
                    if (target) {
                        continue;
                    }
                    self.tabledata.push(item);

                    self.form.currencyid = item.currency;
                }

                self.form.amount = self.totalAmount;
                self._hideDialog('select-dialog');
            },
            onSelectionChange(vals) {
                this.selected = vals;
            },
            // 搜索逻辑
            async search() {
                const self = this;
                const params = {
                    begin: self.searchform.date[0],
                    end: self.searchform.date[1],
                    externalno: self.searchform.externalno,
                    warehouseid: self.searchform.warehouseid,
                    memberids: self.searchform.memberids,
                    saleportid: self.searchform.saleportid,
                    paymentwayid: self.searchform.paymentwayid,
                };

                let {data} = await self._fetch('/salesreceive/searchlist', params);
                self.receives = [];
                self.receives.push(...data);
            },
            // 保存订单逻辑
            saveOrder() {
                // 保存订单
                let self = this;

                let params = {
                    form: extend({}, self.form),
                };
                params.form.amount_origin = self.totalAmount;
                params.list = self.tabledata.map(item => item.id);

                self.validate().then(() => {
                    self._submit("/bill/add", {params: JSON.stringify(params)}).then(function (res) {
                        self._redirect("/bill/" + res.data);
                    });
                });
            },
            // 删除记录
            deleteRow(row) {
                const self = this;
                // 找到 item 和 row 完全相同的元素
                let index = self.tabledata.findIndex(item => item == row);
                // 然后删除
                self.$delete(self.tabledata, index);
            },
            // 总和
            getSummary({columns, data}) {
                const self = this;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index == 4) {
                        sums[index] = self.f(data.reduce((total, row) => total + Number(row.amount), 0));
                    }
                });

                return sums;
            },
        },
        // 计算属性
        computed: {
            totalAmount() {
                const self = this;
                return self.f(self.tabledata.reduce((total, row) => total + Number(row.amount), 0));
            },
        },
        // 渲染前调用
        mounted() {

        },
    };
</script>

<style>
  .b-col >>> .b-item {
    width: 100px;
  }
</style>
