<template>
    <div :style="{width:width}">
        <el-row>
            <el-col :span="24" class="user-form">
                <slot v-bind:form="form" name="default">
                    <el-form ref="form" :model="form" label-width="100px" :inline="inline" size="mini">
                        <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in prop.columns" :key="item.name" :class="item.class?item.class:''">
                            <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" :disabled="isDisabled(item)"></el-input>
                            <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1" inactive-value="0" :disabled="isDisabled(item)"></el-switch>
                            <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" :lang="_label('lang')" :disabled="isDisabled(item)"></simple-select>
                            <el-date-picker :ref="item.name" v-if="item.type=='date'" v-model="form[item.name]" type="date" value-format="yyyy-MM-dd" placeholder="" :disabled="isDisabled(item)"></el-date-picker>
                            <span v-if="item.type=='label'">{{form[item.name]}}</span>
                        </el-form-item>
                    </el-form>
                </slot>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="text-align:center;">
                <auth :auth="authname">
                    <el-button type="primary" @click="onSubmit" style="margin:auto;" v-if="isEditable(form)">{{setting.submitButtonText}}</el-button>
                </auth>
                <slot name="button"></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import globals, { _label, extend } from './globals.js'
import { getProp } from "./prop.js"
import { initObject, isArray } from "./array.js"
import { fnone } from "./function.js"

export default {
    name: 'sp-form',
    props: {
        name: {
            type: String
        },
        authname: {},
        isEditable: {
            type: Function,
            default: fnone
        },
        disabled: {},
        inline:{
            type:Boolean,
            default:false
        },
        width:{}
    },
    components: {

    },
    data() {
        let self = this
        let form = {},
            disableds = {}

        let prop = getProp(self.name)
            //self._log(self.name, prop)

        for (let i = 0; i < prop.columns.length; i++) {
            let name = prop.columns[i].name
            form[name] = ""
            disableds[name] = ""
        }

        return {
            setting: {
                submitButtonText: _label("baocun")
            },
            prop,
            options: prop.options || {},
            form,
            disableds
        }
    },
    methods: {
        onSubmit() {
            var self = this;
            self.$emit("submit", extend({}, self.form))
        },
        setInfo(info) {
            let self = this
            globals.empty(self.form)
            extend(self.form, info)
            return self
        },
        isDisabled(column) {
            let self = this
            let config = self.disableds

            if (typeof(self.isEditable) == 'function' && self.isEditable(self.form) == false) {
                return true
            }
            //this._log(config, column.name, config[column.name]===true, '=',config[column.name] && config[column.name]===true)
            return config[column.name] ? config[column.name] === true : false;
        },
        setDisabled(name, isDisabled) {
            let self = this

            extend(self.disableds, initObject(name, isDisabled))
            return self
        }
    },
    watch: {},
    computed: {},
    mounted: function() {
    }
}
</script>
