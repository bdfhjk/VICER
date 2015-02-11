requirejs.config({
    baseUrl: '.',
    paths: {
        lib: '../bower_components',
        module: '../backend'
    }
});

var backend;

function initBackend() {
    require(["backend/index"], function(be) {
        backend = be;
    });
}

function init() {
    initBackend();
}

init();