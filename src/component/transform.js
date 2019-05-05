export default {
    name: 'sp-transform',
    render(h) {
        let self = this
        console.log(self.$props)
        return h(self.column.type, {
            attrs:self.$props
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
