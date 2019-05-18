<template>
    <div>
        <el-row>
            <el-col :span="8">
                <auth auth="order-submit"><as-button type="primary" @click="toPage(0)">{{_label('xinjian')}}</as-button></auth>
            </el-col>
        </el-row>
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="toEdit" :isdelete="false"></simple-admin-tablelist>
    </div>
</template>

<script>
export default {
    name: 'sp-order',
    data() {
        let self = this;
        let _label = self._label

        return {            
            props: {
                columns: [
                    { name: "orderno", label: _label('dingdanbianhao'), width: 240 },
                    { name: "bookingid", label: _label('dinghuokehu'), type: 'select', source: "supplier" },
                    { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier" },
                    { name: "ageseason", label: _label('niandai'), type: 'select', source: "ageseason", width:100 },
                    { name: "currency", label: _label('bizhong'), type: 'select', source: "currency", width:80 },
                    { name: "total", label: _label('jine'), width:100 },
                    { name: "genders", label: _label('xingbie') },
                    { name: "brands", label: _label('pinpai') },
                    { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype", width:100 },
                    { name: "status", label: _label('zhuangtai'), type: 'select', source: "orderstatus", width:120 },
                    { name: "orderdate", label: _label('dingdanriqi'), width:120 }
                ],
                controller: "order"
            }
        }
    },
    methods: {
        toPage(id) {
            this.$router.push('/order/'+id)
        },
        toEdit(rowIndex, row) {
            this.toPage(row.id)
        },
    }
}
</script>
