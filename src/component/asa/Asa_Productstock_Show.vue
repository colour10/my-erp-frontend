<template>
  <div class="sizecontent">
    <!-- 尺码组 start -->
    <el-row>
      <el-col align="center" v-for="(column,colindex) in columns" :key="column.id" style="width:51px" :span="1">
        {{column.name}}
      </el-col>
    </el-row>
    <!-- 尺码组 end -->
    <!-- 尺码对应数量 start -->
    <el-row>
      <el-input :value="form[column.id]" v-for="(column,colindex) in columns" :key="column.id" style="width:51px"
                size="mini" disabled></el-input>
    </el-row>
    <!-- 尺码对应数量 end -->
  </div>
</template>

<script>
    export default {
        name: 'sp-productstock-show',
        props: {
            columns: {
                type: Array,
            },
            stocks: {
                type: [Array],
                require: true,
            },
            type: {
                type: Number,
            },
        },
        data() {
            let self = this;

            let form = {};
            self.columns.forEach(item => {
                form[item.id] = '';
            });

            return {
                form,
            };
        },
        methods: {
            update() {
                const self = this;
                const form = self.form;

                //  遍历，需要把其中 sizecontentid 相同的进行汇总处理
                self.stocks.forEach(item => {
                    // let number;
                    // // 原来的判断注释
                    // if (self.type == 3) {
                    //     number = item.number;
                    // } else if (self.type == 1) {
                    //     number = item.number - item.reserve_number;
                    // } else if (self.type == 2) {
                    //     number = item.reserve_number;
                    // }

                    // // 加入新判断, liuzongyang 2020/4/24 17:59
                    // // 1-待售 2-预售（锁定） 4-在途
                    // if (self.type == 1) {
                    //     // 待售 = 总数量 - 预售 - 在途 - 已售
                    //     number = item.number - item.reserve_number - item.shipping_number - item.sales_number;
                    // } else if (self.type == 2) {
                    //     // 预售
                    //     number = item.reserve_number
                    // } else if (self.type == 4) {
                    //     // 在途
                    //     number = item.shipping_number
                    // } else if (self.type == 3) {
                    //     // 待售 + 预售
                    //     number = item.number - item.shipping_number - item.sales_number
                    // } else if (self.type == 5) {
                    //     // 待售 + 在途
                    //     number = item.number - item.reserve_number - item.sales_number
                    // } else if (self.type == 6) {
                    //     // 预售 + 在途
                    //     number = item.reserve_number + item.shipping_number
                    // } else {
                    //     // 否则就显示所有
                    //     number = item.number
                    // }

                    // 注意字符串要换成数字
                    if (form[item.sizecontentid] === '') {
                        form[item.sizecontentid] = item.number * 1;
                    } else {
                        form[item.sizecontentid] += item.number * 1;
                    }


                });
            },
        },
        watch: {
            type() {
                this.update();
            },
        },
        mounted() {
            this.update();
        },
    };
</script>
