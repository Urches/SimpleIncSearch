class AjaxMock extends Ajax {
    constructor(){
        super();
    }

    executeGetQuery(responseBody, callback){
        let time = 100 + (Math.random()*1900);
        console.log('delay time: ' + time + ' ms')
        let delayQuery = this.delay(this.mockGetQuery, time);
        return delayQuery(responseBody, callback);
    }


    mockGetQuery(responseBody, callback) {
        let suggestion = [];
        //Random generate result strings
        for (let i = 0; i < 5; i++) {
            let str = responseBody + Math.random().toString(36).substring(7);
            suggestion.push(str);
        }
        callback(suggestion);
    };

    delay(f, ms) {
        return function () {
            let savedThis = this;
            let savedArgs = arguments;
            let result;
            setTimeout(function () {
                f.apply(savedThis, savedArgs);
            }, ms);
        };
    }
}