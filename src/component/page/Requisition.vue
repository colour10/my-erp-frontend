<template>
    <div style="width:100%">
        <el-row>
            <el-col :span="2" :offset="22">
                <auth auth="requisition">
                <el-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</el-button>
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
import globals from '../globals.js'
import Asa_Requisition_Dialog from '../asa/Asa_Requisition_Dialog.vue'
import Asa_Requisition_Detail_Dialog from '../asa/Asa_Requisition_Detail_Dialog.vue'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

const page_name = "asapage-requisition";
const _log = globals.logger(page_name);

var props = {
    columns: [
        { name: "out_id", label: globals.getLabel('diaochuku'), type: 'select', source: "warehouse" },
        { name: "in_id", label: globals.getLabel('diaoruku'), type: 'select', source: "warehouse" },
        { name: "apply_staff", label: globals.getLabel('shenqingren'), type: 'select', source: "user" },
        { name: "status", label: globals.getLabel("zhuangtai"), type: "select", source: "requisitionstatus" }
        //{name:"zipcode", label:"<?=$system_language['youbian']?>"}, 

        //{name:"contact", label:"<?=$system_language['lianxiren']?>"}, 
        //{name:"mobile", label:"<?=$system_language['yidongdianhua']?>"},
        // {name:"fax", label:"<?=$system_language['chuanzhen']?>"},
        //{name:"code", label:"<?=$system_language['bianhao']?>"},
        //{name:"othercontact", label:"<?=$system_language['qitalianxifangshi']?>"},
        //{name:"is_real", label:"<?=$system_language['shifoukeyong']?>", type:"switch"}
    ],
    controller: "requisition"
}

export default {
    name: page_name,
    components: {
        'asa-requisition-dialog': Asa_Requisition_Dialog,
        'asa-requisition-detail-dialog': Asa_Requisition_Detail_Dialog,
        'simple-admin-tablelist': Simple_Admin_TableList
    },
    props: {},
    data() {
        var self = this;

        return {
            props: props,
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
