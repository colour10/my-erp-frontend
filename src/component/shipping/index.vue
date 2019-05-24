<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form class="searchform" ref="search-form" :model="searchform" label-width="80px" size="mini" :inline="true" @submit.native.prevent>
                    <el-form-item class="searchitem">
                        <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch"></el-input>
                        <as-button type="primary" @click="onSearch" size="mini" icon="el-icon-search">{{_label("chaxun")}}</as-button>
                        <auth auth="confirmorder-submit"><as-button type="primary" @click="showFormToCreate()">{{_label('xinjian')}}</as-button></auth>
                    </el-form-item>
                </el-form>
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
export default {
    name: 'sp-shipping',
    data() {
        let self = this;
        let _label = self._label

        return {               
            searchform:{
                keyword:""
            },   
            props: {
                columns: [
                    { name: "orderno", label: _label('rukudanhao'), width: 300 },
                    { name: "warehouseid", label: _label('cangku'), type:'select', source:'warehouse' },
                    { name: "entrydate", label: _label('rukuriqi')},
                    { name: "makestaff", label: _label('zhidanren'),source:"user",type:"select"}
                ],
                controller: "shipping",
                actions:[
                    { label:_label("shanchu"), type:"danger", handler:function({row}){
                        self._remove("/shipping/delete", { id: row.id }).then(function(result) {
                            if(result){
                                self.$refs.tablelist.search(self.searchform)
                            }                              
                        })
                    }}
                ],              
            }
        }
    },
    methods: {
        onSearch() {
            let self = this
                //self._log(self.searchform)
            self.$refs.tablelist.search(self.searchform)
        },
        showFormToCreate() {
            this.$router.push('/shipping/0')
        },
        showFormToEdit(rowIndex, row){
            this.$router.push('/shipping/' + row.id)
        }
    }
}
</script>
