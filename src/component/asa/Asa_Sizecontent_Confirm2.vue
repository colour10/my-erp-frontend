<template>
  <div class="sizecontent">
    <el-table :data="tabledata" style="width:100%;" :border="false" :row-class-name="rowClassName"
              :cell-class-name="cellClassName">
      <el-table-column :label="_label('gonghuoshang')" align="left" width="110">
        <template v-slot="{row}">
          <div v-if="row.type=='body'" @dblclick="distributeTo(row.supplierid)">{{row.suppliercode}}</div>
          <span v-if="row.type=='foot'">{{_label('jiaoyan')}}</span>
        </template>
      </el-table-column>

      <el-table-column :label="_label('zhekoulv')" align="left" width="65">
        <template v-slot="{row, $index}">
          <el-input v-if="row.type=='body'" v-model="row.discount" @change="onDiscountChange(row.supplierid, $event)"
                    :ref="'xx-'+row.supplierid" @keyup.native="onKeyUp($event, $index, -1, 'xx', row.supplierid)"
                    :setmap="setMap($index, -1, 'xx', row.supplierid)" size="mini" style="width:50px"></el-input>
        </template>
      </el-table-column>

      <el-table-column :label="column.name" align="center" v-for="(column, colindex) in columns" :key="column.id"
                       width="51" class="counter">
        <template v-slot="{row, $index}">
          <el-input v-model="row.form[column.id]" style="width:50px" size="mini" :disabled="true" class="linetop"
                    v-if="row.type=='head'"></el-input>
          <el-input v-model="form[column.id+'-'+row.supplierid]" style="width:50px" size="mini"
                    @keyup.native="onKeyUp($event, $index, colindex, column.id, row.supplierid)"
                    :setmap="setMap($index, colindex, column.id, row.supplierid)" v-if="row.type=='body'"
                    :ref="column.id+'-'+row.supplierid" @focus="onFocus(column.id+'-'+row.supplierid)"></el-input>
          <el-input v-model="sizecontentStat[column.id]" style="width:50px" size="mini" :disabled="true"
                    :class="getFootCellClass(row.form[column.id])" v-if="row.type=='foot'"></el-input>
        </template>
      </el-table-column>
      <el-table-column :label="_label('heji')" align="right" width="53">
        <template v-slot="{row}">
          <el-input :value="supplierStat[row.type]" style="width:50px" size="mini" :disabled="true" class="linetop"
                    v-if="row.type=='head'"></el-input>
          <el-input :value="supplierStat[row.supplierid]" style="width:50px" size="mini" :disabled="true"
                    class="inputsum" v-if="row.type=='body'"></el-input>
          <el-input :value="getLineTotal(sizecontentStat)" style="width:50px" size="mini" :disabled="true"
                    :class="getFootCellClass(supplierStat[row.type])" v-if="row.type=='foot'"></el-input>
        </template>
      </el-table-column>

      <el-table-column :label="_label('chengjiaojia')" align="right" width="58">
        <template v-slot="{row}">
          <el-input :value="dealPrice[row.supplierid]" style="width:55px" size="mini" :disabled="true" class="inputsum"
                    v-if="row.type=='body'"></el-input>
        </template>
      </el-table-column>

      <el-table-column :label="_label('zongjia')" align="right" width="68">
        <template v-slot="{row}">
          <el-input :value="f(dealPrice[row.supplierid]*supplierStat[row.supplierid])" style="width:65px" size="mini"
                    :disabled="true" class="inputsum" v-if="row.type=='body'"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import {extend} from '../object.js'
    import chain from '../chain.js'
    import orderMixin from "../mixins/order.js"

    const _private = function (self) {

        return {
            forEach(callback) {
                chain(self.form).forEach((number, key) => {
                    let [sizecontentid, supplierid] = key.split("-");

                    let row = self.getTableRow(supplierid);
                    if (row) {
                        callback({
                            number,
                            sizecontentid,
                            supplierid,
                            discount: row.discount,
                            factoryprice: self.factoryprice,
                            price: self.dealPrice[supplierid]
                        });
                    }
                });
            },
        };
    };

    export default {
        name: 'sp-sizecontent-confirm2',
        mixins: [orderMixin],
        props: {
            disabled: {
                type: Boolean,
                default: false
            },
            columns: {
                type: Array
            },
            row: {
                type: [Object],
                require: true
            },
            suppliers: {},
            initData: {},
            factoryprice: {}//出厂价
        },
        data() {
            let self = this

            //处理默认填入的下方需要确认或者发货的商品数量
            let form = {}
            let totals = {}
            self.suppliers.forEach(supplier => {
                let row = {}
                self.columns.forEach(column => {
                    form[column.id + '-' + supplier.supplierid] = ""
                })
                totals[supplier.supplierid] = 0
            })

            self.initData.forEach(({supplierid, sizecontentid, number}) => {
                form[sizecontentid + '-' + supplierid] = number
            })

            return {
                refsMap: {},
                form,
                totals,
                tabledata: [],
                sumform: {}  //最下面的合计行的数据
            }
        },
        methods: {
            setMap(rowIndex, colIndex, sizecontentid, supplierid) {
                let key = rowIndex + '-' + colIndex;
                this.refsMap[key] = sizecontentid + '-' + supplierid;
            },
            getDiscount(supplierid) {
                let row = this.discounts.find(item => item.supplierid === supplierid);
                return row ? row.discount : "";
            },
            getFootCellClass(number) {
                if (number > 0) {
                    return 'normal';
                } else if (number < 0) {
                    return 'danger';
                }

                return 'success';
            },
            distributeTo(supplierid) {
                let self = this
                let form = self.form
                //this._log(supplierid)
                Object.keys(form).forEach(key => {
                    //self._log(key)
                    form[key] = ""

                    let [sizecontentid, tmp_supplierid] = key.split("-")
                    if (supplierid == tmp_supplierid) {
                        form[key] = self.row.form[sizecontentid] ? self.row.form[sizecontentid] : ""
                    }
                })
                self.onChange()
            },
            onDiscountChange(supplierid, event) {
                let self = this
                //console.log(event)
                let target = self.getTableRow(supplierid);
                //self._log(target)
                if (target) {
                    target.match = false
                }
                self.onChange();
            },
            reset() {
                let self = this
                let form = self.form
                Object.keys(form).forEach(key => {
                    form[key] = ""
                })
                self.onChange()
            },
            onInputDblClick(sizecontentid, supplierid) {
                let refname = sizecontentid + '-' + supplierid
                this.$refs[refname][0].select()
            },
            onFocus(refname) {
                this.$refs[refname][0].select()
            },
            getLineTotal(formData) {
                //this._log(formData)
                let total = 0
                chain(formData).forEach(number => {
                    total += number * 1
                })
                return total
            },
            getBodyRowTotal(supplierid) {
                let total = 0;
                _private(this).forEach(item => {
                    if (supplierid == item.supplierid && item.number > 0) {
                        total += item.number * 1
                    }
                })

                return total
            },
            focus(rowIndex = 1, colIndex = 0) {
                let self = this;
                let key = rowIndex + '-' + colIndex;
                //console.log(key)
                key = self.refsMap[key];
                if (self.$refs[key]) {
                    if (self.$refs[key][0]) {
                        self.$refs[key][0].focus();
                    } else {
                        self.$refs[key].focus();
                        self.$refs[key].select();
                    }
                    return true
                } else {
                    return false;
                }
            },
            startFocus(lastFrom, colIndex) {
                let self = this;
                colIndex = colIndex < self.columns.length ? colIndex : self.columns.length - 1;
                if (lastFrom == 'down') {
                    this.focus(1, colIndex);
                } else {
                    this.focus(this.tabledata.length - 2, colIndex);
                }
            },
            onKeyUp(event, rowIndex, colIndex) {
                let self = this
                if (event.key === 'ArrowRight') {
                    self.focus(rowIndex, colIndex + 1)
                } else if (event.key === 'ArrowLeft') {
                    self.focus(rowIndex, colIndex - 1)
                } else if (event.key === 'ArrowUp') {
                    if (self.focus(rowIndex - 1, colIndex) === false) {
                        self.$emit("up", colIndex)
                    }

                } else if (event.key === 'ArrowDown') {
                    if (self.focus(rowIndex + 1, colIndex) === false) {
                        self.$emit("down", colIndex)
                    }
                } else {
                    self.onChange();
                }
            },
            onChange() {
                let self = this

                let list = []
                _private(this).forEach(item => {
                    list.push(item)
                })

                self.$emit("change", {row: self.row, list})
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
            initTableData() {
                let self = this

                let hash = {}
                self.tabledata.forEach(item => {
                    hash[item.supplierid] = extend({}, item);
                })

                self.tabledata = []
                self.tabledata.push({
                    type: "head",
                    form: self.row.form
                })

                self.suppliers.forEach(supplier => {
                    let row = {}
                    self.columns.forEach(column => {
                        if (!row[column.id]) {
                            row[column.id] = ""
                        }
                    })

                    let target = {
                        type: "body",
                        form: row,
                        suppliercode: supplier.suppliercode,
                        supplierid: supplier.supplierid,
                        taxrebate: supplier.taxrebate
                    }

                    if (hash[supplier.supplierid] && hash[supplier.supplierid].match === false) {
                        target.discount = hash[supplier.supplierid].discount;
                        target.match = false;
                    } else {
                        target.discount = supplier.discount;
                        target.match = true;
                    }

                    self.tabledata.push(target)
                })

                let footForm = extend({}, self.row.form);
                _private(this).forEach(({number, sizecontentid}) => {
                    if (footForm[sizecontentid] && footForm[sizecontentid] >= 0) {
                        footForm[sizecontentid] -= number;
                    }
                })

                self.tabledata.push({
                    type: "foot",
                    form: footForm
                })

                self.onChange();
            },
            getTableRow(supplierid) {
                return this.tabledata.find(item => item.type == 'body' && item.supplierid === supplierid)
            }
        },
        computed: {
            sizecontentStat() {
                let self = this;
                let result = extend({}, self.row.form);
                _private(this).forEach(({number, sizecontentid}) => {
                    if (!result[sizecontentid]) {
                        result[sizecontentid] = 0;
                    }

                    result[sizecontentid] -= number;
                });

                return result;
            },
            supplierStat() {
                let self = this;
                let result = {};
                self.tabledata.forEach(({type, supplierid, form}) => {
                    if (type === 'body') {
                        result[supplierid] = self.getBodyRowTotal(supplierid);
                    } else {
                        result[type] = self.getLineTotal(form);
                    }
                })

                return result;
            },
            dealPrice() {
                let self = this;
                let result = {};
                self.tabledata.forEach(({type, supplierid, form, discount, taxrebate}) => {
                    if (type === 'body') {
                        result[supplierid] = taxrebate == 0 ? 0 : self.f(self.factoryprice * discount / taxrebate);
                    }
                })

                return result;
            },
        },
        watch: {
            suppliers: {
                handler: function (newValue, oldValue) {
                    let self = this;

                    self.initTableData();
                    //console.log("change suppliers")
                },
                deep: true
            },
            factoryprice() {
                this.onChange();
            },
        },
        mounted: function () {
            let self = this
            //self.onChange({})
            self.initTableData();
        },
    };
</script>
