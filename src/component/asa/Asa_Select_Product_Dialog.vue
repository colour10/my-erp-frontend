<template>
  <el-dialog :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false" >
    <searchpanel @select="onSelect"></searchpanel>
  </el-dialog>
</template>

<script>
import Asa_Product_Search_Panel from './Asa_Product_Search_Panel.vue'

export default {
    name: 'asa-select-product-dialog',
    components:{
        searchpanel:Asa_Product_Search_Panel
    },
    props: {
        visible:{
            type: Boolean
        },
    },
    data() {        
        return {
            dialogVisible:this.visible
        }
    },
    methods:{
        onSelect(row) {
            var self = this
            self.dialogVisible = false;
            self.$emit("select", row)
        }
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
