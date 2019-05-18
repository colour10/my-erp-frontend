<template>
    <div class="sizecontent">
    <el-table :data="orders" style="width:100%;" :cell-class-name="getCellClass" :border="false">
        <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="60">
            <template v-slot="scope">
                <el-input v-model="scope.row.form[column.id]" style="width:50px" size="mini" :disabled="disabled"></el-input>
                <el-input v-model="form[scope.row.order.id][column.id]" style="width:50px" size="mini" @change="onChange"></el-input>
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
    name: 'sp-sizecontent-confirm',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array
        },
        orders:{
            type:[Array],
            require:true
        }
    },
    data() {
        let self = this

        let form = {}
        self.orders.forEach(order=>{
            let row = {}
            self.columns.forEach(column=>{
                row[column.id] = ''
            })
            row.orderid = order.id
            form[order.id] = row
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
            let output = chain(self.form).toArray().filter(item=>item.value>0).toObject(item=>[item.key, item.value]).object()
            self.$emit("change", {row:self.row, form:output})
        }
    },
    mounted:function(){
        //this._log(this.row,"====")
        //extend(this.form, this.row.form)
    }
}
</script>
