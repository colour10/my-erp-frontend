const round = function(num, length) {
    if (num > 0) {
        var l = Math.pow(10, length)
        return Math.round(num * l) / l
    } else {
        return '';
    }
}
export {round}

export default {round}