import {extend} from '../util/object.js'
import {isArray, initObject} from '../util/array.js'

export default {
    methods: {
        _setting(name, value) {
            let self = this;
            if(isArray(name)) {
                extend(self.setting, initObject(name,value))
            }
            else if(typeof(name)=='object') {
                extend(self.setting, name)
            }
            else {
                self.setting[name] = value;
            }
            return self
        }
    }
}