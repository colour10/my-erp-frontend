<template>
    <el-dialog :title="dialogTitle" :visible.sync="visible" :center="true" :width="dialogWidth+'px'" :modal="false">
        <slot name="default"></slot>
    </el-dialog>
</template>

<script>
export default {
    name: 'sp-dialog',
    props:{
        title:{
            default:""
        },
        width:{}
    },
    data() {
        return {
            visible:false,
            dialogTitle:this.title,
            dialogWidth:this.width || 500
        };
    },
    methods: {
        show(option={}) {
            let self = this;
            if(option.title) {
                self.dialogTitle = option.title
            }

            if(option.width) {
                self.dialogWidth = option.width
            } 

            self.visible = true
        },
        hide() {
            let self = this
            self.visible = false
        }
    }
}
</script>