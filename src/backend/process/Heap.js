define(function() {

    function Heap(memory) {
        this.memory = memory;
    }

    Heap.prototype.alloc = function alloc() {
        throw new Error("Not implemented");
    };

    Heap.prototype.free = function free(location) {
        throw new Error("Not implemented");
    };
    
});