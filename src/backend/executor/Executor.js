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
        if (DEBUG.VM_INSTRUCTIONS)
            console.log(currentInstr.toString());
        top.next = currentInstr.invoke(top, process) || currentInstr.next;
        return true;
    }

    function finish(process) {
        while(executeNext(process));
        return process.exitCode;
    }

    function createProcess(envTemplate, functions, values) {
        var proc = new Process();
        buildEnv(proc.environment, envTemplate);
        allocValues(proc, functions);
        allocValues(proc, values);
        callFunctionByName(proc, "main");
        return proc;
    }

    function allocValues(proc, values) {
        var env = proc.environment;
        var mem = proc.memory;
        for (var valueName in values) {
            var value = values[valueName];
            allocValue(mem, env, value, valueName);
        }
    }

    var ALLOCATORS = {
        "number": function(mem, env, value, name) {
            var loc = env.add(name, { type: "int" });
            mem.assign(loc, value);
        },
        "string": function(mem, env, value, name) {
            var loc = env.add(name, { type: "array", of: { type: "char" } });
            for (var i = 0; i < value.length; i++) {
                mem.assign(mem.at(loc, i), value[i]);
            }
        },
        "object": function(mem, env, fun, name) {
            var loc = env.add(name, { type: "function" });
            mem.assign(loc, new FunctionValue(fun.args, fun.env, buildCfg(fun.cfg)));
        }
    };

    function allocValue(memory, env, value, name) {
        var allocator = ALLOCATORS[typeof value];
        if (!allocator) {
            throw new Error("Literal type not recognized: " + typeof value);
        }
        allocator(memory, env, value, name);
    }

    return {
        executeNext: executeNext,
        createProcess: createProcess,
        finish: finish
    };
    
});