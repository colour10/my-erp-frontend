<template>
  <div id="app">
    <!--<selectdialogsingle v-model="msg_single" :source="source"></selectdialogsingle>
    <selectdialog v-model="msg" :source="source"></selectdialog>
    <simpleselect v-model="msg_select" :source="source"></simpleselect>
    <selectcurrency v-model="msg" ></selectcurrency>-->
    
    <orderdialog v-model="msg" ></orderdialog>
  </div>
</template>

<script>
    import Vue from 'vue';
//    import simple from './component/Simple_Admin_Page.vue'
//    import selectdialog from './component/Select_Dialog.vue'
//    import selectdialogsingle from './component/Select_Dialog_Single.vue'
//    import avatar from './component/Simple_Avatar.vue'
//    import simpleselect from './component/Simple_Select.vue'
//    import selectcurrency from './component/Select_Currency.vue'
//    import spalbum from './component/Simple_Album.vue'
    import orderdialog from './component/asa/Asa_Order_Dialog.vue'
    
    Vue.use(orderdialog);
export default {
  name: 'asa-app',
  components: {
      orderdialog
    },
  data () {
    return {
      msg_single: 'FW',
      msg: '',
      msg_select:"XX",
      source:'test.hashlist'
    }
  }
}
</script>
