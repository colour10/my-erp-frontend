<template>
    <el-popover :trigger="trigger" :placement="placement">
        <p>{{_label("dingdanhao")}}: {{ order.orderno }}</p>
        <p>{{_label("niandai")}}: <sp-select-text :value="order.ageseason" source="ageseason"></sp-select-text></p>
        <p>{{_label("xingbie")}}: <sp-select-text :value="order.genders" source="gender"></sp-select-text></p>
        <p>{{_label("pinpai")}}: <sp-select-text :value="order.brandids" source="brand"></sp-select-text></p>
        <div slot="reference" class="name-wrapper">
            <el-button size="mini" type="text">{{ order[column] }}</el-button>
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
        },
        trigger:{
            default:'click'
        }
    }
}
</script>
