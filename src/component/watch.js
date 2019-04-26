const watcher = function(target, property, callback){
    let handler
    let oldvalue = target[property];
    return {
        start:function(){
            handler = setInterval(function(){
                //console.log(Date.now())
                if(target[property]==oldvalue) {
                    return 
                }

                let temp = oldvalue
                oldvalue = target[property]
                callback(target[property], temp)
            },50)
        },
        stop:function(){
            clearInterval(handler)
        }
    }
}

export default watcher;