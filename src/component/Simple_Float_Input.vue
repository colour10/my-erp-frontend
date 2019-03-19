<template>
  <el-input v-model="current_value"><template slot="prepend"><slot></slot></template></el-input> 
</template>

<script>
export default {
    name: 'sp-float-input',
    props: {
        select_value:{
            default:""
        }
    },    
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        return {
            current_value:""
        }
    },
    methods: {
        convertValue: item =>{
            let value = Math.round(item*100)/100;
            return value==0 ? "" : value;
        },
        onBlur() {
            this.$emit("change", this.current_value)
        }
    },
    watch:{
        select_value(newValue) {
            var self = this;
            if(newValue!=self.current_value) {
                self.current_value = self.convertValue(newValue)
            }
        },
        current_value(newValue) {
            this.$emit("change", newValue)
        }
    },
    mounted:function(){
        var self = this;
        self.current_value = self.convertValue(self.select_value)
    }
}
</script>