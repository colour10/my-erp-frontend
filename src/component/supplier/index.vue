<template>
    <div>
        <simple-admin-page v-bind="supplier" ref="page" @before-edit="onBeforeEdit" @before-add="onBeforeAdd" @after-update="onAfterUpdate">
            <template v-slot="{form,columns}">
                <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick">
                    <el-tab-pane :label="_label('jibenziliao')" name="info">
                        <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="true" size="mini">
                            <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:'width2'">
                                <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" size="mini"></el-input>
                                <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" @change="onChange(item, form)" :disabled="isDisabled(item,form)" :multiple="item.multiple||false"></simple-select>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('kaipiaoxinxi')" name="invoice" :disabled="id==0">
                        <simple-admin-page v-bind="supplierinvoice"></simple-admin-page>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('kaihuhang')" name="bank" :disabled="id==0">
                        <simple-admin-page v-bind="supplierbank"></simple-admin-page>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('shouhuodizhi')" name="supplieraddress" :disabled="id==0">
                        <simple-admin-page v-bind="supplieraddress"></simple-admin-page>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('lianxiren')" name="supplierlinkman" :disabled="id==0">
                        <simple-admin-page v-bind="supplierlinkman" :isExpand="true">
                            <template v-slot:expand="{row}">
                                <el-form label-position="left" class="demo-table-expand">
                                    <el-form-item label="姓名">
                                        <span>{{ row.name }}</span>
                                    </el-form-item>
                                    <el-form-item :label="_label('email')">
                                        <span>{{ row.email }}</span>
                                    </el-form-item>
                                    <el-form-item :label="_label('chuanzhen')">
                                        <span>{{ row.fax }}</span>
                                    </el-form-item>
                                    <el-form-item :label="_label('zuoji')">
                                        <span>{{ row.phone }}</span>
                                    </el-form-item>
                                    <el-form-item :label="_label('youbian')">
                                        <span>{{ row.zipcode }}</span>
                                    </el-form-item>
                                    <el-form-item :label="_label('dizhi')">
                                        <span>{{ row.address }}</span>
                                    </el-form-item>
                                    <el-form-item :label="_label('bumen')">
                                        <span>{{ row.department }}</span>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </simple-admin-page>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </simple-admin-page>
    </div>
</template>

<script>
import { _label, StringFunc } from '../globals.js'

