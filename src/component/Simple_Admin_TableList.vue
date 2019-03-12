<template>
  <div>
    <el-table :data="tableData" stripe border style="width: 100%;">
      <el-table-column :prop="item.name" :label="item.label" align="center" :width="item.width||180" v-if="item.is_show" v-for="item in columns" :key="item.name">
        <template v-slot="scope">
          {{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}
        </template>
      </el-table-column>

      <el-table-column :label="caozuo" width="150" align="center">
        <template v-slot="scope">
          <el-button size="mini" @click="handleClickUpdate(scope.$index, scope.row)">{{bianji}}</el-button>
          <el-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)">{{shanchu}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    name: 'simple-admin-tablelist',
    props: ['columns',"controller", "base", "onclickupdate"],
    components: {

    },
    data() {
        var base = this.base || {}

        return {
            rowIndex:"",
            tableData:[],
            'caozuo':$ASAL.caozuo,
            'bianji':$ASAL.bianji,
            'shanchu':$ASAL.shanchu
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

            $ASA.remove.call(this, "/"+self.controller+"/delete?id="+row.id, function() {
                self.$delete(self.tableData,rowIndex)
            })
        },
        handleClickUpdate(rowIndex, row) {
            if(this.onclickupdate) {
                this.onclickupdate(rowIndex, row)
                console.log("click edit")
            }
        },
        convert(row,column, rowIndex){
            if(column.type=='switch') {
                return row[column.name]=='1'? $ASAL.yes : $ASAL.no;
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
                //console.log("change",newValue,oldValue)
                this.loadList()
            },
            deep: true
        }
    },
    computed:{
    },
    mounted:function(){
        //console.log(onClickUpdate)
        this.loadList()
    }
}
</script>

<style>
</style>
