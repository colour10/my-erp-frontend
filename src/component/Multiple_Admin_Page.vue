<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="showFormToCreate()">{{labels.xinjian}}</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <multiple-admin-tablelist ref="tablelist" :controller="controller" :key_column="key_column" :columns="columns" :buttons="buttons" :options="options" :base="base" :onclickupdate="showFormToUpdate"></multiple-admin-tablelist>
      </el-col>
    </el-row>


    <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in columns" :key="item.name">
          <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[getColumnName(item)]"></el-input>
          <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1" inactive-value="0"></el-switch>
                              
          <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :data_source="item.data_source" :lang="lang">
          </simple-select>
          
          <el-upload :ref="item.name" :action="'/common/upload?category='+controller" v-if="item.type=='upload'" :multiple="item.multiple || false"  :limit="item.limit || 1" :on-success="getUploadSuccessCallback(item)" :on-remove="getRemoveUploadFileCallback(item)">
            <el-button size="small" type="primary">{{labels.shangchuan}}</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item :label="labels.yuyan">
            <el-select v-model="lang" :placeholder="labels.choice" disabled>
              <el-option v-for="(item, key) in languages" :key="item.code" :label="item.name" :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{labels.baocun}}</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
    name: 'multiple-admin-page',
    props: ['columns', "buttons" ,"options","controller", "base", "key_column", "auto_hide"],
    components: {

    },
    data() {
        var form = {
            id:""
        }

        var options = this.options || {}
        var base = this.base || {}
        
        var columns = this.columns
        var column;
        
        var languages = $ASAL._languages;
        var keys = Object.keys(languages)
        for(var i=0;i<columns.length;i++) {
            column = columns[i]
            if(column.is_multiple) {
                keys.forEach(function(code){
                    form[column.name+"_"+code] = "" 
                });
            }
            else {
                form[column.name] = ""
            }
        }
        //console.log(columns,form)

        return {
            dialogVisible:false,
            form: form,
            rowIndex:"",            
            formTitle:"",
            lang:$ASAL.lang,
            componenToptions:options,
            languages:$ASAL._languages,
            labels:{
                baocun: $ASAL.baocun,
                xinjian: $ASAL.xinjian,
                shanchu: $ASAL.shanchu,
                yuyan: $ASAL.yuyan,
                caozuo:$ASAL.caozuo,
                shangchuan:$ASAL.shangchuan,
                qingxuanze:$ASAL.qingxuanze
            }
        }
    },
    methods: {
        onSubmit() {
            var self = this;
            self.form.lang = self.lang;
            if(self.form.id=="") {
                $ASA.submit.call(self, "/"+self.controller+"/add", self.form, function(){
                    self.$refs.tablelist.appendRow($ASA.clone(self.form))
                    
                    if(self.auto_hide!==false) {
                        self.dialogVisible = false
                    }
                })
            }
            else {
                $ASA.submit.call(self, "/"+self.controller+"/edit", self.form, function(){
                    var row = self.$refs.tablelist.getRow(self.rowIndex)
                    $ASA.copyTo(self.form, row)
                    if(self.auto_hide!==false) {
                        self.dialogVisible = false
                    }
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
            self.lang = $ASAL.lang;
            self.showDialog($ASAL.tianjiaxinxi);
        },
        showFormToUpdate(rowIndex, row, lang){
            var self = this
            self.rowIndex = rowIndex;
            self.lang = lang;
            $ASA.copyTo(row, self.form);

            self.showDialog($ASAL.xiugaixinxi);
        },
        getColumnName(column){
            return column.is_multiple? column.name + "_" + this.lang: column.name;
        },
        getUploadSuccessCallback(column){      
            var self = this;      
            if(!column.success_callback) {
                console.log(column ,"44")
                column.success_callback = function(response, file, fileList) {
                    //console.log(response["files"], file, fileList)                
                    file.name = response["files"][file.name]
                    
                    self.form[column.name] += ","+file.name
                    self.form[column.name] = self.form[column.name].replace(/^,/,"")
                } 
            }
            return column.success_callback                       
        },
        getRemoveUploadFileCallback(column){
            var self = this;      
            if(!column.remove_callback) {
                column.remove_callback = function(file, fileList) {   
                    console.log(self.form[column.name], file.name)                 
                    self.form[column.name] = self.form[column.name].replace(file.name,"").replace(/^,/,"").replace(/,+/,",").replace(/,+$/,"")
                } 
            }
            return column.remove_callback
        
        },
        clearFiles() {
            var self = this;                
            setTimeout(function(){
                //console.log(self.$refs) 
                var columns = self.columns;
                for(var i=0;i<columns.length;i++){
                    var column = columns[i]
                    var ele = self.$refs[column.name][0];
                                        
                    if(column.type=='upload') {
                        ele.clearFiles();      
                    }     
                }
             },50)  
        },
        showDialog(title) {
            var self = this;
             //console.log(title,"focus44")
             self.formTitle = title
             self.dialogVisible = true;
             setTimeout(function(){
                //console.log(self.$refs) 
                var is_focus_call = false;
                var columns = self.columns;
                for(var i=0;i<columns.length;i++){
                    var column = columns[i]
                    var ele = self.$refs[column.name][0];
                    
                    if(!is_focus_call && column.is_focus && !ele.disabled) {
                        //console.log(ele,"focus")
                        ele.focus();
                        is_focus_call = true;
                    }  
                }
             },50)  
        }
    },
    watch:{
        base:{
            handler:function(newValue,oldValue){
                console.log("change",newValue,oldValue)
                //this.loadList(function(){})
            },
            deep: true
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
