<template>
    <div class="sizecontent">
    <el-table :data="tabledata" style="width:100%;" :cell-class-name="getCellClass" :border="false">
        <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="60">
            <template v-slot="scope">
                <el-input v-model="form[column.id]" style="width:50px" size="mini" @change="onChange"></el-input>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import { _label } from '../globals.js'
import { toArray,extend } from '../object.js'

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
        row:{
            type:[Object],
            require:true
        }
    },
    data() {
        let self = this

        let form = {}
        self.columns.forEach(column=>{
            form[column.id] = ''
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
            self.$emit("change", {row:self.row, form:extend({},self.form)})
        }
    },
    mounted:function(){
        //this._log(this.row,"====")
        extend(this.form, this.row.form)
    }
}
</script>
