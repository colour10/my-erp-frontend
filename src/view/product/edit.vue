<template>
    <el-tabs type="border-card" @tab-click="handleTabClick" v-model="currentTab">
        <el-tab-pane :label="showLabel('jibenziliao')" name="info">
            <info></info>
        </el-tab-pane>
        <el-tab-pane :label="showLabel('shangpinchicun')" name="property" >
            <property ref="property"></property>
        </el-tab-pane>
        <el-tab-pane :label="showLabel('shangpintiaoma')" name="code">
            <barcode ref="barcode"></barcode>
        </el-tab-pane>
        <el-tab-pane :label="showLabel('tongkuanduose')" name="colorgroup">
        </el-tab-pane>
        <el-tab-pane :label="showLabel('shangpintupian')" name="album">
        </el-tab-pane>
        <el-tab-pane :label="showLabel('jiage')" name="pricetab">
        </el-tab-pane>
        <el-tab-pane :label="showLabel('kucun')" name="productstock">
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import globals, { showLabel } from '../../component/globals.js'
import info from './components/info.vue'
import property from './components/property.vue'
import barcode from './components/barcode.vue'

export default {
    components: { info, property, barcode },
    data() {
        return {
            currentTab: 'info'
        }
    },
    methods: {
        handleTabClick(tab) {
            let self = this

            switch (tab.name) {
                case 'property':
                    self.$refs.property.getProductSizeContents()
                    break
            
                case 'code':
                    self.$refs.barcode.getProductSizeContents()
                    break

                default:
                    break
            }
        }
    }
}
</script>