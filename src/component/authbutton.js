import { Button } from 'element-ui';
import { extendComponent } from './vue.js'

export default extendComponent(Button, {
    name:"au-button",
    methods:{
        paramsPipe({props}) {
            props.size = 'mini'
        }
    },
    render(h) {
        /*let self = this;
        let auth = self.$attrs['auth']
        if (auth && self.$store.getters.allow(self.auth)) {
            return self.doRender(h)
        }*/
        return h("span", "Test")
    }
})