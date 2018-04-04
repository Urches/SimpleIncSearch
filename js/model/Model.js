class Model {
    constructor() {
        //Map<String, Suggestion>
        this.localCache = new Map();
        this.onSuggestionLoaded = new EventEmitter();
    }

    querySuggestion(value, reject) {
        //get suggestions from local cache
        let suggestion = this.localCache.get(value);

        //if local cahce doesn't contain suggestion
        if (!suggestion) {
            console.log('local cache doesn\'t conatain suggestion by value: "' + value);
            reject();
        } else {
            console.log('suggestion by value: "' + value + '" found in local cache');
            this.onSuggestionLoaded.notify(suggestion);
        }
    }

    addSuggestion(time, value, text) {
        let suggestion = new Suggestion(time, value, text.split(' '));
        console.log('add suggestion by value: "' + value + '" in local cache');
        this.localCache.set(suggestion.value, suggestion);
    }
}