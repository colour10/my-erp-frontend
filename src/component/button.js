import { Button } from 'element-ui';
import { extendComponent } from './vue.js'

export default extendComponent(Button, {
    name:"as-button",
    methods:{
        paramsPipe({props}) {
            props.size = 'mini'
        }
    }
})