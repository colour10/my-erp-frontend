<template>
    <el-tabs type="border-card" @tab-click="handleTabClick" v-model="currentTab" style="width: 1300px;">
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
            <color-group ref="colorGroup"></color-group>
        </el-tab-pane>
        <el-tab-pane :label="showLabel('shangpintupian')" name="album">
            <album ref="album"></album>
        </el-tab-pane>
        <el-tab-pane :label="showLabel('jiage')" name="pricetab">
        </el-tab-pane>
        <el-tab-pane :label="showLabel('kucun')" name="productstock">
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import globals, { showLabel } from '@/component/globals.js'
import info from './components/info.vue'
import property from './components/property.vue'
import barcode from './components/barcode.vue'
import colorGroup from './components/colorGroup.vue'
import album from './components/album.vue'

export default {
    components: { info, property, barcode, colorGroup, album },
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
                
                case 'colorgroup':
                    self.$refs.colorGroup.loadColorGroupList()
                    break

                case 'album':
                    self.$refs.album.loadList()
                    break

                default:
                    break
            }
        }
    },
    async mounted() {
        let res = await this._fetch("/product/title", {id: this.$route.params.id})
        this._setTitle(res.data);
    }
}
</script>