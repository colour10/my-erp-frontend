export default function(context) {
    return {
        set(key, value, expire=1000) {
            context[key] = value

            setTimeout(function(){
                delete context[key]
                //console.log("删除缓存")
            }, expire)
        },
        get(key) {
            return context[key]
        }
    }
}