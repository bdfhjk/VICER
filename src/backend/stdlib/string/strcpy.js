define(["mod_process"], function(mp) {

    // char* strcpy (char* strTo, char* strFrom);

    function strcpy(args, process) {
        var strFrom = mp.MemoryUtils.readStringPtr(process.memory, args.strFrom);
        mp.MemoryUtils.writeStringPtr(process.memory, args.strTo, strFrom);
        return args.strTo;
    }

    strcpy.args = ["strTo", "strFrom"];
    strcpy.env = {
        strTo: { 
            type: "pointer",
            of: { type: "char" }
        },
        strFrom: { 
            type: "pointer",
            of: { type: "char" }
        }
    };
    strcpy.returns = { 
        type: "pointer",
        of: { type: "char" }
    };

    return strcpy;

});
