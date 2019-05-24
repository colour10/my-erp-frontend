<template>
    <el-popover trigger="click" :placement="placement">
        <p>{{_label("guojima")}}: {{ product.getGoodsCode() }}</p>
        <p>{{_label("shangpinmingcheng")}}: {{ product.getName() }}</p>
        <div slot="reference" class="name-wrapper">
            <el-button size="mini">{{ product.getGoodsCode() }}</el-button>
        </div>
    </el-popover>
</template>

<script>

export default {
    name: 'sp-product-tip',
    props: {
        product: {
            type: Object
        },
        placement:{
            default:'right'
        }
    }
}
</script>
