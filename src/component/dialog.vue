<template>
  <el-dialog
    :title="dialogTitle"
    :visible.sync="visible"
    :center="true"
    :width="dialogWidth+'px'"
    :modal="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="$emit('close')">
    <div :style="style()">
      <slot name="default"></slot>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: 'sp-dialog',
        props: {
            title: {
                default: '',
            },
            width: {},
            minHeight: {
                type: Number,
                default: 200,
            },
        },
        data() {
            return {
                visible: false,
                dialogTitle: this.title,
                dialogWidth: this.width || 500,
            };
        },
        methods: {
            show(option = {}) {
                let self = this;
                if (option.title) {
                    self.dialogTitle = option.title;
                }

                if (option.width) {
                    self.dialogWidth = option.width;
                }

                self.visible = true;
            },
            hide() {
                let self = this;
                self.visible = false;
            },
            style() {
                return {
                    minHeight: this.minHeight + 'px',
                };
            },
        },
    };
</script>
