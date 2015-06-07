define(["./TypeCheck"], function(tc) {

    function BitwiseAndInstr() {

    }

    BitwiseAndInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 & a2);
    };

    BitwiseAndInstr.prototype.toString = function toString() {
        return "BITWISEAND";
    };

    return BitwiseAndInstr;
    
});
