define(["mod_process", "./CfgBuilder"], function(mp, buildCfg) {
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
            value += '\0';
            var loc = env.add(name, { 
                type: "array",
                of: { type: "char" },
                size: value.length
            });
            for (var i = 0; i < value.length; i++) {
                mem.assign(mem.at(loc, i), value.charCodeAt(i));
            }
        },
        "object": function(mem, env, fun, name) {
            var loc = env.add(name, { type: "function" });
            var cfg = fun.cfg ? buildCfg(fun.cfg) : undefined;
            mem.assign(loc, new mp.valueTypes.FunctionValue(fun.returns, fun.args, fun.env, cfg, fun.std));
        }
    };

    function allocValue(memory, env, value, name) {
        var allocator = ALLOCATORS[typeof value];
        if (!allocator) {
            throw new Error("Literal type not recognized: " + typeof value);
        }
        allocator(memory, env, value, name);
    }

    return allocValues;
});