export default {
    name: 'sp-supplier',
    components: {},
    props: {},
    data() {
        let self = this;

        return {
            supplier: {
                columns: [
                    { name: "nickname", label: _label("nicheng"), class: "width2", required: true },
                    { name: "suppliercode", label: _label("bianma"), class: "width2", required: true },
                    { name: "suppliertype", label: _label("leixing"), class: "width2", type: "select", source: "suppliertype", multiple: true, required: true },
                    { name: "customtype", label: _label("kehuleixing"), class: "width2", type: "select", source: "customtype" },
                    { name: "suppliername", label: _label("mingcheng"), class: "width1", required: true },
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
                    { name: "wechat", label: _label("weixin"), class: "width2", is_hide: true },
                    { name: "email", label: 'Email', class: "width1", is_hide: true }
                ],
                options: {
                    dialogWidth: '1000px',
                    formSize: 'small',
                    inline: true,
                    isAutoReload: true
                },
                controller: "supplier",
                formTitle: function(row) {
                    if (row) {
                        return row.nickname + ' ' + row.suppliername;
                    }
                }
            },
            "supplierinvoice": {
                columns: [
                    { name: "name", label: _label("mingcheng"), class: "width1" },
                    { name: "address", label: _label("dizhi"), class: "width1", is_hide: true },
                    { name: "tax_number", label: _label("shuihao"), class: "width2" },
                    { name: "telephone", label: _label("dianhua"), class: "width2" },

                    { name: "bank", label: _label("kaihuhang"), class: "width2", is_hide: true },
                    { name: "bank_account", label: _label("yinhangzhanghao"), class: "width2", is_hide: true }
                ],
                controller: "supplierinvoice",
                auth: "supplier",
                base: {
                    supplierid: ''
                },
                options: {
                    dialogWidth: '800px',
                    inline: true
                },
                formTitle: function(row) {
                    return self._label("kaipiaoxinxi")
                },
                initialization: {
                    name: ""
                }
            },
            "supplierbank": {
                columns: [
                    { name: "name", label: _label("qiye"), class: "width2" },
                    { name: "currency", label: _label("bizhong"), class: "width2", type: "select", source: "currency", width: 90 },
                    { name: "address", label: _label("dizhi"), class: "width1", is_hide: true },
                    { name: "bank_name", label: _label("yinhangmingcheng"), class: "width1" },
                    { name: "bank_depart", label: _label("fenhangmingcheng"), class: "width1", is_hide: true },
                    { name: "bank_address", label: _label("yinhangdizhi"), class: "width1", is_hide: true },
                    { name: "account", label: _label("yinhangzhanghao"), class: "width2" },
                    { name: "bank_code", label: _label("guojima"), class: "width2", is_hide: true },
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
            supplieraddress: {
                columns: [
                    { name: "name", label: _label("shouhuoren"), class: "width2", width: 120 },
                    { name: "phone", label: _label("dianhua"), class: "width2", width: 120 },
                    { name: "address", label: _label("shouhuodizhi"), class: "width1", is_hide: true },
                    { name: "countryid", label: _label("guojiadiqu"), type: "select", source: "country", class: "width2" },
                    { name: "zipcode", label: _label("youbian"), class: "width2", width: 80, is_hide: true },
                    { name: "province", label: _label("shengfen"), class: "width2", width: 120 },
                    { name: "city", label: _label("chengshi"), class: "width2", width: 120 }
                ],
                controller: "supplieraddress",
                auth: "supplier",
                base: {
                    supplierid: ''
                },
                options: {
                    dialogWidth: '800px',
                    inline: true
                }
            },

            supplierlinkman: {
                columns: [
                    { name: "name", label: _label("xingming"), class: "width2", width: 140 },
                    { name: "mobile", label: _label("shoujihao"), class: "width2", width: 120 },
                    { name: "email", label: _label("email"), class: "width2", is_hide: false },
                    { name: "fax", label: _label("chuanzhen"), class: "width2", width: 120, is_hide: true },
                    { name: "address", label: _label("dizhi"), class: "width1", is_hide: true },
                    { name: "gender", label: _label("xingbie"), type: "select", source: "gender2", class: "width2", width: 80 },
                    { name: "zipcode", label: _label("youbian"), class: "width2", width: 80, is_hide: true },
                    { name: "department", label: _label("bumen"), class: "width2", width: 140 },
                    { name: "phone", label: _label("zuoji"), class: "width2", width: 120, is_hide: true }
                ],
                controller: "supplierlinkman",
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
            suppliertype: ""
        }
    },
    methods: {
        onBeforeEdit(row) {
            let self = this
            self.supplierinvoice.base.supplierid = row.id
            self.supplierinvoice.columns[0].default = row.suppliername

            self.supplierbank.base.supplierid = row.id
            self.supplierbank.columns[0].default = row.suppliername

            self.supplieraddress.base.supplierid = row.id
            self.supplierlinkman.base.supplierid = row.id
            self.supplierlinkman.columns[4].default = row.address
                //self.supplieraddress.columns[0].default = row.suppliername
            self.id = row.id
        },
        onBeforeAdd() {
            let self = this
            self.activeName = 'info'
            self.id = 0
        },
        onTabClick() {},
        onChange(column, form) {
            let self = this

            if (column.name == 'suppliertype') {
                //客户
                if (!StringFunc.include(form.suppliertype, '2')) {
                    form.customtype = ""
                }
            }
            else if(column.name == 'countrycity') {
                //self._log(form.countrycity)
                let source = self._dataSource("country")
                source.getRow(form.countrycity).then(({row})=>{
                    //self._log(row.area_code)
                    if(form.phone=='') {
                        form.phone = row.area_code+"-"
                    }

                })
            }
        },
        isDisabled(column, form) {
            return column.name == 'customtype' && !StringFunc.include(form.suppliertype, 2);
        },
        onAfterUpdate() {
            this._dataSource("supplier").clear()
        }
    },
    mounted() {
        let self = this;
        self.initRules(Rules=>{
            let _label = self._label
            return {
                sizetopid: Rules.id({ required: true, message: _label("8000"), label:_label("chimazu") }),
                brandgroupid: Rules.id({ required: true, message: _label("8000"), label:_label("pinlei") }),
                childbrand: Rules.id({ required: true, message: _label("8000"), label:_label("zipinlei") }),
                brandid: Rules.id({ required: true, message: _label("8000"), label:_label("pinpai") }),
                brandcolor: Rules.required({ message: _label("8000"), label:_label("sexi") }),
                ageseason: Rules.required({ message: _label("8000"), label:_label("niandai") }),
                sizecontentids: Rules.required({ message: _label("8000"), label:_label("chimamingxi") })
            }
        })
    }
}
</script>
