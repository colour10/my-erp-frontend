import globals from './globals.js'
import resources_options from './resources.js'

const resources = {};

function DataSource(options, lang) {
    var self = this;
    self.lang = lang;
    self.data = [];
    self.hashtable = {};
    self.options = options;
    self.oplabel = options.oplabel || 'name'
    self.opvalue = options.opvalue || 'value'
            
    //console.log(data_source.hashtable, data_source.datalist, data_source.url)
    if(options.url) {
        self.loadList()
    }
    else if(options.hashlist) {
        console.log(options.hashlist)
        Object.keys(options.hashlist).forEach(function(key){
            self.data.push(options.hashlist[key])
        });
        self.hashtable = options.hashlist;
    }
    else if(options.hashtable) {
        Object.keys(options.hashtable).forEach(function(key){
            var item = {name:options.hashtable[key],value:key};
            self.data.push(item)
            self.hashtable[key] = item;
        });
        self.oplabel = "name"
        self.opvalue = "value"
    }
    else if(options.datalist) {
        self.data = options.datalist;
        self.data.forEach(function(item){
            self.hashtable[item[self.opvalue]] = item;    
        })
    }
}

DataSource.prototype.loadList = function() {
    var self = this;
    var options = self.options;
    var params = options.params || {}
    globals.get(options.url, params, function(res){
        self.data = res;
        res.forEach(function(item){
            self.hashtable[item[self.opvalue]] = item;    
        })
    },'json');
}

DataSource.prototype.getData = function() {
    return this.hashtable;
}

DataSource.prototype.getLabelName = function(name) {
    return this.oplabel
}

DataSource.prototype.setLang = function(lang) {
    this.lang = lang
}

DataSource.prototype.setLabelName = function(name) {
    this.oplabel = name
}

/*
DataSource.prototype.setValueName = function(name) {
    self.opvalue = name
}*/

DataSource.prototype.getRow = function(keyValue) {
    return this.hashtable[keyValue]
}

DataSource.prototype.getRowLabel = function(keyValue) {
    var self = this;
    var row = self.getRow(keyValue);
    if(row) {
        return row[self.oplabel] || row[self.oplabel+'_'+self.lang]   
    }
    else {
        return "";   
    }
}

DataSource.getDataSource = function(resourceName, lang) {
    if(resources[name]) {
        resources[name].setLang(lang)
        return resources[name]   
    }
    else {
        resources[name] = new DataSource(resources_options[resourceName], lang)
        return resources[name]     
    }
}

export default DataSource
