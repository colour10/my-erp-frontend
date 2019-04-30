import resources_options from './resources.js'
import {httpGet} from './http.js'
import {ASAP} from "./globals.js"
import {extract} from "./object.js"


function DataRow(row, id, name, option={}) {
    let self = this;
    self.row = row
    self.id = id;
    self.name = name
    self.option = option
}

DataRow.prototype.getValue = function() {
    return this.id
}

DataRow.prototype.getLabel = function() {
    return this.name
}

DataRow.prototype.optionName = function() {
    let self = this
    if(typeof(self.option.optionName)=='function') {
        let func = self.option.optionName
        //console.log(func.call(self))
        return func.call(self)
    }
    return self.name
}

DataRow.factory = function(row, dataSource){
    let keyName = dataSource.getLabelName()
    let lang = dataSource.getLang()
    let id  = row[dataSource.getValueName()];
    let name = row[keyName] || row[keyName+"_"+lang] || ""
    return new DataRow(row, id, name, dataSource.options);
}


function DataSource(options, lang) {
    let self = this;
    self.lang = lang;
    self.data = [];
    self.hashtable = {};
    self.options = options;
    self.oplabel = options.oplabel || 'name'
    self.opvalue = options.opvalue || 'value'
    self.parent = options.parent;
    self.is_loaded = false;
            
    //_log(data_source.hashtable, data_source.datalist, data_source.url)    
}

DataSource.prototype.init = function() {
    let self = this;
    let options = self.options;


    if(options.url) {
        self.loadList()
    }
    else if(options.hashlist) {
        //_log(options.hashlist)
        Object.keys(options.hashlist).forEach(function(key){
            let row = DataRow.factory(options.hashlist[key], self)
            self.data.push(row)
            self.hashtable[key] = row;
        });
        self.is_loaded = true;
    }
    else if(options.hashtable) {
        Object.keys(options.hashtable).forEach(function(key){
            let row = DataRow.factory({name:options.hashtable[key],value:key}, self);
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
            let row = DataRow.factory(item, self)
            
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
    let self = this;
    let options = self.options;
    let params = options.params || {}
    httpGet(options.url).then( function({data=[]}={}){
        data.forEach(function(item){
            let row = DataRow.factory(item, self)
            self.hashtable[item[self.opvalue]] = row; 
            self.data.push(row)   
        })
        self.is_loaded = true;
    });
}

DataSource.prototype.getData = function(callback) {
    let self = this;
    let func = function f(){
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
            //console.log("DataSource.filter", row, keys.every(key=>condition[key]==row.getRow(key)))
            return keys.every(key=>condition[key]==row.getRow(key))    
        })
        callback(result)
    })
}
/*DataSource.prototype.filter = function(func) {
    let self = this;

    return new Promise(resolve=>{
        self.getData(data=>{              
            resolve(data.filter(func))
        })
    })    
}*/

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

DataSource.prototype.getRow = function(keyValue, callback) {
    var self = this;
    

    let promise = new Promise((resolve)=>{
        self.getData(()=>{
            resolve(self.hashtable[keyValue])
        })
    });

    if(typeof(callback)=='function') {
        promise.then(callback)
    }
    else {
        return promise;
    }
}

DataSource.prototype.getRowLabel = function(keyValue, callback) {
    let self = this;
    
    let promise = new Promise((resolve)=>{
        self.getRow(keyValue,function(row){
            if(row) {
                resolve(row.getLabel())
            }
            else {
                resolve("");   
            }    
        });
    });

    if(typeof(callback)=='function') {
        promise.then(callback)
    }
    else {
        return promise;
    }
}

DataSource.prototype.getRows = function(keyValues='', callback) {
    var self = this;
    keyValues = keyValues || ""

    keyValues = typeof(keyValues)=='string' ? keyValues.split(",") : keyValues;

    let promise = new Promise(resolve=>{
        self.getData( data => {
            //_log(valueList, data, '+++++++') 
            let list = keyValues.map(function(value){
                return data.find(item=>value==item.getValue())
            }).filter(item=>item)
            
            resolve(list)
        })
    });
    
    if(typeof(callback)=='function') {
        promise.then(callback)
    }
    else {
        return promise;
    }
}

DataSource.prototype.getSourceByParent = function(parent) {
    var self = this;

    return new Promise(resolve=>{
        self.getData( data => {
            //console.log(data, parent)
            let list = data.filter(function(value){
                return value.row[self.parent] == parent
            })

            let options = extract(self.options,['oplabel','opvalue','parent']);
            options.datalist = list.map(item=>item.row)
            let source = new DataSource(options,self.lang);
            source.init();

            
            resolve(source)
        })
    })    
}

DataSource.prototype.getRowLabels = function(keyValues, callback) {
    var self = this;

    let promise = new Promise((resolve)=>{
        self.getRows(keyValues, function(list){
            resolve(list.map(item=>item.getLabel()).join(","))
        }) 
    });

    if(typeof(callback)=='function') {
        promise.then(callback)
    }
    else {
        return promise;
    }       
}

DataSource.prototype.getList = function() {
    var self = this;

    return new Promise((resolve)=>{
        self.getData(data=>{
            resolve(data)
        })
    })   
}

DataSource.getDataSource = function(resourceName, lang) {
    if(resourceName.constructor==DataSource) {
        return resourceName;
    }

    let resources = ASAP.resources

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
    }
}

DataSource.createSource = function(datalist, oplabel, opvalue, lang) {
    let source = new DataSource({datalist, oplabel, opvalue}, lang)
    source.init()
    return source;
}

export default DataSource
