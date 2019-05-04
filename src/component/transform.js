export default {
    name: 'transform',
    render(h) {
        let self = this
        return h(column.type, {
            domProps:self.props
        })
    },
    props: {
        column: Object,
        option:{
            type:Object
        },
        record:Object
    }
}
