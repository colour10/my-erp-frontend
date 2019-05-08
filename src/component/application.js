const {config, label} = (function() {
    //配置信息文件
    const applicationConfig = {
        pagination:{
            pageSizes : [10, 20, 30, 50, 100],
            pageSize : 30
        },
        host: ""
    }

    let config = function(name, value) {
        if(typeof(value)=='undefined') {
            //console.log("applicatin config")
            return applicationConfig[name]
        }
        else {
            applicationConfig[name] = value
            return this;
        }
    }

    const languages = {

    }
    let label = function(name, value) {
        if (typeof(value) == 'undefined') {
            return languages[name] || name
        } else {
            languages[name] = value
            return this;
        }
    }

    return {config, label}
})()

export {
    label, config
}

export default {
    label,config
}