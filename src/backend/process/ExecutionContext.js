define(function() {

    function ExecutionContext(name, env, cfg, returnType) {
        this.name = name;
        this.returnType = returnType;
        this.environment = env;
        this.cfg = cfg;
        this.next = cfg;
        this.stack = [];
    }

    ExecutionContext.prototype.push = function push(val) {
        if (DEBUG.EXEC_STACK_OP) {
            console.log("Pushing " + JSON.stringify(val));
        }
        this.stack.push(val);
    };

    ExecutionContext.prototype.pop = function pop() {
        if (this.stack.length === 0) {
            throw new Error("Attempted to pop from empty stack.");
        }
        var val = this.stack.pop();
        if (DEBUG.EXEC_STACK_OP) {
            console.log("Popping " + JSON.stringify(val));
        }
        return val;
    };

    return ExecutionContext;

});