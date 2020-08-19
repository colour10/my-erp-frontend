<template>
  <el-select v-model="currentValue" :placeholder="placeholder" style="width:150" @change="handleChange" filterable
             :disabled="disabled" :clearable="clearable" size="mini">
    <el-option-group v-for="(item,key) in data" :key="item.id" :label="item.name">
      <el-option v-for="row in item.children" :key="row.id" :label="row.name" :value="row.id"></el-option>
    </el-option-group>
  </el-select>
</template>

<script>
    import DataSource from '../DataSource.js'
    import {_label} from '../globals.js'

    export default {
        name: 'brandgroupchild',
        props: {
            select_value: {
                required: true,
                default: ''
            },
            disabled: {
                type: Boolean,
                default: false
            },
            lang: {
                type: String,
                default: _label("lang")
            },
            clearable: {
                type: [Boolean],
                required: false,
                default: false
            },
            placeholder: {
                type: String,
                default: _label('qingxuanze')
            }
        },
        model: {
            prop: 'select_value',
            event: 'change'
        },
        data() {
            var self = this
            var value = self.select_value
            if (value == '0') {
                value = ''
            }
            return {
                currentValue: value,
                data: []
            }
        },
        methods: {
            handleChange(newValue) {
                var self = this

                self.$emit('change', newValue)
            },
            clear() {
                this.$emit("change", "")
                this.data = []
            }
        },
        watch: {
            select_value(newValue) {
                if (newValue == '0') {
                    newValue = ''
                }
                this.currentValue = newValue
            }
        },
        mounted: function () {
            let self = this;

            let brandgroup = DataSource.getDataSource('brandgroup', self.lang);
            brandgroup.getData(data => {
                self._log("mounted", data)

                let result = [];
                data.forEach(item => {
                    item.children = []
                    result.push(item)
                })
                let child = DataSource.getDataSource('brandgroupchild', self.lang).getData(childdata => {
                    childdata.forEach(item => {
                        let parent = result.find(row => row.id == item.row.brandgroupid)
                        if (parent) {
                            parent.children.push(item)
                        }
                    })

                    self.data = result
                })
            })
        }
    }
</script>
