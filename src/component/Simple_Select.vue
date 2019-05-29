<template>
    <el-select v-model="currentValue" :multiple="multiple" :placeholder="placeholder" style="width:150" @change="handleChange" filterable :disabled="disabled" :clearable="clearable" size="mini" :filter-method="onFilter" @visible-change="onVisibleChange">
        <el-option v-for="(item,key) in filterData" :key="item.id+item.name" :label="item.optionName()" :value="item.id" @click.native="onClick(item)">
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
            default: true
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
            default: ""
        },
        filterMethod:{

        },
        isBatch:{
            type:Boolean,
            default:false
        },
        isIgnoreZero:{
            type:Boolean,
            default:true
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        let self = this
        return {
            counter:Math.floor(Math.random()*100),
            sss: this.getDataSource(),
            currentValue: "",
            keyword:"",
            data: [],
            filterData:[], //查询过滤后的
            keyindexes:{}, //记录元素的顺序，多选时排序用
            start:-1, //批量选择的时候使用
            onDataSourceChange() {           
                self.counter      = self.counter+1
                
                if (self.parentid == false) {
         
                    self.getDataSource().getData(function(data) {
                        //self._log("load", data)
                        //self._log("++++++++++++++",self.source)
                        self.data = []
                        self.keyindexes = {}
                        data.forEach(item => self.push(item))
                        self.filteredList()
                    })
                } else {
                    //self._log("mounted")
                    self.load(self.parentid)
                }
            }
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
        filterx(callback){
            let self = this;
            self.data = []
            self.keyindexes = {}

            //console.log("++++++++++++++++++++++")
            self.getDataSource().getData(data=>{ 
                data.filter(callback).forEach(item=>self.push(item))
                self.filteredList();
            })
        },
        load(value) {
            let self = this;
            //self._log("重新加载下拉框数据", self.source)
            
            self.getDataSource().getSourceByParent(value).then(function(dataSource) {
                dataSource.getData(data=>{
                    //self._log("++++++++++++++------------",self.source)
                    self.data = []
                    self.keyindexes = {}
                    data.forEach(item => self.push(item))
                })
                self.filteredList();
                //self._log("追加下拉框数据")
            })
        },
        clear() {
            self.$emit("change", "")
            self.data = []
            self.filterData = []
            self.keyindexes = {}
            self.$emit("option-change", self.filterData)
        },
        getDataSource() {
            let self = this
            return DataSource.getDataSource(self.source, self._label("lang"))
        },
        setValue(value) {
            let self = this;

            if(self.isIgnoreZero===true && (value=='0' || value==0)) {
                value = ""
            }

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
                    self.$emit("change", self.getValue())
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

            if(self.filterMethod) {
                self.filterData = self.data.filter(item=>self.filterMethod(keyword, item))
            }
            else {
                self.filterData = self.data.filter(item=>{
                    //self._log(item.name)
                    return item.optionName().toUpperCase().indexOf(keyword)>=0// || name_en.toUpperCase().indexOf(k)>=0
                })
            }
            self.$emit("option-change", self.filterData)
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
        let self = this;
        self.setValue(self.select_value)
        self.getDataSource().emitter.on("change", self.onDataSourceChange)
        //self._log("绑定监听事件",self.source)
        self.onDataSourceChange()        
    },
    computed:{

    },
    beforeDestroy:function(){
        this.getDataSource().emitter.off("change", this.onDataSourceChange)
    }
}
</script>
