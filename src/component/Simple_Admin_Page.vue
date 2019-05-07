<template>
    <div>
        <el-row>
            <el-col :span="24">
                <slot name="form">
                    <el-form class="searchform" ref="search-form" :model="form" label-width="80px" size="mini" :inline="true" @submit.native.prevent v-if="hideForm!==true">
                        <el-form-item class="searchitem">
                            <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch" v-if="isSubmit"></el-input>
                            <as-button type="primary" @click="onSearch" size="mini" v-if="isSubmit" icon="el-icon-search">{{_label("chaxun")}}</as-button>
                            <au-button :auth="authname" type="primary" @click="showFormToCreate()" v-if="hideCreate!==true">{{_label("xinjian")}}</au-button>
                        </el-form-item>
                    </el-form>
                    <au-button :auth="authname" type="primary" @click="showFormToCreate()" v-if="hideCreate!==true && hideForm===true">{{_label("xinjian")}}</au-button>
                </slot>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <sp-tablelist ref="tablelist" :controller="controller" :columns="columns" :actions="actions" :buttons="buttons" :options="options" :base="base" :authname="authname" :isedit="opt.isedit" :isdelete="opt.isdelete" :onclickupdate="showFormToEdit"></sp-tablelist>
            </el-col>
        </el-row>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :width="opt.dialogWidth||'450px'" :modal="false">
            <slot v-bind:form="form" v-bind:action="action" v-bind:columns="columns" name="default">
                <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="opt.inline===true" :size="opt.formSize||'mini'">
                    <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:'width2'" :disabled="checkDisabled(item)">                        
                        <sp-item-transform :ref="item.name" v-model="form[item.name]"  :column="item" :record="form" :option="opt"></sp-item-transform>
                    </el-form-item>
                </el-form>
            </slot>
            <el-row>
                <el-col :span="24" style="text-align:center;">
                    <au-button :auth="authname" type="primary" @click="onSubmit" style="margin:auto;" v-if="opt.isShowSubmit!==false">{{_label("baocun")}}</au-button>
                    <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import globals from './util/object.js'
import {label} from './application.js'
import ItemTransform from './itemTransform.js'
import mixin from './mixin.js'

export default {
    name: 'sp-page',
    props: ['columns', 'buttons', "options", "controller", "base", "auth", "hideCreate", 'hideForm', 'actions', "formTitle", "isDisabled"],
    components: {
        "sp-item-transform":ItemTransform
    },
    mixins:[mixin],
    data() {
        let self = this
        let form = {
            id: ""
        }

        let base = self.base || {}

        let opt = self.options || {};

        for (let i = 0; i < self.columns.length; i++) {
            form[self.columns[i].name] = ""
        }

        let authname = self.auth ? self.auth : self.controller

        return {
            dialogVisible: false,
            form: form,
            rowIndex: "",
            title: "",
            opt,
            authname: authname,
            searchform: {},
            action: "",
            isSubmiting:false
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

                column.trigger.forEach(name => {
                    //self._log(self.$refs[name])
                    self.$refs[name][0].load(value)
                })
            }
        },
        onSubmit() {
            let self = this;

            //self._log("是否正在提交",self.isSubmiting)
            if(self.isSubmiting==true) {
                return 
            }
            self.isSubmiting = true;

            let issubmit = self.isSubmit;
            let autoreload = self.isAutoReload;
            let autohide = self.isAutohide;
            let tablelist = self.$refs.tablelist

            if (self.action == "add" && self.form.id=='') {
                if (issubmit == false) {
                    tablelist.appendRow(globals.clone(self.form))
                    if (autohide) {
                        self.dialogVisible = false
                    } else {
                        self.action = 'edit'
                    }
                    self.isSubmiting = false;
                } else {
                    self._submit("/" + self.controller + "/add", self.form).then(function() {
                        if (autoreload == true) {
                            tablelist.loadList()
                        } else {
                            tablelist.appendRow(globals.clone(self.form))
                        }

                        if (autohide) {
                            self.dialogVisible = false
                        }
                        self.isSubmiting = false;
                    }).catch(()=>{
                        self.isSubmiting = false;
                    })
                }
            } else {
                if (issubmit == false) {
                    let row = tablelist.getRow(self.rowIndex)
                    globals.copyTo(self.form, row)

                    if (autohide) {
                        self.dialogVisible = false
                    }
                    self.isSubmiting = false;
                } else {
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
                        self.isSubmiting = false;
                    }).catch(()=>{
                        self.isSubmiting = false;
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
            self.$emit("before-add")

            self.showDialog(self.getTitle(label("tianjiaxinxi")));
        },
        showFormToEdit(rowIndex, row) {
            let self = this
            self.rowIndex = rowIndex;
            globals.copyTo(row, this.form)
            self.action = "edit"
            self.$emit("before-edit", row)
            //self._log("beforeedit")

            self.showDialog(self.getTitle(label("xiugaixinxi"), row));
        },
        getTitle(defaultTitle, row) {
            let self = this;
            let title = ""
            if (typeof(self.formTitle) == 'function') {
                title = self.formTitle(row)
            }

            return title || defaultTitle;
        },
        showDialog(formTitle) {
            let self = this;
            self.title = formTitle;
            self.dialogVisible = true;
            setTimeout(function() {
                //console.log(self.$refs)
                let columns = self.columns;
                for (let i = 0; i < columns.length; i++) {
                    let column = columns[i]
                    if (column.is_edit_hide != true && self.$refs[column.name]) {
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
        setTableData(data) {
            return this.$refs.tablelist.setTableData(data);
        },
        checkDisabled(column) {
            let self = this
            if (typeof(self.isDisabled) == 'function') {
                return self.isDisabled(column, self.action)
            } else {
                return false;
            }
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
    computed: {        
        isSubmit() {
            return this.opt.issubmit || true
        },
        isAutohide() {
            return this.opt.autohide || false
        },
        isAutoReload() {
            return this.opt.autoreload || true
        }
    },
    mounted: function() {}
}
</script>
