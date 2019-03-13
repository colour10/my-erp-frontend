<template>
  <div id="app">
    <avatar v-model="msg"></avatar>
  </div>
</template>

<script>
    import Vue from 'vue';
    import simple from './component/Simple_Admin_Page.vue'
    import selectdialog from './component/Select_Dialog.vue'
    import avatar from './component/Simple_Avatar.vue'
    
    Vue.use(selectdialog);
    Vue.use(avatar);
export default {
  name: 'asa-app',
  components: {
      avatar
    },
  data () {
    return {
      msg: '',
      data_source:{
        //hashtable:{"SS":"春夏","FW":"秋冬","XX":"经典"}
        //hashlist:{"SS":{tname:"春夏",tvalue:"SS"}, "FW":{tname:"秋冬",tvalue:"FW"}, "XX":{tname:"经典",tvalue:"XX"}},
        datalist:[{tname:"春夏",tvalue:"SS"}, {tname:"秋冬",tvalue:"FW"}, {tname:"经典",tvalue:"XX"}],
        oplabel:"tname",
        opvalue:"tvalue"
      }
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
