
import { Order, ProductDetail, promiseRunner } from "../model.js"
import chain from "../chain.js"

function confirmList(list){
    return new Promise(resolve=>{
        detailConvert(list).then(results=>{
            let hash = {};

            results.forEach(item=>{
                let key = item.productid
                if (hash[key]) {
                    hash[key].orders.push({
                        order:item.order,
                        form:item.form,
                        confirm_form:item.confirm_form,
                        total:item.total,
                        discount:item.discount
                    })
                } else {
                    hash[key] = {
                        product:item.product,
                        orders: [{
                            order:item.order,
                            form:item.form,
                            confirm_form:item.confirm_form||"",
                            total:item.total,
                            discount:item.discount
                        }],
                        confirm_total:0,
                        discount:item.discount,
                        discountbrand:item.discountbrand ||"",
                        is_hidden:false,
                        price:item.product.factoryprice * item.discountbrand
                    }
                }
            })

            resolve(chain(hash).toArray((key,value)=>value).array())
        })
    })    
}

export {confirmList}

function shippingList(list){
    return new Promise(resolve=>{
        detailConvert(list).then(results=>{
            let hash = {};

            results.forEach(item=>{
                let key = item.productid
                if (hash[key]) {
                    hash[key].orders.push({
                        order:item.order,
                        form:item.left_form,
                        confirm_form:{},
                        total:item.total,
                        discount:item.discount
                    })
                } else {
                    hash[key] = {
                        product:item.product,
                        orders: [{
                            order:item.order,
                            form:item.left_form,
                            confirm_form:{},
                            total:item.total,
                            discount:item.discount
                        }],
                        confirm_total:0,
                        discount:item.discount,
                        discountbrand:item.discountbrand ||"",
                        is_hidden:false,
                        price:item.product.factoryprice * item.discountbrand
                    }
                }
            })

            resolve(chain(hash).toArray((key,value)=>value).array())
        })
    })    
}

export {shippingList}

const detailConvert = function(list){
    let result = {}
    list.forEach(item => {
        //self._log(item)
        let key = item.orderid + "-" + item.productid
        if (result[key]) {
            result[key]['form'][item.sizecontentid] = item.number
            result[key]['confirm_form'][item.sizecontentid] = item.confirm_number==0 ? '' : item.confirm_number
            result[key]['left_form'][item.sizecontentid] = item.confirm_number-item.shipping_number
            result[key]['total'] += item.number * 1
        } else {
            let form = {}
            form[item.sizecontentid] = item.number

            //确认数量
            let confirm_form = {}
            confirm_form[item.sizecontentid] = item.confirm_number==0 ? '' : item.confirm_number

            //剩余数量
            let left_form = {}
            left_form[item.sizecontentid] = item.confirm_number-item.shipping_number
            result[key] = {
                key,
                productid: item.productid,
                discount: item.discount,
                discountbrand:item.discountbrand,
                total: item.number * 1,
                form,
                confirm_form,
                left_form,
                orderid: item.orderid
            }
        }
    })

    let promises = []
    chain(result).forEach(item => {
        //console.log(item,"==")
        let runner = promiseRunner(item)
        runner.push(Order.load({ data: item.orderid, depth: 1 }), "order")
        runner.push(ProductDetail.load({ data: item.productid, depth: 1 }), "product")
        promises.push(runner.all())
    })

    return Promise.all(promises)
}

export default detailConvert