<template>
    <div>
        <el-input :placeholder="placeholder" v-model="currentText" :readonly="true" @click.native="dialogVisible = true">
            <as-button slot="append" icon="el-icon-more"></as-button>
        </el-input>
        <el-dialog class="user-form" :title="_label('qingxuanze')" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'50%'" :modal="false">
            <el-row>
            <el-checkbox-group v-model="checkList" @change="handleChange">
                <el-col :span="4" v-for="(item,key) in data" :key="item.id"><el-checkbox :label="item.id">{{item.name}}</el-checkbox></el-col>
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
    name: 'select-dialog-common',
    props: {
        select_value: {
            required: true,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        auto_model: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ""
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
        handleChange(newValue) {
            var self = this;

            if (self.auto_model) {
                self.convertValue(newValue)
                self.$emit('change', newValue.join(","))
            }
        },
        convertValue(value) {
            var self = this;

            value = !value ? "":value
            
            if (value == '') {
                self.checkList = []
                self.currentText = ""
            } else {
                //self._log("convertValue", value)
                self.checkList = value.split(',')
                self.convertText()
            }
        },
        convertText() {
            var self = this;
            
            self.currentText = self.data.filter(function(row){
                return self.checkList.findIndex(id=>id==row.id)>=0
            }).map(item=>item.name).join(",")          
        },
        setData(data) {
            let self = this;
            self.data = data

            self.convertText()
            return self;
        }
    },
    watch: {
        select_value(newValue) {
            var self = this
            
            self.convertValue(newValue)
        }
    },
    mounted: function() {
        var self = this;
        var txt = self.select_value || ""
        self.convertValue(txt)
    }
}
</script>
