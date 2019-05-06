import Base from "./base.js"
import {extend} from "../object.js"

export default extend({
    name: 'sp-text',
    render(h) {
        let self = this
        self._log("hello")
        let text = typeof(self.column.convert)=='function' ? self.column.convert(self.column, self.record) : self.getValue() 
        return h("span", text)
    }
}, Base)
