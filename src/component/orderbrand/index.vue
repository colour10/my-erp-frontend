<template>
    <div>
        <el-row>
            <el-col :span="24">
                <as-button type="primary" @click="_showDialog('search')" size="mini" icon="el-icon-search">{{_label("chaxun")}}</as-button>
                <asa-button type="primary" @click="showFormToCreate" :enable="_isAllowed('orderbrand-add')">{{_label('xinjian')}}</asa-button>
                <!-- <auth auth="order-submit"><as-button type="primary" @click="showFormToEdit">{{_label('bianji')}}</as-button></auth> -->
            </el-col>
        </el-row>
        <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isedit="false" :isdelete="false" :isSelect="false">
            <template v-slot:brandid="{row}">
                <sp-select-text :value="row.brandid" source="brand"></sp-select-text>
            </template>

        </simple-admin-tablelist>

        <sp-dialog ref="search" width="600">
            <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini" @submit.native.prevent>
                <el-row :gutter="0">
                    <el-col :span="8" style="width:270px">
                        <el-form-item :label="_label('dingdanhao')">
                            <el-input v-model="form.orderno" class="width2"/>
                        </el-form-item>
                        <el-form-item :label="_label('gonghuoshang')">
                            <simple-select v-model="form.supplierid" source="supplier_3" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('niandai')">
                            <simple-select v-model="form.ageseason" source="ageseason" :multiple="true"/>
                        </el-form-item>
                        <el-form-item :label="_label('pinpai')">
                            <simple-select v-model="form.brandid" source="brand" :multiple="true"/>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="width:270px">
                        <el-form-item :label="_label('jijie')">
                            <simple-select v-model="form.seasontype" source="seasontype"/>
                        </el-form-item>
                        <el-form-item :label="_label('yewuleixing')" prop="bussinesstype">
                            <simple-select v-model="form.bussinesstype" source="bussinesstype"/>
                        </el-form-item>

                        <el-form-item :label="_label('beizhu')">
                            <el-input v-model="form.memo" class="width2"/>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="0">
                    <el-col align="center">
                        <as-button type="primary" @click="onSearch(form)" native-type="submit">{{_label("chaxun")}}</as-button>
                        <as-button type="primary" @click="_hideDialog('search')">{{_label("tuichu")}}</as-button>
                    </el-col>
                </el-row>
            </el-form>
        </sp-dialog>
    </div>
</template>

<script>
export default {
    name: 'sp-orderbrand',
    data() {
        var self = this;
        let _label = self._label

        return {
            form:{
                orderno:"",
                brandid:"",
                supplierid:"",
                ageseason:"",
                seasontype:"",
                bussinesstype:"",
                memo:""
            },
            props: {
                columns: [
                    { name: "orderno", label: _label('gongsidingdanhao'), width: 120 },
                    { name: "supplierid", label: _label('gonghuoshang'), type: 'select', source: "supplier", width:90 },
                    { name: "ageseason", label: _label('niandaijijie'), type: 'select', source: "ageseason", width: 110 },
                    { name: "bussinesstype", label: _label('yewuleixing'), type: 'select', source: "bussinesstype", width: 110 },
                    { name: "currency", label: _label('bizhong'), type: 'select', source: "currency", width: 80 },
                    { name: "total_discount_price", label: _label('zongjine'), width:100 },
                    { name: "total_number", label: _label('zongjianshu'), width:100 },
                    { name: "discount", label: _label('zhekoulv'), width:100 },
                    { name: "taxrebate", label: _label('tuishuilv'), width:100 },
                    { name: "quantum", label: _label('edu'), width:100 },
                    { name: "memo", label: _label('beizhu'), width:100, sortable:false },
                    { name: "status", label: _label('zhuangtai'), type: 'select', source: "orderbrandstatus", width: 90 },
                    { name: "makedate", label: _label('dingdanriqi'), width:110, convert:function(row){
                        if(row.maketime && row.maketime.length>0) {
                            return row.maketime.substr(0,10)
                        }
                    } },
                    { name: "brandid", label: _label('品牌'), width:150, sortable:false }
                ],
                actions:[
                    { label: _label("xiangqing"), handler:self.toCreateConfirm, type: '' },
                    { label:_label("shanchu"), type:"danger", enable: self._isAllowed('orderbrand-delete'), handler:function({row}){
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
                },
                authname: 'orderbrand-delete',
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
            self.$refs.tablelist.search(self.form)
        },
        showFormToCreate() {
            this._open('/orderbrand/0')
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
            this._open('/orderbrand/confirm/' + row.id)
        },
        toShipping({row, vm}){
            this._open('/shipping/detail/' + row.id)
        }
    }
}
</script>
