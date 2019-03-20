<template>
    <div>
        <multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>

        <el-dialog class="user-form" :title="title" :visible.sync="dialogVisible" :center="true" width="80%">
            <multiple-admin-page v-bind="props2" ref="page2"></multiple-admin-page>
        </el-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import Multiple_Admin_Page from '../Multiple_Admin_Page.vue'

const _log = globals.logger("asapage-producttemplate");

var props = {
    columns:[            
        {name:"name", label:globals.getLabel("mobanmingcheng"), is_multiple:true, is_focus:true},
        {name:"picture", label:globals.getLabel("tupian"), type:"upload", multiple:false, limit:1,is_image:true,image_width:60,image_height:60}
    ],
    buttons:[
        {name:"code", label:globals.getLabel("chakanziji"), width:200, disable_change:true, handler:function(rowIndex, row){
            //console.log(rowIndex, row)   
            props2.base.tempid = row.id;
            options.dialogVisible = true; 
            options.title = row.templatename
        }}
    ],
    controller:"producttemplate",
    key_column:"name"
}

var props2 = {
    columns:[            
        {name:"name", label:globals.getLabel("biaoti"), is_multiple:true, is_focus:true},
        {name:"sortnum", label:globals.getLabel("xuhao")}
    ],
    controller:"templatemanage",
    key_column:"name",
    base:{
        tempid:""    
    }
}

const options = {
    globals,
    props:props,
    props2:props2,
    dialogVisible:false,
    title:""
}

export default {
    name: 'asapage-producttemplate',
    components:{
        'multiple-admin-page':Multiple_Admin_Page
    },
    props: {
    },
    data() {
        var self = this;
        
        return options
    },
    methods:{
    }
}
</script>
