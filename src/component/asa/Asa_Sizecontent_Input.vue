<template>
    <div class="sizecontent">
    <el-table :data="tabledata" style="width:100%;" :cell-class-name="getCellClass" :border="false">
        <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="50">
            <template v-slot="scope">
                <el-input v-model="form[column.id]" style="width:50px" size="mini" @keyup.native="onChange" :disabled="disabled"></el-input>
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
        onChange() {
            let self = this
            let output = []

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
    mounted:function(){
        //this._log(this.row,"====")
        extend(this.form, this.init)
    }
}
</script>
