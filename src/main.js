import Vue from 'vue';
import $ from 'jquery';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    
Vue.use(ElementUI);
 
import simple2 from './component/Simple_Admin_Page.vue'

console.log($)
var data = [{
            id:4,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }] 

new Vue({
    el: '#app',
    render: h => h(simple2,{
        props:{
            data: data,
            columns:[
                {name:"name", label:"姓名", is_create:false, is_update:true, is_show:true, width:400},
                {name:"address", label:"地址", is_create:true, is_update:false, is_show:true, width:400},
                {name:"date", label:"生日", is_create:true, is_update:true, is_show:true}
            ],
            buttons:{
                "create":{
                    label:"创建"    
                },
                "save":{
                    label:"保存"    
                },
                "remove":{
                    label:"删除"    
                },
                "edit":{
                    label:"编辑"    
                } 
            },
            labels:{
                formTitleCreate:"添加信息",
                formTitleSave:"编辑信息",
                action:"操作"    
            },
            interfaces:{
                save:"",
                update:"",
                remove:""    
            },
            'controller':'country'
        }
    })
})

