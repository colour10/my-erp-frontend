
const $ = $ASA.$

const getLabel = function(name) {
    if (typeof($ASAL) != 'undefined' && $ASAL[name]) {
        return $ASAL[name]
    } else {
        return "";
    }
}

const extend = Object.assign;

const logger = function(name) {
    return function() {
        var arr = Array.prototype.slice.call(arguments)
        arr.unshift("old <" + name + ">")
        console.log.apply(console, arr);
    }
}

export {$,getLabel, logger,extend}
export default {$,getLabel, logger,extend}