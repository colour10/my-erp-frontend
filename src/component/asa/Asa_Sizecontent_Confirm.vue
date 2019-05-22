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
                <el-input v-model="row.form[column.id].number" style="width:50px" size="mini" :disabled="disabled" class="linetop"></el-input>
                <el-input v-model="form[row.order.id][column.id].number" style="width:50px" size="mini" @keyup.native="onChange(row)" v-if="hideInput==false && row.order.id>0"></el-input>
            </template>
        </el-table-column>
        <el-table-column :label="_label('heji')" align="right" width="53" v-if="hideInput==false">
            <template v-slot="{row}">
                <el-input :value="getLineTotal(row.form)" style="width:50px" size="mini" :disabled="disabled" v-if="row.order.id>0" class="linetop"></el-input>
                <el-input v-model="totals[row.order.id]" style="width:50px" size="mini":disabled="disabled" class="inputsum"></el-input>
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

export default {
    name: 'sp-sizecontent-confirm',
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
                if(!row[column.id]) {
                    row[column.id] = {}
                }
            })
            //row.orderid = order.order.id
            form[order.order.id] = row
            totals[order.order.id] = 0
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
            chain(formData).forEach(value=>total+= value.number*1)
            return total
        },
        onChange({order}) {
            let self = this

            //计算列的合计
            let sum = {}
            let total = 0
            chain(self.form).forEach((item, orderid)=>{
                let rowsum = 0
                chain(item).forEach((value, key)=>{
                    let number = value.number*1;
                    if(!sum[key]) {
                        sum[key] = {
                            id:"",
                            number:number
                        }
                    }
                    else {
                        sum[key].number += number
                    }

                    rowsum += number                   
                })

                self.totals[orderid] = rowsum
                total += rowsum
            })
            self.totals[0] = total
            extend(self.sumform, sum)

            self.$emit("change", { row:self.row, form:self.form, total:total })
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
                this._log("columnIndex=", columnIndex)
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
                if(item.total>0) {
                    results.push(item)
                }                
            })

            if(results.length>0 && self.hideInput==false) {
                results.push({
                    discount:'',
                    order:{id:0},
                    form:self.sumform
                })
            }
            
            return results
        }
    },
    mounted:function(){
        let self = this

        //备选总数为0
        if(self.rows.length==0) {
            self.$emit("hidden",self.row)
        }
        self.onChange({})
    }
}
</script>
