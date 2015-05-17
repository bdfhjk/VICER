define(["mod_process"], function(mp) {

    function strtol(args, process) {
        var str = mp.MemoryUtils.readString(process.memory, args[0]);
        var num = Number(str);
        return isNaN(num) ? -1 : num;
    }

    strtol.args = [{ 
            type: "pointer",
            to: { type: "char" }
        }];
        
    strtol.returns = { type: "int" };

    return strtol;

});
