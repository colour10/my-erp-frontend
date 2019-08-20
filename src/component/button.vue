<template>
  <el-button size="mini" :label="label" @click="onClick" :type="enable?type:'info'"><slot></slot></el-button>
</template>

<script>
export default {
  name: 'asa-button',
  props: {
    label: {
      type: String,
    },
    enable: {
      type: Boolean,
      default: true,
    },
    type: {
      default: 'primary',
    },
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      const self = this;
      if(self.enable===true) {
        self.$emit("click");
      }
    },
  },
};
</script>
