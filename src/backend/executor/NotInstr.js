define(["./TypeCheck"], function(tc) {

    function NotInstr() {

    }

    NotInstr.prototype.invoke = function invoke(context, process) {
        var a = tc.verifyInt(context.pop());
        context.push(a ? 0 : 1);
    };

    NotInstr.prototype.toString = function toString() {
        return "NOT";
    };

    return NotInstr;
    
});