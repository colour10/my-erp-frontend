<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth auth="sales">
                <as-button type="primary" @click="toPage(0)">{{_label('xinjian')}}</as-button>
            </auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'sp-sales',
    data() {
        var self = this;
        let _label = self._label
        return {
            props: {
                columns: [
                    { name: "orderno", label: _label('xiaoshoudanhao'), width: 300 },
                    { name: "salesstaff", label: _label('xiaoshouren'), type: 'select', source: "user" },
                    { name: "warehouseid", label: _label('xiaoshoucangku'), type: 'select', source: "warehouse" },
                    { name: "status", label: _label('zhuangtai'), type: "select", source: "salestatus" }
                ],
                controller: "sales"
            }
        }
    },
    methods: {
        showFormToEdit(rowIndex, row) {
            this.toPage(row.id)
        },
        toPage(id) {
            this.$router.push('/sales/' + id)
        },
        toEdit(rowIndex, row) {
            this.toPage(row.id)
        },
    }
}
</script>
