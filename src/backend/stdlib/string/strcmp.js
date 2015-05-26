define(["mod_process"], function(mp) {

    // int strcmp(char* str1, char* str2);

    function strcmp(args, process) {
        var str1 = mp.MemoryUtils.readStringPtr(process.memory, args.str1);
        var str2 = mp.MemoryUtils.readStringPtr(process.memory, args.str2);
        return str1.localeCompare(str2);
    }

    strcmp.args = ["str1", "str2"];
    strcmp.env = {
        str1: { 
            type: "pointer",
            of: { type: "char" }
        },
        str2: { 
            type: "pointer",
            of: { type: "char" }
        }
    };
    strcmp.returns = { type: "int" };

    return strcmp;

});
