<template>
    <div class="sizecontent">
    <el-table :data="rows" style="width:100%;" :border="false" :row-class-name="rowClassName" :cell-class-name="cellClassName">
        <el-table-column :label="_label('gonghuoshang')" align="left" width="110">
            <template v-slot="{row}">
                <div v-if="row.type=='body'" @dblclick="distributeTo(row.supplier.id)">{{row.supplier.suppliercode}}</div>
                <span v-if="row.type=='foot'">{{_label('heji')}}</span>
            </template>
        </el-table-column>

        <el-table-column :label="_label('zhekoulv')" align="left" width="65">
            <template v-slot="{row}">
                <el-input v-if="row.type=='body'" v-model="formdiscount[row.supplier.id].discount" @change="onDiscountChange(row.supplier.id)" size="mini" style="width:50px"></el-input>
            </template>
        </el-table-column>

        <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="51" class="counter">
            <template v-slot="{row}">
                <el-input v-model="row.form[column.id]" style="width:50px" size="mini" :disabled="true" class="linetop" v-if="row.type=='head'"></el-input>
                <el-input v-model="form[column.id+'-'+row.supplier.id]" style="width:50px" size="mini" @keyup.native="onChange(row)" v-if="row.type=='body'" :ref="column.id+'-'+row.supplier.id" @focus="onFocus(column.id+'-'+row.supplier.id)" @dblclick.native="onInputDblClick(column.id,row.supplier.id)"></el-input>
                <el-input v-model="row.form[column.id]" style="width:50px" size="mini" :disabled="true" class="linetop" v-if="row.type=='foot'"></el-input>
            </template>
        </el-table-column>
        <el-table-column :label="_label('heji')" align="right" width="53">
            <template v-slot="{row}">
                <el-input :value="getLineTotal(row.form)" style="width:50px" size="mini" :disabled="true" class="linetop" v-if="row.type=='head'"></el-input>
                <el-input :value="getBodyRowTotal(row.supplier.id)" style="width:50px" size="mini":disabled="true" class="inputsum" v-if="row.type=='body'"></el-input>
                <el-input :value="getLineTotal(row.form)" style="width:50px" size="mini" :disabled="true" class="linetop" v-if="row.type=='foot'"></el-input>
            </template>
        </el-table-column>        
    </el-table>
</div>
</template>

<script>
import { _label } from '../globals.js'
import { toArray,extend } from '../object.js'
import chain from '../chain.js'

const _private = function(self){

    return {
        forEach(callback){
            chain(self.form).forEach((number, key)=>{
                let [sizecontentid, supplierid] = key.split("-")

                let target = self.formdiscount[supplierid]
                callback({number, sizecontentid, supplierid, discount:target.discount})
            })
        }
    }
}

