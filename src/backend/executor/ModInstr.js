define(["./TypeCheck"], function(tc) {

    function ModInstr() {

    }

    ModInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 % a2);
    };

    ModInstr.prototype.toString = function toString() {
        return "MOD";
    };

    return ModInstr;
    
});
