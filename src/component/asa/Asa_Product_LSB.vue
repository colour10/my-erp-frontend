<template>
    <span>{{text}}</span>
</template>

<script>
export default {
    name: 'sp-product-lsb',
    props: {
        product: {
            type: Object
        }
    },
    data:function(){
        return {
            text:""
        }
    },
    mounted:function(){
        let self = this
        self.product.getLSB().then(result=>{
            self.text = result
        })
    }
}
</script>
