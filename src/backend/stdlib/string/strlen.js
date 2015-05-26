define(["mod_process"], function(mp) {

    // int strlen (char* str);

    function strlen(args, process) {
        var str = mp.MemoryUtils.readStringPtr(process.memory, args.str);
        return str.length;
    }

    strlen.args = ["str"];
    strlen.env = {
        str: { 
            type: "pointer",
            of: { type: "char" }
        }
    };
    strlen.returns = { 
        type: "pointer",
        of: { type: "char" }
    };

    return strlen;

});
