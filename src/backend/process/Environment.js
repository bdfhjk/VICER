define(function() {

    function Environment(memory, baseEnvironment, tracker) {
        this.memory = memory;
        this.tracker = tracker;
        this.variableMap = {};
        this.baseEnvironment = baseEnvironment;
    }

    Environment.prototype.add = function add(name, type, track) {
        if (this.variableMap[name]) {
            throw new Error("Identifier already exists: " + name);
        }
        this.variableMap[name] = this.memory.alloc(type);
        if (track) {
            this.tracker.register(name, this.variableMap[name]);
        }
        return this.variableMap[name];
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
        var loc = this.variableMap[name];
        return loc;
    };

    Environment.prototype.destroy = function destroy() {
        for (var id in this.variableMap) {
            this.memory.dealloc(this.variableMap[id]);
        }
        this.variableMap = {};
    };

    return Environment;
});