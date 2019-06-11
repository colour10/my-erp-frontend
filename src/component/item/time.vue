<template>
    <el-time-select v-model="current" :picker-options="{start: '00:00', step: '00:30', end: '23:30'}"></el-time-select>
</template>

<script>
export default {
    name: 'sp-time',
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            current:this.value
        }
    },
    watch:{
        current(newvalue) {
            this.$emit("input", newvalue)
        }
    }
}
</script>
