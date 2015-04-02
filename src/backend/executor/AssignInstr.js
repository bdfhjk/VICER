define(["./TypeCheck"], function(tc) {

    function AssignInstr() {

    }

    AssignInstr.prototype.invoke = function invoke(context, process) {
        var val = context.pop();
        var loc = tc.verifyLoc(context.pop());
        process.memory.assign(loc, val);
    };

    AssignInstr.prototype.toString = function toString() {
        return "ASSIGN";
    };

    return AssignInstr;
    
});
