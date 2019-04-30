import {httpPost} from "./http.js"

const loadSetting = function(){
    return new Promise(resolve=>{
        httpPost("/common/setting",{}).then(response=>{
            resolve(response.data)
        })
    })
}
export {loadSetting}
export default {loadSetting}