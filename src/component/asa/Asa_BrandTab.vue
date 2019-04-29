<template>
    <el-dialog class="user-form" :title="title" :visible="currentVisible" :center="true" @close="onClose" width="80%">
        <el-tabs type="border-card" v-model="activeName">
            <el-tab-pane :label="_label('bieming')" name="aliases">
                <asa-aliases :brandid="brandid"></asa-aliases>
            </el-tab-pane>
            <el-tab-pane :label="_label('xilie')">
                <asa-series :brandid="brandid"></asa-series>
            </el-tab-pane>
            <el-tab-pane :label="_label('beilv')">
                <simple-admin-page v-bind="props" ref="page"></simple-admin-page>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import globals from '../globals.js'
import {getProp} from "../prop.js"

export default {
    name: 'asa-brandtab',
    props: {
        visible: {
            type: Boolean
        },
        brandid: {
            type: [String, Number]
        },
        title:{}
    },
    data() {
        var self = this;
        return {
            props:getProp('brandrate'),
            activeName: "aliases",
            currentVisible: self.visible
        }
    },
    methods: {
        onBrandChange() {
            let self = this;
            self.props.base.brandid = self.brandid
        },
        onClose() {
            this.currentVisible = false;
            this.$emit("update:visible", false);
        }
    },
    watch: {
        visible(newValue) {
            //console.log("visible", newValue)
            this.currentVisible = newValue
        },
        brandid(newValue){
            this.onBrandChange()
        }
    },
    mounted:function(){
        this.onBrandChange()
    }
}
</script>
