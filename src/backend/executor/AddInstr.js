define(["./TypeCheck"], function(tc) {

    function AddInstr() {

    }

    AddInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a1 + a2);
    };

    AddInstr.prototype.toString = function toString() {
        return "ADD";
    };

    return AddInstr;
    
});