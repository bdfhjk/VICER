define(["mod_process"], function(mp) {

    // WARNING: original second argument omitted as of C standard (no support for char**)
    // int strtol(char* str, int base);

    function strtol(args, process) {
        var str = mp.MemoryUtils.readStringPtr(process.memory, args.str);
        var num = parseInt(str, args.base);
        return isNaN(num) ? -1 : num;
    }

    strtol.args = ["str", "base"];
    strtol.env = {
        str: { 
            type: "pointer",
            of: { type: "char" }
        }, 
        base: {
            type: "int"
        }
    };
        
    strtol.returns = { type: "int" };

    return strtol;

});
