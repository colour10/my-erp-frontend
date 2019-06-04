<template>
    <span>{{product.getBL()}}</span>
</template>

<script>
export default {
    name: 'sp-product-bl',
    props: {
        product: {
            type: Object
        }
    }
}
</script>
