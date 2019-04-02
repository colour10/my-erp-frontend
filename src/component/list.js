const List = function(array){
    this.getList = function() {
        return array;
    }
}

List.prototype.findIndex = function(name, value) {
   return this.getList().findIndex(function(element){
        if(typeof(name)=="string") {
            return element[name]==value
        }
        else {
            for(let i=0;i<name.length;i++) {
                if(element[name[i][0]]!=name[1]) {
                    return false
                }
            }
            return true;
        }
    })
}

export {List}
export default List