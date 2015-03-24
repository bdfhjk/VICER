requirejs.config({
    shim : {
        "bootstrap" : { "deps" :['jquery'] }
    },
    packages: [
        { name: 'when', location: '../bower_components/when', main: 'when' },
        { name: 'mod_engine', location: '../backend/engine', main: 'index'},
        { name: 'mod_executor', location: '../backend/executor', main: 'index'},
        { name: 'mod_process', location: '../backend/process', main: 'index'},
        { name: 'mod_data_structures', location: '../backend/data_structures', main: 'index'},
        { name: 'mod_parser', location: '../backend/parser', main: 'index'},
        { name: 'cm', location: '../bower_components/codemirror', main: 'codemirror'},
        { name: 'jquery', location: '../bower_components/jquery/dist', main: 'jquery.min'},
        { name: 'backend', location: '../backend', main: 'index'},
        { name: 'code_input', location: 'code_input', main: 'index'},
        { name: 'visualization', location: 'visualization', main: 'index'},
        { name: 'interface', location: 'interface', main: 'index'},
        { name: 'd3js', location: '../bower_components/d3', main: 'd3.min'}
    ]
});

var backend;

function initBackend() {
    require(['backend', 'code_input', 'visualization', 'interface'], function(_backend) {
        backend = _backend;
    });
}

function init() {
    initBackend();
}

init();
