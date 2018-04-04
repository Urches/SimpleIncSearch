class SearchView {
    constructor(model, controller) {
        this.model = model;
        this.controller = controller;

        let self = this;
        document.querySelector('.searchField').oninput = function () {
            self.throttle(() => {
                let value = document.querySelector('.searchField').value;
                if (value) {
                    self.controller.querySuggestion(value);
                } else self.clean();
            }, 50)();
        };

        model.onSuggestionLoaded.subscribe((suggestion) => {
            console.log('display suggestion by value: ' + suggestion.value);
            Array.from(document.querySelectorAll('.suggestion-item')).forEach((item, index) => {
                item.innerText = suggestion.text[index];
            });
        });
    };

    clean() {
        Array.from(document.querySelectorAll('.suggestion-item')).forEach(item => {
            item.innerText = '';
        });
    }

    throttle(callback, limit) {
        var wait = false;

        return function () {
            if (!wait) {
                wait = true;
                callback.apply(null, arguments);
                
                setTimeout(function () {
                    wait = false;
                }, limit);
            }
        }
    }
}