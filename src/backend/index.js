define(["mod_engine"], function(engine) {

    function runProgram(source, world) {
        return engine.runProgram(source, world);
    }

    function getExitCode() {
        return engine.getExitCode();
    }

    function nextStep() {
        return engine.nextStep();
    }
  
    function nextStepOver() {
        return engine.nextStepOver(); 
    }

    function clean() {
        return engine.clean();
    }

    return {
        runProgram: runProgram,
        nextStep: nextStep,
        nextStepOver: nextStepOver,
        getExitCode: getExitCode,
        clean: clean
    };

});
