<template>
    <div>
        <el-row>
            <el-col :span="24">
                <simple-select v-model="form.ageseasonid" ref="ageseason" source="ageseason" @inited="onAgeseasonInit" :clearable="false"></simple-select>
                <as-button type="primary" @click="loadSettings">{{_label('chaxun')}}</as-button>
                <as-button type="primary" @click="showForm">{{_label('shezhi')}}</as-button>
            </el-col>
        </el-row>
        <el-table :data="settings" style="width:100%;" stripe>
            <el-table-column :label="_label('pinlei')" align="left" width="110">
                <template v-slot="{row}">
                    <span v-if="row.brandgroupchildid=='0'">全部</span>
                </template>
            </el-table-column>
            <el-table-column :label="_label('zipinlei')" align="left" width="150">
                <template v-slot="{row}">
                    <span v-if="row.brandgroupchildid=='0'">全部</span>
                    <sp-select-text :value="row.brandgroupchildid" source="brandgroupchild" v-if="row.brandgroupchildid>0"></sp-select-text>
                </template>
            </el-table-column>
            <el-table-column :label="column.name" align="center" v-for="column in prices" :key="column.id" width="120">
                <template v-slot="{row}">
                    {{getRate({column, row})}}
                </template>
            </el-table-column>
        </el-table>
        <sp-dialog ref="dialog">
            <el-form class="user-form" ref="form" :model="form" :size="'mini'" :inline="true" label-width="100px">
                <el-form-item :label="_label('pinlei')">                    
                    <simple-select v-model="form.brandgroupid" source="brandgroup" @change="onChange" class="width2"></simple-select>
                    <!-- <simple-select v-model="form.brandgroupid" source="brandgroup" @change="onChange" :multiple="true" class="width2"></simple-select> -->
                </el-form-item>

                <el-form-item :label="_label('zipinlei')">                    
                    <simple-select v-model="form.brandgroupchildid" ref="brandgroupchildid" source="brandgroupchild" class="width2"></simple-select>
                    <!-- <simple-select v-model="form.brandgroupchildid" ref="brandgroupchildid" source="brandgroupchild" :multiple="true" class="width2"></simple-select> -->
                </el-form-item>

                <el-form-item :label="column.name" v-for="column in prices" :key="column.id">                    
                    <el-input v-model="formsetting[column.id]" class="width2"></el-input>
                </el-form-item>
            </el-form>
            <el-row>
                <el-col :span="24" style="text-align:center;">
                    <as-button type="primary" @click="onSubmit" style="margin:auto;">{{_label("baocun")}}</as-button>
                    <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
                </el-col>
            </el-row>
        </sp-dialog>
    </div>
</template>

<script>
import DataSource from '../DataSource.js'
import chain from '../chain.js'

