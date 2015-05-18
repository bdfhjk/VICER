define(["mod_process", "sprintf"], function(mp, libSprintf) {

    // int sprintf(char* str, char* format, ...);

    function sprintf(varargs, process) {
        if (varargs.length < 2) {
            throw new Error("sprintf: not enough arguments");
        }
        var strArgs = varargs.slice(1).map(function(arg) {
            if (typeof arg === "object" && "base" in arg) {
                return mp.MemoryUtils.readStringPtr(process.memory, arg);
            }
            return arg;
        });
        var result = libSprintf.sprintf.apply(null, strArgs);
        mp.MemoryUtils.writeStringPtr(varargs[0], result);
        return 0;
    }

    sprintf.args = "varargs";
    sprintf.env = {};
    sprintf.returns = { type: "int" };

    return sprintf;

});
