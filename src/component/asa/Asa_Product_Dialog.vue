<template>
  <div>
    <el-button type="default" size="mini" @click="onClick">{{ showLabel('bianji') }}</el-button>
    <asa-product ref="product" @change="onChange"></asa-product>
  </div>
</template>

<script>
    import Asa_Product from './Asa_Product.vue'

    export default {
        name: 'sp-product-dialog',
        components: {
            [Asa_Product.name]: Asa_Product,
        },
        props: {
            product: {
                type: Object,
            },
        },
        methods: {
            onClick() {
                let self = this;
                self.$refs.product.edit(true).setInfo(self.product).then(product => product.show(false));
            },
            onChange(form) {
                this.$emit("change", form);
            },
        },
    };
</script>

<style scoped>
  div {
    display: inline-block;
  }
</style>
