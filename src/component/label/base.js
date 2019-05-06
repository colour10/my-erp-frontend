export default {
    props: {
        column: Object,
        option:{
            type:Object
        },
        record:Object
    },
    methods:{
        getValue() {
            let self = this
            return self.record[self.column.name]
        }
    }
}
