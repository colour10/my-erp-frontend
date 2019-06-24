<template>
    <div>
        <el-link type="primary" @click="onClick" size="mini">{{ product.getGoodsCode() }}</el-link>
        <product ref="product"></product>
    </div>
</template>

<script>
import Product from '../asa/Asa_Product.vue'

export default {
    name: 'sp-product-tip',
    components: {
        "product": Product
    },
    props: {
        product: {
            type: Object
        }
    },
    methods:{
        onClick:function(){
            let self = this
            self.$refs.product.edit(true).setInfo(self.product).then(product => product.show(false))
        }
    }
}
</script>
