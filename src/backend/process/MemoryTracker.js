define(function() {

    function MemoryTracker(mem) {
        this.mem = mem;
        this.knownLocs = {};
        this.clearChanges();
        this.mem.on("fetch", this.onFetch.bind(this));
        this.mem.on("assign", this.onAssign.bind(this));
    }

    MemoryTracker.prototype.register = function register(loc, name) {
        this.knownLocs[loc] = name;
    };

    MemoryTracker.prototype.unregister = function unregister(loc) {
        this.knownLocs[loc] = undefined;
    };

    MemoryTracker.prototype.getChanges = function getChanges() {
        return Object.keys(this.changes)
            .map(function(loc) {
                return {
                    name: this.knownLocs[loc] || "Mem@" + loc,
                    type: this.changes[loc].type,
                    value: this.changes[loc].value
                };
            });
    };

    MemoryTracker.prototype.clearChanges = function clearChanges() {
        this.changes = {};
    };

    MemoryTracker.prototype.onFetch = function onFetch(loc) {
        if (!this.changes[loc]) {
            this.changes[loc] = {
                type: "fetch"
            };
        }
    };

    MemoryTracker.prototype.onAssign = function onAssign(loc, val) {
        this.changes[loc] = {
            type: "assign",
            value: value
        };
    };

    return MemoryTracker;

});