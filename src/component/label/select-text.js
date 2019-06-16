import Base from "./base.js"
import {extend} from "../util/object.js"
import DataSource from '../util/DataSource.js'

export default extend({
    name: 'txt-select-text',
    data(){
        return {
            text : ""
        }
    },
    render(h) {
        let self = this
        //self._log("hello")
        let dataSource = DataSource.getDataSource(self.column.source)
        dataSource.getLabel(self.getValue()).then(text=>{
            //console.log(text,"==")
            self.text = text
        })

        return h("span", self.text)
    }
}, Base)
