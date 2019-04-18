<template>
    <el-radio-group v-model="currentValue" @change="handleChange" :disabled="disabled">
        <el-radio :label="item.getKeyValue()" v-for="(item,key) in data" :key="item.getKeyValue()">{{item.getLabelValue()}}</el-radio>
    </el-radio-group>
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'

export default {
    name: 'sp-radio-group',
    props: {
        select_value: {
            type: [String, Number],
            required: true,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lang: {
            type: String
        },
        source: {
            type: String,
            required: true
        }

    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        var self = this

        var dataSource = DataSource.getDataSource(self.source, self.lang);

        return {
            currentValue: "",
            data: [],
            dataSource: dataSource
        }
    },
    methods: {
        handleChange(newValue) {
            var self = this;

            self.$emit('change', newValue)
        }
    },
    watch: {
        select_value(newValue) {
            this.currentValue = newValue
        },
        lang(newValue) {
            this.dataSource.setLang(newValue)
        }
    },
    mounted: function() {
        var self = this;
        self.currentValue = self.select_value;

        self.dataSource.getData(function(data) {
            self.data = data
        })
    }
}
</script>
