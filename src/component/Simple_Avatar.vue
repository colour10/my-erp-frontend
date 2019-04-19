<template>
    <el-upload class="avatar-uploader" :action="host+'/common/upload?category=product'" :show-file-list="false" :on-success="handleAvatarSuccess" :disabled="disabled">
        <img v-if="imageurl" :src="_fileLink(imageurl)" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
</template>

<script>
import globals,{_label} from './globals.js'
import { host } from './http.js'

export default {
    name: 'simple-avatar',
    props: {
        select_value: {
            type: [String, Number],
            required: true,
            default: ''
        },
        lang: {
            type: String
        },
        disabled: {
            type: Boolean,
            default: false
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
        }
    },
    watch: {
        select_value(newValue) {
            this.imageurl = newValue
        }
    }
}
</script>
