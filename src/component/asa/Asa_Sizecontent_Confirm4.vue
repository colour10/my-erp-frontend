<template>
  <div class="sizecontent">
    <el-table :data="rows" style="width:100%;" :border="false" :row-class-name="rowClassName"
              :cell-class-name="cellClassName">
      <el-table-column :label="column.name" align="center" v-for="column in columns" :key="column.id" width="50"
                       class="counter">
        <template v-slot="{row}">
          <el-input v-model="row.form[column.id]" style="width:50px" size="mini" :disabled="true" class="linetop"
                    v-if="row.type=='head'"></el-input>
          <el-input v-model="form[column.id]" style="width:50px" size="mini" @keyup.native="onChange(row)"
                    v-if="row.type=='body'" :ref="column.id" @focus="onFocus(column.id)"
                    :disabled="disabled"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="_label('heji')" align="right" width="53">
        <template v-slot="{row}">
          <el-input :value="getLineTotal(row.form)" style="width:50px" size="mini" :disabled="true" class="linetop"
                    v-if="row.type=='head'"></el-input>
          <el-input :value="getBodyRowTotal()" style="width:50px" size="mini" :disabled="true" class="inputsum"
                    v-if="row.type=='body'"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {extend} from '../object.js'
    import chain from '../chain.js'

    const _private = function (self) {
        return {
            forEach(callback) {
                chain(self.form).forEach((number, sizecontentid) => {
                    callback({number, sizecontentid})
                })
            }
        }
    }

    export default {
        name: 'sp-sizecontent-confirm4',
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Array
            },
            head: {
                type: [Object],
                require: true
            },
            data: {},
            uniq: {}
        },
        data() {
            let self = this

            //处理默认填入的下方需要确认或者发货的商品数量
            let form = {}

            let row = {}
            self.columns.forEach(column => {
                form[column.id] = ""
            })

            self.data.forEach(({sizecontentid, number}) => {
                form[sizecontentid] = number
            })

            return {
                form,
                tabledata: [[]]
            }
        },
        methods: {
            distributeTo() {
                let self = this
                let form = self.form
                //this._log(supplierid)
                _private(self).forEach(({sizecontentid, number}) => {
                    //self._log(key)
                    form[sizecontentid] = ""

                    form[key] = self.head[sizecontentid] ? self.head[sizecontentid] : ""
                })
                self.onChange()
            },
            onFocus(refname) {
                this.$refs[refname][0].select()
            },
            getLineTotal(formData) {
                //this._log(formData)
                let total = 0
                chain(formData).forEach(number => {
                    if (number > 0) {
                        total += number * 1
                    }
                })
                return total
            },
            getBodyRowTotal(supplierid) {
                let total = 0;
                _private(this).forEach(item => {
                    if (item.number > 0) {
                        total += item.number * 1
                    }
                })

                return total
            },
            onChange() {
                let self = this

                let list = []
                _private(this).forEach(item => {
                    item.key = self.uniq
                    list.push(item)
                })

                self.$emit("change", list)
                //self._log(list)
            },
            rowClassName({row, rowIndex}) {
                if (row.type == "foot") {
                    return "sumline"
                }

                return ""
            },
            cellClassName({row, column, rowIndex, columnIndex}) {
                if (this.columns.length + 2 == columnIndex) {
                    return "counter sumtotal"
                } else if (this.columns.length + 1 == columnIndex) {
                    //this._log("columnIndex=", columnIndex)
                    return "counter sumcolumn"
                } else {
                    return "counter"
                }
            },
            selectAll() {
                const self = this;
                extend(self.form, self.head);
                self.onChange();
            },
        },
        computed: {
            rows: function () {
                let self = this
                let results = []
                results.push({
                    type: "head",
                    form: self.head
                })

                let row = {}
                self.columns.forEach(column => {
                    if (!row[column.id]) {
                        row[column.id] = ""
                    }
                })

                results.push({
                    type: "body",
                    form: row
                })

                return results
            }
        }
    };
</script>
