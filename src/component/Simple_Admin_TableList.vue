<template>
  <div>
    <el-table :data="tableData" stripe border style="width: 100%;">
      <el-table-column :prop="item.name" :label="item.label" align="center" :width="item.width||180" v-if="!item.is_hide" v-for="item in columns" :key="item.name">
        <template v-slot="scope">
          <img v-if="item.is_image" :src="_label('_image_url_prex')+scope.row[item.name]" :style="getImageStyle(item)">
          <span v-if="!item.is_image">{{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}</span>
          
        </template>
      </el-table-column>
      
      <el-table-column :label="item.label" align="center" :width="item.width||180" v-for="item in buttons" >
      <template v-slot="scope">
        <el-button type="info" circle @click="item.handler(scope.$index, scope.row, item)">{{item.label}}</el-button>
      </template>            
    </el-table-column>

      <el-table-column :label="_label('caozuo')" width="150" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="handleClickUpdate(scope.$index, scope.row)" v-if="isEditable(scope.row)">{{_label('bianji')}}</el-button>
          <el-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)" v-if="isDeletable(scope.row)">{{_label('shanchu')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'simple-admin-tablelist',
    props: ['columns',"buttons","controller", "base", "onclickupdate", 'isedit', 'isdelete'],
    components: {

    },
    data() {
        var base = this.base || {}

        return {
            rowIndex:"",
            tableData:[]
        }
    },
    methods: {
        appendRow:function(row) {
            this.tableData.push(row)
        },
        getRow:function(rowIndex) {
            return this.tableData[rowIndex]
        },
        onClickDelete(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;

            self._remove("/"+self.controller+"/delete?id="+row.id, function() {
                self.$delete(self.tableData,rowIndex)
            })
        },
        handleClickUpdate(rowIndex, row) {
            var self = this
            if(self.onclickupdate) {
                self.onclickupdate(rowIndex, row)
                self._log("click edit")
            }
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
        convert(row,column, rowIndex){
            let self = this
            var value = row[column.name]
            if(column.type=='switch') {
                return value=='1'? $ASAL.yes : $ASAL.no;
            }
            else if(column.type=='select') {
                //异步加载数据，然后重新渲染列表
                if(!column.dataSource) {
                    column.dataSource = DataSource.getDataSource(column.source, globals.getLabel("lang"));
                }
                
                if(row[column.name + "__columncopy"]!=value) {
                    column.dataSource.getRowLabel(value,function(label){
                        row[column.name + "__label"] = label; 
                        row[column.name + "__columncopy"] = value;  
                    });
                    self._log('==================', value)
                }
                return row[column.name + "__label"]
            }
            else if(column.type=='select-dialog') {
                //异步加载数据，然后重新渲染列表
                if(!column.dataSource) {
                    column.dataSource = DataSource.getDataSource(column.source, globals.getLabel("lang"));
                }
                
                if(row[column.name + "__columncopy"]!=value && row[column.name + "__loading"]!="1") {
                    row[column.name + "__loading"] = 1;
                    column.dataSource.getRowLabels(value,function(label){
                        row[column.name + "__label"] = label; 
                        row[column.name + "__columncopy"] = value;  
                    });
                    self._log('==================',column.name, value)
                }
                return row[column.name + "__label"]         
            }
            else {
                return value;
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
                //self._log(self.base)
            }
            
            var obj = {}
            var columns = self.columns;
            for(var i=0;i<columns.length;i++) {
                if(columns[i].type=='select' || columns[i].type=='select-dialog') {
                    obj[columns[i].name+"__loading"] = "";
                    obj[columns[i].name+"__label"] = "";  
                    obj[columns[i].name+"__columncopy"] = "";  
                }   
            }
            
            var asa = self.$asa;

            self._submit("/"+self.controller+"/page",params,function(res){
                //self._log(res)
                res.data.forEach(item=>self.tableData.push(asa.extend(item, obj)))
            });
        },
        isDeletable(row) {
            let self = this
            if(typeof(self.isdelete)=='function') {
                return self.isdelete(row)
            }

            return true
        },
        isEditable(row) {
            let self = this
            if(typeof(self.isedit)=='function') {
                return self.isedit(row)
            }

            return true
        }
    },
    watch:{
        base:{
            handler:function(newValue,oldValue){
                //this._log("change",newValue,oldValue)
                this.loadList()
            },
            deep: true
        }
    },
    computed:{
    },
    mounted:function(){
        //this._log(onClickUpdate)
        this.loadList()
    }
}
</script>