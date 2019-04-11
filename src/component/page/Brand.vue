<template>
    <div style="width:100%">
        <multiple-admin-page v-bind="props" ref="page"></multiple-admin-page>
        <asa-brandtab :visible.sync="base.visible" :brandid="base.brandid"></asa-brandtab>
    </div>
</template>

<script>
import globals from '../globals.js'
import Multiple_Admin_Page from '../Multiple_Admin_Page.vue'
import Asa_BrandTab from '../asa/Asa_BrandTab.vue'


const _log = globals.logger("asapage-brand");
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
        return {
            props: {
                columns: [
                    { name: "id", label: "LOGO", is_edit_hide: true, is_image: true },
                    { name: "name", label: globals.getLabel('pinpaimingcheng'), is_multiple: true, is_focus: true },
                    { name: "countryid", label: globals.getLabel('guishuguojia'), type: "select", source: "country" },
                    //{ name: "brandgroupid", label: globals.getLabel('pinpaifenlei'), type: "select", source: "brandgroup" },
                    { name: "memo", label: globals.getLabel('memo'), type: "textarea", is_hide: true },
                    { name: "officialwebsite", label: globals.getLabel('guanwangdizhi'), is_hide: true }
                ],
                buttons: [{
                    name: "code",
                    label: globals.getLabel('guanlianxinxi'),
                    width: 200,
                    handler: function(rowIndex, row) {
                        base.brandid = row.id;
                        base.visible = true;
                    }
                }],
                options: {
                    dialogWidth: '30%',
                    formSize: 'small',
                    inline: false
                },
                controller: "brand",
                key_column: "name"

            },
            globals,
            base
        }
    },
    methods: {},
    mounted: function() {}
}
</script>
