<template>
    <div>
        <el-button type="primary" size="mini" @click="handleCreate">新增</el-button>

        <el-tabs v-model="activeTab">
            <el-tab-pane :label="item.title" :name="'color-' + item.id" v-for="item of colorsystems" :key="item.id">
                <el-table :data="item.colors" border fit>
                    <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
                        <template slot-scope="{row}">
                            <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
                            <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('name', 'cn')" width="110px" align="center">
                        <template slot-scope="{row}">
                            <span>{{ row.name_cn }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('name', 'en')" width="110px" align="center">
                        <template slot-scope="{row}">
                            <span>{{ row.name_en }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('name', 'it')" width="110px" align="center">
                        <template slot-scope="{row}">
                            <span>{{ row.name_it }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="showLabel('asabianhao')" width="110px" align="center">
                        <template slot-scope="{row}">
                            <span>{{ row.code }}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="400px">
            <el-form ref="dataForm" :rules="rules" :model="postForm" label-position="left" label-width="80px" style="width: 300px; margin-left:10px;">
                <el-form-item :label="showLabel('name', 'cn')" prop="name_cn">
                    <el-input v-model="postForm.name_cn" />
                </el-form-item>
                <el-form-item :label="showLabel('name', 'en')" prop="name_en">
                    <el-input v-model="postForm.name_en" />
                </el-form-item>
                <el-form-item :label="showLabel('name', 'it')" prop="name_it">
                    <el-input v-model="postForm.name_it" />
                </el-form-item>
                <el-form-item :label="showLabel('asabianhao')" prop="code">
                    <el-input v-model="postForm.code" />
                </el-form-item>
                <el-form-item :label="showLabel('sexi')" prop="color_system_id">
                    <el-select v-model="postForm.color_system_id" class="filter-item">
                        <el-option v-for="item in colorsystems" :key="item.id" :label="item.title" :value="item.id" />
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">
                    {{ showLabel('quxiao') }}
                </el-button>
                <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
                    {{ showLabel('baocun') }}
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
.el-tabs__item {
    font-weight: bolder;
}
#tab-color-1, #tab-color-9 {
    color: #000;
}
#tab-color-2 {
    color: #FF0000;
}
#tab-color-3 {
    color: #FFFF00;
}
#tab-color-4 {
    color: #0000FF;
}
#tab-color-5 {
    color: #00ff00;
}
#tab-color-6 {
    color: #EE82EE;
}
#tab-color-7 {
    color: #A52A2A;
}
#tab-color-8 {
    color: #BEBEBE;
}
</style>

<script>
import { showLabel, StringFunc } from '../globals.js'
import _ from 'lodash'

const defaultForm = {
    id: undefined,
    name_cn: '',
    name_en: '',
    name_it: '',
    picture: '',
    code: '',
    color_system_id: ''
}
export default {
    name: 'colortemplate',
    data() {
        return {
            activeTab: 'color-1',
            colorsystems: [],
            dialogFormVisible: false,
            textMap: {
                update: showLabel('xiugaixinxi'),
                create: showLabel('tianjiaxinxi')
            },
            postForm: Object.assign({}, defaultForm),
            dialogStatus: '',
            rules: {
                name_cn        : [{ required: true, message: showLabel('name', 'cn') + showLabel('required'), trigger: 'blur' }],
                name_en        : [{ required: true, message: showLabel('name', 'en') + showLabel('required'), trigger: 'blur' }],
                name_it        : [{ required: true, message: showLabel('name', 'it') + showLabel('required'), trigger: 'blur' }],
                code           : [{ required: true, message: showLabel('asabianhao') + showLabel('required'), trigger: 'blur' }],
                color_system_id: [{ required: true, message: showLabel('sexi') + showLabel('required'), trigger: 'change' }],
            }
        }
    },
    methods: {
        init() {
            this.getColorSystemAndColor()
        },
        getColorSystemAndColor() {
            let self = this
            self._fetch("/color/getColorSystemAndColor", {}).then(function(res) {
                self.colorsystems = res.data;
            })
        },
        handleCreate() {
            this.dialogStatus = 'create'
            this.resetDialogForm()
            this.showDialogForm()
        },
        handleUpdate(row) {
            Object.assign(this.postForm, row)
            this.dialogStatus = 'update'
            this.showDialogForm()
        },
        handleDelete(row) {
            this.deleteData(row.id)
        },
        showDialogForm() {
            this.dialogFormVisible = true
            if (this.dialogStatus == 'create') {
                let color_system_id = _.replace(this.activeTab, 'color-', '')
                this.postForm.color_system_id = _.parseInt(color_system_id)
            }
        },
        hideDialogForm() {
            this.dialogFormVisible = false
        },
        reloadList() {
            this.getColorSystemAndColor()
        },
        resetDialogForm() {
            this.postForm = Object.assign({}, defaultForm)
        },
        createData() {
            let self = this
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    self._submit("/color/createColor", self.postForm).then(function() {
                        self.hideDialogForm()
                        self.reloadList()
                    })
                }
            })
        },
        updateData() {
            let self = this
            this.$refs['dataForm'].validate((valid) => {
                if (valid) {
                    self._submit("/color/updateColor/" + self.postForm.id, self.postForm).then(function() {
                        self.hideDialogForm()
                        self.reloadList()
                    })
                }
            })
        },
        deleteData(id) {
            let self = this
            self._remove("/color/deleteColor/" +id, {}).then(function() {
                self.reloadList()
            })
        }
    },
    mounted() {
        this.init()
    }
}
</script>
