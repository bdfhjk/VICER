require("../../prepare-tests.js");

describe("VM Heap", function() {
    var Memory, Heap, mem, heap;

    var ARRAY_T = { 
        type: "array", 
        of: "int",
        size: 10
    };

    before(function(done) {
        requirejs(["mod_process/Heap", "mod_process/Memory"], function(_heap, memory) {
            Heap = _heap;
            Memory = memory;
            done();
        });
    });

    beforeEach(function() {
        mem = new Memory();
        heap = new Heap(mem);
    });

    function ensureRW(loc) {
        mem.assign(loc, 5);
        expect(mem.fetch(loc)).to.equal(5);
    }

    it ("should properly allocate a 2-element array of ints", function() {
        var loc = heap.alloc(8, "int");
        ensureRW(mem.at(loc, 1));
    });

    it ("should not allow allocation of an uneven cell", function() {
        expect(function() { heap.alloc(6, "int"); }).to.throw(Error);
    });

    it ("should free a previously allocated memory segment", function() {
        var loc = heap.alloc(8, "int");
        expect(function() { heap.free(loc); }).to.not.throw(Error);
    });

    it ("should fail when freeing memory not allocated via heap", function() {
        var loc = mem.alloc(ARRAY_T);
        expect(function() { heap.free(loc); }).to.throw(Error);
    });

});