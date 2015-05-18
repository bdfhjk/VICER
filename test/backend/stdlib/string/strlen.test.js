require("../../../prepare-tests.js");

describe("stdlib: strlen", function() {
    var process;
    var strlen;
    
    before(function(done) {
        requirejs(["mod_stdlib/string/strlen"], function(_strlen) {
            strlen = _strlen;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should return length of a string", function() {
        expect(strlen({str: process.createString("Hello!")}, process)).to.equal(6);
    });

});