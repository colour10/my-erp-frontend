<template>
  <el-dialog :visible.sync="dialogVisible" :center="true" :fullscreen="false" :modal="false" width="1200px">
    <!-- 选择商品 start，修复错误 liuzongyang 2020/4/29 16:15 -->
    <asa-product-search-panel
      ref="panel"
      @select="onSelect"
      @close="onClose"
      :brandids="brandids"
      :genders="genders"></asa-product-search-panel>
    <!-- 选择商品 end -->
  </el-dialog>
</template>

<script>
    import Asa_Product_Search_Panel from './Asa_Product_Search_Panel.vue'

    export default {
        name: 'asa-select-product-dialog',
        components: {
            [Asa_Product_Search_Panel.name]: Asa_Product_Search_Panel,
        },
        props: {
            visible: {
                type: Boolean,
            },
            brandids: {
                type: String,
                default: '',
            },
            genders: {
                type: String,
                default: '',
            },
        },
        data() {
            return {
                dialogVisible: this.visible,
            };
        },
        methods: {
            onSelect(row) {
                let self = this;
                self.dialogVisible = false;
                self.$emit("select", row);
            },
            onClose() {
                this.dialogVisible = false;
            },
            search(form) {
                let self = this;
                setTimeout(function () {
                    self.$refs.panel.search(form);
                }, 100);
            },
        },
        watch: {
            dialogVisible(newValue) {
                this.$emit("update:visible", newValue);
            },
            visible(newValue) {
                this.dialogVisible = newValue;
            },
        },
    };
</script>
