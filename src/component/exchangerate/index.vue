<template>
    <div>
    <simple-admin-page v-bind="props">
        <template v-slot="{form,action}">
            <el-form class="user-form" :model="form" :inline="true" size="mini">
                <el-form-item>
                    <el-col :span="8">
                        <simple-select ref="currency_from" v-model="form.currency_from" source="currency" :disabled="action=='edit'"></simple-select>
                    </el-col>
                    <el-col class="line" :span="1" align="center">/</el-col>
                    <el-col :span="8">
                        <simple-select ref="currency_to" v-model="form.currency_to" source="currency" :disabled="action=='edit'"></simple-select>
                    </el-col>
                    <el-col class="line" :span="1" align="center">=</el-col>
                    <el-col :span="6">
                        <el-input v-model="form.rate"></el-input>
                    </el-col>
                </el-form-item>
            </el-form>
        </template>
    </simple-admin-page>

    <el-dialog :title="title" class="user-form" :visible.sync="dialogVisible" :center="true" width="501px">
        <simple-admin-tablelist v-bind="props2" ref="history"></simple-admin-tablelist>
    </el-dialog>
</div>
</template>

<script>
import { _label } from '../globals.js'

export default {
    name: 'sp-exchangerate',
    props: {},
    data() {
        let self = this
        return {
            props: {
                columns: [
                    { name: "currency_from", label: _label("huichuhuobi"), type:"select", source:"currency"},
                    { name: "currency_to", label: _label("huiruhuobi"), type:"select", source:"currency", default:_label("_currencyid")},
                    { name: "rate", label: _label("huilv")},
                    { name: "begin_time", label: _label("shengxiaoshijian")},
                ],
                buttons:[{
                    name: "rate",
                    label: _label('lishihuilv'),
                    width: 150,
                    disable_change: true,
                    handler: function(rowIndex, row) {
                        //console.log(rowIndex, row)   
                        //props2.base.brandgroupid = row.id;
                        //必须加这个，为了触发强制更新
                        self.props2.base.currency_from = ""

                        self.props2.base.currency_from = row.currency_from
                        self.props2.base.currency_to = row.currency_to
                        self.dialogVisible = true;
                        self.title = row.currency_from__label + '/' + row.currency_to__label
                    }
                }],
                controller: "exchangerate",
                auth: "exchangerate",
                options:{
                    dialogWidth:"400px", 
                    autoreload:true,
                    autohide:true
                },
                formTitle:function(row){
                    if(row && row.id>0) {
                        return row.currency_from__label + '/' + row.currency_to__label
                    }
                }
            },
            props2:{
                columns:[
                    { name: "begin_time", label: _label("shengxiaoshijian")},
                    { name: "end_time", label: _label("jiezhishijian")},
                    { name: "rate", label: _label("huilv"),width:100}
                ],
                controller: "exchangerate",
                auth: "exchangerate",
                options:{
                    dialogWidth:"400px", 
                    autoreload:true,
                    isaction:false,
                    actionNameOfLoad:'history'
                },
                base:{
                    currency_from:"",
                    currency_to:""
                }
            },
            dialogVisible:false,
            title:""
        }
    },
    methods: {}
}
</script>
