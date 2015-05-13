define(["./Memory", "./Environment", "./MemoryTracker"], function(Memory, Environment, MemoryTracker) {

    function Process(world) {
        this.paused = true;
        this.memory = new Memory();
        this.tracker = new MemoryTracker(this.memory);     
        this.environment = new Environment(this.memory, undefined, this.tracker);
        this.callStack = [];
        this.world = world;
    }

    Process.prototype.getCurrentContext = function getCurrentContext() {
        return this.callStack[this.callStack.length - 1];
    };

    Process.prototype.getMemoryTracker = function getMemoryTracker() {
        return this.tracker;
    };

    Process.prototype.pause = function pause(codeOffset) {
        this.paused = true;
        this.codeOffset = codeOffset;
    };

    Process.prototype.resume = function resume() {
        this.paused = false;
        this.codeOffset = undefined;
    };

    return Process;

});