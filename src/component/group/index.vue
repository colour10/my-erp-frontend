<template>
  <div>
    <!-- 新建按钮 start -->
    <el-row>
      <el-col :span="2">
        <auth auth="group">
          <as-button type="primary" @click="showFormToCreate()">{{_label("xinjian")}}</as-button>
        </auth>
      </el-col>
    </el-row>
    <!-- 新建按钮 end -->

    <!-- 数据列表 start -->
    <el-row :gutter="20">
      <el-col :span="24">
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
      </el-col>
    </el-row>
    <!-- 数据列表 end -->

    <!-- 编辑对话框 start -->
    <el-dialog
      class="user-form"
      :title="formTitle"
      :visible.sync="dialogVisible"
      :center="true"
      :width="'60%'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false">
      <el-tabs type="border-card" @tab-click="onTabClick" v-model="activeName">

        <!-- 组信息 start -->
        <el-tab-pane :label="_label('group-info')" name="info">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in props.columns" :key="item.name">
              <el-input :ref="item.name" @keyup.enter.native="onSubmit" v-if="!item.type||item.type=='input'"
                        v-model="form[item.name]"></el-input>
            </el-form-item>
            <el-form-item>
              <auth auth="group">
                <as-button type="primary" @click="onSubmit">{{_label("baocun")}}</as-button>
              </auth>
              <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <!-- 组信息 end -->

        <!-- 权限 start -->
        <el-tab-pane :label="_label('quanxian')" :disabled="!form.id">
          <el-tree ref="tree" :data="permission_data" node-key="id" show-checkbox
                   :expand-on-click-node="false"></el-tree>
          <auth auth="group">
            <as-button type="primary" @click="onSavePermission">{{_label("baocun")}}</as-button>
          </auth>
          <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
        </el-tab-pane>
        <!-- 权限 end -->

        <!-- 组内人员 start -->
        <el-tab-pane :label="_label('zuneirenyuan')" name="user-list" :disabled="!form.id">
          <el-table :data="user_list" stripe border style="width: 100%;" @selection-change="handleSelectionChange">

            <!-- checkbox 单选 start -->
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <!-- checkbox 单选 end -->

            <el-table-column prop="login_name" :label="_label('dengluming')" align="center" width="180">
            </el-table-column>
            <el-table-column prop="real_name" :label="_label('xingming')" align="center" width="180">
            </el-table-column>
            <el-table-column :label="_label('caozuo')" width="150" align="center">
              <template v-slot="scope">

                <!-- 增加编辑按钮 start -->
                <auth auth="group">
                  <as-button size="mini" type="default" @click="handleEditUser(scope.$index, scope.row)">
                    {{_label("bianji")}}
                  </as-button>
                </auth>
                <!-- 增加编辑按钮 end -->

                <auth auth="group">
                  <as-button size="mini" type="danger" @click="handleDeleteUser(scope.$index, scope.row)">
                    {{_label("shanchu")}}
                  </as-button>
                </auth>
              </template>
            </el-table-column>
          </el-table>
          <el-row>
            <el-col :span="24" style="text-align:center; margin-top:1em;">
              <as-button type="default" @click="multiEdit">{{_label("multiEdit")}}</as-button>
              <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
            </el-col>
          </el-row>
        </el-tab-pane>
        <!-- 组内人员 end -->

      </el-tabs>
    </el-dialog>
    <!-- 编辑对话框 end -->

    <!-- 编辑权限 对话框 start -->
    <el-dialog
      :title="editPermissionTitle"
      :visible.sync="dialogEditVisible"
      :width="editPermissionWidth"
      :currentUserId="currentUserId">
      <el-tree ref="tree" :data="permission_data" node-key="id" show-checkbox
               :expand-on-click-node="false"></el-tree>
      <auth auth="group">
        <as-button type="primary" @click="onEditPermissionSavePermission">{{_label("baocun")}}</as-button>
      </auth>
      <as-button type="primary" @click="onEditPermissionQuit">{{_label("tuichu")}}</as-button>
    </el-dialog>
    <!-- 编辑权限 对话框 end -->

    <!-- 批量编辑权限 对话框 start -->
    <el-dialog
      :title="multiEditPermissionTitle"
      :visible.sync="dialogMultiEditVisible"
      :width="editPermissionWidth"
      :currentUserIds="currentUserIds">
      <el-tree ref="tree" :data="permission_data" node-key="id" show-checkbox
               :expand-on-click-node="false"></el-tree>
      <auth auth="group">
        <as-button type="primary" @click="onMultiEditPermissionSavePermission">{{_label("baocun")}}</as-button>
      </auth>
      <as-button type="primary" @click="onMultiEditPermissionQuit">{{_label("tuichu")}}</as-button>
    </el-dialog>
    <!-- 批量编辑权限 对话框 end -->

  </div>
