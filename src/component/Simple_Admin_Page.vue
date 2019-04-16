<template>
    <div>
        <el-row>
            <el-col :span="2">
                <auth :auth="authname">
                    <el-button type="primary" @click="showFormToCreate()" v-if="hideCreate!==true">{{_label("xinjian")}}</el-button>
                </auth>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <simple-admin-tablelist ref="tablelist" :controller="controller" :columns="columns" :actions="actions" :buttons="buttons" :options="options" :base="base" :authname="authname" :isedit="componenToptions.isedit" :isdelete="componenToptions.isdelete" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
            </el-col>
        </el-row>
        <el-dialog :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
            <el-row>
                <el-col :span="24" class="user-form">
                    <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="componenToptions.inline||false" :size="componenToptions.formSize||'mini'">
                        <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:''">
                            <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]"></el-input>
                            <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1" inactive-value="0"></el-switch>
                            <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" :lang="lang"></simple-select>
                            <el-date-picker :ref="item.name" v-if="item.type=='date'" v-model="form[item.name]" type="date" value-format="yyyy-MM-dd" placeholder=""></el-date-picker>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="text-align:center;">
                    <auth :auth="authname">
                        <el-button type="primary" @click="onSubmit" style="margin:auto;">{{_label("baocun")}}</el-button>
                    </auth>
                    <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
import globals,{_label} from './globals.js'

export default {
    name: 'simple-admin-page',
    props: ['columns', 'buttons', "options", "controller", "base", "auth", "hideCreate",'actions'],
    components: {

    },
    data() {
        let self = this
        var form = {
            id: ""
        }

        var options = self.options || {}
        var base = self.base || {}

        for (var i = 0; i < self.columns.length; i++) {
            form[self.columns[i].name] = ""
        }

        let authname = self.auth ? self.auth : self.controller

        return {
            dialogVisible: false,
            form: form,
            rowIndex: "",
            formTitle: "",
            lang: _label("lang"),
            componenToptions: options,
            authname: authname
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
                    if(self.componenToptions.autoreload==true) {
                        self.$refs.tablelist.loadList()
                    }
                    else {
                        self.$refs.tablelist.appendRow(globals.clone(self.form))
                    }                    

                    if (self.auto_hide !== false) {
                        self.dialogVisible = false
                    }
                })
            } else {
                self._submit("/" + self.controller + "/edit", self.form).then(function() {                    
                    if(self.componenToptions.autoreload==true) {
                        self.$refs.tablelist.loadList()
                    }
                    else {
                        let row = self.$refs.tablelist.getRow(self.rowIndex)
                        globals.copyTo(self.form, row)
                    }

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

            self.showDialog(_label("tianjiaxinxi"));
        },
        showFormToEdit(rowIndex, row) {
            var self = this
            self.rowIndex = rowIndex;
            globals.copyTo(row, this.form)

            self.showDialog(_label("xiugaixinxi"));
        },
        showDialog(formTitle) {
            var self = this;
            this.formTitle = formTitle;
            self.dialogVisible = true;
            setTimeout(function() {
                //console.log(self.$refs)
                var columns = self.columns;
                for (var i = 0; i < columns.length; i++) {
                    var column = columns[i]
                    if (column.is_edit_hide != true) {
                        var ele = self.$refs[column.name][0];

                        if (column.is_focus && !ele.disabled) {
                            console.log(ele)
                            ele.focus();
                            break;
                        }
                    }
                }
            }, 50)
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
