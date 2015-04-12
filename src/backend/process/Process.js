define(["./Memory", "./Environment", "./ValueTypes", "./ExecutionContext"], 
    function(Memory, Environment, valueTypes, ExecutionContext) {

    function Process(world) {
        this.memory = new Memory();        
        this.environment = new Environment(this.memory);
        this.callStack = [];
        this.world = world;
    }

    Process.prototype.getCurrentContext = function getCurrentContext() {
        return this.callStack[this.callStack.length - 1];
    };

    return {
        Process: Process,
        valueTypes: valueTypes,
        Environment: Environment,
        ExecutionContext: ExecutionContext
    };

});