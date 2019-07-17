import _ from 'lodash'

let statHelper = function(initCell){
    let result = {};

    return {
        get(key) {
            if(!result[key]) {
                result[key] = _.cloneDeep(initCell);
            }

            return result[key];
        },
        result() {
            return result;
        },
    }
}
export { statHelper }

export default {
    statHelper
}