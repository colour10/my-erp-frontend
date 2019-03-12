<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="showFormToCreate()">{{labels.xinjian}}</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <el-table :data="tableData" stripe border style="width: 100%;" v-loading.fullscreen.lock="loading">
          <el-table-column :prop="name" :label="item.label" align="center" :width="item.width||180" v-if="item.is_show" v-for="item in columns" :key="item.name">
            <template v-slot="scope">
              <img v-if="item.is_image" :src="image_url_prex+scope.row[item.name]" :style="getImageStyle(item)">
              <span v-if="!item.is_image">{{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}</span>
            </template>            
          </el-table-column>
          
          <el-table-column :label="item.label" align="center" :width="item.width||180" v-for="item in buttons" >
            <template v-slot="scope">
              <el-button type="info" circle @click="item.handler(scope.$index, scope.row, item)">{{item.label}}</el-button>
            </template>            
          </el-table-column>

          <el-table-column prop="lang_code" :label="labels.yuyan" width="180" align="center">
            <template v-slot="scope">
             <span v-for="(item, key) in languages" :key="item.code" :value="item.code">
               <el-button :type="isSettingLanguage(scope.row, item.code)?'primary':'info'" circle @click="showFormToUpdate(scope.$index, scope.row, item.code, scope.row.languages.indexOf(item.code)>0)">{{item.shortName}}</el-button>
             </span>
            </template>
          </el-table-column>

          <el-table-column :label="labels.caozuo" width="150" align="center">
            <template v-slot="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{labels.shanchu}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in columns" :key="item.name">
          <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" :disabled="isFormDisabled(item)"></el-input>
          <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" :disabled="isFormDisabled(item)" active-value="1" inactive-value="0"></el-switch>
                              
          <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" v-bind="item.data_source" :disabled="isFormDisabled(item)">
          </simple-select>
          
          <el-upload :ref="item.name" :action="'/common/upload?category='+controller" v-if="item.type=='upload'" :multiple="item.multiple || false"  :limit="item.limit || 1" :on-success="getUploadSuccessCallback(item)" :on-remove="getRemoveUploadFileCallback(item)" :disabled="isFormDisabled(item)">
            <el-button size="small" type="primary">{{labels.shangchuan}}</el-button>
          </el-upload>
        </el-form-item>

        <el-form-item :label="labels.yuyan">
            <el-select v-model="!form.relateid?default_language:form.lang_code" :placeholder="labels.choice" disabled>
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
    props: ['columns', "buttons" ,"options","controller", "base", "default_language", "image_url_prex"],
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
        
        var columns = this.columns
        for(var i=0;i<columns.length;i++) {
            if(columns[i].is_create && columns[i].is_update) {
                form[columns[i].name] = ""
            }
        }

        return {
            dialogVisible:false,
            form: form,
            rowIndex:"",
            formTitle:"",
            tableData:[] ,
            componenToptions:options,
            languages:[],
            loading:true,
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
                    self.clearFiles()
                })
            }
            else {
                $ASA.submit.call(self, "/"+self.controller+"/edit", self.form, function(){
                    //self.tableData[self.rowIndex].lang_code = self.form.lang_code
                    if(self.form.lang_code==self.default_language) {
                        $ASA.copyTo(self.form, self.tableData[self.rowIndex])
                    }
                    
                    self.dialogVisible = false
                    self.clearFiles()
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

            self.form.lang_code = self.default_language;
            self.showDialog($ASAL.tianjiaxinxi);
        },
        showFormToUpdate(rowIndex, row, lang_code, is_update){
            var self = this
            self.rowIndex = rowIndex;

            //console.log(rowIndex, row, lang_code, action, this.default_language)
            if(row.lang_code==lang_code) {
                //更新本条记录
                $ASA.copyTo(row, self.form)
                self.showDialog($ASAL.xiugaixinxi)
            }
            else {
                if(is_update) {
                    //console.log(lang_code)
                    //加载这条数据
                    $ASA.post("/"+self.controller+"/load", {lang_code:lang_code, relateid:row.relateid}, function(res){
                        $ASA.copyTo(res, self.form)

                        self.showDialog($ASAL.xiugaixinxi);
                    }, "json")
                }
                else {
                    $ASA.empty(self.form)
                    
                    if(self.base) {
                        Object.keys(self.base).forEach(function(key){
                            self.form[key] =  self.base[key]
                        });
                    }
                    //console.log(self.form)
                    self.columns.forEach(function(column){
                        if(!column.disable_change) {
                            self.form[column.name] = ""
                        }
                        else {
                            self.form[column.name] = row[column.name]    
                        }
                    })
                    //console.log(self.form)
        
                    self.form.relateid = row.relateid;
                    self.form.lang_code = lang_code
                    
                    self.showDialog($ASAL.tianjiaxinxi);
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
        getImageStyle(column){
            var styles = "";
            if(column.image_width) {
                styles += "width:"+column.image_width+'px;'  
            }    
            
            if(column.image_height) {
                styles += "height:"+column.image_height+'px;'  
            } 
            return styles;
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
        },
        isSettingLanguage(row, lang_code) {
            //console.log(row.languages, lang_code)
            return (row.languages && row.languages.indexOf(lang_code)>=0)
        },
        convert(row,column, rowIndex){
            var value = row[column.name]; 
            if(column.type=='switch') {
                return value=='1'? $ASAL.yes : $ASAL.no;   
            }   
            else if(column.type=='select') {
                if(column.data_source.hashtable) {
                    return column.data_source.hashtable[value]   
                }
                else {
                    return value; 
                }
            } 
            else {
                
                return value;      
            }
        },
        isFormDisabled(column) {
            var form = this.form;
            //console.log(column, form)
            return (form.id==''&&!column.is_create) || (form.id!=''&&!column.is_update) || ((form.id!='' || form.lang_code!=this.default_language)&&column.disable_change)
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

            $ASA.post("/"+self.controller+"/page",params,function(res){
                //console.log(res)
                for(var i=0;i<res.length;i++) {
                    self.tableData.push(res[i])
                }
                console.log("callback",cb)
                cb()
            },'json');
        }
    },
    watch:{
        base:{
            handler:function(newValue,oldValue){
                //console.log("change",newValue,oldValue)
                this.loadList(function(){})
            },
            deep: true
        }
    },
    computed:{
    },
    mounted:function(){
        var self = this;

        var load_languages = new Promise(function(resolve, reject){
            $ASA.post("/common/language", {}, function(res){
                //console.log(res)
                resolve(res)
            },"json")
        });

        var load_page = new Promise(function(resolve, reject){
            self.loadList(function(){
                resolve()    
            })
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
