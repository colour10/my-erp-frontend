<template>
  <div id="app">
    <!--<selectdialogsingle v-model="msg_single" :source="source"></selectdialogsingle>
    <selectdialog v-model="msg" :source="source"></selectdialog>
    <simpleselect v-model="msg_select" :source="source"></simpleselect>
    <selectcurrency v-model="msg" ></selectcurrency>-->
    
    <spalbum v-model="msg" ></spalbum>
  </div>
</template>

<script>
    import Vue from 'vue';
    import simple from './component/Simple_Admin_Page.vue'
    import selectdialog from './component/Select_Dialog.vue'
    import selectdialogsingle from './component/Select_Dialog_Single.vue'
    import avatar from './component/Simple_Avatar.vue'
    import simpleselect from './component/Simple_Select.vue'
    import selectcurrency from './component/Select_Currency.vue'
    import spalbum from './component/Simple_Album.vue'
    
    Vue.use(selectdialog);
    Vue.use(avatar);
export default {
  name: 'asa-app',
  components: {
      selectdialogsingle,
      selectdialog,
      simpleselect,
      selectcurrency,
      spalbum
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
