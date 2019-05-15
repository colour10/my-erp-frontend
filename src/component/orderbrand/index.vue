<template>
    <div>
        <el-row>
            <el-col :span="2">
            </el-col>
            <el-col :span="2">
                <auth auth="order-submit"><as-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</as-button></auth>
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
import globals,{_label} from '../globals.js'
import Simple_Admin_TableList from '../Simple_Admin_TableList.vue'

export default {
    name: 'sp-orderbrand',
    components: {
        'simple-admin-tablelist': Simple_Admin_TableList
    },
    props: {},
    data() {
        var self = this;

        return {            
            props: {
                columns: [
                    { name: "orderno", label: _label('dingdanbianhao'), width: 300 },
                    { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier" },
                    { name: "ageseason", label: _label('niandaijijie'), type: 'select', source: "ageseason" },
                    { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype" },
                    { name: "status", label: _label('zhuangtai'), type: 'select', source: "orderstatus" },
                    { name: "makedate", label: _label('dingdanriqi') }
                ],
                controller: "orderbrand"
            },
            pro: false,
            info: {},
            rowIndex: -1
        }
    },
    methods: {
        showFormToCreate() {
            this.info = {}
            this.rowIndex = -1
            this.$router.push('/order/0')
        },
        showFormToEdit(rowIndex, row) {
            this.info = row;
            this.rowIndex = rowIndex
            this.$router.push('/order/' + row.id)
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
