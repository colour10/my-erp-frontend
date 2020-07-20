<template>
  <div>
    <el-form ref="colorsForm" :model="colors" :inline-message="false" :show-message="false">
      <el-table :data="colors" border style="width:100%;">
        <el-table-column :label="showLabel('zhutu')" align="center">
          <template v-slot="scope">
            <simple-avatar v-model="scope.row.picture" font-size="14px" :size="35"></simple-avatar>
          </template>
        </el-table-column>
        <el-table-column :label="showLabel('futu')" align="center">
          <template v-slot="scope">
            <simple-avatar v-model="scope.row.picture2" font-size="14px" :size="35"></simple-avatar>
          </template>
        </el-table-column>

        <el-table-column :label="showLabel('kuanshi')" width="140" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="scope.$index + '.wordcode_1'"
              :rules="{required: true, trigger: 'blur'}"
            >
              <el-input v-model="scope.row.wordcode_1" size="mini"
                        @keyup.native="handleKeyInput(scope.row, 'wordcode_1')">
              </el-input>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column :label="showLabel('caizhi')" width="140" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="scope.$index + '.wordcode_2'"
              :rules="{required: true, trigger: 'blur'}"
            >
              <el-input v-model="scope.row.wordcode_2" size="mini"
                        @keyup.native="handleKeyInput(scope.row, 'wordcode_2')"></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <el-table-column :label="showLabel('yanse')" width="140" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="scope.$index + '.wordcode_3'"
              :rules="{required: true, trigger: 'blur'}"
            >
              <el-input v-model="scope.row.wordcode_3" size="mini"
                        @keyup.native="handleKeyInput(scope.row, 'wordcode_3')"></el-input>
            </el-form-item>
          </template>
        </el-table-column>

        <!-- 颜色名称 start -->
        <el-table-column :label="showLabel('yansemingcheng')" width="150" align="center">
          <template v-slot="scope">
            <el-input v-model="scope.row.colorname" size="mini"></el-input>
          </template>
        </el-table-column>
        <!-- 颜色名称 end -->

        <!-- 色系 start -->
        <el-table-column :label="showLabel('sexi') + '/' + showLabel('color')" width="140" align="center">
          <template slot-scope="scope">
            <el-form-item
              :prop="scope.$index + '.colorId'"
              :rules="{required: true, trigger: 'change'}"
            >
              <el-cascader
                placeholder=""
                v-model="scope.row.colorId"
                size="mini"
                :options="colorSystems"
                :props="{ children: 'colors', value: 'id', label: 'title' }"
                clearable>
              </el-cascader>
            </el-form-item>
          </template>
        </el-table-column>
        <!-- 色系 end -->

        <!-- 附颜色 id start -->
        <el-table-column prop="brandcolor" :label="showLabel('second_color')" width="140" align="center">
          <template v-slot="{ row }">
            <el-cascader
              placeholder=""
              v-model="row.secondColorId"
              size="mini"
              :show-all-levels="false"
              :options="colorSystems"
              :props="{ children: 'colors', value: 'id', label: 'title' }"
              clearable>
            </el-cascader>
          </template>
        </el-table-column>
        <!-- 附颜色 id end -->

        <!-- 辅助码 start -->
        <el-table-column :label="showLabel('fuzhuma')" width="120" align="center">
          <template v-slot="scope">
            <el-input v-model="scope.row.wordcode_4" size="mini"></el-input>
          </template>
        </el-table-column>
        <!-- 辅助码 end -->

        <el-table-column :label="showLabel('caozuo')" width="130" align="center">
          <template v-slot="scope">
            <as-button type="danger" @click="handleRemoveColor(scope.$index)" v-if="$route.params.id!=scope.row.id">
              {{showLabel("shanchu")}}
            </as-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    <el-col :offset="8" :span="8" style="padding-top:5px">
      <asa-button :enable="_isAllowed('product')" @click="handleSaveColorGroup">{{showLabel("baocun")}}</asa-button>
      <asa-button type="success" :enable="_isAllowed('product')" @click="handleAppendColor">{{showLabel("zhuijia")}}
      </asa-button>
    </el-col>
  </div>
</template>
<script>
    import {extract} from '@/component/globals.js'
    import _ from 'lodash'

    const color_keys = ['id', 'brandcolor', 'wordcode_1', 'wordcode_2', 'wordcode_3', 'wordcode_4', 'colorname', 'picture', 'picture2', 'colorId', 'secondColorId']

    export default {
        name: 'colorGroup',
        data() {
            return {
                wordcode_1: '',
                wordcode_2: '',
                colors: [],
                colorSystems: []
            }
        },
        methods: {
            handleSaveColorGroup() {
                //保存同款多色数据
                let self = this;
                let params = {productid: self.$route.params.id}
                params.list = self.colors.map(item => extract(item, color_keys))


                this.$refs['colorsForm'].validate((valid) => {
                    if (valid) {
                        self._submit("/product/savecolorgroup", {params: JSON.stringify(params)}).then(function () {
                            self.loadColorGroupList()
                        })
                    }
                })
            },
            handleRemoveColor(index) {
                this.colors.splice(index, 1)
            },
            handleAppendColor() {
                let self = this
                self.colors.push({
                    picture: "",
                    picture2: "",
                    colorname: "",
                    colorId: "",
                    secondColorId: "",
                    wordcode_1: self.wordcode_1,
                    wordcode_2: self.wordcode_2,
                    wordcode_3: "",
                    wordcode_4: "",
                    id: ""
                })
            },
            handleKeyInput(target, columnName) {
                target[columnName] = target[columnName].toUpperCase();
            },
            getColorSystemAndColor() {
                let self = this
                if (self.colorSystems.length === 0) {
                    self._fetch("/color/getColorSystemAndColorForCascader", {}).then(function (res) {
                        self.colorSystems = res.data
                    })
                }
            },
            loadColorGroupList() {
                let self = this
                self.colors = []
                self._fetch("/product/getcolorgrouplist", {id: self.$route.params.id}).then(function (res) {
                    res.data.forEach(function (row, index) {
                        if (index == 0) {
                            self.wordcode_1 = row.wordcode_1
                            self.wordcode_2 = row.wordcode_2
                        }

                        if (_.isEmpty(row.color_system_id) || _.isEmpty(row.color_id)) {
                            row.colorId = ''
                        } else {
                            row.colorId = []
                            row.colorId.push(parseInt(row.color_system_id))
                            row.colorId.push(parseInt(row.color_id))
                        }

                        row.secondColorId = parseInt(row.second_color_id)

                        self.colors.push(row)
                    })
                })

                self.getColorSystemAndColor()
            }
        }
    }
</script>

<style scoped>
  .el-form-item {
    margin: 0;
  }
</style>
