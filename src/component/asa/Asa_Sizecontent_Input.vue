<template>
    <div class="sizecontent">
    <el-table :data="tabledata" style="width:100%;" :cell-class-name="getCellClass" :border="false">
        <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="60">
            <template v-slot="scope">
                <el-input v-model="form[column.id]" style="width:50px" size="mini"></el-input>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import { _label } from '../globals.js'

export default {
    name: 'sp-sizecontent-input',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array
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
        }
    }
}
</script>
