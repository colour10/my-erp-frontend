import { Input } from 'element-ui';
import { extendComponent } from '../vue.js'

export default extendComponent(Input, {
    name:"sp-input",
    methods:{
        paramsPipe({props}) {
            props.size = 'mini'
        }
    },
    render(h) {
        let self = this;
        let {column, record, option} = self.$attrs

        //console.log(column,record, option, self)
        if(typeof(column)!='undefined' && typeof(record)!='undefined') {
            return h("span", record[column.name])
        }
        else {
            return self.doRender(h)
        }        
    }
})