<template>
<div style="width:100%">
<el-row :gutter="20">
  <el-col :span="8">
    <el-tree ref="tree" :data="data" node-key="id" :props="defaultProps" default-expand-all :expand-on-click-node="false" @node-click="onNodeClick"></el-tree>
  </el-col>
  <el-col :span="7" v-if="form.id>0">
    <el-button type="primary" @click="showDepartCreate" style="margin-bottom:30px;">{{globals.getLabel('depart-create')}}</el-button>

    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item :label="globals.getLabel('depart-name')">
        <el-input v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item :label="globals.getLabel('description')">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onEdit" :disabled="is_save_disabled">{{globals.getLabel('button-save')}}</el-button>
        <el-button  type="warning" @click="deleteDepart" :disabled="is_save_disabled">{{globals.getLabel('button-delete')}}</el-button>
      </el-form-item>
    </el-form>
  </el-col>
  <el-col :span="7" v-if="!form.id">
    <el-alert :title="globals.getLabel('department-tip1')" type="success" :closable="false">
  </el-alert>
  </el-col>
</el-row>

<el-dialog ref="dialog" :title="globals.getLabel('depart-create')" :visible.sync="dialogTableVisible" :center="true" width="35%">
  <el-form :model="form_create" label-width="80px">
    <el-form-item :label="globals.getLabel('depart-name')">
      <el-input ref="ddd" v-model="form_create.name"></el-input>
    </el-form-item>

    <el-form-item :label="globals.getLabel('description')">
      <el-input type="textarea" v-model="form_create.remark"></el-input>
    </el-form-item>

    <el-form-item :label="globals.getLabel('depart-parent')">
      <el-input v-model="form_create.parent_name" disabled></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer" style="text-align:center">
    <el-button type="primary" @click="onCreate">{{globals.getLabel('button-ok')}}</el-button>
    <el-button @click="dialogTableVisible = false">{{globals.getLabel('button-cancel')}}</el-button>
  </div>
</el-dialog>  
</div>
</template>

<script>
import globals from '../globals.js'
//import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

const _log = globals.logger("asapage-department");

export default {
    name: 'asapage-department',
    components:{
       // 'simple-admin-tablelist':Simple_Admin_TableList
    },
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
                up_dp_id:'',
                parent_name:''
            },
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            node:"",
            is_save_disabled:true,
            dialogTableVisible:false,
            globals
        }
    },
    methods: {
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

            self.is_save_disabled = node.parent.id<=0
        },
        onEdit() {
            var self = this
            self._submit("/department/edit", this.form, function(res) {
                //$ASA.copyTo(self.form, self.node.data)
                //console.log(self.node.data, self.form)
                self.node.data.label = self.form.name;
                self.node.data.remark = self.form.remark;
                self.dialogTableVisible = false
            })
        },
        deleteDepart() {
            var self = this  
            $ASA.remove.call(this, "/department/delete?id=" + self.form.id, function(res) {
                $ASA.deleteObject(self.node.parent.data.children, self.node.data)
                console.log(self.$refs,self.node.parent.data.id)
                self.$refs.tree.setCurrentKey(self.node.parent.data.id);
                self.selectNode(self.node.parent)
            })    
        },
        showDepartCreate() {
            this.form_create.name = ""
            this.form_create.remark = ""
            this.form_create.id = ""
            this.dialogTableVisible = true;
            //this.$refs.depart_name.focus()
            var self = this
            setTimeout(function(){
                self.$refs.ddd.focus()
            },200)
        },
        onCreate() {
            var self = this
            self._submit("/department/add", this.form_create, function(){
                var newNode = {}
                newNode.label = self.form_create.name;
                newNode.remark = self.form_create.remark;
                newNode.id = self.form_create.id;
                newNode.children = []
                self.node.data.children.push(newNode)    
                self.dialogTableVisible = false
            })
        }
    },    
    mounted:function(){
        const self = this
        $ASA.post("/department/departments", {}, function(data){
            self.data = data
        },"json")
    }
}
</script>
<style>
    .user-form .el-input__inner {
        width:200px;
    }
    .user-form .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width:200px
    }
</style>