<template>
  <div>
    <el-form ref="order-form" class="formx" :model="form" label-width="85px" :inline="true" style="width:100%;"
             size="mini" :rules="formRules" :inline-message="false" :show-message="false">
      <el-row :gutter="0">
        <!-- 注：未完成的订单可以使用保存功能 -->
        <asa-button auth="order-submit" :enable="form.status!='2' && isList" @click="saveOrder(1)">
          {{_label("baocun")}}
        </asa-button>

        <!-- 注：选择商品功能必须在未完成状态下才可以 -->
        <asa-button :enable="isEditable" @click="showProduct()">{{_label("xuanzeshangpin")}}</asa-button>
      </el-row>

      <!-- 订单查询条件 start -->
      <el-row :gutter="0" style="margin-top: 10px;">
        <el-col :span="4" style="width:230px">
          <!-- 订货客户 start -->
          <el-form-item :label="_label('dinghuokehu')" prop="bookingid">
            <simple-select v-model="form.bookingid" source="current_customer_2"/>
          </el-form-item>
          <!-- 订货客户 end -->

          <!-- 联系人 start -->
          <el-form-item :label="_label('lianxiren')">
            <simple-select v-model="form.linkmanid" source="supplierlinkman" :parentid="form.bookingid"/>
          </el-form-item>
          <!-- 联系人 end -->

          <!-- 供货商 start -->
          <el-form-item :label="_label('gonghuoshang')">
            <simple-select v-model="form.supplierid" source="current_supplier_2" :clearable="true"/>
          </el-form-item>
          <!-- 供货商 end -->

          <!-- 发货商 start -->
          <el-form-item :label="_label('fahuoshang')">
            <simple-select v-model="form.finalsupplierid" source="current_supplier_2" :clearable="true"/>
          </el-form-item>
          <!-- 发货商 end -->
        </el-col>
        <el-col :span="4" style="width:230px">
          <!-- 年代 start -->
          <el-form-item :label="_label('niandai')" prop="ageseason">
            <simple-select v-model="form.ageseason" source="ageseason"/>
          </el-form-item>
          <!-- 年代 end -->

          <!-- 季节 start -->
          <el-form-item :label="_label('jijie')">
            <simple-select v-model="form.seasontype" source="seasontype"/>
          </el-form-item>
          <!-- 季节 end -->

          <!-- 业务类型 start -->
          <el-form-item :label="_label('yewuleixing')" prop="bussinesstype">
            <simple-select v-model="form.bussinesstype" source="bussinesstype"/>
          </el-form-item>
          <!-- 业务类型 end -->

          <!-- 属性 start -->
          <el-form-item :label="_label('shuxing')" prop="property">
            <simple-select v-model="form.property" source="orderproperty"/>
          </el-form-item>
          <!-- 属性 end -->
        </el-col>
        <el-col :span="4" style="width:230px">
          <!-- 金额 start -->
          <el-form-item :label="_label('jine')">
            <el-input v-model="total_price" class="productcurrency" disabled>
              <simple-select source="currency" :clearable="false" v-model="form.currency" slot="prepend" disabled/>
            </el-input>
          </el-form-item>
          <!-- 金额 end -->

          <!-- 折扣率 start -->
          <el-form-item :label="_label('zhekoulv')">
            <sp-float-input v-model="form.discount" @change="onDiscountChange"/>
          </el-form-item>
          <!-- 折扣率 end -->

          <!-- 退税率 start -->
          <el-form-item :label="_label('tuishuilv')">
            <sp-float-input v-model="form.taxrebate"/>
          </el-form-item>
          <!-- 退税率 end -->

          <!-- 备注 start -->
          <el-form-item :label="_label('beizhu')">
            <el-input v-model="form.memo"/>
          </el-form-item>
          <!-- 备注 end -->
        </el-col>
        <el-col :span="4" style="width:230px">
          <!-- 客户订单号 start -->
          <el-form-item :label="_label('kehudingdanhao')">
            <el-input v-model="form.bookingorderno"/>
          </el-form-item>
          <!-- 客户订单号 end -->

          <!-- 公司订单号 start -->
          <el-form-item :label="_label('gongsidingdanhao')">
            <el-input v-model="form.orderno" :placeholder="_label('zidonghuoqu')" disabled/>
          </el-form-item>
          <!-- 公司订单号 end -->

          <!-- 制单人 start -->
          <el-form-item :label="_label('zhidanren')">
            <sp-display-input :value="form.makestaff" source="currentUsers" :placeholder="_label('zidonghuoqu')"/>
          </el-form-item>
          <!-- 制单人 end -->

          <!-- 订货日期 start -->
          <el-form-item :label="_label('dinghuoriqi')">
            <el-date-picker v-model="form.orderdate" type="date" value-format="yyyy-MM-dd"/>
          </el-form-item>
          <!-- 订货日期 end -->
        </el-col>
        <el-col :span="4" style="width:230px">
          <!-- 性别 start -->
          <el-form-item :label="_label('xingbie')">
            <simple-select source="gender" :multiple="true" v-model="form.genders"/>
          </el-form-item>
          <!-- 性别 end -->

          <!-- 品牌 start -->
          <el-form-item :label="_label('pinpai')">
            <simple-select source="brand" :multiple="true" v-model="form.brandids"/>
          </el-form-item>
          <!-- 品牌 end -->

          <!-- 制单日期 start -->
          <el-form-item :label="_label('zhidanriqi')">
            <el-input :value="form.maketime" :placeholder="_label('zidonghuoqu')" disabled></el-input>
          </el-form-item>
          <!-- 制单日期 end -->
        </el-col>
      </el-row>
      <!-- 订单查询条件 end -->

    </el-form>

    <!-- 每个sku和对应的spu的订货量 start，如果数据量比较大，那么 orderdetails 的值会传输的比较慢，这个可能需要做额外的优化 -->
    <el-row>
      <el-col :span="24" class="product">
        <el-table :data="orderdetails" stripe border style="width:100%;" :show-summary="true"
                  :summary-method="getSummary">
          <el-table-column align="center" width="60">
            <!-- 主图 start -->
            <template v-slot="scope">
              <img :src="_fileLink(scope.row.product.picture)" style="width:50px;height:50px;"/>
            </template>
            <!-- 主图 end -->
          </el-table-column>

          <!-- 国际码 start -->
          <el-table-column :label="_label('guojima')" align="center" width="200">
            <el-table-column :label="_label('guojima')" align="center" width="200">
              <template v-slot="scope">

                <!-- 此标签替换掉，否则会调用多次，严重影响性能 -->
                <!--                <sp-product-tip :product="scope.row.product"/>-->

                <el-link type="primary" @click="onClick(scope.row.product)" size="mini">
                  {{ scope.row.product.getGoodsCode() }}
                </el-link>

              </template>
              <template v-slot:header="{row}">
                <el-input v-model="form2.keyword" size="mini"/>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- 国际码 end -->

          <!-- 订货数量 start -->
          <el-table-column prop="number" :label="_label('dinggoushuliang')" align="center" :width="width">
            <template v-slot="{row, $index}">
              <sp-sizecontent-input :ref="$index" :columns="row.product.sizecontents" :uniq="row.product.id"
                                    :disabled="!isEditable" @change="onChange" :init="getInit(row.product.id)"
                                    :key="row.product.id" @up="focus($event, $index-1)"
                                    @down="focus($event, $index+1)"/>
            </template>
          </el-table-column>
          <!-- 订货数量 end -->

          <!-- 总数 start -->
          <el-table-column prop="total" :label="_label('zongshu')" width="100" align="center">
            <template v-slot="{row}">
              {{ stat[row.product.id].total }}
            </template>
          </el-table-column>
          <!-- 总数 end -->

          <!-- 币种 start -->
          <el-table-column prop="label" :label="_label('bizhong')" width="80" align="center">
            <template v-slot="{row}">
              {{row.product.factorypricecurrency_label}}
            </template>
          </el-table-column>
          <!-- 币种 end -->

          <!-- 出厂价 start -->
          <el-table-column prop="label" :label="_label('chuchangjia')" width="100" align="center">
            <template v-slot="{row}">
              <asa-order-input v-model="row.factoryprice" size="mini"/>
            </template>
          </el-table-column>
          <!-- 出厂价 end -->

          <!-- 出厂价合计 start -->
          <el-table-column prop="label" :label="_label('chuchangjiaheji')" width="100" align="center">
            <template v-slot="{row}">
              {{f(row.factoryprice*stat[row.product.id].total)}}
            </template>
          </el-table-column>
          <!-- 出厂价合计 end -->

          <!-- 折扣率 start -->
          <el-table-column prop="label" :label="_label('zhekoulv')" width="100" align="center">
            <template v-slot="{row}">
              <asa-order-input v-model="row.discount" size="mini"/>
            </template>
          </el-table-column>
          <!-- 折扣率 end -->

          <!-- 成交价 start -->
          <el-table-column prop="label" :label="_label('chengjiaojia')" width="130" align="center">
            <template v-slot="{row}">
              {{f(stat[row.product.id].dealPrice)}}
            </template>
          </el-table-column>
          <!-- 成交价 end -->

          <!-- 成交总价 start -->
          <el-table-column prop="label" :label="_label('chengjiaozongjia')" width="100" align="center">
            <template v-slot="{row}">
              {{f(stat[row.product.id].dealPrice*stat[row.product.id].total)}}
            </template>
          </el-table-column>
          <!-- 成交总价 end -->

          <!-- 产品名称 start -->
          <el-table-column :label="_label('chanpinmingcheng')" align="left" width="300">
            <template v-slot="scope">
              {{scope.row.product.getName()}}
            </template>
          </el-table-column>
          <!-- 产品名称 end -->

          <!-- 操作按钮 start -->
          <el-table-column :label="_label('caozuo')" width="100" align="center" v-if="isEditable">
            <template v-slot="{row}">
              <as-button size="mini" type="danger" @click="deleteRow(row)">{{_label('shanchu')}}</as-button>
            </template>
          </el-table-column>
          <!-- 操作按钮 end -->
        </el-table>
      </el-col>
    </el-row>
    <!-- 每个sku和对应的spu的订货量 end -->

    <!-- 选择商品对话框 start -->
    <asa-select-product-dialog
      :visible.sync="pro"
      :brandids="form.brandids"
      :genders="form.genders"
      @select="onSelect"/>
    <!-- 选择商品对话框 end -->

    <!-- 后查 - 品牌订单 start -->
    <sp-orderbrand-list ref="houcha" :orderid="form.id"/>
    <!-- 后查 - 品牌订单 end -->

    <!-- 编辑商品对话框 start -->
    <asa-product ref="product"></asa-product>
    <!-- 编辑商品对话框 end -->
  </div>
