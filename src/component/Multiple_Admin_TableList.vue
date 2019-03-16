<template>
  <el-table :data="tableData" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
    <el-table-column :prop="name" :label="item.label" align="center" :width="item.width||180" v-if="!item.is_hide" v-for="item in columns" :key="item.name">
      <template v-slot="scope">
        <img v-if="item.is_image" :src="image_url_prex+scope.row[item.name]" :style="getImageStyle(item)">
        <span v-if="!item.is_image && !item.html">{{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}</span>
        <span v-if="item.html" v-html="item.html">{{item.html}}</span>
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
         <el-button :type="isSettingLanguage(scope.row, item.code)?'primary':'info'" circle @click="showFormToUpdate(scope.$index, scope.row, item.code)">{{item.shortName}}</el-button>
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
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'multiple-admin-tablelist',
    props: ['columns', "buttons" ,"options","controller", "base", "onclickupdate", "key_column"],
    components: {

    },
    data() {
        var options = this.options || {}
        var base = this.base || {}

        return {
            tableData:[] ,
            componenToptions:options,
            languages:$ASAL.list_languages,
            loading:true,
            labels:{
                shanchu: $ASAL.shanchu,
                yuyan: $ASAL.yuyan,
                caozuo:$ASAL.caozuo
            },
            current_lang:$ASAL.lang,
            image_url_prex:$ASAL._image_url_prex
        }
    },
    methods: {
        appendRow:function(newRow, rowIndex) {
            var self = this;
            console.log(newRow, rowIndex)
            self.tableData.push(newRow)
        },
        getRow:function(rowIndex) {
            return this.tableData[rowIndex]
        },
        showFormToUpdate(rowIndex, row, lang){
            var self = this
            self.rowIndex = rowIndex;
            console.log(rowIndex, row, lang)
            self.onclickupdate(rowIndex, row, lang)
        },
        handleDelete(rowIndex, row) {
            var self = this

            $ASA.remove.call(this, "/"+self.controller+"/delete?id="+row.id, function() {
                self.$delete(self.tableData, rowIndex)
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
        isSettingLanguage(row, lang) {
            var column_name = this.key_column +"_"+lang
            return row[column_name] && row[column_name]!=""
        },
        convert(row, column, rowIndex){
            var self = this;
            var column_name = column.is_multiple? column.name + "_" + self.current_lang: column.name;
            var value = row[column_name]; 
            
            if(column.type=='switch') {
                return value=='1'? $ASAL.yes : $ASAL.no;   
            }   
            else if(column.type=='select') {
                //异步加载数据，然后重新渲染列表
                if(!column.dataSource) {
                    column.dataSource = DataSource.getDataSource(column.source, self.current_lang);
                }
                
                if(row[column.name + "__columncopy"]!=value && row[column.name + "__loading"]!="1") {
                    row[column.name + "__loading"] = 1;
                    column.dataSource.getRowLabel(value,function(label){
                        row[column.name + "__label"] = label; 
                        row[column.name + "__columncopy"] = value;  
                    });
                    //console.log('==================')
                }
                return row[column.name + "__label"]
            } 
            else {                
                return value;      
            }
        },
        loadList(cb) {
            var self = this;
            self.tableData = []

            var params = {}
            if(self.base) {
                Object.keys(self.base).forEach(function(key){
                    params[key] =  self.base[key]
                });
                //console.log(self.base)
            }
            
            var obj = {}
            var columns = self.columns;
            for(var i=0;i<columns.length;i++) {
                if(columns[i].type=='select') {
                    obj[columns[i].name+"__loading"] = "";
                    obj[columns[i].name+"__label"] = "";
                    obj[columns[i].name+"__columncopy"] = "";  
                }   
            }
            
            var asa = self.$asa;

            $ASA.post("/"+self.controller+"/page",params,function(res){
                //console.log(res)
                for(var i=0;i<res.length;i++) {
                    self.tableData.push(asa.extend(res[i], obj))
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

        var load_page = new Promise(function(resolve, reject){
            self.loadList(resolve)
        });

        Promise.all([load_page]).then(function (results) {
            self.loading = false;
        });
    }
}

</script>

<style>
</style>
