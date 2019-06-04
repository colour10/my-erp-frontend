import API from "../api.js"

export default {
    data:function(){
        return {
            suggest:{}
        }
    },
    methods:{
        getBrandColorSuggest(){
            let self = this;
            API.getBrandColorSuggest(self.form.brandid).then(list=>{
                self._log(list)

                self.suggest = {}
                list.forEach(item=>{
                    self.suggest[item.wordcode_3] = item
                })
            })
        },
        autoMatchSuggest(row) {
            let suggest = this.suggest
            if(row.wordcode_3) {
                let info = suggest[row.wordcode_3]
                if(info) {
                    row.colorname = info.colorname
                    row.brandcolor = info.brandcolor
                }
            }
        }
    }
}