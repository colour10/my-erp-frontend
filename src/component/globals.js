const  ASA = {}

ASA.caches = {}

ASA.get = function(url, callback) {
    if(ASA.caches[url]) {
        if(ASA.caches[url].loaded==false) {
            setTimeout(function() {
                console.log("===================", url)
                if(ASA.caches[url] && ASA.caches[url].loaded==true) {
                    callback(ASA.caches[url].data)
                }
                else {
                    setTimeout(this.callee, 50)    
                }      
            },50)
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
    console.log(typeof($ASA))
    if(typeof($ASA)!='undefined' && $ASA[name]) {
        return $ASA[name]   
    }  
    else {
        return "";   
    } 
}


export default ASA
