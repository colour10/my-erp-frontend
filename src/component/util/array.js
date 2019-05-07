 const isArray = Array.isArray
 export {
     isArray
 }

 const initObject = function(keys, defaultValue) {
     let obj = {}
     keys.forEach(key => obj[key] = defaultValue)
     return obj;
 }
 export {
     initObject
 }

 export default {
     isArray,
     initObject
 }