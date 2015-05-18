require("../../../prepare-tests.js");

describe("stdlib: feof", function() {
    var process;
    var feof;
    var stdin;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdio/feof", "mod_stdlib/stdio/constants"], function(_feof, constants) {
            feof = _feof;
            stdin = constants.stdin;
            done();
        });
    });

    it("should return 1 if end of stream", function() {
        process = createMockProcess("");
        expect(feof({fd: stdin}, process)).to.equal(1);
    });

    it("should return 0 if not at the end of stream", function() {
        process = createMockProcess("hi!");
        expect(feof({fd: stdin}, process)).to.equal(0);
    });

    it("should throw an error if fd !== stdin", function() {
        process = createMockProcess("hi!");
        expect(function() { feof({fd: stdin + 1}, process); }).to.throw(Error);
    });
});