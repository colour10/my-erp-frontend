<template>
    <el-dialog class="user-form" :title="''" :visible="currentVisible" :center="true" @close="onClose" width="80%">
        <el-tabs type="border-card" @tab-click="onTabClick" v-model="activeName">
            <el-tab-pane label="LOGO" name="logo">
            </el-tab-pane>
            <!--别名-->
            <el-tab-pane :label="globals.getLabel('bieming')">
                <asa-aliases :brandid="brandid"></asa-aliases>
            </el-tab-pane>
            <el-tab-pane :label="globals.getLabel('xilie')">
                <asa-series :brandid="brandid"></asa-series>
            </el-tab-pane>
        </el-tabs>
    </el-dialog>
</template>

<script>
import globals from '../globals.js'

export default {
    name: 'asa-brandtab',
    props: {
        visible: {
            type: Boolean
        },
        brandid: {
            type: [String, Number]
        }
    },
    data() {
        var self = this;
        return {
            activeName: "logo",
            currentVisible: self.visible,
            globals: globals
        }
    },
    methods: {
        onTabClick() {},
        showTab(brandid) {

        },
        onClose() {
            console.log("click close dialog")
            this.currentVisible = false;
            this.$emit("update:visible", false);
        }
    },
    watch: {
        visible(newValue) {
            console.log("visible", newValue)
            this.currentVisible = newValue
        }
    }
}
</script>