const _func = function(self) {
    function getDataSource(name) {
        return DataSource.getDataSource(name, self._label("lang"))
    }

    function _isEqual(target, val) {
        return target=='' || target=='0' || target==0 || target==val
    }

    return {
        loadPriceList() {
            self._log("loadPriceList")
            self._fetch("/price/page", {}).then(result => {
                console.log(result)
                self.prices = result.data;
            })

            return this;
        },
        async loadSubCategory() {
            let brandgroups = await getDataSource("brandgroup").getList()
            brandgroups.forEach(async brandgroup => {
                let source = await getDataSource("brandgroupchild").getSourceByParent(brandgroup.id);
                let brandgroupchilds = await source.getList();

                let isFirst = true
                brandgroupchilds.forEach(brandgroupchild => {
                    self.tablelist.push({
                        isFirst,
                        brandgroup: brandgroup,
                        brandgroupchild: brandgroupchild,
                        rowSpan: brandgroupchilds.length
                    })

                    isFirst = false
                })
            })
        },
        loadSetting() {
            let _this = this;

            if(self.form.brandid>0 && self.form.ageseasonid>0) {
                self._fetch("/pricesetting/load", self.form).then(result => {
                    //console.log(result)
                    self.settings = result.data;
                    _this.convert(result.data)
                })
            }            

            return this
        },
        getRate({ column, row }) {
            //self._log("setting", column, row)
            return row.discounts[column.id] || ""
        },
        convert(list) {
            let result = {}
            list.forEach(row=>{
                let key = row.brandgroupchildid + "-" + row.ishot
                if(!result[key]) {
                    result[key] = {}
                }

                result[key][row.priceid] = row.discount
            })

            self._log(result)

            self.settings = []
            chain(result).forEach((item, key) => {
                self._log(item, key)

                let array = key.split("-")
                self.settings.push({
                    brandgroupchildid:array[0],
                    ishot:array[1],
                    discounts:item
                })
            })
        },
        getParamsList() {
            let push = function(list, brandgroupchildid) {
                chain(self.formsetting).forEach((discount, priceid)=>{ 
                    if(discount>0) {
                        list.push({
                            brandgroupchildid,
                            discount,
                            priceid
                        })
                    }                    
                })
            }

            return new Promise(resolve=>{
                let list = []

                if(self.form.brandgroupchildid=="" && self.form.brandgroupid=="") {
                    push(list, 0)
                    resolve(list)
                }
                else {
                    if(self.form.brandgroupchildid=="") {
                        getDataSource("brandgroupchild").getSourceByParent(self.form.brandgroupid).then(source=>{
                            source.getList().then(result=>{
                                self._log(result)
                                result.forEach(item=>{
                                    push(list, item.id)
                                })

                                resolve(list)
                            })
                        })                        
                    }
                    else {
                        self.form.brandgroupchildid.split(",").forEach(brandgroupchildid=>{
                            push(list, brandgroupchildid)
                        })
                        resolve(list)
                    }
                }                
            })
        }
    }
}


export default {
    name: "sp-pricesetting",
    props:{
        brandid:{}
    },
    data() {
        let self = this;

        return {
            formsetting:{},
            form: {
                brandid: "",
                ageseasonid: "",
                brandgroupid:"",
                brandgroupchildid:"",
                ishot:""
            },
            tablelist: [],
            prices: [],
            settings: []
        }
    },
    methods: {
        spanMethod({ row, column, rowIndex, columnIndex }) {
            if (columnIndex === 0) {
                if (row.isFirst) {
                    //this._log(row.rowSpan)
                    return {
                        rowspan: row.rowSpan,
                        colspan: 1
                    };
                } else {
                    return {
                        rowspan: 0,
                        colspan: 0
                    };
                }
            }
        },
        getRate(info) {
            return _func(this).getRate(info)
        },
        showForm() {
            this.$refs.dialog.show({width:"400px"})
        },
        onChange() {
            this.$refs.brandgroupchildid.load(this.form.brandgroupid)
        },
        onQuit() {
            this.$refs.dialog.hide()
        },
        onSubmit() {
            let self = this
            let params = {
                brandid:self.form.brandid,
                ageseasonid:self.form.ageseasonid,
                ishot:self.form.ishot
            }

            _func(self).getParamsList().then(list=>{
                params.list = list;
                self._log("params", params)

                self._submit("/pricesetting/add", {params:JSON.stringify(params)}).then(function() {
                    _func(self).loadSetting()
                    self.form.id = ""
                }).catch(()=>{
                })
            })
            
        },
        loadSettings() {
            _func(this).loadSetting()
        },
        onAgeseasonInit() {
            let self = this
            if(self.$refs.ageseason.select(0)) {
                self.form.ageseasonid = self.$refs.ageseason.getValue()
                _func(self).loadSetting()
            }
        },
        optionClass(row) {
            let self = this
            self._log("optionClass", row)
            return "option" + row.id
        }
    },
    watch:{
        brandid:function(value){
            this.form.brandid = value;
            this._log("brandid", value)
            _func(this).loadSetting()
        }
    },
    mounted: function() {
        //console.log(this)
        this.form.brandid = this.brandid;
        let func = _func(this)
        func.loadPriceList().loadSubCategory()
        func.loadSetting()
    }
}
</script>
