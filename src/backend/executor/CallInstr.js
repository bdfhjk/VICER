define(["./FunctionCall"], function(functionCall) {

    var callFunction = functionCall.callFunction;

    function CallInstr() {

    }

    CallInstr.prototype.invoke = function invoke(context, process) {
        var funLoc = context.pop();
        var func = process.memory.fetch(funLoc);
        var args;

        if (func.args === "varargs") {
            args = [];
            var nextItem;
            while ((nextItem = context.pop()) !== "VAEND") {
                args.unshift(nextItem);
            }
        } else {
            args = {};
            for (var i = 0; i < func.args.length; i++) {
                args[func.args[i]] = context.pop();
            }
        }

        callFunction(process, func, args);
    };

    CallInstr.prototype.toString = function toString() {
        return "CALL";
    };

    return CallInstr;
    
});