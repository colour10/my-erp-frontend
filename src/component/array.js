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

const removeFilter = function(array, callback) {
    for(let i=array.length-1; i>=0; i--) {
        let item = array[i];
        if(callback(item, i)) {
            console.log("del",  item, i)
            array.splice(i,1)
        }
    }
}

 export {
     initObject,
     group,
     removeFilter
 }

 export default {
     isArray,
     initObject,
     removeFilter
 }