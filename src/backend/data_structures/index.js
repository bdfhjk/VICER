define(["when"], function(when) {
    
    function interpret(executionResult) {
        var variable = executionResult[0].variableName;
        var newValue = executionResult[0].value;
        executionResult.description = "A variable " + variable + " has been changed to " + newValue + ".";
        return when(executionResult);
    }

    return {
        interpret: interpret
    };
    
});