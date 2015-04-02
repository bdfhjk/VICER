define(function() {

    function Environment(memory, baseEnvironment) {
        this.memory = memory;
        this.variableMap = {};
        this.baseEnvironment = baseEnvironment;
    }

    Environment.prototype.add = function add(name, type) {
        if (this.variableMap[name]) {
            throw new Error("Identifier already exists: " + name);
        }
        return (this.variableMap[name] = this.memory.alloc(type));
    };

    Environment.prototype.remove = function remove(name) {
        delete this.variableMap[name];
    };

    Environment.prototype.resolve = function resolve(name) {
        if (!(name in this.variableMap)) {
            if (this.baseEnvironment) {
                return this.baseEnvironment.resolve(name);
            }
            throw new Error("Invalid identifier " + name);
        }
        return this.variableMap[name];
    };

    Environment.prototype.destroy = function destroy() {
        for (var id in this.variableMap) {
            this.memory.dealloc(this.variableMap[id]);
        }
        this.variableMap = {};
    };

    return Environment;
});