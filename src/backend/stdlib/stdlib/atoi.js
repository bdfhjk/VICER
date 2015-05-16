define(["mod_process"], function(mp) {

    function atoi(args, process) {
        var str = mp.MemoryUtils.readStringPtr(process.memory, args.str);
        var num = Number(str);
        return isNaN(num) ? -1 : num;
    }

    atoi.args = ["str"];
    atoi.argTypes = {
        str: { 
            type: "pointer",
            to: { type: "char" }
        }
    };
    atoi.returns = { type: "int" };

    return atoi;

});
