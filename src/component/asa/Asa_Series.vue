<template>
      <div>

  <multiple-admin-page v-bind="props"></multiple-admin-page>
  
  <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" width="80%" :modal="false">
    <multiple-admin-page v-bind="props2"></multiple-admin-page>
  </el-dialog>
</div>
</template>

<script>
import globals from '../globals.js'
    
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
                    {name:"name", label:globals.getLabel('xiliemingcheng'), is_multiple:true, is_focus:true},
                    {name:"code", label:globals.getLabel('xiliebianma')}
                ],
                buttons:[
                    {name:"code", label:globals.getLabel('zixilie'), width:200, handler:function(rowIndex, row){
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
                    {name:"name", label:globals.getLabel('mingcheng'), is_multiple:true, is_focus:true},
                    {name:"code", label:globals.getLabel('bianma')}
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
