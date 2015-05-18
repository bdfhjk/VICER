require("../../../prepare-tests.js");

describe("stdlib: rand", function() {
    var process;
    var rand;
    
    before(function(done) {
        requirejs(["mod_stdlib/stdlib/rand"], function(_rand) {
            rand = _rand;
            done();
        });
    });

    beforeEach(function() {
        process = createMockProcess();
    });

    it("should generate a random int", function() {
        return expect(rand({}, process)).to.be.a('number');
    });

});