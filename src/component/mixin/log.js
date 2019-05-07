export default {
    methods: {
        _log() {
            let arr = Array.prototype.slice.call(arguments)
            arr.unshift("<" + this.$options.name + ">")
            console.log.apply(console, arr);
        }
    }
}