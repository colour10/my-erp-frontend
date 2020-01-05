<template>
    <div>
        <el-table v-loading="listLoading" :data="list" border stripe>
            <el-table-column :label="showLabel('caozuo')" align="center" width="230" class-name="small-padding fixed-width">
                <template slot-scope="{row}">
                    <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
                </template>
            </el-table-column>
            <el-table-column label="LOGO"></el-table-column>
            <el-table-column :label="showLabel('pinpaimingcheng')"></el-table-column>
            <el-table-column :label="showLabel('guishuguojia')"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import globals, { showLabel } from '../../component/globals.js'

export default {
    name: 'brand',
    data() {
        return {
            listLoading: false,
            list: [],
            pagination: {
                pageSizes: globals.pageSizes,
                pageSize: 10,
                total: 0,
                current: 1
            },
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            let self = this
            self.listLoading = true

            let params = Object.assign({
                page: self.pagination.current,
                pageSize: self.pagination.pageSize
            }, self.listQuery)
            self._fetch("/brand/page", params).then(function(res) {
                self.list = res.data
                self.pagination = res.pagination
                self.listLoading = false
            })
        }
    }
}
</script>