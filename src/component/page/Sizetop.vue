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

const _log = globals.logger("asapage-sizetop");

var props = {
    columns:[            
        {name:"name", label:globals.getLabel('mingcheng'), is_multiple:true, is_focus:true},
        {name:"code", label:globals.getLabel('bianhao')}
    ],
    buttons:[
        {name:"code", label:globals.getLabel('chakanziji'), width:200, disable_change:true, handler:function(rowIndex, row){
            //console.log(rowIndex, row)   
            props2.base.topid = row.id;
            options.dialogVisible = true; 
        }}
    ],
    controller:"sizetop",
    key_column:"name"
}

var props2 = {
    columns:[            
        {name:"content", label:globals.getLabel('neirong'), is_multiple:true, is_focus:true},
        {name:"sortnum", label:globals.getLabel('xuhao')},
    ],
    controller:"sizecontent",
    key_column:"content",
    base:{
        topid:""    
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
    name: 'asapage-sizetop',
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
