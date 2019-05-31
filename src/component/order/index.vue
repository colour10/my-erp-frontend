<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-form class="searchform" ref="search-form" :model="searchform" label-width="80px" size="mini" :inline="true" @submit.native.prevent>
                    <el-form-item class="searchitem">
                        <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch"></el-input>
                        <as-button type="primary" @click="onSearch" size="mini" icon="el-icon-search">{{_label("chaxun")}}</as-button>
                        <auth auth="order-submit">
                            <as-button type="primary" @click="toPage(0)">{{_label('xinjian')}}</as-button>
                        </auth>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="toEdit" :isdelete="false">
            <template v-slot:orderno="{row}">
                <sp-order-tip column="orderno" :order="row"></sp-order-tip>
            </template>>
        </simple-admin-tablelist>
    </div>
</template>

<script>
export default {
    name: 'sp-order',
    data() {
        let self = this;
        let _label = self._label

        return {
            searchform:{
                keyword:""
            },
            props: {
                columns: [
                    { name: "orderno", label: _label('dingdanbianhao'), width: 120 },

                    { name: "bookingid", label: _label('dinghuokehu'), type: 'select', source: "supplier" },
                    { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier" },
                    { name: "ageseason", label: _label('niandai'), type: 'select', source: "ageseason", width: 100 },
                    { name: "currency", label: _label('bizhong'), type: 'select', source: "currency", width: 80 },
                    { name: "total", label: _label('jine'), width: 100 },
                    { name: "discount", label: _label('zhekoulv'), width: 100 },
                    { name: "genders", label: _label('xingbie') },
                    { name: "brands", label: _label('pinpai') },
                    { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype", width: 120 },
                    //{ name: "status", label: _label('zhuangtai'), type: 'select', source: "orderstatus", width: 120 },
                    { name: "orderdate", label: _label('dingdanriqi'), width: 120, convert:function(row){
                        if(row.maketime && row.maketime.length>0) {
                            return row.maketime.substr(0,10)
                        }
                    } }
                ],
                controller: "order",
                actions:[
                    { label:_label("shanchu"), type:"danger", handler:function({row}){
                        self._remove("/order/delete", { id: row.id }).then(function(result) {
                            if(result){
                                self.$refs.tablelist.search(self.searchform)
                            }                              
                        })
                    }}
                ]
            }
        }
    },
    methods: {
        onSearch() {
            let self = this
                //self._log(self.searchform)
            self.$refs.tablelist.search(self.searchform)
        },
        toPage(id) {
            this.$router.push('/order/' + id)
        },
        toEdit(rowIndex, row) {
            this.toPage(row.id)
        },
    }
}
</script>
