<template>
    <el-dialog :title="dialogTitle" :visible.sync="visible" :center="true" :width="width" :modal="false">
        <slot name="default"></slot>
    </el-dialog>
</template>

<script>
export default {
    name: 'sp-dialog',
    props:{
        title:{
            default:""
        }
    },
    data() {
        return {
            visible:false,
            dialogTitle:this.title,
            width:"500px"
        };
    },
    methods: {
        show(option={}) {
            let self = this;
            if(option.title) {
                self.dialogTitle = option.title
            }

            if(option.width) {
                self.width = option.width
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