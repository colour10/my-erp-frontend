<template>
    <div>
        <multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>
        <el-dialog :title="_label('zipinlei')" class="user-form" :visible.sync="dialogVisible" :center="true" width="900px">
            <multiple-admin-page v-bind="props2" ref="page2"></multiple-admin-page>
        </el-dialog>
        <el-dialog :title="_label('pinleishuxing')" class="user-form" :visible.sync="dialogVisible2" :center="true">
            <multiple-admin-page v-bind="props3" ref="page3"></multiple-admin-page>
        </el-dialog>
        <el-dialog :title="_label('fuzhishuxing')" class="user-form" :visible.sync="dialogVisible3" :center="true" width="400px">
            <el-tree ref="tree" :props="treeprops" :load="loadNode" lazy show-checkbox node-key="key"></el-tree>
            <el-button type="primary" @click="onSubmit">{{_label("tijiao")}}</el-button>
        </el-dialog>
    </div>
</template>

<script>
import globals, { _label } from '../globals.js'

const props = {
    columns: [
        { name: "name", label: _label('pinleimingcheng'), is_multiple: true, is_focus: true },
        { name: "displayindex", label: _label('xuhao'), sortMethod:(a,b)=>a-b }
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
        { name: "name", label: _label('zileimingcheng'), is_multiple: true, is_focus: true },
        { name: "displayindex", label: _label('xuhao'), width:100, sortMethod:(a,b)=>a-b }
    ],
    buttons: [{
        name: "code",
        label: _label('pinleishuxing'),
        width: 100,
        disable_change: true,
        handler: function(rowIndex, row) {
            props3.base.brandgroupchildid = row.id;
            options.dialogVisible2 = true;
        }
    }],
    actions: [{
        name: "code",
        label: _label('fuzhidao'),
        width: 150,
        disable_change: true,
        handler: function(rowIndex, row) {
            options.dialogVisible3 = true;
            options.brandgroupchildid = row.id
        }
    }],
    controller: "brandgroupchild",
    key_column: "name",
    base: {
        brandgroupid: ""
    },
    options: {
        action_width: 250
    }
}

const props3 = {
    columns: [
        { name: "name", label: _label('pinleishuxing'), is_multiple: true, is_focus: true }
    ],
    actions: [{
        label: _label('dingbu'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/brandgroupchildproperty/top", { id: row.id }).then(function() {
                vm.loadList(i => i)
            })
        },
        isShow: function(vm) {
            return vm.$store.getters.allow('brandgroup')
        }
    }, {
        label: _label('xiangshang'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/brandgroupchildproperty/up", { id: row.id }).then(function() {
                vm.loadList(i => i)
            })
        },
        isShow: function(vm) {
            return vm.$store.getters.allow('brandgroup')
        }
    }, {
        label: _label('xiangxia'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/brandgroupchildproperty/down", { id: row.id }).then(function() {
                vm.loadList(i => i)
            })
        },
        isShow: function(vm) {
            return vm.$store.getters.allow('brandgroup')
        }
    }, {
        label: _label('dibu'),
        handler: function(rowIndex, row, vm) {
            vm._fetch("/brandgroupchildproperty/bottom", { id: row.id }).then(function() {
                vm.loadList(i => i)
            })
        },
        isShow: function(vm) {
            return vm.$store.getters.allow('brandgroup')
        }
    }],
    controller: "brandgroupchildproperty",
    key_column: "name",
    base: {
        brandgroupchildid: ""
    },
    options: {
        action_width: 450
    }
}

const options = {
    props: props,
    props2: props2,
    props3: props3,
    dialogVisible: false,
    dialogVisible2: false,
    dialogVisible3: false,
    treeprops: {
        label: 'name',
        children: 'zones'
    },
    brandgroupchildid:""
}

export default {
    name: 'asapage-brandgroup',
    components: {
    },
    props: {},
    data() {
        var self = this;

        return options
    },
    methods: {
        async loadNode(node, resolve) {
            let self = this
            self._log(node)
            if (node.level === 0) {
                let res = await self._fetch("/brandgroup/loadnode", {brandgroupid:0})
                return resolve(res.data);
            }
            else if(node.level===1) {
                let res = await self._fetch("/brandgroup/loadnode", {brandgroupid:node.data.id})
                return resolve(res.data);
            }
            else {
                return resolve([])
            }
        },
        async onSubmit() {
            let self = this
            let tree = self.$refs.tree

            let ids = tree.getCheckedNodes().filter(item=>item.isLeaf).map(item=>item.id)
            self._log(ids)

            let result = await self._submit("/brandgroup/copyproperty", {brandgroupchildid:self.brandgroupchildid, target:ids.join(',')})
            self.dialogVisible3 = false;
            tree.setCheckedNodes([])
        }
    }
}
</script>
