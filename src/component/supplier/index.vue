<template>
    <div>
        <simple-admin-page v-bind="supplier" ref="page" @before-edit="onBeforeEdit" @before-add="onBeforeAdd">
            <template v-slot="{form,columns}">
                <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick">
                    <el-tab-pane :label="_label('jibenziliao')" name="info">
                        <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="true" size="mini">
                            <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:'width2'">
                                <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" size="mini"></el-input>
                                <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" @change="onChange(item)" :disabled="isDisabled(item)"></simple-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('kaipiaoxinxi')" name="invoice" :disabled="id==0">
                        <simple-admin-page v-bind="supplierinvoice"></simple-admin-page>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('kaihuhang')" name="bank" :disabled="id==0">
                        <simple-admin-page v-bind="supplierbank"></simple-admin-page>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </simple-admin-page>
    </div>
</template>

<script>
import { _label } from '../globals.js'

export default {
    name: 'asapage-supplier',
    components: {},
    props: {},
    data() {
        let self = this;

        return {
            supplier: {
                columns: [
                    { name: "nickname", label: _label("nicheng"), class: "width2" },
                    { name: "suppliercode", label: _label("bianma"), class: "width2" },
                    { name: "suppliertype", label: _label("leixing"), class: "width2", type: "select", source: "suppliertype" },
                    { name: "customtype", label: _label("kehuleixing"), class: "width2", type: "select", source: "customtype" },
                    { name: "suppliername", label: _label("mingcheng"), class: "width1" },
                    { name: "address", label: _label("dizhi"), class: "width1", is_hide: true },
                    { name: "englishname", label: _label("yingwenmingcheng"), class: "width1", is_hide: true },
                    { name: "englishaddress", label: _label("yingwendizhi"), class: "width1", is_hide: true },
                    { name: "website", label: _label("wangzhi"), class: "width1", is_hide: true },
                    { name: "countrycity", label: _label("guojiachengshi"), class: "width2", type: "select", source: "country" },
                    { name: "zipcode", label: _label("youbian"), class: "width2", is_hide: true },
                    { name: "phone", label: _label("dianhua"), class: "width2" },
                    { name: "fax", label: _label("chuanzhen"), class: "width2", is_hide: true },
                    { name: "linkman", label: _label("lianxiren"), class: "width2", is_hide: true },
                    { name: "mobile", label: _label("shoujihao"), class: "width2", is_hide: true },
                    { name: "email", label: 'Email', class: "width1", is_hide: true }
                ],
                options: {
                    dialogWidth: '1000px',
                    formSize: 'small',
                    inline: true
                },
                controller: "supplier"
            },
            "supplierinvoice": {
                columns: [
                    { name: "name", label: _label("mingcheng"), class: "width1" },
                    { name: "telephone", label: _label("dianhua"), class: "width1" },
                    { name: "address", label: _label("dizhi"), class: "width1", is_hide: true },
                    { name: "bank", label: _label("kaihuhang"), class: "width1" },
                    { name: "bank_account", label: _label("yinhangzhanghao"), class: "width1" }
                ],
                controller: "supplierinvoice",
                auth: "supplier",
                base: {
                    supplierid: ''
                },
                options: {
                    dialogWidth: '800px'
                }
            },
            "supplierbank": {
                columns: [
                    { name: "name", label: _label("mingcheng"), class: "width2" },
                    { name: "currency", label: _label("bizhong"), class: "width2", type: "select", source: "currency" },
                    { name: "address", label: _label("dizhi"), class: "width1", is_hide: true },
                    { name: "bank_name", label: _label("yinhangmingcheng"), class: "width1" },
                    { name: "bank_depart", label: _label("fenhangmingcheng"), class: "width1", is_hide: true },
                    { name: "bank_address", label: _label("yinhangdizhi"), class: "width1", is_hide: true },
                    { name: "account", label: _label("yinhangzhanghao"), class: "width2" },
                    { name: "bank_code", label: _label("guojima"), class: "width2" },
                ],
                controller: "supplierbank",
                auth: "supplier",
                base: {
                    supplierid: ''
                },
                options: {
                    dialogWidth: '800px',
                    inline: true
                }
            },
            dialogVisible: false,
            currentTab: "invoice",
            title: "",
            activeName: "info",
            id: 0,
            suppliertype:""
        }
    },
    methods: {
        onBeforeEdit(row) {
            let self = this
            self.supplierinvoice.base.supplierid = row.id
            self.supplierbank.base.supplierid = row.id
            self.id = row.id
        },
        onBeforeAdd() {
            let self = this
            self.activeName = 'info'
            self.id = 0
        },
        onTabClick() {},
        onChange(column) {
            let self = this
            
            if (column.name == 'suppliertype') {
                //客户
                self.suppliertype = self.$refs['suppliertype'][0].getValue()
                if(self.suppliertype!=2) {
                    self.$refs['customtype'][0].setValue('')
                }
            }
        },
        isDisabled(column) {
            return column.name=='customtype' && this.suppliertype!=2;
        }
    }
}
</script>
