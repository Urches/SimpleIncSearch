window.onload = function () {
    console.log('init start');
    let model = new Model();
    let view = new SearchView(model);
    let controller = new SearchController(model, view);     
    console.log('init complete');
}