define(function() {

    function ExecutionContext(name, env, cfg) {
        this.name = name;
        this.environment = env;
        this.cfg = cfg;
        this.next = null;
        this.stack = [];
    }

    ExecutionContext.prototype.push = function push(val) {
        this.stack.push(val);
    };

    ExecutionContext.prototype.pop = function pop() {
        if (this.stack.length === 0) {
            throw new Error("Attempted to pop from empty stack.");
        }
        return this.stack.pop();
    };

    return ExecutionContext;

});