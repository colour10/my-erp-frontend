<template>
    <el-table ref="table" :data="tabledata" stripe border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
        <el-table-column type="selection" :width="30"></el-table-column>
        <slot></slot>
    </el-table>
</template>

<script>
export default {
    name: 'sp-select-table',
    props: {
        data:{},
        source:{},
        isClick:{
            default:false
        }
    },
    data() {
        return {
            tabledata:[],
            selected: []
        };
    },
    methods: {
        onSelectionChange(vals) {
            let self = this
            this.selected = vals
            this.$emit("selection-change", vals)
        },
        onRowClick(row) {
            if(this.isClick===true) {
                this.$refs.table.toggleRowSelection(row)
            }            
        },
        load() {
            let self = this
            self._log(self.data, self.source)
            if(self.data) {
                self.tabledata = []
                self.data.forEach(item=>{
                    self.tabledata.push(item)
                })
            }
            else if(self.source) {
                self._dataSource(self.source).getList().then(result=>{
                    self.tabledata = []
                    result.forEach(item=>{
                        self.tabledata.push(item)
                    })
                })
            }
        }
    },
    mounted() {
        this.load()
    }
}
</script>
