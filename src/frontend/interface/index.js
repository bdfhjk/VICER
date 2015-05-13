define(['jquery', 'backend', 'console', 'code_input', 'visualization', './world', './handleEvents'], 
    function(_jquery, backend, my_console, cm, visualization, createWorld, handleEvents) {

    var executionDelay = 1000;
    var loop = 0;

    function nextStep() {
        visualization.clearState();
        var events = backend.nextStep();
        if (handleEvents(visualization, events) === "finished") {
            stopExecution();
        }
        visualization.update();
        visualization.redraw();
    }

    function nextStepOver() {
        /* Removed temporary due to code crashing. Backend team please fix.
        backend.nextStepOver()
            .then(function(executionResult) {
                my_console.addToConsole('run', executionResult.description);
            })
            .catch(function(err) {
                my_console.addToConsole('exception', err.stack);
            })
            .done();
         */
    }

    function initiateExecution(){
        loop = setInterval(nextStep, executionDelay);
    }

    function stopExecution() {
        visualization.cleanCodeMark();
        clearInterval(loop);
    }

    function startExecution() {
        endExecution();
        stopExecution();
        try {
            var exitCode = backend.runProgram(cm.doc.getValue(), $("#inputTA").val());
            my_console.addToConsole('compile', 'Compilation successful.');
            initiateExecution();
        } catch (err) {
            my_console.addToConsole('exception', err.message);
            if (DEBUG.COMPILE_ERROR_STACK && err.stack) {
                my_console.addToConsole('exception', err.stack);
            }
        }
    }

    function endExecution(){
        stopExecution();
        backend.clean();
        visualization.clean();
        my_console.clearConsole();
    }

    $('#btn-start').click(startExecution);
    $('#btn-step').click(nextStep);
    $('#btn-step-over').click(nextStepOver);
    $('#btn-stop').click(stopExecution);
    $('#btn-end').click(endExecution);
});