<template>
    <el-radio-group v-model="currentValue" @change="handleChange" :disabled="disabled">
        <el-col :span="span" v-for="(item,key) in data" :key="item.getValue()"><el-radio :label="item.getValue()" @click.native="onClick">{{item.getLabel()}}</el-radio></el-col>
    </el-radio-group>
</template>

<script>
import DataSource from './DataSource.js'

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
        source: {
            type: String,
            required: true
        },
        span:{
            type:Number
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        let self = this

        let dataSource = DataSource.getDataSource(self.source, self._label("lang"));

        return {
            currentValue: "",
            data: [],
            dataSource: dataSource
        }
    },
    methods: {
        handleChange(newValue) {
            let self = this;
            self.$emit('change', newValue)
        },
        onClick({target}) {
            let self = this;
            if(target.tagName=='INPUT' && target.value==self.currentValue) {
                self.currentValue = ""
                self.$emit('change', "")
            }
        }
    },
    watch: {
        select_value(newValue) {
            this.currentValue = newValue
        }
    },
    mounted: function() {
        let self = this;
        self.currentValue = self.select_value;

        self.dataSource.getData(function(data) {
            self.data = data
            //self._log(data, self.source)
        })
        self._log("mounted")
    }
}
</script>
