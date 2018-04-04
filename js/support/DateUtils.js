function DateUtils(){

}

DateUtils.prototype.formatDate = function(date) {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
}