<template>
    <div style="width:1000px">
        <el-tabs type="border-card" @tab-click="onTabClick" v-model="currentTab">
            <el-tab-pane :label="_label('jibenziliao')" name="info">
                <myform name="company" ref="company" @submit="onSubmit" :inline="true" authname="company" :isEditable="fture" width="800px">
                </myform>
            </el-tab-pane>
            <el-tab-pane :label="_label('kaipiaoxinxi')" name="companyinvoice">
                <simple-admin-page v-bind="props" ref="page2"></simple-admin-page>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js'
import form from '../form.vue'
import { fture } from "../function.js"
import { getProp } from "../prop.js"

const props = getProp('companyinvoice');

export default {
    name: 'sp-system',
    components: {
        "myform": form
    },
    data() {
        return {
            currentTab: "info",
            fture,
            props:props
        }
    },
    methods: {
        onTabClick(tab) {
            var self = this;
        },
        onSubmit(form) {
            var self = this;
            self._submit("/company/update", form).then(function() {})
        },
        async loadInfo() {
            var self = this
            let info = await self._fetch("/company/info", {})
            self._log(info)
            self.$refs['company'].setInfo(info.data)
            props.base.companyid = info.data.id;

        }
    },
    mounted: async function() {
        const self = this
        self.loadInfo()
    }
}
</script>
