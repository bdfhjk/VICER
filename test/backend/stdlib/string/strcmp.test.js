require("../../../prepare-tests.js");

describe("stdlib: strcmp", function() {
    var process;
    var strcmp;
    
    before(function(done) {
        requirejs(["mod_stdlib/string/strcmp"], function(_strcmp) {
            strcmp = _strcmp;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should return < 0 if left string is smaller", function() {
        expect(strcmp({str1: process.createString("abc"), str2: process.createString("def")}, process)).to.equal(-3);
    });

    it("should return 0 if both strings are equal", function() {
        expect(strcmp({str1: process.createString("abc"), str2: process.createString("abc")}, process)).to.equal(0);
    });

    it("should return > 0 if left string is greater", function() {
        expect(strcmp({str1: process.createString("def"), str2: process.createString("abc")}, process)).to.equal(3);
    });

});