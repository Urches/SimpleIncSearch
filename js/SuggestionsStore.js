class SuggestionsStore {
    constructor() {
        //Map<String, String[]>
        this.localCache = new Map();

        this.onSuggestionLoaded = new EventEmitter();
        this.onPrepareSuggestion = new EventEmitter();

        this.ajax = new AjaxMock();
        this.lastResivedTime;

        this.onPrepareSuggestion.subscribe((value) => {
            //get suggestions from local cache
            let suggestion = this.localCache.get(value);

            //if local cahce doesn't contain suggestions make ajax query
            if (!suggestion) {

                let time = new Date();
                let callback = (suggestion) => {
                    console.log('ajax response by value: "' + value + '" at time: ' + this.formatDate(time) + ' received');
                    //add result in local cache
                    this.localCache.set(value, suggestion);
                    if (!this.lastResivedTime || this.lastResivedTime < time) {
                        console.log('response is relevant');
                        this.lastResivedTime = time;
                        //cancel all before sended queries 
                        this.ajax.cancelQueriesBefore(time);
                        this.onSuggestionLoaded.notify({
                            value,
                            suggestion
                        });
                    } else console.log('response isn\'t relevant');
                };

                console.log('ajax request by value: "' + value + '" at time: ' + this.formatDate(time) + ' sended');
                this.ajax.executeGetQuery({
                    time,
                    value
                }, callback);

            } else {
                console.log('local stored suggestion by value: "' + value + '" finded');
                this.onSuggestionLoaded.notify({
                    value,
                    suggestion
                });
            }
        });
    }

    formatDate(date) {
        return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds() + ':' + date.getMilliseconds();
    }
}