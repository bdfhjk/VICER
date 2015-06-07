define(["./TypeCheck"], function(tc) {

    function BitwiseRightShiftInstr() {

    }

    BitwiseRightShiftInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a2 >> a1);
    };

    BitwiseRightShiftInstr.prototype.toString = function toString() {
        return "BITWISERIGHTSHIFT";
    };

    return BitwiseRightShiftInstr;
    
});
