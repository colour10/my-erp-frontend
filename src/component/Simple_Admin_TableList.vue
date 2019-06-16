<template>
    <div>
        <sp-table :data="tableData" border style="width: 100%;" :height="height" :cell-class-name="getCellClassName" @selection-change="onSelectionChange">
            <el-table-column type="selection" :width="60" v-if="isCheckbox==true">
            </el-table-column>
            <el-table-column :prop="item.name" :label="item.label" :width="item.width||180" v-for="item in columns" :key="item.name" :sortable="item.sortable==undefined || item.sortable" v-if="item.listType">
                <template v-slot="scope">
                    <sp-transform v-bind="item" :column="item" :record="scope.row" :option="option"></sp-transform>
                </template>
            </el-table-column>            
            <el-table-column :label="_label('caozuo')" :width="actionWidth" align="center" v-if="isAction">
                <template v-slot="scope">
                    <el-button size="mini" @click="handleClickUpdate(scope.$index, scope.row)" v-if="isButtonShow({action:'view', row:scope.row})">{{_label('bianji')}}</el-button>
                    <el-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)" v-if="isButtonShow({action:'delete', row:scope.row})">{{_label('shanchu')}}</el-button>
                    <el-button size="mini" @click="handleAction(scope,item)" v-for="item in actions" :key="item.label" v-if="isButtonShow({action:item.name, row:scope.row})">{{item.label}}</el-button>
                </template>
            </el-table-column>
        </sp-table>

        <el-pagination v-if="tableData.length<pagination.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current*1" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total*1">
        </el-pagination>
    </div>
</template>

<script>
import { config } from './application.js'
import { extend } from './util/object.js'
import Transform from './transform.js'
import {log,ajax,label} from './mixin/'

export default {
    name: 'sp-tablelist',
    props: {
        columns:Array, 
        controller:String, 
        base:{
            type:[Object], 
            default:function(){
                return {}
            }
        }, 
        option:{
            type:Object,
            default:function(){
                return {}
            }
        },
        actions:Array, 
        model:String,
        isSubmit:{
            type:Boolean,
            default:true
        },
        isAction:{
            type:Boolean,
            default:true
        },
        actionWidth:{
            type:Number,
            default:180
        },
        actionName:{
            type:String,
            default:"page"
        },
        isShow:Function,
        height:Number,
        isCheckbox:{
            type:Boolean,
            default:true
        }
    },
    components: {
        "sp-transform":Transform
    },
    mixins:[log,ajax,label],
    data() {
        let self = this

        return {
            rowIndex: "",
            tableData: [],
            selected:[],
            isLoading:false,
            pagination: {
                pageSizes: config('pagination').pageSizes,
                pageSize: config('pagination').pageSize,
                total: 0,
                current: 1
            },
            cellClasses:{},
            searchform:{}
        }
    },
    methods: {
        search(params) {
            this.searchform = extend({},params)
            this.loadList()
        },
        getCellClassName({row, column, rowIndex, columnIndex}) {
            let self = this
            //this._log(row, column, rowIndex, columnIndex)
            if(column.property) {
                if(self.cellClasses[column.property]) {
                    return self.cellClasses[column.property]
                }
            }
        },
        onSelectionChange(vals) {
            this.selected = vals
        },
        getSelectValues() {
            return this.selected.map(item=>item.id)
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize
            this.loadList()
        },
        handleCurrentChange(current) {
            this.pagination.current = current
            this.loadList()
        },
        isButtonShow(scope) {
            if (typeof(this.isShow)=='function') {
                return this.isShow(scope)
            } else {
                return true;
            }
        },
        handleAction({ $index, row }, item) {
            item.handler($index, row, this)
        },
        findIndex(callback) {
            return this.tableData.findIndex(callback)
        },
        appendRow: function(row) {
            this.tableData.push(row)
            return this.tableData.length - 1;
        },
        updateRow: function(rowIndex, row) {
            Object.assign(this.tableData[rowIndex], row)
        },
        getRow: function(rowIndex) {
            return this.tableData[rowIndex]
        },
        getTableData() {
            return this.tableData;
        },
        setTableData(data){
            let self = this

            self.tableData = []
            data.forEach(row=>{
                self.tableData.push(row)
            })
        },
        deleteRow: function(rowIndex) {
            let self = this
            return self.$delete(self.tableData, rowIndex)
        },
        async onClickDelete(rowIndex, row) {
            let self = this
            self.rowIndex = rowIndex;

            if(self.isSubmit) {
                let result = await self._remove("/" + self.controller + "/delete", { id: row.id })
                if (result == true) {
                    self.$delete(self.tableData, rowIndex)
                }
            }
            else {
                self.$delete(self.tableData, rowIndex)
            }
        },
        handleClickUpdate(rowIndex, row) {
            this.$emit("before-edit", {row, rowIndex})
        },
        loadList() {
            var self = this;
             if(self.isLoading) {
                return ;
            }
            
            self.isLoading = true;

            self.tableData = []

            let params = extend( {
                page: self.pagination.current,
                pageSize: self.pagination.pageSize
            }, self.searchform, self.base)

            self._fetch("/" + self.controller + "/" + self.actionName, params).then(function(res) {
                //self._log(res)
                if(self.model) {
                    //记录自然的排序规则
                    let keyindexes = {}
                    res.data.forEach((item,index)=>{
                        keyindexes[item.id] = index
                    })

                    let array = []
                    res.data.forEach(item => {
                        self.model.load({data:item ,depth:1}).then(rowinfo=>{
                            array.push(rowinfo)

                            if(array.length==res.data.length) {
                                array.sort(function(a,b){
                                    return keyindexes[a.id]-keyindexes[b.id]
                                })

                                self.tableData = array
                            }
                        })                        
                    })
                }
                else {
                    res.data.forEach(item => self.tableData.push(item))
                }

                //let pagination = res.pagination;
                extend(self.pagination, res.pagination)
                self.isLoading = false;
            });
        }
    },
    watch: {
        base: {
            handler: function(newValue, oldValue) {
                let self = this
                //this._log("change", newValue, oldValue)
                setTimeout(function(){
                    self.loadList()
                },10)                
            },
            deep: true
        }
    },
    computed: {},
    mounted: function() {
        let self = this
        if(self.isSubmit) {
            self.loadList()
        }        

        self.columns.forEach(item=>{
            if(item.className) {
                self.cellClasses[item.name] = item.className
            }
        })
    }
}
</script>
