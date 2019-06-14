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
            text : "="
        }
    },
    methods:{
        getText() {
            let self = this
            //self._log("hello")
            let value = self.value
            self._dataSource(self.source).getRowLabels(self.value).then(text=>{
                //console.log(text, self.value, "==", self.source, value)
                if(value===self.value) {
                    self.text = text
                }                
            })
        }
    },
    render(h) {
        return h("span", this.text)
    },
    watch:{
        value:function(newvalue){
            //console.log("value changed:", this.source, newvalue)
            this.getText()
        }
    },
    mounted:function(){
        this.getText()
    }
}
