<template>
    <div>
        <el-row>
            <el-col :span="10">
                <as-button type="primary" @click="search">{{_label('chaxun')}}</as-button>
                <auth auth="sales">
                    <as-button type="primary" @click="$router.push('/sales/create')">{{_label('xinjian')}}</as-button>
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
        let self = this;
        let _label = self._label
        return {
            props: {
                columns: [
                    { name: "orderno", label: _label('xiaoshoudanhao'), width: 110 },
                    { name: "makestaff", label: _label('xiaoshouren'), type: 'select', source: "user", width:130 },
                    { name: "warehouseid", label: _label('xiaoshoucangku'), type: 'select', source: "warehouse" },
                    { name: "status", label: _label('zhuangtai'), type: "select", source: "salestatus",width:100 },
                    { name: "makedate", label: _label('xiaoshouriqi'), width:110, convert:function(row){
                        if(row.makedate && row.makedate.length>0) {
                            return row.makedate.substr(0,10)
                        }
                    }},
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
        search() {
            this.$refs['tablelist'].search();
        }
    }
}
</script>
