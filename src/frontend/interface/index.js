define(['jquery', 'backend', 'console', 'code_input', 'visualization', './world', './handleEvents'], 
    function(_jquery, backend, my_console, cm, visualization, createWorld, handleEvents) {

    var executionDelay = 1000;
    var loop = 0;
    var state = "stop";
    toggleControls(state);

    function processNext(nextStep) {
        visualization.clearState();
        try {
            var events = nextStep();
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

    function nextStep() {
        processNext(function() { return backend.nextStep(); });
    }

    function nextStepOver() {
        processNext(function() { return backend.nextStepOver(); });   
    }

    function initiateExecution(){
       loop = setInterval(nextStep, executionDelay);
       state = "running";
       toggleControls(state);
    }

    function pauseExecution() {
        state = "paused";
        toggleControls(state);
        clearInterval(loop);
    }

    function stopExecution() {
        pauseExecution();
        state = "stop";
        visualization.cleanCodeMark();
        var doc = $('.CodeMirror')[0].CodeMirror;
        doc.setOption("readOnly", false);
        toggleControls(state);
        $("#btn-start").html('<i class="fa fa-rocket"></i>&nbsp; Start');
    }

    function toggleControls(state) {
        var allButtons = [
            "#btn-start", "#btn-step", "#btn-step-over", "#btn-end", "#btn-input"
        ];
        var stateMap = {
            stop: {
                "#btn-start": true,
                "#btn-end": true,
                "#btn-input": true
            },
            running: {
                "#btn-start": true,
                "#btn-end": true,
            },
            paused: {
                "#btn-start": true,
                "#btn-end": true,
                "#btn-step": true,
                "#btn-step-over": true
            }
        };
        allButtons.forEach(function(button) {
            $(button).prop("disabled", !stateMap[state][button]);
        });
    }

    function startExecution(){
        if (state === "stop"){
            try {
                var stdin = $("#inputTA").val();
                endExecution();
                backend.runProgram(cm.doc.getValue(), createWorld(stdin));
                my_console.addToConsole('compile', 'Compilation successful.');
                var doc = $('.CodeMirror')[0].CodeMirror;
                doc.setOption("readOnly", true);
                $("#btn-start").html('<i class="fa fa-pause"></i>&nbsp; Pause');
                initiateExecution();
            } catch (err) {
                printError(err);
            }
        } else
        if (state === "running"){
            pauseExecution();
            $("#btn-start").html('<i class="fa fa-play"></i>&nbsp; Resume');
        } else
        if (state === "paused"){
            initiateExecution();
            $("#btn-start").html('<i class="fa fa-pause"></i>&nbsp; Pause');
        }
    }

    function endExecution(){
        stopExecution();
        backend.clean();
        visualization.clean();
        my_console.clearConsole();
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
	console.log(err.location);
	if (err.location) {
	    my_console.addToConsole('exception', err.location);
	    visualization.changeActualSegment(
		err.location.first_line - 1,
		err.location.first_column,
		err.location.last_line - 1,
		err.location.last_column
	    );
	}
    }

    $('#btn-start').click(startExecution);
    $('#btn-step').click(btnStepClick);
    $('#btn-step-over').click(btnStepOverClick);
    $('#btn-end').click(endExecution);
});
