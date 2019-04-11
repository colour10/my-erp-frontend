<template>
    <div>
        <multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>
        <el-dialog :title="_label('zipinlei')" class="user-form" :visible.sync="dialogVisible" :center="true">
            <multiple-admin-page v-bind="props2" ref="page2"></multiple-admin-page>
        </el-dialog>

        <el-dialog :title="_label('pinleishuxing')" class="user-form" :visible.sync="dialogVisible2" :center="true">
            <multiple-admin-page v-bind="props3" ref="page3"></multiple-admin-page>
        </el-dialog>
    </div>
</template>

<script>
import globals from '../globals.js'
import Multiple_Admin_Page from '../Multiple_Admin_Page.vue'

const _log = globals.logger("asapage-brandgroup");
const _label = globals.getLabel

const props = {
    columns: [
        { name: "name", label: _label('pinleimingcheng'), is_multiple: true, is_focus: true }
    ],
    buttons: [{
        name: "code",
        label: _label('zipinlei'),
        width: 150,
        disable_change: true,
        handler: function(rowIndex, row) {
            //console.log(rowIndex, row)   
            props2.base.brandgroupid = row.id;
            options.dialogVisible = true;
            //options.title = row.brandgroupname
        }
    }],
    controller: "brandgroup",
    key_column: "name"
}

const props2 = {
    columns: [
        { name: "name", label: _label('zileimingcheng'), is_multiple: true, is_focus: true }
    ],
    buttons: [{
        name: "code",
        label: _label('pinleishuxing'),
        width: 150,
        disable_change: true,
        handler: function(rowIndex, row) {
            props3.base.brandgroupchildid = row.id;
            options.dialogVisible2 = true;
        }
    }],
    controller: "brandgroupchild",
    key_column: "name",
    base: {
        brandgroupid: ""
    }
}

const props3 = {
    columns: [
        { name: "name", label: _label('pinleishuxing'), is_multiple: true, is_focus: true }
    ],
    actions: [{
        label: _label('xiangshang'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/brandgroupchildproperty/up", {id:row.id}, function(){
                vm.loadList(i=>i)
            })
        },
        isShow:function(vm) {
            return vm.$store.getters.allow('brandgroup')
        }
    },{
        label: _label('xiangxia'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/brandgroupchildproperty/down", {id:row.id}, function(){
                vm.loadList(i=>i)
            })
        },
        isShow:function(vm) {
            return vm.$store.getters.allow('brandgroup')
        }
    }],
    controller: "brandgroupchildproperty",
    key_column: "name",
    base: {
        brandgroupchildid: ""
    },
    options: {
        action_width:300
    }
}

const options = {
    globals,
    props: props,
    props2: props2,
    props3: props3,
    dialogVisible: false,
    dialogVisible2: false
}

export default {
    name: 'asapage-brandgroup',
    components: {
        'multiple-admin-page': Multiple_Admin_Page
    },
    props: {},
    data() {
        var self = this;

        return options
    },
    methods: {}
}
</script>
