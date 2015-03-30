define(["./functionCall"], function(functionCall) {

    var callFunction = functionCall.callFunction;

    function BranchInstr() {

    }

    BranchInstr.prototype.invoke = function invoke(context, process) {
        var cond = context.pop();
        if (cond === 0) {
            return this.false;
        } else {
            return this.true;
        }
    };

    BranchInstr.prototype.toString = function toString() {
        return "BRANCH";
    };

    return BranchInstr;
    
});