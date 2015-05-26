define(["mod_process"], function(mp) {

    // int atoi(char* str);
    
    function atoi(args, process) {
        var str = mp.MemoryUtils.readStringPtr(process.memory, args.str);
        var num = Number(str);
        return isNaN(num) ? -1 : num;
    }

    atoi.args = ["str"];
    atoi.env = {
        str: { 
            type: "pointer",
            of: { type: "char" }
        }
    };
    atoi.returns = { type: "int" };

    return atoi;

});
