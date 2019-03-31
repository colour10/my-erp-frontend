import globals from './globals.js'
import resources_options from './resources.js'

const _log = globals.logger("DataSource");
const resources = {};

function DataRow(row, dataSource) {
    var self = this;
    self.row = row
    self.dataSource = dataSource;
}

DataRow.prototype.getKeyValue = function() {
    var keyName = this.dataSource.getValueName();
    //_log(this.row, keyName,"getKeyValue")
    return this.row[keyName]
}

DataRow.prototype.getLabelValue = function() {
    var self = this;
    var keyName = self.dataSource.getLabelName();
    var lang = self.dataSource.getLang();
    //_log(self.row, keyName,"keyName")
    return self.row[keyName] || self.row[keyName+"_"+lang]
}

DataRow.prototype.getLabel = DataRow.prototype.getLabelValue
DataRow.prototype.getValue = DataRow.prototype.getKeyValue
DataRow.prototype.getRow = function(key) {
    return key ? this.row[key] : this.row;
}

DataRow.prototype.getObject = function() {
    return {id:this.getValue(), name:this.getLabel()}
}


function DataSource(options, lang) {
    var self = this;
    self.lang = lang;
    self.data = [];
    self.hashtable = {};
    self.options = options;
    self.oplabel = options.oplabel || 'name'
    self.opvalue = options.opvalue || 'value'
    self.is_loaded = false;
            
    //_log(data_source.hashtable, data_source.datalist, data_source.url)    
}

DataSource.prototype.init = function() {
    var self = this;
    var options = self.options;


    if(options.url) {
        self.loadList()
    }
    else if(options.hashlist) {
        //_log(options.hashlist)
        Object.keys(options.hashlist).forEach(function(key){
            var row = new DataRow(options.hashlist[key], self)
            self.data.push(row)
            self.hashtable[key] = row;
        });
        self.is_loaded = true;
    }
    else if(options.hashtable) {
        Object.keys(options.hashtable).forEach(function(key){
            var row = new DataRow({name:options.hashtable[key],value:key}, self);
            self.data.push(row)
            self.hashtable[key] = row;
        });
        self.oplabel = "name"
        self.opvalue = "value"
        self.is_loaded = true;
    }
    else if(options.datalist) {
        //_log(options.datalist.forEach,"options")
        options.datalist.forEach(function(item){
            var row = new DataRow(item, self)
            
            self.hashtable[item[self.opvalue]] = row;    
            self.data.push(row)
        })
        self.is_loaded = true;
    }
}

/**
 * [loadList description]
 * @return {[type]} [description]
 */
DataSource.prototype.loadList = function() {
    var self = this;
    var options = self.options;
    var params = options.params || {}
    globals.get(options.url, function(res){
        res.data.forEach(function(item){
            var row = new DataRow(item, self)
            self.hashtable[item[self.opvalue]] = row; 
            self.data.push(row)   
        })
        self.is_loaded = true;
    },'json');
}

DataSource.prototype.getData = function(callback) {
    var self = this;
    var func = function f(){
        if(self.is_loaded) {
            callback(self.data)
        }
        else {    
            setTimeout(f, 50)
        }
    }

    func();
}

DataSource.prototype.filter = function(condition, callback) {
    var self = this;
    self.getData(data=>{       
        var keys = Object.keys(condition)
        
        var result = data.filter(row=>{
            //_log("DataSource.filter", row, keys.every(key=>condition[key]==row.getRow(key)))
            return keys.every(key=>condition[key]==row.getRow(key))    
        })
        callback(result)
    })
}

DataSource.prototype.sub = function(condition, callback) {
    var self = this;
    self.getData(data=>{
        var keys = Object.keys(condition)
        
        var result = data.filter(row=>{
            //_log("DataSource.filter", row, keys.every(key=>condition[key]==row.getRow(key)))
            return keys.every(key=>condition[key]==row.getRow(key))    
        })

        var result = result.map(item=>item.getRow())
        //_log(result,"999")
        var sub = new DataSource({datalist:result, oplabel:self.oplabel, opvalue:self.opvalue},self.lang)
        sub.init()
        callback(sub)
    })
}

DataSource.prototype.getLabelName = function(name) {
    return this.oplabel
}

DataSource.prototype.getValueName = function(name) {
    return this.opvalue
}

DataSource.prototype.setLang = function(lang) {
    this.lang = lang
}

DataSource.prototype.getLang = function() {
    return this.lang
}

DataSource.prototype.setLabelName = function(name) {
    this.oplabel = name
}

DataSource.prototype.getLabelList = function(valueList, callback) {
    this.getData( data => {
        //_log(valueList, data, '+++++++')    
        
        var fmap = R.map(function(value){
            var equals = item=>value==item.getValue()
            return R.find(equals)(data)        
        })(valueList)


        //过滤掉空值
        fmap = R.filter(R.identity)(fmap)
        
        callback(R.map(R.invoker(0,"getLabel"))(fmap))
    })
}

/*
DataSource.prototype.setValueName = function(name) {
    self.opvalue = name
}*/

DataSource.prototype.getRow = function(keyValue, callback) {
    var self = this;
    var func = function f(){
        if(self.is_loaded) {
            callback(self.hashtable[keyValue])
        }
        else {    
            setTimeout(f, 50)
        }
    }

    func();
}

DataSource.prototype.getRowLabel = function(keyValue, callback) {
    var self = this;
    self.getRow(keyValue,function(row){
        if(row) {
            callback(row.getLabelValue())
        }
        else {
            callback("");   
        }    
    });
}

DataSource.prototype.getRowLabels = function(keyValues, callback) {
    var self = this;
    keyValues = typeof(keyValues)=='string' ? keyValues.split(",") : keyValues;

    this.getLabelList(keyValues, function(list){
        callback(list.join(","))
    })
    
/*    var all_promise = keyValues.map(function(item){
        return new Promise(function(resolve, reject){
            self.getRow(item,function(row){
                if(row) {
                    resolve(row.getLabelValue())
                }
                else {
                    resolve("");
                }    
            });
        });
    })
    
    Promise.all(all_promise).then(function(results) {
        self.loading = false;
        callback(results.join(","))
    });*/    
}

DataSource.getDataSource = function(resourceName, lang) {
    if(resourceName.constructor==DataSource) {
        return resourceName;
    }

    if(resources[resourceName]) {
        resources[resourceName].setLang(lang)
        return resources[resourceName]   
    }
    else {
        var create = function() {
            
            if(!resources_options[resourceName]) {
                //_log(resourceName,"未定义")
                throw "资源未定义:"+resourceName
            }
            resources[resourceName] = new DataSource(resources_options[resourceName], lang)
            resources[resourceName].init()
            return resources[resourceName]
        }

        var tmp_create = function() {
            return new DataSource(resources_options[resourceName], lang)
        }
        
        return typeof(resourceName)=="string" ? create(): tmp_create();
        /*resources[resourceName] = new DataSource(resources_options[resourceName], lang)
        return resources[resourceName]   */  
    }
}

export default DataSource
