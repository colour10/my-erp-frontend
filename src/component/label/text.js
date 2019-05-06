import Base from "./base.js"
import {extend} from "../object.js"

export default extend({
    name: 'sp-text',
    render(h) {
        let self = this
        self._log("hello")
        return h("span", self.getValue())
    }
}, Base)
