require("../../../prepare-tests.js");

describe("stdlib: sscanf", function() {
    var process;
    var sscanf;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdio/sscanf"], function(_sscanf) {
            sscanf = _sscanf;
            done();
        });
    });

    it("should scan two ints", function() {
        process = createMockProcess();
        var a1 = process.createPrimitive("int");
        var a2 = process.createPrimitive("int");
        sscanf([process.createString("12 -345 otherstuff"), process.createString("%d %d"), a1, a2], process);
        expect(process.fetchPtr(a1)).to.equal(12);
        expect(process.fetchPtr(a2)).to.equal(-345);
    });

});