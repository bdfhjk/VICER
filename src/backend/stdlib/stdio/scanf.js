define(["../Utils", "./util_sscanf"], function(utils, sscanf) {
    function scanf(varargs, process) {
        var buf = {};
        process.world.emitEvent("stdin_fetch", [buf]);
        var fmtString = utils.ptrToString(process.memory, varargs[0]);
        var scanned = sscanf(buf.result, fmtString);
        process.world.emitEvent("stdin_consume", [scanned.consumed]);
        var objects = 0;
        for (var i = 1; i < varargs.length; i++) {
            var part = scanned.result[i-1];
            if (part === null || part === undefined) {
                continue;
            }
            objects++;
            var loc = process.memory.at(varargs[i].base, varargs[i].offset);
            if (typeof part === "number") {
                process.memory.assign(loc, part);                
            } else {
                throw new Error("sscanf error: how to handle " + typeof part);
            }
        }
        return objects;
    }

    scanf.args = "varargs";
    scanf.returns = { type: "int" };

    return scanf;
});