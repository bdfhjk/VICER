require("../../../prepare-tests.js");

describe("stdlib: abs", function() {

    var abs;

    before(function(done) {
        requirejs(["mod_stdlib/math/abs"], function(_abs) {
            abs = _abs;
            done();
        });
    });

    it("should return positive value", function() {
        expect(abs({val: 12})).to.equal(12);
    });

    it("should turn negative to positive", function() {
        expect(abs({val: -12})).to.equal(12);
    });
});