define(['jquery', 'backend'], function(){

    var executionDelay = 1000;
    var loop = 0;

    function nextStep(){
        backend.nextStep()
            .then(function(executionResult) {
                alert(executionResult.description);
            })
            .catch(function(err) {
                alert(err.stack);
            })
            .done();
    }

    function nextStepOver(){
        backend.nextStepOver()
            .then(function(executionResult) {
                alert(executionResult.description);
            })
            .catch(function(err) {
                alert(err.stack);
            })
            .done();
    }

    function initiateExecution(){
        loop = setInterval(nextStep, executionDelay);
    }

    $('#btn-start').click(function(){
        backend.runProgram("x=2")
            .then(function(result) {
                alert("Compilation result:" + result);
                initiateExecution();
            })
            .catch(function(err) {
                alert(err.stack);
            })
            .done();
    });

    $('#btn-step').click(nextStep);
    $('#btn-step-over').click(nextStepOver);

    $('#btn-stop').click(function(){
        clearInterval(loop);
    });

    $('#btn-end').click(function(){
        backend.clean()
            .catch(function(err) {
                alert(err.stack);
            })
            .done();
    });
});
