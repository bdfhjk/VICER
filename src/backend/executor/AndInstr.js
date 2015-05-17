define(["./TypeCheck"], function(tc) {

    function AndInstr() {

    }

    AndInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 * a2);
    };

    AndInstr.prototype.toString = function toString() {
        return "AND";
    };

    return AndInstr;
    
});
