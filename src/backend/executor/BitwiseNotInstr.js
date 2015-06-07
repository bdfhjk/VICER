define(["./TypeCheck"], function(tc) {

    function BitwiseNotInstr() {

    }

    BitwiseNotInstr.prototype.invoke = function invoke(context, process) {
        var a = tc.verifyInt(context.pop());
        context.push(~a);
    };

    BitwiseNotInstr.prototype.toString = function toString() {
        return "BITWISENOT";
    };

    return BitwiseNotInstr;
    
});
