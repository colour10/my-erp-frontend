import Base from "./base.js"
import {extend} from "../util/object.js"
import DataSource from '../util/DataSource.js'

export default extend({
    name: 'sp-select-text',
    data(){
        return {
            text : ""
        }
    },
    render(h) {
        let self = this
        //self._log("hello")
        let dataSource = DataSource.getDataSource(self.column.source)
        dataSource.getRowLabel(self.getValue()).then(text=>{
            self.text = text
        })

        return h("span", self.text)
    }
}, Base)
