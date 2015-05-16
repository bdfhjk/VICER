define(['jquery',
        'backend',
        'console',
        'code_input',
        'visualization'], function(_jquery, backend, my_console, cm, visualization){

    var executionDelay = 1000;
    var loop = 0;
    var state = "stop";

    function nextStep(){
        visualization.clearState();
        /* Removed temporary due to code crashing. Backend team please fix.
        backend.nextStep()
            .then(function(executionResult) {
                my_console.addToConsole('run', executionResult.description);
            })
            .catch(function(err) {
                my_console.addToConsole('exception', err.stack);
            })
            .done();
        */
        visualization.update();
        visualization.redraw();
    }

    function nextStepOver(){
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

    function stopExecution(){
       clearInterval(nextStep);
    }

    function startExecution(){
        if (state == "stop"){
            try {
                //stopExecution();
                var exitCode = backend.runProgram(cm.doc.getValue(), $("#inputTA").val());
                my_console.addToConsole('compile', 'Compilation successful.');
                my_console.addToConsole('run', 'Program finished with exit code ' + exitCode + '.');
                var doc = $('.CodeMirror')[0].CodeMirror;
                doc.setOption("readOnly", true);
                $("#inputTA").prop("disabled", true);
                $("#btn-start").html('<i class="fa fa-pause"></i>&nbsp; Pause');
                state = "running";
                //initiateExecution();
            } catch (err) {
                my_console.addToConsole('exception', err.message);
                if (DEBUG.COMPILE_ERROR_STACK && err.stack) {
                    my_console.addToConsole('exception', err.stack.split('\n').join('<br />'));
                }
            }
        }
        if (state == "running"){
            //stopExecution();
            state = "paused";
            $("#btn-start").html('<i class="fa fa-start"></i>&nbsp; Resume');
        }
        if (state == "paused"){
            //initiateExecution();
            state = "running";
            $("#btn-start").html('<i class="fa fa-pause"></i>&nbsp; Pause');
        }
    }

    function endExecution(){
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
        if (state == "stop" || state == "paused")
            nextStep();
    }

    function btnStepOverClick(){
        if (state == "stop" || state == "paused")
            nextStepOver();
    }

    $('#btn-start').click(startExecution);
    $('#btn-step').click(btnStepClick);
    $('#btn-step-over').click(btnStepOverClick);
    $('#btn-end').click(endExecution);
});