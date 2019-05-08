<template>
    <el-select v-model="currentValue" :multiple="column.multiple" :placeholder="column.placeholder" style="width:150" @change="handleChange" filterable :disabled="column.disabled" :clearable="column.clearable" size="mini" :filter-method="onFilter" @visible-change="onVisibleChange">
        <el-option v-for="(item,key) in filterData" :key="item.getValue()" :label="item.convert()" :value="item.getValue()" @click.native="onClick(item)">
            <template>
                <slot v-bind:row="item"></slot>
            </template>
        </el-option>
    </el-select>
</template>

<script>
import DataSource from '../util/DataSource.js'

export default {
    name: 'sp-select',
    props: {
        value: {
            default: ''
        },
        parentid: {
        },
        column: {
            type:Object,
            required:true
        },
        option:{
            type:Object
        },
        record:Object
    },
    data() {
        return {
            currentValue: "",
            keyword:"",
            data: [],
            filterData:[], //查询过滤后的
            keyindexes:{}, //记录元素的顺序，多选时排序用
            start:-1 //批量选择的时候使用
        }
    },
    methods: {
        onFilter(keyword){
            let self = this
            self.keyword = keyword
            //console.log(keyword)
            self.filteredList();
        },
        onVisibleChange(isVisible) {
            let self = this
            //self._log("isVisible", isVisible)
            if(!isVisible) {
                self.onFilter("")
            }            
        },
        handleChange(newValue) {
            let self = this
            if(self.column.multiple) {
                self.sort()
            }
            self.$emit("input", self.getValue())
        },
        sort() {
            let self = this
            if(self.column.multiple) {
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
                    data.forEach(item => self.push(item))
                })
                self.filteredList();
            })
        },
        clear() {
            self.$emit("input", "")
            self.data = []
            self.filterData = []
            self.keyindexes = {}
        },
        getDataSource() {
            let self = this
            //console.log(self.column.source , DataSource.getDataSource(self.column.source))
            return DataSource.getDataSource(self.column.source)
        },
        setValue(value) {
            let self = this;
            let multiple = self.column.multiple
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
            return self.column.multiple ? self.currentValue.filter(id=>self.keyindexes[id]>=0).join(",") : self.currentValue
        },
        push(item) {
            let self = this
            self.data.push(item)
            self.keyindexes[item.getValue()] = self.data.length-1
        },
        onClick(item) {
            let self = this
            //this._log(item)
            if(!self.column.isBatch || !self.column.multiple) {
                return false;
            }

            //查看是否选中
            let index = self.currentValue.findIndex(id=>item.id==id)
            //self._log("index=", index)
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
                    self.$emit("input", self.getValue())
                }
                else {
                    self.start = self.keyindexes[item.id]
                }
            }
        },
        isSelected(id) {
            return this.currentValue.find(item=>item==id) 
        },
        filteredList() {
            let self = this
            //self._log("重新计算",self.keyword)            
            let keyword = this.keyword.toUpperCase()
            if(keyword.length==0) {
                self.filterData = self.data
            }

            if(self.column.filterMethod) {
                self.filterData = self.data.filter(item=>self.column.filterMethod(keyword, item))
            }
            else {
                self.filterData = self.data.filter(item=>{
                    return item.convert().toUpperCase().indexOf(keyword)>=0// || name_en.toUpperCase().indexOf(k)>=0
                })
            }
        }
    },
    watch: {
        value(newValue) {
            this.setValue(newValue)
        },
        parentid(newValue) {
            //this._log("watch parentid")
            this.load(newValue)
        }
    },
    mounted: function() {
        var self = this;
        self.setValue(self.value)

        if (!self.parentid) {
            //console.log('++++++++++++++++++++++')
            self.getDataSource().getData().then(({data})=>{
                data.forEach(item => self.push(item))
                self.filteredList()
            })
        } else {
            //self._log("mounted")
            self.load(self.parentid)
        }
    }
}
</script>
