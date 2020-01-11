<template>
    <div>
        <el-table :data="sizecontents" border style="width:100%;">
            <el-table-column prop="name" :label="showLabel('chima')" align="left" width="100">
            </el-table-column>
            <el-table-column prop="goods_code" :label="showLabel('shangpintiaoma')" width="350" align="left">
                <template v-slot="scope">
                    <el-input v-model="data[scope.row.id]" size="mini"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="9" :span="6">
            <as-button auth="product" type="primary" @click="handleSaveCode">{{showLabel("baocun")}}</as-button>
        </el-col>
    </div>
</template>

<script>
import globals, { showLabel } from '@/component/globals.js'

export default {
    data() {
        return {
            sizecontents: [],
            data: {}
        }
    },
    methods: {
        handleSaveCode() {
            let self = this;

            let params = { id: self.$route.params.id }
            console.log(self.data)
            params.list = globals.extend({}, self.data)

            let options = {
                successTip: "success",
                isReject: true
            }

            let result = self._submit("/product/saveProductCode", {params:JSON.stringify(params)})
        },
        async getProductSizeContents() {
            let self = this
            const id = self.$route.params.id

            self._fetch("/product/sizecontents", {id: id}).then(res => {
                self.sizecontents = res.data
            })

            let res = await self._fetch("/product/getProductCodes", {id:id})

            let obj = {}
            res.data.forEach(item => {
                obj[item.sizecontentid] = item.goods_code
            })
            self.data = obj
        }
    }
}
</script>