</template>

<script>
    import globals, {_label} from '../globals.js'
    import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

    export default {
        name: 'sp-group',
        components: {
            'simple-admin-tablelist': Simple_Admin_TableList,
        },
        data() {
            return {
                form: {
                    id: "",
                    companyid: "",
                    group_name: "",
                    group_memo: ""
                },
                props: {
                    columns: [{
                        name: "group_name",
                        label: _label("zumingcheng"),
                        is_focus: true,
                        width: 200
                    }, {
                        name: "group_memo",
                        label: _label("beizhu"),
                        width: 200,
                        is_focus: true
                    }],
                    controller: "group",
                    authname: "group"
                },
                dialogVisible: false,
                formTitle: '',
                rowIndex: '',
                row: "",

                group_list: [],
                user_list: [],
                permission_data: [],
                activeName: "info",

                // 编辑权限新增数据
                dialogEditVisible: false,
                dialogMultiEditVisible: false,
                // 多选框选择的值
                multipleSelection: [],
                currentUserId: '',
                currentUserIds: [],
                formLabelWidth: '120px',
                editPermissionTitle: _label('quanxian'),
                multiEditPermissionTitle: _label('quanxian'),
                editPermissionWidth: '30%',
            }
        },
        methods: {
            // 编辑用户权限，新增功能，批量修改
            // 复选框状态改变
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            // 批量编辑权限
            async multiEdit() {
                var self = this
                // 获取 userIds 当中选中列表
                // 如果多选框为空，那么就给出提示
                if (this.multipleSelection.length === 0) {
                    return this.$message.error(_label('least-one-select'));
                }
                // 处理数据
                this.multipleSelection.forEach((item) => {
                    this.currentUserIds.push(item.id)
                })
                // 然后把批量用户的权限获取一下，并填充进去
                let permissions = await self._fetch("/user/currentpermissions", {user_id: this.currentUserIds[0]})
                let keys = permissions.data.groupPermissions.map(item => item.permissionid)
                setTimeout(function () {
                    self.$refs.tree.setCheckedKeys(keys);
                }, 100)
                // 打开批量编辑权限对话框
                this.showMultiEditPermission()
            },
            // 批量保存编辑的权限
            onMultiEditPermissionSavePermission() {
                var self = this
                var keys = self.$refs.tree.getCheckedKeys(true)
                // 请求批量修改权限的接口
                self._submit("/user/multipermissionsetting", {
                    userIds: this.currentUserIds.join(","),
                    keys: keys.join(",")
                }).then(function (res) {
                    self._log(res)
                })
                // 处理完之后清空 currentUserIds
                this.currentUserIds = []
                // 退出批量保存按钮
                this.onMultiEditPermissionQuit()
            },
            // 打开批量编辑按钮
            showMultiEditPermission() {
                this.dialogMultiEditVisible = true
            },
            // 退出批量编辑按钮
            onMultiEditPermissionQuit() {
                this.dialogMultiEditVisible = false
            },
            // 编辑用户权限
            async handleEditUser(rowIndex, row) {
                var self = this
                // 同时把最新的权限数再获取一遍
                this.getPermissionData()
                // 然后把当前用户的权限获取一下，并填充进去
                let permissions = await self._fetch("/user/currentpermissions", {user_id: row.id})
                let keys = permissions.data.groupPermissions.map(item => item.permissionid)
                setTimeout(function () {
                    self.$refs.tree.setCheckedKeys(keys);
                }, 100)
                // 赋值当前用户id
                this.currentUserId = row.id
                // 打开对话框
                this.showDialogEditPermission()
            },
            // 退出编辑用户按钮
            onEditPermissionQuit() {
                this.dialogEditVisible = false
            },
            // 显示编辑用户按钮
            showDialogEditPermission() {
                this.dialogEditVisible = true
            },
            // 提交修改权限逻辑
            onEditPermissionSavePermission() {
                var self = this;
                var keys = self.$refs.tree.getCheckedKeys(true)
                self._submit("/user/permissionsetting", {
                    userid: this.currentUserId,
                    keys: keys.join(",")
                }).then(function (res) {
                    self._log(res)
                })
                // 关闭对话框
                this.onEditPermissionQuit()
            },
            // 退出
            onQuit() {
                this.dialogVisible = false
                this.multipleSelection = []
            },
            // 删除组内用户
            handleDeleteUser(rowIndex, row) {
                var self = this;
                self._remove("/user/deletegroup", {groupid: '', id: row.id}).then(function (response) {
                    if (response) {
                        self.$delete(self.user_list, rowIndex)
                    }
                })
            },
            // 切换 tab 标签
            onTabClick(tab) {
                this.getGroupList()
            },
            // 获取组内人员
            getGroupList() {
                var self = this;
                self._fetch("/l/user", {groupid: self.form.id}).then(function (res) {
                    self.user_list = res.data
                })
            },
            // 保存组权限
            onSavePermission() {
                var self = this;
                var keys = self.$refs.tree.getCheckedKeys(true)
                self._submit("/group/setting", {groupid: self.form.id, keys: keys.join(",")}).then(function (res) {
                    self._log(res)
                })
            },
            // 提交
            onSubmit() {
                var self = this;
                if (self.form.id == "") {
                    self._submit("/" + props.controller + "/add", self.form).then(function () {
                        self.$refs.tablelist.appendRow(globals.clone(self.form))
                        //self.dialogVisible = false
                    })
                } else {
                    self._submit("/" + props.controller + "/edit", self.form).then(function () {
                        globals.copyTo(self.form, self.row)
                        //self.dialogVisible = false
                    })
                }
            },
            // 新增
            showFormToCreate() {
                var self = this;
                globals.empty(self.form)

                if (self.base) {
                    Object.keys(self.base).forEach(function (key) {
                        self.form[key] = self.base[key]
                    });
                }

                self.formTitle = _label("tianjiaxinxi");
                self.activeName = "info"
                self.showDialog();
            },
            // 编辑
            async showFormToEdit(rowIndex, row) {
                var self = this
                self.rowIndex = rowIndex;
                self.row = row;
                globals.copyTo(row, this.form)

                this.formTitle = _label("xiugaixinxi");

                let permissions = await self._fetch("/group/getpermissions", {groupid: self.form.id})
                self._log(permissions)
                let keys = permissions.data.map(item => item.permissionid)


                setTimeout(function () {
                    self.$refs.tree.setCheckedKeys(keys);
                }, 100)


                self.showDialog();
            },
            // 显示对话框
            showDialog() {
                var self = this;
                self.dialogVisible = true;
                setTimeout(function () {
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
                // 因为存在缓存问题，所以需要重新获取标签的数据
                self.getGroupList()
            },
            isFormDisabled(column) {
                var form = this.form;
                return (form.id === '' && !column.is_create) || (form.id !== '' && !column.is_update)
            },
            // 获取权限
            async getPermissionData() {
                const self = this
                let result = await self._fetch("/permission/tree", {})
                self.permission_data = result.data;
            }
        },
        // 挂载前
        mounted: async function () {
            this.getPermissionData()
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
