<template>
  <el-dialog class="user-form" :title="title" :visible="currentVisible" :center="true" @close="onClose" width="80%">
    <el-tabs type="border-card" v-model="activeName">
      <!-- 别名 start -->
      <el-tab-pane :label="_label('bieming')" name="aliases">
        <multiple-admin-page v-bind="aliases"></multiple-admin-page>
      </el-tab-pane>
      <!-- 别名 end -->

      <!-- 系列 start -->
      <el-tab-pane :label="_label('xilie')">
        <simple-admin-page v-bind="series"></simple-admin-page>
      </el-tab-pane>
      <!-- 系列 end -->

      <!-- 倍率 start -->
      <el-tab-pane :label="_label('beilv')">
        <simple-admin-page v-bind="props"></simple-admin-page>
      </el-tab-pane>
      <!-- 倍率 end -->
    </el-tabs>
  </el-dialog>
</template>

<script>
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
            title: {}
        },
        data() {
            var self = this;

            return {
                props: getProp('brandrate'),
                aliases: getProp('aliases'),
                series: getProp('series'),
                activeName: "aliases",
                currentVisible: self.visible
            }
        },
        methods: {
            onBrandChange() {
                let self = this;
                self.props.base.brandid = self.brandid
                self.aliases.base.brandid = self.brandid
                self.series.base.brandid = self.brandid
            },
            onClose() {
                this.currentVisible = false;
                this.$emit("update:visible", false);
            }
        },
        watch: {
            visible(newValue) {
                this.currentVisible = newValue
            },
            brandid(newValue) {
                this.onBrandChange()
            }
        },
        mounted: function () {
            this.onBrandChange()
        }
    }
</script>
