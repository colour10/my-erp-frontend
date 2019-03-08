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
    
    
    <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'">
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
    props: ['data','columns','buttons',"labels","options","controller", "parent_value", "parent_name"],
    components: {
      
    },
    data() {        
        var form = {
            id:""
        }
        
        var options = this.options || {}
                
        for(var i=0;i<this.columns.length;i++) {
            form[this.columns[i].name] = ""   
        }
        
        return {
            dialogVisible:false,
            form: form,
            rowIndex:"",
            formTitle:"",
            tableData:this.data,
            componenToptions: options
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
            $ASA.empty(this.form)
            if(this.parent_value && this.parent_name) {
                this.form[this.parent_name] = this.parent_value
            }
            
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
        }
    },
    computed:{
    },
    mounted:function(){
    }
}
</script>

<style>
</style>
