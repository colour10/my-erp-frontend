<template>
    <div>
        <el-row>
            <el-col :span="24">
                <slot name="form">
                    <el-form ref="search-form" :model="form" label-width="80px" size="mini" :inline="true" @submit.native.prevent>
                        <el-row :gutter="0">
                            <el-col :span="24">
                                <el-form-item>
                                    <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch"></el-input>
                                    <as-button type="primary" @click="onSearch" size="mini" icon="el-icon-search">{{_label("chaxun")}}</as-button>
                                    <au-button :auth="controller" type="primary" @click="showFormToCreate()">{{_label("xinjian")}}</au-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                </slot>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <multiple-admin-tablelist ref="tablelist" :controller="controller" :key_column="key_column" :columns="columns" :buttons="buttons" :options="options" :base="base" :actions="actions" :onclickupdate="showFormToUpdate">
                </multiple-admin-tablelist>
            </el-col>
        </el-row>
        <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="option('dialogWidth')" :modal="false">
            <el-row>
                <el-col :span="24">
                    <el-form ref="form" class="user-form" :model="form" label-width="100px" :inline="option('inline')" :size="option('formSize')">
                        <template v-for="item in columns">
                            <template v-if="item.is_multiple">
                                <el-form-item :label="item.label+'('+language.shortName+')'" v-if="!item.is_edit_hide" v-for="language in languages" :key="language.code" :class="item.class?item.class:'width2'">
                                    <el-input :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[getColumnName(item,language)]"></el-input>
                                </el-form-item>
                            </template>
                            <template v-if="!item.is_multiple">
                                <el-form-item :label="item.label" v-if="!item.is_edit_hide" :key="item.name" :class="item.class?item.class:'width2'">
                                    <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[getColumnName(item)]"></el-input>
                                    <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1" inactive-value="0"></el-switch>
                                    <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" :lang="lang">
                                    </simple-select>
                                    <el-upload :ref="item.name" :action="'/common/upload?category='+controller" v-if="item.type=='upload'" :multiple="item.multiple || false" :limit="item.limit || 1" :on-success="getUploadSuccessCallback(item)" :on-remove="getRemoveUploadFileCallback(item)">
                                        <as-button size="small" type="primary">{{_label("shangchuan")}}</as-button>
                                    </el-upload>

                                    <simple-avatar :ref="item.name" v-model="form[item.name]" font-size="14px" :size="35" v-if="item.type=='avatar'"></simple-avatar>
                                    <brandgroupchild :ref="item.name" v-model="form[item.name]" v-if="item.type=='brandgroupchild'"></brandgroupchild>
                                </el-form-item>
                            </template>
                        </template>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="text-align:center;">
                    <au-button :auth="controller" type="primary" @click="onSubmit">{{_label("baocun")}}</au-button>
                    <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import globals, { _label } from './globals.js'

export default {
    name: 'multiple-admin-page',
    props: {
        columns: {},
        buttons: {},
        options: {},
        controller: {},
        base: {},
        key_column: {},
        actions: {}
    },
    data() {
        let form = {
            id: ""
        }

        let componenToptions = (function({inline=false,dialogWidth='400px',formSize='mini',issubmit=true, isdelete, autoreload=true, autohide=false}={}){return {inline,isdelete,dialogWidth,issubmit,formSize,autoreload,autohide}})(self.options)

        let base = this.base || {}

        let columns = this.columns
        let column;

        let languages = _label("languages");
        let keys = Object.keys(languages)
        for (let i = 0; i < columns.length; i++) {
            column = columns[i]
            if (column.is_multiple) {
                keys.forEach(function(code) {
                    form[column.name + "_" + code] = column.default || ""
                });
            } else {
                form[column.name] = column.default || ""
            }
        }
        //console.log(columns,form)

        return {
            searchform: {},
            dialogVisible: false,
            form: form,
            rowIndex: "",
            formTitle: "",
            lang: _label("lang"),
            componenToptions,
            languages: languages,
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },

        option(name){
            return this.componenToptions[name]
        },
        onSubmit() {
            let self = this;
            self.form.lang = self.lang;
            if (self.form.id == "") {
                self._submit("/" + self.controller + "/add", self.form).then(function() {
                    if(self.option('autoload')) {
                        self.$refs.tablelist.loadList()
                    }
                    else {
                        self.$refs.tablelist.appendRow(globals.clone(self.form))
                    }                    

                    if (self.option('autohide') !== false) {
                        self.dialogVisible = false
                    }
                })
            } else {
                self._submit("/" + self.controller + "/edit", self.form).then(function() {
                    if(self.option('autoload')) {
                        self.$refs.tablelist.loadList()
                    }
                    else {
                        let row = self.$refs.tablelist.getRow(self.rowIndex)
                        globals.copyTo(self.form, row)
                    }
                    
                    if (self.option('autohide') !== false) {
                        self.dialogVisible = false
                    }
                })
            }
        },
        onSearch() {
            let self = this
            self._log(self.searchform)
            self.$refs.tablelist.search(self.searchform)
        },
        showFormToCreate() {
            let self = this;
            globals.empty(self.form)
            //self._log('ddddddddddddd')

            //设置初始化
            let columns = self.columns
            let keys = Object.keys(self.languages)
            for (let i = 0; i < columns.length; i++) {
                let column = columns[i]
                if (column.is_multiple) {
                    keys.forEach(function(code) {
                        self.form[column.name + "_" + code] = column.default || ""
                    });
                } else {
                    self.form[column.name] = column.default || ""
                }
            }

            if (self.base) {
                Object.keys(self.base).forEach(function(key) {
                    self.form[key] = self.base[key]
                });
            }
            self.lang = _label("lang");
            self.showDialog(_label("tianjiaxinxi"));
        },
        showFormToUpdate(rowIndex, row) {
            let self = this
            self.rowIndex = rowIndex;
            globals.copyTo(row, self.form);

            self.showDialog(_label("xiugaixinxi"));
        },
        getColumnName(column, language) {
            //this._log(column, language)
            return column.is_multiple ? column.name + "_" + language.code : column.name;
        },
        getUploadSuccessCallback(column) {
            let self = this;
            if (!column.success_callback) {
                //console.log(column, "44")

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
            let self = this;
            if (!column.remove_callback) {
                column.remove_callback = function(file, fileList) {
                    console.log(self.form[column.name], file.name)
                    self.form[column.name] = self.form[column.name].replace(file.name, "").replace(/^,/, "").replace(/,+/, ",").replace(/,+$/, "")
                }
            }
            return column.remove_callback

        },
        clearFiles() {
            let self = this;
            setTimeout(function() {
                //console.log(self.$refs) 
                let columns = self.columns;
                for (let i = 0; i < columns.length; i++) {
                    let column = columns[i]
                    let ele = self.$refs[column.name][0];

                    if (column.type == 'upload') {
                        ele.clearFiles();
                    }
                }
            }, 50)
        },
        showDialog(title) {
            let self = this;
            //console.log(title,"focus44")
            self.formTitle = title
            self.dialogVisible = true;
            setTimeout(function() {
                //console.log(self.$refs) 
                let is_focus_call = false;
                let columns = self.columns;
                for (let i = 0; i < columns.length; i++) {
                    let column = columns[i]
                    let refs = self.$refs[column.name];
                    if (refs && refs.length > 0) {
                        let ele = refs[0];

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
