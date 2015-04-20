define(['jquery', 'backend', 'console', 'code_input'], function(_jquery, backend, my_console, cm){

    var executionDelay = 1000;
    var loop = 0;

    function nextStep(){
        backend.nextStep()
            .then(function(executionResult) {
                my_console.addToConsole('run', executionResult.description);
            })
            .catch(function(err) {
                my_console.addToConsole('exception', err.stack);
            })
            .done();
    }

    function nextStepOver(){
        backend.nextStepOver()
            .then(function(executionResult) {
                my_console.addToConsole('run', executionResult.description);
            })
            .catch(function(err) {
                my_console.addToConsole('exception', err.stack);
            })
            .done();
    }

    function initiateExecution(){
        loop = setInterval(nextStep, executionDelay);
    }

    function stopExecution(){
        clearInterval(loop);
    }

    function startExecution(){
        stopExecution();
        try {
            var exitCode = backend.runProgram(cm.doc.getValue());
            my_console.addToConsole('compile', 'Compilation successful.');
            my_console.addToConsole('run', 'Program finished with exit code ' + exitCode + '.');
            // initiateExecution();    
        } catch (err) {
            my_console.addToConsole('exception', err.message);
            if (DEBUG.COMPILE_ERROR_STACK && err.stack) {
                my_console.addToConsole('exception', err.stack.split('\n').join('<br />'));
            }
        }
    }

    function endExecution(){
        stopExecution();
        backend.clean();
        my_console.clearConsole();
    }

    $('#btn-start').click(startExecution);
    $('#btn-step').click(nextStep);
    $('#btn-step-over').click(nextStepOver);
    $('#btn-stop').click(stopExecution);
    $('#btn-end').click(endExecution);
});