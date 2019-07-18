<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <as-button type="primary" @click="saveOrder">{{_label("shenqing")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('diaobofangshi')">
                        <simple-select v-model="form.requisitiontype" source="requisitiontype"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px" v-if="form.requisitiontype=='1'">
                    <el-form-item :label="_label('diaochucangku')">
                        <simple-select v-model="form.out_id" source="warehouse" @change="onOutChange"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px" v-if="form.requisitiontype=='2'">
                    <el-form-item :label="_label('diaorucangku')">
                        <simple-select v-model="form.in_id" source="warehouse" @change="onInChange"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px"  v-if="form.requisitiontype>0">
                    <el-form-item :label="_label('beizhu')">
                        <el-input v-model="form.memo"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row v-if="form.requisitiontype=='1' && form.out_id>0">
            <el-col :span="24" class="product">
                <sp-requisition-out ref="requisition" :out_id="form.out_id"> </sp-requisition-out>

            </el-col>
        </el-row>
        <el-row v-if="form.requisitiontype=='2' && form.in_id>0">
            <el-col :span="24" class="product">
                <sp-requisition-in ref="requisition" :in_id="form.in_id"> </sp-requisition-in>

            </el-col>
        </el-row>
    </div>
</template>

<script>
import { extend } from '../object.js';
import Asa_Requisition_Out from '../asa/Asa_Requisition_Out.vue';
import Asa_Requisition_In from '../asa/Asa_Requisition_In.vue';
import API from '../api.js';

export default {
    name: 'sp-requisitioncreate',
    components: {
        [Asa_Requisition_Out.name]: Asa_Requisition_Out,
        [Asa_Requisition_In.name]: Asa_Requisition_In,
    },
    data() {
        let self = this;

        return {
            form: {
                requisitiontype: '',
                out_id: "",
                in_id: "",
                memo: "",
            },
            index: 1,
            tabledata: [],
            productstocks: [],
        }
    },
    methods: {
        onOutChange() {
            const self = this;

            if(self.form.out_id>0) {
                self.tabledata.forEach(item=>{
                    item.out_id = self.form.out_id;
                });
            }

            let item = self.tabledata.pop();
            if(item) {
                self.tabledata.push(item);
            }
        },
        onInChange() {
            const self = this;

            if(self.form.in_id>0) {
                self.tabledata.forEach(item=>{
                    item.in_id = self.form.in_id;
                });
            }
        },
        async onWarehouseChange(warehouseid, {product,sizecontentid}) {
            let self = this;
            let result = await API.getProductstock({
                productid: product.id,
                sizecontentid,
            });
            // self._log(result);
        },
        async onSelect({product, number, sizecontentid}) {
            let self = this;

            let result = await API.getProductstock({
                productid: product.id,
                sizecontentid,
            });
            //self._log(result);
            result.forEach(item=>{
                self.productstocks.push(item);
            });

            self.tabledata.push({
                index: self.index,
                product,
                number,
                sizecontentid,
                property: 1,
                defective_level: 1,
                stock_number: '', // 库存数量
                in_id: self.form.in_id,
                out_id: self.form.out_id,
            });

            self.index += 1;
        },
        saveOrder() {
            //保存订单
            let self = this;



            let params = { memo: self.form.memo };
            params.list = self.$refs.requisition.getList();
            for(let i=0;i<params.list.length;i++) {
                let row = params.list[i];
                if(row.out_id>0 && row.in_id>0) {
                    if(row.stock_number>=row.number) {
                        continue;
                    }
                    else {
                        // 库存不足
                        alert(self._label('kucunbuzu'));
                        return ;
                    }
                }
                else {
                    // 请选择仓库
                    alert(self._label('qingxuanzecangku'));
                    return ;
                }
            }

            if (!confirm(self._label('order_submit_confirm'))) {
                return;
            }
            //self._log(JSON.stringify(params))
            self._submit("/requisition/save", { params: JSON.stringify(params) }).then(function(res) {
                extend(self.form, {
                    out_id: "",
                    in_id: "",
                    memo: "",
                });
                self.tabledata = [];
                self.productstocks = [];
            });
        },
    },
    mounted() {
        let self = this;
        self._setTitle(self._label("xinjiandiaobodan"));
    },
    computed: {
        stockStat() {
            let self = this;
            let result = {};

            self.productstocks.forEach(item=>{
                let key = [item.productid, item.sizecontentid, item.property, item.defective_level, item.warehouseid].join('-');
                result[key] = item.number-item.reserve_number;
            });

            return result;
        },
        stocks() {
            let self = this;
            let result = {};
            let stat = self.stockStat;

            self.tabledata.forEach(item=>{
                let key = [item.product.id, item.sizecontentid, item.property, item.defective_level, item.out_id].join('-');
                result[item.index] = stat[key] || 0;
            });

            return result;
        },
        filterMethods() {
            let self = this;
            let result = {};
            let stat = self.stockStat;
            //console.log("filterMethods change", new Date());
            self.tabledata.forEach(item=>{
                result[item.index] = function(keyword, option) {
                    //console.log(item, option, self.form.out_id==option.id);
                    let key = [item.product.id, item.sizecontentid, item.property, item.defective_level, option.id].join('-');
                    return self.form.out_id==option.id || item.out_id==option.id || (stat[key] && stat[key]>0);
                };
            });

            return result;
        },
    },
};
</script>
