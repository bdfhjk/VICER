define(["../Utils", "sprintf"], function(utils, sp) {
    var sprintf = sp.sprintf;

    function printf(varargs, process) {
        var result = "hello";
        var strArgs = varargs.map(function(arg) {
            if ("base" in arg) {
                return utils.ptrToString(process.memory, arg);
            }
            return arg;
        });
        process.world.emitEvent("stdout", [sprintf.apply(null, strArgs)]);
    }

    printf.args = "varargs";
    printf.returns = { type: "void" };

    return printf;

});
