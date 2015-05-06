define(["./TypeCheck"], function(tc) {

    function LeqInstr() {

    }

    LeqInstr.prototype.invoke = function invoke(context, process) {
        var a2 = tc.verifyInt(context.pop());
        var a1 = tc.verifyInt(context.pop());
        context.push(a1 <= a2 ? 1 : 0);
    };

    LeqInstr.prototype.toString = function toString() {
        return "LEQ";
    };

    return LeqInstr;
    
});