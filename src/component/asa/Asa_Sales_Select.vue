<template>
    <div>
        <el-popover placement="right" width="400" trigger="click">
            <el-table :data="tabledata">
                <el-table-column width="180" :label="_label('cangku')">
                    <template v-slot="{row}">
                        <sp-select-text :value="row.warehouseid" source="warehouse"/>
                    </template>
                </el-table-column>
                <el-table-column width="110" :label="_label('kucun')" prop="stock_number"></el-table-column>
                <el-table-column width="110" :label="_label('shuliang')">
                    <template v-slot="{row}">
                        <el-input size="mini" :ref="row.warehouseid" v-model="row.number" @change="onChange" @focus="onFocus(row.warehouseid)" />
                    </template>
                </el-table-column>
            </el-table>
            <el-button slot="reference" size="mini" :type="isDispatch?'success':'warning'">{{_label('xuanze')}}</el-button>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'sp-sales-select',
    props: {
        stocks: {},
        list: {},
        warehouseid: {}, // 销售仓库
        number: {}, //销售数量
        'is-dispatch': {}, // 是否已经分配了仓库
    },
    data() {
        return {
            tabledata: [],
        };
    },
    model: {
        prop: 'list',
        event: 'change',
    },
    methods: {
        onFocus(index) {
            let self = this;
            self.$refs[index].select();
        },
        onChange() {
            let self = this;
            let list = self.tabledata.map(item=>{
                if(item.number>item.stock_number) {
                    self._info(self._label('kucunbuzu'));
                }

                return {
                    warehouseid: item.warehouseid,
                    number: item.number,
                    stock_number: item.stock_number,
                };
            }).filter(item=>item.number>0);

            self.$emit('change', list);
        },
        init() {
            const self = this;
            self.stocks.forEach(item=>{
                let target = self.list.find(row=>row.warehouseid==item.warehouseid);
                if(target) {
                    item.number = target.number;
                }
                else {
                    item.number = '';
                }
                self.tabledata.push(item);
            });

            for(let i=0;i<self.tabledata.length;i++) {
                if(self.tabledata[i].warehouseid==self.warehouseid) {
                    // 把当前销售仓库的记录方到最前面
                    let [row] = self.tabledata.splice(i,1);
                    self.tabledata.unshift(row);
                }
            }

            self.initLocalNumber();

            self.onChange();
        },

        // 默认给本次仓库分配初始数量
        initLocalNumber() {
            let self = this;
            // 检查是否已经设置过了
            for(let item of self.tabledata) {
                if(item.warehouseid!=self.warehouseid && item.number>0) {
                    return ;
                }
            }

            for(let item of self.tabledata) {
                if(item.warehouseid==self.warehouseid) {
                    item.number = Math.min(item.stock_number, self.number);
                    break;
                }
            }
        },
    },
    mounted() {
        this.init();
    },
    watch: {
        number() {
            this.initLocalNumber();
            this.onChange();
        },
    },
};
</script>
