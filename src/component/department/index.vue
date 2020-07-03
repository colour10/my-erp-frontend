<template>
  <div style="width:100%">
    <el-row :gutter="20">
      <el-col :span="8" style="width:300px">
        <el-tree ref="tree" :data="data" node-key="id" :props="defaultProps" default-expand-all
                 :expand-on-click-node="false" @node-click="onNodeClick"></el-tree>
      </el-col>
      <el-col :span="7" v-if="form.id>0">
        <!-- 新建部门 start -->
        <asa-button :enable="_isAllowed('department')" @click="showDepartCreate" style="margin-bottom:30px;">
          {{_label('depart-create')}}
        </asa-button>
        <!-- 新建部门 end -->

        <el-form ref="form" :model="form" label-width="80px">
          <!-- 部门名称 start -->
          <el-form-item :label="_label('bumenmingcheng')">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <!-- 部门名称 end -->

          <!-- 描述 start -->
          <el-form-item :label="_label('description')">
            <el-input type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <!-- 描述 end -->

          <!-- 编辑+删除 start -->
          <el-form-item>
            <asa-button :enable="_isAllowed('department') && !is_save_disabled" @click="onEdit">
              {{_label('button-save')}}
            </asa-button>
            <asa-button :enable="_isAllowed('department') && !is_save_disabled" @click="deleteDepart">
              {{_label('button-delete')}}
            </asa-button>
          </el-form-item>
          <!-- 编辑+删除 end -->

        </el-form>
      </el-col>
      <!-- 点击左侧目录树提示文本 start -->
      <el-col :span="7" v-if="!form.id">
        <el-alert :title="_label('department-tip1')" type="success" :closable="false">
        </el-alert>
      </el-col>
      <!-- 点击左侧目录树提示文本 end -->
    </el-row>

    <!-- 新建对话框 start -->
    <el-dialog
      ref="dialog"
      :title="_label('depart-create')"
      :visible.sync="dialogTableVisible"
      :center="true"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="35%">
      <el-form :model="form_create" label-width="80px">
        <el-form-item :label="_label('bumenmingcheng')">
          <el-input ref="ddd" v-model="form_create.name"></el-input>
        </el-form-item>
        <el-form-item :label="_label('description')">
          <el-input type="textarea" v-model="form_create.remark"></el-input>
        </el-form-item>
        <el-form-item :label="_label('depart-parent')">
          <el-input v-model="form_create.parent_name" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align:center">
        <as-button type="primary" @click="onCreate">{{_label('button-ok')}}</as-button>
        <as-button @click="dialogTableVisible = false">{{_label('button-cancel')}}</as-button>
      </div>
    </el-dialog>
    <!-- 新建对话框 end -->
  </div>
</template>

<script>
    import globals from "@/component/globals"

    export default {
        name: 'sp-department',
        data() {
            return {
                form: {
                    name: '',
                    remark: '',
                    id: ''
                },
                form_create: {
                    name: '',
                    remark: '',
                    up_dp_id: '',
                    parent_name: ''
                },
                data: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                node: "",
                is_save_disabled: true,
                dialogTableVisible: false
            }
        },
        methods: {
            // 节点被点击时的回调
            // 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
            onNodeClick(d, node) {
                this.selectNode(node)
            },
            selectNode(node) {
                var self = this;
                var data = node.data;
                self.node = node;
                self.form.name = data.label
                self.form.remark = data.remark
                self.form.id = data.id
                self.form_create.parent_name = data.label
                self.form_create.up_dp_id = data.id

                self.is_save_disabled = node.parent.id <= 0
            },
            // 编辑逻辑
            onEdit() {
                var self = this
                self._submit("/department/edit", this.form).then(function (res) {
                    self.node.data.label = self.form.name;
                    self.node.data.remark = self.form.remark;
                    self.dialogTableVisible = false
                })
            },
            // 删除部门
            deleteDepart() {
                var self = this
                // _remove函数有询问用户的对话框
                self._remove("/department/delete", {id: self.form.id}).then(function (res) {
                    // 打印 res 的值得知，如果为 false 还是会向下执行，这个时候需要做判断，只有返回 true 才执行下面的逻辑
                    if (res) {
                        globals.deleteObject(self.node.parent.data.children, self.node.data)
                        self.$refs.tree.setCurrentKey(self.node.parent.data.id);
                        self.selectNode(self.node.parent)
                    }
                })
            },
            // 显示新建按钮
            showDepartCreate() {
                this.form_create.name = ""
                this.form_create.remark = ""
                this.form_create.id = ""
                this.dialogTableVisible = true;
                var self = this
                setTimeout(function () {
                    self.$refs.ddd.focus()
                }, 200)
            },
            // 新建逻辑
            onCreate() {
                var self = this;
                self._submit("/department/add", this.form_create).then(function () {
                    var newNode = {};
                    newNode.label = self.form_create.name;
                    newNode.remark = self.form_create.remark;
                    newNode.id = self.form_create.id;
                    newNode.children = [];
                    self.node.data.children.push(newNode);
                    self.dialogTableVisible = false;
                });
            },
        },
        // 挂载后执行
        mounted: function () {
            const self = this;
            self._fetch("/department/departments", {}).then(function (res) {
                self.data = res.data;
            });
        },
    };
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
