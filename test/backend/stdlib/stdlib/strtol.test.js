require("../../../prepare-tests.js");

describe("stdlib: strtol", function() {
    var process;
    var strtol;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdlib/strtol"], function(_strtol) {
            strtol = _strtol;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should convert a string to int", function() {
        expect(strtol({str: process.createString("-123"), base: 10}, process)).to.equal(-123);
    });

    it("should convert a hex string to int", function() {
        expect(strtol({str: process.createString("123"), base: 16}, process)).to.equal(291);
    });

});