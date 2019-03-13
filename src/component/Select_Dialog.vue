<template>
  <div>
  <el-input :placeholder="placeholder" v-model="currentText" :readonly="true">    
    <el-button slot="append" icon="el-icon-more" @click="showPanel"></el-button>
  </el-input>
  
  <el-dialog class="user-form" :title="labels.formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
    <el-checkbox-group v-model="checkList" @change="handleChange">
      <el-checkbox :label="getOpvalue(item)" v-for="item in data" :key="getOpvalue(item)">{{getOplabel(item)}}</el-checkbox>
    </el-checkbox-group>
    
    <div slot="footer" class="dialog-footer" v-if="!auto_model">    
      <el-button type="primary" @click="handleSelect">{{labels.ok}}</el-button>
      <el-button @click="handleCancel">{{labels.cancel}}</el-button>
    </div>
  </el-dialog>
</div>
  
</template>

<script>
export default {
    name: 'select-dialog',
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
            dialogVisible:false,
            labels:{
                formTitle:$ASAL.qingxuanze,
                ok:$ASAL.ok,
                cancel:$ASAL.cancel
            }
        }
    },
    methods: {
        handleSelect() {
            var self = this;
            self.currentText = self.convertValue(self.checkList)
            self.$emit('change',self.checkList.join(","))    
            self.dialogVisible = false;  
        },
        handleCancel() {
            var self = this;
            self.currentText = self.convertValue(this.select_value)
            self.checkList = self.select_value.split(",")
            self.dialogVisible = false;  
        },
        showPanel(){
            this.dialogVisible = true;    
        },
        handleChange(newValue) {
            var self = this;
            //console.log("change", newValue)            
            
            if(self.auto_model) {
                self.currentText = self.convertValue(newValue)
                self.$emit('change',newValue.join(","))
            }
        },
        getOplabel(row) {
            var oplabel = this.data_source.oplabel || "name";
            
            //console.log("getOplabel",oplabel, this.data_source.oplabel ,row, this.lang)
            return row[oplabel] || row[oplabel+"_"+this.lang]
        },
        getOpvalue(row) {
            var opvalue = this.data_source.opvalue || "value";
            return row[opvalue]  
        },
        loadList() {
            var self = this;
            var data_source = self.data_source;
            var params = data_source.params || {}
            params.lang = self.lang
            self.$asa.get(data_source.url+"?lang="+self.lang, function(res){
                self.data = res;
                data_source.datalist = res;
                data_source.data = res;
            },'json');
        },
        convertValue(value) {
            var self = this;
            if(typeof(value)=='string') {
                value = value.split(',')    
            }
            
            return value.map(function(key){
                console.log("convertValue", key,self.getValueByKey(key,self.lang))
                return self.getValueByKey(key,self.lang)
            }).join(",")
        },
        getValueByKey(keyValue,lang) {
            var self = this;
            var data = self.data;
            console.log("getValueByKey", data)
            var opvalue = self.data_source.opvalue || "value";
            var oplabel = self.data_source.oplabel || "name";
            
            console.log("getValueByKey", opvalue, oplabel)
            var row;
            for(var i=0;i<data.length;i++) {
                row = data[i]
                console.log(keyValue,row[opvalue])
                if(keyValue==row[opvalue]) {
                    return row[oplabel] || row[oplabel+"_"+lang]
                }
            }
            
            return "";
        }
    },
    watch:{
        select_value(newValue) {
            this.currentText = this.convertValue(newValue)
            if(newValue.trim()!="") {
                this.checkList = newValue.split(",");
            }
        }
    },
    computed:{
    },
    mounted:function(){
        var self = this;
        var data = self.data;
        var data_source = self.data_source;
                
        console.log(data_source.hashtable, data_source.datalist, data_source.url)
        if(data_source.url) {
            self.loadList()
        }
        else if(data_source.hashlist) {
            console.log(data_source.hashlist)
            Object.keys(data_source.hashlist).forEach(function(key){
                data.push(data_source.hashlist[key])
            });
        }
        else if(data_source.hashtable) {
            Object.keys(data_source.hashtable).forEach(function(key){
                data.push({name:data_source.hashtable[key],value:key})
            });
        }
        else if(data_source.datalist) {
            var list = data_source.datalist;
            for(var i=0;i<list.length;i++) {
                data.push(list[i])    
            }
        }
        data_source.data = data;
        
        self.currentText = self.convertValue(self.select_value)
        if(self.select_value.trim()!="") {
            self.checkList = self.select_value.split(",");
        }
        
        console.log(data)
    }
}
</script>

<style>
</style>
