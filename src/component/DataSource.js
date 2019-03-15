import globals from './globals.js'
import resources_options from './resources.js'

const resources = {};

function DataRow(row, dataSource) {
    var self = this;
    self.row = row
    self.dataSource = dataSource;
}

DataRow.prototype.getKeyValue = function() {
    var keyName = this.dataSource.getValueName();
    //console.log(this.row, keyName,"getKeyValue")
    return this.row[keyName]
}

DataRow.prototype.getLabelValue = function() {
    var self = this;
    var keyName = self.dataSource.getLabelName();
    var lang = self.dataSource.getLang();
    //console.log(self.row, keyName,"keyName")
    return self.row[keyName] || self.row[keyName+"_"+lang]
}
DataRow.prototype.getRow = function() {
    return this.row;
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
            
    //console.log(data_source.hashtable, data_source.datalist, data_source.url)
    if(options.url) {
        self.loadList()
    }
    else if(options.hashlist) {
        //console.log(options.hashlist)
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
        self.datalist.forEach(function(item){
            var row = new DataRow(item[self.opvalue], self)
            
            self.hashtable[item[self.opvalue]] = row;    
            self.data.push(row)
        })
        self.is_loaded = true;
    }
}

DataSource.prototype.loadList = function() {
    var self = this;
    var options = self.options;
    var params = options.params || {}
    globals.get(options.url, function(res){
        res.forEach(function(item){
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
    
    var all_promise = keyValues.split(",").map(function(item){
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
    });    
}

DataSource.getDataSource = function(resourceName, lang) {
    if(resources[resourceName]) {
        resources[resourceName].setLang(lang)
        return resources[resourceName]   
    }
    else {
        resources[resourceName] = new DataSource(resources_options[resourceName], lang)
        return resources[resourceName]     
    }
}

export default DataSource
