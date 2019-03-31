<template>
    <div style="width:100%">
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <asa-warehousing-dialog :visible.sync="warehousingVisbleDialog" :confirmorderid="confirmorderid"></asa-warehousing-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import Asa_Warehousing_Dialog from '../asa/Asa_Warehousing_Dialog.vue'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

export default {
    name: 'asapage-warehousing',
    components: {
        'asa-warehousing-dialog': Asa_Warehousing_Dialog,
        'simple-admin-tablelist': Simple_Admin_TableList
    },
    props: {},
    data() {
        var self = this;

        return {
            globals,
            props: {
                columns: [
                    { name: "orderno", label: self._label('rukudanhao'), width: 300 },
                    { name: "entrydate", label: self._label('rukuriqi')},
                    { name: "makestaff", label: self._label('zhidanren'),source:"user",type:"select"}
                ],
                controller: "warehousing",
                actionwidth: 300
            },
            visibleDialog: false,
            pro: false,
            info: {},
            rowIndex: -1,
            confirmorderid:"",            
            warehousingVisbleDialog:false
        }
    },
    methods: {
        showFormToEdit(rowIndex, row) {
            let self = this
            self.confirmorderid = row.confirmorderid;
            self.rowIndex = rowIndex
            //self._log(row)
            self.warehousingVisbleDialog = true;
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
