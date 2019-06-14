const round = function(num, length) {
    var l = Math.pow(10, length)
        return Math.round(num * l) / l
}

export {round}

export default {round}