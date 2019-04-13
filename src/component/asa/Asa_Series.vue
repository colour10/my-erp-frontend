<template>
      <div>

  <multiple-admin-page v-bind="props"></multiple-admin-page>
  
  <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" width="80%" :modal="false">
    <multiple-admin-page v-bind="props2"></multiple-admin-page>
  </el-dialog>
</div>
</template>

<script>
import {_label} from '../globals.js'
    
export default {
    name: 'asa-series',
    props: {
        brandid:{
            type: [String,Number]
        }
    },
    data() {
        var self = this;
        return {
            props:{
                columns:[
                    {name:"name", label:_label('xiliemingcheng'), is_multiple:true, is_focus:true},
                    {name:"code", label:_label('xiliebianma')}
                ],
                buttons:[
                    {name:"code", label:_label('zixilie'), width:200, handler:function(rowIndex, row){
                        self.props2.base.seriesid = row.id;
                        self.dialogVisible = true; 
                    }}
                ],
                controller:"series",
                key_column:"name",
                base:{
                    brandid:self.brandid    
                }
            },
            props2:{
                columns:[            
                    {name:"name", label:_label('mingcheng'), is_multiple:true, is_focus:true},
                    {name:"code", label:_label('bianma')}
                ],
                controller:"series2",
                key_column:"name",
                base:{
                    seriesid:""
                }
            },
            dialogVisible:false,
            title:""
        }
    },
    watch:{
        brandid(newValue) {
            this.props.base.brandid = newValue;   
        }    
    }
}
</script>
