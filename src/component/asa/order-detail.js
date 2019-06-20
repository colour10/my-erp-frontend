import { Order, ProductDetail, promiseRunner } from "../model.js"
import chain from "../chain.js"

const detailConvert = function(list){
    let result = {}
    //console.log(list, "--")
    list.forEach(item => {
        //self._log(item)
        let key = item.orderid + "-" + item.productid
        if (result[key]) {
            result[key]['form'][item.sizecontentid] = {number:item.number,id:item.id}
            result[key]['confirm_form'][item.sizecontentid] =  {number:item.confirm_number==0 ? '' : item.confirm_number,id:item.id}
            result[key]['left_form'][item.sizecontentid] = {number:item.confirm_number-item.shipping_number,id:item.id}
            result[key]['shipping_form'][item.sizecontentid] = {number:"",id:item.id}
            result[key]['total'] += item.number * 1
        } else {
            let form = {}
            form[item.sizecontentid] = {number:item.number,id:item.id}

            //确认数量
            let confirm_form = {}
            confirm_form[item.sizecontentid] = {number:item.confirm_number==0 ? '' : item.confirm_number,id:item.id}

            //剩余数量
            let left_form = {}
            left_form[item.sizecontentid] = {number:item.confirm_number-item.shipping_number,id:item.id}

            let shipping_form = {}
            shipping_form[item.sizecontentid] = {number:"",id:item.id}
            result[key] = {
                key,
                productid: item.productid,
                discount: item.discount*1,
                discountbrand:item.discountbrand*1,
                total: item.number * 1,
                form,
                confirm_form,
                left_form,
                shipping_form,
                orderid: item.orderid
            }
        }
    })

    let promises = []
    chain(result).forEach(item => {
        //console.log(item,"==")
        let runner = promiseRunner(item)

        if(item.orderid>0) {
            runner.push(Order.load({ data: item.orderid, depth: 1 }), "order")
        }
        else {
            item.order = {id:-1}
        }
        
        runner.push(ProductDetail.load({ data: item.productid, depth: 1 }), "product")
        
        promises.push(runner.all())
    })

    return Promise.all(promises)
}

export default detailConvert