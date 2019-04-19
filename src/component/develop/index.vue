<template>
    <div>
        <el-form :model="form" label-width="80px">
            <el-form-item label="表明">
                <el-input v-model="form.table_name"></el-input>
            </el-form-item>
            <el-form-item label="说明">
                <el-input v-model="form.remark"></el-input>
            </el-form-item>
            <el-form-item label="父类">
                <el-radio v-model="form.parent" label="CadminController">CadminController</el-radio>
  <el-radio v-model="form.parent" label="ZadminController">ZadminController</el-radio>
            </el-form-item>
        </el-form>     
        <as-button type="primary" @click="onCreate">生成</as-button>
    </div>
</template>

<script>
import globals from '../globals.js'


export default {
    name: 'page-develop',
    components: {
        // 'simple-admin-tablelist':Simple_Admin_TableList
    },
    data() {
        return {
            form:{
                table_name: 'tb_price_define',
                remark: '',
                parent:""
            }
        }
    },
    methods: {
        onCreate() {
            let self = this
            let array = self.form.table_name.split('_')
            let model = array.map(item=>item.substr(0,1).toUpperCase()+item.substr(1)).join('')
            console.log(model)
            array.shift()
            let controller = array.map(item=>item.substr(0,1).toUpperCase()+item.substr(1)).join('')
            controller = controller.substr(0,1)+controller.substr(1).toLowerCase();
            //console.log(controller.substr(0,1)+controller.substr(1).toLowerCase())

            let params = Object.assign({}, self.form, {model, controller})
            self._submit("/index/create", params).then(function() {

            })
        }
    },
    mounted: function() {
        this._log(this)
    }
}

</script>