const round = function(num, length) {
    var l = Math.pow(10, length)
        return Math.round(num * l) / l
}
export {round}

const _format = function(number) {
    let num = Math.floor(number);
    let digit = num%10;
    if(digit>=8) {
        return num +10-digit;
    }
    else if(digit<2) {
        return num-digit;
    }
    else {
        return num-digit+5;
    }
}

const roundFormat = function(number, type=1) {
    if(type==1) {
        return _format(number);
    }
    else if(type==2) {
        return _format(Math.floor(number/10))*10;
    }
    else {
        return number;
    }
}
export { roundFormat }

export default { round, roundFormat }