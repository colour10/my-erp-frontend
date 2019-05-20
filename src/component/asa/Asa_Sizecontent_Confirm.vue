<template>
    <div class="sizecontent">
    <el-table :data="rows" style="width:100%;" :cell-class-name="getCellClass" :border="false">
        <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="51">
            <template v-slot="{row}">
                <el-input v-model="row.form[column.id]" style="width:50px" size="mini" :disabled="disabled"></el-input>
                <el-input v-model="form[row.order.id][column.id]" style="width:50px" size="mini" @keyup.native="onChange(row)" v-if="row.order.id>0"></el-input>
            </template>
        </el-table-column>
        <el-table-column :label="_label('heji')" align="center" width="51">
            <template v-slot="{row}">
                <el-input :value="getLineTotal(row.form)" style="width:50px" size="mini" :disabled="disabled" v-if="row.order.id>0"></el-input>
                <el-input v-model="totals[row.order.id]" style="width:50px" size="mini":disabled="disabled"></el-input>
            </template>
        </el-table-column>
        <el-table-column prop="discount" :label="_label('zhekoulv')" align="center" width="80">
        </el-table-column>
        <el-table-column :label="_label('dinghuokehu')" align="left" width="140">
            <template v-slot="{row}">
                <sp-order-tip column="booking_label" :order="row.order" v-if="row.order.id>0"></sp-order-tip>
            </template>
        </el-table-column>
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
                    row[column.id] = ''
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
        getCellClass() {
            return "counter"
        },
        getLineTotal(formData) {
            this._log(formData)
            let total = 0
            chain(formData).forEach(value=>total+=value*1)
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
                    value = value*1;
                    sum[key] = sum[key] ? sum[key]+value : value;

                    rowsum += value                    
                })

                self.totals[orderid] = rowsum
                total += rowsum
            })
            self.totals[0] = total
            extend(self.sumform, sum)

            self.$emit("change", { row:self.row, form:self.form, total:total })
        }
    },
    computed:{
        rows:function(){
            let self = this
            let results = []
            self.row.orders.forEach(item=>{
                //如果备选的总数大于0，显示
                item.total = self.getLineTotal(item.form)
                self._log(item.total)
                if(item.total>0) {
                    results.push(item)
                }                
            })

            if(results.length>0) {
                results.push({
                    discount:self._label('heji'),
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
