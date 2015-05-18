define(["mod_process"], function(mp) {

    function strtol(args, process) {
        var str = mp.MemoryUtils.readString(process.memory, args.str);
        var num = parseInt(str, base);
        return isNaN(num) ? -1 : num;
    }

    strtol.args = ["str", "base"];
    strtol.env = {
        str: { 
            type: "pointer",
            to: { type: "char" }
        }, 
        base: {
            type: "int"
        }
    };
        
    strtol.returns = { type: "int" };

    return strtol;

});
