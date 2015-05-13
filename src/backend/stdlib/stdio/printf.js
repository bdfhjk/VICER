define(["../Utils", "sprintf"], function(utils, sp) {
    var sprintf = sp.sprintf;

    function printf(varargs, process) {
        var strArgs = varargs.map(function(arg) {
            if (typeof arg === "object" && "base" in arg) {
                return utils.ptrToString(process.memory, arg);
            }
            return arg;
        });
        process.world.emitEvent("stdout", [sprintf.apply(null, strArgs)]);
        return 0;
    }

    printf.args = "varargs";
    printf.returns = { type: "int" };

    return printf;

});
