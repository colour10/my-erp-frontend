<template>
  <multiple-admin-page v-bind="props"></multiple-admin-page>
</template>

<script>
import globals from '../globals.js'

export default {
    name: 'asa-aliases',
    props: {
        brandid:{
            type: [String,Number]
        }
    },
    data() {
        var self = this;
        return {
            props:{
                columns:[
                    {name:"name", label:globals.getLabel('biemingmingcheng'), is_multiple:true, is_focus:true},
                    {name:"code", label:globals.getLabel('biemingbianma')}
                ],
                controller:"aliases",
                key_column:"name",
                base:{
                    brandid:self.brandid    
                }
            }
        }
    },
    watch:{
        brandid(newValue) {
            this.props.base.brandid = newValue;   
        }    
    }
}
</script>
