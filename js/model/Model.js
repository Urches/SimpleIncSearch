class Model {
    constructor() {
        this.onChange = new EventEmitter();
        //time of last accepted request
        this.lastAcceptedTime;
        //Map<Date, request>
        this.requestPool = new Map();
    }

    querySuggestion(value) {
        if(value){
            let time = new Date();
            //promise cancel realisation
            let token = {
                cancel: () => {}
            };
            //wrapper on promise
            let query = () => {
                new Promise((resolve, reject) => {
    
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', '/search' + '?value=' + value);
    
                    xhr.onload = () => {
                        console.log('ajax request by value: "' + value + '" at time: ' + DateUtils.prototype.formatDate(time) + ' arrived');
                        resolve(xhr.responseText);
                    };
    
                    token.cancel = () => {
                        console.log('ajax request by value: "' + value + '" at time: ' + DateUtils.prototype.formatDate(time) + ' abort');
                        xhr.abort();
                    };
    
                    xhr.onerror = () => {
                        console.log("Exception " + xhr.status + ': ' + xhr.statusText);
                        reject();
                    }
    
                    console.log('ajax request by value: "' + value + '" at time: ' + DateUtils.prototype.formatDate(time) + ' send');
                    xhr.send();
                }).then((text) => {
                    if (!this.lastAcceptedTime || this.lastAcceptedTime < time) {
                        this.lastAcceptedTime = time;
                        this.requestPool.delete(time);
                        this.cancelQueries();
                        this.onChange.notify(text.split(' '));
                    } else console.log('ajax response by value: "' + value + '" at time: ' + DateUtils.prototype.formatDate(time) + ' isn\'t relevant');
                });
            }
    
            //add query in pool
            this.requestPool.set(time, {
                query,
                token
            });
            //execute query
            query();
        }  else this.onChange.notify();
    }

    /**
     * Delete and cancel requests from pool where request.time < time
     * By default request.time = time of last accepted request   
     * @param {class Date} time 
     */
    cancelQueries(time = this.lastAcceptedTime) {
        Array.from(this.requestPool.entries()).forEach(request => {
            let reqTime = request[0];
            let reqToken = request[1].token;
            if (reqTime < time) {
                reqToken.cancel();
                this.requestPool.delete(reqTime);
            }
        });
    }
}