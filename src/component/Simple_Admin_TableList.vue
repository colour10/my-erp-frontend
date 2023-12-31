<template>
  <div>
    <el-table ref="table" :data="tableData" border style="width: 100%;" :height="tableHeight"
              :cell-class-name="getCellClassName" :cell-style="cellStyle" :rowClassName="tableRowClassName"
              :row-style="getRowStyle" @selection-change="onSelectionChange" @row-click="onRowClick">
      <el-table-column type="selection" :width="40" v-if="isSelect==true"></el-table-column>
      <el-table-column type="expand" v-if="isExpand">
        <template v-slot="{row, rowIndex}">
          <slot name="expand" v-bind:row="row" v-bind:rowIndex="rowIndex"></slot>
        </template>
      </el-table-column>
      <el-table-column :label="_label('caozuo')" :width="localOptions.action_width" align="center"
                       v-if="localOptions.isaction">
        <template v-slot="scope">
          <as-button size="mini" @click="handleClickUpdate(scope.$index, scope.row)" v-if="isEditable(scope.row)">
            {{_label('bianji')}}
          </as-button>

          <!-- 因为缓存问题，权限偶尔会失效，所以暂时都为true，上面还有权限控制的 -->
<!--          <asa-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)"-->
<!--                      v-if="isDeletable(scope.row)" :enable="_isAllowed(authname||controller)">{{_label('shanchu')}}-->

            <asa-button size="mini" type="danger" @click="onClickDelete(scope.$index, scope.row)"
                        v-if="isDeletable(scope.row)" :enable="true">{{_label('shanchu')}}

          </asa-button>

          <!-- 因为缓存问题，权限偶尔会失效，所以暂时都为true，上面还有权限控制的 -->
<!--          <asa-button size="mini" @click="handleAction(scope,item)" v-for="item in actions" :key="item.label"-->
<!--                      :type="buttonType(item, scope.row)" :enable="item.enable" v-if="isShow(item,scope.row)"-->
<!--                      style="margin-right:3px">{{item.label}}-->
<!--          </asa-button>-->

          <asa-button size="mini" @click="handleAction(scope,item)" v-for="item in actions" :key="item.label"
                      :type="buttonType(item, scope.row)" :enable="true" v-if="isShow(item,scope.row)"
                      style="margin-right:3px">{{item.label}}
          </asa-button>
        </template>
      </el-table-column>
      <el-table-column :prop="item.name" :label="item.label" :width="item.width||180" v-if="!item.is_hide"
                       v-for="item in columns" :key="item.name" :sortable="isSortable(item)"
                       :sort-method="item.sortMethod">
        <template v-slot="scope">
          <slot :name="item.slotName || item.name" v-bind:row="scope.row">
            <img v-if="item.type=='avatar'||item.is_image" :src="getImageSrc(scope.row, item)"
                 :style="getImageStyle(item)" @click="onClickImage(scope.row, item)">
            <span v-if="item.type!='avatar' && !item.is_image && item.type!='select'" :style="getStyle(item,scope.row)">{{item.convert?item.convert(scope.row,scope.rowIndex,item):convert(scope.row,item, rowIndex)}}</span>

            <sp-select-text v-if="item.type=='select'" :source="item.source"
                            :value="scope.row[item.name]"></sp-select-text>
          </slot>
        </template>
      </el-table-column>
      <el-table-column :label="item.label" align="center" :width="item.width||180" v-for="item in buttons"
                       :key="item.label">
        <template v-slot="scope">
          <as-button type="text" @click="item.handler(scope.$index, scope.row, item)">{{item.label}}</as-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- 分页 start -->
    <el-pagination style="margin-top: 1em;" v-if="tableData.length<pagination.total" @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" :current-page="pagination.current*1"
                   :page-sizes="pagination.pageSizes" :page-size="pagination.pageSize*1"
                   layout="total, sizes, prev, pager, next, jumper" :total="pagination.total*1">
    </el-pagination>
    <!-- 分页 end -->
  </div>
</template>

