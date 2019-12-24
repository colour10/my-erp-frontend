<template>
    <div>
        <el-form ref="search-form" class="order-form" :model="form" label-width="80px" size="mini" :inline="true">
            <el-row :gutter="0">
                <el-col :span="24">
                    <el-form-item :label="_label('chaxun')" >
                        <el-input v-model="form.wordcode" class="wordcode" :placeholder="_label('guojima')" @blur="onBlur"></el-input>
                    </el-form-item>
                    <as-button type="primary" @click="search" v-if="option.isedit" size="mini">{{_label("chaxun")}}</as-button>
                    <as-button type="primary" @click="clear" v-if="option.isedit" size="mini">{{_label("qingkong")}}</as-button>
                    <as-button type="primary" @click="onSelectMultiple" size="mini">{{_label("queding")}}</as-button>
                    <as-button type="primary" @click="onQuit" size="mini">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="24">
                    <el-form-item :label="_label('pinpai')" prop="brandid">
                        <simple-select v-model="form.brandid" source="brand" multiple />
                    </el-form-item>
                    <el-form-item :label="_label('pinlei')" prop="brandgroupid">
                        <simple-select v-model="form.brandgroupid" source="brandgroup" />
                    </el-form-item>
                    <el-form-item :label="_label('zipinlei')" prop="childbrand">
                        <simple-select ref="childbrand" v-model="form.childbrand" source="brandgroupchild" :parentid="form.brandgroupid" :lazy="true" />
                    </el-form-item>
                    <el-form-item :label="_label('chandi')" prop="countries">
                        <simple-select v-model="form.countries" source="country" :multiple="true" />
                    </el-form-item>
                    <el-form-item :label="_label('niandai')" prop="ageseason">
                        <simple-select v-model="form.ageseason" source="ageseason" :multiple="true" />
                    </el-form-item>
                    <el-form-item :label="_label('xingbie')">
                        <simple-select v-model="form.gender" source="gender" :multiple="true" />
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>

        <el-collapse v-model="is_collapse" v-show="searchresult.length>0">
            <el-collapse-item :title="_label('chaxunjieguo')" name="1" class="product">
                <el-table ref="table" :data="searchresult" stripe border style="width:100%;" @selection-change="onSelectionChange" @row-click="onRowClick">
                    <el-table-column type="selection" :width="30"></el-table-column>
                    <el-table-column align="left" width="50">
                        <template v-slot="scope">
                            <img :src="_fileLink(scope.row.picture)" style="width:50px;height:50px;" />
                        </template>
                    </el-table-column>

                    <el-table-column prop="ageseason_label" :label="_label('niandai')" width="90" align="center"> </el-table-column>

                    <el-table-column :label="_label('chanpinmingcheng')" align="left" width="200">
                        <template v-slot="{row}">
                            {{row.getName()}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('guojima')" align="left" width="180">
                        <template v-slot="{row}">
                            <sp-product-tip :product="row"></sp-product-tip>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('shangpinshuxing')" align="left" width="90">
                        <template v-slot="{row}">
                            <sp-select-text :value="row.producttypeid" source="producttype"></sp-select-text>
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('chuchangjia')" align="left" width="120">
                        <template v-slot="{row}">
                            {{[row.factorypricecurrency_label, row.factoryprice].join(" ")}}
                        </template>
                    </el-table-column>

                    <el-table-column :label="_label('guojilingshoujia')" align="left" width="120">
                        <template v-slot="{row}">
                            {{ [row.wordpricecurrency_label, row.wordprice].join(" ") }}
                        </template>
                    </el-table-column>

                    <el-table-column prop="countries_label" :label="_label('chandi')" width="100" align="center"> </el-table-column>
                    <el-table-column prop="brandgroup_label" :label="_label('pinlei')" width="120" align="center"> </el-table-column>
                    <!-- <el-table-column prop="childbrand_label" :label="_label('zipinlei')" width="120" align="center"> </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="100" align="center">
                        <template v-slot="scope">
                            <as-button size="mini" type="primary" @click="selectRow(scope.row)">{{_label('xuanze')}}</as-button>
                        </template>
                    </el-table-column> -->
                </el-table>
                <el-pagination v-if="searchresult.length<pagination.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current*1" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total*1"></el-pagination>
            </el-collapse-item>
        </el-collapse>

        <asa-product-add ref="productadd" @change="onChange"></asa-product-add>
    </div>
</template>

<script>
import globals from '../globals.js'
import { ProductDetail } from "../model.js"
import Asa_Product_Add from './Asa_Product_Add.vue'
import {extend} from "../object.js"
import chain from "../chain.js"

export default {
    name: "asa-product-search-panel",
    components:{
        [Asa_Product_Add.name]: Asa_Product_Add,
    },
    props: {
        filter:{},
        isCreate:{
            default: true,
        },
        brandids: {
            type: String,
            default: '',
        },
        genders: {
            type: String,
            default: '',
        },
    },
    data() {
        const self = this;

        return {
            is_collapse: "",
            form: {
                wordcode: "",
                brandid: self.brandids,
                brandgroupid: "",
                childbrand: '',
                countries: "",
                ageseason: '',
                gender: self.genders,
            },
            searchresult: [],
            option: {
                isedit: true
            },
            selected:[],
            pagination: {
                pageSizes: globals.pageSizes,
                pageSize: 20,
                total: 0,
                current: 1
            }
        }
    },
    watch: {
        brandids(newVale) {
            this.form.brandid = newVale;
        },
        genders(newVale) {
            this.form.gender = newVale;
        },
    },
    methods: {
        onBlur() {
            this.form.wordcode = this.form.wordcode.replace(/[^-a-zA-Z0-9_\.]/g, '');
        },
        onQuit(){
            this.$emit("close")
        },
        search(){
            this.pagination.current = 1
            this.reload()
        },
        reload() {
            //查询库存商品
            let self = this

            let form = extend({}, self.form)
            form.page = self.pagination.current
            form.pageSize = self.pagination.pageSize

            self._fetch("/product/search", form).then(function(res) {
                self.searchresult = []
                self._log(res)
                if (res.data.length == 0) {
                    if(self.isCreate==true) {
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
                    }
                } else {
                    res.data.filter(item => typeof(self.filter) == 'function' ? self.filter(item) : true).forEach(function(item) {
                        ProductDetail.get(item, function(result) {
                            //self._log(result)
                            self.searchresult.push(result)
                        }, 1)
                    })

                    extend(self.pagination, res.pagination)

                    self.is_collapse = "1";
                }
            });
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize;
            this.reload();
        },
        handleCurrentChange(current) {
            this.pagination.current = current;
            this.reload();
        },
        setParam(name, value) {
            let self = this;

            return this;
        },
        clear() {
            let self = this;
            globals.empty(self.form);
            self.searchresult = [];
            return self;
        },
        selectRow(row) {
            //this._log(row)
            this.$emit("select", extend({}, row));
        },
        onBrandGroupChange(value) {
            let self = this;

            //self._log(value)
            self.$refs.childbrand.load(item => item.row.brandgroupid == value);
            self.form.childbrand = '';
        },
        onChange(products) {
            let self = this;
            products.forEach(function(item) {
                ProductDetail.get(item, function(result) {
                    //self._log(result)
                     self.$emit("select", extend({}, result));
                }, 1)
            });

            self.$refs.productadd.hide();
        },
        onSelectionChange(vals) {
            this.selected = vals;
        },
        onSelectMultiple() {
            let self = this;
            self.selected.forEach(item=>{
                //self._log(item)
                self.$emit("select", extend({}, item));
            })
            self.$refs.table.clearSelection();
        },
        onRowClick(row){
            this.$refs.table.toggleRowSelection(row);
        },
    },
};
</script>
