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
            return {
                running: false,
                level: process.callStack.length
            };
        }
        var currentInstr = top.next;
        if (DEBUG.VM_INSTRUCTIONS)
            console.log(currentInstr.toString());
        if (currentInstr)
            top.next = currentInstr.invoke(top, process) || currentInstr.next;
        if (process.paused) {
            return {
                running: false,
                level: process.callStack.length
            };
        }
        if (top.result || !top.next) {
            var result = top.result ? top.result.returnValue : undefined;
            functionCall.returnFromCall(process, result);
        }
        return {
            running: !process.finished,
            level: process.callStack.length
        };
    }

    function executeNextStep(process, isStepOver) {
        var level = process.callStack.length;
        while(true) {
            var execInfo = executeNextInstruction(process);
            if (!execInfo.running) {
                console.log(execInfo.level, level);
                if ((isStepOver && execInfo.level <= level) || !isStepOver) {
                    break;
                } else {
                    process.resume();
                }
            }            
        }
        var result = {
            finished: process.finished,
            exitCode: process.exitCode,
            highlight: process.codeOffset,
            changes: process.getMemoryTracker().getChanges()
        };
        process.getMemoryTracker().clearChanges();
        process.resume();
        return result;
    }

    function finish(process) {
        while (!executeNextStep(process).finished);
        return process.exitCode;
    }

    function createProcess(envTemplate, functions, values, world) {
        var proc = new Process(world);
        buildEnv(proc.environment, envTemplate);
        allocValues(proc, mod_stdlib.getStdLibFunctions());
        allocValues(proc, mod_stdlib.getStdLibConstants());
        allocValues(proc, functions);
        allocValues(proc, values);
        callFunctionByName(proc, "main");
        return proc;
    }

    return {
        executeNextStep: executeNextStep,
        createProcess: createProcess,
        finish: finish
    };
    
});