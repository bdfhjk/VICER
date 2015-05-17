define(["./TypeCheck"], function(tc) {

    function OrInstr() {

    }

    OrInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 + a2);
    };

    OrInstr.prototype.toString = function toString() {
        return "OR";
    };

    return OrInstr;
    
});
