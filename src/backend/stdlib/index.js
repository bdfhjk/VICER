define(["./LibraryFunctionSet", "./LibraryConstantSet"], function(rawFunctions, constants) {

    var functions = {};

    for (var funName in rawFunctions) {
        var fun = rawFunctions[funName];
        functions[funName] = {
            args: fun.args,
            env: fun.env,
            returns: fun.returns,
            std: fun
        };
    }

    function getStdLibFunctions() {
        return functions;
    }

    function getStdLibConstants() {
        return constants;
    }

    return {
        getStdLibFunctions: getStdLibFunctions,
        getStdLibConstants: getStdLibConstants
    };
});
