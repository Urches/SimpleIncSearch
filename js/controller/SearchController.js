class SearchController {
    /**
     * @param {class Model} model 
     */
    constructor(model) {
        this.model = model;
        this.lastAcceptedTime;
    }

    querySuggestion(value) {
        let onReject = this.queryServerSuggestion.bind(this, value);
        this.queryLocalSuggestion(value, onReject);
    }

    queryLocalSuggestion(value, reject) {
        this.model.querySuggestion(value, reject);
    }

    queryServerSuggestion(value) {
        let time = new Date();

        let onResolve = (text) => {
            this.queryAddSuggestion(time, value, text);

            if(!this.lastAcceptedTime || this.lastAcceptedTime < time){
                this.lastAcceptedTime = time;
                this.queryLocalSuggestion(value);
            } else console.log('ajax response by value: "' + value + '" at time: ' + DateUtils.prototype.formatDate(time) + ' isn\'t relevant');  
        }

        new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://localhost:8081/IncrementalSearch/search' + '?value=' + value, true);
            console.log('ajax request by value: "' + value + '" at time: ' + DateUtils.prototype.formatDate(time) + ' send');
            xhr.send();
            xhr.onreadystatechange = function () {
                if (xhr.readyState != 4) return;
                if (xhr.status != 200) {
                    console.log("Exception " + xhr.status + ': ' + xhr.statusText);
                    reject();
                } else {
                    console.log('ajax request by value: "' + value + '" at time: ' + DateUtils.prototype.formatDate(time) + ' arrived');
                    resolve(xhr.responseText);
                }
            }
        }).then(onResolve);
    }

    queryAddSuggestion(time, value, text) {
        this.model.addSuggestion(time, value, text);
    }
}