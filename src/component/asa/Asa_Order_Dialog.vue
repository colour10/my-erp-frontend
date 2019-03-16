<template>
<div>
  <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false" >
    <el-form  class="user-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
        <el-row :gutter="0">
            <el-col :span="6">
                <el-form-item :label="globals.getLabel('yewuleixing')">
                  <simple-select v-model="form.businesstype" source="businesstype" :lang="lang">
                  </simple-select>
                </el-form-item>

                <el-form-item :label="globals.getLabel('gonghuoshang')">
                  <simple-select v-model="form.supplierid" source="supplier" :lang="lang">
                  </simple-select>
                </el-form-item>

                <el-form-item :label="globals.getLabel('fahuodanwei')">
                  <simple-select v-model="form.finalsupplierid" source="supplier" :lang="lang">
                  </simple-select>
                </el-form-item>

                <el-form-item :label="globals.getLabel('niandai')">
                  <simple-select v-model="form.ageseason" source="ageseason" :lang="lang"></simple-select>
                </el-form-item>

                <el-form-item :label="globals.getLabel('niandaileixing')">
                  <simple-select v-model="form.seasontype" source="seasontype" :lang="lang">
                  </simple-select>
                </el-form-item>
            </el-col>

            <el-col :span="6">
                <el-form-item :label="globals.getLabel('nannvkuan')">
                  <simple-select v-model="form.formtype" source="formtype" :lang="lang">
                  </simple-select>
                </el-form-item>

                <el-form-item :label="globals.getLabel('dingdanriqi')">
                  <el-date-picker v-model="form.makedate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                <el-form-item :label="globals.getLabel('dingdanhao')">
                  <el-input v-model="form.ordercode" :placeholder="globals.getLabel('zidonghuoqu')" disabled></el-input>
                </el-form-item>

                <el-form-item :label="globals.getLabel('haiwaidingdanhao')">
                  <el-input v-model="form.worldordercode"></el-input>
                </el-form-item>

                <el-form-item :label="globals.getLabel('fapiaohao')">
                  <el-input v-model="form.invoiceno"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="6">
                <el-form-item :label="globals.getLabel('zongjine')">
                  <el-input placeholder="" v-model="form.exchangerate" class="input-with-select">
                    <select-currency v-model="form.currencyid" slot="prepend">
                    </select-currency>
                  </el-input>
                </el-form-item>

                <el-form-item :label="globals.getLabel('huilv')">
                  <el-input v-model="form.exchangerate"></el-input>
                </el-form-item>

                <el-form-item :label="globals.getLabel('zhekou')">
                  <el-input v-model="form.discount"></el-input>
                </el-form-item>

                <el-form-item :label="globals.getLabel('shuxing')">
                  <simple-select v-model="form.property" source="orderproperty" :lang="lang">
                  </simple-select>
                </el-form-item>
                
                <el-form-item :label="globals.getLabel('wofanglianxiren')">
                  <simple-select v-model="form.ourcontactor" source="user" :lang="lang">
                  </simple-select>
                </el-form-item>
          </el-col>

          <el-col :span="6">
                <el-form-item :label="globals.getLabel('dinghuokehu')">
                  <simple-select v-model="form.bookingid" source="supplier" :lang="lang">
                  </simple-select>
                </el-form-item>

                <el-form-item :label="globals.getLabel('dinghuokehulianxiren')">
                  <el-input v-model="form.contactor"></el-input>
                </el-form-item>

                <el-form-item :label="globals.getLabel('beizhu')">
                  <el-input v-model="form.memo"></el-input>
                </el-form-item>
                
                <el-form-item :label="globals.getLabel('shenheren')">
                  <el-input v-model="form.auditstaff" disabled></el-input>
                </el-form-item>
                
                <el-form-item :label="globals.getLabel('zhidanren')">
                  <el-input v-model="form.makestaff" disabled></el-input>
                </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <el-row type="flex" justify="end">
        <el-col :offset="20" :span="2" >
          <el-button type="info" @click="showProduct()">{{globals.getLabel("xuanzeshangpin")}}</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button type="primary" @click="saveOrder()">{{globals.getLabel("baocundingdan")}}</el-button>
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
                {{scope.row.sizecontent.getLabel()}}
              </template>
            </el-table-column>

            <el-table-column prop="num" :label="globals.getLabel('dinggoushuliang')" width="200" align="center">
              <template v-slot="scope">
                <el-input-number v-model="scope.row.num" :min="1" :max="10"></el-input-number>
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
    name: 'asa-order-dialog',
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
                businesstype:"",
                supplierid:"",
                finalsupplierid:"",
                ageseason:"",
                seasontype:"",
                formtype:"",
                makedate:"",
                ordercode:"",
                worldordercode:"",
                invoiceno:"",
                exchangerate:"",
                currencyid:"",
                exchangerate:"",
                discount:"",
                property:"",
                makestaff:"",
                auditstaff:"",
                ourcontactor:"",
                bookingid:"",
                contactor:"",
                memo:"",
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
            /*self.dataSource.getData(data=> {
                data.filter(item => item.getRow().topid==row.sizetopid).map( item => { 
                    self.tabledata.unshift({productid:row.id, sizecontentid:item.getValue(), orderid:0, num:0, sizecontent:item, product:row})
                })                
            })*/
            self.dataSource.filter({topid:row.sizetopid}, data=> {
                data.map( item => { 
                    self.tabledata.unshift({productid:row.id, sizecontentid:item.getValue(), orderid:0, num:0, sizecontent:item, product:row})
                })                
            })
        },
        saveOrder() {
            //保存订单
            var self = this
            var params = {form:self.form}
            var array = []
            params.list = self.tabledata.map(item=> {
                return {productid:item.productid, id:item.id, sizecontentid:item.sizecontentid, num:item.num}
            })
            console.log(JSON.stringify(params))
            $ASA.submit.call(self, "/order/save", {params}, function(res){
                    
            });
        },
        getRowCount(rowIndex, row) {
            console.log(row, "getRowCount")
            return row.sizetoplist.reduce((total,item)=>total+=item.num,0)
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
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
