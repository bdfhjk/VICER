define(["mod_engine"], function(engine) {

    // TODO: Implement input code in backend
    function runProgram(source, world) {
        return engine.runProgram(source, world);
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
        clean: clean
    };

});