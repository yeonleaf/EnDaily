
function leftPad(target) {
    if (target >= 10) {
        return target;
    }
    return `0${target}`;
}

function dateFormatConverter(target, delimiter = '-') {
    const year = target.getFullYear();
    const month = leftPad(target.getMonth()+1);
    const day = leftPad(target.getDate());
    return [year, month, day].join(delimiter);
}

export default dateFormatConverter;