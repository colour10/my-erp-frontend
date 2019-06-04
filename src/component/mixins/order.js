import { round } from "../math.js"

export default {
    methods:{
        formatNumber:function(number){
            return round(number, 3)
        }
    }
}