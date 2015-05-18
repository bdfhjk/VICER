require("../../../prepare-tests.js");

describe("stdlib: printf", function() {
    var process;
    var printf;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdio/printf"], function(_printf) {
            printf = _printf;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should print a simple format string", function() {
        printf([process.createString("hello!")], process);
        expect(worldResults.stdout).to.equal("hello!");
    });

    it("should interpolate two integers", function() {
        printf([process.createString("A=%d, B=%d"), 1, 2], process);
        expect(worldResults.stdout).to.equal("A=1, B=2");
    });

    it("should interpolate a string", function() {
        printf([process.createString("Hello %s!"), "you"], process);
        expect(worldResults.stdout).to.equal("Hello you!");
    });

    it("should interpolate a char", function() {
        printf([process.createString("Hello %c!"), 65], process);
        expect(worldResults.stdout).to.equal("Hello A!");
    });
});