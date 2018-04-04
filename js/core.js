window.onload = function () {
    let model = new Model();
    let controller = new SearchController(model); 
    let view = new SearchView(model, controller);
    console.log('init complete');
}