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
            required:true,
            default:function() {
                return []
            }
        }
    },
    data() {
        var self = this        
        var dataSource = DataSource.getDataSource(self.source, self.lang);
        
        let value = self.value || []
        return {
            current_label:"",
            current_value:self.convertValue(value),
            dataSource:dataSource
        }
    },
    methods: {
        convertValue(item) {
            var self = this;
            //self._log("item value", item)
            return typeof(item)=='string' ? item.split(',') : item
        },
        loadList() {
            var self = this;
            //self._log(self.current_value, self.source, "..........")
            self.dataSource.getRowLabels(self.current_value, label_list=>{
                //self._log(label_list)
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