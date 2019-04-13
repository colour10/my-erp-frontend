<template>
  <multiple-admin-page v-bind="props"></multiple-admin-page>
</template>

<script>
import {_label} from '../globals.js'

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
                    {name:"name", label:_label('biemingmingcheng'), is_multiple:true, is_focus:true},
                    {name:"code", label:_label('biemingbianma')}
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
