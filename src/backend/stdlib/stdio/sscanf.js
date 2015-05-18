define(["mod_process", "./util_sscanf", "./scanf"], function(mp, utilSscanf, myScanf) {

    // int scanf(...);
    
    function sscanf(varargs, process) {
        var source = mp.MemoryUtils.readStringPtr(process.memory, varargs[0]);
        var fmtString = mp.MemoryUtils.readStringPtr(process.memory, varargs[1]);
        var scanned = utilSscanf(source, fmtString);
        return myScanf.writeResults(varargs.slice(2), process, scanned);
    }

    sscanf.args = "varargs";
    sscanf.env = {};
    sscanf.returns = { type: "int" };

    return sscanf;
});