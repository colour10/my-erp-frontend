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
            <template v-slot="scope">
              {{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}
            </template>
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
      <el-form ref="form" :model="form" label-width="100px">        
        <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in columns" :key="item.name">
          <el-input :ref="item.name" @keyup.enter.native="onSubmit" v-if="!item.type||item.type=='input'" v-model="form[item.name]" :disabled="isFormDisabled(item)"></el-input>
          <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" :disabled="isFormDisabled(item)" active-value="1" inactive-value="0"></el-switch>
          
          <el-select :ref="item.name" v-model="form[item.name]" placeholder="choice" v-if="item.type=='select'">
            <el-option v-for="(label,value) in item.data_source" :key="value" :label="label" :value="value"></el-option>
          </el-select>
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
                    self.dialogVisible = false
                })
            }
            else {
                $ASA.submit.call(self, "/"+self.controller+"/edit", self.form, function(){
                    $ASA.copyTo(self.form, self.tableData[self.rowIndex])
                    self.dialogVisible = false
                })
            }
        },
        showFormToCreate() {
            var self = this;
            $ASA.empty(self.form)

            if(self.base) {
                Object.keys(self.base).forEach(function(key){
                    self.form[key] =  self.base[key]
                });
            }

            this.formTitle = this.labels.formTitleCreate;
            self.showDialog();
        },
        showFormToEdit(rowIndex, row){
            var self = this
            self.rowIndex = rowIndex;
            $ASA.copyTo(row, this.form)

            this.formTitle = this.labels.formTitleUpdate;
            self.showDialog();
        },
        handleDelete(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;

            $ASA.remove.call(this, "/"+self.controller+"/delete?id="+row.id, function() {
                self.$delete(self.tableData,rowIndex)
            })
        },
        showDialog() {
            var self = this;
             self.dialogVisible = true;
             setTimeout(function(){
                //console.log(self.$refs) 
                var columns = self.columns;
                for(var i=0;i<columns.length;i++){
                    var column = columns[i]
                    var ele = self.$refs[column.name][0];
                    
                    if(column.is_focus && !ele.disabled) {
                        console.log(ele)
                        ele.focus();
                        break;
                    }       
                }
             },50)  
        },
        isFormDisabled(column) {
            var form = this.form;
            return (form.id==''&&!column.is_create) || (form.id!=''&&!column.is_update)
        },
        convert(row,column, rowIndex){
            if(column.type=='switch') {
                return row[column.name]=='1'? this.labels.yes : this.labels.no;   
            }    
            else {
                return row[column.name];      
            }
        },
        loadList() {
            var self = this;
            self.tableData = []

            var params = {}
            
            if(self.base) {
                Object.keys(self.base).forEach(function(key){
                    params[key] =  self.base[key]
                });
                //console.log(self.base)
            }

            $ASA.post("/"+self.controller+"/page",params,function(res){
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
