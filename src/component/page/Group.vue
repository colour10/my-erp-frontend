<template>
    <div>
        <el-row>
            <el-col :span="2" :offset="22">
                <auth auth="group"><el-button type="primary" @click="showFormToCreate()">{{_label("xinjian")}}</el-button></auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="'60%'" :modal="false">
            <el-tabs type="border-card" @tab-click="onTabClick" v-model="activeName">
                <el-tab-pane :label="_label('group-info')" name="info">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in props.columns" :key="item.name">
                            <el-input :ref="item.name" @keyup.enter.native="onSubmit" v-if="!item.type||item.type=='input'" v-model="form[item.name]"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <auth auth="group"><el-button type="primary" @click="onSubmit">{{_label("baocun")}}</el-button></auth>
                            <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane :label="globals.getLabel('quanxian')" :disabled="!form.id">
                    <el-tree ref="tree" :data="permission_data" node-key="id" show-checkbox :expand-on-click-node="false"></el-tree>
                    <auth auth="group"><el-button type="primary" @click="onSavePermission">{{_label("baocun")}}</el-button></auth>
                    <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
                </el-tab-pane>
                <el-tab-pane :label="_label('zuneirenyuan')" name="user-list" :disabled="!form.id">
                    <el-table :data="user_list" stripe border style="width: 100%;">
                        <el-table-column prop="login_name" :label="_label('dengluming')" align="center" width="180">
                        </el-table-column>
                        <el-table-column prop="real_name" :label="_label('xingming')" align="center" width="180">
                        </el-table-column>
                        <el-table-column :label="globals.getLabel('caozuo')" width="150" align="center">
                            <template v-slot="scope">
                                <auth auth="group"><el-button size="mini" type="danger" @click="handleDeleteUser(scope.$index, scope.row)">{{_label("shanchu")}}</el-button></auth>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-row>
                        <el-col :span="24" style="text-align:center;">
                            <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

const _log = globals.logger("asapage-group");
const _label = globals.getLabel

const props = {
    columns: [{
        name: "group_name",
        label: _label("zumingcheng"),
        is_focus: true,
        width: 200
    }, {
        name: "group_memo",
        label: "备注",
        width: 200,
        is_focus: true
    }],
    controller: "group",
    authname:"group"
}

export default {
    name: 'asapage-group',
    components: {
        'simple-admin-tablelist': Simple_Admin_TableList
    },
    data() {
        return {
            form: {
                id: "",
                companyid: "",
                group_name: "",
                group_memo: ""
            },
            props: props,
            dialogVisible: false,
            formTitle: '',
            rowIndex: '',
            row: "",

            group_list: [],
            user_list: [],
            permission_data: [],
            activeName: "info"
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        handleDeleteUser(rowIndex, row) {
            var self = this;
            self._remove("/user/deletegroup", { groupid: '', id: row.id }, function() {
                self.$delete(self.user_list, rowIndex)
            })
        },
        onTabClick(tab) {
            var self = this;
            self._fetch("/l/user", { groupid: self.form.id }, function(res) {
                console.log(res)
                self.user_list = res.data;
            })
        },
        onSavePermission() {
            var self = this;
            var keys = self.$refs.tree.getCheckedKeys(true)
            self._submit("/group/setting", { groupid: self.form.id, keys: keys.join(",") }, function(res) {
                self._log(res)
            })
        },
        onSubmit() {
            var self = this;
            if (self.form.id == "") {
                self._submit("/" + props.controller + "/add", self.form, function() {
                    self.$refs.tablelist.appendRow(globals.clone(self.form))
                        //self.dialogVisible = false
                })
            } else {
                self._submit("/" + props.controller + "/edit", self.form, function() {
                    globals.copyTo(self.form, self.row)
                        //self.dialogVisible = false
                })
            }
        },
        showFormToCreate() {
            var self = this;
            globals.empty(self.form)

            if (self.base) {
                Object.keys(self.base).forEach(function(key) {
                    self.form[key] = self.base[key]
                });
            }

            self.formTitle = _label("tianjiaxinxi");
            self.activeName = "info"
            self.showDialog();
        },
        async showFormToEdit(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;
            self.row = row;
            globals.copyTo(row, this.form)

            this.formTitle = _label("xiugaixinxi");

            let permissions = await self._fetchPromise("/group/getpermissions", {groupid:self.form.id})
        self._log(permissions)
            let keys = permissions.data.map(item=>item.permissionid)


            setTimeout(function(){
                self.$refs.tree.setCheckedKeys(keys);
            },100)
            

            self.showDialog();
        },
        showDialog() {
            var self = this;
            self.dialogVisible = true;
            setTimeout(function() {
                //console.log(self.$refs)
                var columns = props.columns;
                for (var i = 0; i < columns.length; i++) {
                    var column = columns[i]
                    var ele = self.$refs[column.name][0];

                    if (column.is_focus && !ele.disabled) {
                        //console.log(ele)
                        ele.focus();
                        break;
                    }
                }
            }, 50)
        },
        isFormDisabled(column) {
            var form = this.form;
            return (form.id == '' && !column.is_create) || (form.id != '' && !column.is_update)
        }
    },
    mounted: async function() {
        const self = this
        let result = await self._fetchPromise("/permission/tree", {})
        self.permission_data = result.data;
    }
}
</script>

<style>
.user-form .el-input__inner {
    width: 200px;
}

.user-form .el-date-editor.el-input,
.el-date-editor.el-input__inner {
    width: 200px
}
</style>
