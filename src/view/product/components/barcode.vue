<template>
    <div>
        <el-table :data="sizecontents" border style="width:100%;">
            <el-table-column prop="name" :label="showLabel('chima')" align="left" width="100">
            </el-table-column>
            <el-table-column prop="goods_code" :label="showLabel('shangpintiaoma')" width="350" align="left">
                <template v-slot="scope">
                    <el-input v-model="scope.row.goods_code" size="mini"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="9" :span="6">
            <as-button auth="product" type="primary" @click="onSaveGoodsCode">{{showLabel("baocun")}}</as-button>
        </el-col>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sizecontents: []
        }
    }
}
</script>