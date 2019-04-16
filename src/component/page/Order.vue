<template>
    <div>
        <el-row>
            <el-col :span="2">
            </el-col>
            <el-col :span="2" :offset="22">
                <auth auth="order-submit"><el-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</el-button></auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <asa-order-dialog :visible.sync="visibleDialog" :data="info" @change="onChange"></asa-order-dialog>
    </div>
</template>

<script>
import globals,{_label} from '../globals.js'
import Asa_Order_Dialog from '../asa/Asa_Order_Dialog.vue'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

var props = {
    columns: [
        { name: "orderno", label: _label('dingdanbianhao'), width: 300 },
        { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier" },
        { name: "ageseason", label: _label('niandaijijie'), type: 'select', source: "ageseason" },
        { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype" },
        { name: "status", label: _label('zhuangtai'), type: 'select', source: "orderstatus" },
        { name: "makedate", label: _label('dingdanriqi') }
        //{name:"zipcode", label:"<?=$system_language['youbian']?>"}, 

        //{name:"contact", label:"<?=$system_language['lianxiren']?>"}, 
        //{name:"mobile", label:"<?=$system_language['yidongdianhua']?>"},
        // {name:"fax", label:"<?=$system_language['chuanzhen']?>"},
        //{name:"code", label:"<?=$system_language['bianhao']?>"},
        //{name:"othercontact", label:"<?=$system_language['qitalianxifangshi']?>"},
        //{name:"is_real", label:"<?=$system_language['shifoukeyong']?>", type:"switch"}
    ],
    controller: "order"
}

export default {
    name: 'asapage-order',
    components: {
        'asa-order-dialog': Asa_Order_Dialog,
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
            this.info = row;
            this.rowIndex = rowIndex
            //console.log(row)
            this.showForm()
        },
        onChange(form, isdelete) {
            let self = this

            //self._log(form,isdelete)
            if(isdelete) {
                 if (self.rowIndex >= 0) {
                    //self._log("删除订单")
                    self.$refs.tablelist.deleteRow(self.rowIndex)
                }
            }
            else {
                if (self.rowIndex < 0) {
                    self.rowIndex = self.$refs.tablelist.appendRow(globals.clone(form))
                } else {
                    var row = self.$refs.tablelist.getRow(self.rowIndex)
                    globals.copyTo(form, row)
                }
            }            
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
