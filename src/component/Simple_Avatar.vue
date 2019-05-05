<template>
    <el-upload class="avatar-uploader" :action="host+'/common/upload?category=product'" :show-file-list="false" :on-success="handleAvatarSuccess" :disabled="disabled" style="uploadStyle()">
        <img v-if="imageurl" :src="_fileLink(imageurl)" class="avatar" :style="imageStyle()">
        <i v-else class="el-icon-plus avatar-uploader-icon" :style="imageStyle()"></i>
    </el-upload>
</template>

<script>
import globals,{_label} from './globals.js'
import { host } from './http.js'

export default {
    name: 'simple-avatar',
    props: {
        select_value: {
            default: ''
        },
        lang: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
        },
        size:{
            type:Number,
            default:148
        },
        fontSize:{
            type:String,
            default:'28px'
        }
    },
    model: {
        prop: 'select_value',
        event: 'change'
    },
    data() {
        return {
            imageurl: this.select_value,
            host
        }
    },
    methods: {
        handleAvatarSuccess(response, file, fileList) {
            var filename = file.name
            filename = response["files"][filename]

            //self.imageurl = file.name
            //console.log(file.name)
            this.$emit('change', filename)
        },
        uploadStyle() {
            let self = this
            return {
                width:self.size+'px',
                height:self.size+'px'
            }
        },
        imageStyle() {
            let self = this
            return {
                width:self.size+'px',
                height:self.size+'px',
                lineHeight:self.size+'px',
                fontSize:self.fontSize
            }
        }
    },
    watch: {
        select_value(newValue) {
            this.imageurl = newValue
        }
    }
}
</script>
