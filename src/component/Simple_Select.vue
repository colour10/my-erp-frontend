<template>
    <el-select v-model="currentValue" :placeholder="placeholder" style="width:150" @change="handleChange" filterable :disabled="disabled" :clearable="clearable" size="mini">
        <el-option v-for="(item,key) in data" :key="item.getKeyValue()" :label="item.getLabelValue()" :value="item.getKeyValue()"><template><slot v-bind:row="item"></slot></template></el-option>
    </el-select>
</template>

<script>
import DataSource from './DataSource.js'
import globals,{_label} from './globals.js'

export default {
    name: 'simple-select',
    props: {
        select_value: {
            required: true,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        lang: {
            type: String,
            default:_label("lang")
        },
        source: {
            type: [String, Object],
            required: true
        },
        clearable: {
            type: [Boolean],
            required: false,
            default: false
        },
        lazy: {

        },
        placeholder:{
            type:String,
            default:_label('qingxuanze')
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        var self = this
        var dataSource = DataSource.getDataSource(self.source, self.lang);
        var value = self.select_value
        if (value == '0') {
            value = ''
        }
        //self._log(self.source, dataSource)
        return {
            currentValue: value,
            data: [],
            dataSource: dataSource
        }
    },
    methods: {
        handleChange(newValue) {
            var self = this
            self.current(row => self.$emit('change', newValue, row ? row.row : {}))

        },
        current(callback) {
            this.dataSource.getRow(this.currentValue, row => callback(row))
        },
        load(value) {
            var self = this;
            self.data = []
            self.dataSource.getRowsByParent(value).then(function(data) {
                //self._log("load",data)
                self.data = data;
            })
        },
        clear() {
            this.$emit("change", "")
            this.data = []
        }
    },
    watch: {
        select_value(newValue) {
            if (newValue == '0') {
                newValue = ''
            }
            this.currentValue = newValue
        },
        lang(newValue) {
            this.dataSource.setLang(newValue)
        }
    },
    mounted: function() {
        var self = this;

        if (self.lazy == true) {
            return
        }
        self.dataSource.getData(function(data) {
            //self._log("load", data)
            self.data = data
        })
    }
}
</script>
