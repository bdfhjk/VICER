define(["./Memory", "./Environment", "./MemoryTracker"], function(Memory, Environment, MemoryTracker) {

    function Process(world) {
        this.memory = new Memory();
        this.environment = new Environment(this.memory);
        this.tracker = new MemoryTracker(this.memory);     
        this.callStack = [];
        this.world = world;
    }

    Process.prototype.getCurrentContext = function getCurrentContext() {
        return this.callStack[this.callStack.length - 1];
    };

    Process.prototype.getMemoryTracker = function getMemoryTracker() {
        return this.tracker;
    };

    return Process;

});