class SearchView {
    constructor(model) {
        this.model = model;
        this.onSearchValueInput = new EventEmitter();

        document.querySelector('.searchField').oninput = () => {
            this.onSearchValueInput.notify();     
        };

        model.onChange.subscribe((suggestion) => {
            if(suggestion){
                console.log('display suggestion: ' + suggestion);
                Array.from(document.querySelectorAll('.suggestion-item')).forEach((item, index) => {
                    item.innerText = suggestion[index];
                });
            } else this.clean();
        });
    };

    getSearchValue(){
        return document.querySelector('.searchField').value;
    }

    clean() {
        Array.from(document.querySelectorAll('.suggestion-item')).forEach(item => {
            item.innerText = '';
        });
    }
}