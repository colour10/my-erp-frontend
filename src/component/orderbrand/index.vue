<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form class="searchform" ref="search-form" :model="searchform" label-width="80px" size="mini" :inline="true" @submit.native.prevent>
                    <el-form-item class="searchitem">
                        <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch"></el-input>
                        <as-button type="primary" @click="onSearch" size="mini" icon="el-icon-search">{{_label("chaxun")}}</as-button>
                        <auth auth="order-submit"><as-button type="primary" @click="showFormToCreate">{{_label('xinjian')}}</as-button></auth>
                        <auth auth="order-submit"><as-button type="primary" @click="showFormToEdit">{{_label('bianji')}}</as-button></auth>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isedit="false" :isdelete="false" :isSelect="true"></simple-admin-tablelist>
    </div>
</template>

<script>
export default {
    name: 'sp-orderbrand',
    data() {
        var self = this;
        let _label = self._label

        return {   
            searchform:{
                keyword:""
            },         
            props: {
                columns: [
                    { name: "orderno", label: _label('dingdanbianhao'), width: 300 },
                    { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier" },
                    { name: "ageseason", label: _label('niandaijijie'), type: 'select', source: "ageseason" },
                    { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype" },
                    { name: "status", label: _label('zhuangtai'), type: 'select', source: "orderstatus" },
                    { name: "makedate", label: _label('dingdanriqi'), convert:function(row){
                        if(row.maketime && row.maketime.length>0) {
                            return row.maketime.substr(0,10)
                        }
                    } }
                ],
                actions:[
                    { label: _label("queren"), handler:self.toCreateConfirm},
                    { label:_label("shanchu"), type:"danger", handler:function({row}){
                        self._remove("/orderbrand/delete", { id: row.id }).then(function(result) {
                            if(result){
                                self.$refs.tablelist.search(self.searchform)
                            }                              
                        })
                    }}
                ],
                controller: "orderbrand",
                options:{
                    action_width:270
                }
            },
            pro: false,
            info: {},
            rowIndex: -1
        }
    },
    methods: {
        onSearch() {
            let self = this
                //self._log(self.searchform)
            self.$refs.tablelist.search(self.searchform)
        },
        showFormToCreate() {
            this.$router.push('/orderbrand/0')
        },
        showFormToEdit() {
            let self = this;
            let rows = self.$refs.tablelist.getSelectRows()
            let table = {}
            rows.forEach(item=>{
                table[item.supplierid]=1
            })

            if(rows.length==Object.keys(table).length) {
                self.$router.push('/orderbrand/' + self.$refs.tablelist.getSelectValues())
            }
            else {
                self._info(self._label("tip-tongyige"))
            }
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
