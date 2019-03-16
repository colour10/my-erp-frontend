<template>
  <el-select v-model="currentValue" placeholder="" style="width:150" @change="handleChange" filterable :filter-method="filterCurrency" :disabled="disabled">
    <el-option v-for="item in current_list" :key="item.getKeyValue()" :value="item.getKeyValue()" :label="item.getLabelValue()">
      <span style="float: left">{{ item.getRow().code }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.getRow().name }}</span>
    </el-option>
    
  </el-select>
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'select-currency',
    props: {
        select_value:{
            type: [String,Number],
            required: true,
            default:''
        },
        lang:{
            type: String
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        var self = this
        var dataSource = DataSource.getDataSource("currency", self.lang);
        return {
            currentValue:self.select_value,
            data:[],
            dataCopy:[],
            currentInput:"",
            dataSource:dataSource,
            qingxuanze:globals.getLabel("qingxuanze")
        }
    },
    methods: {
        filterCurrency(val) {
            this.currentInput = val
        },
        handleChange(newValue) {
            console.log("change", newValue)
            this.$emit('change',newValue)
        }
    },
    watch:{
        select_value(newValue) {
            this.currentValue = newValue
        }
    },
    computed:{
        current_list() {
            var self = this
            var val = self.currentInput;
            if (val) { //val存在
                return self.dataCopy.filter((item) => {
                    var row = item.getRow().code
                    if (!!~row.indexOf(val) || !!~row.toUpperCase().indexOf(val.toUpperCase())) {
                        return true
                    }
                })
            } 
            else { //val为空时，还原数组
                console.log("self.dataCopy", self.dataCopy)
                return self.dataCopy;
            }
        }
    },
    mounted:function(){
        var self = this
        self.dataSource.getData(function(data){
            self.dataCopy = data      
        }) 
    }
}
</script>

<style>
</style>
