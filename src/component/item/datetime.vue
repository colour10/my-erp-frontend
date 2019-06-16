<template>
    <el-date-picker v-model="current" type="datetime" :picker-options="pickerOptions" value-format="timestamp"></el-date-picker>
</template>

<script>
export default {
    name: 'sp-datetime',
    props: {
        value: {
            default: ''
        }
    },
    data() {
        return {
            current:this.value *1000,
            pickerOptions:{
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', dateFns.startOfToday());
                    }
                }, {
                    text: '明天',
                    onClick(picker) {
                        picker.$emit('pick', dateFns.startOfTomorrow());
                    }
                }, {
                    text: '后天',
                    onClick(picker) {
                        var date = dateFns.startOfTomorrow()
                        picker.$emit('pick', dateFns.addDays(date,1));
                    }
                }]
            }
        }
    },
    watch:{
        current(newvalue) {
            this.$emit("input", Math.floor(newvalue/1000))
        }
    }
}
</script>
