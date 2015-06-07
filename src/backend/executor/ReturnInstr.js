define(["./FunctionCall"], function(fc) {

    function ReturnInstr() {
        
    }

    ReturnInstr.prototype.invoke = function invoke(context, process) {
        var isVoid = context.returnType.name === "void" || context.returnType.type === "void";
        var returnValue;
        if (!isVoid)
            returnValue = context.pop();
        context.result = { returnValue: returnValue, returned: true };
    };

    ReturnInstr.prototype.toString = function toString() {
        return "RETURN";
    };

    return ReturnInstr;
    
});