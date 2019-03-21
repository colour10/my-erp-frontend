<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click="showFormToCreate()">{{labels.xinjian}}</el-button>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="24">
        <simple-admin-tablelist ref="tablelist" :controller="controller" :key_column="key_column" :columns="columns" :buttons="buttons" :options="options" :base="base" :onclickupdate="showFormToEdit"></simple-admin-tablelist>
      </el-col>
    </el-row>


    <el-dialog class="user-form" :title="formTitle" :visible.sync="dialogVisible" :center="true" :width="componenToptions.dialogWidth||'40%'" :modal="false">
      
      <el-row>
      <el-col :span="24">
        <el-form ref="form" :model="form" label-width="100px" :inline="componenToptions.inline||false" :size="componenToptions.formSize||'medium'">
        <el-form-item :label="item.label" v-if="!item.is_hidden" v-for="item in columns" :key="item.name" :class="item.class?item.class:''">
          <el-input :ref="item.name" @keyup.enter.native="onSubmit" :type="item.type?item.type:'text'" v-if="!item.type||item.type=='input'||item.type=='textarea'" v-model="form[item.name]"></el-input>
          <el-switch :ref="item.name" v-if="item.type=='switch'" v-model="form[item.name]" active-value="1" inactive-value="0"></el-switch>
          
          <simple-select :ref="item.name" v-if="item.type=='select'" v-model="form[item.name]" :source="item.source" :lang="lang"></simple-select>
          <el-date-picker :ref="item.name" v-if="item.type=='date'" v-model="form[item.name]" type="date" value-format="yyyy-MM-dd" placeholder=""></el-date-picker>
        </el-form-item>
      </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24" style="text-align:center;">
        <el-button type="primary" @click="onSubmit" style="margin:auto;">{{labels.baocun}}</el-button>
      </el-col>
    </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
    name: 'simple-admin-page',
    props: ['columns','buttons',"options","controller", "base"],
    components: {

    },
    data() {
        var form = {
            id:""
        }

        var options = this.options || {}
        var base = this.base || {}

        for(var i=0;i<this.columns.length;i++) {
            form[this.columns[i].name] = ""
        }

        return {
            dialogVisible:false,
            form: form,
            rowIndex:"",
            formTitle:"",
            lang:$ASAL.lang,
            componenToptions:options,
            labels:{
                xinjian:$ASAL.xinjian,
                bianji:$ASAL.bianji,
                shanchu:$ASAL.shanchu,
                baocun:$ASAL.baocun
            }
        }
    },
    methods: {
        onSubmit() {            
            var self = this;
            self.form.lang = self.lang;
            if(self.form.id=="") {
                self._submit("/"+self.controller+"/add", self.form, function(){
                    self.$refs.tablelist.appendRow($ASA.clone(self.form))
                    
                    if(self.auto_hide!==false) {
                        self.dialogVisible = false
                    }
                })
            }
            else {
                self._submit("/"+self.controller+"/edit", self.form, function(){
                    var row = self.$refs.tablelist.getRow(self.rowIndex)
                    $ASA.copyTo(self.form, row)
                    if(self.auto_hide!==false) {
                        self.dialogVisible = false
                    }
                })
            }
            
        },
        showFormToCreate() {
            var self = this;
            $ASA.empty(self.form)

            if(self.base) {
                Object.keys(self.base).forEach(function(key){
                    self.form[key] =  self.base[key]
                });
            }

            self.showDialog($ASAL.tianjiaxinxi);
        },
        showFormToEdit(rowIndex, row){
            var self = this
            self.rowIndex = rowIndex;
            $ASA.copyTo(row, this.form)
            
            self.showDialog($ASAL.xiugaixinxi);
        },
        showDialog(formTitle) {
            var self = this;
            this.formTitle = formTitle;
             self.dialogVisible = true;
             setTimeout(function(){
                //console.log(self.$refs)
                var columns = self.columns;
                for(var i=0;i<columns.length;i++){
                    var column = columns[i]
                    var ele = self.$refs[column.name][0];

                    if(column.is_focus && !ele.disabled) {
                        console.log(ele)
                        ele.focus();
                        break;
                    }
                }
             },50)
        }
    },
    watch:{
        base:{
            handler:function(newValue,oldValue){
                console.log("change",newValue,oldValue)
            },
            deep: true
        }
    },
    computed:{
    },
    mounted:function(){
    }
}
</script>
