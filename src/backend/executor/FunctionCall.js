define(["mod_process", "./EnvBuilder"], function(mod_process, buildEnv) {

    var Environment = mod_process.Environment;
    var ExecutionContext = mod_process.ExecutionContext;

    function callFunctionByName(proc, name, args) {
        return callFunction(proc, proc.memory.fetch(proc.environment.resolve(name)), args);
    }

    function callFunction(proc, fun, args) {
        if (fun.std) {
            callStdFunction(proc, fun, args);
        } else {
            callCfgFunction(proc, fun, args);
        }
    }

    function callStdFunction(proc, fun, args) {
        var returnVal = fun.std(args, proc);
        if (returnVal !== undefined) {
            proc.getCurrentContext().push(returnVal);
        }
    }

    function callCfgFunction(proc, fun, args) {
        var env = new Environment(proc.memory, proc.environment, proc.getMemoryTracker());
        buildEnv(env, fun.env);
        for (var arg in args) {
            proc.memory.assign(env.resolve(arg), args[arg]);
        }
        var execContext = new ExecutionContext("?", env, fun.cfg, fun.returnType);
        proc.callStack.push(execContext);
    }

    function returnFromCall(proc, value) {
        proc.getCurrentContext().environment.destroy();
        proc.callStack.pop();
        if (proc.callStack.length > 0) {
            if (typeof value !== "undefined") {
                proc.getCurrentContext().push(value);
            }
        } else {
            proc.finished = true;
            proc.exitCode = value || 0;
        }
    }
 
    return {
        callFunctionByName: callFunctionByName,
        callFunction: callFunction,
        returnFromCall: returnFromCall
    };
});