import Base from "./base.js"
import {extend} from "../util/object.js"

export default extend({
    name: 'txt-text',
    render(h) {
        let self = this
        let text = typeof(self.column.convert)=='function' ? self.column.convert(self.column, self.record) : self.getValue() 
        return h("span", text)
    }
}, Base)
