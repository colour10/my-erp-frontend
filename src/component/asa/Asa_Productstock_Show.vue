<template>
    <div class="sizecontent">
        <el-row>
            <el-col align="center" v-for="(column,colindex) in columns" :key="column.id" style="width:51px" :span="1">{{column.name}}</el-col>
        </el-row>
        <el-row>
            <el-input :value="form[column.id]" v-for="(column,colindex) in columns" :key="column.id" style="width:51px" size="mini" disabled></el-input>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'sp-productstock-show',
    props: {
        columns: {
            type: Array
        },
        stocks:{
            type:[Array],
            require:true
        },
    },
    data() {
        let self = this;

        let form = {}
        self.stocks.forEach(item=>{
            form[item.sizecontentid] = item.number;
        });

        return {
            form,
            tabledata:[[]]
        }
    },
    methods: {
        rowClassName({row, rowIndex}){
            return ""
        },
        cellClassName({row, column, rowIndex, columnIndex}) {
            return "counter";
        }
    },
};
</script>
