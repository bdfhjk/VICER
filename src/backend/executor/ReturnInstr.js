define(function() {

    function ReturnInstr() {

    }

    ReturnInstr.prototype.invoke = function invoke(context, process) {
        var returnValue = context.pop();
        process.callStack.pop();
        if (process.callStack.length > 0) {
            process.callStack[process.callStack.length - 1].push(returnValue);
        } else {
            process.exitCode = returnValue;
        }
    };

    ReturnInstr.prototype.toString = function toString() {
        return "RETURN";
    };

    return ReturnInstr;
    
});