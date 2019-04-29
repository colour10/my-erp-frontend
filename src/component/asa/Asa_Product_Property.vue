<template>
    <div>
        <el-table :data="sizecontents" border style="width:100%;">
            <el-table-column :label="_label('chima')" align="left" width="80">
                <template v-slot="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column :label="item.name+'(CM)'" align="center" v-for="item in properties" :key="item.id">
                <template v-slot="scope">
                    <el-input v-model="data[scope.row.id+'_'+item.id]"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <el-col :offset="8" :span="8" style="padding:5px">
            <auth auth="product"><as-button type="primary" @click="onSave" v-if="option.isedit">{{_label("baocun")}}</as-button></auth>
            <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
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
            data: {},
            loaded:false
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
            let result = self._submit("/product/saveproperty", {params:JSON.stringify(params)})
            //self._log(result)
        },
        async setProduct(product) {
            let self = this;
            self.product = product
                //self._log(self.sizecontents)
            self.sizecontents = product.sizecontents.map(item => item.getObject());

            self.loaded =false;
            self.data = {}
            return self
        },
        async load() {
            let self = this
            if(self.loaded) {
                return;
            }
            let res = await self._fetch("/brandgroupchildproperty/page", { brandgroupchildid: self.product.childbrand })
            //console.log(res, "haha")

            self.properties = await DataSource.createSource(res.data, "name", "id", _label('lang')).getList()

            //加载数据
            res = await self._fetch("/product/getproperties", {id:self.product.id})
            //self._log(res)

            let obj = {}
            res.data.forEach(item=>{
                obj[item.sizecontentid+'_'+item.propertyid] = item.content;
            })
            self.data = obj
            self.loaded = true;
            return self;
        }
    },
    computed: {},
    watch: {}
}
</script>
