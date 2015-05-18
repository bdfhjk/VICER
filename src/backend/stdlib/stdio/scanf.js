define(["mod_process", "./util_sscanf"], function(mp, sscanf) {

    // int scanf(...);
    
    function scanf(varargs, process) {
        var buf = {};
        process.world.emitEvent("stdin_fetch", [buf]);
        var fmtString = mp.MemoryUtils.readStringPtr(process.memory, varargs[0]);
        var scanned = sscanf(buf.result, fmtString);
        process.world.emitEvent("stdin_consume", [scanned.consumed]);
        return scanf.writeResults(varargs.slice(1), process, scanned);
    }

    scanf.writeResults = function writeResults(varargs, process, scanned) {
        var objects = 0;
        for (var i = 0; i < varargs.length; i++) {
            var part = scanned.result[i];
            if (part === null || part === undefined) {
                continue;
            }
            objects++;
            var loc = process.memory.at(varargs[i].base, varargs[i].offset);
            if (typeof part === "number") {
                process.memory.assign(loc, part);                
            } else if (typeof part === "string") {
                mp.MemoryUtils.writeString(process.memory, loc, part);
            } else {
                throw new Error("scanf error: how to handle " + typeof part);
            }
        }
        return objects;
    };

    scanf.args = "varargs";
    scanf.env = {};
    scanf.returns = { type: "int" };

    return scanf;
});