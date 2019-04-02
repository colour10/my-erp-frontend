const Rules = {}

Rules.id = function(obj) {
    return Object.assign({pattern: /^[1-9]\d*$/}, obj)
}

Rules.english = function(min, max, obj) {
    return Object.assign({pattern: new RegExp("^[a-z]{"+min+","+max+"}$")}, obj)
}

Rules.number = function(min, max, obj) {
    return Object.assign({pattern: new RegExp("^[a-z]{"+min+","+max+"}$")}, obj)
}

Rules.required = function(obj) {
    return Object.assign({ required: true }, obj)
}

export {Rules}
export default Rules