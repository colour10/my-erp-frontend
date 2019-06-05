<template>
    <div style="width:99%">
        <multiple-admin-page v-bind="props" ref="page" class="product" @before-edit="onBeforeEdit" @before-add="onBeforeAdd">
            <template v-slot="{form,columns}">
                <el-tabs type="border-card" v-model="activeName" @tab-click="onTabClick">
                    <el-tab-pane :label="_label('jibenziliao')" name="info">
                        <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="false" size="mini">
                            <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:'width2'">
                                <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" size="mini"></el-input>
                                <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source"></simple-select>
                                <simple-avatar :ref="item.name" v-model="form[item.name]" v-if="item.type=='avatar'" font-size="14px" :size="35"></simple-avatar>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('bieming')" name="aliases" :disabled="id==0">
                        <multiple-admin-page v-bind="aliases"></multiple-admin-page>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('xilie')" name="xilie" :disabled="id==0">
                        <multiple-admin-page v-bind="series"></multiple-admin-page>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('beilv')" name="beilv" :disabled="id==0">
                        <simple-admin-page v-bind="brandrate">
                            <template v-slot="scope">
                                <el-form class="user-form" :model="scope.form" label-width="100px" :inline="false" size="mini">
                                    <el-form-item :label="_label('pinlei')">
                                        <simple-select v-show="scope.action=='add'" v-model="scope.form.brandgroupid" source="brandgroup" :multiple="true" class="width2"></simple-select>
                                        <simple-select v-show="scope.action=='edit'" v-model="scope.form.brandgroupid" source="brandgroup" class="width2"></simple-select>
                                    </el-form-item>

                                    <el-form-item :label="_label('niandaijijie')">
                                        <simple-select v-model="scope.form.ageseasonid" source="ageseason" class="width2"></simple-select>
                                    </el-form-item>

                                    <el-form-item :label="_label('beilv')">
                                        <el-input @keyup.enter.native="onSubmit" v-model="scope.form.rate" size="mini" class="width2"></el-input>
                                    </el-form-item>
                                </el-form>
                            </template>
                        </simple-admin-page>
                    </el-tab-pane>
                    <el-tab-pane :label="_label('jiageshezhi')" name="price" :disabled="id==0">
                        <sp-pricesetting :brandid="id"></sp-pricesetting>
                    </el-tab-pane>
                </el-tabs>
            </template>
        </multiple-admin-page>
    </div>
</template>

<script>
import { _label, getAvailableHeight } from '../globals.js'
import { getProp } from "../prop.js"


const base = {
    brandid: "",
    visible: false
}

export default {
    name: 'sp-brand',
    data() {
        let self = this;

        return {
            brandrate: getProp('brandrate'),
            aliases: getProp('aliases'),
            series: getProp('series'),
            activeName: "info",
            props: {
                columns: [
                    { name: "filename", label: "LOGO", type: "avatar", is_image: true, image_width: 50, image_height: 50, width: 55, className: "picture" },
                    { name: "name_en", label: _label('pinpaimingcheng'), is_multiple: false, is_focus: true },
                    { name: "countryid", label: _label('guishuguojia'), type: "select", source: "country" },
                    { name: "memo", label: _label('memo'), type: "textarea", is_hide: true },
                    { name: "officialwebsite", label: _label('guanwangdizhi'), is_hide: true }
                ],
                options: {
                    tableHeight: getAvailableHeight(),
                    dialogWidth: '1000px',
                    //formSize: 'small',
                    //inline: false,
                    isShowSubmit: true
                },
                controller: "brand",
                key_column: "name",
                base: {
                    brandid: ""
                },
                formTitle: function(row) {
                    if (row && row.id > 0) {
                        return row.name_en
                    }
                }
            },
            id: 0
        }
    },
    methods: {
        onBeforeEdit(row) {
            let self = this
                //this._log("onBeforeEdit", row)
            self.brandrate.base.brandid = row.id
            self.aliases.base.brandid = row.id
            self.series.base.brandid = row.id
            self.id = row.id
        },
        onBeforeAdd() {
            let self = this
            self.activeName = 'info'
            self.id = 0
        },
        onTabClick(tab) {
            let self = this;
            self.activeName = tab.name;
            self.props.options.isShowSubmit = tab.name == 'info'
        }
    },
    mounted: function() {}
}
</script>
