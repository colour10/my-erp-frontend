<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth auth="requisition">
                <as-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</as-button>
            </auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <asa-requisition-dialog :visible.sync="visibleDialog" @change="onChange"></asa-requisition-dialog>

        <asa-requisition-detail-dialog :visible.sync="visibleDetailDialog" :data="info" @change="onRowChange"></asa-requisition-detail-dialog>
    </div>
</template>

<script>
import {_label} from '../globals.js'
import Asa_Requisition_Dialog from '../asa/Asa_Requisition_Dialog.vue'
import Asa_Requisition_Detail_Dialog from '../asa/Asa_Requisition_Detail_Dialog.vue'

export default {
    name: "sp-requisition",
    components: {
        'asa-requisition-dialog': Asa_Requisition_Dialog,
        'asa-requisition-detail-dialog': Asa_Requisition_Detail_Dialog
    },
    props: {},
    data() {
        var self = this;

        return {
            props: {
                columns: [
                    { name: "out_id", label: _label('diaochuku'), type: 'select', source: "warehouse" },
                    { name: "in_id", label: _label('diaoruku'), type: 'select', source: "warehouse" },
                    { name: "apply_staff", label: _label('shenqingren'), type: 'select', source: "user" },
                    { name: "status", label: _label("zhuangtai"), type: "select", source: "requisitionstatus" }
                ],
                controller: "requisition"
            },
            visibleDialog: false,
            info: {},
            rowIndex: -1,
            visibleDetailDialog:false
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
            this.info = row;
            this.rowIndex = rowIndex
            //console.log(row)
            this.visibleDetailDialog =  true;
        },
        onChange() {
            let self = this
            self.visibleDialog = false;
            self.$refs.tablelist.loadList();
        },
        onRowChange(){
            this.$refs.tablelist.loadList();
        },
        isEditable(row) {
            var status = row.status;
            return status == '1' || status == '' || !status
        }
    },
    computed: {},
    watch: {},
    mounted: function() {}
}
</script>
