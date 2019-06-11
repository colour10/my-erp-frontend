<template>
    <div>
        <el-row>
            <el-col :span="24">
                <slot name="form">
                    <el-form class="searchform" ref="search-form" :model="form" label-width="80px" size="mini" :inline="true" @submit.native.prevent v-if="isButtonShow({action:'search'})">
                        <el-form-item class="searchitem">
                            <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch"></el-input>
                            <el-button type="primary" @click="onSearch" size="mini" v-if="isButtonShow({action:'search'})" icon="el-icon-search">{{_label("chaxun")}}</el-button>
                            <el-button type="primary" @click="showFormToCreate()" v-if="isButtonShow({action:'add'})">{{_label("xinjian")}}</el-button>
                        </el-form-item>
                    </el-form>
                    <el-button type="primary" size="mini" @click="showFormToCreate()" v-if="!isButtonShow({action:'search'}) && isButtonShow({action:'add'})">{{_label("xinjian")}}</el-button>
                    <el-button :type="item.type || 'primary'" @click="onClickButton(item)" size="mini" v-for="item in buttons" :key="item.label" v-if="isButtonShow({action:item.name})">{{item.label}}</el-button>
                </slot>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <slot name="tablelist" v-bind:props="$props">
                    <sp-tablelist ref="tablelist" v-bind="$props" @before-edit="showFormToEdit"></sp-tablelist>
                </slot>
            </el-col>
        </el-row>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :width="dialogWidth" :modal="false">
            <slot v-bind:form="form" v-bind:action="action" v-bind:columns="columns" name="default">
                <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="inline" :size="formSize">
                    <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:'width2'" :disabled="checkDisabled(item)">
                        <slot :name="item.name" v-bind:form="form">
                            <sp-item-transform :ref="item.name" v-model="form[item.name]"  :column="item" :record="form" :option="option"></sp-item-transform>
                        </slot>
                    </el-form-item>
                </el-form>
            </slot>
            <el-row>
                <el-col :span="24" style="text-align:center;">
                    <el-button type="primary" size="mini" @click="onSubmit" style="margin:auto;" v-if="isButtonShow({action:'edit'})">{{_label("baocun")}}</el-button>
                    <el-button type="primary" size="mini" @click="onQuit" v-if="isButtonShow({action:'quit'})">{{_label("tuichu")}}</el-button>
                </el-col>
            </el-row>
        </el-dialog>
    </div>
</template>



<script>
import {clone,copyTo,empty} from './util/object.js'
import ItemTransform from './itemTransform.js'
import {log,ajax,label} from './mixin/'

export default {
    name: 'sp-page',
    //props: [ "formTitle", "isDisabled"],
    props:{
        columns:Array, 
        buttons:Array, 
        controller:String, 
        base:{
            type:[Object], 
            default:function(){
                return {}
            }
        }, 
        option:{
            type:Object,
            default:function(){
                return {}
            }
        }, 
        actions:Array, 
        model:String,
        isSubmit:{
            type:Boolean,
            default:true
        },
        isAction:{
            type:Boolean,
            default:true
        },
        actionWidth:{
            type:Number,
            default:180
        },
        actionName:{
            type:String,
            default:"page"
        },
        isShow:Function,
        height:Number,
        inline:Boolean,
        formSize:{
            type:String,
            default:'mini'
        },
        dialogWidth:{
            type:String,
            default:'450px'
        },
        isAutoHide:{
            type:Boolean,
            default:true
        },
        isAutoReload:{
            type:Boolean,
            default:false
        },
        formTitle:Function,
        isDisable:Function,
        isCheckbox:{
            type:Boolean,
            default:true
        }
    },
    components: {
        "sp-item-transform":ItemTransform
    },
    mixins:[log,ajax,label],
    data() {
        let self = this
        let form = {
            id: ""
        }
        self.columns.forEach(column=>form[column.name]='')

        return {
            dialogVisible: false,
            form: form,
            rowIndex: "",
            title: "",
            searchform: {},
            action: "",
            isSubmiting:false
        }
    },
    methods: {
        onQuit() {
            this.dialogVisible = false
        },
        isButtonShow(scope) {
            if (typeof(this.isShow)=='function') {
                return this.isShow(scope)
            } else {
                return true;
            }
        },
        onSearch() {
            let self = this
                //self._log(self.searchform)
            self.$refs.tablelist.search(self.searchform)
        },
        onChange(column) {
            let self = this;
            //self._log(column)

            if (column.trigger) {
                let value = self.form[column.name]

                column.trigger.forEach(name => {
                    //self._log(self.$refs[name])
                    self.$refs[name][0].load(value)
                })
            }
        },
        onClickButton(buttion) {
            let self = this

            buttion.click({vm:self, selected:self.table.getSelectValues(), table:self.table})
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
            let autohide = self.isAutoHide;
            let tablelist = self.table

            if (self.action == "add" && self.form.id=='') {
                if (issubmit == false) {
                    tablelist.appendRow(clone(self.form))
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
                            tablelist.appendRow(clone(self.form))
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
                    copyTo(self.form, row)

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
                            copyTo(self.form, row)
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
            empty(self.form)

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

            self.showDialog(self.getTitle(self._label("xinjian")));
        },
        showFormToEdit({rowIndex, row}) {
            let self = this
            self.rowIndex = rowIndex;
            copyTo(row, this.form)
            self.action = "edit"
            self.$emit("before-edit", row)
            //self._log("beforeedit")

            self.showDialog(self.getTitle(self._label("bianji"), row));
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
            if (typeof(self.isDisable) == 'function') {
                return self.isDisable(column, self.action)
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
    computed:{
        table() {
            return this.$refs.tablelist
        }
    }
}
</script>
