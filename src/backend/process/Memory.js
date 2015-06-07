define(["eventEmitter", "./coerceValue"], function(EventEmitter, coerceValue) {

    function Memory() {
        this.emitter = new EventEmitter();
        this.cells = {};
        this.locBaseOffset = {};
        this.lastId = 1;
    }

    Memory.prototype.nextId = function nextId() {
        return this.lastId++;
    };

    Memory.prototype.alloc = function alloc(type, base, offset) {
        var newId = String(this.nextId());
        this.cells[newId] = { meta: type, value: null };
        this.locBaseOffset[newId] = {
            base: base || newId,
            offset: offset || 0
        };

        if (type.type === "array") {
            var locArray = new Array(type.size);
            for (var i=0; i<type.size; i++) {
                locArray[i] = this.alloc(type.of, newId, i);
            }
            this.cells[newId].value = locArray;
        }

        this.emitter.emitEvent("alloc", [newId, type.type === "array" ? type.size : -1, type]);

        return newId;
    };

    Memory.prototype.at = function at(loc, index) {
        var locArray = this.fetch(loc);
        if (!Array.isArray(locArray)) {
            if (index === 0) {
                return loc; //simulate a 1-element array
            } else {
                throw new Error("Attempted to use a non-zero index to refer to a single element");
            }
        }
        if (!(index in locArray)) {
            throw new Error("Attempted to access an array outside of its bounds");
        }
        return locArray[index];
    };

    Memory.prototype.getBaseAndOffset = function getBaseAndOffset(loc) {
        return this.locBaseOffset[loc];
    };

    Memory.prototype.fetch = function fetch(loc) {

        if (!(loc in this.cells)) {
            throw new Error("Attempted to fetch a nonexistent location " + loc);
        }
        var bo = this.getBaseAndOffset(loc);
        this.emitter.emitEvent("fetch", [bo.base, bo.offset]);
        return this.cells[loc].value;
    };

    Memory.prototype.assign = function assign(loc, val) {
        if (!(loc in this.cells)) {
            throw new Error("Attempted to assign to a nonexistent location " + loc);
        }
        if (this.cells[loc].meta.type === "array") {
            throw new Error("Attempted to assign to an array allocation table");
        }
        var bo = this.getBaseAndOffset(loc);
        this.emitter.emitEvent("assign", [bo.base, bo.offset, val]);
        this.cells[loc].value = coerceValue(val, this.cells[loc].meta.type);
    };

    Memory.prototype.dealloc = function dealloc(loc) {
        if (!(loc in this.cells)) {
            throw new Error("Attempted to deallocate a nonexistent location " + loc);
        }
        if (this.cells[loc].meta.type === "array") {
            this.cells[loc].value.forEach(this.dealloc.bind(this));
        }
        this.emitter.emitEvent("dealloc", [loc]);
        delete this.cells[loc];
    };

    Memory.prototype.getEmitter = function getEmitter() {
        return this.emitter;
    };

    return Memory;

});