<template>
  <div>
  <el-input :placeholder="placeholder" v-model="currentText" :readonly="true">    
    <el-button slot="append" icon="el-icon-more" @click="showPanel"></el-button>
  </el-input>
  
  <el-dialog class="user-form" :title="labels.formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
    <el-checkbox-group v-model="checkList" @change="handleChange">
      <el-checkbox :label="item.getKeyValue()" v-for="(item,key) in data" :key="item.getKeyValue()">{{item.getLabelValue()}}</el-checkbox>
    </el-checkbox-group>
    
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
        var dataSource = DataSource.getDataSource(self.source, self.lang);
        
        return {
            currentText:"",
            checkList:[],
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
            //self.convertValue(self.checkList)
            self.$emit('change',self.checkList.join(","))    
            self.dialogVisible = false;  
        },
        handleCancel() {
            var self = this;
            self.convertValue(self.select_value)
            self.checkList = self.select_value.split(",")
            self.dialogVisible = false;  
        },
        showPanel(){
            this.dialogVisible = true;    
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
            //console.log("convertValue", self.source)
            
            if(typeof(value)=='string') {
                value = value.split(',')    
            }
            
            var arr = value.map(function(key){
                return new Promise(function(resolve, reject){
                    self.dataSource.getRowLabel(key,function(label){
                        resolve([key,label])
                    });
                })
            });
            
            Promise.all(arr).then(data => {
                //console.log(data.join(","), "===")
                
                //过滤掉找不到label的数据
                var arr = R.filter(function(item){
                    return item[1]!=""    
                })(data)
                //console.log(arr)
                
                
                self.checkList = R.map(R.head)(arr);
                self.currentText = R.map(R.nth(1))(arr).join(",")
            }) 
        }
    },
    watch:{
        select_value(newValue) {
            var self = this
            //console.log("change", newValue)
            self.convertValue(newValue)
            if(newValue.trim()!="") {
                self.checkList = newValue.split(",");
            }
            else {
                self.checkList = []
            }
        },
        lang(newValue) {
            this.dataSource.setLang(newValue)   
        }
    },
    mounted:function(){
        var self = this;
        var txt = self.select_value ||""
        self.convertValue(txt)
        if(txt.trim()!="") {
            self.checkList = self.select_value.split(",");
            
//            self.checkList = self.checkList.filter(function(key){
//                console.log(self.dataSource.getRowLabel(key))
//                return self.dataSource.getRowLabel(key)!="";
//            })
//            console.log(self.checkList)
        }
        
        self.dataSource.getData(function(data){
            self.data = data      
        })        
    }
}
</script>