require("../../prepare-tests.js");

describe("VM Memory", function() {
    var Executor;
    var mem;

    var VAR_T = {
        type: "int"
    };

    var ARRAY_T = { 
        type: "array", 
        of: "int",
        size: 10
    };

    before(function(done) {
        requirejs(["mod_process/Memory"], function(memory) {
            Memory = memory;
            done();
        });
    });

    beforeEach(function() {
        mem = new Memory();
    });

    it ("should properly declare a variable", function() {
        var loc = mem.alloc(VAR_T);
        mem.assign(loc, 2);
        expect(mem.fetch(loc)).to.equal(2);
    });

    it ("should properly access an array element", function() {
        var loc = mem.alloc(ARRAY_T);
        mem.assign(mem.at(loc, 2), 42);
        expect(mem.fetch(mem.at(loc, 2))).to.equal(42);
    });

    it ("should throw an error when accessing an element outside of bounds", function() {
        var loc = mem.alloc(ARRAY_T);
        expect(function() { mem.fetch(mem.at(loc, 10)); }).to.throw(Error);
    });

    it ("should throw an error when assigning an array location directly", function() {
        var loc = mem.alloc(ARRAY_T);
        expect(function() { mem.assign(loc, 10); }).to.throw(Error);
    });
    
});