<template>
    <div>
        <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row type="flex" justify="start">
                <as-button :type="form.status==2?'primary':'info'" @click="cancel">{{_label("zuofei")}}</as-button>
                <as-button :type="form.status==2?'primary':'info'" @click="confirmout">{{_label("chukuqueren")}}</as-button>
                <as-button :type="form.status==3?'primary':'info'" @click="confirmin">{{_label("rukuqueren")}}</as-button>
            </el-row>
            <el-row :gutter="0">
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('shenqingren')">
                        <sp-display-input :value="form.apply_staff" source="user"></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="_label('shenqingriqi')">
                        <el-input :value="form.apply_date" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('zhuangtai')">
                        <sp-display-input :value="form.status" source="requisitionstatus"></sp-display-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('chukuqueren')">
                        <sp-display-input :value="form.turnout_staff" source="user"></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="_label('chukushijian')">
                        <el-input :value="form.turnout_date" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('diaochucangku')">
                        <sp-display-input :value="form.out_id" source="warehouse"></sp-display-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6" style="width:300px">
                    <el-form-item :label="_label('rukuqueren')">
                        <sp-display-input :value="form.turnin_staff" source="user"></sp-display-input>
                    </el-form-item>
                    <el-form-item :label="_label('rukushijian')">
                        <el-input :value="form.turnin_date" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="_label('diaorucangku')">
                        <sp-display-input :value="form.in_id" source="warehouse"></sp-display-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24">
                <el-table ref="list" :data="tabledata" stripe border style="width:100%;">
                    <el-table-column prop="productname" :label="_label('guojima')" align="center">
                        <template v-slot="{row}">
                            {{row.productstock.product.getGoodsCode()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                        <template v-slot="{row}">
                            {{row.productstock.product.getName()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sizecontent_label" :label="_label('chima')" width="80" align="center">
                        <template v-slot="{row}">
                            {{row.productstock.sizecontent_label}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('diaoboshuliang')" width="100" align="center"></el-table-column>
                    <el-table-column prop="out_number" :label="_label('chukushuliang')" width="200" align="center" v-if="form.status>2" key="1"></el-table-column>
                    <el-table-column prop="in_number" :label="_label('rukushuliang')" width="200" align="center" v-if="form.status==5" key="2"></el-table-column>
                    <el-table-column :label="_label('chukushuliang')" width="250" align="center" v-if="form.status==2" key="3">
                        <template v-slot="scope">
                            <el-input-number v-model="scope.row.select_number" :min="0" :max="scope.row.number*1"></el-input-number>
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('rukushuliang')" width="250" align="center" v-if="form.status==3" key="4">
                        <template v-slot="{row}">
                            <el-input-number v-model="row.select_number" :min="0" :max="row.out_number*1" :disabled="row.out_number==0"></el-input-number>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { copyTo } from "../object.js"
import { Productstock } from "../model.js"

export default {
    name: 'asa-requisition-detail-dialog',
    data() {
        let self = this;

        return {
            form: {
                apply_staff: "",
                apply_date:"",
                turnout_staff: "",
                turnout_date:"",
                turnin_staff: "",
                turnin_date:"",
                out_name: "",
                in_name: "",
                status: "",
                in_id: "",
                out_id:"",
                id:""
            },
            tabledata: []
        }
    },
    methods: {
        doAction(action) {
            //保存订单
            let self = this

            if (!confirm(self._label('order_submit_confirm'))) {
                return
            }

            let params = { id: self.form.id }
            let array = {}
            let total = 0,
                total_number = 0
            self.tabledata.forEach(item => {
                array[item.id] = item.select_number;
                total += item.select_number;
                total_number += item.number;
            })

            params.total = "";
            if (total == 0) {
                params.total = 'deny';
            } else if (total_number == total) {
                params.total = "allow"
            }
            params.list = array;

            self._log(JSON.stringify(params))
            self._submit("/requisition/" + action, { params: JSON.stringify(params) }).then(function(res) {
                self.init(res)
            });
        },
        confirmout() {
            this.doAction('confirmout')
        },
        confirmin() {
            this.doAction('confirmin')
        },
        cancel(){
            let self = this;
            self.tabledata.forEach(item=>item.select_number=0);
            self.doAction("confirmout");
        },
        init(result) {
            let self = this
            //self._log("加载订单信息", result)

            copyTo(result.data.form, self.form)

            self.tabledata = []
            result.data.list.forEach(item=>{
                Productstock.load({data:item.out_productstockid, depth:2}).then(productstock=>{
                    self._log(productstock)
                    item.productstock = productstock
                    item.select_number = 0
                    self.tabledata.push(item)
                })
            })
        }
    },
    mounted: function() {
        let self = this;

        let route = self.$route;
        if (route.params.id > 0) {
            self._setTitle(self._label("diaobodan")+":"+ route.params.id )
            self._fetch("/requisition/load", { id: route.params.id }).then(function(res) {
                self.init(res)
            })
        } else {
            self._setTitle(self._label("diaobodan"))
        }
    }
}
</script>
