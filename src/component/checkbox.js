import { Checkbox } from 'element-ui';
import { extendComponent } from './vue.js'

export default extendComponent(Checkbox, {
    name:"sp-checkbox",
    methods:{
        paramsPipe({props}) {
            props.trueLabel = '1'
            props.falseLabel = '0'
        }
    }
})