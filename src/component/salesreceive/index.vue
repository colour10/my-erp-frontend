<template>
    <div style="width:100%">
        <el-form :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-form-item :label="_label('dingda')">
                <simple-select v-model="form.warehouseid" source="warehouse" :lang="_label('lang')"></simple-select>
                <as-button type="primary" @click="search()">{{_label("chaxun")}}</as-button>
            </el-form-item>
        </el-form>
        <sp-table :data="searchresult" border style="width:100%;">
            <el-table-column prop="orderno" :label="_label('dingdanhao')" align="center" sortable>
                <template v-slot="scope">
                    {{scope.row.sales.orderno}}
                </template>
            </el-table-column>
            <el-table-column prop="payment_type_label" :label="_label('fukuanleixing')" width="100" align="center"></el-table-column>
            <el-table-column prop="amount" :label="_label('jine')" width="100" align="center"></el-table-column>
            <el-table-column prop="currency_label" :label="_label('bizhong')" width="100" align="center"></el-table-column>
            <el-table-column prop="paymentdate" :label="_label('fukuanriqi')" width="100" align="center"></el-table-column>
            <el-table-column prop="memo" :label="_label('beizhu')" width="100" align="center"></el-table-column>
            <el-table-column prop="makestaff_name" :label="_label('tijiaoren')" width="100" align="center"></el-table-column>
            <el-table-column prop="maketime" :label="_label('tijiaoshijian')" width="170" align="center"></el-table-column>
            <el-table-column prop="confirmstaff_name" :label="_label('tijiaoren')" width="100" align="center"></el-table-column>
            <el-table-column prop="confirmtime" :label="_label('tijiaoshijian')" width="170" align="center"></el-table-column>
            <el-table-column prop="status_label" sortable :label="_label('yiruzhang')" width="100" align="center"></el-table-column>
            <el-table-column :label="_label('caozuo')" align="center">
                <template v-slot="scope">
                    <auth auth="receive-confirm">
                        <as-button size="mini" @click="confirmPayment(scope)">{{_label("xiangqing")}}</as-button>
                    </auth>
                </template>
            </el-table-column>
        </sp-table>
        <el-pagination v-if="searchresult.length<pagination.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current*1" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total*1">
        </el-pagination>
        <simpleform name="salesreceive" authname="receive-confirm" ref="salesreceive" :title="_label('querenfukuan')" @submit="onConfirm" :isEditable="(f)=>f.status==0"></simpleform>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js'
import { extract, extend } from '../object.js'
import { Salesreceive } from "../model.js"
import Simple_Form from "../Simple_Form.vue"


export default {
    name: 'sp-salesreceive',
    components: {
        "simpleform": Simple_Form
    },
    props: {},
    data() {
        var self = this;

        return {
            form: {
                warehouseid: ""
            },
            searchresult: [],
            pagination: {
                pageSizes: globals.pageSizes,
                pageSize: 15,
                total: 0,
                current: 1
            }
        }
    },
    methods: {
        async search() {
            //查询库存商品
            let self = this

            let result = await self._fetch("/salesreceive/search", self.form)
                //self._log(result)
            self.searchresult = []
            result.data.forEach(async function(item) {
                let row = await Salesreceive.load({ data: item, depth: 1 })
                    //self._log("Orderpayment Record", row)
                self.searchresult.push(row)
            })

            extend(self.pagination, result.pagination)
        },
        confirmPayment({ $index, row }) {
            let self = this;
            row.orderno = row.sales.orderno
            self.$refs['salesreceive'].setInfo(row).setDisabled(['payment_type', 'amount', 'currency'], true)._setting({ submitButtonText: _label('querenfukuan') }).show()
            self.index = $index
        },
        async onConfirm(form) {
            let self = this;
            //this._log("确认保存",form)
            self._confirm(_label("confirm-payment?"), async() => {
                let result = await self._submit("/salesreceive/confirm", extract(form, ['id', 'paymentdate', 'memo']))
                let info = extend(form, result.data)
                self.$refs['salesreceive'].setInfo(info)

                self.search()
            })
        },
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize
            this.loadList()
        },
        handleCurrentChange(current) {
            this.pagination.current = current
            this.loadList()
        }
    },
    computed: {},
    watch: {},
    mounted: function() {
        //this.$refs.product.show();

    }
}
</script>
