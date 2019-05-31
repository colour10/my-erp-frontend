<template>
    <span :style="getstyle()">{{gettext()}}</span>
</template>

<script>
export default {
    name: "sp-pricesetting-cell",
    props: ['info'],
    data() {
        return {}
    },
    methods: {
        getstyle() {
            let color = "#303133"
            let filter = this.info.filter;
            
            if(filter=='1') {
                color = "#67C23A"
            }
            else if(filter=='2') {
                color = "#F56C6C"
            }

            return {
                color
            }
        },
        gettext(){
            return this.info.text
        }
    }
}
</script>
