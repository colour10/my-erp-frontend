<template>
  <el-input v-model="current_label" :placeholder="placeholder" disabled></el-input> 
</template>

<script>
import DataSource from './DataSource.js'
import {isArray} from './array.js'

export default {
    name: 'sp-display-input',
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

        return {
            current_label:"",
            current_value:self.convertValue(self.value)
        };
    },
    methods: {
        convertValue(item) {
            let self = this;
            if(typeof(self.value)=="string") {
                return self.value.split(",")
            }
            else if(isArray(self.value)) {
                return self.value
            }

            return []
        },
        loadList() {
            let self = this;
            //self._log(self.current_value, self.source, "..........")
            if(self.current_value.length==0) {
                return 
            }
            DataSource.getDataSource(self.source, self._label('lang')).getRowLabels(self.current_value, function(label_list){
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