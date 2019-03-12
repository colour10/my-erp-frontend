<template>
  <el-table :data="tableData" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
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
</template>

<script>

export default {
    name: 'multiple-admin-tablelist',
    props: ['columns', "buttons" ,"options","controller", "base", "default_language", "image_url_prex", "onclickupdate"],
    components: {

    },
    data() {
        var options = this.options || {}
        var base = this.base || {}

        return {
            dialogVisible:false,
            tableData:[] ,
            componenToptions:options,
            languages:[],
            loading:true,
            labels:{
                shanchu: $ASAL.shanchu,
                yuyan: $ASAL.yuyan,
                caozuo:$ASAL.caozuo
            }
        }
    },
    methods: {
        appendRow:function(newRow, rowIndex) {
            var self = this;
            console.log(newRow, rowIndex)
            if(typeof(rowIndex)=='number' && rowIndex>=0) {
                self.tableData[rowIndex].languages += "," + newRow.lang_code;       
            }
            else {
                console.log("append")
                newRow.languages = newRow.lang_code;
                newRow.relateid = newRow.id
                self.tableData.push(newRow)
            }
        },
        getRow:function(rowIndex) {
            return this.tableData[rowIndex]
        },
        showFormToUpdate(rowIndex, row, lang_code, is_update){
            var self = this
            self.rowIndex = rowIndex;

            console.log(rowIndex, row)
            if(row.lang_code==lang_code) {
                //更新本条记录
                self.onclickupdate(rowIndex, row, lang_code, true, true)
            }
            else {
                if(is_update) {
                    //console.log(lang_code)
                    //加载这条数据
                    $ASA.post("/"+self.controller+"/load", {lang_code:lang_code, relateid:row.relateid}, function(res){
                        self.onclickupdate(rowIndex, res, lang_code, is_update, false)
                    }, "json")
                }
                else {
                    var form = {}
                    
                    if(self.base) {
                        Object.keys(self.base).forEach(function(key){
                            form[key] =  self.base[key]
                        });
                    }
                    
                    self.columns.forEach(function(column){
                        if(!column.disable_change) {
                            form[column.name] = ""
                        }
                        else {
                            form[column.name] = row[column.name]    
                        }
                    })
                    console.log(form)
        
                    form.relateid = row.relateid;
                    form.lang_code = lang_code
                    
                    self.onclickupdate(rowIndex, form, lang_code, is_update, false)
                }
            }
        },
        handleDelete(rowIndex, row) {
            var self = this

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
