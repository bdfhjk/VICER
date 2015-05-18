define(["mod_process"], function(mp) {

    // char* strcpy (char* strTo, char* strFrom);

    function strcpy(args, process) {
        var strFrom = mp.MemoryUtils.readStringPtr(process.memory, args.strFrom);
        mp.MemoryUtils.writeStringPtr(process.memory, args.strTo, strFrom);
        return strFrom;
    }

    strcpy.args = ["strTo", "strFrom"];
    strcpy.env = {
        strTo: { 
            type: "pointer",
            to: { type: "char" }
        },
        strFrom: { 
            type: "pointer",
            to: { type: "char" }
        }
    };
    strcpy.returns = { 
        type: "pointer",
        to: { type: "char" }
    };

    return strcpy;

});
