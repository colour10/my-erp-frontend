<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false" >
    <el-form  class="user-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
        <el-row :gutter="0">
            <el-col :span="6">
                <el-form-item :label="globals.getLabel('shangpinmingcheng')">
                  <el-input v-model="form.productname"></el-input>
                </el-form-item>
            </el-col>

            <el-col :span="6">
                <el-form-item :label="globals.getLabel('fapiaohao')">
                  <el-input v-model="form.invoiceno"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item :label="globals.getLabel('zhidanren')">
                  <el-input v-model="form.makestaff"></el-input>
                </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-button size="mini" type="primary" @click="onSearch">查询</el-button>
                
          </el-col>
        </el-row>
      </el-form>

      <el-row>
        <el-col :span="24">

          <el-table :data="tabledata" stripe border style="width:100%;">
            <el-table-column prop="productname" :label="globals.getLabel('shangpinmingcheng')" align="center"></el-table-column>


            <el-table-column :label="globals.getLabel('caozuo')" width="150" align="center">
              <template v-slot="scope">
                <el-button size="mini" type="primary" @click="onSelect(scope.$index, scope.row)">{{globals.getLabel("xuanze")}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
  </el-dialog>
</template>

<script>
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'

export default {
    name: 'asa-select-product-dialog',
    components:{
        'simple-select':simple_select
    },
    props: {
        visible:{
            type: Boolean
        },
    },
    data() {
        var self = this;
        
        
        return {
            form:{
                productname:""
            },
            tabledata:[],
            dialogVisible:self.visible,
            title:"",
            lang:"",
            globals
        }
    },
    methods:{
        loadPage() {
            var self = this;
            var form = self.form
            self._fetch("/product/search", {productname:form.productname}, function(res){
                self.tabledata = res.data;
            },'json');
        },
        onSearch(){
            this.loadPage();   
        },
        onSelect(rowIndex, row) {
            var self = this
            self.dialogVisible = false;
            self.$emit("select", row)
        }
    },
    mounted:function(){        
    },
    watch:{
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //console.log("visible", newValue)
            this.dialogVisible = newValue
        }
    }
}
</script>
