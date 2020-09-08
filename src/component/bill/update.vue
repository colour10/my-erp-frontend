<template>
  <div>
    <el-form ref="order-form" class="formx" :model="form" label-width="100px" :inline="true" style="width:100%;"
             size="mini" :rules="formRules" :inline-message="false" :show-message="false">
      <!-- 回款情况 start -->
      <el-row :gutter="0">
        <asa-button @click="_showDialog('select-dialog')">{{_label("huikuanqingkuang")}}</asa-button>
      </el-row>
      <!-- 回款情况 end -->

      <el-row :gutter="0">
        <el-col :span="4" style="width:250px">
          <!-- 对账单号 start -->
          <el-form-item :label="_label('duizhangdanhao')">
            <el-input :value="form.billno" disabled/>
          </el-form-item>
          <!-- 对账单号 end -->

          <!-- 收付费 start -->
          <el-form-item :label="_label('shoufufei')">
            <simple-select v-model="form.billtype" source="billtype" disabled/>
          </el-form-item>
          <!-- 收付费 end -->

          <!-- 币种 start -->
          <el-form-item :label="_label('bizhong')">
            <simple-select v-model="form.currencyid" source="currency" disabled/>
          </el-form-item>
          <!-- 币种 end -->
        </el-col>

        <el-col :span="4" style="width:250px">
          <!-- 原始金额 start -->
          <el-form-item :label="_label('yuanshijine')">
            <el-input :value="form.amount_origin" disabled/>
          </el-form-item>
          <!-- 原始金额 end -->

          <!-- 调整金额 start -->
          <el-form-item :label="_label('tiaozhengjine')">
            <el-input :value="form.amount-form.amount_origin" disabled/>
          </el-form-item>
          <!-- 调整金额 end -->

          <!-- 对账金额 start -->
          <el-form-item :label="_label('duizhangjine')">
            <el-input v-model="form.amount" disabled/>
          </el-form-item>
          <!-- 对账金额 end -->
        </el-col>

        <el-col :span="8" style="width:500px">
          <el-row>
            <el-col :span="4" style="width:250px">
              <!-- 外部对账单 start -->
              <el-form-item :label="_label('waibuduizhangdanhao')">
                <el-input v-model="form.out_billno" disabled/>
              </el-form-item>
              <!-- 外部对账单 end -->

              <!-- 收付费单位 start -->
              <el-form-item :label="_label('shoufufeidanwei')">
                <simple-select v-model="form.supplierid" source="supplier" disabled/>
              </el-form-item>
              <!-- 收付费单位 end -->
            </el-col>

            <el-col :span="4" style="width:250px">
              <!-- 制单人 start -->
              <el-form-item :label="_label('zhidanren')">
                <sp-display-input :value="form.createstaff" source="currentUsers"/>
              </el-form-item>
              <!-- 制单人 end -->

              <!-- 制单日期 start -->
              <el-form-item :label="_label('zhidanriqi')">
                <el-input :value="form.createtime" disabled/>
              </el-form-item>
              <!-- 制单日期 end -->
            </el-col>
          </el-row>

          <!-- 发票抬头 start -->
          <el-row>
            <el-form-item :label="_label('fapiaotaitou')" class="twocol">
              <el-input :value="form.invoiceName" class="twocol" disabled/>
            </el-form-item>
          </el-row>
          <!-- 发票抬头 end -->
        </el-col>

        <el-col :span="4" style="width:250px">
          <!-- 备注 start -->
          <el-form-item :label="_label('beizhu')" label-width="50px">
            <el-input v-model="form.memo" type="textarea" disabled/>
          </el-form-item>
          <!-- 备注 end -->

          <!-- 状态 start -->
          <el-form-item :label="_label('zhuangtai')" label-width="50px">
            <sp-display-input :value="form.status" source="billstatus"/>
          </el-form-item>
          <!-- 状态 end -->
        </el-col>

      </el-row>
    </el-form>

    <el-row>
      <el-col :span="24" class="product">
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
              <sp-select-text :value="row.sales.salesstaff" source="currentUsers"/>
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
        </el-table>
      </el-col>
    </el-row>

    <!-- 对话框 start -->
    <sp-dialog ref="select-dialog" :min-height="50" :width="1100" @close="load">
      <simple-admin-page v-bind="props" ref="receive" :hide-create="true" :hide-form="true"
                         v-if="form.id>0"></simple-admin-page>
    </sp-dialog>
    <!-- 对话框 end -->
  </div>
</template>

<script>
    import {extend} from "../object.js";
    import orderMixin from "../mixins/order.js";

    export default {
        name: 'sp-billupdate',
        components: {},
        mixins: [orderMixin],
        data() {
            let self = this;
            let _label = self._label;

            return {
                form: {
                    billno: '',
                    amount: 0,
                    amount_origin: '',
                    billtype: '',
                    out_billno: '',
                    supplierid: '',
                    invoice: '',
                    currencyid: '',
                    memo: '',
                    createstaff: '',
                    createtime: '',
                    invoiceName: '',
                    status: '',
                },
                tabledata: [],
                props: {
                    columns: [
                        {
                            name: "enterdate",
                            label: _label("huikuanriqi"),
                            type: 'date',
                            width: 110,
                            default: _label('_date')
                        },
                        {
                            name: "currencyid",
                            label: _label("bizhong"),
                            type: 'select',
                            source: "currency",
                            width: 90,
                            sortable: false,
                            default: '',
                            disabled: true
                        },
                        {name: "amount", label: _label("jine"), width: 110},
                        {name: "invoice", label: _label("fapiaobianhao"), width: 110, sortable: false},
                        {name: "bankaccount", label: _label("huikuanzhanghu"), sortable: false, width: 150},
                        {name: "memo", label: _label("beizhu"), width: 150, sortable: false},
                        {
                            name: "createstaff",
                            label: _label("tijiaoren"),
                            type: 'select',
                            source: "user",
                            is_edit_hide: true,
                            width: 130
                        },
                    ],
                    controller: 'billconfirm',
                    auth: 'billconfirm',
                    base: {
                        billid: '',
                    },
                    options: {
                        isSearch: false,
                    },
                    isDisabled(column) {
                        return column.name == 'currencyid';
                    },
                },
            };
        },
        methods: {
            getSummary({columns, data}) {
                const self = this;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index == 5) {
                        sums[index] = self.f(data.reduce((total, row) => total + Number(row.amount), 0));
                    }
                });

                return sums;
            },

            async load() {
                const self = this;
                let params = self.$route.params;
                let {data} = await self._fetch("/bill/load", {id: params.id});

                extend(self.form, data.form);

                let row = await self._getRow('supplierinvoice', data.form.invoiceid);
                if (row) {
                    self.form.invoiceName = row.name;
                }

                self.tabledata = [];
                self.tabledata.push(...data.list);
            },
        },
        computed: {
            totalAmount() {
                const self = this;
                return self.f(self.tabledata.reduce((total, row) => total + Number(row.amount), 0));
            },
        },
        async mounted() {
            const self = this;

            await self.load();
            self.props.base.billid = self.form.id;
            self.props.columns[1].default = self.form.currencyid;
            self._setTitle(self._label("duizhangdan") + ":" + self.form.billno);
        },
    };
</script>
