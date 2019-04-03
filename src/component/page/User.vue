<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="showFormToCreate()">{{_label("button-create")}}</el-button>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <el-dialog class="user-form" :title="_label('yonghuxinxi')" :visible.sync="dialogVisible" :center="true" width="500">
            <el-tabs type="border-card" @tab-click="onTabClick" activeName="user">
                <el-tab-pane :label="_label('user-setting')" name="user">
                    <el-form class="order-form" :model="form" label-width="100px" :inline="true" style="width:700px;" size="small">
                        <el-form-item :label="_label('user-loginname')">
                            <el-input v-model="form.login_name"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('password')">
                            <el-input v-model="form.password"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('user-realname')">
                            <el-input v-model="form.real_name"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('gender')">
                            <el-radio-group v-model="form.sex" style="width:200px">
                                <el-radio :label="'1'">{{_label("man")}}</el-radio>
                                <el-radio :label="'0'">{{_label("woman")}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item :label="_label('depart')">
                            <simple-select v-model="form.departmentid" source="department.single"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('zu')">
                            <simple-select v-model="form.groupid" source="group" style="width:150"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('country')">
                            <simple-select v-model="form.countryid" source="country" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('email')">
                            <el-input v-model="form.e_mail"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('user-join')">
                            <el-date-picker v-model="form.date" type="date" value-format="yyyy-MM-dd" :placeholder="_label('xuanzeriqi')"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('user-left')">
                            <el-date-picker v-model="form.leave_date" type="date" value-format="yyyy-MM-dd" :placeholder="_label('xuanzeriqi')"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('telephone')">
                            <el-input v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('mobile')">
                            <el-input v-model="form.mobilephone"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="_label('sale-port')" name="saleport">
                    <el-checkbox-group v-model="saleport">
                        <el-checkbox v-for="item in saleport_list" :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-tab-pane>
                <el-tab-pane :label="_label('cangku')" name="warehouse">
                    <simple-admin-page v-bind="props2" ref="page2"></simple-admin-page>
                </el-tab-pane>
                <el-tab-pane :label="_label('gerenshezhi')" name="setting">个人设置</el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="onSubmit">{{_label('baocun')}}</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

const _log = globals.logger("asapage-producttemplate");
const _label = globals.getLabel

const base = {
    userid:""
}

var props = {
    columns: [{
        name: "login_name",
        label: _label("dengluming"),
        is_create: true,
        is_update: true,
        is_show: true,
        is_focus: true,
        width: 200
    }, {
        name: "real_name",
        label: _label("xingming"),
        is_create: true,
        is_update: true,
        is_show: true,
        width: 200,
        is_focus: true
    }],
    controller: "user"
}

const props2 = {
    columns: [
        {name:"warehouseid", label:_label("cangku"), type:'select', source:"warehouse"},
        {name:"warehouseroleid", label:_label("juese"), type:'select', source:"warehouserole"}
    ],
    controller: "warehouseuser",
    base:base
}

export default {
    name: 'asapage-user',
    components: {
        'simple-admin-tablelist': Simple_Admin_TableList
    },
    data() {
        return {
            dialogVisible: false,
            lang: _label("lang"),
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
                storeid: "",
                section: "",
                date: "",
                phone: "",
                mobilephone: "",
                e_mail: "",
                email_password: "",
                comment: "",
                countryid: "",
                address: ""
            },
            saleport: [],
            warehouse: [],
            props: props,
            props2:props2,
            currentTab: "user",
            saleport_list: [], //销售端口信息
            saleport_loaded: false,
            warehouse_list: [], //仓库信息
            warehouse_loaded: false
        }
    },
    methods: {
        onSubmit() {
            var self = this;
            let params = $ASA.extend({saleportids:self.saleport.join(',')}, self.form)
            if (self.form.id == "") {                
                self._submit("/user/add", params, function() {
                    self.$refs.tablelist.appendRow($ASA.clone(self.form))
                })
            } else {
                self._submit("/user/edit", params, function() {
                    $ASA.copyTo(self.form, self.row)
                })
            }
        },
        onTabClick(tab) {
            let self = this
                //console.log(tab)
            self.currentTab = tab.name
            if (tab.name == 'saleport' && self.saleport_loaded == false) {
                self.saleport_loaded = true;
                //this._log("saleport")
                self._fetch("/l/saleport", {}, function(res) {
                    console.log(res)
                    self.saleport_list = res.data; //.forEach(item=>self.saleport_list.push(item))
                })
            } else if (tab.name == 'warehouse' && self.warehouse_loaded == false) {
                self.warehouse_loaded = true;
                self._fetch("/l/warehouse", {}, function(res) {
                    console.log(res)
                    self.warehouse_list = res.data; //.forEach(item=>self.saleport_list.push(item))
                })
            }
        },
        showFormToEdit(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;
            self.row = row;
            $ASA.copyTo(row, this.form)
            self.saleport = row.saleportids? row.saleportids.split(","):[]
            base.userid = row.id;

            self.showDialog();
        },
        showDialog() {
            var self = this;
            self.dialogVisible = true;
        },
        showFormToCreate() {
            var self = this;
            $ASA.empty(self.form)

            self.showDialog();
        }
    }
}
</script>