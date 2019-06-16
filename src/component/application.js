const {config, label} = (function() {
    let _func = function(app, isDefault=false) {
        return function(name, value) {
            if(typeof(value)=='undefined') {
                //console.log(name, app)
                return isDefault ? app[name] || name : app[name]
            }
            else {
                app[name] = value
                return this;
            }
        }
    }

    //配置信息文件
    const applicationConfig = {
        pagination:{
            pageSizes : [10, 20, 30, 50, 100],
            pageSize : 30
        },
        host: ""
    }
    let config = _func(applicationConfig)

    const languages = {}
    let label = _func(languages, true)

    return {config, label}
})()

export {
    label, config
}

export default {
    label,config
}