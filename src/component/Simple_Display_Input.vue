<template>
  <el-input v-model="current_label" disabled></el-input> 
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'sp-display-input',
    components: {
    },
    props: {
        lang:{
            type: String,
            default: globals.getLabel('lang')
        },
        source:{
            type:String,
            required:true
        },
        value:{
            type:[String,Array],
            required:true,
            default:function() {
                return []
            }
        }
    },
    data() {
        var self = this        
        var dataSource = DataSource.getDataSource(self.source, self.lang);
        
        return {
            current_label:"",
            current_value:self.convertValue(self.value),
            dataSource:dataSource
        }
    },
    methods: {
        convertValue: item =>{
            var self = this;
            return R.ifElse(R.is(String), R.split(','), R.identity)(item)
        },
        loadList() {
            var self = this;
            //console.log(self.current_value,"..........")
            self.dataSource.getRowLabels(self.current_value, label_list=>{
                //console.log(label_list)
                self.current_label = label_list
            })     
        }
    },
    watch:{
        value(newValue) {
            var self = this;
            self.current_value = self.convertValue(newValue)
            self.loadList()
        }
    },
    mounted:function(){
        this.loadList()
    }
}
</script>