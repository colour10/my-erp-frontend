<template>
  <el-select v-model="currentValue" :placeholder="qingxuanze" style="width:150" @change="handleChange" :disabled="disabled">
    <el-option v-for="item in data" :key="item[opvalue]" :label="item[oplabel]" :value="item[opvalue]"></el-option>
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
        datalist:{
            type: [Array,Object]
        },
        hashtable:{
            type: [Array,Object]
        },
        hashlist:{
            type: [Array,Object]
        },
        url:{
            type: String
        },
        params:{
            type: Object
        },
        oplabel:{
            type: String,
            default:'name'
        },
        opvalue:{
            type: String,
            default:'value'
        },
        disabled:{
            type: Boolean,
            default:false
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
            qingxuanze:$ASAL.qingxuanze
        }
    },
    methods: {
        handleChange(newValue) {
            console.log("change", newValue)
            this.$emit('change',newValue)
        },
        loadList() {
            var self = this;
            var params = self.params || {}
            $ASA.post(self.url, params, function(res){
                self.data = res;
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
        console.log(this.hashtable, this.datalist, this.url)
        if(this.url) {
            this.loadList()
        }
        else if(this.hashlist) {
            console.log(this.datalist)
            Object.keys(self.datalist).forEach(function(key){
                data.push(self.datalist[key])
            });
        }
        else if(this.hashtable) {
            Object.keys(self.hashtable).forEach(function(key){
                data.push({name:self.hashtable[key],value:key})
            });
        }
        else if(this.datalist) {
            var list = this.datalist;
            for(var i=0;i<list.length;i++) {
                data.push(list[i])    
            }
        }
        console.log(data)
    }
}
</script>

<style>
</style>
