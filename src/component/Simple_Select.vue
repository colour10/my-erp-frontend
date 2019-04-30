<template>
    <el-select v-model="currentValue" :multiple="multiple" :placeholder="placeholder" style="width:150" @change="handleChange" filterable :disabled="disabled" :clearable="clearable" size="mini" :filter-method="onFilter">
        <el-option v-for="(item,key) in filteredList" :key="item.id" :label="item.name" :value="item.id" @click.native="onClick(item)">
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

        },
        isBatch:{
            type:Boolean,
            default:false
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
            keyindexes:{}, //记录元素的顺序，多选时排序用
            start:-1 //批量选择的时候使用
        }
    },
    methods: {
        onFilter(keyword){
            this.keyword = keyword
        },
        handleChange(newValue) {
            let self = this
            if(self.multiple) {
                self.sort()
            }
            self.$emit("change", self.getValue())
        },
        sort() {
            let self = this
            if(self.multiple) {
                self.currentValue = self.currentValue.sort(function(a,b){
                    return self.keyindexes[a]-self.keyindexes[b]
                })
            }
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
            return self.multiple ? self.currentValue.filter(id=>self.keyindexes[id]>=0).join(",") : self.currentValue
        },
        push(item) {
            let self = this
            self.data.push(item)
            self.keyindexes[item.id] = self.data.length-1
        },
        onClick(item) {
            let self = this
            //this._log(item)
            if(!self.isBatch || !self.multiple) {
                return false;
            }

            //查看是否选中
            let index = self.currentValue.findIndex(id=>item.id==id)
            self._log("index=", index)
            if(index>=0) {
                if(self.start>=0) {
                    //已经选过开头，批量选中
                    //self._log("选中了结尾")
                    for(let i=self.start+1; i<self.keyindexes[item.id];i++) {
                        let row = self.data[i]

                        if(!self.isSelected(row.id)) {
                            self.currentValue.push(row.id)
                        }
                    }
                    self.start = -1
                    self.sort()
                    self.$emit("change", self.getValue())
                }
                else {
                    self.start = self.keyindexes[item.id]
                }
            }
        },
        isSelected(id) {
            return this.currentValue.find(item=>item==id) 
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
