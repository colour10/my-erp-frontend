<template>
  <el-select v-model="currentValue" placeholder="" style="width:150" @change="handleChange" filterable :filter-method="filterCurrency" :disabled="disabled">
    <el-option v-for="item in data" :key="item.code" :value="item.code" :label="item.label">
      <span style="float: left">{{ item.code }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
    </el-option>
  </el-select>
</template>

<script>
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
        return {
            currentValue:self.select_value,
            data:[],
            dataCopy:[],
            is_load:false,
            qingxuanze:$ASAL.qingxuanze
        }
    },
    methods: {
        filterCurrency(val) {
            var self = this;
            if (val) { //val存在
                self.data = self.dataCopy.filter((item) => {
                    if (!!~item.code.indexOf(val) || !!~item.code.toUpperCase().indexOf(val.toUpperCase())) {
                        return true
                    }
                })
            } 
            else { //val为空时，还原数组
                self.data = data.dataCopy;
            }
        },
        handleChange(newValue) {
            console.log("change", newValue)
            this.$emit('change',newValue)
        },
        loadList() {
            var self = this;
            if(self.is_load) {
                return ;   
            }
            
            $ASA.post("/common/currency", {}, function(res){
               
                Object.keys(res.currency).forEach(function(key){
                    self.dataCopy.push({code:key, label:res.currency[key]})
                    self.data.push({code:key, label:res.currency[key]})
                });
            
                self.is_load = true;
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
        this.loadList()
    }
}
</script>

<style>
</style>
