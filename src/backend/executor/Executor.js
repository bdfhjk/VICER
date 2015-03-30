define(["mod_process", "./CfgBuilder", "./EnvBuilder", "./FunctionCall"], function(mod_process, buildCfg, buildEnv, functionCall) {

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
        console.log(currentInstr.toString());
        top.next = currentInstr.invoke(top, process) || currentInstr.next;
        return true;
    }

    function finish(process) {
        while(executeNext(process));
        return process.exitCode;
    }

    function createProcess(envTemplate, functions) {
        var proc = new Process();
        buildEnv(proc.environment, envTemplate);
        allocFunctions(proc, functions);
        callFunctionByName(proc, "main");
        return proc;
    }

    function allocFunctions(proc, functions) {
        var env = proc.environment;
        var mem = proc.memory;
        for (var funName in functions) {
            var fun = functions[funName];
            var loc = env.add(funName);
            mem.assign(loc, new FunctionValue(fun.args, fun.env, buildCfg(fun.cfg)));
        }
    }

    return {
        executeNext: executeNext,
        createProcess: createProcess,
        finish: finish
    };
    
});