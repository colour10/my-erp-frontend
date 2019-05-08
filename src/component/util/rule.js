const Rules = {}
const trigger = {trigger:'blur'}

Rules.id = function(obj) {
    return Object.assign({pattern: /^[1-9]\d*$/}, obj)
}

Rules.english = function(min, max, obj) {
    return Object.assign({pattern: new RegExp("^[a-z]{"+min+","+max+"}$")}, trigger, obj)
}

Rules.number = function(min, max, obj) {
    return Object.assign({pattern: new RegExp("^[a-z]{"+min+","+max+"}$")}, trigger, obj)
}

Rules.required = function(obj) {
    return Object.assign({ required: true }, trigger, obj)
}

Rules.username = function(obj) {
    return Object.assign({pattern: new RegExp("^[a-z0-9]{3,50}$"),required: true}, trigger, obj)
}

export {Rules}
export default Rules