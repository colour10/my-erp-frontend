<template>
    <div>
        <sp-table :data="tableData" border style="width: 100%;" :height="tableHeight">
            <el-table-column :prop="item.name" :label="item.label" :width="item.width||180" v-if="!item.is_hide" v-for="item in columns" :key="item.name" :sortable="true">
                <template v-slot="scope">
                    <img v-if="item.is_image" :src="getImageSrc(scope.row, item)" :style="getImageStyle(item)">
                    <span v-if="!item.is_image" :style="getStyle(item,scope.row)">{{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}</span>
                </template>
            </el-table-column>
            <el-table-column :label="item.label" align="center" :width="item.width||180" v-for="item in buttons" :key="item.label">
                <template v-slot="scope">
                    <el-button type="text" @click="item.handler(scope.$index, scope.row, item)">{{item.label}}</el-button>
                </template>
            </el-table-column>
            <el-table-column :label="_label('caozuo')" :width="localOptions.action_width||150" align="center">
                <template v-slot="scope">
                    <el-button size="mini" @click="handleClickUpdate(scope.$index, scope.row)" v-if="isEditable(scope.row)">{{_label('bianji')}}</el-button>
                    <auth :auth="authname||controller">
                        <el-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)" v-if="isDeletable(scope.row)">{{_label('shanchu')}}</el-button>
                    </auth>
                    <el-button size="mini" @click="handleAction(scope,item)" v-for="item in actions" :key="item.label" v-if="isShow(item)">{{item.label}}</el-button>
                </template>
            </el-table-column>
        </sp-table>
        <el-pagination v-if="tableData.length<pagination.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagination.current*1" :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize*1" layout="total, sizes, prev, pager, next, jumper" :total="pagination.total*1">
        </el-pagination>
    </div>
</template>

<script>
import DataSource from './DataSource.js'
import globals, { extend, _label } from './globals.js'
import { host } from './http.js'


export default {
    name: 'simple-admin-tablelist',
    props: ['columns', "buttons", "controller", "base", "onclickupdate", 'isedit', 'isdelete', "options", "authname", "tableHeight", 'actions'],
    components: {

    },
    data() {
        let base = this.base || {}
        let localOptions = this.options || {}

        return {
            rowIndex: "",
            tableData: [],
            pagination: {
                pageSizes: globals.pageSizes,
                pageSize: 20,
                total: 0,
                current: 1
            },
            localOptions
        }
    },
    methods: {
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize
            this.loadList()
        },
        handleCurrentChange(current) {
            this.pagination.current = current
            this.loadList()
        },
        isShow(item) {
            if (item.isShow) {
                return item.isShow(this)
            } else {
                return true;
            }
        },
        handleAction({ $index, row }, item) {
            item.handler($index, row, this)
        },
        findIndex(callback) {
            return this.tableData.findIndex(callback)
        },
        appendRow: function(row) {
            this.tableData.push(row)
            return this.tableData.length - 1;
        },
        updateRow: function(rowIndex, row) {
            Object.assign(this.tableData[rowIndex], row)
        },
        getRow: function(rowIndex) {
            return this.tableData[rowIndex]
        },
        deleteRow: function(rowIndex) {
            let self = this
            return self.$delete(self.tableData, rowIndex)
        },
        async onClickDelete(rowIndex, row) {
            let self = this
            self.rowIndex = rowIndex;

            let result = await self._remove("/" + self.controller + "/delete", { id: row.id })
            if (result == true) {
                self.$delete(self.tableData, rowIndex)
            }
        },
        handleClickUpdate(rowIndex, row) {
            let self = this
            if (self.onclickupdate) {
                self.onclickupdate(rowIndex, row)
                    //self._log("click edit")
            }
        },
        getImageSrc(row, column) {
            if (row[column.name] && row[column.name].length > 0) {
                //this._log(row[column.name])
                return _label('_image_url_prex') + row[column.name]
            } else {
                return host + '/imgs/none.png';
            }
        },
        getImageStyle(column) {
            let styles = "";
            if (column.image_width) {
                styles += "width:" + column.image_width + 'px;'
            }

            if (column.image_height) {
                styles += "height:" + column.image_height + 'px;'
            }
            return styles;
        },
        convert(row, column, rowIndex) {
            let self = this
            let value = row[column.name]
            if (column.type == 'switch') {
                return value == '1' ? _label("yes") : _label("no");
            } else if (column.type == 'select') {
                //Òì²½¼ÓÔØÊý¾Ý£¬È»ºóÖØÐÂäÖÈ¾ÁÐ±í
                let dataSource = DataSource.getDataSource(column.source, _label("lang"));
                //self._log("init, dataSource", column.source)

                if (row[column.name + "__columncopy"] != value && value) {
                    dataSource.getRow(value, function(rowInfo) {
                        if (typeof(rowInfo) != 'object') {
                            return
                        }
                        row[column.name + "__label"] = rowInfo.getLabel();
                        row[column.name + "__columncopy"] = value;
                        row[column.name + "__style"] = rowInfo.getRow('style');
                    });
                    //self._log('==================', value)
                }
                return row[column.name + "__label"]
            } else if (column.type == 'select-dialog') {
                //
                let dataSource = DataSource.getDataSource(column.source, _label("lang"));

                if (row[column.name + "__columncopy"] != value && row[column.name + "__loading"] != "1") {
                    row[column.name + "__loading"] = 1;
                    dataSource.getRowLabels(value, function(label) {
                        row[column.name + "__label"] = label;
                        row[column.name + "__columncopy"] = value;
                    });
                    //self._log('==================',column.name, value)
                }
                return row[column.name + "__label"]
            } else {
                return value;
            }
        },
        getStyle(item, row) {
            if (row[item.name + '__style']) {
                return row[item.name + '__style']
            } else {
                return item.style || ""
            }
        },
        loadList() {
            var self = this;
            self.tableData = []

            let params = {
                page: self.pagination.current,
                pageSize: self.pagination.pageSize
            }

            if (self.base) {
                Object.keys(self.base).forEach(function(key) {
                    params[key] = self.base[key]
                });
                //self._log(self.base)
            }

            var obj = {}
            var columns = self.columns;
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].type == 'select' || columns[i].type == 'select-dialog') {
                    obj[columns[i].name + "__loading"] = "";
                    obj[columns[i].name + "__label"] = "";
                    obj[columns[i].name + "__columncopy"] = "";
                }
            }

            var asa = self.$asa;

            self._fetch("/" + self.controller + "/page", params).then(function(res) {
                //self._log(res)
                res.data.forEach(item => self.tableData.push(Object.assign(item, obj)))

                //let pagination = res.pagination;
                extend(self.pagination, res.pagination)

            });
        },
        isDeletable(row) {
            let self = this
            if (typeof(self.isdelete) == 'function') {
                return self.isdelete(row)
            } else if (typeof(self.isdelete) == 'boolean') {
                return self.isdelete
            }

            return true
        },
        isEditable(row) {
            let self = this
            if (typeof(self.isedit) == 'function') {
                return self.isedit(row)
            }

            return true
        }
    },
    watch: {
        base: {
            handler: function(newValue, oldValue) {
                //this._log("change", newValue, oldValue)
                this.loadList()
            },
            deep: true
        }
    },
    computed: {},
    mounted: function() {
        //this._log(onClickUpdate)
        this.loadList()
    }
}
</script>
