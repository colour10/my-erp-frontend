<template>
  <div>
    <el-row :gutter="10">
      <el-checkbox-group v-model="checkList">
        <el-col :span="4" v-for="item in data" :key="item.id" style="margin-bottom: 20px;text-align:center;">
          <img :src="_fileLink(item.filename)" class="avatar" style="margin:auto;"/>
          <el-checkbox :label="item.id">{{ _label("xuanze") }}</el-checkbox>
        </el-col>
      </el-checkbox-group>
      <auth auth="product">
        <el-col :span="4">
          <el-upload class="avatar-uploader" :action="host+'/common/upload?category=product'" multiple
                     :show-file-list="false" :on-success="handleAvatarSuccess">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </auth>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="24" align="center">
        <as-button type="primary" @click="onDelete">{{ _label("shanchu") }}</as-button>
        <as-button type="primary" @click="onQuit">{{ _label("tuichu") }}</as-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {host, httpPost} from './http.js'

console.log(host)
export default {
  name: 'sp-album',
  components: {},
  props: {
    lang: {
      type: String
    },
    productid: {
      type: [String, Number]
    }
  },
  data() {
    return {
      data: [],
      host,
      loaded: false,
      checkList: []
    }
  },
  methods: {
    // 退出
    onQuit() {
      this.$emit("quit")
    },

    // 图片删除
    onDelete() {
      let self = this
      if (confirm(self._label("quedingshanchu"))) {
        let params = {
          productid: self.productid,
          ids: self.checkList.join(',')
        }
        self._submit("/picture/delete", params).then(res => {
          self.loadList()
        })
      }
    },

    /**
     * 上传图片
     *
     * @param response
     * @param file
     * @param fileList
     */
    handleAvatarSuccess(response, file, fileList) {
      let self = this
      // 拼接 post 参数
      let params = {
        productid: self.productid,
        name: file.name,
        filename: response["files"][file.name]
      }
      // 请求，另外两种分辨率的在服务器端完成转换
      self._submit("/picture/add", params).then(function (res) {
        params.id = res.id;
        self.data.push(params)
      })
    },

    // 重新加载图片
    loadList() {
      let self = this
      self.data = []

      if (self.productid && self.productid > 0) {
        httpPost("/product/picture", {id: self.productid}).then(function (res) {
          self.data = res.data;
          self.loaded = true;
        })
      }
    }
  },

  // 监听
  watch: {
    productid(newValue) {
      let self = this
      self.loaded = false;
      self.data = []
    }
  }
}
</script>
