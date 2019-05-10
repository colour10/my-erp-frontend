<template>
    <div>
        <multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>

        <el-dialog class="user-form" :title="title" :visible.sync="dialogVisible" :center="true" width="80%">
            <simple-admin-page v-bind="props2" ref="page2"></simple-admin-page>
        </el-dialog>
    </div>
</template>

<script>
import {_label} from '../globals.js'

var props = {
    columns:[            
        {name:"name_cn", label:_label('jiancheng'), is_focus:true, sortable:true},
        {name:"name_en", label:_label('mingcheng'), sortable:true},
        //{name:"code", label:_label('bianhao')},
        {name:"displayindex", label:_label('paixu'), sortMethod:(a,b)=>a-b}
    ],
    buttons:[
        {name:"code", label:_label('chakanziji'), width:200, disable_change:true, handler:function(rowIndex, row){
            //console.log(rowIndex, row)   
            props2.base.topid = row.id;
            options.dialogVisible = true; 
            options.title = row.name_cn
        }}
    ],
    controller:"sizetop",
    key_column:"name"
}

var props2 = {
    columns:[            
        {name:"name", label:_label('neirong'), is_focus:true}
    ],
    actions: [{
        label: _label('dingbu'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/sizecontent/top", {id:row.id}).then(function(){
                vm.loadList(i=>i)
            })
        }
    },{
        label: _label('xiangshang'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/sizecontent/up", {id:row.id}).then(function(){
                vm.loadList(i=>i)
            })
        }
    },{
        label: _label('xiangxia'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/sizecontent/down", {id:row.id}).then(function(){
                vm.loadList(i=>i)
            })
        }
    },{
        label: _label('dibu'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/sizecontent/bottom", {id:row.id}).then(function(){
                vm.loadList(i=>i)
            })
        }
    }],
    controller:"sizecontent",
    key_column:"content",
    base:{
        topid:""    
    },
    options: {
        action_width:450
    }
}

const options = {
    props:props,
    props2:props2,
    dialogVisible:false,
    title:""
}

export default {
    name: 'sp-sizetop',
    data() {
        var self = this;
        
        return options
    },
    methods:{
    }
}
</script>
