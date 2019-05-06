export default {
    name: 'sp-item-transform',
    render(createElement) {
        let self = this
        console.log(self.$props)
        return createElement(self.column.type, {
            props: {
                value: self.value,
                column:self.column,
                record:self.record,
                option:self.option
            },
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
