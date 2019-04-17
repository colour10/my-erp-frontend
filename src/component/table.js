import { Table } from 'element-ui';
import { extendComponent } from './vue.js'

export default extendComponent(Table, {
    name:"sp-table",
    methods:{
        tableRowClassName({ row, rowIndex }) {
            if (rowIndex%2 === 0) {
                return 'stripe1';
            }
            return '';
        },
        paramsPipe({props}) {
            props.rowClassName = this.tableRowClassName
        }
    }
})