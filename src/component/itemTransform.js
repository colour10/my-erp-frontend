import {extend} from './object.js'

export default {
    name: 'sp-item-transform',
    render(createElement) {
        let self = this
        console.log(self.$props)
        let props = extend(self.column.props || {}, {
            value: self.value,
            column:self.column,
            record:self.record,
            option:self.option
        })
        return createElement(self.column.type, {
            props: props,
            on: {
                input: function(event) {
                    console.log(this,event)
                    self.$emit('input', event)
                }
            }
        })
    },
    props: {
        column: Object,
        option:{
            type:Object
        },
        record:Object,
        value:""
    }
}
