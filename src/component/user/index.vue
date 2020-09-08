<template>
  <div>
    <!-- 新增 start -->
    <el-row>
      <el-col :span="2">
        <auth auth="user">
          <as-button type="primary" @click="showFormToCreate()">{{ _label("button-create") }}</as-button>
        </auth>
      </el-col>
    </el-row>
    <!-- 新增 end -->

    <!-- 数据列表 start -->
    <el-row :gutter="20">
      <el-col :span="24">
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
      </el-col>
    </el-row>
    <!-- 数据列表 end -->

    <!-- 修改对话框 start -->
    <el-dialog
        class="user-form user-dialog"
        :title="_label('yonghuxinxi')"
        :visible.sync="dialogVisible"
        :center="true"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="700px">
      <el-tabs type="border-card" @tab-click="onTabClick" activeName="user">
        <!-- 用户管理 start -->
        <el-tab-pane :label="_label('user-setting')" name="user">
          <el-form ref="order-form" class="order-form" :model="form" label-width="85px" :inline="true"
                   style="width:700px;" size="small" :rules="formRules" :inline-message="false" :show-message="false">
            <el-col :span="11">
              <el-form-item :label="_label('user-loginname')" prop="login_name">
                <el-input v-model="form.login_name"></el-input>
              </el-form-item>
              <el-form-item :label="_label('user-realname')">
                <el-input v-model="form.real_name"></el-input>
              </el-form-item>
              <el-form-item :label="_label('depart')">
                <simple-select v-model="form.departmentid" source="department.single"></simple-select>
              </el-form-item>
              <el-form-item :label="_label('country')">
                <simple-select v-model="form.countryid" source="country"></simple-select>
              </el-form-item>
              <el-form-item :label="_label('user-join')">
                <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd"
                                :placeholder="_label('xuanzeriqi')"></el-date-picker>
              </el-form-item>
              <el-form-item :label="_label('telephone')">
                <el-input v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="_label('password')">
                <el-input v-model="form.password"></el-input>
              </el-form-item>
              <el-form-item :label="_label('gender')">
                <el-radio-group v-model="form.sex" style="width:200px">
                  <el-radio :label="'1'">{{ _label("man") }}</el-radio>
                  <el-radio :label="'0'">{{ _label("woman") }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item :label="_label('zu')">
                <simple-select v-model="form.groupid" source="group" style="width:150px"></simple-select>
              </el-form-item>
              <el-form-item :label="_label('email')">
                <el-input v-model="form.e_mail"></el-input>
              </el-form-item>
              <el-form-item :label="_label('user-left')">
                <el-date-picker v-model="form.leave_date" type="date" value-format="yyyy-MM-dd"
                                :placeholder="_label('xuanzeriqi')"></el-date-picker>
              </el-form-item>
              <el-form-item :label="_label('mobile')">
                <el-input v-model="form.mobilephone"></el-input>
              </el-form-item>
            </el-col>
          </el-form>
        </el-tab-pane>
        <!-- 用户管理 end -->

        <!-- 销售端口 start -->
        <el-tab-pane :label="_label('sale-port')" name="saleport">
          <el-checkbox-group v-model="saleport">
            <el-col :span="6" v-for="item in saleport_list" :key="item.id">
              <el-checkbox :label="item.id">{{ item.name }}</el-checkbox>
            </el-col>
          </el-checkbox-group>
        </el-tab-pane>
        <!-- 销售端口 end -->

        <!-- 仓库 start -->
        <el-tab-pane :label="_label('cangku')" name="warehouse">
          <simple-admin-page v-bind="props2" ref="page2"></simple-admin-page>
        </el-tab-pane>
        <!-- 仓库 end -->

        <!-- 价格 start -->
        <el-tab-pane :label="_label('jiage')" name="userprice">
          <simple-admin-page v-bind="userprice" ref="userprice"></simple-admin-page>
        </el-tab-pane>
        <!-- 价格 end -->

        <!-- 默认设置 start -->
        <el-tab-pane :label="_label('morenshezhi')" name="setting">
          <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:700px;" size="small">
            <!-- 销售端口 start -->
            <el-form-item :label="_label('xiaoshouduankou')">
              <el-select v-model="form.saleportid" :placeholder="_label('qingxuanze')">
                <el-option
                    :label="saleport.name"
                    :value="saleport.id"
                    v-for="saleport in currentSaleports"
                    :key="saleport.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- 销售端口 end -->

            <!-- 价格 start -->
            <el-form-item :label="_label('jiage')">
              <el-select v-model="form.priceid" :placeholder="_label('qingxuanze')">
                <el-option
                    :label="price.name"
                    :value="price.id"
                    v-for="price in currentPrices"
                    :key="price.id"></el-option>
              </el-select>
            </el-form-item>
            <!-- 价格 end -->

            <!-- 销售仓库 start -->
            <el-form-item :label="_label('xiaoshoucangku')">
              <el-select v-model="form.warehouseid" :placeholder="_label('qingxuanze')">
                <el-option
                    :label="warehouse.name"
                    :value="warehouse.id"
                    v-for="warehouse in warehouses"
                    :key="warehouse.id"></el-option>
              </el-select>
            </el-form-item>
            <!-- 销售仓库 end -->
          </el-form>
        </el-tab-pane>
        <!-- 默认设置 end -->
      </el-tabs>

      <!-- 按钮组 start -->
      <span slot="footer" class="dialog-footer">
        <!-- 保存 start -->
        <auth auth="user">
          <as-button type="primary" @click="onSubmit">{{ _label('baocun') }}</as-button>
        </auth>
        <!-- 保存 end -->

        <!-- 退出 start -->
        <as-button type="primary" @click="onQuit">{{ _label("tuichu") }}</as-button>
        <!-- 退出 end -->
      </span>
      <!-- 按钮组 end -->
    </el-dialog>
    <!-- 修改对话框 end -->
  </div>
</template>

<script>
import globals, {_label} from '../globals.js';
import SimpleAdminTablelist from "@/component/Simple_Admin_TableList"

export default {
  name: 'sp-user',
  components: {SimpleAdminTablelist},
  data() {
    return {
      dialogVisible: false,
      form: {
        id: '',
        login_name: '',
        real_name: '',
        password: '',
        departmentid: '',
        companyid: "",
        groupid: "",
        storeid: "",
        sex: "",
        section: "",
        date: "",
        phone: "",
        mobilephone: "",
        e_mail: "",
        email_password: "",
        comment: "",
        countryid: "",
        address: "",
        saleportid: '',
        priceid: '',
        warehouseid: '',
      },
      // 当前用户已经选择的销售端口列表，如果未登录则默认为空数组
      saleport: [],
      warehouse: [],
      // 当前用户销售端口列表
      currentSaleports: [],
      // 当前用户价格列表
      currentPrices: [],
      // 当前用户销售仓库列表
      warehouses: [],
      currentTab: "user",
      saleport_list: [], //销售端口信息
      warehouse_list: [], //仓库信息
      props: {
        columns: [
          {
            name: "login_name",
            label: _label("dengluming"),
            is_create: true,
            is_update: true,
            is_show: true,
            is_focus: true,
            width: 200
          },
          {
            name: "real_name",
            label: _label("xingming"),
            is_create: true,
            is_update: true,
            is_show: true,
            width: 200,
            is_focus: true
          }
        ],
        controller: "user",
      },
      // 仓库
      props2: {
        columns: [
          {name: "warehouseid", label: _label("cangku"), type: 'select', source: "warehouses"},
          {name: "warehouseroleid", label: _label("juese"), type: 'select', source: "warehouserole"}
        ],
        controller: "warehouseuser",
        base: {
          userid: "",
        },
        options: {
          isAutoReload: true
        }
      },
      // 价格
      userprice: {
        columns: [
          {name: "priceid", label: _label("jiage"), type: 'select', source: "price"},
        ],
        controller: "userprice",
        base: {
          userid: "",
        },
        options: {
          isSearch: false,
        },
      },
    };
  },
  methods: {
    // 退出对话框
    onQuit() {
      this.dialogVisible = false
    },
    // 保存逻辑
    onSubmit() {
      var self = this;
      self.validate().then(() => {
        let params = globals.extend({saleportids: self.saleport.join(',')}, self.form);
        if (self.form.id == "") {
          self._submit("/user/add", params).then(function () {
            self.$refs.tablelist.appendRow(globals.clone(self.form));
          });
        } else {
          params.id = self.form.id;
          self._submit("/user/edit", params).then(function () {
            globals.copyTo(self.form, self.row);
          });
        }
      });
    },
    // 切换 tab 标签
    onTabClick(tab) {
      let self = this;
      self.currentTab = tab.name;
    },
    // 编辑逻辑
    showFormToEdit(rowIndex, row) {
      var self = this;
      self.rowIndex = rowIndex;
      self.row = row;
      globals.copyTo(row, this.form);
      self.saleport = row.saleportids ? row.saleportids.split(",") : [];
      self.props2.base.userid = row.id;
      self.userprice.base.userid = row.id;

      self.showDialog();
    },
    // 显示对话框
    showDialog() {
      var self = this;
      self.dialogVisible = true;
      // 清空原来的销售端口列表
      self.saleport = [];
      // 当前操作用户的销售端口列表
      self._fetch("/user/saleports", {userId: self.form.id}).then(function (res) {
        self.currentSaleports = res.data
        res.data.forEach(item => {
          self.saleport.push(item.id)
        })
      });
      // 当前操作用户的价格列表
      self._fetch("/user/prices", {userId: self.form.id}).then(function (res) {
        self.currentPrices = res.data
      });
      // 当前操作用户的仓库列表
      self._fetch("/user/warehouses", {userId: self.form.id}).then(function (res) {
        self.warehouses = res.data
      });
      // 取出当前公司下面所有的销售端口列表
      self._fetch("/company/saleports", {}).then(function (res) {
        self.saleport_list = res.data;
      })
      // 取出当前公司下面所有的仓库列表
      self._fetch("/company/warehouses", {}).then(function (res) {
        self.warehouse_list = res.data;
      });
    },
    // 新增逻辑
    showFormToCreate() {
      var self = this;
      globals.empty(self.form);

      self.clearValidate(50);
      self.showDialog();
    },
  },
};
</script>
