export default {
    name: 'sp-item-transform',
    render(createElement) {
        let self = this
        console.log(self.$props)
        return createElement(self.column.type, {
            props: {
                value: self.value
            },
            on: {
                input: function(event) {
                    console.log(event)
                    self.$emit('input', event.target.value)
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
