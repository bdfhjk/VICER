require("../../../prepare-tests.js");

describe("stdlib: strcpy", function() {
    var process;
    var strcpy;
    
    before(function(done) {
        requirejs(["mod_stdlib/string/strcpy"], function(_strcpy) {
            strcpy = _strcpy;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should return copy a string and result the destination pointer", function() {
        var a = process.createString("      ");
        var result = strcpy({strTo: a, strFrom: process.createString("Hello!")}, process);
        expect(result).to.deep.equal(a);
        expect(process.readStringPtr(a)).to.equal("Hello!");
    });

});