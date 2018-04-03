class Ajax {
    constructor(){

    }

    executeGetQuery(responseBody, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'searchController', true);
        xhr.send(responseBody);
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            //expected result is string
            let suggestion = xhr.responseText.split(' ');
            callback(suggestion);
        }
    }
}