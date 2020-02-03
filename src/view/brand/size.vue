<template>
    <div>
        <el-button type="primary" size="mini" @click="handleCreate">{{ showLabel('button-create') }}</el-button>
        <el-table v-loading="listLoading" :data="list" border stripe>
            <el-table-column :label="showLabel('caozuo')" align="center" class-name="small-padding fixed-width" width="100">
                <template slot-scope="{row}">
                    <el-button type="default" size="mini" @click="handleUpdate(row)">{{ showLabel('bianji') }}</el-button>
                    <el-button type="danger" size="mini" @click="handleDelete(row)">{{ showLabel('shanchu') }}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="showLabel('pinlei')" prop="brandgroup" width="100"></el-table-column>
            <el-table-column :label="showLabel('zipinlei')" prop="brandgroupchild" width="100"></el-table-column>
            <el-table-column :label="showLabel('xingbie')" prop="gender" width="100"></el-table-column>
            <el-table-column :label="showLabel('chimazu')" prop="sizetop"></el-table-column>
        </el-table>

        <el-dialog :title="dialogTitleMap[dialogStatus]" :visible.sync="dialogFormVisible" :center="true" :modal="false" width="400px">
            <el-form ref="form" :model="form" label-width="80px" size="mini" :rules="rules" :show-message="false">
                <el-form-item :label="showLabel('pinlei')" prop="brandgroup_id">
                   <el-select v-model="form.brandgroup_id" placeholder="">
                       <el-option
                            v-for="item of brandgroups"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                   </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('zipinlei')" prop="brandgroupchild_id">
                    <el-select v-model="form.brandgroupchild_id" placeholder="">
                        <el-option
                            v-for="item of filtedBrandgroupchildren"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('xingbie')" prop="gender">
                    <el-select v-model="form.gender" placeholder="">
                        <el-option
                            v-for="item of genders"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="showLabel('chimazu')" prop="sizetop_id">
                    <el-select v-model="form.sizetop_id" placeholder="">
                        <el-option
                            v-for="item of sizetops"
                            :key="item.id + item.title"
                            :label="item.title"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-row>
                    <el-col :span="24" style="text-align:center;">
                        <el-button type="primary" size="mini" @click="submit">{{ showLabel('baocun') }}</el-button>
                        <el-button type="primary" size="mini" @click="cancel">{{ showLabel('quxiao') }}</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { showLabel } from '@/component/globals'

const defaultForm = {
    brand_id: '',
    brandgroup_id: '',
    brandgroupchild_id: '',
    gender: '',
    sizetop_id: ''
}

export default {
    name: 'size',
    props: {
        brandid: {
            type: Number
        }
    },
    data() {
        return {
            id: 0,
            list: [],
            listLoading: false,
            rules: {
                'brandgroup_id'     : [{required: true, message: showLabel('pinlei') + showLabel('required')}],
                'brandgroupchild_id': [{required: true, message: showLabel('zipinlei') + showLabel('required')}],
                'gender'            : [{required: true, message: showLabel('xingbie') + showLabel('required')}],
                'sizetop_id'        : [{required: true, message: showLabel('chimazu') + showLabel('required')}]
            },
            sizetops: [],
            genders: [],
            brandgroupchildren: [],
            brandgroups: [],
            form: Object.assign({}, defaultForm),
            dialogTitleMap: {
                create: showLabel('xinjian') + showLabel('chimazu'),
                update: showLabel('bianji') + showLabel('chimazu'),
            },
            dialogStatus: '',
            dialogFormVisible: false
        }
    },
    computed: {
        filtedBrandgroupchildren() {
            if (this.id == 0) {
                this.form.brandgroupchild_id = ''
            }
            let self = this
            if (this.form.brandgroup_id) {
                return this.brandgroupchildren.filter(function (item) {
                    return item.brandgroup_id == self.form.brandgroup_id
                })
            } else {
                return this.brandgroupchildren
            }
        }
    },
    methods: {
        getInfo() {
            let self = this
            this._fetch("/brand/sizeInfo", {id: this.id}).then(function(res) {
                self.form.brandgroup_id = res.data.brandgroup_id
                self.form.brandgroupchild_id = res.data.brandgroupchild_id
                self.form.gender = parseInt(res.data.gender)
                self.form.sizetop_id = res.data.sizetop_id
            })
        },
        handleUpdate(row) {
            this.id = row.id
            this.dialogStatus = 'update'
            this.getInfo()
            this.showDialogForm()
        },
        getList() {
            this.list = []
            let self = this
            this.listLoading = true
            this._fetch("/brand/sizes", {brand_id: this.brandid}).then(function(res) {
                self.list = res.data
                self.listLoading = false
            })
        },
        reloadList() {
            this.getList()
        },
        submit() {
            let self = this
            this.$refs.form.validate((valid) => {
                if (valid) {
                    self.form.brand_id = self.brandid
                    self._submit("/brand/addSize", self.form).then(function(res) {
                        self.hideDialogForm()
                        self.reloadList()
                    })
                }
            })
        },
        cancel() {
            this.hideDialogForm()
        },
        handleCreate() {
            this.id = 0
            this.dialogStatus = 'create'
            this.showDialogForm()
        },
        showDialogForm() {
            this.dialogFormVisible = true
        },
        hideDialogForm() {
            this.dialogFormVisible = false
        },
        getBrandgroups() {
            let self = this
            this._fetch("/l/brandgroup", {}).then(function(res) {
                let language = showLabel('lang')
                let name = 'name_' + language

                res.data.forEach(item => {
                    let title = item[name]

                    self.brandgroups.push({
                        id   : item.id,
                        title: title
                    })
                })
            })
        },
        getBrandgroupchildren() {
            let self = this
            this._fetch("/l/brandgroupchild", {}).then(function(res) {
                let language = showLabel('lang')
                let name = 'name_' + language

                res.data.forEach(item => {
                    let title = item[name]

                    self.brandgroupchildren.push({
                        id           : item.id,
                        title        : title,
                        brandgroup_id: item.brandgroupid
                    })
                })
            })
        },
        getGenders() {
            this.genders = []
            let self = this
            this._fetch("/common/genders", {}).then(function(res) {
                for (let index = 1; index < 7; index++) {
                    self.genders.push({
                        id   : index,
                        title: res.data[index]
                    })

                }
            })
        },
        getSizetops() {
            let self = this
            this.sizetops = []
            this._fetch("/l/sizetop", {}).then(function(res) {
                let language = showLabel('lang')
                let name = 'name_' + language

                res.data.forEach(item => {
                    let title = item[name]

                    self.sizetops.push({
                        id   : item.id,
                        title: title
                    })
                })
            })
        }
    },
    watch: {
        brandid (newValue) {
            if (newValue > 0) {
                this.getList()
            }
        }
    },
    mounted() {
        this.getList()
        this.getBrandgroups()
        this.getBrandgroupchildren()
        this.getGenders()
        this.getSizetops()
    }
}
</script>