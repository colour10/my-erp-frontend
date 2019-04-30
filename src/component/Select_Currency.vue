<template>
    <el-select v-model="currentValue" placeholder="" @change="handleChange" filterable :filter-method="filterCurrency" :disabled="disabled">
        <el-option v-for="item in current_list" :key="item.getValue()" :value="item.getValue()" :label="item.getLabel()">
        </el-option>
    </el-select>
</template>

<script>
import DataSource from './DataSource.js'
import {_label} from "./globals.js"

export default {
    name: 'select-currency',
    props: {
        select_value: {
            required: true,
            default: ''
        },
        lang: {
            type: String
        },
        disabled: {}
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        let self = this
        let dataSource = DataSource.getDataSource("currency", _label("lang"));
        return {
            currentValue: self.select_value,
            dataCopy: [],
            currentInput: "",
            dataSource: dataSource,
            qingxuanze: self._label("qingxuanze")
        }
    },
    methods: {
        filterCurrency(val) {
            this.currentInput = val
        },
        handleChange(newValue) {
            this.$emit('change', newValue)
        }
    },
    watch: {
        select_value(newValue) {
            this.currentValue = newValue
        }
    },
    computed: {
        current_list() {
            let self = this
            let val = self.currentInput;
            if (val) {
                return self.dataCopy.filter((item) => {
                    let row = item.row.code
                    if (!!~row.indexOf(val) || !!~row.toUpperCase().indexOf(val.toUpperCase())) {
                        return true
                    }
                })
            } else {
                return self.dataCopy;
            }
        }
    },
    mounted: function() {
        let self = this
        self.dataSource.getData(function(data) {
            self.dataCopy = data
        })
    }
}
</script>
