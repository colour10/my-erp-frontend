<template>
  <el-row :gutter="10">
      <el-col :span="4"  v-for="item in data" :key="item.id" style="margin-bottom: 20px;">
        <img :src="_label('_image_url_prex')+item.filename" class="avatar" />
      </el-col>
      <el-col :span="4">
        <el-upload class="avatar-uploader" :action="host+'/common/upload?category=product'" multiple :show-file-list="false" :on-success="handleAvatarSuccess">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>  
</template>

<script>
import {httpPost,host} from './http.js'
import globals from './globals.js'
import avatar from './Simple_Avatar.vue'

console.log(host)
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
            data:[],
            host
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            var self = this
            //self._log(response,file)
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
            httpPost("/l/picture", {productid:self.productid}, function(res){
                //self._log("==========",res)   
                self.data = res.data; 
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