class SearchController {
    /**
     * @param {class Model} model
     * @param {class SearchView} view
     */
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.onSearchValueInput.subscribe(
            this.throttle(() => {
                    //ask suggestion from model
                    let value = this.view.getSearchValue();
                    this.model.querySuggestion(value);
            }, 100)
        );
    }

    throttle(callback, limit) {
        let wait = false;

        return function () {
            if (!wait) {
                wait = true;
                callback();
                setTimeout(function () {
                    wait = false;
                }, limit);
            }
        }
    }
}