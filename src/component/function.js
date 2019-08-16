const fnone = function() {}
export {
    fnone
}

const fture = () => true
const ffalse = () => false


/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        } else {
            timeout = setTimeout(() => {
                func.apply(context, args)
            }, wait);
        }
    }
}

function once(fn, context) {
    let result;

    return function() {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}

function poll(fn, callback, errback, timeout, interval) {
    let endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    (function p() {
        // 如果条件满足，则执行！
        if (fn()) {
            callback();
        }
        // 如果条件不满足，但并未超时，再来一次
        else if (Number(new Date()) < endTime) {
            setTimeout(p, interval);
        }
        // 不匹配且时间消耗过长，则拒绝！
        else {
            errback(new Error('timed out for ' + fn + ': ' + arguments));
        }
    })();
}

function autoCall(fn, ...args) {
    if(typeof(fn)=='function') {
        return fn(...args);
    }
    else {
        return fn;
    }
}


export {
    ffalse,
    fture,
    debounce,
    once,
    poll,
    autoCall,
}

export default {
    ffalse,
    fture,
    debounce,
    once,
    poll,
    autoCall,
}