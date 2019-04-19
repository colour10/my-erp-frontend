<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth auth="confirmorder-submit"><as-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</as-button></auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <asa-order-confirm-dialog :visible.sync="visibleDialog" :data="info" @change="onChange" @warehousing="goToWarehousing"></asa-order-confirm-dialog>
        <asa-warehousing-dialog :visible.sync="warehousingVisbleDialog" :confirmorderid="confirmorderid" @change="onWarehousingChange"></asa-warehousing-dialog>
    </div>
</template>

<script>
import globals,{_label} from '../globals.js'
import Asa_Warehousing_Dialog from '../asa/Asa_Warehousing_Dialog.vue'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

export default {
    name: 'asapage-confirmorder',
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
                    { name: "orderno", label: _label('dingdanbianhao'), width: 300 },
                    { name: "warehouseid", label: _label('daohuocangku'), type:'select', source:'warehouse' },
                    { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier" },
                    { name: "ageseasonid", label: _label('niandaijijie'), type: 'select', source: "ageseason" },
                    { name: "status", label: _label('zhuangtai'), type: 'select', source: "orderstatus" },
                    { name: "makestaff", label: _label('zhidanren'), type: 'select', source: "user" }
                ],
                buttons: [{
                    label: _label("shengchengrukudan"),
                    handler: function(rowIndex, row, column) {
                        self.showFormToWarehousing(rowIndex,row)
                    },
                    isShow:function(vm){
                        return vm.$store.getters.allow("warehousing")
                    }
                }],
                controller: "confirmorder",
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
        showForm() {
            this.visibleDialog = true;
        },
        showFormToCreate() {
            this.info = {}
            this.rowIndex = -1
            this.showForm()
        },
        showFormToEdit(rowIndex, row) {
            let self = this
            self.info = row;
            self.rowIndex = rowIndex
            //self._log(row)
            self.showForm()
        },
        showFormToWarehousing(rowIndex, row) {
            let self = this
            self.confirmorderid = row.id;
            self.rowIndex = rowIndex
            //self._log(row)
            self.warehousingVisbleDialog = true;
        },
        goToWarehousing() {
            let self = this
            self.confirmorderid = self.info.id;
            self.warehousingVisbleDialog = true;
            self.visibleDialog = false;
        },
        onChange(form, action) {
            let self = this
            let tablelist = self.$refs.tablelist
            //self._log("form", form)

            let index = tablelist.findIndex(item=>item.id==form.id)
            if (index < 0) {
                tablelist.appendRow(globals.clone(form))
            } else {
                if(action=='delete') {
                    tablelist.deleteRow(index)
                    self.visibleDialog = false;
                }
                else {
                    var row = tablelist.getRow(index)
                    globals.copyTo(form, row)
                }                
            }
            self.rowIndex = -1
        },
        onWarehousingChange() {
            let self = this
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
