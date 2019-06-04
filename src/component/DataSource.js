import getResource from './resources.js'
import {httpGet} from './http.js'
import {ASAP} from "./globals.js"
import {extract} from "./object.js"
import mitt from 'mitt'

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
            
    self.emitter = mitt()
}

DataSource.prototype.clear = function() {
    let self = this;
    self.data = []
    self.hashtable = {}
    self.is_loaded = false
    self.emitter.emit("change")
    console.log("清空", self)
    self.init()
}

function _initDependencies(dataSource, dependencies) {
    if(dataSource.isDependencies) {
        return 
    }

    if(!dataSource.options.dependencies) {
        return 
    }
    dataSource.options.dependencies.forEach(item=>{
        DataSource.getDataSource(item).emitter.on("change", function(){
            dataSource.clear()
            console.log("倚赖清空")
        })

    })
    dataSource.isDependencies = true
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
        _initDependencies(self)
    }
    else if(options.hashtable) {
        //console.log(options.hashtable)
        Object.keys(options.hashtable).forEach(function(key){
            let row = DataRow.factory({name:options.hashtable[key],value:key}, self);
            self.data.push(row)
            self.hashtable[key] = row;
        });
        self.oplabel = "name"
        self.opvalue = "value"
        self.is_loaded = true;
        _initDependencies(self)
    }
    else if(options.datalist) {
        //_log(options.datalist.forEach,"options")
        options.datalist.forEach(function(item){
            let row = DataRow.factory(item, self)
            
            self.hashtable[item[self.opvalue]] = row;    
            self.data.push(row)
        })
        self.is_loaded = true;

        _initDependencies(self)
    }
    else if(options.callback) {
        options.callback(DataSource).then(dataSource=>{
            dataSource.getData(function(data){
                data.forEach(rowData=>{
                    self.hashtable[rowData.getValue()] = rowData;    
                    self.data.push(rowData)
                })
                self.oplabel = dataSource.oplabel
                self.opvalue = dataSource.opvalue
                self.is_loaded = true;

                _initDependencies(self)
                //console.log("设置倚赖关系")
            })            
        })
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

    //console.log("DataSource loadurl")
    httpGet(options.url+"?"+Date.now(), {enableCache:false}).then( function({data=[]}={}){
        data.forEach(function(item){
            let row = DataRow.factory(item, self)
            self.hashtable[item[self.opvalue]] = row; 
            self.data.push(row)   
        })
        self.is_loaded = true;
        _initDependencies(self)
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

DataSource.prototype.filter = function(callback) {
    var self = this;

    return new Promise(resolve=>{
        self.getData(data=>{       
            let options = extract(self.options,['oplabel','opvalue','parent']);            
            options.datalist = data.filter(callback).map(item=>item.row)
            let source = new DataSource(options, self.lang);
            source.init();
            
            resolve(source)
        })
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

DataSource.prototype.subSource = function(callback) {
    let self = this;

    return new Promise(resolve=>{
        self.getData(data=>{ 
            let options = extract(self.options,['oplabel','opvalue','parent']);
            options.datalist = data.filter(callback).map(item=>item.row)
            let source = new DataSource(options,self.lang);
            source.init();
            
            resolve(source)
        })
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
            //console.log(keyValues, data, '+++++++') 
            let list = keyValues.map(function(value){
                return data.find(item=>value==item.getValue())
            }).filter(item=>item)
            
            //console.log(keyValues, list, '+++++++') 
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

    let parent_array = parent.split(",")
    return new Promise(resolve=>{
        self.getData( data => {
            //console.log(data, parent)
            let list = data.filter(function(value){
                return parent_array.indexOf(value.row[self.parent])>=0 //value.row[self.parent] == parent
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
            //console.log(list, list.map(item=>item.getLabel()).join(","),"-----------")
            resolve(list.map(item=>item.getLabel()).join(","))
        }) 
    });

    //console.log(typeof(callback),keyValues)
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
        let create = function() {
            let res = getResource(resourceName)
            //console.log("getDataSource",resourceName, lang, res)
            if(!res) {
                //_log(resourceName,"未定义")
                throw "资源未定义:"+resourceName
            }
            else if(typeof(res)=='function') {
                res = {callback:res}
            }
            //console.log("getDatasource",resourceName, res)
            resources[resourceName] = new DataSource(res, lang)
            resources[resourceName].init()
            return resources[resourceName]
        }
        
        return create()
    }
}

DataSource.createSource = function(datalist, oplabel, opvalue, lang) {
    let source = new DataSource({datalist, oplabel, opvalue}, lang)
    source.init()
    return source;
}
export {DataSource}
export default DataSource
