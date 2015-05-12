define(["./Process", "./Environment", "./ValueTypes", "./ExecutionContext"], function(Process, Environment, valueTypes, ExecutionContext) {
    return {
        Process: Process,
        valueTypes: valueTypes,
        Environment: Environment,
        ExecutionContext: ExecutionContext
    };
});