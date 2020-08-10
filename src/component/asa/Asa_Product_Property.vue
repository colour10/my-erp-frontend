<template>
  <div class="property">
    <el-table :data="sizecontents" border style="width:100%;">
      <!-- 单独尺码列 start -->
      <el-table-column :label="_label('chima')" align="center" width="80">
        <template v-slot="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <!-- 单独尺码列 end -->

      <!-- 属性列循环 start -->
      <el-table-column
        :label="item.name+'(CM)'"
        align="center"
        v-for="(item,index) in properties"
        :key="item.id"
        width="200">
        <template v-slot="scope">
          <el-input :ref="index+'.'+scope.$index"
                    v-model="data[scope.row.id+'_'+item.id]"
                    size="mini"
                    @focus="handleMyFocus"
                    @keyup.native.down="focusNext(index, scope.$index+1)"
                    @keyup.native.up="focusNext(index, scope.$index-1)"
                    @keyup.native.left="focusNext(index-1, scope.$index)"
                    @keyup.native.right="focusNext(index+1, scope.$index)"></el-input>
        </template>
      </el-table-column>
      <!-- 属性列循环 end -->
    </el-table>

    <!-- 按钮组 start -->
    <el-col :offset="8" :span="8" style="padding:5px">
      <auth auth="product">
        <as-button type="primary" @click="onSave" v-if="option.isedit">{{_label("baocun")}}</as-button>
      </auth>
      <as-button type="primary" @click="onQuit">{{_label("tuichu")}}</as-button>
    </el-col>
    <!-- 按钮组 end -->

  </div>
</template>

<script>
    import globals, {_label} from '../globals.js'
    import DataSource from '../DataSource.js'

    export default {
        name: 'asa-product-property',
        components: {},
        // 外部接收
        props: {
            // 权限
            option: {
                type: Object,
            },
            // 商品id
            productid: {
                type: String,
            },
        },
        // 定义数据
        data() {
            var self = this;

            return {
                product: {},
                properties: [],
                sizecontents: [],
                data: {},
                loaded: false
            }
        },
        // 方法列表
        methods: {
            // 获取商品的详细信息
            async getProduct(id) {
                let self = this
                let res = await self._fetch("/product/info", {id: id});
                // 赋值
                self.product = res.data
            },
            // 退出逻辑
            onQuit() {
                // 需要重新 loading
                this.loaded = false
                this.$emit('quit')
            },
            // 编辑框修改逻辑
            focusNext(x, y) {
                if (x < 0 || y < 0) {
                    return
                }

                let target = this.$refs[x + '.' + y]
                if (target && target.length && target.length > 0) {
                    target[0].focus()
                }
            },
            // 当 input 获取焦点时默认选中当前文本
            handleMyFocus(event) {
                event.currentTarget.select()
            },
            // 保存逻辑
            async onSave() {
                let self = this;

                let params = {id: self.product.id}
                params.list = globals.extend({}, self.data)
                let result = await self._submit("/product/saveproperty", {params: JSON.stringify(params)})
                // 测试值
                console.log('Asa_Product_Property => onSave => result 的值是：', result)
            },
            // 默认执行这个程序
            async load() {
                let self = this
                // 如果数据请求完毕，则直接返回
                if (self.loaded) {
                    return;
                }

                // 取出商品数据，都需要异步改同步
                let response = await self._fetch("/product/info", {id: self.productid})
                // 赋值
                self.product = response.data

                // 取出商品尺寸
                self.sizecontents = self.product.sizecontents

                // 取出属性列表
                let res = await self._fetch("/brandgroupchildproperty/page", {brandgroupchildid: self.product.childbrand})

                let source = DataSource.getDataSource("property", _label("lang"))
                source.getData(async function (properties) {
                    self._log("properties", properties)
                    let list = res.data.map(item => {
                        //self._log(item)
                        let info = properties.find(row => row.row.id == item.propertyid)
                        if (typeof (info) == 'object') {
                            //self._log("info", info)
                            return info;
                        }
                    }).filter(item => item)

                    // 赋值
                    self.properties = list

                    //加载数据
                    res = await self._fetch("/product/getproperties", {id: self.productid})

                    let obj = {}
                    // 把 data 按照 sizecontentid_propertyid 拼接起来
                    res.data.forEach(item => {
                        obj[item.sizecontentid + '_' + item.propertyid] = item.content;
                    })

                    // data 赋值
                    self.data = obj
                    self.loaded = true;
                });
            }
        },
        computed: {},
        watch: {},
    }
</script>

<style scoped>
  .property >>> .el-input__inner {
    width: 90%;
    padding: 0 5px;
    text-align: center;
  }
</style>
