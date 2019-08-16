import { ProductDetail, promiseRunner } from "../model.js"

export default function(list){
    let result = new Map();

    for(let item of list) {
        let row = result.get(item.productid) || {
            productid: item.productid,
            discount: Number(item.discount),
            total: 0,
            factoryprice: item.factoryprice,
        };

        row.total += Number(item.number);
        result.set(item.productid, row);
    }

    let promises = [];
    for (let value of result.values()) {
        let runner = promiseRunner(value);

        runner.push(ProductDetail.load({ data: value.productid, depth: 1 }), "product")

        promises.push(runner.all())
    }

    return Promise.all(promises)
};