require("../../../prepare-tests.js");

describe("stdlib: atoi", function() {
    var process;
    var atoi;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdlib/atoi"], function(_atoi) {
            atoi = _atoi;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should convert a string to int", function() {
        expect(atoi({str: process.createString("-123")}, process)).to.equal(-123);
    });

    it("should convert a hex string to int", function() {
        expect(atoi({str: process.createString("0x123")}, process)).to.equal(291);
    });

});