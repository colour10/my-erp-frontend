<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth :auth="controller">
                    <as-button type="primary" @click="showFormToCreate()">{{_label("xinjian")}}</as-button>
                </auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <multiple-admin-tablelist ref="tablelist" :controller="controller" :key_column="key_column" :columns="columns" :buttons="buttons" :options="options" :base="base" :actions="actions" :onclickupdate="showFormToUpdate"></multiple-admin-tablelist>
            </el-col>
        </el-row>
        <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
            <el-row>
                <el-col :span="24">
                    <el-form ref="form" :model="form" label-width="100px" :inline="componenToptions.inline||false" :size="componenToptions.formSize||'medium'">
                        <template v-for="item in columns">
                            <template v-if="item.is_multiple">
                                <el-form-item :label="item.label+'('+language.shortName+')'" v-if="!item.is_edit_hide" v-for="language in languages" :key="language.code" :class="item.class?item.class:''">
                                    <el-input :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[getColumnName(item,language)]"></el-input>
                                </el-form-item>
                            </template>
                            <template v-if="!item.is_multiple">
                                <el-form-item :label="item.label" v-if="!item.is_edit_hide" :key="item.name" :class="item.class?item.class:''">
                                    <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[getColumnName(item)]"></el-input>
                                    <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1" inactive-value="0"></el-switch>
                                    <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" :lang="lang">
                                    </simple-select>
                                    <el-upload :ref="item.name" :action="'/common/upload?category='+controller" v-if="item.type=='upload'" :multiple="item.multiple || false" :limit="item.limit || 1" :on-success="getUploadSuccessCallback(item)" :on-remove="getRemoveUploadFileCallback(item)">
                                        <as-button size="small" type="primary">{{_label("shangchuan")}}</as-button>
                                    </el-upload>
                                </el-form-item>
                            </template>
                        </template>
                        <el-form-item>
                            <auth :auth="controller">
                                <as-button type="primary" @click="onSubmit">{{_label("baocun")}}</as-button>
                            </auth>
                            <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import globals, { _label } from './globals.js'

export default {
    name: 'multiple-admin-page',
    props: ['columns', "buttons", "options", "controller", "base", "key_column", "auto_hide", "actions"],
    components: {

    },
    data() {
        var form = {
            id: ""
        }

        var options = this.options || {}
        var base = this.base || {}

        var columns = this.columns
        var column;

        var languages = _label("list_languages");
        var keys = Object.keys(languages)
        for (var i = 0; i < columns.length; i++) {
            column = columns[i]
            if (column.is_multiple) {
                keys.forEach(function(code) {
                    form[column.name + "_" + code] = ""
                });
            } else {
                form[column.name] = ""
            }
        }
        //console.log(columns,form)

        return {
            dialogVisible: false,
            form: form,
            rowIndex: "",
            formTitle: "",
            lang: _label("lang"),
            componenToptions: options,
            languages: languages,
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        onSubmit() {
            var self = this;
            self.form.lang = self.lang;
            if (self.form.id == "") {
                self._submit("/" + self.controller + "/add", self.form).then(function() {
                    self.$refs.tablelist.appendRow(globals.clone(self.form))

                    if (self.auto_hide !== false) {
                        self.dialogVisible = false
                    }
                })
            } else {
                self._submit("/" + self.controller + "/edit", self.form).then(function() {
                    var row = self.$refs.tablelist.getRow(self.rowIndex)
                    globals.copyTo(self.form, row)
                    if (self.auto_hide !== false) {
                        self.dialogVisible = false
                    }
                })
            }
        },
        showFormToCreate() {
            var self = this;
            globals.empty(self.form)

            if (self.base) {
                Object.keys(self.base).forEach(function(key) {
                    self.form[key] = self.base[key]
                });
            }
            self.lang = _label("lang");
            self.showDialog(_label("tianjiaxinxi"));
        },
        showFormToUpdate(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;
            globals.copyTo(row, self.form);

            self.showDialog(_label("xiugaixinxi"));
        },
        getColumnName(column, language) {
            //this._log(column, language)
            return column.is_multiple ? column.name + "_" + language.code : column.name;
        },
        getUploadSuccessCallback(column) {
            var self = this;
            if (!column.success_callback) {
                console.log(column, "44")

                column.success_callback = function(response, file, fileList) {
                    //console.log(response["files"], file, fileList)                
                    file.name = response["files"][file.name]
                    self.form[column.name] = ""
                    self.form[column.name] += "," + file.name
                    self.form[column.name] = self.form[column.name].replace(/^,/, "")
                }
            }
            return column.success_callback
        },
        getRemoveUploadFileCallback(column) {
            var self = this;
            if (!column.remove_callback) {
                column.remove_callback = function(file, fileList) {
                    console.log(self.form[column.name], file.name)
                    self.form[column.name] = self.form[column.name].replace(file.name, "").replace(/^,/, "").replace(/,+/, ",").replace(/,+$/, "")
                }
            }
            return column.remove_callback

        },
        clearFiles() {
            var self = this;
            setTimeout(function() {
                //console.log(self.$refs) 
                var columns = self.columns;
                for (var i = 0; i < columns.length; i++) {
                    var column = columns[i]
                    var ele = self.$refs[column.name][0];

                    if (column.type == 'upload') {
                        ele.clearFiles();
                    }
                }
            }, 50)
        },
        showDialog(title) {
            var self = this;
            //console.log(title,"focus44")
            self.formTitle = title
            self.dialogVisible = true;
            setTimeout(function() {
                //console.log(self.$refs) 
                var is_focus_call = false;
                var columns = self.columns;
                for (var i = 0; i < columns.length; i++) {
                    var column = columns[i]
                    var refs = self.$refs[column.name];
                    if (refs && refs.length > 0) {
                        var ele = refs[0];

                        if (!is_focus_call && column.is_focus && !ele.disabled) {
                            //console.log(ele,"focus")
                            ele.focus();
                            is_focus_call = true;
                        }
                    }
                }
            }, 50)
        }
    },
    watch: {
        base: {
            handler: function(newValue, oldValue) {
                //console.log("change", newValue, oldValue)
                //this.loadList(function(){})
            },
            deep: true
        }
    },
    computed: {},
    mounted: function() {}
}
</script>
