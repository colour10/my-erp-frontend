<template>
    <el-popover trigger="click" :placement="placement">
        <p>{{_label("dingdanhao")}}: {{ order.orderno }}</p>
        <p>{{_label("niandai")}}: {{ order.ageseason_label }}</p>
        <div slot="reference" class="name-wrapper">
            <el-button size="mini">{{ order[column] }}</el-button>
        </div>
    </el-popover>
</template>

<script>

export default {
    name: 'sp-order-tip',
    props: {
        order: {
            type: Object
        },
        column: {
            type: [String],
            require: true
        },
        placement:{
            default:'right'
        }
    }
}
</script>
