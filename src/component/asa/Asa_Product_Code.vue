<template>
    <span><slot>{{text}}</slot></span>
</template>

<script>
import API from "../api.js"

export default {
    name: 'sp-product-code',
    props: {
        productid: {
            type: [Number, String]
        },
        sizecontentid:{
            type: [Number, String]
        },
    },
    data:function(){
        return {
            text: ''
        };
    },
    mounted:function(){
        let self = this;
        API.getProductCode(self.productid, self.sizecontentid).then(code=>{
            self.text = code;
        });
    },
};
</script>
