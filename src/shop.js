//import App from './App.vue'
import DataSource from './component/DataSource.js'

if (typeof window !== 'undefined') {
    console.log("hello")
    if(typeof(window.ASAP)=='undefined') {
        window.ASAP = {}
    }
    console.log("hello2")
    window.ASAP.getLabel = function(source, lang, keys, callback){
        let dataSource = DataSource.getDataSource(source, lang)
        dataSource.getRowLabels(keys,callback)
    }
}
export default {} // 导出..