<template>
  <el-select v-model="currentValue" :placeholder="qingxuanze" style="width:150" @change="handleChange" filterable :disabled="disabled">
    <el-option v-for="item in data" :key="item[data_source.opvalue]" :label="getOplabel(item)" :value="getOpvalue(item)"></el-option>
  </el-select>
</template>

<script>
export default {
    name: 'simple-select',
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
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        var self = this
        return {
            currentValue:self.select_value,
            data:[],
            is_load:false,
            qingxuanze:$ASAL.qingxuanze
        }
    },
    methods: {
        handleChange(newValue) {
            console.log("change", newValue)
            this.$emit('change',newValue)
        },
        getOplabel(row) {
            var oplabel = this.data_source.oplabel || "name";
            return row[oplabel] || row[oplabel+"_"+this.lang]
        },
        getOpvalue(row) {
            var opvalue = this.data_source.opvalue || "value";
            return row[opvalue]  
        },
        loadList() {
            var self = this;
            if(self.is_load) {
                return ;   
            }
            
            var data_source = self.data_source;
            var params = data_source.params || {}
            params.lang = self.lang
            console.log(params)
            $ASA.post(data_source.url, params, function(res){
                self.data = res;
                self.is_load = true;
                data_source.datalist = res;
                data_source.data = res;
            },'json');
        }
    },
    watch:{
        select_value(newValue) {
            this.currentValue = newValue
        }
    },
    computed:{
    },
    mounted:function(){
        var self = this;
        var data = self.data;
        var data_source = self.data_source;
        
        data_source.getValueByKey = function(keyValue, lang) {
            var self = this;
            var data = self.data;
            var opvalue = self.opvalue || "value";
            var oplabel = self.oplabel || "name";
            var row;
            for(var i=0;i<data.length;i++) {
                row = data[i]
                if(keyValue==row[opvalue]) {
                    return row[oplabel] || row[oplabel+"_"+lang]     
                }
            }
            
            return "";
        }
        
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
        
        
        console.log(data)
    }
}
</script>

<style>
</style>
