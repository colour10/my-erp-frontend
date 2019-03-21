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
                    <el-table-column prop="productname" :label="_label('shangpinmingcheng')" align="center">
                        <template v-slot="scope">
                            {{scope.row.id}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" :label="_label('chima')" width="100" align="center">
                        <template v-slot="scope">
                            {{scope.row.sizecontent.getLabel()}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('shengyushuliang')" width="200" align="center">
                        <template v-slot="scope">
                            {{scope.row.number-scope.row.actualnumber}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="number" :label="_label('dinggoushuliang')" width="200" align="center">
                        <template v-slot="scope">
                            <el-input-number v-model="scope.row.select_number" :min="0" :max="scope.row.number-scope.row.actualnumber"></el-input-number>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </el-dialog>
</template>

<script>
import globals from '../globals.js'
import simple_select from '../Simple_Select.vue'
import DataSource from '../DataSource.js'

const _log = globals.logger("asa-select-order-detail-dialog");

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

        var dataSource = DataSource.getDataSource('sizecontent', globals.getLabel('lang'));
        return {
            form: {
                supplierid: "",
                ageseason: ""
            },
            tabledata: [],
            dialogVisible: self.visible,
            title: "",
            lang: "",
            globals,
            dataSource
        }
    },
    methods: {
        tableRowClassName({ row, rowIndex }) {
            //_log(row)
            if (row.select_number > 0) {
                //_log(row)
                return "success-row"
            }
        },
        loadPage() {
            var self = this;
            var form = self.form
            self._fetch("/orderdetails/list", {}, function(res) {
                //_log("loadPage", res)

                res.data.forEach(row => {
                        self.dataSource.getRow(row.sizecontentid, data => {
                            row.sizecontent = data
                            row.select_number = 0 //默认0个
                            self.tabledata.push(row)
                        })
                    })
                    //self.tabledata = res;
            });
        },
        onSearch() {
            this.loadPage();
        },
        onSelect() {
            var self = this
            self.dialogVisible = false;
            self.$emit("select", self.tabledata.filter(item=>item.select_number>0))
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
