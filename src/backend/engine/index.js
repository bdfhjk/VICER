define(["mod_parser", "mod_preprocessor", "mod_executor", "mod_data_structures"], function(parser, preprocessor, executor, dataStructures) {
    
    var process;

    function runProgram(source) {
        var tree = parser.parse(source);
        var program = preprocessor.compile(tree);
        process = executor.createProcess(program.global, program.functions, program.values, null); // TODO introduce world
        return executor.finish(process);
    }

    function nextStep() {
        return executor.processNext(process)
            .then(dataStructures.interpret);
    }

    /* Mock up */
    function nextStepOver() {
        return executor.processNext(process)
            .then(dataStructures.interpret);
    }

    function clean() {
        process = undefined;
    }

    return {
        runProgram: runProgram,
        nextStep: nextStep,
        nextStepOver: nextStepOver,
        clean: clean
    };
});
