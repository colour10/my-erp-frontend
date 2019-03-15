<template>
  <el-upload class="avatar-uploader" action="/common/upload?category=product" :show-file-list="false" :on-success="handleAvatarSuccess">
    <img v-if="imageurl" :src="image_url_prex+imageurl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>

export default {
    name: 'simple-avatar',
    props: {
        select_value:{
            type: [String,Number],
            required: true,
            default:''
        },
        lang:{
            type: String
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        return {
            imageurl:this.select_value,
            image_url_prex:$ASAL._image_url_prex
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            var filename = file.name
            filename = response["files"][filename]
            
            //self.imageurl = file.name
            //console.log(file.name)
            this.$emit('change', filename)
        } 
    },
    watch:{
        select_value(newValue) {
            this.imageurl = newValue
        }
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
</style>
