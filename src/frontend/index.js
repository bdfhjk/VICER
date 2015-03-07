requirejs.config({
    packages: [
        { name: 'when', location: '../bower_components/when', main: 'when' },
        { name: 'mod_engine', location: '../backend/engine', main: 'index'},
        { name: 'mod_executor', location: '../backend/executor', main: 'index'},
        { name: 'mod_process', location: '../backend/process', main: 'index'},
        { name: 'mod_data_structures', location: '../backend/data_structures', main: 'index'},
        { name: 'mod_parser', location: '../backend/parser', main: 'index'}
    ],
    paths: {
        backend: "../backend/index"
    }
});

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

runSampleProgram();