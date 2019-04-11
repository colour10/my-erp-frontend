<template>
    <el-table :data="tableData" stripe border style="width:100%;" v-loading.fullscreen.lock="loading">
        <el-table-column :prop="item.name" :label="item.label" align="center" :width="item.width||180" v-if="!item.is_hide" v-for="item in columns" :key="item.name">
            <template v-slot="scope">
                <img v-if="item.is_image" :src="_label('_image_url_prex')+scope.row[item.name]" :style="getImageStyle(item)">
                <span v-if="!item.is_image && !item.html">{{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row, item, scope.rowIndex)}}</span>
                <span v-if="item.html" v-html="item.html">{{item.html}}</span>
            </template>
        </el-table-column>
        <el-table-column :label="item.label" align="center" :width="item.width||180" v-for="item in buttons" :key="item.label">
            <template v-slot="scope">
                <el-button type="text" @click="item.handler(scope.$index, scope.row, item)">{{item.label}}</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="lang_code" :label="_label('yuyan')" width="220" align="center">
            <template v-slot="scope">
                <span v-for="(item, key) in languages" :key="item.code" :value="item.code">
         <el-button :type="isSettingLanguage(scope.row, item.code)?'primary':'info'" circle @click="showFormToUpdate(scope.$index, scope.row, item.code)">{{item.shortName}}</el-button>
       </span>
            </template>
        </el-table-column>
        <el-table-column :label="_label('caozuo')" :width="componenToptions.action_width||150" align="center">
            <template v-slot="scope">
                <auth :auth="controller">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">{{_label("shanchu")}}</el-button>
                </auth>
                <el-button size="mini" @click="handleAction(scope,item)" v-for="item in actions" :key="item.label" v-if="isShow(item)">{{item.label}}</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import DataSource from './DataSource.js'
import globals from './globals.js'
const _label = globals.getLabel

export default {
    name: 'multiple-admin-tablelist',
    props: ['columns', "buttons", "options", "controller", "base", "onclickupdate", "key_column", "actions"],
    components: {

    },
    data() {
        var options = this.options || {}
        var base = this.base || {}
        this._log(this.actions)

        return {
            tableData: [],
            componenToptions: options,
            languages: _label("list_languages"),
            loading: true,
            current_lang: _label("lang")
        }
    },
    methods: {
        appendRow: function(newRow, rowIndex) {
            var self = this;
            console.log(newRow, rowIndex)
            self.tableData.push(newRow)
        },
        getRow: function(rowIndex) {
            return this.tableData[rowIndex]
        },
        showFormToUpdate(rowIndex, row, lang) {
            var self = this
            self.rowIndex = rowIndex;
            //console.log(rowIndex, row, lang)
            self.onclickupdate(rowIndex, row, lang)
        },
        handleAction({ $index, row }, item) {
            item.handler($index, row, this)
        },
        isShow(item) {
            if(item.isShow) {
                return item.isShow(this)
            }
            else {
                return true;
            }
        },
        handleDelete(rowIndex, row) {
            var self = this

            self._remove("/" + self.controller + "/delete?id=" + row.id, function() {
                self.$delete(self.tableData, rowIndex)
            })
        },
        getImageStyle(column) {
            var styles = "";
            if (column.image_width) {
                styles += "width:" + column.image_width + 'px;'
            }

            if (column.image_height) {
                styles += "height:" + column.image_height + 'px;'
            }
            return styles;
        },
        isSettingLanguage(row, lang) {
            var column_name = this.key_column + "_" + lang
            return row[column_name] && row[column_name] != ""
        },
        convert(row, column, rowIndex) {
            var self = this;
            var column_name = column.is_multiple ? column.name + "_" + self.current_lang : column.name;
            var value = row[column_name];

            if (column.type == 'switch') {
                return value == '1' ? _label("yes") : _label("no");
            } else if (column.type == 'select') {
                //异步加载数据，然后重新渲染列表
                if (!column.dataSource) {
                    column.dataSource = DataSource.getDataSource(column.source, self.current_lang);
                }

                if (row[column.name + "__columncopy"] != value && row[column.name + "__loading"] != "1") {
                    row[column.name + "__loading"] = 1;
                    column.dataSource.getRowLabel(value, function(label) {
                        row[column.name + "__label"] = label;
                        row[column.name + "__columncopy"] = value;
                    });
                    //console.log('==================')
                }
                return row[column.name + "__label"]
            } else {
                return value;
            }
        },
        loadList(cb) {
            var self = this;
            self.tableData = []

            var params = {}
            if (self.base) {
                Object.keys(self.base).forEach(function(key) {
                    params[key] = self.base[key]
                });
                //console.log(self.base)
            }

            var obj = {}
            var columns = self.columns;
            for (var i = 0; i < columns.length; i++) {
                if (columns[i].type == 'select') {
                    obj[columns[i].name + "__loading"] = "";
                    obj[columns[i].name + "__label"] = "";
                    obj[columns[i].name + "__columncopy"] = "";
                }
            }

            self._fetch("/" + self.controller + "/page", params, function(res) {
                //console.log(res)
                res.data.forEach(item => self.tableData.push(globals.extend(item, obj)))
                cb()
            });
        }
    },
    watch: {
        base: {
            handler: function(newValue, oldValue) {
                //console.log("change",newValue,oldValue)
                this.loadList(function() {})
            },
            deep: true
        }
    },
    computed: {},
    mounted: function() {
        var self = this;

        var load_page = new Promise(function(resolve, reject) {
            self.loadList(resolve)
        });

        Promise.all([load_page]).then(function(results) {
            self.loading = false;
        });
    }
}
</script>
