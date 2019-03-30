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

const _log = globals.logger("asapage-brandgroup");

var props = {
        columns:[            
            {name:"name", label:globals.getLabel('pinleimingcheng'), is_multiple:true, is_focus:true},
            {name:"code", label:globals.getLabel('pinleibianma')}
        ],
        buttons:[
            {name:"code", label:globals.getLabel('chakanziji'), width:200, disable_change:true, handler:function(rowIndex, row){
                //console.log(rowIndex, row)   
                props2.base.brandgroupid = row.id;
                options.dialogVisible = true; 
                //options.title = row.brandgroupname
            }}
        ],
        controller:"brandgroup",
        key_column:"name"
    }

var props2 = {
        columns:[            
            {name:"name", label:globals.getLabel('zileimingcheng'), is_multiple:true, is_focus:true},
            {name:"childcode", label:globals.getLabel('zileibianma')},
            {name:"producttemplateid", label:globals.getLabel('chimamoban'), type:'select', source:"sizetop"},
            {name:"weight", label:globals.getLabel('maozhong')},
        ],
        controller:"childproductgroup",
        key_column:"name",
        base:{
            brandgroupid:""    
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
    name: 'asapage-brandgroup',
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
