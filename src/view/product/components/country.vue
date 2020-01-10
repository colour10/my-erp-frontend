<template>
    <div>
        <el-input v-model="selectedString" readonly>
            <el-button slot="append" icon="el-icon-more" @click.stop="handleShowDialog"></el-button>
        </el-input>
        <el-dialog
            width="250px"
            class="asa-select-dialog"
            :title="showLabel('chandi')"
            :visible.sync="visible"
            :center="true"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            append-to-body>

            <el-input v-model="keyword" :placeholder="showLabel('search')" />

            <el-table
                ref="multipleTable"
                :data="filterDataList"
                tooltip-effect="dark"
                style="width: 100%"
                max-height="500"
                @selection-change="handleSelectionChange"
                @row-click="handleRowClick">
                <el-table-column type="selection" width="50">
                </el-table-column>
                <el-table-column :label="showLabel('guojia')" width="150">
                    <template slot-scope="scope">{{ scope.row.title }}</template>
                </el-table-column>
            </el-table>

            <div slot="footer" class="dialog-footer">
                <el-button @click="handleCancel">{{ showLabel('quxiao') }}</el-button>
                <el-button type="primary" @click="handleSubmit">{{ showLabel('queding') }}</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false,
            selectedString: '',
            selectedStringTmp: '',
            selectedIds: [],
            keyword: ''
        }
    },
    props: {
        selected: {
            type: Array
        },
        dataList: {
            type: Array
        }
    },
    model: {
        prop: 'selected',
        event: 'change'
    },
    computed: {
        filterDataList() {
            let self = this
            if (self.keyword.length > 0) {
                return self.dataList.filter(function (row) {
                    return (row.title.indexOf(self.keyword) >= 0)
                })
            }
            return self.dataList 
        }
    },
    methods: {
        handleRowClick(row) {
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        handleSelectionChange(selectedRows) {
            let self = this
            self.selectedIds = []
            self.selectedStringTmp = ''
            if (selectedRows.length) {
                let selectedStringArray = []
                selectedRows.forEach(row => {
                    selectedStringArray.push(row.title)
                    self.selectedIds.push(row.id)
                })

                self.selectedStringTmp = selectedStringArray.join(',')
            }
        },
        handleSubmit() {
            this.selectedString = this.selectedStringTmp
            this.$emit('change', this.selectedIds)
            this.handleHideDialog()
        },
        handleCancel() {
            this.handleHideDialog()
        },
        handleHideDialog() {
            this.visible = false
        },
        handleShowDialog() {
            let self = this
            self.visible = true

            setTimeout(()=>{
                if (self.selectedIds.length) {
                    self.selectedIds.forEach(selectedId => {
                        self.dataList.forEach(row => {
                            if (selectedId == row.id) {
                                self.$refs.multipleTable.toggleRowSelection(row, true)
                            }
                        })
                    })
                }
            },50)
        }
    },
    watch: {
        selected(newValue) {
            let self = this
            self.selectedIds = []
            if (newValue.length) {
                let selectedStringArray = []
                newValue.forEach(item => {
                    self.dataList.forEach(row => {
                        if (item == row.id) {
                            self.selectedIds.push(row.id)
                            selectedStringArray.push(row.title)
                            row.selected = true
                        }
                    })
                })
                self.selectedString = selectedStringArray.join(',')

            }
        }
    }
}
</script>
