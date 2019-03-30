<template>
    <el-dialog :title="title" :visible.sync="dialogVisible" :center="true" :fullscreen="true" :modal="false">
        <el-form class="user-form" :model="form" label-width="85px" :inline="true" style="width:100%;" size="mini">
            <el-row :gutter="0">
                <el-col :span="6">
                    <el-form-item :label="_label('gonghuoshang')">
                        <simple-select v-model="form.supplierid" source="supplier" :lang="lang">
                        </simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item :label="_label('niandai')">
                        <simple-select v-model="form.ageseason" source="ageseason" :lang="lang"></simple-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-button size="mini" type="primary" @click="onSearch">{{_label("chaxun")}}</el-button>
                    <el-button size="mini" type="primary" @click="onSelect">{{_label("querensuoxuan")}}</el-button>
                </el-col>
            </el-row>
        </el-form>
        <el-row>
            <el-col :span="24">
                <el-table :data="tabledata" border style="width:100%;" v-loading.fullscreen.lock="loading" :row-class-name="tableRowClassName">
                    <el-table-column :label="_label('shangpinmingcheng')" align="center">
                        <template v-slot="scope">
                            {{scope.row.orderdetails.product.productname}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('chima')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.orderdetails.sizecontent.getLabel()}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('shengyushuliang')" width="200" align="center">
                        <template v-slot="scope">
                            {{scope.row.orderdetails.number-scope.row.orderdetails.confirm_number}}
                        </template>
                    </el-table-column>
                    <el-table-column :label="_label('fahuoshuliang')" width="200" align="center">
                        <template v-slot="scope">
                            <el-input-number v-model="scope.row.number" :min="0" :max="scope.row.orderdetails.number-scope.row.orderdetails.confirm_number"></el-input-number>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import globals,{OrderDetails} from '../globals.js'
import simple_select from '../Simple_Select.vue'
import DataSource from '../DataSource.js'

export default {
    name: 'asa-select-order-detail-dialog',
    components: {
        'simple-select': simple_select
    },
    props: {
        visible: {
            type: Boolean
        },
    },
    data() {
        var self = this;

        return {
            form: {
                supplierid: "",
                ageseason: ""
            },
            tabledata: [],
            dialogVisible: self.visible,
            title: "",
            lang: ""            
        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            //_log(row)
            if (row.number > 0) {
                //_log(row)
                return "success-row"
            }
        },
        loadPage() {
            var self = this;
            self._fetch("/confirmorder/search", self.form, function(res) {
                //self._log("loadPage", res)

                //处理商品信息列表
                res.data.list.forEach(function(row) {
                    OrderDetails.get(row, function(orderdetails) {
                        self._log("detail", orderdetails)
                        self.tabledata.push({number:0,orderdetails})
                    },1)
                })
            });
        },
        onSearch() {
            this.loadPage();
        },
        onSelect() {
            var self = this
            self.dialogVisible = false;
            self.$emit("select", self.tabledata.filter(item => item.number > 0))
            self.tabledata = []
        }
    },
    mounted: function() {},
    watch: {
        dialogVisible(newValue) {
            this.$emit("update:visible", newValue)
        },
        visible(newValue) {
            //console.log("visible", newValue)
            this.dialogVisible = newValue
        }
    }
}
</script>
