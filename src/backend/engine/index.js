define(["mod_parser", "mod_executor", "mod_data_structures"], function(parser, executor, dataStructures) {
    
    var process;

    function runProgram(source) {
        return parser.compile(source);
    }

    function nextStep() {
        return executor.processNext(process)
            .then(dataStructures.interpret);
    }

    function clean() {
        process = undefined;
    }

    return {
        runProgram: runProgram,
        nextStep: nextStep,
        clean: clean
    };
});
