define(["mod_process", "mod_stdlib", "./CfgBuilder", "./EnvBuilder", "./FunctionCall", "./AllocValues"], 
    function(mod_process, mod_stdlib, buildCfg, buildEnv, functionCall, allocValues) {

    var Process = mod_process.Process;
    var Environment = mod_process.Environment;
    var ExecutionContext = mod_process.ExecutionContext;
    var FunctionValue = mod_process.valueTypes.FunctionValue;
    var callFunctionByName = functionCall.callFunctionByName;

    function executeNextInstruction(process) {
        var top = process.getCurrentContext();
        if (!top) {
            return false;
        }
        var currentInstr = top.next;
        if (DEBUG.VM_INSTRUCTIONS)
            console.log(currentInstr.toString());
        if (currentInstr)
            top.next = currentInstr.invoke(top, process) || currentInstr.next;
        if (top.result || !top.next) {
            var result = top.result ? top.result.returnValue : undefined;
            functionCall.returnFromCall(process, result);
        }
        return !process.finished;
    }

    function executeNextStep(process) {
        while(executeNextInstruction(process));
        return !process.finished;
    }

    function finish(process) {
        while(executeNextStep(process));
        return process.exitCode;
    }

    function createProcess(envTemplate, functions, values, world) {
        var proc = new Process(world);
        buildEnv(proc.environment, envTemplate);
        allocValues(proc, mod_stdlib.getStdLibFunctions());
        allocValues(proc, functions);
        allocValues(proc, values);
        callFunctionByName(proc, "main");
        return proc;
    }

    return {
        executeNext: executeNext,
        createProcess: createProcess,
        finish: finish
    };
    
});