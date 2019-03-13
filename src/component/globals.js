const  ASA = {}

ASA.caches = {}

ASA.get = function(url, callback) {
    if(ASA.caches[url]) {
        if(ASA.caches[url].loaded==false) {
            var tryNext;
            
            tryNext = getCallback(url, callback)
            setTimeout(tryNext,50)
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

function getCallback(url,callback) {
    return function() {
        console.log("===================", url)
        if(ASA.caches[url] && ASA.caches[url].loaded==true) {
            callback(ASA.caches[url].data)
        }
        else {
            setTimeout(this.callee, 50)    
        }      
    }   
}

export default ASA
