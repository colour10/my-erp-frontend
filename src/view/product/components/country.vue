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
    name: 'country',
    data() {
        return {
            visible: false,
            selectedDatas:[],
            selectedString: '',
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
            this.selectedDatas = selectedRows
        },
        handleSubmit() {
            this.convertSelectedDatas2Sting()
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
                if (self.selectedDatas.length) {
                    self.selectedDatas.forEach(data => {
                        self.$refs.multipleTable.toggleRowSelection(data, true)
                    })
                }
            },50)
        },
        convertSelectedDatas2Sting() {
            let self = this

            self.selectedIds = []
            let selectedStringArray = []

            self.selectedDatas.forEach(data => {
                selectedStringArray.push(data.title)
                self.selectedIds.push(data.id)
            })
                           
            self.selectedString = selectedStringArray.join(',')
        }
    },
    watch: {
        selected(newValue) {
            let self = this
            self.selectedDatas = []
            if (newValue.length) {
                newValue.forEach(item => {
                    self.dataList.forEach(row => {
                        if (item == row.id) {
                            self.selectedDatas.push(row)
                            self.convertSelectedDatas2Sting()
                        }
                    })
                })
            } else {
                self.selectedString = ''
            }
        }
    }
}
</script>
