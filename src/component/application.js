const label = function(name) {
    if (typeof($ASAL) != 'undefined' && $ASAL[name]) {
        return $ASAL[name]
    } else {
        return "";
    }
}

const config = (function() {
    const applicationConfig = {
        pagination:{
            pageSizes : [10, 20, 30, 50, 100],
            pageSize : 30
        },
        host: ""
    }


    return function(name, value) {

        if(typeof(value)=='undefined') {
            //console.log("applicatin config")
            return applicationConfig[name]
        }
        else {
            applicationConfig[name] = value
            return this;
        }
    }
})()

export {
    label, config
}

export default {
    label,config
}