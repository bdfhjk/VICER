define(["./functionCall"], function(functionCall) {

    var callFunction = functionCall.callFunction;

    function CallInstr(std) {
        this.std = !!std;
    }

    CallInstr.prototype.invoke = function invoke(context, process) {
        var funLoc = context.pop();
        var func = process.memory.fetch(funLoc);
        var args = {};
        for (var i = 0; i < func.args.length; i++) {
            args[func.args[i]] = context.pop();
        }
        
        if (this.std) {
            context.push(fun.stdCall(args));
        } else {
            callFunction(process, func, args);
        }  
    };

    CallInstr.prototype.toString = function toString() {
        return "CALL" + (this.std ? " STD" : "");
    };

    return CallInstr;
    
});