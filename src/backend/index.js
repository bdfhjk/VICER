define(["mod_engine"], function(engine) {

    function runProgram(source) {
        return engine.runProgram(source);
    }

    function nextStep() {
        return engine.nextStep();
    }

    function clean() {
        return engine.clean();
    }

    return {
        runProgram: runProgram,
        nextStep: nextStep,
        clean: clean
    };

});