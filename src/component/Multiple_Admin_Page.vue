<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="showFormToCreate()">{{buttons.create.label}}</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" stripe border style="width: 100%;" v-loading.fullscreen.lock="loading">
          <el-table-column :prop="name" :label="item.label" align="center" :width="item.width||180" v-if="item.is_show" v-for="item in columns" :key="item.name">
            <template v-slot="scope">
              {{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}
            </template>
            
          </el-table-column>

          <el-table-column prop="lang_code" :label="labels.language" width="180" align="center">
            <template v-slot="scope">
             <span v-for="(item, key) in languages" :key="item.code" :value="item.code">
               <el-button :type="isSettingLanguage(scope.row, item.code)?'primary':'info'" circle @click="showFormToUpdate(scope.$index, scope.row, item.code, scope.row.languages.indexOf(item.code)>0)">{{item.shortName}}</el-button>
             </span>
            </template>
          </el-table-column>

          <el-table-column :label="labels.action" width="150" align="center">
            <template v-slot="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{buttons.remove.label}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in columns" :key="item.name">
          <el-input :ref="item.name" @keyup.enter.native="onSubmit" v-if="!item.type||item.type=='input'" v-model="form[item.name]" :disabled="isFormDisabled(item)"></el-input>
          <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" :disabled="isFormDisabled(item)" active-value="1" inactive-value="0"></el-switch>
          
          <el-select :ref="item.name" v-model="form[item.name]" placeholder="choice" v-if="item.type=='select'">
            <el-option v-for="(label,value) in item.data_source" :key="value" :label="label" :value="value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="labels.language">
            <el-select v-model="!form.relateid?default_language:form.lang_code" :placeholder="labels.choice" disabled>
              <el-option v-for="(item, key) in languages" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
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
    name: 'multiple-admin-page',
    props: ['columns','buttons',"labels","options","controller", "base", "default_language"],
    components: {

    },
    data() {
        var form = {
            id:"",
            relateid:'',
            lang_code:''
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
            tableData:[] ,
            componenToptions:options,
            languages:[],
            loading:true
        }
    },
    methods: {
        onSubmit() {
            var self = this;
            if(self.form.id=="") {
                $ASA.submit.call(self, "/"+self.controller+"/add", self.form, function(){
                    if(self.form.relateid) {
                        self.tableData[self.rowIndex].languages += ','+self.form.lang_code;
                    }
                    else {
                        self.form.languages = self.form.lang_code;
                        self.form.relateid = self.form.id
                        self.tableData.push($ASA.clone(self.form))
                    }
                    
                    self.dialogVisible = false
                })
            }
            else {
                $ASA.submit.call(self, "/"+self.controller+"/edit", self.form, function(){
                    //self.tableData[self.rowIndex].lang_code = self.form.lang_code
                    if(self.form.lang_code==self.default_language) {
                        $ASA.copyTo(self.form, self.tableData[self.rowIndex])
                    }
                    
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

            self.formTitle = self.labels.formTitleCreate;
            self.form.lang_code = self.default_language;
            self.showDialog();
        },
        showFormToUpdate(rowIndex, row, lang_code, is_update){
            var self = this
            self.rowIndex = rowIndex;

            //console.log(rowIndex, row, lang_code, action, this.default_language)
            if(row.lang_code==lang_code) {
                //更新本条记录
                $ASA.copyTo(row, self.form)
                self.showDialog()
            }
            else {
                if(is_update) {
                    //console.log(lang_code)
                    //加载这条数据
                    $.post("/"+self.controller+"/load", {lang_code:lang_code, relateid:row.relateid}, function(res){
                        $ASA.copyTo(res, self.form)

                        self.showDialog();
                    }, "json")
                }
                else {
                    $ASA.empty(self.form)
                    console.log(self.form)
                    self.columns.forEach(function(column){
                        if(!column.disable_change) {
                            self.form[column.name] = ""
                        }
                        else {
                            self.form[column.name] = row[column.name]    
                        }
                    })
                    console.log(self.form)
        
                    self.form.relateid = row.relateid;
                    self.form.lang_code = lang_code
                    self.formTitle = self.labels.formTitleCreate;
                    self.showDialog();
                }
            }
        },
        handleDelete(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;

            $ASA.remove.call(this, "/"+self.controller+"/deleteGroup?id="+row.id, function() {
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
        isSettingLanguage(row, lang_code) {
            //console.log(row.languages, lang_code)
            return (row.languages && row.languages.indexOf(lang_code)>=0)
        },
        convert(row,column, rowIndex){
            if(column.type=='switch') {
                return row[column.name]=='1'? this.labels.yes : this.labels.no;   
            }    
            else {
                return row[column.name];      
            }
        },
        isFormDisabled(column) {
            var form = this.form;
            console.log(column, form)
            return (form.id==''&&!column.is_create) || (form.id!=''&&!column.is_update) || (column.disable_change && form.lang_code!=this.default_language)
        },
        loadList(cb) {
            var self = this;
            self.tableData = []

            var params = {}
            params.lang_code = self.default_language;
            if(self.base) {
                Object.keys(self.base).forEach(function(key){
                    params[key] =  self.base[key]
                });
                //console.log(self.base)
            }

            $.post("/"+self.controller+"/page",params,function(res){
                //console.log(res)
                for(var i=0;i<res.length;i++) {
                    self.tableData.push(res[i])
                }
                cb()
            },'json');
        }
    },
    watch:{
        base:{
            handler:function(newValue,oldValue){
                //console.log("change",newValue,oldValue)
                this.loadList()
            },
            deep: true
        }
    },
    computed:{
    },
    mounted:function(){
        var self = this;

        var load_languages = new Promise(function(resolve, reject){
            $.post("/common/language", {}, function(res){
                //console.log(res)
                resolve(res)
            },"json")
        });

        var load_page = new Promise(function(resolve, reject){
            self.loadList(resolve)
        });

        Promise.all([load_languages, load_page]).then(function (results) {
            self.languages = results[0]
            self.loading = false;
        });
    }
}

</script>

<style>
</style>
