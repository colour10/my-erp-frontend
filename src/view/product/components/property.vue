<template>
    <div>
        <el-table :data="sizecontents" border stripe>
            <el-table-column :label="showLabel('chima')" align="left" width="80">
                <template v-slot="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column :label="item.title+'(CM)'" align="center" v-for="(item) in properties" :key="item.id" width="200">
                <template v-slot="scope">
                    <el-input v-model="data[scope.row.id+'_'+item.id]" size="mini"></el-input>
                </template>
            </el-table-column>
        </el-table> 

        <el-col :offset="8" :span="8" style="padding:5px">
            <auth auth="product"><as-button type="primary" @click="handleSaveProperties">{{showLabel("baocun")}}</as-button></auth>
        </el-col>
    </div>
</template>

<script>
import { showLabel } from '@/component/globals.js'

export default {
    data() {
        return {
            properties: [],
            sizecontents: [],
            data: {}
        }
    },
    methods: {
        handleSaveProperties(){
            let self = this;

            let params = {id:self.$$route.param.id}
            params.list = globals.extend({}, self.data)

            let options = {
                successTip: "success",
                isReject: true
            }

            let result = self._submit("/product/saveproperty", {params:JSON.stringify(params)})
            //self._log(result)
        },
        async getProductSizeContents() {
            let self = this
            const id = self.$route.params.id

            self._fetch("/product/sizecontentsAndProperties", {id: id}).then(res=>{
                self.sizecontents = res.data.sizecontents
                self.properties = res.data.properties
            })

            //加载数据
            let res = await self._fetch("/product/getproperties", {id:id})

            let obj = {}
            res.data.forEach(item=>{
                obj[item.sizecontentid+'_'+item.propertyid] = item.content;
            })
            self.data = obj
        }
    }
}
</script>