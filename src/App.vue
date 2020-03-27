<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
    //    import simple from './component/Simple_Admin_Page.vue'
//    import selectdialog from './component/Select_Dialog.vue'
//    import selectdialogsingle from './component/Select_Dialog_Single.vue'
//    import avatar from './component/Simple_Avatar.vue'
//    import simpleselect from './component/Simple_Select.vue'
//    import selectcurrency from './component/Select_Currency.vue'
//    import spalbum from './component/Simple_Album.vue'
//    import orderdialog from './component/asa/Asa_Order_Dialog.vue'

export default {
  name: 'asa-app',
  components: {

    },
  data () {
    return {
      msg_single: 'FW',
      msg: '',
      msg_select:"XX",
      source:'test.hashlist',
      searchresult:[
        {x0:"S", x1:38, x2:80, x3:86, x4:88, x5:56, x6:15},
        {x0:"M", x1:39, x2:92, x3:88, x4:90, x5:57, x6:16},
        {x0:"L", x1:40, x2:104, x3:90, x4:92, x5:58, x6:17},
        {x0:"XL", x1:41, x2:110, x3:92, x4:94, x5:58, x6:17}
      ]
    }
  }
}
</script>
