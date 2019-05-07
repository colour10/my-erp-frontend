<template>
    <div>
        <el-input v-model="currentText" :readonly="true" @click.native="onShowDialog">
            <as-button slot="append" icon="el-icon-more"></as-button>
        </el-input>
        <el-dialog class="user-form" :title="_label('caizhiguanli')" :visible.sync="dialogVisible" :center="true" :modal="false">
            <el-row>
                <el-col :span="24">
                    <simple-admin-page v-bind="props" ref="page2" @before-add="onShowForm" @before-edit="onShowForm">
                        <template v-slot="{form,columns}">
                            <el-form class="user-form" ref="form" :model="form" label-width="100px" :inline="false" size="mini">
                            <el-form-item :label="item.label" v-if="!item.is_edit_hide" v-for="item in columns" :key="item.name" :class="item.class?item.class:'width2'">
                                <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]" size="mini"></el-input>
                                <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source"></simple-select>
                            </el-form-item>
                        </el-form>
                        </template>
                    </simple-admin-page>
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
import { _label,StringFunc } from '../globals.js'

export default {
    name: 'product-material',
    props: {
        select_value: {
            required: true
        },
        brandgroupid:{
            default:""
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
                    { name: "percent", label: _label('baifenbi'),convert:item=>item.percent+'%',default:'100'},
                    { name: "materialnoteid", label: _label('caizhibeizhu'), type: "select", source: "materialnote" }
                ],
                controller: "productmaterial",
                options:{
                    inline:true,
                    isSubmit:false,
                    autohide:true
                }
            },
            dialogVisible: false,
            currentText:"",
            data:[]
        }
    },
    methods: {
        onShowForm() {
            let self = this
            let callback = row=>{
                //self._log("xxx",row)
                //self._log(row.row.content_cn,row.row.brandgroupids, self.brandgroupid, (','+row.row.brandgroupids + ',').indexOf(','+self.brandgroupid+','))
                return StringFunc.include(row.row.brandgroupids, self.brandgroupid)
            }
            //self.dialogVisible = true;

            setTimeout(function(){
                self.$refs['materialnoteid'][0].filterx(callback)
                //self._log("data", self.data)
            },100)
        },
        onShowDialog() {
            let self = this
            self.dialogVisible = true
            setTimeout(function(){
                self.$refs['page2'].setTableData(self.data)
                
            },100)
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
            let self = this;

            let promises = self.data.map(async (item) =>{
                let dataSource = DataSource.getDataSource("material", self._label('lang'))
                //self._log(item,dataSource)
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
            //self._log("setData", data)
            self.convertText()
            return self;
        }
    },
    watch: {
        select_value(newValue) {
            var self = this
            //self._log("change",newValue)
            self.setData(newValue)
        }
    },
    mounted: function() {
        var self = this;
        //self._log("mounted",self.select_value)
        self.setData(self.select_value)
        
    }
}
</script>
