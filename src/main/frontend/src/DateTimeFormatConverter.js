
function DateTimeFormatConverter(datetime) {
    let year = datetime.getFullYear();
    let month = datetime.getMonth();
    if (month < 9) {
        month = "0" + month;
    }
    let date = datetime.getDate();
    if (date < 9) {
        date = "0" + date;
    }
    let hour = datetime.getHours();
    if (hour < 9) {
        hour = "0" + hour;
    }
    let minutes = datetime.getMinutes();
    if (minutes < 9) {
        minutes = "0" + minutes;
    }
    let seconds = datetime.getSeconds();
    if (seconds < 9) {
        seconds = "0" + seconds;
    }
    return year + "-" + month + "-" + date + " " + hour + ":" + minutes + ":" + seconds;
}

export default DateTimeFormatConverter;