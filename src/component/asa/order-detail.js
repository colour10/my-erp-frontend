
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
                        discount:item.discount ||"",
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

function shippingListObject(list){
    return new Promise(resolve=>{
        detailConvert(list).then(results=>{
            let hash = {};

            results.forEach(item=>{
                let key = item.productid
                if (hash[key]) {
                    hash[key].orders.push({
                        order:item.order,
                        form:item.left_form,
                        confirm_form:item.shipping_form,
                        total:item.total,
                        discount:item.discount
                    })
                } else {
                    hash[key] = {
                        product:item.product,
                        orders: [{
                            order:item.order,
                            form:item.left_form,
                            confirm_form:item.shipping_form,
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

            resolve(hash)
        })
    })    
}

async function shippingList(list){
    let results = await shippingListObject(list)

    return chain(results).toArray((key,value)=>value).array()
}


export { shippingList }

const detailConvert = function(list){
    let result = {}
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
        runner.push(Order.load({ data: item.orderid, depth: 1 }), "order")
        runner.push(ProductDetail.load({ data: item.productid, depth: 1 }), "product")
        promises.push(runner.all())
    })

    return Promise.all(promises)
}

const getProduct = async function(list, projectid){
    let results = await shippingListObject(list)
    return results[projectid]
}

export { getProduct }

const shippingConvert = function(list){
    let result = {}
    list.forEach(item => {
        console.log("SSSSSSSS",item)
        let key = item.price + "-" + item.productid +'-'+ item.orderid
        if (result[key]) {
            result[key]['form'][item.sizecontentid] = {number:item.number,id:"", shippingdetailid:item.id}
        } else {
            let form = {}
            form[item.sizecontentid] = {number:item.number,id:"",shippingdetailid:item.id}
            result[key] = {
                key,
                productid: item.productid,
                orderid:item.orderid,
                price:item.price*1,
                form
            }
        }
    })

    let hash = {}
    chain(result).forEach(item=>{
        let key = item.productid + item.price
        if (hash[key]) {
            hash[key].orders.push({
                confirm_form:item.form,
                orderid:item.orderid
            })
        } else {
            hash[key] = {
                productid:item.productid,
                orders: [{
                    confirm_form:item.form,
                    orderid:item.orderid
                }],
                price:item.price
            }
        }
    })
    return chain(hash).toArray((key,value)=>value).array()
}
export { shippingConvert }

export default detailConvert