<template>
    <div>
        <simple-admin-page v-bind="supplier" ref="page"></simple-admin-page>
        <el-dialog :title="title" class="user-form" :visible.sync="dialogVisible" :center="true" width="80%">
            <el-tabs type="border-card" v-model="currentTab">                
                <el-tab-pane :label="_label('kaipiaoxinxi')" name="invoice">
                    <simple-admin-page v-bind="supplierinvoice"></simple-admin-page>
                </el-tab-pane>

                <el-tab-pane :label="_label('kaihuhang')" name="bank">
                    <simple-admin-page v-bind="supplierbank"></simple-admin-page>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
import { _label } from '../globals.js'
import { getProp } from "../prop.js"

const supplierinvoice = getProp('supplierinvoice');
const supplier = getProp('supplier');
const supplierbank = getProp('supplierbank')

export default {
    name: 'asapage-supplier',
    components: {},
    props: {},
    data() {
        var self = this;

        supplier.buttons = [{
            name: "code",
            label: _label('guanlianxinxi'),
            width: 150,
            disable_change: true,
            handler: function(rowIndex, row) {
                supplierinvoice.base.supplierid = row.id;
                supplierbank.base.supplierid = row.id
                self.title = row.suppliername
                self.dialogVisible = true;
            }
        }];

        return {
            supplier,
            supplierinvoice,
            supplierbank,
            dialogVisible: false,
            currentTab:"invoice",
            title:""
        }
    },
    methods: {}
}
</script>
