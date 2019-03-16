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

          <el-table :data="tabledata" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
            <el-table-column prop="productname" label="item.label" align="center"></el-table-column>


            <el-table-column label="labels.caozuo" width="150" align="center">
              <template v-slot="scope">
                <el-button size="mini" type="primary" @click="onSelect(scope.$index, scope.row)">选择</el-button>
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
            $ASA.post("/product/search", {productname:form.productname}, function(res){
                self.tabledata = res;
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
<style>
    .user-form .el-input__inner {
        width:200px;
    }

    .user-form .el-input-group {
        width:200px;
    }

    .user-form .el-input-group .el-input__inner {
        width:155px;
    }
    .user-form .el-input-group--prepend .el-input__inner {
        width:99px;
    }

    .user-form .el-form-item__content {
        width:200px;
    }

    .user-form .el-date-editor.el-input, .el-date-editor.el-input__inner {
        width:150px
    }

    .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 5px;
    }

    .user-form .el-checkbox {
        margin-right:12px;
    }

    .user-form .el-checkbox__label {
        padding-left:4px;
    }

</style>
