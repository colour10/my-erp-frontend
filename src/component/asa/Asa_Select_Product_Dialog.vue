<template>
  <el-dialog :visible.sync="dialogVisible" :center="true" :fullscreen="false" :modal="false" width="1200px">
    <searchpanel @select="onSelect" @close="onClose"></searchpanel>
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
            let self = this
            self.dialogVisible = false;
            self.$emit("select", row)
        },
        onClose(){
            this.dialogVisible = false;
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
