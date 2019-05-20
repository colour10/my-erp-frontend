<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"></simple-admin-tablelist>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'sp-shipping',
    data() {
        let self = this;

        return {
            props: {
                columns: [
                    { name: "orderno", label: self._label('rukudanhao'), width: 300 },
                    { name: "warehouseid", label: self._label('cangku'), type:'select', source:'warehouse' },
                    { name: "entrydate", label: self._label('rukuriqi')},
                    { name: "makestaff", label: self._label('zhidanren'),source:"user",type:"select"}
                ],
                controller: "shipping"                
            }
        }
    },
    methods: {
        showFormToEdit(rowIndex, row) {
            let self = this
        }
    }
}
</script>