<script>
    import DataSource from './DataSource.js'
    import globals, {_label, extend, Mix} from './globals.js'

    let getBaseObject = function (columns) {
        let obj = {}
        for (let i = 0; i < columns.length; i++) {
            if (columns[i].type == 'select' || columns[i].type == 'select-dialog' || columns[i].type == 'colorselect') {
                obj[columns[i].name + "__loading"] = "";
                obj[columns[i].name + "__label"] = "";
                obj[columns[i].name + "__columncopy"] = "";
            }
        }
        return obj;
    }

    export default {
        name: 'simple-admin-tablelist',
        props: ['columns', "buttons", "controller", "base", "onclickupdate", 'isedit', 'isdelete', "options", "authname", "tableHeight", 'actions', 'model', 'isExpand', 'isSelect', 'cell-style'],
        components: {},
        data() {
            let self = this
            let base = self.base || {}
            let localOptions = self.options || {}
            Mix.default(localOptions, 'action_width', 180)
            Mix.default(localOptions, 'issubmit', true)
            Mix.default(localOptions, 'isaction', true)
            Mix.default(localOptions, 'actionNameOfLoad', 'page')
            Mix.default(localOptions, 'isSubmit', true)

            return {
                rowIndex: "",
                tableData: [],
                isLoading: false,
                pagination: extend({
                    pageSizes: globals.pageSizes,
                    pageSize: 10,
                    total: 0,
                    current: 1
                }, localOptions.pagination),
                localOptions,
                cellClasses: {},
                searchform: {},
                selected: []
            }
        },
        methods: {
            // 搜索
            search(params) {
                this.searchform = extend({}, params)
                this.loadList()
            },
            isSortable(column) {
                return typeof (column.sortable) == 'boolean' ? column.sortable : !column.is_image
            },
            getCellClassName({row, column, rowIndex, columnIndex}) {
                let self = this
                if (column.property) {
                    if (self.cellClasses[column.property]) {
                        return self.cellClasses[column.property]
                    }
                }
            },
            getRowStyle(info) {
                let self = this
                if (typeof (self.localOptions.rowStyle) == 'function') {
                    return self.localOptions.rowStyle(info)
                }
            },
            onClickImage(row, column) {
                this.$emit("preview", this.getImageSrc(row, column), row, column)
            },
            handleSizeChange(pageSize) {
                this.pagination.pageSize = pageSize
                this.loadList()
            },
            handleCurrentChange(current) {
                this.pagination.current = current
                this.loadList()
            },
            isShow(item, row) {
                if (item.isShow) {
                    return item.isShow(this, row)
                } else {
                    return true;
                }
            },
            buttonType(item, row) {
                if (typeof (item.type) == 'function') {
                    return item.type({row, button: item})
                } else {
                    return item.type
                }
            },
            handleAction({$index, row}, item) {
                item.handler({index: $index, row, vm: this})
            },
            findIndex(callback) {
                return this.tableData.findIndex(callback)
            },
            appendRow(row) {
                let self = this
                let obj = getBaseObject(self.columns)
                this.tableData.push(extend({}, obj, row))
                return this.tableData.length - 1;
            },
            updateRow(rowIndex, row) {
                Object.assign(this.tableData[rowIndex], row)
            },
            getRow(id) {
                return this.tableData.find(item => item.id == id)
            },
            getTableData() {
                return this.tableData;
            },
            setTableData(data) {
                let self = this

                self.tableData = []
                data.forEach(row => {
                    self.appendRow(row)
                })
            },
            deleteRow(rowIndex) {
                let self = this
                return self.$delete(self.tableData, rowIndex)
            },
            // 删除数据
            async onClickDelete(rowIndex, row) {
                let self = this
                self.rowIndex = rowIndex;

                if (self.localOptions.issubmit) {
                    let result = await self._remove("/" + self.controller + "/delete", {id: row.id})
                    if (result == true) {
                        self.$delete(self.tableData, rowIndex);
                        // 删除之后，执行父类的 after-delete
                        self.$emit("after-delete");
                    }
                } else {
                    self.$delete(self.tableData, rowIndex);
                    self.$emit("after-delete");
                }

                // 然后重新取出数据列表，非常重要，否则永远显示删除前的数据分页条数，慢半拍
                self.loadList()
            },
            // 编辑按钮
            handleClickUpdate(rowIndex, row) {
                let self = this
                if (self.onclickupdate) {
                    self.onclickupdate(rowIndex, row)
                }
            },
            // 查看缩略图
            getImageSrc(row, column) {
                let picture = ""
                if (row[column.name] && row[column.name].length > 0) {
                    picture = row[column.name]
                }

                return this._fileLink(picture)
            },
            // 动态添加 css 样式
            getImageStyle(column) {
                let styles = "";
                if (column.image_width) {
                    styles += "max-width:" + column.image_width + 'px;'
                }

                if (column.image_height) {
                    styles += "max-height:" + column.image_height + 'px;'
                }
                return styles;
            },
            // 表格斑马纹
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 === 0) {
                    return 'stripe1';
                }
                return '';
            },
            convert(row, column, rowIndex) {
                let self = this
                let value = row[column.name]
                if (column.type == 'switch') {
                    return value == '1' ? _label("yes") : _label("no");
                } else if (column.type == 'select' || column.type == 'colorselect') {
                    //
                    let dataSource = DataSource.getDataSource(column.source, _label("lang"));

                    if (row[column.name + "__columncopy"] != value && value) {
                        dataSource.getRowLabels(value, function (rowInfo) {

                            row[column.name + "__label"] = rowInfo;
                            row[column.name + "__columncopy"] = value;
                            //row[column.name + "__style"] = rowInfo.getRow('style');
                        });
                    }
                    return row[column.name + "__label"]
                } else if (column.type == 'select-dialog') {
                    //
                    let dataSource = DataSource.getDataSource(column.source, _label("lang"));

                    if (row[column.name + "__columncopy"] != value && row[column.name + "__loading"] != "1") {
                        row[column.name + "__loading"] = 1;
                        dataSource.getRowLabels(value, function (label) {
                            row[column.name + "__label"] = label;
                            row[column.name + "__columncopy"] = value;
                        });
                    }
                    return row[column.name + "__label"]
                } else {
                    return value;
                }
            },
            getStyle(item, row) {
                if (typeof (item.style) == 'function') {
                    return item.style(item, row)
                } else if (typeof (item.style) == 'string') {
                    return item.style
                }
            },
            // 重新获取数据列表
            loadList() {
                var self = this;
                if (self.isLoading) {
                    return;
                }

                self.isLoading = true;

                self.tableData = []

                let params = extend({
                    page: self.pagination.current,
                    pageSize: self.pagination.pageSize
                }, self.searchform, self.base)

                let obj = getBaseObject(self.columns)

                self._fetch("/" + self.controller + "/" + self.localOptions.actionNameOfLoad, params).then(function (res) {
                    if (self.model) {
                        //记录自然的排序规则
                        let keyindexes = {}
                        res.data.forEach((item, index) => {
                            keyindexes[item.id] = index
                        })

                        let array = []
                        res.data.forEach(item => {
                            self.model.load({data: Object.assign(item, obj), depth: 1}).then(rowinfo => {
                                array.push(rowinfo)

                                if (array.length == res.data.length) {
                                    array.sort(function (a, b) {
                                        return keyindexes[a.id] - keyindexes[b.id]
                                    })

                                    self.tableData = array
                                }
                            })
                        })
                    } else {
                        res.data.forEach(item => self.tableData.push(Object.assign(item, obj)))
                    }

                    //let pagination = res.pagination;
                    extend(self.pagination, res.pagination)
                    self.isLoading = false;
                });
            },
            isDeletable(row) {
                let self = this
                if (typeof (self.isdelete) == 'function') {
                    return self.isdelete(row)
                } else if (typeof (self.isdelete) == 'boolean') {
                    console.log(self.isdelete)
                    return self.isdelete
                }

                return true
            },
            isEditable(row) {
                let self = this
                if (typeof (self.isedit) == 'function') {
                    return self.isedit(row)
                } else if (typeof (self.isedit) == 'boolean') {
                    return self.isedit
                }

                return true
            },
            onSelectionChange(vals) {
                this.selected = vals;
                this.$emit('selection-change', vals);
            },
            getSelectValues() {
                return this.selected.map(item => item.id)
            },
            getSelectRows() {
                return this.selected
            },
            onRowClick(row) {
                if (this.isSelect === true) {
                    this.$refs.table.toggleRowSelection(row)
                }
            }
        },
        watch: {
            base: {
                handler: function (newValue, oldValue) {
                    let self = this
                    setTimeout(function () {
                        self.loadList()
                    }, 10)
                },
                deep: true
            }
        },
        // 挂载前
        mounted: function () {
            let self = this
            // 提交之后则重新获取列表
            if (self.localOptions.isSubmit) {
                self.loadList()
            }

            for (let item of self.columns) {
                if (item.className) {
                    self.cellClasses[item.name] = item.className
                }
            }
        }
    };
</script>
