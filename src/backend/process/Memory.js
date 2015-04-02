define(function() {

    function Memory() {
        this.cells = {};
        this.lastId = 0;
    }

    Memory.prototype.nextId = function nextId() {
        return this.lastId++;
    };

    Memory.prototype.alloc = function alloc(type) {
        var newId = String(this.nextId());
        this.cells[newId] = { meta: type, value: null };
        return newId;
    };

    Memory.prototype.allocArray = function allocArray() {
        throw new Error("Not implemented");
    };

    Memory.prototype.fetch = function fetch(loc) {
        if (!(loc in this.cells)) {
            throw new Error("segfault: accessed " + loc);
        }
        return this.cells[loc].value;
    };

    Memory.prototype.assign = function assign(loc, val) {
        if (!(loc in this.cells)) {
            throw new Error("segfault: assigned " + loc);
        }
        this.cells[loc].value = val;
    };

    Memory.prototype.dealloc = function dealloc(loc) {
        delete this.cells[loc];
    };

    return Memory;

});