define(["mod_engine"], function(engine) {

    function runProgram(source) {
        return engine.runProgram(source);
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