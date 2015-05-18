define(["mod_process", "sprintf"], function(mp, sp) {

    // int printf(...);

    var sprintf = sp.sprintf;

    function printf(varargs, process) {
        var strArgs = varargs.map(function(arg) {
            if (typeof arg === "object" && "base" in arg) {
                return mp.MemoryUtils.readStringPtr(process.memory, arg);
            }
            return arg;
        });
        process.world.emitEvent("stdout", [sprintf.apply(null, strArgs)]);
        return 0;
    }

    printf.args = "varargs";
    printf.env = {};
    printf.returns = { type: "int" };

    return printf;

});
