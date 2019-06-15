<template>
    <div class="sizecontent">
    <el-table :data="rows" style="width:100%;" :border="false" :row-class-name="rowClassName" :cell-class-name="cellClassName">
        <el-table-column :label="_label('dinghuokehu')" align="left" width="110">
            <template v-slot="{row}">
                <sp-order-tip column="booking_label" :order="row.order" v-if="row.order.id>0"></sp-order-tip>
                <span v-if="row.order.id==0">{{_label('heji')}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="51">
            <template v-slot="{row}">
                <el-input v-model="row.form[column.id]" style="width:50px" size="mini" :disabled="disabled" class="linetop" v-if="row.order.id>0"></el-input>
                <el-input v-model="form[column.id+'-'+row.order.id]" style="width:50px" size="mini" @keyup.native="onChange(row)" v-if="row.order.id>0"></el-input>
                <el-input :value="getTotal({sizecontentid:column.id})" style="width:50px" size="mini" :disabled="disabled" class="linetop" v-if="row.order.id==0"></el-input>
            </template>
        </el-table-column>
        <el-table-column :label="_label('heji')" align="right" width="53" v-if="hideInput==false">
            <template v-slot="{row}">
                <el-input :value="getLineTotal(row.form)" style="width:50px" size="mini" :disabled="disabled" class="linetop" v-if="row.order.id>0"></el-input>
                <el-input :value="getTotal({orderid:row.order.id})" style="width:50px" size="mini":disabled="disabled" class="inputsum" v-if="row.order.id>0"></el-input>
                <el-input :value="getTotal()" style="width:50px" size="mini":disabled="disabled" class="inputsum" v-if="row.order.id==0"></el-input>
            </template>
        </el-table-column><!-- 
        <el-table-column prop="discount" :label="_label('zhekoulv')" align="center" width="80">
        </el-table-column> -->
        
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
                let [sizecontentid, orderid] = key.split("-")

                //let target = self.formdiscount[supplierid]
                callback({number, sizecontentid, orderid, discount:''})
            })
        }
    }
}

export default {
    name: 'sp-sizecontent-confirm3',
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
        hideInput:{
            default:false
        }
    },
    data() {
        let self = this

        //处理默认填入的下方需要确认或者发货的商品数量
        let form = {}
        let totals = {}
        self.row.orders.forEach(order=>{
            let row = order.confirm_form
            //self._log(row)

            self.columns.forEach(column=>{
                form[column.id+'-'+order.order.id] = row[column.id]
            })
        })        

        return {
            form:form,
            totals,
            tabledata:[[]],
            sumform:{}  //最下面的合计行的数据
        }
    },
    methods: {
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
        getTotal({orderid, sizecontentid}={}){
            let total = 0
            _private(this).forEach(function(item){
                if(item.number>0 && (item.orderid==orderid || !orderid) && (item.sizecontentid==sizecontentid || !sizecontentid)) {
                    total += item.number*1
                }                
            })

            return total
        },
        onChange({order}) {
            let self = this

            let list = []
            _private(this).forEach(item=>{
                let order = self.row.orders.find(order=>order.order.id==item.orderid)
                item.product = self.row.product
                item.order = order.order;
                item.discount = self.row.discount
                list.push(item)              
            })

            self.$emit("change", list)
        },
        rowClassName({row, rowIndex}){
            if(rowIndex==this.row.orders.length) {
                return "sumline"
            }

            return ""
        },
        cellClassName({row, column, rowIndex, columnIndex}) {
            if(rowIndex==this.row.orders.length && this.columns.length+1==columnIndex) {
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
            self.row.orders.forEach(item=>{
                //如果备选的总数大于0，显示
                item.total = self.getLineTotal(item.form)
                //self._log(item.total)
                if(item.total>=0 || true) {
                    results.push(item)
                }                
            })

            results.push({
                discount:'',
                order:{id:0},
                form:self.sumform
            })
            
            return results
        }
    },
    mounted:function(){
        let self = this
        //self.onChange({})
    }
}
</script>
