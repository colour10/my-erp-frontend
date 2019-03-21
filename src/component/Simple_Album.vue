<template>
  <el-row :gutter="10">
      <el-col :span="4"  v-for="item in data" :key="item.id" style="margin-bottom: 20px;">
        <img :src="_label('_image_url_prex')+item.filename" class="avatar" />
      </el-col>
      <el-col :span="4">
        <el-upload class="avatar-uploader" action="/common/upload?category=product" multiple :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="imageurl" :src="_label('_image_url_prex')+imageurl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>  
</template>

<script>
//import DataSource from './DataSource.js'
import globals from './globals.js'
import avatar from './Simple_Avatar.vue'

export default {
    name: 'sp-album',
    components: {
    },
    props: {
        lang:{
            type: String
        },
        productid:{
            type:[String,Number]
        }
    },
    data() {        
        return {
            data:[]
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            var self = this
            self._log(response,file)
            //file.name = response["files"][file.name]
            var params = {
                productid:self.productid,
                name:file.name,
                filename:response["files"][file.name]    
            }
            
            self._submit("/picture/add", params, function(res){
                params.id = res.id;
                self.data.push(params)      
            })
        }, 
        loadList() {
            var self = this
            $ASA.post("/picture/list", {productid:self.productid}, function(res){
                self._log("==========",res)   
                self.data = res; 
            },'json')
        }
    },
    watch:{
        productid(newValue) {
            var self = this
            self.data = [] 
            self.loadList()  
        }
    },
    mounted:function(){
        var self = this
        self.loadList()
    }
}
</script>