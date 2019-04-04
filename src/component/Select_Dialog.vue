<template>
  <div>
  <el-input :placeholder="placeholder" v-model="currentText" :readonly="true">    
    <el-button slot="append" icon="el-icon-more" @click="showPanel"></el-button>
  </el-input>
  
  <el-dialog class="user-form" :title="_label('qingxuanze')" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
    <el-checkbox-group v-model="checkList" @change="handleChange">
      <el-checkbox :label="item.getKeyValue()" v-for="(item,key) in data" :key="item.getKeyValue()">{{item.getLabelValue()}}</el-checkbox>
    </el-checkbox-group>
    
    <div slot="footer" class="dialog-footer" v-if="!auto_model">    
      <el-button type="primary" @click="handleSelect">{{_label("ok")}}</el-button>
      <el-button @click="handleCancel">{{_label("cancel")}}</el-button>
    </div>
  </el-dialog>
</div>
  
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'select-dialog',
    props: {
        select_value:{
            required: true,
            default:''
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
        
        
        return {
            currentText:"",
            checkList:[],
            data:[],
            componenToptions:{},            
            dialogVisible:false
        }
    },
    methods: {
        handleSelect() {
            var self = this;
            self.$emit('change',self.checkList.join(","))    
            self.dialogVisible = false;  
        },
        handleCancel() {
            var self = this;
            self.convertValue(self.select_value)
            //self.checkList = self.select_value.split(",")
            self.dialogVisible = false;  
        },
        showPanel(){
            var self = this;

            self.getDataSource().getData(function(data){
                self.data = data
                self.dialogVisible = true;        
            })                 
        },
        handleChange(newValue) {
            var self = this;
            
            if(self.auto_model) {
                self.convertValue(newValue)
                self.$emit('change',newValue.join(","))
            }
        },
        convertValue(value) {
            var self = this;
            //self._log("convertValue", value)

            self.getDataSource().getRowLabels(value, function(labels){
                //self._log("convertValue", self.source, self.lang, labels)
                self.checkList = value.split(",")
                self.currentText = labels
            })            
        },
        getDataSource() {
            var self = this;
            return DataSource.getDataSource(self.source, self.lang);
        }
    },
    watch:{
        select_value(newValue) {
            var self = this
            //console.log("change", newValue)
            self.convertValue(newValue)
        }
    },
    mounted:function(){
        var self = this;
        var txt = self.select_value ||""
        self.convertValue(txt)
    }
}
</script>