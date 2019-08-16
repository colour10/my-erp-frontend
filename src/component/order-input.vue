<template>
  <el-input ref="input" v-model="thisvalue" size="mini" :disabled="disabled" @focus="selectText"></el-input>
</template>

<script>
export default {
  name: 'asa-order-input',
  props: {
    value: {
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      thisvalue: this.value,
    };
  },
  methods: {
    selectText() {
      this.$refs.input.select();
    },
  },
  watch: {
    thisvalue(newValue) {
      if(newValue!=this.value) {
        this.$emit("change", newValue);
      }
    },
    value(newValue) {
      this.thisvalue = newValue;
    },
  },
};
</script>
