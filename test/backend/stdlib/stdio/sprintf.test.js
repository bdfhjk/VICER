require("../../../prepare-tests.js");

describe("stdlib: sprintf", function() {
    var process;
    var sprintf;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdio/sprintf"], function(_sprintf) {
            sprintf = _sprintf;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should print a simple format string", function() {
        var out = process.createString("       ");
        sprintf([out, process.createString("hello!")], process);
        expect(process.readStringPtr(out)).to.equal("hello!");
    });

    it("should interpolate two integers", function() {
        var out = process.createString("            ");
        sprintf([out, process.createString("A=%d, B=%d"), 1, 2], process);
        expect(process.readStringPtr(out)).to.equal("A=1, B=2");
    });
});