import {httpGet} from './http.js'
import {extract} from "./object.js"

const resource = {}

function DataRow(row, option={}) {
    let self = this;
    self.row = row
    self.option = option
}

DataRow.prototype.getValue = function() {
    return this.row[this.option.valueName]
}

DataRow.prototype.getLabel = function() {
    return this.row[this.option.labelName] || ""
}

DataRow.prototype.getParent = function() {
    return this.row[this.option.parentName]
}

DataRow.prototype.convert = function() {
    let self = this
    if(typeof(self.option.convert)=='function') {
        let func = self.option.convert
        return func.call(self)
    }
    return self.getLabel()
}

function DataSource({labelName='name', valueName='value', parentName, url, hashlist, hashtable, datalist, convert}) {
    let self = this;

    let data = [];
    let mapData = {};    

    let status = 0;

    function _append(key, row) {
        let dataRow = new DataRow(row, self.getOption())
        data.push(dataRow)
        mapData[key] = dataRow;
    }

    function _init() {
        return new Promise(resolve=>{
            let option = self.getOption();
            if(url) {
                httpGet(url).then( function({data=[]}={}){
                    data.forEach(function(item){
                        _append(item[valueName], item)
                    })
                    resolve()
                });
            }
            else if(hashlist) {
                Object.keys(hashlist).forEach(function(key){
                    _append(key, hashlist[key])
                });
                resolve()
            }
            else if(hashtable) {
                Object.keys(hashtable).forEach(function(key){
                    _append(key, {name:hashtable[key],value:key})
                });
                labelName = "name"
                valueName = "value"
                resolve()
            }
            else if(datalist) {
                datalist.forEach(function(item){
                    _append(item[valueName], item)
                })
                resolve()
            }
        })    
    }

    self.getOption = function() {
        return  {labelName, valueName, parentName, convert};
    } 

    self.getData = function() {
        return new Promise(resolve => {
            function f(){
                if(status==0) {
                    status = 1
                    _init().then(()=>{
                        status = 2
                        //console.log(data, mapData)
                        resolve({data, mapData})
                    })
                }
                else if(status==2) {
                    //console.log(data, mapData)
                    resolve({data, mapData})
                }
                else {
                    setTimeout(f, 50)
                }
            }

            f();
        })        
    }
}

DataSource.prototype.filter = function(callback) {
    let self = this;
    return new Promise(resolve=>{
        self.getData().then(({data})=>{
            let options = self.getOption();
            options.datalist = data.filter(callback).map(item=>item.row)
            resolve(new DataSource(options))
        })
    })    
}

DataSource.prototype.getRow = function(keyValues='') {
    var self = this;
    keyValues = typeof(keyValues)=='string' ? keyValues.split(",") : keyValues;

    return new Promise(resolve=>{
        self.getData().then( ({mapData}) => {
            let list = keyValues.map(function(value){
                return mapData[value]
            }).filter(item=>item)
            
            resolve(list)
        })
    })    
}

DataSource.prototype.getSourceByParent = function(parent) {
    return this.filter(rowData=>rowData.getParent()==parent)
}

DataSource.prototype.getLabel = function(keyValues) {
    var self = this;

    return new Promise((resolve)=>{
        self.getRow(keyValues).then(list=>{
            resolve(list.map(item=>item.getLabel()).filter(item=>item.length>0).join(","))
        }) 
    });    
}

const instances ={}
DataSource.getDataSource = function(resourceName) {
    if(typeof(resourceName)=="string") {
        if(instances[resourceName]) {
            return instances[resourceName]
        }
        else if(!resource[resourceName]) {
            throw "资源未定义:"+resourceName
        }

        instances[resourceName] = new DataSource(resource[resourceName])
        return instances[resourceName]
    } 
    else {
        if(resourceName.constructor==DataSource) {
            return resourceName;
        }
        else {
            return new DataSource(resourceName)
        }        
    }
}

DataSource.register = function(name, option) {
    resource[name] = option
}

export default DataSource
