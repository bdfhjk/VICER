define(['jquery', 'backend', 'console', 'code_input', 'visualization', './world', './handleEvents'], 
    function(_jquery, backend, my_console, cm, visualization, createWorld, handleEvents) {

    var executionDelay = 1000;
    var loop = 0;
    var state = "stop";

    function nextStep() {
        visualization.clearState();
        try {
            var events = backend.nextStep();
            if (handleEvents(visualization, events) === "finished") {
                stopExecution();
            }
        } catch (err) {
            printError(err);
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
       state = "running";
    }

    function stopExecution() {
        visualization.cleanCodeMark();
        clearInterval(loop);
    }

    function startExecution(){
        if (state == "stop"){
            try {
                var stdin = $("#inputTA").val();
                backend.runProgram(cm.doc.getValue(), createWorld(stdin));
                my_console.addToConsole('compile', 'Compilation successful.');
                var doc = $('.CodeMirror')[0].CodeMirror;
                doc.setOption("readOnly", true);
                $("#inputTA").prop("disabled", true);
                $("#btn-start").html('<i class="fa fa-pause"></i>&nbsp; Pause');
                state = "running";
                initiateExecution();
            } catch (err) {
                printError(err);
            }
        } else
        if (state == "running"){
            stopExecution();
            state = "paused";
            $("#btn-start").html('<i class="fa fa-play"></i>&nbsp; Resume');
        } else
        if (state == "paused"){
            initiateExecution();
            state = "running";
            $("#btn-start").html('<i class="fa fa-pause"></i>&nbsp; Pause');
        }
    }

    function endExecution(){
        state = "stop";
        stopExecution();
        backend.clean();
        visualization.clean();
        my_console.clearConsole();
        var doc = $('.CodeMirror')[0].CodeMirror;
        doc.setOption("readOnly", false);
        $("#inputTA").prop("disabled", false);
        $("#btn-start").html('<i class="fa fa-rocket"></i>&nbsp; Start');
    }

    function btnStepClick(){
        if (state == "paused")
            nextStep();
    }

    function btnStepOverClick(){
        if (state == "paused")
            nextStepOver();
    }

    function printError(err) {
        my_console.addToConsole('exception', err.message);
        if (DEBUG.COMPILE_ERROR_STACK && err.stack) {
            my_console.addToConsole('exception', err.stack);
        }
    }

    $('#btn-start').click(startExecution);
    $('#btn-step').click(btnStepClick);
    $('#btn-step-over').click(btnStepOverClick);
    $('#btn-end').click(endExecution);
});