<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth auth="sales">
                <as-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</as-button>
            </auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="isEditable"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <asa-sales-dialog :visible.sync="visibleDialog" :data="info" @change="onChange"></asa-sales-dialog>
    </div>
</template>

<script>
import globals,{_label} from '../globals.js'
import Asa_Sales_Dialog from '../asa/Asa_Sales_Dialog.vue'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

export default {
    name: 'sp-sales',
    components: {
        'asa-sales-dialog': Asa_Sales_Dialog,
        'simple-admin-tablelist': Simple_Admin_TableList
    },
    props: {},
    data() {
        var self = this;

        return {
            props: {
                columns: [
                    { name: "orderno", label: _label('xiaoshoudanhao'), width: 300 },
                    { name: "salesstaff", label: _label('xiaoshouren'), type: 'select', source: "user" },
                    { name: "warehouseid", label: _label('xiaoshoucangku'), type: 'select', source: "warehouse" },
                    { name: "status", label: _label('zhuangtai'), type: "select", source: "salestatus" }
                ],
                controller: "sales"
            },
            visibleDialog: false,
            pro: false,
            info: {},
            rowIndex: -1
        }
    },
    methods: {
        showForm() {
            this.visibleDialog = true;
        },
        showFormToCreate() {
            this.info = {}
            this.rowIndex = -1
            this.showForm()
        },
        showFormToEdit(rowIndex, row) {
            const self = this
            self.info = row;
            self.rowIndex = rowIndex
            //self._log(row)
            self.showForm()
        },
        onChange(form) {
            let self = this
            if (self.rowIndex < 0) {
                self.$refs.tablelist.appendRow(globals.clone(form))
            } else {
                var row = self.$refs.tablelist.getRow(self.rowIndex)
                globals.copyTo(form, row)
            }
            self.rowIndex = -1
        },
        isEditable(row) {
            return false
                //
                //var status = row.status;
                //return status == '1' || status == '' || !status
        }
    },
    computed: {},
    watch: {},
    mounted: function() {}
}
</script>
