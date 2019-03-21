<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-button type="primary" @click="showFormToCreate()">{{globals.getLabel('xinjian')}}</el-button>
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
import globals from '../globals.js'
import Asa_Sales_Dialog from '../asa/Asa_Sales_Dialog.vue'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

const _log = globals.logger("asapage-sales");

var props = {
    columns: [
        { name: "saleno", label: globals.getLabel('xiaoshoudanhao'), width: 300 },
        { name: "salesstaff", label: globals.getLabel('xiaoshouren'), type: 'select', source: "user" },
        { name: "warehouseid", label: globals.getLabel('xiaoshoucangku'), type: 'select', source: "warehouse" },
        { name: "status", label: globals.getLabel('zhuangtai'), type: "select", source: "salestatus" },
        //{name:"zipcode", label:"<?=$system_language['youbian']?>"}, 

        //{name:"contact", label:"<?=$system_language['lianxiren']?>"}, 
        //{name:"mobile", label:"<?=$system_language['yidongdianhua']?>"},
        // {name:"fax", label:"<?=$system_language['chuanzhen']?>"},
        //{name:"code", label:"<?=$system_language['bianhao']?>"},
        //{name:"othercontact", label:"<?=$system_language['qitalianxifangshi']?>"},
        //{name:"is_real", label:"<?=$system_language['shifoukeyong']?>", type:"switch"}
    ],
    controller: "sales"
}

export default {
    name: 'asapage-sales',
    components: {
        'asa-sales-dialog': Asa_Sales_Dialog,
        'simple-admin-tablelist': Simple_Admin_TableList
    },
    props: {},
    data() {
        var self = this;

        return {
            props: props,
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
            self._log(row)
            self.showForm()
        },
        onChange(form) {
            let self = this
            if (self.rowIndex < 0) {
                self.$refs.tablelist.appendRow($ASA.clone(form))
            } else {
                var row = self.$refs.tablelist.getRow(self.rowIndex)
                $ASA.copyTo(form, row)
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
