define(["../Utils"], function(utils) {

    function strtol(args, process) {
        var str = utils.ptrToString(args[0], process.memory);
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
