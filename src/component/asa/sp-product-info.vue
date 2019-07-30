<template>
  <span><slot>{{text}}</slot></span>
</template>

<script>
import { ProductDetail } from "../model.js"

export default {
  name: 'sp-product-info',
  props: {
    id: {
      type: Number,
    },
    column: {
      type: String,
    },
  },
  data: function() {
    return {
      text: "",
    };
  },
  mounted: function() {
    let self = this;
    ProductDetail.load({ data: self.id, depth: 1 }).then(detail => {
      self.text = detail[self.column];
    })
  },
};
</script>
