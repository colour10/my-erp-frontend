<template>
    <el-dialog :title="title" :visible.sync="visible" :center="true" :width="width" :modal="false">
        <slot name="default"></slot>
    </el-dialog>
</template>

<script>
export default {
    name: 'sp-dialog',
    data() {
        return {
            visible:false,
            title:"",
            width:"500px"
        };
    },
    methods: {
        show(option={}) {
            let self = this;
            if(option.title) {
                self.title = option.title
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