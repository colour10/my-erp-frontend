<template>
  <div class="sizecontent">
    <el-row>
      <el-col align="center" v-for="(column,colindex) in columns" :key="column.id" style="width:51px" :span="1">{{column.name}}</el-col>
    </el-row>
    <el-row>
      <el-input :value="form[column.id]" v-for="(column,colindex) in columns" :key="column.id" style="width:51px" size="mini" disabled></el-input>
    </el-row>
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
    update(type) {
      const self = this;
      const form = self.form;

      self.stocks.forEach(item => {
        let number;
        if (self.type == 3) {
          number = item.number;
        } else if (self.type == 1) {
          number = item.number - item.reserve_number;
        } else if (self.type == 2) {
          number = item.reserve_number;
        }
        form[item.sizecontentid] = number;
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
