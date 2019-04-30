<template>
    <div>
        <el-input :placeholder="placeholder" v-model="currentText" :readonly="true"  @click.native="showPanel">
            <as-button slot="append" icon="el-icon-more"></as-button>
        </el-input>
        <el-dialog class="user-form" :title="_label('qingxuanze')" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'50%'" :modal="false">
            <el-row>
                <el-checkbox-group v-model="checkList" @change="handleChange">
                    <el-col :span="4" v-for="(item,key) in data" :key="item.getValue()">
                        <el-checkbox :label="item.getValue()">{{item.getLabel()}}</el-checkbox>
                    </el-col>
                </el-checkbox-group>
            </el-row>
            <div slot="footer" class="dialog-footer" v-if="!auto_model">
                <as-button type="primary" @click="handleSelect">{{_label("ok")}}</as-button>
                <as-button @click="handleCancel">{{_label("cancel")}}</as-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'select-dialog',
    props: {
        select_value: {
            required: true,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lang: {
            type: String
        },
        auto_model: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ""
        },
        parentid:{
            default:false
        },
        source: {
            type: String,
            required: true
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        var self = this


        return {
            currentText: "",
            checkList: [],
            data: [],
            componenToptions: {},
            dialogVisible: false
        }
    },
    methods: {
        handleSelect() {
            var self = this;
            self.$emit('change', self.checkList.join(","))
            self.dialogVisible = false;
        },
        handleCancel() {
            var self = this;
            self.convertValue(self.select_value)
                //self.checkList = self.select_value.split(",")
            self.dialogVisible = false;
        },
        showPanel() {
            var self = this;

            self.dialogVisible = true;
        },
        handleChange(newValue) {
            var self = this;

            if (self.auto_model) {
                self.convertValue(newValue)
                self.$emit('change', newValue.join(","))
            }
        },
        convertValue(value) {
            var self = this;
            //self._log("convertValue", value)
            //
            value = !value ? "" : value

            self.getDataSource().getRowLabels(value, function(labels) {
                //self._log("convertValue", self.source, self.lang, labels)
                self.checkList = value==""?[]:value.split(",")
                self.currentText = labels
            })
        },
        getDataSource() {
            var self = this;
            return DataSource.getDataSource(self.source, self.lang);
        },
        load(value) {
            let self = this;
            self.data = []
            self.getDataSource().getRowsByParent(value).then(function(data) {
                self._log("load",self.source, data)
                self.data = data;
            })
        }
    },
    watch: {
        select_value(newValue) {
            var self = this
                //console.log("change", newValue)
            self.convertValue(newValue)
        },
        parentid(newValue) {
            this._log("watch parentid")
            this.load(newValue)
        }
    },
    mounted: function() {
        var self = this;
        var txt = self.select_value || ""
        self.convertValue(txt)

        if(self.parentid==false) {
            self.getDataSource().getData(function(data) {
                //self._log("load", data)
                self.data = data
            })
        }
        else {
            self._log("mounted")
            self.load(self.parentid)
        }    
    }
}
</script>
