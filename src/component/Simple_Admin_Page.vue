<template>
  <div>
    <el-row>
      <el-col :span="24">
        <slot name="form">
          <el-form class="searchform" ref="search-form" :model="form" label-width="80px" size="mini" :inline="true"
                   @submit.native.prevent v-if="opt.isSearch!==false">
            <el-form-item class="searchitem">
              <el-input v-model="searchform.keyword" width="250" style="width:250px;" @keyup.enter.native="onSearch"
                        v-if="isSubmit"></el-input>
              <as-button type="primary" @click="onSearch" size="mini" v-if="isSubmit" icon="el-icon-search">
                {{_label("chaxun")}}
              </as-button>
              <asa-button :enable="_isAllowed(authname)" @click="showFormToCreate()" v-if="isAdd()!==false">
                {{_label("xinjian")}}
              </asa-button>
            </el-form-item>
          </el-form>
          <asa-button :enable="_isAllowed(authname)" @click="showFormToCreate()"
                      v-if="isAdd()!==false && opt.isSearch===false">{{_label("xinjian")}}
          </asa-button>
        </slot>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <simple-admin-tablelist ref="tablelist" v-bind="$options.propsData" :isedit="opt.isedit"
                                :isdelete="opt.isdelete" :onclickupdate="showFormToEdit"
                                @after-delete="$emit('after-delete')">
          <template v-if="isExpand" v-slot:expand="scope">
            <slot name="expand" v-bind="scope"></slot>
          </template>

          <template v-slot:[item.name]="scope" v-for="item in columns">
            <slot :name="item.slotName || item.name" v-bind:row="scope.row"></slot>
          </template>
        </simple-admin-tablelist>
      </el-col>
    </el-row>

    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      :center="true"
      :width="opt.dialogWidth||'450px'"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal="false">
      <slot v-bind:form="form" v-bind:action="action" v-bind:columns="columns" name="default">
        <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="opt.inline===true"
                 :size="opt.formSize||'mini'">
          <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name"
                        :class="item.class?item.class:'width2'" :disabled="checkDisabled(item)">
            <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'"
                      v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" size="mini"
                      :disabled="checkDisabled(item)"></el-input>
            <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1"
                       inactive-value="0" :disabled="checkDisabled(item)"></el-switch>
            <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source"
                           :lang="lang" @change="onChange(item)" :disabled="checkDisabled(item)"
                           :multiple="item.multiple||false"></simple-select>
            <el-date-picker :ref="item.name" v-if="item.type=='date'" v-model="form[item.name]" type="date"
                            value-format="yyyy-MM-dd" placeholder="" :disabled="checkDisabled(item)"></el-date-picker>
            <brandgroupchild :ref="item.name" v-model="form[item.name]"
                             v-if="item.type=='brandgroupchild'"></brandgroupchild>
            <simple-avatar :ref="item.name" v-model="form[item.name]" v-if="item.type=='avatar'" font-size="14px"
                           :size="35"></simple-avatar>
            <colorselect :ref="item.name" v-model="form[item.name]" v-if="item.type=='colorselect'"></colorselect>
          </el-form-item>
        </el-form>
      </slot>
      <el-row>
        <el-col :span="24" style="text-align:center;">
          <asa-button :enable="_isAllowed(authname)" @click="onSubmit" style="margin:auto;"
                      v-if="opt.isShowSubmit!==false">{{_label("baocun")}}
          </asa-button>
          <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
    import globals, {_label} from './globals.js'
    import {autoCall} from './function.js';

    export default {
        name: 'simple-admin-page',
        props: ['columns', 'buttons', "options", "controller", "base", "auth", "hideCreate", 'actions', "formTitle", "isExpand", "isDisabled"],
        components: {},
        data() {
            let self = this;
            let form = {
                id: "",
            };

            let base = self.base || {};
            let opt = self.options || {};
            // self._log(opt, "opt")
            opt.isAutohide = typeof (opt.isAutohide) == 'undefined' ? true : opt.isAutohide;
            opt.isAutoReload = typeof (opt.isAutoReload) == 'undefined' ? false : opt.isAutoReload;

            for (let column of self.columns) {
                form[column.name] = "";
            }

            let authname = self.auth || self.controller;

            return {
                dialogVisible: false,
                form: form,
                rowIndex: "",
                title: "",
                lang: _label("lang"),
                opt,
                authname,
                searchform: {},
                action: "",
                isSubmiting: false,
            };
        },
        methods: {
            isAdd() {
                return autoCall(this.opt.isAdd);
            },
            onQuit() {
                this.dialogVisible = false;
            },
            onSearch() {
                let self = this;
                //self._log(self.searchform)
                self.$refs.tablelist.search(self.searchform);
            },
            onChange(column) {
                let self = this;
                //self._log(column)

                if (column.trigger) {
                    let value = self.form[column.name];

                    for (let name of column.trigger) {
                        self.$refs[name][0].load(value);
                    }
                }
            },

            //数据校验
            doValidate() {
                const self = this;
                const messages = [];

                for (let column of self.columns) {
                    if (column.required === true && self.form[column.name] == '') {
                        messages.push(column.label + '不能为空');
                    }
                }

                if (messages.length > 0) {
                    self.showErrors(messages);
                    return false;
                }

                return true;
            },
            onSubmit() {
                let self = this;

                // 数据校验
                if (self.doValidate() == false) {
                    return;
                }

                //self._log("是否正在提交",self.isSubmiting)
                if (self.isSubmiting == true) {
                    return;
                }
                self.isSubmiting = true;

                let opt = self.opt;
                let isSubmit = opt.isSubmit;
                let isAutoReload = opt.isAutoReload;
                let isAutohide = opt.isAutohide;
                let tablelist = self.$refs.tablelist;

                self.form.lang = self.lang;
                if (self.action == "add" && self.form.id == '') {
                    if (isSubmit == false) {
                        tablelist.appendRow(globals.clone(self.form));
                        if (isAutohide) {
                            self.dialogVisible = false;
                        } else {
                            self.action = 'edit';
                        }
                        self.isSubmiting = false;
                    } else {
                        self._submit("/" + self.controller + "/add", self.form).then(function () {
                            if (isAutoReload == true) {
                                tablelist.loadList();
                            } else {
                                tablelist.appendRow(globals.clone(self.form));
                            }

                            if (isAutohide) {
                                self.dialogVisible = false;
                            }
                            self.$emit("after-add");
                            self.$emit("after-update");
                            self.isSubmiting = false;
                        }).catch(() => {
                            self.isSubmiting = false;
                        })
                    }
                } else {
                    if (isSubmit == false) {
                        let row = tablelist.getRow(self.rowIndex);
                        globals.copyTo(self.form, row);

                        if (isAutohide) {
                            self.dialogVisible = false;
                        }
                        self.isSubmiting = false;
                    } else {
                        self._submit("/" + self.controller + "/edit", self.form).then(function () {
                            if (isAutoReload == true) {
                                tablelist.loadList();
                            } else {
                                let row = tablelist.getRow(self.rowIndex);
                                globals.copyTo(self.form, row);
                            }

                            if (isAutohide) {
                                self.dialogVisible = false;
                            }
                            self.$emit("after-edit");
                            self.$emit("after-update");
                            self.isSubmiting = false;
                        }).catch(() => {
                            self.isSubmiting = false;
                        })
                    }
                }
            },
            showFormToCreate() {
                let self = this;
                globals.empty(self.form);

                for (let i = 0; i < self.columns.length; i++) {
                    self.form[self.columns[i].name] = self.columns[i].default || "";
                }

                if (self.base) {
                    Object.keys(self.base).forEach(function (key) {
                        self.form[key] = self.base[key];
                    });
                }

                self.action = "add";
                self.$emit("before-add");

                self.showDialog(self.getTitle(_label("tianjiaxinxi")));
            },
            showFormToEdit(rowIndex, row) {
                let self = this
                self.rowIndex = row.id;
                globals.copyTo(row, this.form)
                self.action = "edit"
                self.$emit("before-edit", row)
                //self._log("beforeedit")

                self.showDialog(self.getTitle(_label("xiugaixinxi"), row));
            },
            getTitle(defaultTitle, row) {
                let self = this;
                let title = "";
                if (typeof (self.formTitle) == 'function') {
                    title = self.formTitle(row);
                }

                return title || defaultTitle;
            },
            showDialog(formTitle) {
                let self = this;
                self.title = formTitle;
                self.dialogVisible = true;
                setTimeout(function () {
                    //console.log(self.$refs)
                    for (let column of self.columns) {
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
                if (typeof (self.isDisabled) == 'function') {
                    return self.isDisabled(column, self.action)
                } else {
                    return false;
                }
            }
        },
        watch: {
            base: {
                handler: function (newValue, oldValue) {
                    //console.log("change",newValue,oldValue)
                },
                deep: true,
            },
        },
        computed: {
            isSubmit() {
                return this.opt.issubmit || true;
            },
            isAutohide() {
                return this.opt.autohide || false;
            },
            isAutoReload() {
                return this.opt.autoreload || true;
            }
        },
    };
</script>
