import {httpPost} from "./http.js"

const loadSetting = async function() {
    try {
      let {data} = await httpPost("/common/setting",{});

      return data;
    }
    catch(e) {
      return {};
    }
}
export {loadSetting}
export default {loadSetting}