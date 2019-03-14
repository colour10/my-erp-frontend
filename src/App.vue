<template>
  <div id="app">
    <selectdialogsingle v-model="msg_single" :source="source"></selectdialogsingle>
    <selectdialog v-model="msg" :source="source"></selectdialog>
  </div>
</template>

<script>
    import Vue from 'vue';
    import simple from './component/Simple_Admin_Page.vue'
    import selectdialog from './component/Select_Dialog.vue'
    import selectdialogsingle from './component/Select_Dialog_Single.vue'
    import avatar from './component/Simple_Avatar.vue'
    
    Vue.use(selectdialog);
    Vue.use(avatar);
export default {
  name: 'asa-app',
  components: {
      selectdialogsingle,
      selectdialog
    },
  data () {
    return {
      msg_single: 'FW',
      msg: 'FW',
      source:'test.hashlist'
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
