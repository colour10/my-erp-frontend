<template>
  <div>
    <div style="position: fixed;left: 0;top: 0;width: 100%;height: 100%;opacity: .5;background: #000;z-index: 5999;" v-show="visible" @click="hide">

    </div>
    <div :style="style" v-show="visible"><img :src="url" style="width:100%;height:100%" v-show="url.length>0"></div>
  </div>
</template>

<script>
export default {
    name: 'sp-image-preview',
    props: {
        top: {
            type: String,
            default: '15vh'
        }
    },

    data() {
        return {
            visible: false,
            url:"",
            width:'500px',
            height:'500px'
        };
    },

    computed: {
        style() {
            let style = {
                right:'0px',
                'max-width': this.width,
                'max-height': this.height,
                margin: 'auto',
                'z-index':6000,
                position:'absolute',
                top:'20%',
                left:'0px',
            };
            return style;
        }
    },

    methods: {
        hide() {
            this.visible = false
        },
        show({url,width,height}) {
          const self = this
          self.url = url;
          self.width = width || self.width
          self.height = height || self.height
          self.visible = true;
        }
    }
};
</script>
