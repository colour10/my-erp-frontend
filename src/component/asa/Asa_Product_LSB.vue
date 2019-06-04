<template>
    <span>{{text}}</span>
</template>

<script>
//显示商品倍率
import API from "../api.js"

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
            console.log("==", result)
            self.text = result
        })
    }
}
</script>
