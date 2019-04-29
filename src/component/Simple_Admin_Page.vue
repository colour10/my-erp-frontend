<template>
    <div>
        <el-row>
            <el-col :span="24">
                <slot name="form">
                    <el-form class="searchform" ref="search-form" :model="form" label-width="80px" size="mini" :inline="true" @submit.native.prevent v-if="hideForm!==true">
                        <el-form-item class="searchitem">
                            <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch" v-if="componenToptions.issubmit"></el-input>
                            <as-button type="primary" @click="onSearch" size="mini" v-if="componenToptions.issubmit"icon="el-icon-search">{{_label("chaxun")}}</as-button>
                            <au-button :auth="authname" type="primary" @click="showFormToCreate()" v-if="hideCreate!==true">{{_label("xinjian")}}</au-button>
                        </el-form-item>
                    </el-form>

                    <au-button :auth="authname" type="primary" @click="showFormToCreate()" v-if="hideCreate!==true && hideForm===true">{{_label("xinjian")}}</au-button>
                </slot>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" :controller="controller" :columns="columns" :actions="actions" :buttons="buttons" :options="options" :base="base" :authname="authname" :isedit="componenToptions.isedit" :isdelete="componenToptions.isdelete" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <el-dialog :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth" :modal="false">
            <el-row>
                <el-col :span="24" class="user-form">
                    <slot v-bind:form="form">
                    <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="componenToptions.inline" :size="componenToptions.formSize">
                        <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:'width2'">
                            <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" size="mini"></el-input>
                            <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1" inactive-value="0"></el-switch>
                            <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" :lang="lang" @change="onChange(item)"></simple-select>
                            <el-date-picker :ref="item.name" v-if="item.type=='date'" v-model="form[item.name]" type="date" value-format="yyyy-MM-dd" placeholder=""></el-date-picker>
                        </el-form-item>
                    </el-form>
                    </slot>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="text-align:center;">
                    <au-button :auth="authname" type="primary" @click="onSubmit" style="margin:auto;">{{_label("baocun")}}</au-button>
                    <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import globals, { _label } from './globals.js'
import Bus from './bus.js'

export default {
    name: 'simple-admin-page',
    props: ['columns', 'buttons', "options", "controller", "base", "auth", "hideCreate", 'hideForm', 'actions'],
    components: {

    },
    data() {
        let self = this
        let form = {
            id: ""
        }

        let base = self.base || {}

        let componenToptions = (function({inline=false,dialogWidth='450px',formSize='mini',issubmit=true, isdelete, autoreload=true, autohide=false}={}){return {inline,isdelete,dialogWidth,issubmit,formSize,autoreload,autohide}})(self.options)
           

        for (let i = 0; i < self.columns.length; i++) {
            form[self.columns[i].name] = ""
        }

        let authname = self.auth ? self.auth : self.controller

        return {
            dialogVisible: false,
            form: form,
            rowIndex: "",
            formTitle: "",
            lang: _label("lang"),
            componenToptions,
            authname: authname,
            searchform:{},
            action:""
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        onSearch() {
            let self = this
            //self._log(self.searchform)
            self.$refs.tablelist.search(self.searchform)
        },
        onChange(column) {
            let self = this;
            self._log(column)

            if (column.trigger) {
                let value = self.form[column.name]

                column.trigger.forEach(name=>{
                    self._log(self.$refs[name])
                    self.$refs[name][0].load(value)
                })                
            }
        },
        onSubmit() {
            let self = this;
            let issubmit = self.componenToptions.issubmit;
            let autoreload = self.componenToptions.autoreload;
            let autohide = self.componenToptions.autohide;
            let tablelist = self.$refs.tablelist

            self.form.lang = self.lang;
            if (self.action == "add") {
                if(issubmit==false) {
                    tablelist.appendRow(globals.clone(self.form))
                    if (autohide) {
                        self.dialogVisible = false
                    }
                    else {
                        self.action = 'edit'
                    }
                }
                else {
                    self._submit("/" + self.controller + "/add", self.form).then(function() {
                        if (autoreload == true) {
                            tablelist.loadList()
                        } else {
                            tablelist.appendRow(globals.clone(self.form))
                        }

                        if (autohide) {
                            self.dialogVisible = false
                        }
                    })
                }                
            } else {
                if(issubmit==false) {
                    let row = tablelist.getRow(self.rowIndex)
                    globals.copyTo(self.form, row)

                    if (autohide) {
                        self.dialogVisible = false
                    }
                }
                else {
                    self._submit("/" + self.controller + "/edit", self.form).then(function() {
                        if (autoreload == true) {
                            tablelist.loadList()
                        } else {
                            let row = tablelist.getRow(self.rowIndex)
                            globals.copyTo(self.form, row)
                        }

                        if (autohide) {
                            self.dialogVisible = false
                        }
                    })
                }
            }

        },
        showFormToCreate() {
            let self = this;
            globals.empty(self.form)

            for (let i = 0; i < self.columns.length; i++) {
                self.form[self.columns[i].name] = self.columns[i].default || ""
            }

            if (self.base) {
                Object.keys(self.base).forEach(function(key) {
                    self.form[key] = self.base[key]
                });
            }

            self.action = "add"
            self.showDialog(_label("tianjiaxinxi"));
        },
        showFormToEdit(rowIndex, row) {
            let self = this
            self.rowIndex = rowIndex;
            globals.copyTo(row, this.form)
            self.action = "edit"

            self.showDialog(_label("xiugaixinxi"));
        },
        showDialog(formTitle) {
            let self = this;
            this.formTitle = formTitle;
            self.dialogVisible = true;
            setTimeout(function() {
                //console.log(self.$refs)
                let columns = self.columns;
                for (let i = 0; i < columns.length; i++) {
                    let column = columns[i]
                    if (column.is_edit_hide != true) {
                        let ele = self.$refs[column.name][0];

                        if (column.is_focus && !ele.disabled) {
                            //console.log(ele)
                            ele.focus();
                            break;
                        }
                    }
                }
            }, 50)
        },
        getTableData() {
            return this.$refs.tablelist.getTableData();
        },
        setTableData(data){
            return this.$refs.tablelist.setTableData(data);
        }
    },
    watch: {
        base: {
            handler: function(newValue, oldValue) {
                //console.log("change",newValue,oldValue)
            },
            deep: true
        }
    },
    computed: {},
    mounted: function() {}
}
</script>
