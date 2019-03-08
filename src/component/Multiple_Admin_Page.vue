<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="showFormToCreate()">{{buttons.create.label}}</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" stripe border style="width: 100%;">
          <el-table-column :prop="item.name" :label="item.label" align="center" :width="item.width||180" v-if="item.is_show" v-for="item in columns" :key="item.name">
          </el-table-column>

          <el-table-column :label="labels.action" width="150" align="center">
            <template v-slot="scope">
              <el-button size="mini" @click="showFormToEdit(scope.$index, scope.row)">{{buttons.edit.label}}</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{buttons.remove.label}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in columns" :key="item.name">
          <el-input v-model="form[item.name]" :disabled="(form.id==''&&!item.is_create)||(form.id!=''&&!item.is_update)"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{buttons.save.label}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'simple-admin-page',
    props: ['columns','buttons',"labels","options","controller", "base"],
    components: {

    },
    data() {
        var form = {
            id:""
        }

        var options = this.options || {}
        var base = this.base || {}

        for(var i=0;i<this.columns.length;i++) {
            form[this.columns[i].name] = ""
        }

        return {
            dialogVisible:false,
            form: form,
            rowIndex:"",
            formTitle:"",
            tableData:[],
            componenToptions:options,
            watchBase:base
        }
    },
    methods: {
        onSubmit() {
            var self = this;
            if(self.form.id=="") {
                $ASA.submit.call(self, "/"+self.controller+"/add", self.form, function(){
                    self.tableData.push($ASA.clone(self.form))
                })
            }
            else {
                $ASA.submit.call(self, "/"+self.controller+"/edit", self.form, function(){
                    $ASA.copyTo(self.form, self.tableData[self.rowIndex])
                })
            }
        },
        showFormToCreate() {
            var self = this;
            $ASA.empty(self.form)

            Object.keys(self.base).forEach(function(key){
                self.form[key] =  self.base[key]
            });

            this.formTitle = this.labels.formTitleCreate;
            this.dialogVisible = true;
        },
        showFormToEdit(rowIndex, row){
            var self = this
            self.rowIndex = rowIndex;
            $ASA.copyTo(row, this.form)

            this.formTitle = this.labels.formTitleUpdate;
            this.dialogVisible = true;
        },
        handleDelete(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;

            $ASA.remove.call(this, "/"+self.controller+"/delete?id="+row.id, function() {
                self.$delete(self.tableData,rowIndex)
            })
        },
        loadList() {
            var self = this;
            self.tableData = []

            var params = {}
            Object.keys(self.base).forEach(function(key){
                params[key] =  self.base[key]
            });
            console.log(self.base)

            $.post("/"+self.controller+"/page",params,function(res){
                //console.log(res)
                for(var i=0;i<res.length;i++) {
                    self.tableData.push(res[i])
                }
            },'json');
        }
    },
    watch:{
        base:{
            handler:function(newValue,oldValue){
                console.log("change",newValue,oldValue)
                this.loadList()
            },
            deep: true
        }
    },
    computed:{
    },
    mounted:function(){
        this.loadList()
    }
}
</script>

<style>
</style>
