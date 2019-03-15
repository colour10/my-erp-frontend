const  ASA = {}

ASA.caches = {}

ASA.get = function(url, callback) {
    if(ASA.caches[url]) {
        if(ASA.caches[url].loaded==false) {
            var func = (function f() {
                console.log("===================", url)
                if(ASA.caches[url] && ASA.caches[url].loaded==true) {
                    callback(ASA.caches[url].data)
                }
                else {
                    setTimeout(f, 50)    
                }      
            })
            
            func();
        }
        else {
            callback(ASA.caches[url].data) 
        }           
    }
    else {
        ASA.caches[url] = {
            loaded:false    
        }
        
        $ASA.get(url, function(res){
            ASA.caches[url].loaded = true;
            ASA.caches[url].data = res;
            callback(res)
        },"json")
    }
};

ASA.getLabel = function(name) {
    //console.log(typeof($ASAL), "$ASA")
    if(typeof($ASAL)!='undefined' && $ASAL[name]) {
        //console.log(typeof($ASA), "$ASAL", $ASAL[name])
        return $ASAL[name]   
    }  
    else {
        return "";   
    } 
}

ASA.extend = function(obj1, obj2) {
    Object.keys(obj2).forEach(function(key){
        obj1[key] = obj2[key];
    });
    return obj1;
}

export default ASA
