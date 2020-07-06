<template>
  <div>

    <multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>

    <!-- 点击子品类对话框 start -->
    <el-dialog :title="dialogTitle" class="user-form" :visible.sync="dialogVisible" :center="true" width="1000px">
      <multiple-admin-page v-bind="props2" ref="page2">
        <!-- 示意图 start -->
        <template v-slot:diagram="{row}">
          <el-button size="mini" @click="showDiagram(row)">{{_label('shiyitu')}}</el-button>
        </template>
        <!-- 示意图 end -->
      </multiple-admin-page>
    </el-dialog>
    <!-- 点击子品类对话框 end -->

    <!-- 点击子品类->品类属性对话框 start -->
    <el-dialog :title="dialogTitle2" class="user-form" :visible.sync="dialogVisible2" :center="true">
      <multiple-admin-page v-bind="props3" ref="page3"></multiple-admin-page>
    </el-dialog>
    <!-- 点击子品类->品类属性对话框 end -->

    <!-- 复制属性对话框 start -->
    <el-dialog :title="_label('fuzhishuxing')" class="user-form" :visible.sync="dialogVisible3" :center="true"
               width="400px">
      <el-tree ref="tree" :props="treeprops" :load="loadNode" lazy show-checkbox node-key="key"></el-tree>
      <el-button type="primary" @click="onSubmit">{{_label("tijiao")}}</el-button>
    </el-dialog>
    <!-- 复制属性对话框 end -->
  </div>
</template>

<script>
    import {_label} from '../globals.js'
    import ImagePreview from '../image-preview.js'

    export default {
        name: 'sp-brandgroup',
        data() {
            var self = this;

            return {
                // 1、数据表格的表头
                props: {
                    columns: [
                        {name: "name", label: _label('pinleimingcheng'), is_multiple: true, is_focus: true},
                        {name: "displayindex", label: _label('xuhao'), sortMethod: (a, b) => a - b}
                    ],
                    buttons: [{
                        name: "code",
                        label: _label('zipinlei'),
                        width: 150,
                        disable_change: true,
                        handler: function (rowIndex, row) {
                            //console.log(rowIndex, row)
                            self.props2.base.brandgroupid = row.id;
                            self.dialogVisible = true;
                            self.dialogTitle = row.name_cn;
                        }
                    }],
                    controller: "brandgroup",
                    key_column: "name"
                },
                // 2、点击子品类对话框
                props2: {
                    columns: [
                        {name: "name", label: _label('zileimingcheng'), is_multiple: true, is_focus: true},
                        {name: 'diagram', label: _label('shiyitu'), type: 'avatar', width: 100, sortable: false},
                        {name: "displayindex", label: _label('xuhao'), width: 100, sortMethod: (a, b) => a - b}
                    ],
                    buttons: [{
                        name: "code",
                        label: _label('pinleishuxing'),
                        width: 100,
                        disable_change: true,
                        handler: function (rowIndex, row) {
                            self.props3.base.brandgroupchildid = row.id;
                            self.dialogVisible2 = true;
                            self.dialogTitle2 = row.name_cn
                        }
                    }],
                    actions: [{
                        name: "code",
                        label: _label('fuzhidao'),
                        width: 150,
                        disable_change: true,
                        enable: self._isAllowed('brandgroupchild'),
                        handler: function ({row}) {
                            self.dialogVisible3 = true;
                            self.brandgroupchildid = row.id
                        }
                    }],
                    controller: "brandgroupchild",
                    key_column: "name",
                    base: {
                        brandgroupid: ""
                    },
                    options: {
                        action_width: 250
                    },
                    formTitle: function (row) {
                        if (row && row.id > 0) {
                            return row.name_en
                        }
                    }
                },
                // 3、点击子品类->品类属性对话框
                props3: {
                    columns: [
                        {name: "propertyid", label: _label('pinleishuxing'), type: "select", source: "property"},
                        {name: "displayindex", label: _label('paixu'), width: 100}
                    ],
                    controller: "brandgroupchildproperty",
                    base: {
                        brandgroupchildid: ""
                    },
                    options: {
                        action_width: 300,
                        isAutoReload: true,
                        isAutohide: true
                    }
                },
                dialogVisible: false,
                dialogVisible2: false,
                dialogVisible3: false,
                dialogTitle: "",
                dialogTitle2: "",
                treeprops: {
                    label: 'name',
                    children: 'zones'
                },
                brandgroupchildid: ""
            }
        },
        // 方法列表
        methods: {
            // 打开缩略图
            showDiagram(row) {
                const self = this
                console.log(row)
                ImagePreview.show({url: self._fileLink(row.diagram)})
            },
            // 复制属性
            async loadNode(node, resolve) {
                let self = this
                self._log(node)
                if (node.level === 0) {
                    let res = await self._fetch("/brandgroup/loadnode", {brandgroupid: 0})
                    return resolve(res.data);
                } else if (node.level === 1) {
                    let res = await self._fetch("/brandgroup/loadnode", {brandgroupid: node.data.id})
                    return resolve(res.data);
                } else {
                    return resolve([])
                }
            },
            // 提交
            async onSubmit() {
                let self = this
                let tree = self.$refs.tree

                let ids = tree.getCheckedNodes().filter(item => item.isLeaf).map(item => item.id)
                self._log(ids)

                let result = await self._submit("/brandgroup/copyproperty", {
                    brandgroupchildid: self.brandgroupchildid,
                    target: ids.join(',')
                })
                self.dialogVisible3 = false;
                tree.setCheckedNodes([])
            }
        }
    }
</script>
