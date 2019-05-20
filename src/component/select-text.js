import {extend} from "./object.js"
import DataSource from './DataSource.js'

export default {
    name: 'sp-select-text',
    props:{
        source:{},
        value:{}
    },
    data(){
        return {
            text : ""
        }
    },
    methods:{
        getText() {
            let self = this
            //self._log("hello")
            let dataSource = DataSource.getDataSource(self.source, self._label("lang"))
            dataSource.getRowLabels(self.value).then(text=>{
                //console.log(text,"==")
                self.text = text
            })
        }
    },
    render(h) {
        return h("span", this.text)
    },
    watch:{
        value:function(newvalue){
            this.getText()
        }
    },
    mounted:function(){
        this.getText()
    }
}
