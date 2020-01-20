<template>
    <div>
        <el-table :data="setting" border>
            <el-table-column :label="showLabel('kuanshi')" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.worldcode1.length" size="mini" type="number" min="0">
                        <el-select v-model="scope.row.worldcode1.action" slot="prepend" style="width: 100px;">
                            <el-option
                                v-for="item in actions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-input>
                </template>
            </el-table-column>    
            <el-table-column :label="showLabel('caizhi')" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.worldcode2.length" size="mini" type="number" min="0">
                        <el-select v-model="scope.row.worldcode2.action" slot="prepend" style="width: 100px;">
                            <el-option
                                v-for="item in actions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-input>
                </template>
            </el-table-column>    
            <el-table-column :label="showLabel('yanse')" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.worldcode3.length" size="mini" type="number" min="0">
                        <el-select v-model="scope.row.worldcode3.action" slot="prepend" style="width: 100px;">
                            <el-option
                                v-for="item in actions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-input>
                </template>
            </el-table-column>    
        </el-table>
        <el-row>
            <el-col :span="24" style="text-align:center;">
                <el-button type="primary" size="mini" @click="submit">{{ showLabel('baocun') }}</el-button>
                <el-button type="primary" size="mini" @click="cancel">{{ showLabel('quxiao') }}</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { showLabel } from '../../component/globals'
const actions = [
    {
        value: 'noLimited',
        label: showLabel('noLimited')
    },
    {
        value: 'disabled',
        label: showLabel('disabled')
    },
    {
        value: '=',
        label: '='
    },
    {
        value: '>=',
        label: '>='
    },
    {
        value: '<=',
        label: '<='
    }
]
export default {
    name: 'worldcode',
    props: {
        id: {
            type: Number
        }
    },
    data() {
        return {
            actions: actions,
            setting: [{
                worldcode1: {
                    length: '',
                    action: 'noLimited'
                },
                worldcode2: {
                    length: '',
                    action: 'noLimited'
                },
                worldcode3: {
                    length: '',
                    action: 'noLimited'
                }
            }]
        }
    },
    methods: {
        getSetting() {
            let self = this
            this._fetch("/brand/worldcodeSetting", {id: this.id}).then(function(res) {
                self.setting = []
                self.setting.push(res.data)
            })
        },
        submit() {
            let params = {
                id: this.id,
                setting: this.setting[0]
            }
            this._submit("/brand/updateWorldcodeSetting", params)
        },
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>