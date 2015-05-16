define(["./Process", "./Environment", "./ValueTypes", "./ExecutionContext", "./MemoryUtils"],
    function(Process, Environment, valueTypes, ExecutionContext, MemoryUtils) {
    return {
        MemoryUtils: MemoryUtils,
        Process: Process,
        valueTypes: valueTypes,
        Environment: Environment,
        ExecutionContext: ExecutionContext,
    };
});