define(["./TypeCheck"], function(tc) {

    function EqInstr() {

    }

    EqInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 === a2 ? 1 : 0);
    };

    EqInstr.prototype.toString = function toString() {
        return "EQ";
    };

    return EqInstr;
    
});