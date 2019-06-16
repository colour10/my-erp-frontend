import Base from "./base.js"
import {extend} from "../util/object.js"

export default extend({
    name: 'txt-datetime',
    render(h) {
        let self = this
        let date = new Date();
        date.setTime(self.getValue()*1000)
        return h("span", dateFns.format(date, 'YYYY-MM-DD HH:mm:ss'))
    }
}, Base)
