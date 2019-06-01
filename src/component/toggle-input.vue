<template>
    <div>
        <span @click="onClick" v-if="isEdit==false" style="width:100%;height:100%;display:block;">{{current}}</span>
        <el-input v-model="current" ref="input" v-if="isEdit==true" @blur="onBlur" size="mini" @keyup.native.enter="submit"></el-input>
    </div>    
</template>

<script>
export default {
    name: "tg-input",
    props: ['value'],
    model: {
        prop: 'value',
        event: 'changevalue'
    },
    data() {
        return {
            current:"",
            currentcopy:"",
            isEdit:false
        }
    },
    methods: {
        submit() {
            let self = this
            
            self._log("submit")
            if(self.current!=self.currentcopy) {
                self.currentcopy = self.current
                self.$emit("changevalue", self.current)
                self.$emit("change", {value:self.current, target:self})
            }
            self.isEdit = false;
        },
        onClick(){
            let self = this
            self.currentcopy = self.current
            self.isEdit = true
            setTimeout(()=>{
                self.$refs.input.focus()
            },50)
            
            self._log(self)
        },
        onBlur() {
            let self = this
            self.isEdit = false
            self._log("blur")
            self.current = self.currentcopy
        }
    },
    mounted:function(){
        this.current = this.value
    }
}
</script>
