<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <as-button type="primary" @click="saveOrder(1)">{{_label("shenqing")}}</as-button>
                <as-button type="primary" @click="showProduct()">{{_label("xuanzeshangpin")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="6" style="width:150px">
                    <el-form-item :label="_label('tongyidiaoru')">
                        <el-switch v-model="form.allin" active-value="1" inactive-value="0"></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('diaorucangku')">
                        <simple-select v-model="form.in_id" source="warehouse" :disabled="form.allin==0">
                        </simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24">
                <el-table :data="tabledata" stripe border style="width:100%;">
                    <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                        <template v-slot="scope">
                            {{scope.row.product.productname}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sizecontent_label" :label="_label('chima')" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="warehousename" :label="_label('cangku')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.warehouse.name}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('kucunshuliang')" width="200" align="center">
                    </el-table-column>
                    <el-table-column prop="select_number" :label="_label('diaorucangku')" width="200" align="center">
                        <template v-slot="scope">
                            <simple-select v-if="form.allin!=1" v-model="scope.row.in_id" source="warehouse"></simple-select>
                            <simple-select v-if="form.allin==1" v-model="form.in_id" source="warehouse" disabled></simple-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="select_number" :label="_label('diaoboshuliang')" width="200" align="center">
                        <template v-slot="scope">
                            <el-input-number v-model="scope.row.select_number" :min="1" :max="scope.row.number*1"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('caozuo')" width="150" align="center">
                        <template v-slot="scope">
                            <as-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">{{_label('shanchu')}}</as-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>

        <sp-productstock-search ref="stocksearch" @select="onSelect"></sp-productstock-search>
    </div>
</template>

<script>
export default {
    name: 'asa-requisition-dialog',
    data() {
        var self = this;

        return {
            form: {
                allin: 0,
                out_id: "",
                in_id: "",
                memo: "",
            },
            tabledata: [],
        }
    },
    methods: {
        showProduct() {
            this.$refs.stocksearch.setVisible(true)
        },
        onSelect(row) {
            var self = this;
            let index = self.tabledata.findIndex(item => item.id == row.id)
            if (index < 0) {
                row.select_number = 1
                row.number = row.number * 1
                row.in_id = ""
                self.tabledata.unshift(row)
            }
        },
        saveOrder(status) {
            //保存订单
            var self = this

            if (!confirm(self._label('order_submit_confirm'))) {
                return
            }

            var params = { form: self.form }
            var array = []
            params.list = self.tabledata.map(item => {
                if (self.form.allin == 1) {
                    return { out_id: item.warehouseid, productstockid: item.id, number: item.select_number, in_id: self.form.in_id }
                } else {
                    return { out_id: item.warehouseid, productstockid: item.id, number: item.select_number, in_id: item.in_id }
                }

            })
            self._log(JSON.stringify(params))
            self._submit("/requisition/save", { params: JSON.stringify(params) }).then(function(res) {
                self.$emit("change")
            });
        }
    },
    mounted:function(){
        let self = this
        self._setTitle(self._label("xinjiandiaobodan"))
    }
}
</script>
