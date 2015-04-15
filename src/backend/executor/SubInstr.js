define(["./TypeCheck"], function(tc) {

    function SubInstr() {

    }

    SubInstr.prototype.invoke = function invoke(context, process) {
        var a1 = tc.verifyInt(context.pop());
        var a2 = tc.verifyInt(context.pop());
        context.push(a2 - a1);
    };

    SubInstr.prototype.toString = function toString() {
        return "SUB";
    };

    return SubInstr;
    
});
