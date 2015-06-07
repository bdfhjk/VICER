define(["./TypeCheck"], function(tc) {

    function BitwiseLeftShiftInstr() {

    }

    BitwiseLeftShiftInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a2 << a1);
    };

    BitwiseLeftShiftInstr.prototype.toString = function toString() {
        return "BITWISELEFTSHIFT";
    };

    return BitwiseLeftShiftInstr;
    
});
