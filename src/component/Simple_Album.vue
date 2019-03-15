<template>
  <el-row :gutter="20">
      <el-col :span="4"  v-for="item in data" :key="item.id" >
        <img :src="image_url_prex+item.filename" class="avatar" />
      </el-col>
      <el-col :span="4">
      <el-upload class="avatar-uploader" action="/common/upload?category=product" multiple :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="imageurl" :src="image_url_prex+imageurl" class="avatar">
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
        var self = this        
        
        return {
            data:[],
            labels:{
                //formTitle:globals.getLabel('qingxuanze'),
                //ok:globals.getLabel('ok'),
                //cancel:globals.getLabel('cancel')
            },
            image_url_prex:globals.getLabel("_image_url_prex")
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            var self = this
            console.log(response,file)
            //file.name = response["files"][file.name]
            var params = {
                productid:self.productid,
                name:file.name,
                filename:response["files"][file.name]    
            }
            
            $ASA.submit.call(self, "/picture/add", params, function(res){
                params.id = res.id;
                self.data.push(params)      
            })
        }, 
        loadList() {
            var self = this
            $ASA.post("/picture/list", {productid:self.productid}, function(res){
                console.log("==========",res)   
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
<style>
    .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
  .el-col {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>
