import { Checkbox } from 'element-ui';
import { extendComponent } from '../util/vue.js'

export default extendComponent(Checkbox, {
    name:"sp-checkbox",
    methods:{
        paramsPipe({props}) {
            props.trueLabel = '1'
            props.falseLabel = '0'
        }
    }
})