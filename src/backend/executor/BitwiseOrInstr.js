define(["./TypeCheck"], function(tc) {

    function BitwiseOrInstr() {

    }

    BitwiseOrInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 | a2);
    };

    BitwiseOrInstr.prototype.toString = function toString() {
        return "BITWISEOR";
    };

    return BitwiseOrInstr;
    
});
