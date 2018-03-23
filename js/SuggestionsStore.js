class SuggestionsStore {
    constructor() {
        //Map<String, String[]>
        this.suggestions = new Map();
        this.onSuggestionLoaded = new EventEmitter();
        this.onPrepareSuggestion = new EventEmitter();
        this.ajax = new AjaxMock();

        this.onPrepareSuggestion.subscribe((value) => {
            let suggestion = this.suggestions.get(value);
            if (!suggestion) {
                let callback = (suggestion) => {
                    this.suggestions.set(value, suggestion);                  
                    this.onSuggestionLoaded.notify({value, suggestion});
                }
                console.log('ajax resived suggestion by value:' + value);
                suggestion = this.ajax.executeGetQuery(value, callback);
            } else {
                console.log('local stored suggestion by value:' + value);
                this.onSuggestionLoaded.notify({value, suggestion});
            }
        });
    }
}