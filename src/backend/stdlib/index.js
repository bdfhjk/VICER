define(["./LibraryFunctionSet"], function(rawFunctions) {

    var functions = {};

    for (var funName in rawFunctions) {
        var fun = rawFunctions[funName];
        functions[funName] = {
            args: fun.args,
            returns: fun.returns,
            std: fun
        };
    }

    function getStdLibFunctions() {
        return functions;
    }

    return {
        getStdLibFunctions: getStdLibFunctions,
    };
});