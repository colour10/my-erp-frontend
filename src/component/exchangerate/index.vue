<template>
    <div>
        <simple-admin-page v-bind="props" ref="page">
            <!-- <template v-slot="scope">
                <el-form class="user-form" ref="form" :model="scope.form" label-width="100px" :inline="true" size="mini">
                    <el-form-item label="活动时间">
                        <el-col :span="11">
                            <simple-select :ref="currency_from" v-model="form.currency_from" source="currency"></simple-select>
                        <el-col class="line" :span="2">-</el-col>
                        <el-col :span="11">
                            <simple-select :ref="currency_to" v-model="form.currency_to" source="currency"></simple-select>
                        </el-col>
                    </el-form-item>
                </el-form>
            </template> -->
        </simple-admin-page>
    </div>
</template>

<script>
import { _label } from '../globals.js'
import { getProp } from '../prop.js'

export default {
    name: 'exchangerate',
    props: {},
    data() {
        return {
            props: getProp('exchangerate')
        }
    },
    methods: {}
}
</script>
