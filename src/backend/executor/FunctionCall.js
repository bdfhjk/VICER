define(["mod_process", "./EnvBuilder"], function(mod_process, buildEnv) {

    var Environment = mod_process.Environment;
    var ExecutionContext = mod_process.ExecutionContext;

    function callFunctionByName(proc, name, args) {
        return callFunction(proc, proc.memory.fetch(proc.environment.resolve(name), args));
    }

    function callFunction(proc, fun, args) {
        var env = new Environment(proc.memory, proc.environment);
        buildEnv(env, fun.env);
        for (var arg in args) {
            proc.memory.assign(env.resolve(arg), args[arg]);
        }
        var execContext = new ExecutionContext("?", env, fun.cfg);
        proc.callStack.push(execContext);
    }

    return {
        callFunctionByName: callFunctionByName,
        callFunction: callFunction,
    };
});