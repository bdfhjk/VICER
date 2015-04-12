define(["mod_process", "mod_stdlib", "./CfgBuilder", "./EnvBuilder", "./FunctionCall", "./AllocValues"], 
    function(mod_process, mod_stdlib, buildCfg, buildEnv, functionCall, allocValues) {

    var Process = mod_process.Process;
    var Environment = mod_process.Environment;
    var ExecutionContext = mod_process.ExecutionContext;
    var FunctionValue = mod_process.valueTypes.FunctionValue;
    var callFunctionByName = functionCall.callFunctionByName;

    function executeNext(process) {
        var top = process.callStack[process.callStack.length - 1];
        if (!top) {
            return false;
        }
        var currentInstr = top.next || top.cfg;
        if (DEBUG.VM_INSTRUCTIONS)
            console.log(currentInstr.toString());
        top.next = currentInstr.invoke(top, process) || currentInstr.next;
        return true;
    }

    function finish(process) {
        while(executeNext(process));
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