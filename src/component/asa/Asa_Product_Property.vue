<template>
    <div>
        <el-table :data="sizecontents" border style="width:100%;">
            <el-table-column :label="_label('chima')" align="left" width="80">
                <template v-slot="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column :label="item.name+'(CM)'" align="center" v-for="(item,index) in properties" :key="item.id" width="200">
                <template v-slot="scope">
                    <el-input :ref="index+'.'+scope.$index" v-model="data[scope.row.id+'_'+item.id]" size="mini" @keyup.native.down="focusNext(index, scope.$index+1)" @keyup.native.up="focusNext(index, scope.$index-1)" @keyup.native.left="focusNext(index-1, scope.$index)" @keyup.native.right="focusNext(index+1, scope.$index)"></el-input>
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
        focusNext(x,y) {
            if(x<0 || y<0) {
                return 
            }

            let target = this.$refs[x+'.'+y]
            if(target && target.length && target.length>0) {
                target[0].focus()
            }
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
            self.sizecontents = product.sizecontents

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
            //
            let source = DataSource.getDataSource("property", _label("lang"))
            source.getData(async function(properties){
                self._log("properties", properties)
                let list = res.data.map(item=>{
                    //self._log(item)
                    let info = properties.find(row=>row.row.id==item.propertyid)
                    if(typeof(info)=='object') {
                        //self._log("info", info)
                        return info;
                    }
                }).filter(item=>item)

                self.properties = list

                //加载数据
                res = await self._fetch("/product/getproperties", {id:self.product.id})
                //self._log(res)

                let obj = {}
                res.data.forEach(item=>{
                    obj[item.sizecontentid+'_'+item.propertyid] = item.content;
                })
                self.data = obj
                self.loaded = true;
            });

            
            //return self;
        }
    },
    computed: {},
    watch: {}
}
</script>
