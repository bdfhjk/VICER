
var backend;

function initBackend() {
    require(['backend', 'console', 'visualization', 'interface'], function(_backend) {
        backend = _backend;
    });
}

function init() {
    initBackend();
}

init();
