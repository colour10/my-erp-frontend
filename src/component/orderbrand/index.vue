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
                    { name: "orderno", label: _label('gongsidingdanhao'), width: 120 },
                    { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier", width:90 },
                    { name: "ageseason", label: _label('niandaijijie'), type: 'select', source: "ageseason", width: 110 },
                    { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype", width: 110 },
                    { name: "currency", label: _label('bizhong'), type: 'select', source: "currency", width: 80 },
                    { name: "total_price", label: _label('zongjine'), width:100 },
                    { name: "total_number", label: _label('zongjianshu'), width:100 },
                    { name: "discount", label: _label('zhekoulv'), width:100 },
                    { name: "taxrebate", label: _label('tuishuilv'), width:100 },
                    { name: "quantum", label: _label('edu'), width:100 },
                    { name: "memo", label: _label('beizhu'), width:100, sortable:false },
                    { name: "makedate", label: _label('dingdanriqi'), width:110, convert:function(row){
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
                    action_width:160
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
            this.$router.push('/orderbrand/confirm/' + row.id)
        },
        toShipping({row, vm}){
            this.$router.push('/shipping/create/' + row.id)
        }
    }
}
</script>
