<template>
<div>   
  <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false" >
    <el-form  class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
        <el-row :gutter="0">
            <el-col :span="6">
              <el-form-item :label="globals.getLabel('gonghuoshang')">
                <simple-select v-model="form.supplierid" source="supplier" :lang="lang"></simple-select>
              </el-form-item>              
              <el-form-item :label="globals.getLabel('gonghuodanwei')">
                <simple-select v-model="form.finalsupplierid" source="supplier" :lang="lang"></simple-select>
              </el-form-item>                              
              <el-form-item :label="globals.getLabel('niandaijijie')">
                <simple-select v-model="form.ageseasonid" source="ageseason" :lang="lang"></simple-select>
              </el-form-item>   
              <el-form-item :label="globals.getLabel('niandaileixing')">
                  <simple-select v-model="form.seasontype" source="seasontype" :lang="lang">
                  </simple-select>
                </el-form-item>

              <el-form-item :label="globals.getLabel('daohuocangku')">
                <simple-select v-model="form.warehouseid" source="warehouse" :lang="lang"></simple-select>
              </el-form-item>

              <el-form-item :label="globals.getLabel('shuxing')">
                  <simple-select v-model="form.property" source="orderproperty" :lang="lang">
                  </simple-select>
                </el-form-item>

                <el-form-item :label="globals.getLabel('zongjine')">
                  <sp-float-input placeholder="" v-model="form.total" class="input-with-select">
                    <select-currency v-model="form.currency">
                    </select-currency>
                  </sp-float-input>
                </el-form-item>

                <el-form-item :label="globals.getLabel('huilv')">
                  <sp-float-input v-model="form.exchangerate"></sp-float-input>
                </el-form-item>

                   
              
              <el-form-item :label="globals.getLabel('zhidanriqi')">
                <el-input :value="form.makedate" :placeholder="globals.getLabel('zidonghuoqu')" disabled></el-input>
              </el-form-item>        

              <el-form-item :label="globals.getLabel('zhidanren')">
                  <sp-display-input :value="form.makestaff" source="user"></sp-display-input>
              </el-form-item>

              <el-form-item :label="globals.getLabel('shenheren')">
                  <sp-display-input :value="form.auditstaff" source="user"></sp-display-input>
              </el-form-item>  

            </el-col>

            <el-col :span="6">
              <el-form-item :label="globals.getLabel('fahuodanhao')">
                <el-input v-model="form.orderno" ></el-input>
              </el-form-item>

              <el-form-item :label="globals.getLabel('fukuanshijian')">
                <el-date-picker v-model="form.paydate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>  

              <el-form-item :label="globals.getLabel('daidiandanwei')">
                <simple-select v-model="form.dd_company" source="supplier" :lang="lang"></simple-select>
              </el-form-item>

              <el-form-item :label="globals.getLabel('anpaitihuoshijian')" class="mini" class="font12">
                <el-date-picker v-model="form.apickingdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>  

              <el-form-item :label="globals.getLabel('hangbanhao')">
                <el-input v-model="form.flightno"></el-input>
              </el-form-item>   

              <el-form-item :label="globals.getLabel('hangbanriqi')">
                <el-date-picker v-model="form.flightdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>  

              <el-form-item :label="globals.getLabel('zhudanhao')">
                <el-input v-model="form.mblno"></el-input>
              </el-form-item>   

              <el-form-item :label="globals.getLabel('zidanhao')">
                <el-input v-model="form.hblno"></el-input>
              </el-form-item>  

              <el-form-item :label="globals.getLabel('fahuogang')">
                <el-input v-model="form.dispatchport"></el-input>
              </el-form-item>   

              <el-form-item :label="globals.getLabel('daohuogang')">
                <el-input v-model="form.deliveryport"></el-input>
              </el-form-item>  

              <el-form-item :label="globals.getLabel('xiangshu')">
                <el-input v-model="form.box_number"></el-input>
              </el-form-item> 

              
            </el-col>

            <el-col :span="6">
              <el-form-item :label="globals.getLabel('zhongliang')">
                <el-input v-model="form.weight"></el-input>
              </el-form-item> 

              <el-form-item :label="globals.getLabel('tiji')">
                <el-input v-model="form.volume"></el-input>
              </el-form-item> 
                <el-form-item :label="globals.getLabel('jifeizhongliang')">
                <el-input v-model="form.chargedweight"></el-input>
              </el-form-item>   
              

              <el-form-item :label="globals.getLabel('kongyunshang')">
                <simple-select v-model="form.transcompany" source="supplier" :lang="lang"></simple-select>
              </el-form-item>     

              <el-form-item :label="globals.getLabel('haiwaifapiaohao')">
                <el-input v-model="form.invoiceno"></el-input>
              </el-form-item>   

              <el-form-item :label="globals.getLabel('daokushijian')">
                <el-date-picker v-model="form.aarrivaldate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>

              <el-form-item :label="globals.getLabel('hangbanriqi')">
                <el-date-picker v-model="form.flightdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>

              <el-form-item :label="globals.getLabel('hetongmaifang')">
                <simple-select v-model="form.buyerid" source="supplier" :lang="lang"></simple-select>
              </el-form-item>  

              <el-form-item :label="globals.getLabel('hetongmaifang2')">
                <simple-select v-model="form.sellerid" source="supplier" :lang="lang"></simple-select>
              </el-form-item> 

               <el-form-item :label="globals.getLabel('yunshufangshi')">
                <simple-select v-model="form.transporttype" source="transporttype" :lang="lang"></simple-select>
              </el-form-item>  

              <el-form-item :label="globals.getLabel('zhifufangshi')">
                <simple-select v-model="form.paytype" source="paytype" :lang="lang"></simple-select>
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
  
  <asa-select-order-detail-dialog :visible.sync="pro" @select="onSelect"></asa-select-order-detail-dialog>
</div>
</template>

<script>
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'
import Asa_Select_Order_Detail_Dialog from './Asa_Select_Order_Detail_Dialog.vue'
import DataSource from '../DataSource.js'

const _log = globals.logger("asa-order-confirm-dialog");

export default {
    name: 'asa-order-confirm-dialog',
    components:{
        'simple-select':simple_select,
        'asa-select-order-detail-dialog':Asa_Select_Order_Detail_Dialog
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
                supplierid:"",
                finalsupplierid:"",
                ageseasonid:"",
                seasontype:"",
                warehouseid:"",
                property:"",
                total:"",
                currency:"",
                exchangerate:"",
                orderno:"",
                paydate:"",
                dd_company:"",
                apickingdate:"",
                flightno:"",
                flightdate:"",
                mblno:"",
                hblno:"",
                dispatchport:"",
                deliveryport:"",
                box_number:"",
                weight:"",
                volume:"",
                chargedweight:"",
                transcompany:"",
                invoiceno:"",
                aarrivaldate:"",
                flightdate:"",
                buyerid:"",
                sellerid:"",
                transporttype:"",
                paytype:"",
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
            self._submit("/order/save", {params}, function(res){
                    
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