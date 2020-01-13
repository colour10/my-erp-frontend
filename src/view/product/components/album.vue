<template>
    <div style="width: 100%">
        <el-row :gutter="10">
            <el-checkbox-group v-model="checkList">
                <el-col :span="4" v-for="item in data" :key="item.id" style="margin-bottom: 20px;text-align:center;">
                    <img :src="_fileLink(item.filename)" class="avatar" style="margin:auto;" />
                    <el-checkbox :label="item.id">{{showLabel("xuanze")}}</el-checkbox>
                </el-col>
            </el-checkbox-group>
            <auth auth="product">
                <el-col :span="4">
                    <el-upload class="avatar-uploader" :action="host+'/common/upload?category=product'" multiple :show-file-list="false" :on-success="handleAvatarSuccess">
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-col>
            </auth>
        </el-row>
        <el-row :gutter="10">
            <el-col :span="24" align="center">
                <as-button type="danger" @click="handleDelete">{{showLabel("shanchu")}}</as-button>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { host } from '@/component/http.js'
import { showLabel } from '@/component/globals.js'
import avatar from '@/component/Simple_Avatar.vue'

export default {
    name: 'album',
    components: { avatar },
    data() {
        return {
            data: [],
            host,
            checkList: []
        }
    },
    methods: {
        loadList() {
            let self = this
            self.data = []

            self._fetch("/product/picture", { id: self.$route.params.id }).then(function(res) {
                self.data = res.data;
                self.loaded = true;
            })
        },
        handleAvatarSuccess(response, file, fileList) {
            let self = this
            let params = {
                productid: self.$route.params.id,
                name: file.name,
                filename: response["files"][file.name]
            }

            self._submit("/picture/add", params).then(function(res) {
                params.id = res.id;
                self.data.push(params)
            })
        },
        handleDelete() {
            let self = this
            if (confirm(self.showLabel("quedingshanchu"))) {
                let params = {
                    productid: self.$route.params.id,
                    ids: self.checkList.join(',')
                }
                self._submit("/picture/delete", params).then(res => {
                    self.loadList()
                })
            }
        }
    }
}
</script>