</template>

<script>
    import {copyTo, extend} from "../object.js";
    import detailConvert from "../asa/order-detail.js";
    import orderMixin from "../mixins/order.js";
    import {statHelper} from "../helper.js";
    import Asa_Orderbrand_List from '../asa/Asa_Orderbrand_List.vue';
    import Asa_Sizecontent_Input from '../asa/Asa_Sizecontent_Input.vue';
    import Asa_Select_Product_Dialog from '../asa/Asa_Select_Product_Dialog.vue'
    import AsaProduct from "@/component/asa/Asa_Product"

    export default {
        name: 'sp-orderform',
        components: {
            AsaProduct,
            [Asa_Orderbrand_List.name]: Asa_Orderbrand_List,
            [Asa_Sizecontent_Input.name]: Asa_Sizecontent_Input,
            [Asa_Select_Product_Dialog.name]: Asa_Select_Product_Dialog,
        },
        mixins: [orderMixin],
        data() {
            let self = this;

            return {
                form: {
                    bookingid: "",
                    orderdate: "",
                    linkmanid: "",
                    bussinesstype: "",
                    supplierid: "",
                    finalsupplierid: "",
                    ageseason: "",
                    seasontype: "",
                    bookingorderno: "",
                    makedate: "",
                    currency: "",
                    discount: "1",
                    taxrebate: "1",
                    property: "1",
                    makestaff: "",
                    maketime: "",
                    memo: "",
                    orderno: "",
                    status: "", //状态，1=保存；2=送审；3=审核完成
                    id: "",
                    brandids: '',
                    genders: '',
                },
                form2: {
                    keyword: '',
                },
                tabledata: [],
                listdata: [],
                details: [],
                pro: false,
            };
        },
        // 方法列表
        methods: {
            // 编辑当前商品
            onClick(row) {
                let self = this;
                self.$refs.product.edit(true).setInfo(row).then(product => product.show(false));
            },
            // 修改订货数量
            focus(colIndex, index) {
                let target = this.$refs[index];
                if (target) {
                    target.startFocus(colIndex);
                }
            },
            // 选择商品对话框
            showProduct() {
                this.pro = true;
            },
            // 选择商品对话框的选择功能
            onSelect(productDetail) {
                let self = this;
                self.appendRow({
                    id: "",
                    product: productDetail,
                    discount: self.form.discount,
                    factoryprice: self.f(productDetail.factoryprice),
                    total: 0,
                });
            },
            // 订单保存
            saveOrder(status) {
                //保存订单
                let self = this;

                let params = {
                    form: extend({}, self.form, {status}),
                };
                params.form.total = self.total_price;

                let list = [];
                for (let item of self.tabledata) {
                    // self._log("item", item)
                    for (let row of self.listdata) {
                        if (row.productid === item.product.id && row.number > 0) {
                            list.push({
                                productid: item.product.id,
                                discount: item.discount,
                                sizecontentid: row.sizecontentid,
                                number: row.number,
                                factoryprice: item.factoryprice,
                                id: self.getDetailId(item.product.id, row.sizecontentid),
                            });
                        }
                    }
                }

                params.list = list;

                self.validate().then(() => {
                    // 这里使用 /ordersimple/saveorder 来处理
                    self._submit("/ordersimple/saveorder", {params: JSON.stringify(params)}).then(function (res) {
                        let data = res.data;
                        self._redirect("/ordersimple");
                    });
                });
            },
            getDetailId(productid, sizecontentid) {
                let row = this.details.find(item => item.productid === productid && item.sizecontentid === sizecontentid);
                return row ? row.id : 0;
            },
            deleteRow(row) {
                const self = this;
                let index = self.tabledata.findIndex(item => item == row);
                self.$delete(self.tabledata, index);
            },
            appendRow(row) {
                const self = this;

                let is_exist = self.tabledata.some(rowData => {
                    return rowData.product.id == row.product.id;
                });

                if (!is_exist) {
                    self.tabledata.unshift(row);
                    self.form.currency = self.currencyid;
                }
            },
            getInit(productid) {
                let self = this;
                let output = {};

                for (let item of self.listdata) {
                    if (item.productid === productid) {
                        output[item.sizecontentid] = item.number;
                    }
                }

                return output;
            },
            onChange(list) {
                let self = this;

                for (let item of list) {
                    let row = self.listdata.find(({sizecontentid, productid}) => sizecontentid == item.sizecontentid && productid == item.uniq);
                    if (row) {
                        row.number = item.number;
                    } else {
                        self.listdata.push({
                            sizecontentid: item.sizecontentid,
                            number: item.number,
                            productid: item.uniq,
                        });
                    }
                }
            },
            onDiscountChange(newValue, oldValue) {
                let self = this;
                for (let item of self.tabledata) {
                    if (item.discount == oldValue || item.discount * 1 <= 0) {
                        item.discount = newValue;
                    }
                }
            },
            getSummary({columns, data}) {
                const self = this;
                const sums = [];
                columns.forEach((column, index) => {
                    //self._log(column, index)
                    if (index == 0) {
                        sums[index] = self._label("heji");
                        return;
                    } else if (index == 6) {
                        sums[index] = self.f(data.reduce((total, row) => total + row.factoryprice * self.stat[row.product.id].total, 0));
                    } else if (index == 3) {
                        sums[index] = self.listdata.reduce((total, row) => total + Number(row.number), 0);
                    }
                })

                sums[1] = data.length;
                sums[9] = self.total_price;

                return sums;
            },
            isMatch(keyword, search) {
                return keyword.length > 0 ? search.toUpperCase().indexOf(keyword) >= 0 : true
            },
        },
        computed: {
            isList() {
                for (let item of this.listdata) {
                    if (item.number > 0) {
                        return true;
                    }
                }
                return false;
            },
            // 是否可以编辑，要求状态的值为空，或者为1（未完成），如果为2，说明已完成，那么就不再允许编辑了
            isEditable() {
                var status = this.form.status;
                return status == '1' || status == '' || !status
            },
            width() {
                return this.tabledata.reduce((max, {product}) => Math.max(max, product.sizecontents.length), 1) * 50 + 21;
            },
            canSubmitPayment() {
                return this.form.id > 0;
            },
            total_price() {
                let self = this;
                let total = self.tabledata.reduce(function (total, row) {
                    return total + self.stat[row.product.id].total * self.stat[row.product.id].dealPrice;
                }, 0);
                return this.f(total);
            },
            genderlabels() {
                let obj = {};
                this.tabledata.forEach(item => {
                    if (item.product.gender_label.length > 0) {
                        obj[item.product.gender_label] = 1
                    }
                });
                return Object.keys(obj).join(",");
            },
            stat() {
                let self = this;

                let helper = statHelper({
                    dealPrice: 0,
                    total: 0,
                });

                for (let item of self.tabledata) {
                    let row = helper.get(item.product.id);

                    // 成交价
                    // 计算方式为：国际出厂价 * 折扣率 / 退税率
                    row.dealPrice = self.form.taxrebate > 0 ? self.f(item.factoryprice * item.discount / self.form.taxrebate) : 0;
                }

                for (let {productid, number} of self.listdata) {
                    let row = helper.get(productid)
                    row.total += Number(number);
                }

                return helper.result()
            },
            currencyid() {
                let self = this;
                if (self.form.currency > 0) {
                    return self.form.currency;
                }

                for (let i = 0; i < self.details.length; i++) {
                    return self.details[i].currencyid;
                }

                for (let i = 0; i < self.tabledata.length; i++) {
                    return self.tabledata[i].product.factorypricecurrency;
                }
            },
            orderdetails() {
                let self = this;

                let keyword = self.form2.keyword.toUpperCase();
                return self.tabledata.filter(item => {
                    return self.isMatch(keyword, item.product.getGoodsCode(''));
                })
            },
        },
        // 渲染前调用
        mounted() {
            const self = this;
            let route = self.$route;
            let label;
            if (route.params.id == 0) {
                label = self._label("xinjiandingdan");
            } else {
                //加载数据
                self._fetch("/ordersimple/loadorder", {id: route.params.id}).then(async function (res) {
                    // 这个是属性赋值，把前面的值复制到后面的变量中(排除 undefined)，这样 form 就有值了
                    copyTo(res.data.form, self.form);

                    self.tabledata = [];
                    if (res.data.list) {
                        // details 就有值了
                        self.details = res.data.list;

                        for (let item of res.data.list) {
                            // listdata 就有值了
                            self.listdata.push({
                                productid: item.productid,
                                sizecontentid: item.sizecontentid,
                                number: item.number,
                            });
                        }

                        let results = await detailConvert(res.data.list);
                        results.forEach(item => self.appendRow(item));

                        self.form.currency = self.currencyid;
                    }
                    self._setTitle(self._label("dingdan") + ":" + self.form.orderno);
                })
                label = "loading...";
            }
            self._setTitle(label);

            // 验证规则
            self.initRules(Rules => {
                let _label = self._label;
                return {
                    bussinesstype: Rules.id({required: true, message: _label("8000"), label: _label("yewuleixing")}),
                    ageseason: Rules.id({required: true, message: _label("8000"), label: _label("niandai")}),
                    property: Rules.id({required: true, message: _label("8000"), label: _label("shuxing")}),
                    bookingid: Rules.id({required: true, message: _label("8000"), label: _label("dinghuokehu")}),
                };
            });
        },
    };
</script>
