<template>
  <el-select v-model="currentValue" :placeholder="qingxuanze" style="width:150" @change="handleChange" filterable :disabled="disabled">
    <el-option v-for="(item,key) in data" :key="item.getKeyValue()" :label="item.getLabelValue()" :value="item.getKeyValue()"></el-option> 
  </el-select>
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

const _log = globals.logger("simple-select");
export default {
    name: 'simple-select',
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
        source:{
            type:[String,Object],
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
        var value = self.select_value
        if(value=='0') {
            value = ''   
        }
        _log(self.source, dataSource)
        return {
            currentValue:value,
            data:[],
            dataSource:dataSource,
            qingxuanze:globals.getLabel('qingxuanze')
        }
    },
    methods: {
        handleChange(newValue) {
            _log("change", newValue)
            this.$emit('change',newValue)
        }
    },
    watch:{
        select_value(newValue) {
            if(newValue=='0') {
                newValue = ''   
            }
            this.currentValue = newValue
        },
        lang(newValue) {
            this.dataSource.setLang(newValue)   
        }
    },
    mounted:function(){
        var self = this;
        self.dataSource.getData(function(data){
            self.data = data      
        })
    }
}
</script>
