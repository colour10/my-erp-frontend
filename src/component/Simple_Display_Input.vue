<template>
  <el-input v-model="current_label" :placeholder="placeholder" disabled></el-input> 
</template>

<script>
import DataSource from './DataSource.js'
import globals,{_label} from './globals.js'

export default {
    name: 'sp-display-input',
    components: {
    },
    props: {
        placeholder:{},
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
        let self = this        
        
        let value = self.value || []
        return {
            current_label:"",
            current_value:self.convertValue(value),
        }
    },
    methods: {
        convertValue(item) {
            let self = this;
            //self._log("item value", item)
            return typeof(item)=='string' ? item.split(',') : item
        },
        loadList() {
            let self = this;
            //self._log(self.current_value, self.source, "..........")
            if(self.current_value.length==0) {
                return 
            }
            DataSource.getDataSource(self.source, _label('lang')).getRowLabels(self.current_value, function(label_list){
                //self._log("label_list",label_list, )
                self.current_label = label_list
            })     
        }
    },
    watch:{
        value(newValue) {
            let self = this;
            self.current_value = self.convertValue(newValue)
            self.loadList()
        }
    },
    mounted:function(){
        this.loadList()
    }
}
</script>