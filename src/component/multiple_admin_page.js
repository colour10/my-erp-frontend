import Simple_Admin_Page from './Simple_Admin_Page.vue'
import { extendComponent } from './vue.js'
import { extend } from './object.js'

export default extendComponent(Simple_Admin_Page, {
    name:"multiple-admin-page",
    methods:{
        paramsPipe({props}) {
            let self = this
        
            let languages = self._label("languages");
            let keys = Object.keys(languages)

            let mycolumns = []
            props.columns.forEach(column=>{
                if(column.is_multiple) {
                    keys.forEach(function(code) {
                        let language_column = extend({},column)
                        language_column.name = column.name + "_" + code
                        language_column.label = column.label+'('+languages[code].shortName+')';
                        mycolumns.push(language_column)
                    });
                }
                else {
                    mycolumns.push(column)
                }
            })

            props.columns = mycolumns;
        }
    }
})