export default {
  inject:['bus'],
  data() {
    return {
      mypath: ''
    };
  },
  created() {
    const self = this;
    self.bus.$on('close', (path) => {
      if(path===self.mypath) {
        self.$destroy();
      }
    });
  },
  beforeDestroy() {
    this.bus.$off('close');
  },
  mounted() {
    this.mypath = this.$route.path;
  },
};
