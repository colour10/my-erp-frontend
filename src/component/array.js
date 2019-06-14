 const isArray = Array.isArray
 export {
     isArray
 }

 const initObject = function(keys, defaultValue) {
     let obj = {}
     keys.forEach(key => obj[key] = defaultValue)
     return obj;
 }


const group = function() {
    let result = {}
    let helper = {}

    return {
        push(key, value) {
            if(helper[key+'||'+value]) {
                return ;
            }
            
            result[key] = result[key]? result[key] + ','+ value :value 
            helper[key+'||'+value] = 1
        },
        getResult() {
            return result;
        }
    }
}

 export {
     initObject,
     group
 }

 export default {
     isArray,
     initObject
 }