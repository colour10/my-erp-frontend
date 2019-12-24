<template>
    <div>
        <el-link type="primary" @click="onClick" size="mini">{{ product.getGoodsCode() }}</el-link>
        <asa-product ref="product" @change="onChange"></asa-product>
    </div>
</template>

<script>
import Asa_Product from './Asa_Product.vue'

export default {
    name: 'sp-product-tip',
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
