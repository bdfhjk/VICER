define(["mod_parser", "mod_preprocessor", "mod_executor", "mod_data_structures"],
    function(parser, preprocessor, executor, dataStructures) {
    
    var process;

    function runProgram(source, world) {
        var tree = parser.parse(source);
        var program = preprocessor.compile(tree);
        process = executor.createProcess(program.global, program.functions, program.values, world);
    }

    function nextStep() {
        return executor.executeNextStep(process);
    }

    function nextStepOver() {
        return executor.executeNextStep(process, true);
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
