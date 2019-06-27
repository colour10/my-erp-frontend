<template>
    <div class="sizecontent">
    <el-table :data="tabledata" style="width:100%;" :cell-class-name="getCellClass" :border="false">
        <el-table-column :label="column.name" align="center" v-for="(column, index) in columns" :key="column.id" width="50">
            <template v-slot="{$index}">
                <el-input v-model="form[column.id]" :ref="index" style="width:50px" size="mini" @keyup.native="onChange($event, index)" @focus="onFocus(index)" :disabled="disabled"></el-input>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import { _label } from '../globals.js'
import { toArray,extend } from '../object.js'
import chain from '../chain.js'

export default {
    name: 'sp-sizecontent-input',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array
        },
        uniq:{
            require:true
        },
        init:{}
    },
    data() {
        let self = this

        let form = {}
        self.columns.forEach(column=>{
            form[column.id] = ""
        })

        return {
            form:form,
            tabledata:[[]]
        }
    },
    methods: {
        getCellClass() {
            return "counter"
        },
        onChange(event, index) {
            let self = this
            let output = []
            //console.log(event, index)
            if(event.key==='ArrowRight') {
                self.focus(index+1)
            }
            else if(event.key==='ArrowLeft') {
                self.focus(index-1)
            }
            else if(event.key==='ArrowUp') {
                self.$emit("up", index)
            }
            else if(event.key==='ArrowDown') {
                self.$emit("down", index)
            }
            else {
                chain(self.form).forEach((number,sizecontentid)=>{
                    output.push({
                        uniq:self.uniq,
                        sizecontentid,
                        number
                    })
                })
                self.$emit("change", output)
            }
        },
        focus(index=0) {
            let target = this.$refs[index];
            if(target && target[0]) {
                //console.log(target)
                target[0].focus();
                //target[0].select();
            }
        },
        startFocus(colIndex){
            let self = this;
            //console.log(colIndex)
            colIndex = colIndex<self.columns.length ? colIndex : self.columns.length-1;
            self.focus(colIndex);
        },
        onFocus(index) {
            let target = this.$refs[index];
            if(target && target[0]) {
                target[0].select();
            }
        }
    },
    mounted:function(){
        //this._log(this.row,"====")
        extend(this.form, this.init)
    }
}
</script>
