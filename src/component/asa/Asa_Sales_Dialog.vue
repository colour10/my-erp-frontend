<template>
<div>   
  <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false" >
    <el-form  class="user-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
        <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item :label="globals.getLabel('huiyuan')">
                <simple-select v-model="form.memberid" source="businesstype" :lang="lang"></simple-select>
              </el-form-item>              
              <el-form-item :label="globals.getLabel('xiaoshouren')">
                <simple-select v-model="form.salesstaff" source="user" :lang="lang"></simple-select>
              </el-form-item>                              
              <el-form-item :label="globals.getLabel('waitudingdanhao')">
                <el-input v-model="form.externalno"></el-input>
              </el-form-item>              
              <el-form-item :label="globals.getLabel('xiaoshoudangku')">
                <simple-select v-model="form.warehouseid" source="warehouse" :lang="lang"></simple-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item :label="globals.getLabel('xiaoshouriqi')">
                <el-date-picker v-model="form.salesdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>              
              <el-form-item :label="globals.getLabel('duizhangdanhao')">
                <el-input v-model="form.ordercode" ></el-input>
              </el-form-item>              
              <el-form-item :label="globals.getLabel('zhidanriqi')">
                <el-input :value="form.sys_create_date" :placeholder="globals.getLabel('zidonghuoqu')" disabled></el-input>
              </el-form-item>              
              <el-form-item :label="globals.getLabel('tihuofangshi')">
                <simple-select v-model="form.pickingtype" source="pickingtype" :lang="lang"></simple-select>
              </el-form-item>

              <el-form-item :label="globals.getLabel('zhidanren')">
                  <sp-display-input :value="form.sys_create_stuff" source="user"></sp-display-input>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item :label="globals.getLabel('kuaidifukuanfang')">
                <simple-select v-model="form.expresspaidtype" source="expresspaidtype" :lang="lang"></simple-select>
              </el-form-item>

              <el-form-item :label="globals.getLabel('kuaididanhao')">
                <el-input v-model="form.expressno"></el-input>
              </el-form-item>   

              <el-form-item :label="globals.getLabel('kuaidifeiyong')">
                <el-input v-model="form.expressfee"></el-input>
              </el-form-item>   

              <el-form-item :label="globals.getLabel('shouhuodizhi')">
                <el-input v-model="form.address"></el-input>
              </el-form-item>              
          </el-col>

          <el-col :span="6">
            <el-button type="primary" @click="saveOrder(1)">{{globals.getLabel("tijiao")}}</el-button>
            <el-button type="primary" @click="saveOrder(2)">{{globals.getLabel("yushou")}}</el-button>
            <el-button :type="form.id?'primary':'info'" @click="showAttachment()">{{globals.getLabel("fujian")}}</el-button>
            <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="bottom">
              <el-button :type="form.id?'primary':'info'" @click="deleteOrder()">{{globals.getLabel("shanchu")}}</el-button>
            </el-tooltip>
          </el-col>
        </el-row>
      </el-form>

        

      <el-row type="flex" justify="end">
        <el-col :offset="22" :span="2" >
          <el-button type="primary" @click="showProduct()">{{globals.getLabel("xuanzeshangpin")}}</el-button>
        </el-col>
      </el-row>    
      <el-row>
        <el-col :span="24">            
          <el-table :data="tabledata" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
            <el-table-column prop="productname" :label="globals.getLabel('chanpinmingcheng')" align="center">
              <template v-slot="scope">
                {{scope.row.product.productname}}
              </template>
            </el-table-column>

            <el-table-column prop="label" :label="globals.getLabel('chima')" width="100" align="center">
                <template v-slot="scope">
                <simple-select v-model="scope.row.sizecontentid" :source="scope.row.source" :lang="lang"></simple-select>
              </template>
            </el-table-column>

            <el-table-column prop="num" :label="globals.getLabel('shuliang')" width="200" align="center">
              <template v-slot="scope">
                <el-input-number v-model="scope.row.number" :min="1" :max="10"></el-input-number>
              </template>
            </el-table-column>
                        
            <el-table-column :label="globals.getLabel('caozuo')" width="150" align="center">
              <template v-slot="scope">
                <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">{{globals.getLabel('shanchu')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
  </el-dialog>
  
  <asa-select-product-dialog :visible.sync="pro" @select="onSelect"></asa-select-product-dialog>
</div>
</template>

<script>
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'
import Asa_Select_Product_Dialog from './Asa_Select_Product_Dialog.vue'
import DataSource from '../DataSource.js'


export default {
    name: 'asa-sales-dialog',
    components:{
        'simple-select':simple_select,
        'asa-select-product-dialog':Asa_Select_Product_Dialog
    },
    props: {
        visible:{
            type: Boolean
        },
    },
    data() {
        var self = this;

        var dataSource = DataSource.getDataSource('sizecontent', globals.getLabel('lang'));
        return {
            form:{
                memberid:"",
                salesstaff:"",
                externalno:"",
                warehouseid:"",
                salesdate:"",
                ordercode:"",
                pickingtype:"",
                expresspaidtype:"",
                expressno:"",
                expressfee:"",
                address:"",
                id:""
            },
            tabledata:[],
            dialogVisible:self.visible,
            title:"",
            lang:"",
            pro:false,
            globals,
            dataSource
        }
    },
    methods:{
        showProduct() {
            this.pro = true;   
        },
        onSelect(row) {
            var self = this;
            self.dataSource.sub({topid:row.sizetopid}, subDataSource=> {
                //console.log(subDataSource, "sub")
                //console.log(subDataSource.constructor==DataSource)
                self.tabledata.unshift({productid:row.id, salesid:0, number:0, sizecontentid:0, source:subDataSource, product:row})              
            })
        },
        saveOrder(flag) {
            //保存订单
            var self = this
            var params = {form:self.form}
            var array = []
            params.list = self.tabledata.map(item=> {
                return {productid:item.productid, id:item.id, sizecontentid:item.sizecontentid, number:item.number}
            })
            console.log(JSON.stringify(params))
            $ASA.submit.call(self, "/order/save", {params}, function(res){
                    
            });
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        showAttachment() {

        },
        deleteOrder() {
            const self = this
            if(!self.form.id) {
                return 
            }
            $ASA.remove.call(self, "/order/delete?id="+self.form.id, function(res){
                    
            });
        }
    },
    computed:{
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