export default {
    name: 'sp-sizecontent-confirm2',
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        columns: {
            type: Array
        },
        row:{
            type:[Object],
            require:true
        },
        suppliers:{
        }, 
        initData:{}
    },
    data() {
        let self = this

        //处理默认填入的下方需要确认或者发货的商品数量
        let form = {}
        let totals = {}
        let formdiscount = {}
        self.suppliers.forEach(supplier=>{
            let row = {}
            self.columns.forEach(column=>{
                form[column.id+'-'+supplier.id] = ""
            })
            totals[supplier.id] = 0
            formdiscount[supplier.id] = {discount:supplier.discount, match:true}
        })

        self.initData.forEach(({supplierid,sizecontentid,number})=>{
            form[sizecontentid+'-'+supplierid] = number
        })

        return {
            form,
            formdiscount,
            totals,
            tabledata:[[]],
            sumform:{}  //最下面的合计行的数据
        }
    },
    methods: {
        doNull(){
            this._log("input click")
        },
        distributeTo(supplierid){
            let self = this
            let form = self.form
            this._log(supplierid)
            Object.keys(form).forEach(key=>{
                //self._log(key)
                form[key] = ""

                let [sizecontentid,tmp_supplierid] = key.split("-")
                if(supplierid==tmp_supplierid) {
                    form[key] = self.row.form[sizecontentid]
                }
            })
            self.onChange()
        },
        onDiscountChange(supplierid){
            let self = this
            let supplier = self.suppliers.find(item=>item.id==supplierid)
            if(supplier) {
                let target = self.formdiscount[supplierid]
                target.match = target.discount==supplier.discount

                self.onChange()
            }
        },
        reset(){
            let self = this
            let form = self.form
            Object.keys(form).forEach(key=>{
                form[key] = ""
            })
            self.onChange()
        },
        onInputDblClick(sizecontentid, supplierid){
            let self = this
            let form = self.form
            this._log("input double click")

            let current = form[sizecontentid + '-' + supplierid]
            if(current=="" || current=='0') {
                //把剩余的分配给当前
                let total = 0
                Object.keys(form).forEach(key=>{
                    let [tmp_sizecontentid,tmp_supplierid] = key.split("-")
                    if(tmp_sizecontentid==sizecontentid && form[key]>0) {
                        total += form[key]*1
                    }                    
                })

                if(self.row.form[sizecontentid] - total==0) {
                    form[sizecontentid + '-' + supplierid] = 1
                    self.onInputDblClick(sizecontentid, supplierid);
                }
                else {
                    form[sizecontentid + '-' + supplierid] = self.row.form[sizecontentid] - total
                }                
            }
            else {
                Object.keys(form).forEach(key=>{
                    let [tmp_sizecontentid,tmp_supplierid] = key.split("-")
                    if(tmp_sizecontentid==sizecontentid) {
                        form[key] = ""
                        if(supplierid==tmp_supplierid) {
                            form[key] = self.row.form[sizecontentid]
                        }
                    }
                    
                })
            }
            
            self.onChange()
        },
        onFocus(refname){
            this.$refs[refname][0].select()
        },
        getLineTotal(formData) {
            //this._log(formData)
            let total = 0
            chain(formData).forEach(number=>{
                if(number>0) {
                    total += number*1
                }
            })
            return total
        },
        getBodyRowTotal(supplierid) {
            let total = 0;
            _private(this).forEach(item=>{
                if(supplierid==item.supplierid && item.number>0) {
                    total += item.number*1
                }
            })

            return total
        },
        onChange() {
            let self = this

            let list = []
            _private(this).forEach(item=>{
                list.push(item)              
            })

            self.$emit("change", { row:self.row, list })
            self._log(list)
        },
        rowClassName({row, rowIndex}){
            if(row.type=="foot") {
                return "sumline"
            }

            return ""
        },
        cellClassName({row, column, rowIndex, columnIndex}) {
            if( this.columns.length+2==columnIndex) {
                return "counter sumtotal"
            }
            else if(this.columns.length+1==columnIndex) {
                //this._log("columnIndex=", columnIndex)
                return "counter sumcolumn"
            }
            else {
                return "counter"
            }
        }
    },
    computed:{
        rows:function(){
            let self = this
            let results = []
            results.push({
                type:"head",
                form:self.row.form
            })

            self.suppliers.forEach(supplier=>{
                let row = {}
                self.columns.forEach(column=>{
                    if(!row[column.id]) {
                        row[column.id] = ""
                    }
                })
                //row.orderid = order.order.id
                //totals[supplier.id] = 0
                results.push({
                    type:"body",
                    form:row,
                    supplier
                })
            })

            let footForm = {}
            _private(this).forEach(({number,sizecontentid})=>{
                footForm[sizecontentid] = footForm[sizecontentid] || 0
                footForm[sizecontentid] += number*1
            })

            results.push({
                type:"foot",
                form:footForm
            })

            return results
        }
    },
    watch:{
        suppliers:{
            handler: function(newValue, oldValue) {
                let self = this;
                self.suppliers.forEach((supplier, index)=>{
                    if(self.formdiscount[supplier.id]) {
                        if(self.formdiscount[supplier.id].match) {
                            self.formdiscount[supplier.id].discount = supplier.discount
                        }
                        
                        let target = self.formdiscount[supplier.id]
                        target.match = target.discount==supplier.discount

                        self.onChange()
                    }
                    else {
                        self.formdiscount[supplier.id] = {discount:supplier.discount, match:true}
                    }
                })
            },
            deep: true
        },
        formdiscount:{
            handler: function(newValue, oldValue) {
                let self = this;
                self.suppliers.forEach((supplier, index)=>{                    
                    let target = self.formdiscount[supplier.id]
                    target.match = target.discount==supplier.discount

                    self.onChange()
                })
            },
            deep: true
        }
    },
    mounted:function(){
        let self = this
        //self.onChange({})
    }
}
</script>
