<template>
    <el-select v-model="currentValue" :multiple="multiple" :placeholder="placeholder" style="width:150" @change="handleChange" filterable :disabled="disabled" :clearable="clearable" size="mini" :filter-method="onFilter">
        <el-option v-for="(item,key) in filteredList" :key="item.id" :label="item.name" :value="item.id">
            <template>
                <slot v-bind:row="item"></slot>
            </template>
        </el-option>
    </el-select>
</template>

<script>
import DataSource from './DataSource.js'
import globals, { _label } from './globals.js'

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
        source: {
            type: [String, Object],
            required: true
        },
        clearable: {
            type: [Boolean],
            required: false,
            default: false
        },
        multiple: {
            type: [Boolean],
            default: false
        },
        parentid: {
            default: false
        },
        placeholder: {
            type: String,
            default: _label('qingxuanze')
        },
        filterMethod:{

        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        return {
            currentValue: "",
            keyword:"",
            data: [],
            keyindexes:{} //记录元素的顺序，多选时排序用
        }
    },
    methods: {
        onFilter(keyword){
            this.keyword = keyword
        },
        handleChange(newValue) {
            let self = this
            if(self.multiple) {
                self.currentValue = self.currentValue.sort(function(a,b){
                    return self.keyindexes[a]-self.keyindexes[b]
                })
            }
            self.$emit("change", self.getValue())
        },
        load(value) {
            var self = this;
            self.data = []
            self.keyindexes = {}
            self.getDataSource().getSourceByParent(value).then(function(dataSource) {
                //self._log("load", self.source, data)
                    //self.data = data;
                dataSource.getData(data=>{
                    data.forEach(item => self.push(item.getObject()))
                })
            })
        },
        clear() {
            self.$emit("change", "")
            self.data = []
            self.keyindexes = {}
        },
        getDataSource() {
            let self = this
            return DataSource.getDataSource(self.source, self._label("lang"))
        },
        setValue(value) {
            let self = this;
            let multiple = self.multiple
            if (multiple) {
                if (!value || value == '') {
                    self.currentValue = []
                } else {
                    self.currentValue = value.split(',')
                }
            } else {
                self.currentValue = value
            }
        },
        getValue() {
            let self = this
            return self.multiple ? self.currentValue.join(",") : self.currentValue
        },
        push(item) {
            let self = this
            self.data.push(item)
            self.keyindexes[item.id] = self.data.length-1
        }
    },
    watch: {
        select_value(newValue) {
            this.setValue(newValue)
        },
        parentid(newValue) {
            //this._log("watch parentid")
            this.load(newValue)
        }
    },
    mounted: function() {
        var self = this;
        self.setValue(self.select_value)

        if (self.parentid == false) {
            self.getDataSource().getData(function(data) {
                //self._log("load", data)
                //self.data = data
                data.forEach(item => self.push(item.getObject()))
            })
        } else {
            //self._log("mounted")
            self.load(self.parentid)
        }
    },
    computed:{
        filteredList() {
            let self = this
            if(self.filterMethod) {
                return self.data.filter(item=>self.filterMethod(self.keyword, item))
            }
            else {
                return self.data
            }
        }
    }
}
</script>
