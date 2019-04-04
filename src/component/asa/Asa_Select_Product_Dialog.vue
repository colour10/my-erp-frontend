<template>
  <el-dialog :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false" >
    <searchpanel @select="onSelect"></searchpanel>
  </el-dialog>
</template>

<script>
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'
import Asa_Product_Search_Panel from './Asa_Product_Search_Panel.vue'

export default {
    name: 'asa-select-product-dialog',
    components:{
        'simple-select':simple_select,
        searchpanel:Asa_Product_Search_Panel
    },
    props: {
        visible:{
            type: Boolean
        },
    },
    data() {
        var self = this;        
        
        return {
            dialogVisible:self.visible
        }
    },
    methods:{
        onSelect(row) {
            var self = this
            self.dialogVisible = false;
            self.$emit("select", row)
        }
    },
    mounted:function(){        
    },
    watch:{
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //console.log("visible", newValue)
            this.dialogVisible = newValue
        }
    }
}
</script>
