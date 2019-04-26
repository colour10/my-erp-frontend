<template>
    <div>
        <el-input v-model="currentText" :readonly="true">
            <as-button slot="append" icon="el-icon-more" @click="dialogVisible = true"></as-button>
        </el-input>
        <el-dialog class="user-form" :title="_label('caizhiguanli')" :visible.sync="dialogVisible" :center="true" :modal="false">
            <el-row>
                <el-col :span="24">
                    <simple-admin-page v-bind="props" ref="page2"></simple-admin-page>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer" v-if="!auto_model">
                <as-button type="primary" @click="handleSelect">{{_label("ok")}}</as-button>
                <as-button @click="handleCancel">{{_label("cancel")}}</as-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import DataSource from '../DataSource.js'
import { _label } from '../globals.js'

export default {
    name: 'product-material',
    props: {
        select_value: {
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        auto_model:{}
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        var self = this

        return {
            props:{
                columns: [
                    { name: "materialid", label: _label('caizhi'), type: "select", source: "material" },
                    { name: "percent", label: _label('baifenbi'),convert:item=>item.percent+'%'},
                    { name: "materialnoteid", label: _label('caizhibeizhu'), type: "select", source: "materialnote" },
                ],
                controller: "productmaterial",
                options:{
                    inline:true,
                    issubmit:false,
                    autohide:true
                }
            },
            dialogVisible: false,
            currentText:"",
            data:[]
        }
    },
    methods: {
        onShow() {
            let self = this
            self.dialogVisible = true;
            self.$refs['page2'].setTableData(data)
        },
        handleSelect() {
            var self = this;

            self.data = self.$refs['page2'].getTableData();
            self.$emit('change', self.data)
            self.dialogVisible = false;
        },
        handleCancel() {
            var self = this;
            self.dialogVisible = false;
        },
        convertText() {
            var self = this;

            self.currentText

            let promises = self.data.map(async (item) =>{
                let dataSource = DataSource.getDataSource("material", self._label('lang'))
                self._log(item,dataSource)
                let name = await dataSource.getRowLabel(item.materialid)
                return name + item.percent + "%"
            })

            Promise.all(promises).then(function(results) {
                //console.log(results)
                self.currentText = results.join(',')
            });
        },
        setData(data) {
            let self = this;
            self.data = data
            self._log("setData", data)
            self.convertText()
            return self;
        }
    },
    watch: {
        select_value(newValue) {
            var self = this
            self._log("change",newValue)
            self.setData(newValue)
        }
    },
    mounted: function() {
        var self = this;
        self._log("mounted",self.select_value)
        self.setData(self.select_value)
        
    }
}
</script>
