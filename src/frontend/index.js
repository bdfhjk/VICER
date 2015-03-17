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
        { name: 'backend', location: '../backend', main: 'index'},
        { name: 'code_input', location: 'code_input', main: 'index'},
        { name: 'visualization', location: 'visualization', main: 'index'},
        { name: 'd3js', location: '../bower_components/d3', main: 'd3.min'}
    ]
});

/* Just a mock-up. */
function runSampleProgram() {
    require(["backend"], function(backend) {
        backend.runProgram("x=2")
            .then(function(result) {
                alert("Compilation successful: " + result);
                return backend.nextStep();
            })
            .then(function(executionResult) {
                alert(executionResult.description);
            })
            .catch(function(err) {
                alert(err.stack);
            });
    });
}

var backend;

function initBackend() {
    require(["backend", 'code_input', 'visualization'], function(_backend, code_input, visualization) {
        backend = _backend;
    });
}

function init() {
    initBackend();
    runSampleProgram();
}

init();
