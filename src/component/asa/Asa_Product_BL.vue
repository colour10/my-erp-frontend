<template>
    <span>{{product.getBL()}}</span>
</template>

<script>
//显示商品倍率
import API from "../api.js"

export default {
    name: 'sp-product-bl',
    props: {
        product: {
            type: Object
        }
    }
}
</script>
