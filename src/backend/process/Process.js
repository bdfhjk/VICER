define(["./Memory", "./Environment", "./ValueTypes", "./ExecutionContext"], 
    function(Memory, Environment, valueTypes, ExecutionContext) {

    function Process() {
        this.memory = new Memory();        
        this.environment = new Environment(this.memory);
        this.callStack = [];
    }

    return {
        Process: Process,
        valueTypes: valueTypes,
        Environment: Environment,
        ExecutionContext: ExecutionContext
    };

});