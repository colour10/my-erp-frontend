<template>
  <div>
  <el-input :placeholder="placeholder" v-model="currentText" :readonly="true">    
    <el-button slot="append" icon="el-icon-more" @click="showPanel"></el-button>
  </el-input>
  
  <el-dialog class="user-form" :title="labels.formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">  
    <el-radio-group v-model="currentValue" @change="handleChange">
      <el-radio :label="item.getKeyValue()" v-for="(item,key) in data" :key="item.getKeyValue()">{{item.getLabelValue()}}</el-radio>
    </el-radio-group>
    
    <div slot="footer" class="dialog-footer" v-if="!auto_model">    
      <el-button type="primary" @click="handleSelect">{{labels.ok}}</el-button>
      <el-button @click="handleCancel">{{labels.cancel}}</el-button>
    </div>
  </el-dialog>
</div>
  
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'select-dialog-single',
    props: {
        select_value:{
            type: [String,Number],
            required: true,
            default:''
        },
        data_source:{
            type: Object    
        },
        disabled:{
            type: Boolean,
            default:false
        },
        lang:{
            type: String
        },
        auto_model:{
            type: Boolean,
            default:false
        },
        placeholder:{
            type: String,
            default:""
        },
        source:{
            type:String,
            required:true    
        }
        
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        var self = this
        
        var dataSource = DataSource.getDataSource(self.source, self.lang);
        
        console.log(dataSource,"dataSource")
        return {
            currentText:"",
            currentValue:"",
            data:[],
            componenToptions:{},            
            dialogVisible:false,
            labels:{
                formTitle:globals.getLabel('qingxuanze'),
                ok:globals.getLabel('ok'),
                cancel:globals.getLabel('cancel')
            },
            dataSource:dataSource
        }
    },
    methods: {
        handleSelect() {
            var self = this;
            //self.convertValue(self.currentValue)
            self.$emit('change',self.currentValue)    
            self.dialogVisible = false;  
        },
        handleCancel() {
            var self = this;
            self.convertValue(this.select_value)
            self.currentValue = self.select_value
            self.dialogVisible = false;  
        },
        showPanel(){
            this.dialogVisible = true;    
        },
        handleChange(newValue) {
            var self = this;
            //console.log("change", newValue)            
            
            if(self.auto_model) {
                self.convertValue(newValue)
                self.$emit('change',newValue)
            }
        },
        convertValue(value) {
            var self = this;
            self.dataSource.getRowLabel(value,function(label){
                self.currentText = label;  
            });
        }
    },
    watch:{
        select_value(newValue) {
            this.convertValue(newValue)
            this.currentValue = newValue
        },
        lang(newValue) {
            this.dataSource.setLang(newValue)   
        }
    },
    mounted:function(){
        var self = this;
        self.convertValue(self.select_value)
        self.currentValue = self.select_value;
        
        self.dataSource.getData(function(data){
            self.data = data      
        })
    }
}
</script>
