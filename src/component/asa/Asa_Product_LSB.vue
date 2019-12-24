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
    methods: {
        load() {
            const self = this
            self.product.getLSB().then(result=>{
                self.text = result
            })
        }
    },
    mounted:function(){
        this.load()
    },
    watch: {
        product() {
            this.load();
        }
    }
}
</script>
