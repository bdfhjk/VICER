    define(["./sizeof"], function(sizeof) {

    function Heap(memory) {
        this.memory = memory;
        this.locations = {};
    }

    Heap.prototype.alloc = function alloc(size, type) {
        var typeSize = sizeof(type);

        if (size % typeSize !== 0) {
            throw new Error("Heap allocation: Attempted to allocate a cell of uneven size");   
        }
        var numCells = size / typeSize;
        var loc = this.memory.alloc({
            type: "array",
            of: {
                type: type
            },
            size: numCells
        });
        this.locations[loc] = true;
        return loc;
    };

    Heap.prototype.free = function free(location) {
        if (!this.locations[location]) {
            throw new Error("Heap deallocation: Attempted to free a variable not allocated on the heap");
        }
        delete this.locations[location];
        this.memory.dealloc(location);
    };
    
    return Heap;
});