<template>
    <el-checkbox-group v-model="checkList" @change="handleChange" :disabled='disabled'>
        <el-checkbox :label="item.getKeyValue()" v-for="(item,key) in data" :key="item.getKeyValue()">{{item.getLabelValue()}}</el-checkbox>
    </el-checkbox-group>
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'sp-checkboxgroup',
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
            componenToptions:{}        
        }
    },
    methods: {
        handleChange(newValue) {
            var self = this;
            self._log(newValue)
            self.convertValue(newValue.join(','))
            self.$emit('change',newValue.join(","))
        },
        convertValue(value) {
            var self = this;
            value = !value ? "":value

            self.getDataSource().getRowLabels(value, function(labels){
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
            self.convertValue(newValue)
        }
    },
    mounted:function(){
        var self = this;
        var txt = self.select_value ||""
        self.convertValue(txt)
        self.getDataSource().getData(function(data){
            self.data = data
        })
    }
}
</script>
