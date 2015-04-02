define(["./TypeCheck"], function(tc) {

    function FetchInstr() {

    }

    FetchInstr.prototype.invoke = function invoke(context, process) {
        var loc = tc.verifyLoc(context.pop());
        context.push(process.memory.fetch(loc));
    };

    FetchInstr.prototype.toString = function toString() {
        return "FETCH";
    };
    
    return FetchInstr;
    
});