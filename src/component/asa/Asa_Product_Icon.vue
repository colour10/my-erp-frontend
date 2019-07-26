<template>
  <img :src="_fileLink(file)" style="max-width:50px;max-height:50px;" @click="onClick">
</template>

<script type="text/javascript">
import ImagePreview from '../image-preview.js';

export default {
  name: 'sp-product-icon',
  props: {
    file: {},
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      ImagePreview.show({url: this._fileLink(this.file)});
    },
  },
};
</script>