<template>
    <div style="width:99%">
        <multiple-admin-page v-bind="props" ref="page" class="product"></multiple-admin-page>
        <asa-brandtab :visible.sync="base.visible" :brandid="base.brandid" :title="title"></asa-brandtab>
    </div>
</template>

<script>
import {_label,getAvailableHeight} from '../globals.js'
import Multiple_Admin_Page from '../Multiple_Admin_Page.vue'
import Asa_BrandTab from '../asa/Asa_BrandTab.vue'


const base = {
    brandid: "",
    visible: false
}

export default {
    name: 'asapage-brand',
    components: {
        'multiple-admin-page': Multiple_Admin_Page,
        'asa-brandtab': Asa_BrandTab
    },
    data() {
        let self = this;

        return {
            props: {
                columns: [
                    { name: "filename", label: "LOGO", is_edit_hide: true, is_image: true, image_width: 50, image_height: 50, width: 55, className:"picture"},
                    { name: "name", label: _label('pinpaimingcheng'), is_multiple: true, is_focus: true },
                    { name: "countryid", label: _label('guishuguojia'), type: "select", source: "country" },
                    //{ name: "brandgroupid", label: _label('pinpaifenlei'), type: "select", source: "brandgroup" },
                    { name: "memo", label: _label('memo'), type: "textarea", is_hide: true },
                    { name: "officialwebsite", label: _label('guanwangdizhi'), is_hide: true }
                ],
                buttons: [{
                    name: "code",
                    label: _label('guanlianxinxi'),
                    width: 200,
                    handler: function(rowIndex, row) {
                        self.title = row['name_'+_label('lang')]
                        base.brandid = row.id;
                        base.visible = true;
                    }
                }],
                options: {
                    tableHeight:getAvailableHeight(),
                    dialogWidth: '30%',
                    formSize: 'small',
                    inline: false
                },
                controller: "brand",
                key_column: "name"

            },
            base,
            title:""
        }
    },
    methods: {},
    mounted: function() {}
}
</script>
