<template>
    <div>
        <el-form ref="search-form" class="order-form" :model="form" label-width="80px" size="mini" :inline="true">
            <el-row :gutter="0">
                <el-col :span="24">
                    <el-form-item :label="_label('chaxun')" class="wordcode">
                        <el-input v-model="form.wordcode_1" class="wordcode" :placeholder="_label('kuanshi')"></el-input>
                        <el-input v-model="form.wordcode_2" class="wordcode" :placeholder="_label('caizhi')"></el-input>
                        <el-input v-model="form.wordcode_3" style="width:110px;" :placeholder="_label('yanse')"></el-input>
                        <el-input v-model="form.wordcode_4" style="width:110px;" :placeholder="_label('fuzhuma')"></el-input>
                    </el-form-item>
                    <as-button type="primary" @click="search" v-if="option.isedit" size="mini">{{_label("chaxun")}}</as-button>
                    <as-button type="primary" @click="clear" v-if="option.isedit" size="mini">{{_label("qingkong")}}</as-button>
                    <as-button type="primary" @click="onSelectMultiple" size="mini">{{_label("piliangxuanze")}}</as-button>
                    <as-button type="primary" @click="onQuit" size="mini">{{_label("tuichu")}}</as-button>
                    <el-checkbox v-model="is_show">{{_label("gaojichaxun")}}</el-checkbox>
                </el-col>
            </el-row>
            <el-row :gutter="0" v-show="is_show">
                <el-col :span="24">
                    <el-form-item :label="_label('pinpai')" prop="brandid">
                        <simple-select v-model="form.brandid" source="brand">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                        <simple-select v-model="form.brandgroupid" source="brandgroup" @change="onBrandGroupChange">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('zipinlei')" prop="childbrand">
                        <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :lazy="true">
                        </simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('chandi')" prop="countries">
                        <simple-select v-model="form.countries" source="country" :multiple="true"></simple-select>
                    </el-form-item>
                    <el-form-item :label="_label('niandai')" prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" :multiple="true">
                        </simple-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-collapse v-model="is_collapse" v-show="searchresult.length>0">
            <el-collapse-item :title="_label('chaxunjieguo')" name="1" class="product">
                <el-table ref="table" :data="searchresult" stripe border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
                    <el-table-column type="selection" :width="50"></el-table-column>
                    <el-table-column align="left" width="50">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chanpinmingcheng')" align="left" width="250">
                        <template v-slot="{row}">{{row.getName()}}</template>>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="left" width="180">
                        <template v-slot="{row}">{{row.getGoodsCode()}}</template>>
                    </el-table-column>
                    <el-table-column prop="countries_label" :label="_label('chandi')" width="100" align="center"> </el-table-column>
                    <el-table-column prop="brandgroup_label" :label="_label('pinlei')" width="120" align="center"> </el-table-column>
                    <el-table-column prop="childbrand_label" :label="_label('zipinlei')" width="120" align="center"> </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="100" align="center">
                        <template v-slot="scope">
                            <as-button size="mini" type="primary" @click="selectRow(scope.row)">{{_label('xuanze')}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-collapse-item>
        </el-collapse>

        <productadd ref="productadd" @change="onChange"></productadd>
    </div>
</template>

<script>
import globals from '../globals.js'
import { ProductDetail } from "../model.js"
import Asa_Product_Add from '../asa/Asa_Product_Add.vue'
import {extend} from "../object.js"
import chain from "../chain.js"

export default {
    name: "asa-search-panel",
    components:{
        "productadd":Asa_Product_Add
    },
    props: ['filter'],
    data() {
        return {
            is_show: false,
            is_collapse: "",
            form: {
                wordcode_1: "",
                wordcode_2: "",
                wordcode_3: "",
                wordcode_4: "",
                brandid: "",
                brandgroupid: "",
                childbrand: '',
                countries: "",
                ageseason: ""
            },
            searchresult: [],
            option: {
                isedit: true
            },
            selected:[]
        }
    },
    methods: {
        onQuit(){
            this.$emit("close")
        },
        search() {
            //查询库存商品
            let self = this

            self._fetch("/product/search", self.form).then(function(res) {
                self.searchresult = []
                    //self._log(res)
                if (res.data.length == 0) {
                    self.$confirm('商品信息不存在，是否新建商品?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        setTimeout(function(){
                            let form = chain(self.form).filter(item=>item.length>0).object()
                            self.$refs.productadd.setForm(form).show(false)
                        },100)                        
                    }).catch(() => {});
                } else {
                    res.data.filter(item => typeof(self.filter) == 'function' ? self.filter(item) : true).forEach(function(item) {
                        ProductDetail.get(item, function(result) {
                            //self._log(result)
                            self.searchresult.push(result)
                        }, 1)
                    })
                    self.is_collapse = "1";
                }
            });
        },
        setParam(name, value) {
            let self = this

            return this
        },
        clear() {
            let self = this
            globals.empty(self.form)
            self.searchresult = []
            return self
        },
        selectRow(row) {
            //this._log(row)
            this.$emit("select", extend({}, row))
        },
        onBrandGroupChange(value) {
            let self = this

            //self._log(value)
            self.$refs.childbrand.load(item => item.row.brandgroupid == value)
            self.form.childbrand = ''
        },
        onChange(products) {
            let self = this
            products.forEach(function(item) {
                ProductDetail.get(item, function(result) {
                    //self._log(result)
                     self.$emit("select", extend({}, result))
                }, 1)
            })

            self.$refs.productadd.hide()
        },
        onSelectionChange(vals) {
            this.selected = vals
        },
        onSelectMultiple() {
            let self = this
            self.selected.forEach(item=>{
                //self._log(item)
                self.$emit("select", extend({}, item))
            })
            self.$refs.table.clearSelection()
        },
        onRowClick(row){
            this.$refs.table.toggleRowSelection(row)
        }
    }
}
</script>
