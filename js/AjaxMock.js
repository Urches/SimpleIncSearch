class AjaxMock {
    constructor(){
        //request execute flow
        this.requests = new Map();
        setInterval(() => {
            if(this.requests.size != 0 ){
                let entry = Array.from(this.requests.entries())[0];
                let time = entry[0];
                let query = entry[1];
                try {
                    console.log('ajax request by time: ' + DateUtils.prototype.formatDate(time) + ' sended');
                    query();
                } finally {
                    this.requests.delete(time);
                }   
            }
        }, 100);
    }

    cancelQueriesBefore(time){
        this.requests.forEach(request => {
            let queryTime = request[0];

            if(queryTime < time){
                let value = request[1];
                this.requests.delete(queryTime); 
                console.log('ajax request by value: "' + value + '" and request time: ' + DateUtils.prototype.formatDate(time) + ' canceled');
            }
        });
    }

    executeGetQuery(responseBody, callback){   
        let delayTime = 100 + (Math.random()*1900);
        //console.log('ajax query delay time: ' + delayTime + ' ms');
       
        let bindQuery = this.mockGetQuery.bind(this, responseBody, callback); 
        let delayQuery = this.delay(bindQuery, delayTime); 
        
        //add request in pool
        this.requests.set(responseBody.time, delayQuery);
    }

    mockGetQuery(responseBody, callback) {
        let suggestion = [];
        let value = responseBody.value;
        //Random generate result strings
        for (let i = 0; i < 5; i++) {
            let str = value + Math.random().toString(36).substring(7);
            suggestion.push(str);
        }
        callback(suggestion);
    };

    delay(f, ms) {
        return () => {
            let savedThis = this;
            let savedArgs = arguments;
            let result;
            setTimeout(function () {
                f.apply(savedThis, savedArgs);
            }, ms);
        };
    }

    debounce (f, ms) {
        let timer = null;
        return function (...args) {
            const onComplete = () => {
                f.apply(this, args);
                timer = null;
            }
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(onComplete, ms);
        };
    }
}