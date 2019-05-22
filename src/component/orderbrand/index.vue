<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth auth="order-submit"><as-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</as-button></auth>
            </el-col>
        </el-row>
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
    </div>
</template>

<script>
export default {
    name: 'sp-orderbrand',
    data() {
        var self = this;
        let _label = self._label

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
                actions:[
                    { label: _label("queren"), handler:self.toCreateConfirm},
                    //{ label: _label("fahuo"), handler:self.toShipping}
                ],
                controller: "orderbrand",
                options:{
                    action_width:200
                }
            },
            pro: false,
            info: {},
            rowIndex: -1
        }
    },
    methods: {
        showFormToCreate() {
            this.$router.push('/orderbrand/0')
        },
        showFormToEdit(rowIndex, row) {
            this.$router.push('/orderbrand/' + row.id)
        },
        toCreateConfirm({row, vm}){
            this.$router.push('/confirmorder/create/' + row.id)
        },
        toShipping({row, vm}){
            this.$router.push('/shipping/create/' + row.id)
        }
    }
}
</script>
