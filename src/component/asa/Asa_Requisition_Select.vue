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
                        <el-input size="mini" v-model="row.number" @change="onChange" />
                    </template>
                </el-table-column>
            </el-table>
            <el-button slot="reference" size="mini">{{_label('xuanze')}}</el-button>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: 'sp-requisition-select',
    props: {
        stocks: {},
        list: {},
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
        },
    },
    mounted() {
        this.init();
    },
};
</script>
