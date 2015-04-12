define(["./TypeCheck"], function(tc) {

    function LessInstr() {

    }

    LessInstr.prototype.invoke = function invoke(context, process) {
        var a2 = tc.verifyInt(context.pop());
        var a1 = tc.verifyInt(context.pop());
        context.push(a1 < a2 ? 1 : 0);
    };

    LessInstr.prototype.toString = function toString() {
        return "LESS";
    };

    return LessInstr;
    
});