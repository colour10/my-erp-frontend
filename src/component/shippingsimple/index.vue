<template>
  <div>
    <!-- 按钮组 start -->
    <el-row>
      <el-col :span="24">
        <as-button type="primary" @click="_showDialog('search')" size="mini" icon="el-icon-search">
          {{ _label("chaxun") }}
        </as-button>
        <asa-button type="primary" @click="showFormToCreate()" :enable="_isAllowed('shipping-simple-add')">
          {{ _label('xinjian') }}
        </asa-button>
      </el-col>
    </el-row>
    <!-- 按钮组 end -->

    <!-- 列表 start -->
    <simple-admin-tablelist ref="tablelist" v-bind="props" :onclickupdate="showFormToEdit" :isdelete="false"
                            :isedit="false">
      <!-- <template v-slot:orderno="{row}">
          <router-link :to="'/shipping/warehousing/'+row.id">{{row.orderno}}</router-link>
      </template> -->
    </simple-admin-tablelist>
    <!-- 列表 end -->

    <!-- 查询条件 start -->
    <sp-dialog ref="search" width="600">
      <el-form class="order-form" :model="form" label-width="70px" :inline="false" style="width:100%;" size="mini"
               @submit.native.prevent>
        <el-row :gutter="0">
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('dingdanhao')">
              <el-input v-model="form.orderno" class="width2"/>
            </el-form-item>
            <el-form-item :label="_label('gonghuoshang')">
              <simple-select v-model="form.supplierid" source="supplier_3" :multiple="true"/>
            </el-form-item>
            <el-form-item :label="_label('niandai')">
              <simple-select v-model="form.ageseason" source="ageseason" :multiple="true"/>
            </el-form-item>
            <el-form-item :label="_label('daohuocangku')">
              <simple-select v-model="form.warehouseid" source="warehouses" :multiple="true"/>
            </el-form-item>
          </el-col>
          <el-col :span="8" style="width:270px">
            <el-form-item :label="_label('jijie')">
              <simple-select v-model="form.seasontype" source="seasontype"/>
            </el-form-item>
            <el-form-item :label="_label('yewuleixing')">
              <simple-select v-model="form.bussinesstype" source="bussinesstype"/>
            </el-form-item>

            <el-form-item :label="_label('zhuangtai')">
              <simple-select v-model="form.status" source="shippingstatus"/>
            </el-form-item>

            <el-form-item :label="_label('beizhu')">
              <el-input v-model="form.memo" class="width2"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0">
          <el-col align="center">
            <as-button type="primary" @click="onSearch(form)" native-type="submit">{{ _label("chaxun") }}</as-button>
            <as-button type="primary" @click="_hideDialog('search')">{{ _label("tuichu") }}</as-button>
          </el-col>
        </el-row>
      </el-form>
    </sp-dialog>
    <!-- 查询条件 end -->
  </div>
</template>

<script>
import {_label} from "@/component/globals"

export default {
  name: 'sp-shipping',
  data() {
    let self = this;
    let _label = self._label

    return {
      form: {
        orderno: "",
        warehouseid: "",
        supplierid: "",
        ageseason: "",
        seasontype: "",
        bussinesstype: "",
        status: ""
      },
      props: {
        columns: [
          {name: "orderno", label: _label('rukudanhao'), width: 120},
          {
            name: "warehouseid",
            label: _label('daohuocangku'),
            type: 'select',
            source: 'warehouse',
            width: 150
          },
          {
            name: "supplierid",
            label: _label('gonghuoshang'),
            type: 'select',
            source: "supplier",
            width: 90
          },
          {
            name: "ageseason",
            label: _label('niandaijijie'),
            type: 'select',
            source: "ageseason",
            width: 110
          },
          {
            name: "bussinesstype",
            label: _label('yewuleixing'),
            type: 'select',
            source: "bussinesstype",
            width: 110
          },
          {
            name: "status",
            label: _label('zhuangtai'),
            type: 'select',
            source: "shippingstatus",
            width: 80
          },
          {
            name: "maketime", label: _label('fahuoriqi'), width: 110, convert: function (row) {
              if (row.maketime && row.maketime.length > 0) {
                return row.maketime.substr(0, 10)
              }
            }
          },

          {
            name: "warehousingtime",
            label: _label('rukuriqi'),
            width: 110,
            sortMethod: self.sortMethod,
            convert: function (row) {
              if (row.warehousingtime && row.warehousingtime.length > 0) {
                return row.warehousingtime.substr(0, 10)
              }
            }
          },
          {name: "makestaff", label: _label('zhidanren'), source: "user", type: "select", width: 150}
        ],
        controller: "shippingsimple",
        actions: [
          {
            label: _label("xiangqing"), type: '', handler: function ({row}) {
              self.$router.push('/shippingsimple/warehousing/' + row.id)
            }
          },
          {
            label: _label("shanchu"),
            type: "danger",
            enable: self._isAllowed('shipping-delete'),
            handler: function ({row}) {
              self._remove("/shippingsimple/delete", {id: row.id}).then(function (result) {
                if (result) {
                  self.$refs.tablelist.search(self.searchform)
                }
              })
            }
          }
        ],
        options: {
          action_width: 200
        }
      }
    }
  },
  methods: {
    sortMethod(a, b) {
      if (!a.warehousingtime) {
        return -1;
      } else if (!b.warehousingtime) {
        return 1
      } else {
        return a.warehousingtime >= b.warehousingtime ? 1 : -1;
      }

    },
    onSearch() {
      let self = this
      self.$refs.tablelist.search(self.form)
      self._hideDialog("search")
    },
    showFormToCreate() {
      this.$router.push('/shippingsimple/0')
    },
    showFormToEdit(rowIndex, row) {
      this.$router.push('/shippingsimple/' + row.id)
    }
  },
  // 渲染前调用
  created() {
    // 发送标题
    this._setTitle(_label('fahuodan'));
  }
}
</script>
