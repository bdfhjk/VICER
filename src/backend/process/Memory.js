define(function() {

    function Memory() {
        this.cells = {};
        this.locBaseOffset = {};
        this.lastId = 0;
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

        return newId;
    };

    Memory.prototype.at = function at(loc, index) {
        var locArray = this.fetch(loc);
        if (!(index in locArray)) {
            throw new Error("Attempted to access an array outside of its bounds");
        }
        return locArray[index];
    };

    Memory.prototype.getBaseAndOffset = function getBaseAndOffset(loc) {
        return this.locBase[loc];
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
        if (this.cells[loc].meta.type === "array") {
            throw new Error("Attempted to assign to an array allocation table");
        }
        this.cells[loc].value = val;
    };

    Memory.prototype.dealloc = function dealloc(loc) {
        delete this.cells[loc];
    };

    return Memory;

});