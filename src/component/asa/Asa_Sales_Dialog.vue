<template>
    <div>
        <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
            <el-form class="order-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
                <el-row :gutter="0">
                    <el-col :span="6">
                        <el-form-item :label="_label('huiyuan')">
                            <simple-select v-model="form.memberid" source="member" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('xiaoshouren')">
                            <simple-select v-model="form.salesstaff" source="user" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('waitudingdanhao')">
                            <el-input v-model="form.externalno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('xiaoshoucangku')">
                            <simple-select v-model="form.warehouseid" source="warehouse" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('duizhangdanhao')">
                            <el-input v-model="form.ordercode"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('xiaoshouriqi')">
                            <el-date-picker v-model="form.salesdate" type="date" value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label="_label('tihuofangshi')">
                            <simple-select v-model="form.pickingtype" source="pickingtype" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('zhidanriqi')">
                            <el-input :value="form.sys_create_date" :placeholder="_label('zidonghuoqu')" disabled></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('zhidanren')">
                            <sp-display-input :value="form.sys_create_stuff" source="user"></sp-display-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item :label="_label('kuaidifukuanfang')">
                            <simple-select v-model="form.expresspaidtype" source="expresspaidtype" :lang="lang"></simple-select>
                        </el-form-item>
                        <el-form-item :label="_label('kuaididanhao')">
                            <el-input v-model="form.expressno"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('kuaidifeiyong')">
                            <el-input v-model="form.expressfee"></el-input>
                        </el-form-item>
                        <el-form-item :label="_label('shouhuodizhi')">
                            <el-input v-model="form.address"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-button :type="canYushou?'primary':'info'" @click="yushou()">{{_label("yushou")}}</el-button>
                        <el-button :type="canTijiao?'primary':'info'" @click="tijiao()">{{_label("tijiao")}}</el-button>
                        <el-button :type="form.id>0 && form.status!=2 ?'primary':'info'" @click="showAttachment()">{{_label("fujian")}}</el-button>
                        <el-tooltip class="item" effect="dark" content="Right Bottom 提示文字" placement="bottom">
                            <el-button :type="canZuofei?'primary':'info'" @click="zuofei()">{{_label("zuofei")}}</el-button>
                        </el-tooltip>
                    </el-col>
                </el-row>
            </el-form>
            <el-row type="flex" justify="end">
                <el-col :offset="22" :span="2">
                    <el-button type="primary" @click="showProduct()" :type="isEditable?'primary':'info'">{{_label("xuanzeshangpin")}}</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-table :data="tabledata" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
                        <el-table-column prop="productname" :label="_label('chanpinmingcheng')" align="center">
                            <template v-slot="scope">
                                {{scope.row.product.productname}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                            <template v-slot="scope">
                                {{scope.row.sizecontent.getLabel()}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" :label="_label('dinggoushuliang')" width="200" align="center">
                            <template v-slot="scope">
                                <el-input-number v-model="scope.row.number" :min="1" :max="10" :disabled="!isEditable"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column :label="_label('caozuo')" width="150" align="center" v-if="isEditable">
                            <template v-slot="scope">
                                <el-button size="mini" type="danger" @click="deleteRow(scope.$index, scope.row)">{{_label('shanchu')}}</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-col>
            </el-row>
        </el-dialog>
        <asa-select-product-dialog :visible.sync="pro" @select="onSelect"></asa-select-product-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'
import Asa_Select_Product_Dialog from './Asa_Select_Product_Dialog.vue'
import DataSource from '../DataSource.js'


export default {
    name: 'asa-sales-dialog',
    components: {
        'simple-select': simple_select,
        'asa-select-product-dialog': Asa_Select_Product_Dialog
    },
    props: {
        visible: {
            type: Boolean
        },
        data: {
            type: Object
        }
    },
    data() {
        var self = this;

        var dataSource = DataSource.getDataSource('sizecontent', globals.getLabel('lang'));
        return {
            form: {
                memberid: "",
                salesstaff: "",
                externalno: "",
                warehouseid: "",
                salesdate: "",
                ordercode: "",
                pickingtype: "",
                expresspaidtype: "",
                expressno: "",
                expressfee: "",
                address: "",
                status: "", //销售单状态：0-预售 1-已售 2-作废
                id: ""
            },
            tabledata: [],
            dialogVisible: self.visible,
            title: "",
            lang: "",
            pro: false,
            globals,
            dataSource,
            formid: ""
        }
    },
    methods: {
        showProduct() {
            let self = this
            if (self.isEditable) {
                self.pro = true;
            }
        },
        onSelect(row) {
            var self = this;
            self.dataSource.filter({
                topid: row.sizetopid
            }, data => {
                data.map(item => {
                    self.tabledata.unshift({
                        productid: row.id,
                        sizecontentid: item.getValue(),
                        orderid: 0,
                        number: 0,
                        sizecontent: item,
                        product: row
                    })
                })
            })
        },
        saveOrder(status) {
            //保存订单
            var self = this

            //订单已经作废了。
            if (self.form.status == 2) {
                return
            }

            self.form.status = status
            var params = { form: self.form }
            var array = []
            params.list = self.tabledata.map(item => {
                return { productid: item.productid, id: item.id, sizecontentid: item.sizecontentid, number: item.number }
            })
            self._log(JSON.stringify(params))
            self._submit("/sales/savesale", {
                params: JSON.stringify(params)
            }, function(res) {
                self._log(res)
                let form = res.data.form
                if (form.id) {
                    self.form.id = form.id
                    self.formid = form.id
                }

                //通知列表，数据变化了
                self.$emit("change", res.data.form)
            });
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        showAttachment() {
            let self = this
            if (self.form.id > 0 && self.form.status != 2) {
                //done
            }
        },
        zuofei() {
            const self = this
            if (!self.canZuofei) {
                return;
            }

            self.$confirm(self._label('zuofei_warning'), self._label('tip'), {
                confirmButtonText: self._label('ok'),
                cancelButtonText: self._label('cancel'),
                type: 'warning'
            }).then(() => {
                self.saveOrder(2)
            })
        },
        yushou() {
            let self = this
            if (self.canYushou) {
                this.saveOrder(0)
            }
        },
        tijiao() {
            const self = this
            if (!self.canTijiao) {
                return
            }

            self.$confirm(self._label('tijiao_warning'), self._label('tip'), {
                confirmButtonText: self._label('ok'),
                cancelButtonText: self._label('cancel'),
                type: 'warning'
            }).then(() => {
                self.saveOrder(1)
            })
        },
        deleteRow(rowIndex, row) {
            var self = this;
            self.$delete(self.tabledata, rowIndex)
        },
        appendRow(row) {
            const self = this;
            self.dataSource.getRow(row.sizecontentid, data => {
                row.sizecontent = data
                self.tabledata.unshift(row)
            })
        }
    },
    computed: {
        isEditable() {
            var status = this.form.status;
            return status == 0 || status == '' || !status
        },
        canZuofei() {
            return this.form.id > 0 && this.form.status == 0
        },
        canTijiao() {
            let form = this.form
            return form.id == '' || form.status != 2
        },
        canYushou() {
            let form = this.form
            return form.id == "" || form.status == 0
        }
    },
    watch: {
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //self._log("visible", newValue)
            this.dialogVisible = newValue
        },
        data(newValue) {
            var self = this
            var form = self.form;
            self._log("copy data1", newValue, form)

            //清空当前表单数据，并复制新记录的数据
            $ASA.empty(form)
            $ASA.copyTo(newValue, form)
            self._log("copy data2", newValue)

            //如果订单的id变化了，则清空明细，重新加载新订单的明细
            if (form.id != self.fomrid) {
                self.tabledata = []

                if (form.id != "") {
                    //加载数据
                    self._fetch("/sales/loadsale?id=" + form.id, function(res) {
                        self._log("加载订单信息", res)
                        if (res.data.list) {
                            res.data.list.forEach(item => {
                                self._log(item)
                                self.appendRow(item)
                            })
                        }
                    })
                }
            }

        }
    }
}
</script>
