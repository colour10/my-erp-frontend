<template>
    <div>
        <el-table :data="sizecontents" border style="width:100%;">
            <el-table-column :label="_label('shangpinmingcheng')" align="center">
                <template v-slot="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column :label="item.name" align="center" v-for="item in properties" :key="item.id">
                <template v-slot="scope">
                    <el-input v-model="data[scope.row.id+'_'+item.id]"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="8" :span="8" style="padding:5px">
            <auth auth="product"><el-button type="primary" @click="onSave" v-if="option.isedit">{{_label("baocun")}}</el-button></auth>
            <el-button type="primary" @click="onQuit">{{_label("tuichu")}}</el-button>
        </el-col>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js'
import DataSource from '../DataSource.js'


export default {
    name: 'asa-product-property',
    components: {},
    props: ["option"],
    data() {
        var self = this;

        return {
            product: {},
            properties: [],
            sizecontents: [],
            data: {}
        }
    },
    methods: {
        onQuit(){
            this.$emit('quit')
        },
        async onSave(){
            let self = this;

            let params = {id:self.product.id}
            params.list = globals.extend({}, self.data)
            let result = self._submitPromise("/product/saveproperty", {params:JSON.stringify(params)})
            //self._log(result)
        },
        async setProduct(product) {
            let self = this;
            self.product = product
                //self._log(self.sizecontents)
            self.sizecontents = product.sizecontents.map(item => item.getObject());

            self.load()
            return self
        },
        async load() {
            let self = this
            let res = await self._fetchPromise("/brandgroupchildproperty/page", { brandgroupchildid: self.product.childbrand })
            //console.log(res, "haha")

            self.properties = await DataSource.createSource(res.data, "name", "id", _label('lang')).getList()

            //加载数据
            res = await self._fetchPromise("/product/getproperties", {id:self.product.id})
            //self._log(res)

            let obj = {}
            res.data.forEach(item=>{
                obj[item.sizecontentid+'_'+item.propertyid] = item.content;
            })
            self.data = obj
            return self;
        }
    },
    computed: {},
    watch: {}
}
</script>
